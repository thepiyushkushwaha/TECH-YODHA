from typing import List, Dict, Any

class SpecialtyRecommendationService:
    @staticmethod
    def get_recommended_departments(chief_complaint: str, symptoms: str = "") -> List[Dict[str, Any]]:
        text_lower = (chief_complaint + " " + symptoms).lower()
        
        departments = [
            {
                "id": "dept-gen-med",
                "name": "General Medicine",
                "description": "Based on the information provided, General Medicine may be relevant for comprehensive adult health evaluation and acute symptom management.",
                "availableDoctors": 12,
                "availableSlots": 42,
                "totalSlots": 100,
                "isSuggested": True
            },
            {
                "id": "dept-cardio",
                "name": "Cardiology",
                "description": "Based on the information provided regarding chest symptoms or vascular health, Cardiology evaluation may be relevant.",
                "availableDoctors": 8,
                "availableSlots": 18,
                "totalSlots": 100,
                "isSuggested": True if ("chest" in text_lower or "heart" in text_lower or "pressure" in text_lower) else False
            },
            {
                "id": "dept-ortho",
                "name": "Orthopedics",
                "description": "Based on the information provided, Orthopedics may be relevant for bone, joint, muscle, or locomotor history assessment.",
                "availableDoctors": 6,
                "availableSlots": 35,
                "totalSlots": 100,
                "isSuggested": True if ("joint" in text_lower or "bone" in text_lower or "knee" in text_lower or "back" in text_lower) else False
            }
        ]
        return departments

recommendation_service = SpecialtyRecommendationService()
