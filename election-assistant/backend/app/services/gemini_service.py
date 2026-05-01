from google import genai
import os
from .civic_service import CivicInfoService

class ElectionAssistant:
    def __init__(self):
        # Allow missing key to prevent crash during import/startup
        api_key = os.getenv("GOOGLE_API_KEY", "")
        try:
            self.client = genai.Client(api_key=api_key) if api_key else None
        except Exception:
            self.client = None
        self.civic_service = CivicInfoService()

    async def generate_response(self, user_query: str, user_address: str) -> str:
        # Step 1: Retrieve Ground Truth
        raw_data = await self.civic_service.get_election_data(user_address)
        
        # Step 2: Augment the Prompt
        context = f"Official Election Data: {raw_data if raw_data else 'No specific data found for this location.'}"
        
        system_prompt = (
            "You are a professional Election Education Assistant. "
            "Use the 'Official Election Data' provided below to answer the user query accurately. "
            "If the data is missing, politely explain how they can find it locally. "
            "Never hallucinate dates or locations. Keep it structured and easy to read."
        )

        prompt = f"{system_prompt}\n\nUser Question: {user_query}\n\nContext: {context}"

        if not self.client:
            return "Error: AI Assistant is not configured. Please set the GOOGLE_API_KEY environment variable on the server."

        # Step 3: Generate
        response = await self.client.aio.models.generate_content(
            model='gemini-2.5-pro',
            contents=prompt
        )
        return response.text
