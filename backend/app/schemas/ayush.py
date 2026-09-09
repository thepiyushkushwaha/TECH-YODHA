from pydantic import BaseModel, ConfigDict
from typing import Dict

class PrakritiAssessment(BaseModel):
    vata: int
    pitta: int
    kapha: int
    dominant: str

class AyushAssessmentResponse(BaseModel):
    prakriti: PrakritiAssessment
    vikriti: str
    sara: str
    samhanana: str
    pramana: str
    satmya: str
    sattva: str
    aharaShakti: str
    vyayamaShakti: str
    vaya: str
    ahara: str
    vihara: str
    nidana: str
    samprapti: str

    model_config = ConfigDict(from_attributes=True)
