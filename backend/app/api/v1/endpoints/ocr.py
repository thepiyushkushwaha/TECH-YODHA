from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ocr_service import ocr_service

router = APIRouter()

class OCRProcessRequest(BaseModel):
    filename: str
    documentType: str

@router.post("/process")
async def process_ocr(request: OCRProcessRequest):
    extracted_info, raw_summary = ocr_service.process_medical_document(request.filename, request.documentType)
    return {
        "filename": request.filename,
        "extractedInformation": extracted_info,
        "rawSummary": raw_summary
    }
