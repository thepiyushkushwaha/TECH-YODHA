import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_login_fallback():
    response = client.post("/api/v1/auth/login", json={"email": "rahul.sharma@example.com", "password": "anypassword"})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "patient"
