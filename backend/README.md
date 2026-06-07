# Heracles Backend

A minimal FastAPI backend with Supabase Auth integration.

## Prerequisites

- Python 3.11+
- A [Supabase](https://supabase.com) project (free tier works)

## Setup

### 1. Create a virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these in your Supabase dashboard under **Settings → API**.

### 4. Run the server

```bash
uvicorn app.main:app --reload --port 3000
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Health Check

```
GET /health
```

Response:
```json
{ "status": "ok" }
```

### Sign Up

```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Log In

```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

## Interactive Docs

Once the server is running, visit [http://localhost:3000/docs](http://localhost:3000/docs) for the auto-generated Swagger UI.