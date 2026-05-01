from fastapi import APIRouter, Request
from ..models.pydantic_models import UserQuery
from ..services.gemini_service import ElectionAssistant
from ..limiter import limiter

router = APIRouter()
election_assistant = ElectionAssistant()

from fastapi.responses import StreamingResponse

@router.post("/ask")
@limiter.limit("5/minute")
async def ask_assistant(request: Request, query: UserQuery):
    """
    Main endpoint for the AI assistant. 
    Uses StreamingResponse (SSE) for low-latency AI generation.
    """
    return StreamingResponse(
        election_assistant.generate_response_stream(query.text, query.address),
        media_type="text/event-stream"
    )
