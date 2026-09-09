from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict

class MedicalDocumentResponse(BaseModel):
    id: str
    filename: str
    documentType: str # Prescription, Lab Report, Discharge Summary, Imaging Report, Other
    date: str
    uploadStatus: str # Processed, Uploading, Failed
    fileSize: Optional[str] = None
    extractedInformation: Optional[Dict[str, str]] = None
    rawSummary: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
