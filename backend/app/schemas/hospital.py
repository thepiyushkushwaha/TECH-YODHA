from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class HospitalResponse(BaseModel):
    id: str
    name: str
    department: str
    hospitalCode: str
    sessionId: str
    availableDoctorsCount: int

    model_config = ConfigDict(from_attributes=True)

class DepartmentResponse(BaseModel):
    id: str
    name: str
    description: str
    availableDoctors: int
    availableSlots: int
    totalSlots: int
    isSuggested: Optional[bool] = False

    model_config = ConfigDict(from_attributes=True)
