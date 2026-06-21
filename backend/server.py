from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# ===== Beta Signup =====
class BetaSignup(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str | None = None
    style: str | None = None  # "scalping" | "swing" | "options" | None
    referrer: str | None = None
    lang: str | None = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BetaSignupCreate(BaseModel):
    email: str
    name: str | None = None
    style: str | None = None
    referrer: str | None = None
    lang: str | None = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ===== Beta signup =====
import re

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@api_router.post("/beta-signup")
async def beta_signup(payload: BetaSignupCreate):
    email = (payload.email or "").strip().lower()
    if not _EMAIL_RE.match(email):
        return {"ok": False, "error": "invalid_email"}

    # idempotent: if already on list, return success with already_on_list flag
    existing = await db.beta_signups.find_one({"email": email}, {"_id": 0})
    if existing:
        count = await db.beta_signups.count_documents({})
        return {"ok": True, "already_on_list": True, "seat": existing.get("seat"), "total": count}

    count = await db.beta_signups.count_documents({})
    seat = count + 1

    doc = BetaSignup(
        email=email,
        name=(payload.name or "").strip() or None,
        style=payload.style,
        referrer=payload.referrer,
        lang=payload.lang,
    ).model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["seat"] = seat

    await db.beta_signups.insert_one(doc)
    logger.info("beta signup #%s · %s", seat, email)
    return {"ok": True, "seat": seat, "total": seat}


@api_router.get("/beta-signup/stats")
async def beta_signup_stats():
    total = await db.beta_signups.count_documents({})
    return {"total": total, "capacity": 100}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()