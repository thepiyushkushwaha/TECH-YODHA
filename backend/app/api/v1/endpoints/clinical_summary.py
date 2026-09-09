from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas.case_taking import ClinicalCaseSummary

router = APIRouter()

MOCK_CASE_SUMMARY = {
    "chiefComplaint": "Chest discomfort and retrosternal heaviness for 2 days.",
    "hpi": {
        "onset": "2 days ago during evening work",
        "location": "Mid-sternal region, non-radiating",
        "duration": "Intermittent episodes lasting 15-20 minutes",
        "character": "Dull ache and pressure sensation",
        "severity": "5 out of 10",
        "aggravatingFactors": "Heavy meals, fast walking, mental exertion",
        "relievingFactors": "Rest, sipping warm water",
        "associatedSymptoms": "Mild breathlessness on climbing stairs; no sweating or vomiting"
    },
    "pastMedicalHistory": [
        "Mild hypertension diagnosed 1 year ago (under lifestyle management)",
        "Transient acidity episodes"
    ],
    "pastSurgicalHistory": ["No prior surgical history reported"],
    "currentMedications": ["Tab Pantoprazole 40mg (As needed for acidity)"],
    "allergies": ["No known drug allergies (NKDA)"],
    "familyHistory": "Father had hypertension at age 55; Mother has no chronic illnesses.",
    "personalHistory": "Non-smoker, occasional tea consumer, light exercise 2 times a week.",
    "reviewOfSystems": "Cardiovascular: Dull chest pressure. Respiratory: Mild exertional dyspnea. GI: Mild reflux feeling. CNS: Normal.",
    "previousInvestigations": "Blood Test (12 Mar 2026): Hb 11.2 g/dL, WBC 8,200/µL, Platelets 2.4L. ECG 6 months ago reported normal sinus rhythm.",
    "documentSummary": "2 documents analyzed (Blood_Test_March.pdf, Previous_Prescription_Jan2026.pdf). Extracted Hb 11.2 g/dL and previous PPI prescription.",
    "verifiedByDoctor": False
}

@router.get("", response_model=ClinicalCaseSummary)
async def get_clinical_summary():
    return MOCK_CASE_SUMMARY

@router.put("", response_model=ClinicalCaseSummary)
async def update_clinical_summary(summary: ClinicalCaseSummary):
    global MOCK_CASE_SUMMARY
    MOCK_CASE_SUMMARY = summary.model_dump()
    return MOCK_CASE_SUMMARY

@router.post("/verify")
async def verify_clinical_summary():
    MOCK_CASE_SUMMARY["verifiedByDoctor"] = True
    return {"status": "verified", "verifiedByDoctor": True}
