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
    assert response.json() == {"message": "Election Education API is Online"}

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
    
    # Send 6 requests, the 6th should fail due to 5/minute limit
    for _ in range(5):
        client.post("/ask", json={"text": "Where do I vote?", "address": "123 Test St"})
        
    response = client.post("/ask", json={"text": "Where do I vote?", "address": "123 Test St"})
    assert response.status_code == 429
    assert "Rate limit exceeded" in response.text
