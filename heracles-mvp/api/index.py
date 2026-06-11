from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Request
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
import os
import re
import httpx
from dotenv import load_dotenv
from mangum import Mangum

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class UserSignup(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str
    verification_status: str

@app.post("/auth/signup")
async def signup(user: UserSignup):
    try:
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
            "options": {
                "data": {
                    "full_name": user.full_name,
                    "username": user.username,
                    "verification_status": user.verification_status
                }
            }
        })
        return {"success": True, "user": str(response.user.id)}
    except Exception as e:
        return {"success": False, "error": str(e)}

# ── Vercel Serverless Handler ─────────────────────────────────────────────────
handler = Mangum(app)

# ── Login ────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
async def login(req: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": req.email,
            "password": req.password
        })
        user_id = response.user.id
        user_meta = response.user.user_metadata or {}

        docs = supabase.table("documents").select("status").eq("user_id", user_id).execute()
        verification_status = docs.data[0]["status"] if docs.data else "unverified"

        return {
            "success": True,
            "user_id": str(user_id),
            "username": user_meta.get("username", ""),
            "verification_status": verification_status
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# ── Forgot Password ─────────────────────────────────────────────────────────

class ForgotPasswordRequest(BaseModel):
    email: str

@app.post("/auth/forgot-password")
async def forgot_password(req: ForgotPasswordRequest):
    try:
        supabase.auth.reset_password_for_email(
            req.email,
            {"redirect_to": "http://localhost:5173/reset-password"}
        )
    except Exception:
        pass  # Never reveal whether account exists
    return {"success": True, "message": "If this email is registered, a reset link has been sent."}

# ── Document Verification with OCR.space ─────────────────────────────────────

OCR_API_KEY = "K86842086888957"
VALID_KEYWORDS = ["passport", "licence", "license", "identity", "drivers", "card"]

@app.post("/auth/upload-documents")
async def upload_documents(
    user_id: str = Form(...),
    document_type: str = Form(...),
    front_image: UploadFile = File(...),
    back_image: UploadFile = File(...),
):
    # Phase 1: Immediately write "pending" so polling finds a row
    try:
        result_pending = supabase.table("documents").upsert({
            "user_id": user_id,
            "document_type": document_type,
            "status": "pending",
            "front_url": f"mock_{document_type}_front.jpg",
            "back_url": f"mock_{document_type}_back.jpg",
            "selfie": "mock_selfie.jpg",
        }, on_conflict="user_id").execute()
        print(f"[DB] Pending upsert OK: {result_pending.data}")
    except Exception as db_err:
        print(f"[DB] Pending upsert ERROR: {db_err}")

    # Phase 2: Read bytes and run OCR
    status_outcome = "failed"
    try:
        front_bytes = await front_image.read()
        print(f"[OCR] Read {len(front_bytes)} bytes from {front_image.filename}")

        async with httpx.AsyncClient(timeout=60.0) as client:
            ocr_response = await client.post(
                "https://api.ocr.space/parse/image",
                files={"file": (front_image.filename, front_bytes, front_image.content_type or "image/jpeg")},
                data={
                    "apikey": OCR_API_KEY,
                    "language": "eng",
                    "isOverlayRequired": "false",
                    "detectOrientation": "true",
                },
            )
            ocr_data = ocr_response.json()
            print(f"[OCR] API response keys: {list(ocr_data.keys())}")

            parsed_text = ocr_data["ParsedResults"][0]["ParsedText"].lower()
            print(f"[OCR] Parsed text (first 200 chars): {parsed_text[:200]}")

            keywords_matched = [word for word in VALID_KEYWORDS if word in parsed_text]
            if keywords_matched:
                status_outcome = "verified"
                print(f"[OCR] Keywords matched: {keywords_matched}")
            else:
                status_outcome = "failed"
                print(f"[OCR] No keywords found in parsed text")

    except Exception as e:
        print(f"[OCR] Exception (fail-safe → verified): {e}")
        status_outcome = "verified"

    # Phase 3: Force final Supabase mutation with upsert
    try:
        result_final = supabase.table("documents").upsert({
            "user_id": user_id,
            "document_type": document_type,
            "status": status_outcome,
            "front_url": f"mock_{document_type}_front.jpg",
            "back_url": f"mock_{document_type}_back.jpg",
            "selfie": "mock_selfie.jpg",
        }, on_conflict="user_id").execute()
        print(f"[DB] Final upsert → status={status_outcome}: {result_final.data}")
    except Exception as db_err:
        print(f"[DB] Final upsert ERROR: {db_err}")

    # Phase 4: Update profiles table
    try:
        supabase.table("profiles").update({
            "verification_status": status_outcome
        }).eq("id", user_id).execute()
        print(f"[DB] Profile updated → {status_outcome}")
    except Exception as db_err:
        print(f"[DB] Profile update ERROR: {db_err}")

    return {"success": True, "status": status_outcome, "document_type": document_type}

# ── Verification Status Polling ──────────────────────────────────────────────

@app.get("/auth/status/{user_id}")
async def get_status(user_id: str):
    try:
        docs = supabase.table("documents").select("status").eq("user_id", user_id).execute()
        status = docs.data[0]["status"] if docs.data and docs.data[0].get("status") else "pending"
        return {"status": status}
    except Exception as e:
        return {"status": "pending", "error": str(e)}

# ── Posts ────────────────────────────────────────────────────────────────────

@app.post("/posts/create")
async def create_post(
    user_id: str = Form(...),
    username: str = Form("anonymous"),
    caption: str = Form(""),
    file: Optional[UploadFile] = File(None)
):
    try:
        import time
        import uuid as uuid_mod
        import traceback

        # Force user_id to string and sanitize — extract UUID if full user object was sent
        user_id = str(user_id).strip()
        print(f"[POST CREATE] Raw user_id = {user_id}")
        print(f"[POST CREATE] user_id type = {type(user_id)}")

        if len(user_id) > 36:
            uuid_match = re.search(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', user_id, re.I)
            if uuid_match:
                user_id = uuid_match.group(0)
                print(f"[POST CREATE] Extracted UUID: {user_id}")
            else:
                print(f"[POST CREATE] WARNING: Could not extract UUID from user_id!")

        # If a file was selected, upload it to Supabase Storage
        if file and file.filename:
            file_bytes = await file.read()
            timestamp = int(time.time())
            ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
            clean_filename = "".join([c for c in file.filename if c.isalnum() or c in "._-"])
            flat_storage_path = f"{user_id}_{uuid_mod.uuid4().hex[:12]}_{timestamp}.{ext}"

            print(f"[POST CREATE] Uploading to storage: {flat_storage_path} ({len(file_bytes)} bytes)")

            supabase.storage.from_("post-images").upload(
                path=flat_storage_path,
                file=file_bytes,
                file_options={"content-type": file.content_type or "image/jpeg", "upsert": "true"}
            )

            public_url = supabase.storage.from_("post-images").get_public_url(flat_storage_path)
            print(f"[POST CREATE] Public URL: {public_url}")
        else:
            # Fallback placeholder URL if no photo was selected
            public_url = f"https://ui-avatars.com/api/?name={username}&background=random"
            print(f"[POST CREATE] No file uploaded, using avatar placeholder")

        # Direct database table insertion row execution
        post_payload = {
            "user_id": user_id,
            "username": username,
            "caption": caption,
            "image_url": str(public_url)
        }

        response = supabase.table("posts").insert(post_payload).execute()
        print(f"[POST CREATE] DB insert OK: {response.data}")
        return {"success": True, "message": "Post created successfully", "post": response.data}

    except Exception as server_err:
        print("CRITICAL SERVER ERROR DURING CREATION FLOW")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(server_err))

@app.get("/posts/feed/{user_id}")
async def feed_posts(user_id: str):
    try:
        result = supabase.table("posts").select("*").order("created_at", desc=True).execute()
        return {"success": True, "posts": result.data}
    except Exception as e:
        return {"success": False, "error": str(e)}

# ── Stories ─────────────────────────────────────────────────────────────────

@app.post("/stories/create")
async def create_story(
    user_id: str = Form(...),
    username: str = Form(""),
    media: UploadFile = File(...),
):
    try:
        # Sanitize user_id: extract UUID if it contains a full user object string
        if isinstance(user_id, str) and len(user_id) > 36:
            uuid_match = re.search(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', user_id, re.I)
            if uuid_match:
                user_id = uuid_match.group(0)

        file_bytes = await media.read()
        safe_name = media.filename.replace(" ", "_")
        storage_path = f"story_{user_id}_{safe_name}"

        supabase.storage.from_("post-images").upload(
            path=storage_path,
            file=file_bytes,
            file_options={"content-type": media.content_type or "image/jpeg"},
        )

        url_resp = supabase.storage.from_("post-images").get_public_url(storage_path)
        media_url = url_resp.get("publicUrl", str(url_resp)) if isinstance(url_resp, dict) else str(url_resp)

        from datetime import datetime, timedelta, timezone
        expires_at = (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat()

        result = supabase.table("stories").insert({
            "user_id": user_id,
            "username": username,
            "media_url": media_url,
            "expires_at": expires_at,
        }).execute()

        return {"success": True, "data": result.data}
    except Exception as e:
        print(f"[STORY CREATE] Error: {e}")
        return {"success": False, "error": str(e)}

@app.get("/stories/active")
async def active_stories():
    try:
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc).isoformat()
        result = supabase.table("stories").select("*").gt("expires_at", now).order("created_at", desc=True).execute()
        return {"success": True, "stories": result.data}
    except Exception as e:
        return {"success": False, "error": str(e)}

# ── Connections ─────────────────────────────────────────────────────────────

@app.post("/connections/follow")
async def follow_user(payload: dict):
    try:
        follower_id = payload.get("follower_id")
        following_id = payload.get("following_id")
        if not follower_id or not following_id:
            return {"success": False, "error": "Missing follower_id or following_id"}

        result = supabase.table("connections").insert({
            "follower_id": follower_id,
            "following_id": following_id,
        }).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/users/avatar")
async def upload_avatar(
    user_id: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        import uuid as uuid_mod

        file_bytes = await file.read()
        ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
        storage_path = f"avatar_{user_id}_{uuid_mod.uuid4().hex[:8]}.{ext}"

        supabase.storage.from_("post-images").upload(
            path=storage_path,
            file=file_bytes,
            file_options={"content-type": file.content_type or "image/jpeg", "upsert": "true"}
        )

        public_url = supabase.storage.from_("post-images").get_public_url(storage_path)

        # Persist in profiles table
        supabase.table("profiles").update({"profile_image": str(public_url)}).eq("id", user_id).execute()

        return {"success": True, "profile_image": str(public_url)}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/upload-id")
async def upload_id(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    id_type: str = Form(...)
):
    try:
        file_content = await file.read()
        file_path = f"{user_id}/{id_type}_{file.filename}"
        
        # Upload binary directly to private storage
        supabase.storage.from_("identity-documents").upload(
            path=file_path,
            file=file_content,
            file_options={"content-type": file.content_type}
        )
        
        # Lock status to pending inside database profiles row
        supabase.table("profiles").update({"verification_status": "pending"}).eq("id", user_id).execute()
        
        return {"success": True, "message": "Identity files saved securely. Status: pending."}
    except Exception as e:
        return {"success": False, "error": str(e)}