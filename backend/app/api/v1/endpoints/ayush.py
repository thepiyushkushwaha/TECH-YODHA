from fastapi import APIRouter, Depends
from app.schemas.ayush import AyushAssessmentResponse

router = APIRouter()

MOCK_AYUSH_ASSESSMENT = {
    "prakriti": {
        "vata": 45,
        "pitta": 35,
        "kapha": 20,
        "dominant": "Vata-Pitta Prakriti"
    },
    "vikriti": "Vata-Kapha Kopa (Aggravation due to seasonal cold & irregular ahara)",
    "sara": "Rakta & Mamsa Sara (Medium strength structural tissue essence)",
    "samhanana": "Madhyama (Compact and balanced physical structure)",
    "pramana": "Madhyama Body Proportions (Balanced skeletal frame)",
    "satmya": "Sarmarasa Satmya (Habituated to balanced North Indian diet)",
    "sattva": "Pravara (Strong mental resilience and emotional stability)",
    "aharaShakti": "Abhyavaharana & Jarana Shakti - Madhyama (Moderate digestive fire / Agni)",
    "vyayamaShakti": "Madhyama (Can comfortably perform 30 min daily activity)",
    "vaya": "Yuva Vaya (32 Years - Youthful stage of life)",
    "ahara": "Excessive consumption of dry/spicy food, late night dinners, tea twice daily",
    "vihara": "Irregular sleeping hours, prolonged computer screen work",
    "nidana": "Sheeta Vata Exposure (Cold breeze exposure during late evening commute)",
    "samprapti": "Vata dosha aggravated in Hridaya sthana -> causing Stambha (stiffness) and Shoola (dull discomfort) aggravated by Agnimandya."
}

@router.get("/assessment/{patient_id}", response_model=AyushAssessmentResponse)
async def get_ayush_assessment(patient_id: str):
    return MOCK_AYUSH_ASSESSMENT

@router.get("/dashavidha-pariksha", response_model=AyushAssessmentResponse)
async def get_dashavidha_pariksha():
    return MOCK_AYUSH_ASSESSMENT
