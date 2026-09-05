import { 
  Hospital, 
  Department, 
  Doctor, 
  MedicalDocument, 
  ClinicalCaseSummary, 
  Appointment, 
  AyushAssessment,
  PatientProfile 
} from '../types';

export const mockDefaultPatient: PatientProfile = {
  id: 'PAT-9842',
  fullName: 'Rahul Sharma',
  age: 32,
  gender: 'Male',
  preferredLanguage: 'Hindi',
  abhaId: '91-4820-1940-5829',
  mobileNumber: '+91 98765 43210',
  email: 'rahul.sharma@example.com'
};

export const mockHospital: Hospital = {
  id: 'HOSP-KGMU-01',
  name: 'King George’s Medical University',
  department: 'General Medicine OPD',
  hospitalCode: 'KGMU-OPD-001',
  sessionId: 'OPD Session #A1024',
  availableDoctorsCount: 18
};

export const mockDepartments: Department[] = [
  {
    id: 'dept-gen-med',
    name: 'General Medicine',
    description: 'Comprehensive adult health evaluations, acute symptom management, and chronic illness consultations.',
    availableDoctors: 12,
    availableSlots: 42,
    totalSlots: 100,
    isSuggested: true
  },
  {
    id: 'dept-cardio',
    name: 'Cardiology',
    description: 'Specialized evaluation for chest symptoms, vascular health, lipid profiles, and cardiovascular prevention.',
    availableDoctors: 8,
    availableSlots: 18,
    totalSlots: 100,
    isSuggested: true
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics',
    description: 'Bone, joint, muscle, and locomotor disorder consultation and history assessment.',
    availableDoctors: 6,
    availableSlots: 35,
    totalSlots: 100,
    isSuggested: false
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ankit Sharma',
    departmentId: 'dept-gen-med',
    departmentName: 'General Medicine',
    rating: 4.8,
    experienceYears: 14,
    availableSlotsCount: 42,
    totalSlotsCount: 100,
    languages: ['Hindi', 'English'],
    availableSlots: ['10:30 AM', '11:00 AM', '11:30 AM', '12:30 PM', '02:00 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Singh',
    departmentId: 'dept-gen-med',
    departmentName: 'General Medicine',
    rating: 4.7,
    experienceYears: 11,
    availableSlotsCount: 18,
    totalSlotsCount: 100,
    languages: ['Hindi', 'English', 'Bengali'],
    availableSlots: ['11:15 AM', '01:00 PM', '02:30 PM', '03:15 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78c4a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Verma',
    departmentId: 'dept-cardio',
    departmentName: 'Cardiology',
    rating: 4.9,
    experienceYears: 20,
    availableSlotsCount: 12,
    totalSlotsCount: 80,
    languages: ['Hindi', 'English'],
    availableSlots: ['11:30 AM', '12:00 PM', '04:00 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
  }
];

export const mockInitialDocuments: MedicalDocument[] = [
  {
    id: 'doc-lab-1',
    filename: 'Blood_Test_March.pdf',
    documentType: 'Lab Report',
    date: '12 Mar 2026',
    uploadStatus: 'Processed',
    fileSize: '1.4 MB',
    extractedInformation: {
      'Hemoglobin': '11.2 g/dL (Slightly low)',
      'WBC Count': '8,200 /µL (Normal)',
      'Platelets': '2.4 lakh/µL (Normal)',
      'Fasting Blood Sugar': '104 mg/dL (Borderline)',
      'Serum Creatinine': '0.9 mg/dL (Normal)'
    },
    rawSummary: 'Complete Blood Count (CBC) shows mild microcytic anemia with hemoglobin 11.2 g/dL. Renal parameters and leukocyte counts are within normal physiological range.'
  },
  {
    id: 'doc-rx-1',
    filename: 'Previous_Prescription_Jan2026.pdf',
    documentType: 'Prescription',
    date: '15 Jan 2026',
    uploadStatus: 'Processed',
    fileSize: '850 KB',
    extractedInformation: {
      'Prescribed Medications': 'Tab Antacid 20mg OD x 7 days',
      'Diagnosis Note': 'Non-specific epigastric discomfort',
      'Doctor Name': 'Dr. S. K. Gupta (Pvt Clinic)'
    },
    rawSummary: 'Proton pump inhibitor course for transient acidity relief.'
  }
];

export const mockInitialCaseSummary: ClinicalCaseSummary = {
  chiefComplaint: 'Chest discomfort and retrosternal heaviness for 2 days.',
  hpi: {
    onset: '2 days ago during evening work',
    location: 'Mid-sternal region, non-radiating',
    duration: 'Intermittent episodes lasting 15-20 minutes',
    character: 'Dull ache and pressure sensation',
    severity: '5 out of 10',
    aggravatingFactors: 'Heavy meals, fast walking, mental exertion',
    relievingFactors: 'Rest, sipping warm water',
    associatedSymptoms: 'Mild breathlessness on climbing stairs; no sweating or vomiting'
  },
  pastMedicalHistory: [
    'Mild hypertension diagnosed 1 year ago (under lifestyle management)',
    'Transient acidity episodes'
  ],
  pastSurgicalHistory: ['No prior surgical history reported'],
  currentMedications: ['Tab Pantoprazole 40mg (As needed for acidity)'],
  allergies: ['No known drug allergies (NKDA)'],
  familyHistory: 'Father had hypertension at age 55; Mother has no chronic illnesses.',
  personalHistory: 'Non-smoker, occasional tea consumer, light exercise 2 times a week.',
  reviewOfSystems: 'Cardiovascular: Dull chest pressure. Respiratory: Mild exertional dyspnea. GI: Mild reflux feeling. CNS: Normal.',
  previousInvestigations: 'Blood Test (12 Mar 2026): Hb 11.2 g/dL, WBC 8,200/µL, Platelets 2.4L. ECG 6 months ago reported normal sinus rhythm.',
  documentSummary: '2 documents analyzed (Blood_Test_March.pdf, Previous_Prescription_Jan2026.pdf). Extracted Hb 11.2 g/dL and previous PPI prescription.',
  verifiedByDoctor: false
};

export const mockInitialAppointments: Appointment[] = [
  {
    id: 'APT-1024',
    tokenNumber: '#A1024',
    patientName: 'Rahul Sharma',
    patientAge: 32,
    patientGender: 'Male',
    doctorName: 'Dr. Ankit Sharma',
    doctorDepartment: 'General Medicine OPD',
    hospitalName: 'King George’s Medical University',
    appointmentTime: '11:30 AM',
    appointmentDate: 'Today',
    sharedData: {
      caseSummary: true,
      medicalHistory: true,
      labReports: true,
      prescriptionHistory: true,
      dischargeSummary: false
    },
    status: 'Waiting',
    caseSummaryDraft: mockInitialCaseSummary
  },
  {
    id: 'APT-1025',
    tokenNumber: '#A1025',
    patientName: 'Priya Agarwal',
    patientAge: 45,
    patientGender: 'Female',
    doctorName: 'Dr. Ankit Sharma',
    doctorDepartment: 'General Medicine OPD',
    hospitalName: 'King George’s Medical University',
    appointmentTime: '11:45 AM',
    appointmentDate: 'Today',
    sharedData: {
      caseSummary: true,
      medicalHistory: true,
      labReports: true,
      prescriptionHistory: true,
      dischargeSummary: true
    },
    status: 'Waiting',
    caseSummaryDraft: {
      chiefComplaint: 'Persistent dry cough and low-grade fever for 5 days.',
      hpi: {
        onset: '5 days ago',
        location: 'Throat and chest',
        duration: 'Continuous dry cough worsening at night',
        character: 'Dry irritation',
        severity: '4 out of 10',
        aggravatingFactors: 'Cold air, dust',
        relievingFactors: 'Hot tea, throat lozenges',
        associatedSymptoms: 'Mild fatigue, body pain'
      },
      pastMedicalHistory: ['Seasonal allergies'],
      pastSurgicalHistory: ['None'],
      currentMedications: ['Cetirizine 10mg OD'],
      allergies: ['Dust mites'],
      familyHistory: 'No asthma history',
      personalHistory: 'Teetotaler',
      reviewOfSystems: 'Respiratory dry cough',
      previousInvestigations: 'Chest X-Ray Clear (Jan 2026)',
      documentSummary: '1 report attached',
      verifiedByDoctor: false
    }
  },
  {
    id: 'APT-1026',
    tokenNumber: '#A1026',
    patientName: 'Amit Kumar',
    patientAge: 58,
    patientGender: 'Male',
    doctorName: 'Dr. Ankit Sharma',
    doctorDepartment: 'General Medicine OPD',
    hospitalName: 'King George’s Medical University',
    appointmentTime: '12:00 PM',
    appointmentDate: 'Today',
    sharedData: {
      caseSummary: true,
      medicalHistory: true,
      labReports: true,
      prescriptionHistory: false,
      dischargeSummary: true
    },
    status: 'Emergency Priority',
    caseSummaryDraft: {
      chiefComplaint: 'Sudden severe crushing chest pain radiating to left arm with profuse diaphoresis.',
      hpi: {
        onset: '30 minutes ago while sitting',
        location: 'Substernal radiating to left shoulder and arm',
        duration: 'Continuous 30+ minutes',
        character: 'Heavy crushing pressure',
        severity: '9 out of 10',
        aggravatingFactors: 'None',
        relievingFactors: 'None',
        associatedSymptoms: 'Profuse sweating, severe nausea, acute dyspnea'
      },
      pastMedicalHistory: ['Hypertension x 8 years', 'Type 2 Diabetes x 5 years'],
      pastSurgicalHistory: ['None'],
      currentMedications: ['Amlodipine 5mg', 'Metformin 500mg'],
      allergies: ['NKDA'],
      familyHistory: 'Brother had MI at 50',
      personalHistory: 'Ex-smoker',
      reviewOfSystems: 'Acute CV distress',
      previousInvestigations: 'Lipid profile elevated 2 months ago',
      documentSummary: 'Discharge Summary attached',
      verifiedByDoctor: false
    }
  }
];

export const mockAyushAssessment: AyushAssessment = {
  prakriti: {
    vata: 45,
    pitta: 35,
    kapha: 20,
    dominant: 'Vata-Pitta Prakriti'
  },
  vikriti: 'Vata-Kapha Kopa (Aggravation due to seasonal cold & irregular ahara)',
  sara: 'Rakta & Mamsa Sara (Medium strength structural tissue essence)',
  samhanana: 'Madhyama (Compact and balanced physical structure)',
  pramana: 'Madhyama Body Proportions (Balanced skeletal frame)',
  satmya: 'Sarmarasa Satmya (Habituated to balanced North Indian diet)',
  sattva: 'Pravara (Strong mental resilience and emotional stability)',
  aharaShakti: 'Abhyavaharana & Jarana Shakti - Madhyama (Moderate digestive fire / Agni)',
  vyayamaShakti: 'Madhyama (Can comfortably perform 30 min daily activity)',
  vaya: 'Yuva Vaya (32 Years - Youthful stage of life)',
  ahara: 'Excessive consumption of dry/spicy food, late night dinners, tea twice daily',
  vihara: 'Irregular sleeping hours, prolonged computer screen work',
  nidana: 'Sheeta Vata Exposure (Cold breeze exposure during late evening commute)',
  samprapti: 'Vata dosha aggravated in Hridaya sthana $\\rightarrow$ causing Stambha (stiffness) and Shoola (dull discomfort) aggravated by Agnimandya.'
};
