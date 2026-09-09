import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.router import api_router

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("drishti.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables if they do not exist
    logger.info("Initializing DRISHTI Database schema...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database schema initialized successfully.")
    
    yield
    
    # Shutdown
    logger.info("Shutting down DRISHTI Backend Service...")
    await engine.dispose()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "DRISHTI: Your Intelligent Patient Case-Taking Assistant Backend REST APIs. "
        "Supports Patient, Doctor, and AYUSH Doctor workflows, AI Case Taking, "
        "Red-Flag Safety Detection, Ollama LLM integration, and Medical Document OCR."
    ),
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Set CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload dir exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "DRISHTI Production Backend",
        "version": settings.VERSION,
        "documentation": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected", "ollama_endpoint": settings.OLLAMA_BASE_URL}
