from fastapi import APIRouter, Request
from ..models.pydantic_models import UserQuery
from ..services.gemini_service import ElectionAssistant
from ..limiter import limiter

router = APIRouter()
election_assistant = ElectionAssistant()

@router.post("/ask")
@limiter.limit("5/minute")
async def ask_assistant(request: Request, query: UserQuery):
    """
    Main endpoint for the AI assistant. 
    Triggers the RAG pipeline to provide election information based on user query and address.
    """
    return await election_assistant.generate_response(query.text, query.address)
