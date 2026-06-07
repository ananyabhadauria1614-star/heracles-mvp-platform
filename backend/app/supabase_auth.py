import httpx
from typing import Optional
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY


def _check_config() -> Optional[str]:
    """Return an error message if Supabase config is missing."""
    if not SUPABASE_URL:
        return "SUPABASE_URL is not set. Check your .env file."
    if not SUPABASE_ANON_KEY:
        return "SUPABASE_ANON_KEY is not set. Check your .env file."
    return None


async def signup(email: str, password: str) -> dict:
    """Register a new user with Supabase Auth."""
    config_error = _check_config()
    if config_error:
        return {"error": config_error}

    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }
    payload = {"email": email, "password": password}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

    data = response.json()

    if response.status_code != 200:
        return {"error": data.get("msg", "Signup failed")}

    return {
        "access_token": data.get("access_token"),
        "token_type": "bearer",
        "user": data.get("user"),
    }


async def login(email: str, password: str) -> dict:
    """Log in an existing user with Supabase Auth."""
    config_error = _check_config()
    if config_error:
        return {"error": config_error}

    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }
    payload = {"email": email, "password": password}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

    data = response.json()

    if response.status_code != 200:
        return {"error": data.get("error_description", "Login failed")}

    return {
        "access_token": data.get("access_token"),
        "token_type": "bearer",
        "user": data.get("user"),
    }