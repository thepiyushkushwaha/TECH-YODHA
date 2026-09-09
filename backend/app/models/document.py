from sqlalchemy import String, JSON, Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from typing import Optional

class MedicalDocumentModel(Base):
    __tablename__ = "medical_documents"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    patient_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    filename: Mapped[str] = mapped_column(String, nullable=False)
    document_type: Mapped[str] = mapped_column(String, nullable=False) # Prescription, Lab Report, Discharge Summary, Imaging Report, Other
    date: Mapped[str] = mapped_column(String, nullable=False)
    upload_status: Mapped[str] = mapped_column(String, default="Processed") # Processed, Uploading, Failed
    file_size: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    extracted_information: Mapped[dict] = mapped_column(JSON, default={})
    raw_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    file_path: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
