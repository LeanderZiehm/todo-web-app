import asyncio
from datetime import datetime
from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from .db import init_pool, shutdown_pool, queue_worker, get_pool, enqueue_db_task, db_queue
from .config import settings

app = FastAPI()
router = APIRouter(prefix="/money")

_stop_event = asyncio.Event()
_worker: asyncio.Task | None = None

# Lifespan events
@app.on_event("startup")
async def startup():
    await init_pool()
    global _worker
    _worker = asyncio.create_task(queue_worker(_stop_event))

@app.on_event("shutdown")
async def shutdown():
    _stop_event.set()
    if _worker:
        await _worker
    await shutdown_pool()


# Pydantic model
class MoneyIn(BaseModel):
    account_type: str
    amount: float
    notes: str | None = None
    created_at: datetime | None = None


# GET list endpoint
@router.get("/")
async def list_money(account_type: str | None = None, limit: int = 50):
    pool = get_pool()
    q = "SELECT id, account_type, amount, notes, created_at FROM money_entries"
    params = []
    if account_type:
        q += " WHERE account_type = %s"
        params.append(account_type)
    q += " ORDER BY created_at DESC LIMIT %s"
    params.append(limit)

    async with pool.acquire() as conn:  # adjust to your DB lib if needed
        async with conn.cursor() as cur:
            await cur.execute(q, tuple(params))
            rows = await cur.fetchall()
            columns = [desc[0] for desc in cur.description]

    return [dict(zip(columns, r)) for r in rows]


# Helper for DB writes
async def _insert_money(cur, payload: dict):
    await cur.execute(
        "INSERT INTO money_entries (account_type, amount, notes, created_at) VALUES (%s, %s, %s, %s)",
        (payload['account_type'], payload['amount'], payload.get('notes'), payload.get('created_at'))
    )


# POST create endpoint
@router.post("/", status_code=201)
async def create_money(body: MoneyIn):
    payload = body.dict()
    if payload.get("created_at") is None:
        payload["created_at"] = datetime.utcnow()
    await enqueue_db_task(_insert_money, payload)
    return {"status": "queued", "entry": payload}


# Include router in FastAPI app
app.include_router(router)
