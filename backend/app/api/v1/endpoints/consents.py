from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict

router = APIRouter()

class ConsentUpdate(BaseModel):
    isConsentGiven: bool
    sharedScopes: Dict[str, bool] = {
        "caseSummary": True,
        "medicalHistory": True,
        "labReports": True,
        "prescriptionHistory": True,
        "dischargeSummary": False
    }

@router.get("")
async def get_consent_status():
    return {
        "isConsentGiven": True,
        "sharedScopes": {
            "caseSummary": True,
            "medicalHistory": True,
            "labReports": True,
            "prescriptionHistory": True,
            "dischargeSummary": False
        }
    }

@router.post("")
async def update_consent_status(consent: ConsentUpdate):
    return {
        "status": "updated",
        "isConsentGiven": consent.isConsentGiven,
        "sharedScopes": consent.sharedScopes
    }
