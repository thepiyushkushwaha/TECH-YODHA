import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_list_appointments():
    response = client.get("/api/v1/appointments")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["tokenNumber"] == "#A1024"

def test_book_appointment():
    payload = {
        "doctorId": "doc-1",
        "departmentId": "dept-gen-med",
        "appointmentTime": "12:30 PM",
        "appointmentDate": "Today",
        "sharedData": {
            "caseSummary": True,
            "medicalHistory": True,
            "labReports": True,
            "prescriptionHistory": True,
            "dischargeSummary": False
        }
    }
    response = client.post("/api/v1/appointments/book", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "tokenNumber" in data
    assert data["status"] == "Waiting"
