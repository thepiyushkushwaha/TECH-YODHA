import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  PatientStep, 
  PatientProfile, 
  Hospital, 
  MedicalDocument, 
  ClinicalCaseSummary, 
  Appointment, 
  Doctor, 
  Department,
  AccessibilitySettings,
  AyushAssessment
} from '../types';
import { 
  mockDefaultPatient, 
  mockHospital, 
  mockInitialDocuments, 
  mockInitialCaseSummary, 
  mockInitialAppointments, 
  mockDoctors, 
  mockDepartments,
  mockAyushAssessment
} from '../data/mockData';

interface AppContextType {
  // Navigation & Role State
  role: UserRole;
  setRole: (role: UserRole) => void;
  patientStep: PatientStep;
  setPatientStep: (step: PatientStep) => void;

  // User Profile
  patient: PatientProfile;
  updatePatientProfile: (updates: Partial<PatientProfile>) => void;

  // Consent & Auth State
  isConsentGiven: boolean;
  setIsConsentGiven: (val: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;

  // Hospital Connection
  isHospitalConnected: boolean;
  connectedHospital: Hospital | null;
  connectHospital: () => void;
  disconnectHospital: () => void;

  // Case Taking & Clinical Summary
  caseSummary: ClinicalCaseSummary;
  updateCaseSummary: (summary: ClinicalCaseSummary) => void;

  // Documents
  documents: MedicalDocument[];
  addDocument: (doc: MedicalDocument) => void;

  // Booking Flow State
  selectedDepartment: Department | null;
  setSelectedDepartment: (dept: Department | null) => void;
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doc: Doctor | null) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
  confirmedAppointment: Appointment | null;
  setConfirmedAppointment: (apt: Appointment | null) => void;

  // Appointments List
  appointments: Appointment[];
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;

  // Modals & Safety Alerts
  isEmergencyAlertOpen: boolean;
  setIsEmergencyAlertOpen: (val: boolean) => void;
  emergencyAlertReason: string;
  triggerEmergencyAlert: (reason: string) => void;
  isProfileDrawerOpen: boolean;
  setIsProfileDrawerOpen: (val: boolean) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (val: boolean) => void;
  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (val: boolean) => void;

  // Accessibility & Audio
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  isAudioPlaying: boolean;
  audioText: string;
  speakText: (text: string) => void;
  stopAudio: () => void;

  // AYUSH Assessment
  ayushData: AyushAssessment;

  // Global Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('landing');
  const [patientStep, setPatientStepState] = useState<PatientStep>('role_selection');

  const [patient, setPatient] = useState<PatientProfile>(mockDefaultPatient);
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [isHospitalConnected, setIsHospitalConnected] = useState<boolean>(false);
  const [connectedHospital, setConnectedHospital] = useState<Hospital | null>(null);

  const [caseSummary, setCaseSummary] = useState<ClinicalCaseSummary>(mockInitialCaseSummary);
  const [documents, setDocuments] = useState<MedicalDocument[]>(mockInitialDocuments);

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(mockDepartments[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(mockDoctors[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:30 AM');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(mockInitialAppointments[0]);

  const [appointments, setAppointments] = useState<Appointment[]>(mockInitialAppointments);

  const [isEmergencyAlertOpen, setIsEmergencyAlertOpen] = useState<boolean>(false);
  const [emergencyAlertReason, setEmergencyAlertReason] = useState<string>('');

  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState<boolean>(false);

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    audioGuidance: true
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioText, setAudioText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [ayushData] = useState<AyushAssessment>(mockAyushAssessment);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'landing') setPatientStepState('role_selection');
    else if (newRole === 'patient') setPatientStepState('login');
  };

  const setPatientStep = (step: PatientStep) => {
    setPatientStepState(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updatePatientProfile = (updates: Partial<PatientProfile>) => {
    setPatient(prev => ({ ...prev, ...updates }));
  };

  const connectHospital = () => {
    setIsHospitalConnected(true);
    setConnectedHospital(mockHospital);
    showToast('Connected to King George’s Medical University OPD');
  };

  const disconnectHospital = () => {
    setIsHospitalConnected(false);
    setConnectedHospital(null);
  };

  const updateCaseSummary = (updated: ClinicalCaseSummary) => {
    setCaseSummary(updated);
  };

  const addDocument = (doc: MedicalDocument) => {
    setDocuments(prev => [doc, ...prev]);
    showToast(`Document "${doc.filename}" uploaded and processed`);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
  };

  const triggerEmergencyAlert = (reason: string) => {
    setEmergencyAlertReason(reason);
    setIsEmergencyAlertOpen(true);
  };

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...settings }));
  };

  const speakText = (text: string) => {
    setAudioText(text);
    setIsAudioPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onerror = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsAudioPlaying(false), 3000);
    }
  };

  const stopAudio = () => {
    setIsAudioPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      patientStep,
      setPatientStep,
      patient,
      updatePatientProfile,
      isConsentGiven,
      setIsConsentGiven,
      isLoggedIn,
      setIsLoggedIn,
      isHospitalConnected,
      connectedHospital,
      connectHospital,
      disconnectHospital,
      caseSummary,
      updateCaseSummary,
      documents,
      addDocument,
      selectedDepartment,
      setSelectedDepartment,
      selectedDoctor,
      setSelectedDoctor,
      selectedTimeSlot,
      setSelectedTimeSlot,
      confirmedAppointment,
      setConfirmedAppointment,
      appointments,
      updateAppointmentStatus,
      isEmergencyAlertOpen,
      setIsEmergencyAlertOpen,
      emergencyAlertReason,
      triggerEmergencyAlert,
      isProfileDrawerOpen,
      setIsProfileDrawerOpen,
      isFeedbackModalOpen,
      setIsFeedbackModalOpen,
      isAccessibilityModalOpen,
      setIsAccessibilityModalOpen,
      accessibility,
      updateAccessibility,
      isAudioPlaying,
      audioText,
      speakText,
      stopAudio,
      ayushData,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
