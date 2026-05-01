import httpx
import os
from typing import Optional, Dict, Any

class CivicInfoService:
    """Service to interact with the Google Civic Information API."""
    BASE_URL = "https://www.googleapis.com/civicinfo/v2/voterinfo"
    _cache: Dict[str, Dict[str, Any]] = {}

    def __init__(self):
        """Initialize the service with API key from environment."""
        self.api_key = os.getenv("GOOGLE_API_KEY")

    async def get_election_data(self, address: str) -> Optional[Dict[str, Any]]:
        """
        Fetches election data for a given address.
        Uses in-memory caching to optimize repeated requests.
        
        Args:
            address: The residential address to look up.
            
        Returns:
            A dictionary containing election data or None if request fails.
        """
        if address in self._cache:
            return self._cache[address]

        params = {"address": address, "key": self.api_key}
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(self.BASE_URL, params=params, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    self._cache[address] = data
                    return data
            except httpx.RequestError:
                pass
            return None
