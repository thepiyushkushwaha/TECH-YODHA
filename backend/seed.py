import asyncio
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import engine, AsyncSessionLocal, Base
from app.models.user import User
from app.models.patient import PatientProfile
from app.models.doctor import Doctor
from app.models.hospital import Hospital, Department
from app.models.appointment import AppointmentModel
from app.models.ayush import AyushAssessmentModel
from app.core.security import get_password_hash

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("drishti.seed")

async def seed_data():
    logger.info("Recreating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        logger.info("Inserting initial users...")
        users = [
            User(
                id="PAT-9842",
                email="rahul.sharma@example.com",
                hashed_password=get_password_hash("patient123"),
                full_name="Rahul Sharma",
                role="patient"
            ),
            User(
                id="DOC-101",
                email="dr.ankit@kgmu.edu",
                hashed_password=get_password_hash("doctor123"),
                full_name="Dr. Ankit Sharma",
                role="doctor"
            ),
            User(
                id="AYUSH-201",
                email="dr.ayush@kgmu.edu",
                hashed_password=get_password_hash("ayush123"),
                full_name="Dr. Ayurvedic Vaidya",
                role="ayush"
            )
        ]
        session.add_all(users)

        logger.info("Inserting patient profiles...")
        patient = PatientProfile(
            id="PAT-9842",
            user_id="PAT-9842",
            full_name="Rahul Sharma",
            age=32,
            gender="Male",
            preferred_language="Hindi",
            abha_id="91-4820-1940-5829",
            mobile_number="+91 98765 43210",
            email="rahul.sharma@example.com"
        )
        session.add(patient)

        logger.info("Inserting hospital and OPD departments...")
        hosp = Hospital(
            id="HOSP-KGMU-01",
            name="King George’s Medical University",
            department="General Medicine OPD",
            hospital_code="KGMU-OPD-001",
            session_id="OPD Session #A1024",
            available_doctors_count=18
        )
        session.add(hosp)

        departments = [
            Department(
                id="dept-gen-med",
                name="General Medicine",
                description="Comprehensive adult health evaluations, acute symptom management, and chronic illness consultations.",
                available_doctors=12,
                available_slots=42,
                total_slots=100,
                is_suggested=True
            ),
            Department(
                id="dept-cardio",
                name="Cardiology",
                description="Specialized evaluation for chest symptoms, vascular health, lipid profiles, and cardiovascular prevention.",
                available_doctors=8,
                available_slots=18,
                total_slots=100,
                is_suggested=True
            ),
            Department(
                id="dept-ortho",
                name="Orthopedics",
                description="Bone, joint, muscle, and locomotor disorder consultation and history assessment.",
                available_doctors=6,
                available_slots=35,
                total_slots=100,
                is_suggested=False
            )
        ]
        session.add_all(departments)

        logger.info("Inserting doctors...")
        doctors = [
            Doctor(
                id="doc-1",
                name="Dr. Ankit Sharma",
                department_id="dept-gen-med",
                department_name="General Medicine",
                rating=4.8,
                experience_years=14,
                available_slots_count=42,
                total_slots_count=100,
                languages=["Hindi", "English"],
                available_slots=["10:30 AM", "11:00 AM", "11:30 AM", "12:30 PM", "02:00 PM"],
                is_ayush=False,
                avatar_url="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
            ),
            Doctor(
                id="doc-2",
                name="Dr. Priya Singh",
                department_id="dept-gen-med",
                department_name="General Medicine",
                rating=4.7,
                experience_years=11,
                available_slots_count=18,
                total_slots_count=100,
                languages=["Hindi", "English", "Bengali"],
                available_slots=["11:15 AM", "01:00 PM", "02:30 PM", "03:15 PM"],
                is_ayush=False,
                avatar_url="https://images.unsplash.com/photo-1594824813566-88855ce78c4a?auto=format&fit=crop&q=80&w=400"
            )
        ]
        session.add_all(doctors)

        await session.commit()
        logger.info("Database seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
