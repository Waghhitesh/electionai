from fastapi import FastAPI, Request
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from .limiter import limiter
from .api.routes import router as assistant_router

from fastapi.middleware.cors import CORSMiddleware

# 1. Initialize the Limiter is done in limiter.py
app = FastAPI(
    title="Election Assistant API",
    description="Backend API for the Election Process Education Assistant, powered by Google Gemini and Civic Information API.",
    version="1.0.0"
)

# Security: Configure CORS
# In production, replace ["*"] with specific origins like ["https://yourfrontend.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Attach the Limiter and the state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Include routes
app.include_router(assistant_router)

@app.get("/")
@limiter.limit("20/minute")
async def root(request: Request):
    """
    Health check endpoint to verify if the API is online.
    """
    return {
        "status": "online",
        "message": "Election Education API is Online",
        "version": "1.0.0"
    }
