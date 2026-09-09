from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class DoctorResponse(BaseModel):
    id: str
    name: str
    departmentId: str
    departmentName: str
    rating: float
    experienceYears: int
    availableSlotsCount: int
    totalSlotsCount: int
    languages: List[str]
    availableSlots: List[str]
    isAyush: bool = False
    avatarUrl: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
