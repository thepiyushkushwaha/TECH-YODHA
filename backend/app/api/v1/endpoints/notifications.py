from fastapi import APIRouter
from typing import List

router = APIRouter()

MOCK_NOTIFICATIONS = [
    {
        "id": "notif-1",
        "title": "Hospital Connected",
        "message": "Connected to King George’s Medical University OPD Session #A1024",
        "timestamp": "10:30 AM",
        "type": "info"
    },
    {
        "id": "notif-2",
        "title": "Document Processed",
        "message": "Blood_Test_March.pdf uploaded and processed successfully",
        "timestamp": "10:35 AM",
        "type": "success"
    }
]

@router.get("", response_model=List[dict])
async def get_notifications():
    return MOCK_NOTIFICATIONS
