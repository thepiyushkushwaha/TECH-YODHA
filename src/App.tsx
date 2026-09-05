import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProfileMenuDrawer } from './components/common/ProfileMenuDrawer';
import { EmergencyAlertModal } from './components/common/EmergencyAlertModal';
import { AccessibilityModal } from './components/common/AccessibilityModal';
import { FeedbackModal } from './components/common/FeedbackModal';

// Patient Flow Views
import { RoleSelectionView } from './components/patient/RoleSelectionView';
import { PatientLoginView } from './components/patient/PatientLoginView';
import { PatientProfileSetupView } from './components/patient/PatientProfileSetupView';
import { ConsentView } from './components/patient/ConsentView';
import { PatientDashboardView } from './components/patient/PatientDashboardView';
import { QRScannerModal } from './components/patient/QRScannerModal';
import { HospitalConnectedView } from './components/patient/HospitalConnectedView';
import { AIChatCaseTakingView } from './components/patient/AIChatCaseTakingView';
import { DocumentManagerView } from './components/patient/DocumentManagerView';
import { AICaseSummaryView } from './components/patient/AICaseSummaryView';
import { DepartmentRecommendationView } from './components/patient/DepartmentRecommendationView';
import { DoctorListView } from './components/patient/DoctorListView';
import { AppointmentConfirmationView } from './components/patient/AppointmentConfirmationView';
import { PatientSettingsView } from './components/patient/PatientSettingsView';
import { PatientHelpView } from './components/patient/PatientHelpView';

// Doctor & AYUSH Views
import { DoctorDashboardView } from './components/doctor/DoctorDashboardView';
import { AyushDashboardView } from './components/ayush/AyushDashboardView';

const MainAppContent: React.FC = () => {
  const { role, patientStep, accessibility, toastMessage } = useApp();

  const renderContent = () => {
    if (role === 'landing') {
      return <RoleSelectionView />;
    }

    if (role === 'doctor') {
      return <DoctorDashboardView />;
    }

    if (role === 'ayush') {
      return <AyushDashboardView />;
    }

    // Patient Role Routing
    switch (patientStep) {
      case 'role_selection':
        return <RoleSelectionView />;
      case 'login':
        return <PatientLoginView />;
      case 'profile_setup':
        return <PatientProfileSetupView />;
      case 'consent':
        return <ConsentView />;
      case 'dashboard':
        return <PatientDashboardView />;
      case 'qr_scanner':
        return <QRScannerModal />;
      case 'hospital_connected':
        return <HospitalConnectedView />;
      case 'chat_case_taking':
        return <AIChatCaseTakingView />;
      case 'documents':
        return <DocumentManagerView />;
      case 'case_summary':
        return <AICaseSummaryView />;
      case 'department_recommendation':
        return <DepartmentRecommendationView />;
      case 'doctor_list':
        return <DoctorListView />;
      case 'booking_confirmation':
        return <AppointmentConfirmationView />;
      case 'settings':
        return <PatientSettingsView />;
      case 'help':
        return <PatientHelpView />;
      default:
        return <PatientDashboardView />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${accessibility.highContrast ? 'high-contrast' : ''} ${accessibility.largeText ? 'large-text' : ''}`}>
      {/* Navbar on top (except full landing) */}
      <Navbar />

      <div className="flex-1">
        {renderContent()}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProfileMenuDrawer />
      <EmergencyAlertModal />
      <AccessibilityModal />
      <FeedbackModal />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-sm font-bold animate-bounce-subtle flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
