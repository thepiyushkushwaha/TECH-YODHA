from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.schemas.patient import PatientProfileResponse, PatientProfileUpdate

router = APIRouter()

DEFAULT_PATIENT = {
    "id": "PAT-9842",
    "fullName": "Rahul Sharma",
    "age": 32,
    "gender": "Male",
    "preferredLanguage": "Hindi",
    "abhaId": "91-4820-1940-5829",
    "mobileNumber": "+91 98765 43210",
    "email": "rahul.sharma@example.com"
}

@router.get("/profile", response_model=PatientProfileResponse)
async def get_patient_profile(patient_id: str = "PAT-9842", db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PatientProfile).where(PatientProfile.id == patient_id))
    profile = result.scalars().first()
    if not profile:
        return DEFAULT_PATIENT
    return PatientProfileResponse(
        id=profile.id,
        fullName=profile.full_name,
        age=profile.age,
        gender=profile.gender,
        preferredLanguage=profile.preferred_language,
        abhaId=profile.abha_id,
        mobileNumber=profile.mobile_number,
        email=profile.email
    )

@router.put("/profile", response_model=PatientProfileResponse)
async def update_patient_profile(updates: PatientProfileUpdate, patient_id: str = "PAT-9842", db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PatientProfile).where(PatientProfile.id == patient_id))
    profile = result.scalars().first()
    if not profile:
        profile = PatientProfile(
            id=patient_id,
            full_name=updates.fullName or "Rahul Sharma",
            age=updates.age or 32,
            gender=updates.gender or "Male",
            preferred_language=updates.preferredLanguage or "Hindi",
            abha_id=updates.abhaId or "91-4820-1940-5829",
            mobile_number=updates.mobileNumber or "+91 98765 43210",
            email=updates.email or "rahul.sharma@example.com"
        )
        db.add(profile)
    else:
        if updates.fullName is not None: profile.full_name = updates.fullName
        if updates.age is not None: profile.age = updates.age
        if updates.gender is not None: profile.gender = updates.gender
        if updates.preferredLanguage is not None: profile.preferred_language = updates.preferredLanguage
        if updates.abhaId is not None: profile.abha_id = updates.abhaId
        if updates.mobileNumber is not None: profile.mobile_number = updates.mobileNumber
        if updates.email is not None: profile.email = updates.email
    
    await db.commit()
    return PatientProfileResponse(
        id=profile.id,
        fullName=profile.full_name,
        age=profile.age,
        gender=profile.gender,
        preferredLanguage=profile.preferred_language,
        abhaId=profile.abha_id,
        mobileNumber=profile.mobile_number,
        email=profile.email
    )
