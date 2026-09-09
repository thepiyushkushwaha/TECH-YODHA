# DRISHTI Production Backend Service

**DRISHTI**: *"Your Intelligent Patient Case-Taking Assistant"*

Production-ready backend built with Python 3.11+, FastAPI, PostgreSQL, SQLAlchemy 2.0, Alembic, Pydantic v2, JWT Authentication, Ollama LLM Integration, OCR processing, and Docker Compose.

---

## Architecture & Microservices Overview

The backend architecture consists of 16 modular service endpoints connecting seamlessly with the React frontend:

1. **Authentication Service** (`/api/v1/auth`): JWT Auth & password hashing for Patient, Doctor, AYUSH Doctor.
2. **Patient Service** (`/api/v1/patients`): Profile CRUD & ABHA ID linkage.
3. **Doctor Service** (`/api/v1/doctors`): Doctor directory & OPD availability queue.
4. **AYUSH Service** (`/api/v1/ayush`): Ayurvedic Prakriti analysis & Dashavidha Pariksha.
5. **Hospital Service** (`/api/v1/hospitals`): OPD departments & real-time slot tracking.
6. **QR Session Service** (`/api/v1/qr-session`): OPD QR session scanner & instant connection.
7. **Consent Service** (`/api/v1/consents`): Granular data-sharing consent controls.
8. **AI Case-Taking Service** (`/api/v1/case-taking`): Interactive symptom chat with local Ollama LLM & fallback engine.
9. **Red-Flag Detection Service** (`/api/v1/red-flag`): Emergency safety symptom evaluator.
10. **Medical Document Service** (`/api/v1/documents`): File upload & document storage.
11. **OCR Service** (`/api/v1/ocr`): Lab report & prescription parameter extraction.
12. **Clinical Summary Service** (`/api/v1/clinical-summary`): HPI & medical history aggregator.
13. **Specialty Recommendation Service** (`/api/v1/recommendations`): Safety-compliant non-diagnostic department routing.
14. **Appointment Service** (`/api/v1/appointments`): OPD booking & token queue management (`#A1024`).
15. **Medical History Service** (`/api/v1/medical-history`): Shared medical records history.
16. **Notification Service** (`/api/v1/notifications`): Real-time in-app alerts.

> [!IMPORTANT]  
> **HEALTHCARE SAFETY RULE**: DRISHTI is NOT a diagnostic system. It collects and structures clinical history without making direct disease diagnoses ("You have disease X"). Instead, it suggests relevant medical departments and prepares summaries for doctor validation.

---

## Getting Started

### 1. Docker Compose (Recommended)

To start the complete environment (FastAPI Backend + PostgreSQL + Ollama):

```bash
cd backend
docker-compose up --build -d
```

Access Interactive API Documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2. Local Python Environment Setup

```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

Run seed database script:
```bash
python seed.py
```

Start dev server:
```bash
uvicorn app.main:app --reload --port 8000
```

---

## Running Automated Tests

```bash
cd backend
pytest tests/ -v
```

---

## Environment Variables Configuration (`.env`)

| Variable | Default Value | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql+asyncpg://drishti_user:drishti_password@localhost:5432/drishti_db` | Async PostgreSQL DB URI |
| `SECRET_KEY` | `drishti_super_secret_jwt_key_production_2026_healthcare_safety` | JWT signing key |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama local LLM endpoint |
| `OLLAMA_MODEL` | `llama3` | Ollama model name |
