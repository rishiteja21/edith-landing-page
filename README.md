# EDITH - AI Accountability Coach

Landing page for EDITH, an AI accountability coach for fitness.

## Tech Stack

- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + PostgreSQL (Supabase)
- **Deployment**: Vercel (frontend) + Render (backend)

## Project Structure

```
.
├── backend/           # FastAPI backend
│   ├── main.py       # API endpoints
│   ├── models.py     # SQLAlchemy models
│   ├── schemas.py    # Pydantic schemas
│   ├── database.py   # Database config
│   └── render.yaml   # Render deployment config
└── frontend/         # React frontend
    ├── src/          # React source
    ├── public/       # Static assets
    └── package.json  # Dependencies
```

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at http://localhost:3000

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

## Deployment

### Backend (Render)
1. Connect GitHub repo to Render
2. Create Web Service
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add DATABASE_URL env var

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Add `REACT_APP_BACKEND_URL` env var with your Render URL

## API Endpoints

- `GET /` - Health check
- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist/count` - Get waitlist count
- `GET /api/waitlist` - Get all waitlist emails