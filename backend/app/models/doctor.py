from sqlalchemy import String, Float, Integer, Boolean, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from typing import Optional, List, Dict

class Doctor(Base):
    __tablename__ = "doctors"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[Optional[str]] = mapped_column(String, ForeignKey("users.id"), nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    department_id: Mapped[str] = mapped_column(String, nullable=False)
    department_name: Mapped[str] = mapped_column(String, nullable=False)
    rating: Mapped[float] = mapped_column(Float, default=4.8)
    experience_years: Mapped[int] = mapped_column(Integer, default=10)
    available_slots_count: Mapped[int] = mapped_column(Integer, default=20)
    total_slots_count: Mapped[int] = mapped_column(Integer, default=100)
    languages: Mapped[list] = mapped_column(JSON, default=["Hindi", "English"])
    available_slots: Mapped[list] = mapped_column(JSON, default=[])
    is_ayush: Mapped[bool] = mapped_column(Boolean, default=False)
    avatar_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
