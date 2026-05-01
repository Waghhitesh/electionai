from pydantic import BaseModel, Field

class UserQuery(BaseModel):
    """
    Data model for user queries.
    Includes strict validation to prevent malicious or empty inputs.
    """
    text: str = Field(..., min_length=2, max_length=500, description="The user's question about elections.")
    address: str = Field(..., min_length=5, max_length=255, description="Residential address for local context.")

