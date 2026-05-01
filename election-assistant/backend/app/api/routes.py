from fastapi import APIRouter, Request
from ..models.pydantic_models import UserQuery
from ..services.gemini_service import ElectionAssistant
from ..limiter import limiter

router = APIRouter()
election_assistant = ElectionAssistant()

@router.post("/ask")
@limiter.limit("5/minute")
async def ask_assistant(request: Request, query: UserQuery):
    # Your RAG pipeline logic here...
    return await election_assistant.generate_response(query.text, query.address)
