from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import engine, get_db, Base
from models import WaitlistEntry
from schemas import WaitlistRequest, WaitlistResponse

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "EDITH API running"}

@app.post("/api/waitlist", response_model=WaitlistResponse)
def join_waitlist(payload: WaitlistRequest, db: Session = Depends(get_db)):
    entry = WaitlistEntry(email=payload.email)
    try:
        db.add(entry)
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    count = db.query(WaitlistEntry).count()
    return {"message": "You're on the list!", "count": count}

@app.get("/api/waitlist/count")
def get_count(db: Session = Depends(get_db)):
    count = db.query(WaitlistEntry).count()
    return {"count": count}

@app.get("/api/waitlist")
def get_all_emails(db: Session = Depends(get_db)):
    entries = db.query(WaitlistEntry).order_by(WaitlistEntry.created_at.desc()).all()
    return [{"email": e.email, "created_at": e.created_at.isoformat()} for e in entries]