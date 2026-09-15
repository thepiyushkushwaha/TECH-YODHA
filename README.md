# TECH-YODHA

Structure 
DRISHTI/
│
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
│
├── public/
│   ├── logo.png
│   └── images/
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    │
    ├── assets/
    │   ├── images/
    │   └── icons/
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   ├── Modal.jsx
    │   ├── ProfileMenu.jsx
    │   ├── DoctorCard.jsx
    │   ├── AppointmentCard.jsx
    │   ├── DocumentCard.jsx
    │   ├── ChatMessage.jsx
    │   ├── QRScanner.jsx
    │   ├── VoiceRecorder.jsx
    │   ├── MedicalSummary.jsx
    │   └── EmergencyAlert.jsx
    │
    ├── pages/
    │   │
    │   ├── Landing/
    │   │   └── Landing.jsx
    │   │
    │   ├── patient/
    │   │   ├── PatientLogin.jsx
    │   │   ├── PatientProfile.jsx
    │   │   ├── Consent.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── QRScannerPage.jsx
    │   │   ├── HospitalConnection.jsx
    │   │   ├── AIChat.jsx
    │   │   ├── VoiceMode.jsx
    │   │   ├── CaseSummary.jsx
    │   │   ├── Departments.jsx
    │   │   ├── Doctors.jsx
    │   │   ├── Booking.jsx
    │   │   ├── Confirmation.jsx
    │   │   ├── MedicalHistory.jsx
    │   │   ├── Documents.jsx
    │   │   ├── Appointments.jsx
    │   │   ├── Settings.jsx
    │   │   ├── Help.jsx
    │   │   └── Feedback.jsx
    │   │
    │   ├── doctor/
    │   │   ├── DoctorLogin.jsx
    │   │   ├── DoctorDashboard.jsx
    │   │   ├── PatientQueue.jsx
    │   │   └── PatientCase.jsx
    │   │
    │   └── ayush/
    │       ├── AyushLogin.jsx
    │       ├── AyushDashboard.jsx
    │       ├── PatientQueue.jsx
    │       ├── PatientCase.jsx
    │       └── AyushAssessment.jsx
    │
    ├── data/
    │   ├── patients.js
    │   ├── doctors.js
    │   ├── hospitals.js
    │   ├── appointments.js
    │   └── documents.js
    │
    ├── context/
    │   ├── AuthContext.jsx
    │   └── PatientContext.jsx
    │
    ├── utils/
    │   ├── mockAI.js
    │   ├── qrSimulator.js
    │   └── helpers.js
    │
    └── styles/
        └── index.css

## Deploying to Vercel and Render

This repository is configured for a split deployment:

- **Vercel** hosts the Vite/React frontend from the repository root.
- **Render** hosts the FastAPI backend and PostgreSQL database using [`render.yaml`](./render.yaml).

### Deploy the backend on Render

1. Push this repository to GitHub and create a new **Blueprint** on Render.
2. Select the repository. Render reads `render.yaml` and creates the `drishti-backend` web service and `drishti-db`.
3. After the first Vercel deployment, set `FRONTEND_URL` in the Render backend service to the Vercel production URL, for example `https://drishti-frontend.vercel.app`.
4. Keep the generated `SECRET_KEY` value private.
5. Verify the service at `https://<your-render-service>.onrender.com/health`.

### Deploy the frontend on Vercel

1. Import the same GitHub repository into Vercel.
2. Use the repository root as the project root, `npm run build` as the build command, and `dist` as the output directory.
3. Add this environment variable before deploying:

   `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api/v1`

4. Replace the hostname with the URL shown in the Render dashboard, then deploy.

[`vercel.json`](./vercel.json) provides the SPA fallback so direct navigation and refreshes work.

Do not put database credentials or backend secrets in Vercel environment variables.
