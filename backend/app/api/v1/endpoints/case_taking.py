from fastapi import APIRouter
import uuid
from datetime import datetime
from app.schemas.case_taking import SendMessageRequest, SendMessageResponse, ChatMessage
from app.services.ai_case_taking import ai_case_taking_service

router = APIRouter()

@router.post("/chat", response_model=SendMessageResponse)
async def process_chat_message(request: SendMessageRequest):
    result = await ai_case_taking_service.process_patient_message(
        text=request.text,
        language=request.language or "English"
    )
    
    ai_message = ChatMessage(
        id=f"msg-{uuid.uuid4().hex[:8]}",
        sender="ai",
        text=result["response_text"],
        timestamp=datetime.now().strftime("%I:%M %p"),
        options=result.get("options"),
        isRedFlag=result.get("is_red_flag", False)
    )
    
    return SendMessageResponse(
        message=ai_message,
        followUpOptions=result.get("options"),
        isRedFlag=result.get("is_red_flag", False),
        redFlagReason=result.get("red_flag_reason")
    )
