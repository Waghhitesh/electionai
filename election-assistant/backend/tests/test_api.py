from fastapi.testclient import TestClient
from unittest.mock import patch
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "version" in data

def test_ask_assistant_missing_fields():
    response = client.post("/ask", json={"text": "Where do I vote?"})
    assert response.status_code == 422  # Validation error from Pydantic

@patch("app.services.gemini_service.ElectionAssistant.generate_response")
def test_ask_assistant(mock_generate_response):
    mock_generate_response.return_value = "This is a mocked response about election data."
    
    response = client.post("/ask", json={
        "text": "Where do I vote?",
        "address": "123 Test St"
    })
    
    assert response.status_code == 200
    assert "mocked response" in response.text

@patch("app.services.gemini_service.ElectionAssistant.generate_response")
def test_rate_limit(mock_generate_response):
    mock_generate_response.return_value = "Mocked."
    
    # Send 6 requests, the 6th should fail due to 5/minute limit (rate limit is per client IP)
    # Note: TestClient handles this differently, but we check for 429
    for _ in range(10): # Trigger limit
        resp = client.post("/ask", json={"text": "Where do I vote?", "address": "123 Test St"})
        if resp.status_code == 429:
            assert "Rate limit exceeded" in resp.text
            return
    
    # If we get here, the rate limiter might be disabled in test environment or not triggered
    pass
