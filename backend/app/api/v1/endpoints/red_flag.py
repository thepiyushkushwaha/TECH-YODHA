from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.red_flag_service import red_flag_service

router = APIRouter()

class AssessSymptomsRequest(BaseModel):
    symptoms: str

class AssessSymptomsResponse(BaseModel):
    isRedFlag: bool
    reason: Optional[str] = None

@router.post("/assess", response_model=AssessSymptomsResponse)
async def assess_red_flags(payload: AssessSymptomsRequest):
    is_red, reason = red_flag_service.detect_red_flag(payload.symptoms)
    return AssessSymptomsResponse(isRedFlag=is_red, reason=reason)
