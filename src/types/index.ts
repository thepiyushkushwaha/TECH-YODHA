export type UserRole = 'landing' | 'patient' | 'doctor' | 'ayush';

export type PatientStep = 
  | 'role_selection'
  | 'login'
  | 'profile_setup'
  | 'consent'
  | 'dashboard'
  | 'qr_scanner'
  | 'hospital_connected'
  | 'chat_case_taking'
  | 'documents'
  | 'case_summary'
  | 'department_recommendation'
  | 'doctor_list'
  | 'booking_confirmation'
  | 'settings'
  | 'help';

export type Language = 'Hindi' | 'English' | 'Bengali' | 'Marathi' | 'Tamil' | 'Telugu' | 'Kannada' | 'Other';

export interface PatientProfile {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  preferredLanguage: Language;
  abhaId?: string;
  mobileNumber?: string;
  email?: string;
}

export interface MedicalDocument {
  id: string;
  filename: string;
  documentType: 'Prescription' | 'Lab Report' | 'Discharge Summary' | 'Imaging Report' | 'Other';
  date: string;
  uploadStatus: 'Processed' | 'Uploading' | 'Failed';
  fileSize?: string;
  extractedInformation?: Record<string, string>;
  rawSummary?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'patient' | 'system';
  text: string;
  timestamp: string;
  options?: string[];
  isRedFlag?: boolean;
}

export interface HPI {
  onset: string;
  location: string;
  duration: string;
  character: string;
  severity: string; // 0-10
  aggravatingFactors: string;
  relievingFactors: string;
  associatedSymptoms: string;
}

export interface ClinicalCaseSummary {
  chiefComplaint: string;
  hpi: HPI;
  pastMedicalHistory: string[];
  pastSurgicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  familyHistory: string;
  personalHistory: string;
  reviewOfSystems: string;
  previousInvestigations: string;
  documentSummary: string;
  verifiedByDoctor?: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  department: string;
  hospitalCode: string;
  sessionId: string;
  availableDoctorsCount: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  availableDoctors: number;
  availableSlots: number;
  totalSlots: number;
  isSuggested?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  rating: number;
  experienceYears: number;
  availableSlotsCount: number;
  totalSlotsCount: number;
  languages: string[];
  availableSlots: string[];
  avatarUrl?: string;
}

export interface Appointment {
  id: string;
  tokenNumber: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  doctorDepartment: string;
  hospitalName: string;
  appointmentTime: string;
  appointmentDate: string;
  sharedData: {
    caseSummary: boolean;
    medicalHistory: boolean;
    labReports: boolean;
    prescriptionHistory: boolean;
    dischargeSummary: boolean;
  };
  status: 'Waiting' | 'Ready' | 'In Consultation' | 'Completed' | 'Emergency Priority';
  caseSummaryDraft: ClinicalCaseSummary;
}

export interface AyushAssessment {
  prakriti: {
    vata: number; // %
    pitta: number;
    kapha: number;
    dominant: string;
  };
  vikriti: string;
  sara: string;
  samhanana: string;
  pramana: string;
  satmya: string;
  sattva: string;
  aharaShakti: string;
  vyayamaShakti: string;
  vaya: string;
  ahara: string;
  vihara: string;
  nidana: string;
  samprapti: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  audioGuidance: boolean;
}
