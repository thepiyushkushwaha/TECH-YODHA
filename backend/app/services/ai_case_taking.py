from typing import Dict, Any, List
from app.services.ollama_client import ollama_client
from app.services.red_flag_service import red_flag_service

SYSTEM_SAFETY_PROMPT = (
    "You are DRISHTI, an intelligent AI patient case-taking assistant for OPD consultations. "
    "SAFETY MANDATE: YOU ARE NOT A DIAGNOSTIC SYSTEM. DO NOT SAY 'You have disease X'. "
    "Instead, ask structured clinical follow-up questions (onset, location, duration, character, severity 1-10, aggravating/relieving factors, associated symptoms) "
    "and suggest relevant hospital departments or medical specialties. Keep responses empathetic, clear, and structured."
)

class AICaseTakingService:
    async def process_patient_message(self, text: str, language: str = "English") -> Dict[str, Any]:
        # 1. Check for Red Flags
        is_red_flag, red_flag_reason = red_flag_service.detect_red_flag(text)
        if is_red_flag:
            return {
                "response_text": (
                    "CRITICAL EMERGENCY ALERT: Based on the symptoms described ("
                    + red_flag_reason
                    + "), immediate medical attention is strongly advised. "
                    "We have flagged your queue token for Emergency Priority evaluation."
                ),
                "options": ["Proceed to Emergency Desk", "Call Emergency Ambulance (108)"],
                "is_red_flag": True,
                "red_flag_reason": red_flag_reason
            }

        # 2. Try LLM generation via Ollama
        prompt = f"Patient input ({language}): '{text}'. Formulate the next empathetic follow-up question to clarify symptoms and 3 quick choice options for the patient."
        llm_response = await ollama_client.generate_completion(prompt, system_prompt=SYSTEM_SAFETY_PROMPT)

        if llm_response:
            return {
                "response_text": llm_response,
                "options": ["Gradual onset over 2 days", "Sudden onset after meals", "Continuous discomfort"],
                "is_red_flag": False,
                "red_flag_reason": None
            }

        # 3. Dynamic Rule-Based Fallback Engine
        text_lower = text.lower()
        if "chest" in text_lower or "pain" in text_lower or "heaviness" in text_lower:
            return {
                "response_text": "I understand you are feeling chest discomfort. Could you specify if this heaviness increases with physical exertion, heavy meals, or deep breathing?",
                "options": ["Worse with heavy meals", "Worse with exertion or stairs", "Same at rest"],
                "is_red_flag": False,
                "red_flag_reason": None
            }
        elif "cough" in text_lower or "fever" in text_lower or "throat" in text_lower:
            return {
                "response_text": "Thank you for sharing. How many days have you experienced this cough, and is it a dry cough or associated with phlegm?",
                "options": ["Dry cough (3-5 days)", "Productive cough with phlegm", "Associated with low fever"],
                "is_red_flag": False,
                "red_flag_reason": None
            }
        elif "stomach" in text_lower or "acidity" in text_lower or "gastric" in text_lower:
            return {
                "response_text": "Noted. Is the abdominal discomfort located near the upper stomach, and do you experience burning sensation after meals?",
                "options": ["Upper stomach burning", "Fullness after eating", "Intermittent cramping"],
                "is_red_flag": False,
                "red_flag_reason": None
            }
        else:
            return {
                "response_text": f"Thank you. To help the doctor prepare for your consultation, could you describe how long you have noticed this, and on a scale of 1 to 10 how severe is the discomfort?",
                "options": ["1-3 (Mild)", "4-6 (Moderate)", "7-10 (Severe)"],
                "is_red_flag": False,
                "red_flag_reason": None
            }

ai_case_taking_service = AICaseTakingService()
