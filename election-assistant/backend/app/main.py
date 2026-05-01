from fastapi import FastAPI, Request
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from .limiter import limiter
from .api.routes import router as assistant_router

from fastapi.middleware.cors import CORSMiddleware

# 1. Initialize the Limiter is done in limiter.py
app = FastAPI(title="Election Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for now, in prod restrict to frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Attach the Limiter and the state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 3. Include your routes
app.include_router(assistant_router)

@app.get("/")
@limiter.limit("20/minute") # General limit for landing
async def root(request: Request):
    return {"message": "Election Education API is Online"}
