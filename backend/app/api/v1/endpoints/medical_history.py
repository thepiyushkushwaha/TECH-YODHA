from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def get_patient_medical_history(patient_id: str = "PAT-9842"):
    return {
        "patientId": patient_id,
        "pastMedicalHistory": [
            "Mild hypertension diagnosed 1 year ago (under lifestyle management)",
            "Transient acidity episodes"
        ],
        "pastSurgicalHistory": ["No prior surgical history reported"],
        "allergies": ["No known drug allergies (NKDA)"],
        "familyHistory": "Father had hypertension at age 55; Mother has no chronic illnesses.",
        "currentMedications": ["Tab Pantoprazole 40mg (As needed for acidity)"]
    }
