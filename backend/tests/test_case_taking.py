import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_chat_normal_symptom():
    response = client.post(
        "/api/v1/case-taking/chat",
        json={"text": "I have mild cough and low fever for 3 days", "language": "English"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["isRedFlag"] is False
    assert "message" in data
    assert data["message"]["sender"] == "ai"

def test_chat_red_flag_symptom():
    response = client.post(
        "/api/v1/case-taking/chat",
        json={"text": "I have sudden crushing chest pain radiating to left arm", "language": "English"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["isRedFlag"] is True
    assert "EMERGENCY ALERT" in data["message"]["text"]
