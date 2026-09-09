from fastapi import APIRouter, HTTPException
from typing import List
import uuid
from app.schemas.appointment import (
    AppointmentResponse, 
    BookAppointmentRequest, 
    UpdateAppointmentStatusRequest
)

router = APIRouter()

MOCK_APPOINTMENTS = [
    {
        "id": "APT-1024",
        "tokenNumber": "#A1024",
        "patientName": "Rahul Sharma",
        "patientAge": 32,
        "patientGender": "Male",
        "doctorName": "Dr. Ankit Sharma",
        "doctorDepartment": "General Medicine OPD",
        "hospitalName": "King George’s Medical University",
        "appointmentTime": "11:30 AM",
        "appointmentDate": "Today",
        "sharedData": {
            "caseSummary": True,
            "medicalHistory": True,
            "labReports": True,
            "prescriptionHistory": True,
            "dischargeSummary": False
        },
        "status": "Waiting",
        "caseSummaryDraft": {
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
            "pastMedicalHistory": ["Mild hypertension diagnosed 1 year ago"],
            "pastSurgicalHistory": ["No prior surgical history reported"],
            "currentMedications": ["Tab Pantoprazole 40mg"],
            "allergies": ["No known drug allergies"],
            "familyHistory": "Father had hypertension at age 55",
            "personalHistory": "Non-smoker",
            "reviewOfSystems": "Cardiovascular: Dull chest pressure",
            "previousInvestigations": "Blood Test: Hb 11.2 g/dL",
            "documentSummary": "2 documents analyzed",
            "verifiedByDoctor": False
        }
    },
    {
        "id": "APT-1025",
        "tokenNumber": "#A1025",
        "patientName": "Priya Agarwal",
        "patientAge": 45,
        "patientGender": "Female",
        "doctorName": "Dr. Ankit Sharma",
        "doctorDepartment": "General Medicine OPD",
        "hospitalName": "King George’s Medical University",
        "appointmentTime": "11:45 AM",
        "appointmentDate": "Today",
        "sharedData": {
            "caseSummary": True,
            "medicalHistory": True,
            "labReports": True,
            "prescriptionHistory": True,
            "dischargeSummary": True
        },
        "status": "Waiting",
        "caseSummaryDraft": {
            "chiefComplaint": "Persistent dry cough and low-grade fever for 5 days.",
            "hpi": {
                "onset": "5 days ago",
                "location": "Throat and chest",
                "duration": "Continuous dry cough worsening at night",
                "character": "Dry irritation",
                "severity": "4 out of 10",
                "aggravatingFactors": "Cold air, dust",
                "relievingFactors": "Hot tea, throat lozenges",
                "associatedSymptoms": "Mild fatigue, body pain"
            },
            "pastMedicalHistory": ["Seasonal allergies"],
            "pastSurgicalHistory": ["None"],
            "currentMedications": ["Cetirizine 10mg OD"],
            "allergies": ["Dust mites"],
            "familyHistory": "No asthma history",
            "personalHistory": "Teetotaler",
            "reviewOfSystems": "Respiratory dry cough",
            "previousInvestigations": "Chest X-Ray Clear (Jan 2026)",
            "documentSummary": "1 report attached",
            "verifiedByDoctor": False
        }
    },
    {
        "id": "APT-1026",
        "tokenNumber": "#A1026",
        "patientName": "Amit Kumar",
        "patientAge": 58,
        "patientGender": "Male",
        "doctorName": "Dr. Ankit Sharma",
        "doctorDepartment": "General Medicine OPD",
        "hospitalName": "King George’s Medical University",
        "appointmentTime": "12:00 PM",
        "appointmentDate": "Today",
        "sharedData": {
            "caseSummary": True,
            "medicalHistory": True,
            "labReports": True,
            "prescriptionHistory": False,
            "dischargeSummary": True
        },
        "status": "Emergency Priority",
        "caseSummaryDraft": {
            "chiefComplaint": "Sudden severe crushing chest pain radiating to left arm with profuse diaphoresis.",
            "hpi": {
                "onset": "30 minutes ago while sitting",
                "location": "Substernal radiating to left shoulder and arm",
                "duration": "Continuous 30+ minutes",
                "character": "Heavy crushing pressure",
                "severity": "9 out of 10",
                "aggravatingFactors": "None",
                "relievingFactors": "None",
                "associatedSymptoms": "Profuse sweating, severe nausea, acute dyspnea"
            },
            "pastMedicalHistory": ["Hypertension x 8 years", "Type 2 Diabetes x 5 years"],
            "pastSurgicalHistory": ["None"],
            "currentMedications": ["Amlodipine 5mg", "Metformin 500mg"],
            "allergies": ["NKDA"],
            "familyHistory": "Brother had MI at 50",
            "personalHistory": "Ex-smoker",
            "reviewOfSystems": "Acute CV distress",
            "previousInvestigations": "Lipid profile elevated",
            "documentSummary": "Discharge Summary attached",
            "verifiedByDoctor": False
        }
    }
]

@router.get("", response_model=List[AppointmentResponse])
async def list_appointments():
    return MOCK_APPOINTMENTS

@router.post("/book", response_model=AppointmentResponse)
async def book_appointment(booking: BookAppointmentRequest):
    new_id = f"APT-{1024 + len(MOCK_APPOINTMENTS)}"
    token_num = f"#A{1024 + len(MOCK_APPOINTMENTS)}"
    
    new_appointment = {
        "id": new_id,
        "tokenNumber": token_num,
        "patientName": "Rahul Sharma",
        "patientAge": 32,
        "patientGender": "Male",
        "doctorName": "Dr. Ankit Sharma",
        "doctorDepartment": "General Medicine OPD",
        "hospitalName": "King George’s Medical University",
        "appointmentTime": booking.appointmentTime,
        "appointmentDate": booking.appointmentDate or "Today",
        "sharedData": booking.sharedData.model_dump(),
        "status": "Waiting",
        "caseSummaryDraft": MOCK_APPOINTMENTS[0]["caseSummaryDraft"]
    }
    
    MOCK_APPOINTMENTS.append(new_appointment)
    return new_appointment

@router.put("/{appointment_id}/status", response_model=AppointmentResponse)
async def update_appointment_status(appointment_id: str, request: UpdateAppointmentStatusRequest):
    for apt in MOCK_APPOINTMENTS:
        if apt["id"] == appointment_id:
            apt["status"] = request.status
            return apt
    raise HTTPException(status_code=404, detail="Appointment not found")
