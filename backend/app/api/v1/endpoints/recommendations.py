from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
from app.schemas.hospital import DepartmentResponse
from app.services.recommendation_service import recommendation_service

router = APIRouter()

class RecommendationRequest(BaseModel):
    chiefComplaint: str = "Chest discomfort and retrosternal heaviness"
    symptoms: str = ""

@router.post("/departments", response_model=List[DepartmentResponse])
async def recommend_departments(request: RecommendationRequest):
    return recommendation_service.get_recommended_departments(request.chiefComplaint, request.symptoms)

@router.get("/departments", response_model=List[DepartmentResponse])
async def get_recommended_departments():
    return recommendation_service.get_recommended_departments("Chest discomfort and retrosternal heaviness")
