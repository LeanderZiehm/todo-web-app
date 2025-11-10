import asyncio
from typing import Callable, Any
from psycopg_pool import AsyncConnectionPool  # psycopg v3
from .config import settings

# A simple in-memory asyncio queue for DB write tasks.
# Task items are callables: async function(conn, *args) or dict instructions you interpret.
db_queue: asyncio.Queue = asyncio.Queue()
_worker_task: asyncio.Task | None = None
_pool: AsyncConnectionPool | None = None

def get_pool() -> AsyncConnectionPool:
    if _pool is None:
        raise RuntimeError("pool not initialized")
    return _pool

async def init_pool():
    global _pool
    if _pool is None:
        conninfo = (
            f"host={settings.DB_HOST} "
            f"port={settings.DB_PORT} "
            f"dbname={settings.DB_NAME} "
            f"user={settings.DB_USER} "
            f"password={settings.DB_PASSWORD}"
        )

        # Create the async connection pool, but don't open it yet
        _pool = AsyncConnectionPool(conninfo=conninfo, open=False,max_size=settings.POOL_MAX_SIZE,min_size=settings.POOL_MIN_SIZE)

       
    return _pool


async def shutdown_pool():
    global _pool
    if _pool is not None:
        await _pool.close()
        _pool = None

async def queue_worker(stop_event: asyncio.Event):
    """Consume write tasks from db_queue. Each task is a coroutine function accepting a connection."""
    pool = get_pool()
    while not stop_event.is_set():
        try:
            task = await asyncio.wait_for(db_queue.get(), timeout=1.0)
        except asyncio.TimeoutError:
            continue
        try:
            # task expected: (callable, args, kwargs)
            func, args, kwargs = task
            async with pool.connection() as conn:
                async with conn.cursor() as cur:
                    # The provided func performs SQL using cur
                    await func(cur, *args, **kwargs)
        except Exception as e:
            # TODO: logging, exponential backoff, error handling, requeueing policies
            print("db worker error:", e)
        finally:
            db_queue.task_done()

async def enqueue_db_task(func: Callable, *args, **kwargs):
    await db_queue.put((func, args, kwargs))
