from sqlalchemy import String, Boolean, JSON, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class ConsentRecord(Base):
    __tablename__ = "consent_records"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    patient_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    abha_consent_given: Mapped[bool] = mapped_column(Boolean, default=True)
    shared_data_scopes: Mapped[dict] = mapped_column(
        JSON, 
        default=lambda: {
            "caseSummary": True,
            "medicalHistory": True,
            "labReports": True,
            "prescriptionHistory": True,
            "dischargeSummary": False
        }
    )
    timestamp: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
