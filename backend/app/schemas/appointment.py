from pydantic import BaseModel, ConfigDict
from typing import Dict, Optional
from app.schemas.case_taking import ClinicalCaseSummary

class SharedDataConsent(BaseModel):
    caseSummary: bool = True
    medicalHistory: bool = True
    labReports: bool = True
    prescriptionHistory: bool = True
    dischargeSummary: bool = False

class BookAppointmentRequest(BaseModel):
    doctorId: str
    departmentId: str
    appointmentTime: str
    appointmentDate: Optional[str] = "Today"
    sharedData: SharedDataConsent

class AppointmentResponse(BaseModel):
    id: str
    tokenNumber: str
    patientName: str
    patientAge: int
    patientGender: str
    doctorName: str
    doctorDepartment: str
    hospitalName: str
    appointmentTime: str
    appointmentDate: str
    sharedData: SharedDataConsent
    status: str # Waiting, Ready, In Consultation, Completed, Emergency Priority
    caseSummaryDraft: ClinicalCaseSummary

    model_config = ConfigDict(from_attributes=True)

class UpdateAppointmentStatusRequest(BaseModel):
    status: str
