import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_ayush_assessment():
    response = client.get("/api/v1/ayush/assessment/PAT-9842")
    assert response.status_code == 200
    data = response.json()
    assert "prakriti" in data
    assert "vikriti" in data
    assert "samprapti" in data
    assert data["prakriti"]["dominant"] == "Vata-Pitta Prakriti"
