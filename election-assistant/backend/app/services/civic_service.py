import httpx
import os
from typing import Optional, Dict, Any

class CivicInfoService:
    BASE_URL = "https://www.googleapis.com/civicinfo/v2/voterinfo"
    
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")

    async def get_election_data(self, address: str) -> Optional[Dict[str, Any]]:
        params = {"address": address, "key": self.api_key}
        async with httpx.AsyncClient() as client:
            response = await client.get(self.BASE_URL, params=params)
            if response.status_code == 200:
                return response.json()
            return None
