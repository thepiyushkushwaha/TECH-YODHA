from sqlalchemy import String, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Hospital(Base):
    __tablename__ = "hospitals"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    department: Mapped[str] = mapped_column(String, nullable=False)
    hospital_code: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    session_id: Mapped[str] = mapped_column(String, nullable=False)
    available_doctors_count: Mapped[int] = mapped_column(Integer, default=18)

class Department(Base):
    __tablename__ = "departments"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    available_doctors: Mapped[int] = mapped_column(Integer, default=10)
    available_slots: Mapped[int] = mapped_column(Integer, default=40)
    total_slots: Mapped[int] = mapped_column(Integer, default=100)
    is_suggested: Mapped[bool] = mapped_column(Boolean, default=False)
