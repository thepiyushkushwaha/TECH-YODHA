from typing import Tuple, Optional, List

# Key red-flag emergency symptoms triggering instant safety alerts
RED_FLAG_KEYWORDS = [
    "crushing chest pain",
    "radiating to left arm",
    "severe shortness of breath",
    "sudden loss of consciousness",
    "slurred speech",
    "facial drooping",
    "sudden weakness on one side",
    "uncontrolled bleeding",
    "coughing up blood",
    "hemoptysis",
    " anaphylaxis",
    "severe chest pressure",
    "sweating profusely"
]

class RedFlagService:
    @staticmethod
    def detect_red_flag(text: str) -> Tuple[bool, Optional[str]]:
        text_lower = text.lower()
        for keyword in RED_FLAG_KEYWORDS:
            if keyword in text_lower:
                reason = f"High-priority symptom detected: '{keyword}'. Emergency evaluation required immediately."
                return True, reason
        return False, None

red_flag_service = RedFlagService()
