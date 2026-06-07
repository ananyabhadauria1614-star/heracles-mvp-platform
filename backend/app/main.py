from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import SignUpRequest, LoginRequest, AuthResponse
from app.supabase_auth import signup, login

app = FastAPI(title="Heracles Backend", version="1.0.0")

# Allow the React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    """Simple health check endpoint."""
    return {"status": "ok"}


@app.post("/auth/signup", response_model=AuthResponse)
async def sign_up(request: SignUpRequest):
    """Register a new user via Supabase Auth."""
    result = await signup(request.email, request.password)
    return AuthResponse(**result)


@app.post("/auth/login", response_model=AuthResponse)
async def log_in(request: LoginRequest):
    """Log in an existing user via Supabase Auth."""
    result = await login(request.email, request.password)
    return AuthResponse(**result)