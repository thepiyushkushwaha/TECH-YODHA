from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas.hospital import HospitalResponse

router = APIRouter()

class QRScanRequest(BaseModel):
    hospitalCode: str

@router.post("/scan", response_model=HospitalResponse)
async def scan_qr_code(payload: QRScanRequest):
    return {
        "id": "HOSP-KGMU-01",
        "name": "King George’s Medical University",
        "department": "General Medicine OPD",
        "hospitalCode": payload.hospitalCode or "KGMU-OPD-001",
        "sessionId": "OPD Session #A1024",
        "availableDoctorsCount": 18
    }

@router.post("/connect", response_model=HospitalResponse)
async def connect_hospital_session():
    return {
        "id": "HOSP-KGMU-01",
        "name": "King George’s Medical University",
        "department": "General Medicine OPD",
        "hospitalCode": "KGMU-OPD-001",
        "sessionId": "OPD Session #A1024",
        "availableDoctorsCount": 18
    }
