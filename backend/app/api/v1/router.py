from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    patients,
    doctors,
    ayush,
    hospitals,
    qr_sessions,
    consents,
    case_taking,
    red_flag,
    documents,
    ocr,
    clinical_summary,
    recommendations,
    appointments,
    medical_history,
    notifications
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication Service"])
api_router.include_router(patients.router, prefix="/patients", tags=["Patient Service"])
api_router.include_router(doctors.router, prefix="/doctors", tags=["Doctor Service"])
api_router.include_router(ayush.router, prefix="/ayush", tags=["AYUSH Service"])
api_router.include_router(hospitals.router, prefix="/hospitals", tags=["Hospital Service"])
api_router.include_router(qr_sessions.router, prefix="/qr-session", tags=["QR Session Service"])
api_router.include_router(consents.router, prefix="/consents", tags=["Consent Service"])
api_router.include_router(case_taking.router, prefix="/case-taking", tags=["AI Case-Taking Service"])
api_router.include_router(red_flag.router, prefix="/red-flag", tags=["Red-Flag Detection Service"])
api_router.include_router(documents.router, prefix="/documents", tags=["Medical Document Service"])
api_router.include_router(ocr.router, prefix="/ocr", tags=["OCR Service"])
api_router.include_router(clinical_summary.router, prefix="/clinical-summary", tags=["Clinical Summary Service"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Specialty Recommendation Service"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointment Service"])
api_router.include_router(medical_history.router, prefix="/medical-history", tags=["Medical History Service"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notification Service"])
