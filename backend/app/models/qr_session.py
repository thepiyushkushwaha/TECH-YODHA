from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class QRSession(Base):
    __tablename__ = "qr_sessions"

    session_id: Mapped[str] = mapped_column(String, primary_key=True)
    hospital_id: Mapped[str] = mapped_column(String, nullable=False)
    department_name: Mapped[str] = mapped_column(String, nullable=False)
    hospital_code: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, default="active") # active, expired, completed
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
