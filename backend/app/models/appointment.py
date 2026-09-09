from sqlalchemy import String, Integer, JSON, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class AppointmentModel(Base):
    __tablename__ = "appointments"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    token_number: Mapped[str] = mapped_column(String, nullable=False)
    patient_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    patient_name: Mapped[str] = mapped_column(String, nullable=False)
    patient_age: Mapped[int] = mapped_column(Integer, nullable=False)
    patient_gender: Mapped[str] = mapped_column(String, nullable=False)
    doctor_id: Mapped[str] = mapped_column(String, nullable=False)
    doctor_name: Mapped[str] = mapped_column(String, nullable=False)
    doctor_department: Mapped[str] = mapped_column(String, nullable=False)
    hospital_name: Mapped[str] = mapped_column(String, nullable=False)
    appointment_time: Mapped[str] = mapped_column(String, nullable=False)
    appointment_date: Mapped[str] = mapped_column(String, nullable=False)
    shared_data: Mapped[dict] = mapped_column(JSON, default={})
    status: Mapped[str] = mapped_column(String, default="Waiting") # Waiting, Ready, In Consultation, Completed, Emergency Priority
    case_summary_draft: Mapped[dict] = mapped_column(JSON, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
