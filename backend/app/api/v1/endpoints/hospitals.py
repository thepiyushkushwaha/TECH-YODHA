from fastapi import APIRouter
from typing import List
from app.schemas.hospital import HospitalResponse, DepartmentResponse

router = APIRouter()

MOCK_HOSPITAL = {
    "id": "HOSP-KGMU-01",
    "name": "King George’s Medical University",
    "department": "General Medicine OPD",
    "hospitalCode": "KGMU-OPD-001",
    "sessionId": "OPD Session #A1024",
    "availableDoctorsCount": 18
}

MOCK_DEPARTMENTS = [
    {
        "id": "dept-gen-med",
        "name": "General Medicine",
        "description": "Comprehensive adult health evaluations, acute symptom management, and chronic illness consultations.",
        "availableDoctors": 12,
        "availableSlots": 42,
        "totalSlots": 100,
        "isSuggested": True
    },
    {
        "id": "dept-cardio",
        "name": "Cardiology",
        "description": "Specialized evaluation for chest symptoms, vascular health, lipid profiles, and cardiovascular prevention.",
        "availableDoctors": 8,
        "availableSlots": 18,
        "totalSlots": 100,
        "isSuggested": True
    },
    {
        "id": "dept-ortho",
        "name": "Orthopedics",
        "description": "Bone, joint, muscle, and locomotor disorder consultation and history assessment.",
        "availableDoctors": 6,
        "availableSlots": 35,
        "totalSlots": 100,
        "isSuggested": False
    }
]

@router.get("", response_model=HospitalResponse)
async def get_hospital_info():
    return MOCK_HOSPITAL

@router.get("/departments", response_model=List[DepartmentResponse])
async def get_hospital_departments():
    return MOCK_DEPARTMENTS
