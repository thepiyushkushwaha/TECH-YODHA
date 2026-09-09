from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
import uuid
import os
from datetime import datetime
from app.schemas.document import MedicalDocumentResponse
from app.services.ocr_service import ocr_service
from app.core.config import settings

router = APIRouter()

MOCK_DOCUMENTS = [
    {
        "id": "doc-lab-1",
        "filename": "Blood_Test_March.pdf",
        "documentType": "Lab Report",
        "date": "12 Mar 2026",
        "uploadStatus": "Processed",
        "fileSize": "1.4 MB",
        "extractedInformation": {
            "Hemoglobin": "11.2 g/dL (Slightly low)",
            "WBC Count": "8,200 /µL (Normal)",
            "Platelets": "2.4 lakh/µL (Normal)",
            "Fasting Blood Sugar": "104 mg/dL (Borderline)",
            "Serum Creatinine": "0.9 mg/dL (Normal)"
        },
        "rawSummary": "Complete Blood Count (CBC) shows mild microcytic anemia with hemoglobin 11.2 g/dL. Renal parameters and leukocyte counts are within normal physiological range."
    },
    {
        "id": "doc-rx-1",
        "filename": "Previous_Prescription_Jan2026.pdf",
        "documentType": "Prescription",
        "date": "15 Jan 2026",
        "uploadStatus": "Processed",
        "fileSize": "850 KB",
        "extractedInformation": {
            "Prescribed Medications": "Tab Antacid 20mg OD x 7 days",
            "Diagnosis Note": "Non-specific epigastric discomfort",
            "Doctor Name": "Dr. S. K. Gupta (Pvt Clinic)"
        },
        "rawSummary": "Proton pump inhibitor course for transient acidity relief."
    }
]

@router.get("", response_model=List[MedicalDocumentResponse])
async def list_medical_documents():
    return MOCK_DOCUMENTS

@router.post("/upload", response_model=MedicalDocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    documentType: str = Form("Lab Report")
):
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_id = f"doc-{uuid.uuid4().hex[:6]}"
    file_location = os.path.join(settings.UPLOAD_DIR, f"{file_id}_{file.filename}")
    
    contents = await file.read()
    with open(file_location, "wb") as f:
        f.write(contents)
        
    extracted_info, raw_summary = ocr_service.process_medical_document(file.filename, documentType)
    
    file_size_kb = round(len(contents) / 1024, 1)
    file_size_str = f"{file_size_kb} KB" if file_size_kb < 1024 else f"{round(file_size_kb/1024, 1)} MB"
    
    doc_response = {
        "id": file_id,
        "filename": file.filename,
        "documentType": documentType,
        "date": datetime.now().strftime("%d %b %Y"),
        "uploadStatus": "Processed",
        "fileSize": file_size_str,
        "extractedInformation": extracted_info,
        "rawSummary": raw_summary
    }
    
    MOCK_DOCUMENTS.insert(0, doc_response)
    return doc_response
