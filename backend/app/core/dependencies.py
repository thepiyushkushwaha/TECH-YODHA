from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

async def get_current_user_payload(token: str = Depends(oauth2_scheme)) -> dict:
    if not token:
        # Fallback for dev / unauthenticated demo requests
        return {"sub": "PAT-9842", "role": "patient"}
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

async def get_current_user_role(payload: dict = Depends(get_current_user_payload)) -> str:
    return payload.get("role", "patient")
