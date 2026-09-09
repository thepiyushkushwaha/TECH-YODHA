from pydantic import BaseModel
from typing import List, Optional, Dict

class HPI(BaseModel):
    onset: str
    location: str
    duration: str
    character: str
    severity: str
    aggravatingFactors: str
    relievingFactors: str
    associatedSymptoms: str

class ClinicalCaseSummary(BaseModel):
    chiefComplaint: str
    hpi: HPI
    pastMedicalHistory: List[str]
    pastSurgicalHistory: List[str]
    currentMedications: List[str]
    allergies: List[str]
    familyHistory: str
    personalHistory: str
    reviewOfSystems: str
    previousInvestigations: str
    documentSummary: str
    verifiedByDoctor: Optional[bool] = False

class ChatMessage(BaseModel):
    id: str
    sender: str # ai, patient, system
    text: str
    timestamp: str
    options: Optional[List[str]] = None
    isRedFlag: Optional[bool] = False

class SendMessageRequest(BaseModel):
    text: str
    sessionId: Optional[str] = "SESSION-DEFAULT"
    patientId: Optional[str] = "PAT-9842"
    language: Optional[str] = "English"

class SendMessageResponse(BaseModel):
    message: ChatMessage
    followUpOptions: Optional[List[str]] = None
    isRedFlag: bool = False
    redFlagReason: Optional[str] = None
