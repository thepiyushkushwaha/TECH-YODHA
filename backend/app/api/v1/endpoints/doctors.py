from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorResponse

router = APIRouter()

MOCK_DOCTORS = [
    {
        "id": "doc-1",
        "name": "Dr. Ankit Sharma",
        "departmentId": "dept-gen-med",
        "departmentName": "General Medicine",
        "rating": 4.8,
        "experienceYears": 14,
        "availableSlotsCount": 42,
        "totalSlotsCount": 100,
        "languages": ["Hindi", "English"],
        "availableSlots": ["10:30 AM", "11:00 AM", "11:30 AM", "12:30 PM", "02:00 PM"],
        "isAyush": False,
        "avatarUrl": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    },
    {
        "id": "doc-2",
        "name": "Dr. Priya Singh",
        "departmentId": "dept-gen-med",
        "departmentName": "General Medicine",
        "rating": 4.7,
        "experienceYears": 11,
        "availableSlotsCount": 18,
        "totalSlotsCount": 100,
        "languages": ["Hindi", "English", "Bengali"],
        "availableSlots": ["11:15 AM", "01:00 PM", "02:30 PM", "03:15 PM"],
        "isAyush": False,
        "avatarUrl": "https://images.unsplash.com/photo-1594824813566-88855ce78c4a?auto=format&fit=crop&q=80&w=400"
    },
    {
        "id": "doc-3",
        "name": "Dr. Rajesh Verma",
        "departmentId": "dept-cardio",
        "departmentName": "Cardiology",
        "rating": 4.9,
        "experienceYears": 20,
        "availableSlotsCount": 12,
        "totalSlotsCount": 80,
        "languages": ["Hindi", "English"],
        "availableSlots": ["11:30 AM", "12:00 PM", "04:00 PM"],
        "isAyush": False,
        "avatarUrl": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
    }
]

@router.get("", response_model=List[DoctorResponse])
async def get_doctors(department_id: str = None, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Doctor))
    doctors = result.scalars().all()
    if not doctors:
        if department_id:
            return [d for d in MOCK_DOCTORS if d["departmentId"] == department_id]
        return MOCK_DOCTORS
        
    mapped = []
    for d in doctors:
        if department_id and d.department_id != department_id:
            continue
        mapped.append(DoctorResponse(
            id=d.id,
            name=d.name,
            departmentId=d.department_id,
            departmentName=d.department_name,
            rating=d.rating,
            experienceYears=d.experience_years,
            availableSlotsCount=d.available_slots_count,
            totalSlotsCount=d.total_slots_count,
            languages=d.languages,
            availableSlots=d.available_slots,
            isAyush=d.is_ayush,
            avatarUrl=d.avatar_url
        ))
    return mapped
