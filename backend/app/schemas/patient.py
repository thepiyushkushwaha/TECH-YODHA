from pydantic import BaseModel, ConfigDict
from typing import Optional

class PatientProfileBase(BaseModel):
    fullName: str
    age: int
    gender: str
    preferredLanguage: str = "Hindi"
    abhaId: Optional[str] = None
    mobileNumber: Optional[str] = None
    email: Optional[str] = None

class PatientProfileUpdate(BaseModel):
    fullName: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    preferredLanguage: Optional[str] = None
    abhaId: Optional[str] = None
    mobileNumber: Optional[str] = None
    email: Optional[str] = None

class PatientProfileResponse(PatientProfileBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
