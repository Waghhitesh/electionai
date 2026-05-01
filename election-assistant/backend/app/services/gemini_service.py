from google import genai
import os
from .civic_service import CivicInfoService

class ElectionAssistant:
    """Orchestrates the RAG flow for election education using Google Gemini and Civic Data."""

    def __init__(self):
        """Initialize with AI client and Civic Data service."""
        api_key = os.getenv("GOOGLE_API_KEY", "")
        try:
            self.client = genai.Client(api_key=api_key) if api_key else None
        except Exception:
            self.client = None
        self.civic_service = CivicInfoService()

    async def generate_response(self, user_query: str, user_address: str) -> str:
        """
        Executes the RAG pipeline to generate a response.
        
        Args:
            user_query: The natural language question from the user.
            user_address: Residential address to fetch local context.
            
        Returns:
            A string containing the AI-generated educational response.
        """
        if not self.client:
            return "Error: AI Assistant is not configured. Please set the GOOGLE_API_KEY environment variable on the server."

        # Step 1: Retrieve Ground Truth from Google Civic API
        try:
            raw_data = await self.civic_service.get_election_data(user_address)
        except Exception as e:
            return f"Error fetching civic data: {str(e)}"
        
        # Step 2: Augment the Prompt
        context = f"Official Election Data: {raw_data if raw_data else 'No specific data found for this location.'}"
        
        system_prompt = (
            "You are a professional Election Education Assistant. "
            "Use the 'Official Election Data' provided below to answer the user query accurately. "
            "If the data is missing, politely explain how they can find it locally. "
            "Never hallucinate dates or locations. Keep it structured and easy to read. "
            "Maintain strict political neutrality."
        )

        prompt = f"{system_prompt}\n\nUser Question: {user_query}\n\nContext: {context}"

        # Step 3: Generate via Gemini
        try:
            response = await self.client.aio.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            return f"AI Generation failed: {str(e)}"
