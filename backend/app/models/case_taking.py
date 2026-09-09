from sqlalchemy import String, Boolean, JSON, DateTime, func, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    patient_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String, default="active") # active, completed
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

class ChatMessageModel(Base):
    __tablename__ = "chat_messages"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    session_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    sender: Mapped[str] = mapped_column(String, nullable=False) # ai, patient, system
    text: Mapped[str] = mapped_column(Text, nullable=False)
    timestamp: Mapped[str] = mapped_column(String, nullable=False)
    options: Mapped[list] = mapped_column(JSON, default=[])
    is_red_flag: Mapped[bool] = mapped_column(Boolean, default=False)

class ClinicalCaseSummaryModel(Base):
    __tablename__ = "clinical_case_summaries"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    patient_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    chief_complaint: Mapped[str] = mapped_column(Text, nullable=False)
    hpi: Mapped[dict] = mapped_column(JSON, nullable=False)
    past_medical_history: Mapped[list] = mapped_column(JSON, default=[])
    past_surgical_history: Mapped[list] = mapped_column(JSON, default=[])
    current_medications: Mapped[list] = mapped_column(JSON, default=[])
    allergies: Mapped[list] = mapped_column(JSON, default=[])
    family_history: Mapped[str] = mapped_column(Text, default="")
    personal_history: Mapped[str] = mapped_column(Text, default="")
    review_of_systems: Mapped[str] = mapped_column(Text, default="")
    previous_investigations: Mapped[str] = mapped_column(Text, default="")
    document_summary: Mapped[str] = mapped_column(Text, default="")
    verified_by_doctor: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
