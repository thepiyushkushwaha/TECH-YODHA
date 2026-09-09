from sqlalchemy import String, JSON, Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class AyushAssessmentModel(Base):
    __tablename__ = "ayush_assessments"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    patient_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    prakriti: Mapped[dict] = mapped_column(JSON, nullable=False) # vata, pitta, kapha, dominant
    vikriti: Mapped[str] = mapped_column(Text, nullable=False)
    sara: Mapped[str] = mapped_column(Text, nullable=False)
    samhanana: Mapped[str] = mapped_column(Text, nullable=False)
    pramana: Mapped[str] = mapped_column(Text, nullable=False)
    satmya: Mapped[str] = mapped_column(Text, nullable=False)
    sattva: Mapped[str] = mapped_column(Text, nullable=False)
    ahara_shakti: Mapped[str] = mapped_column(Text, nullable=False)
    vyayama_shakti: Mapped[str] = mapped_column(Text, nullable=False)
    vaya: Mapped[str] = mapped_column(Text, nullable=False)
    ahara: Mapped[str] = mapped_column(Text, nullable=False)
    vihara: Mapped[str] = mapped_column(Text, nullable=False)
    nidana: Mapped[str] = mapped_column(Text, nullable=False)
    samprapti: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
