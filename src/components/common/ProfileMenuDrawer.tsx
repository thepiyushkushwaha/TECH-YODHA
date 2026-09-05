import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Stethoscope, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  LogOut, 
  X,
  ChevronRight,
  Sparkles,
  QrCode
} from 'lucide-react';

export const ProfileMenuDrawer: React.FC = () => {
  const { 
    isProfileDrawerOpen, 
    setIsProfileDrawerOpen, 
    patient, 
    setPatientStep, 
    setRole, 
    setIsLoggedIn,
    setIsFeedbackModalOpen,
    showToast
  } = useApp();

  if (!isProfileDrawerOpen) return null;

  const navigateTo = (step: any) => {
    setIsProfileDrawerOpen(false);
    setPatientStep(step);
  };

  const handleLogout = () => {
    setIsProfileDrawerOpen(false);
    setIsLoggedIn(false);
    setRole('landing');
    showToast('Logged out successfully');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsProfileDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-brand-700 to-brand-600 text-white relative">
            <button
              onClick={() => setIsProfileDrawerOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl font-bold flex items-center justify-center shadow-inner">
                {patient.fullName ? patient.fullName.charAt(0) : 'R'}
              </div>
              <div>
                <h3 className="text-xl font-bold">{patient.fullName || 'Rahul Sharma'}</h3>
                <p className="text-xs text-brand-100 font-medium">
                  {patient.age} yrs • {patient.gender} • {patient.preferredLanguage}
                </p>
                <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/15 text-white border border-white/20">
                  ABHA: {patient.abhaId || '91-4820-1940-5829'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Patient Portal
            </div>

            <button
              onClick={() => navigateTo('profile_setup')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <User className="w-5 h-5 text-brand-600" /> My Profile
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('case_summary')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-emerald-600" /> Medical Case History
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('documents')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" /> My Documents & Reports
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('doctor_list')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-600" /> Appointments & OPD Slots
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('qr_scanner')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-brand-50 hover:bg-brand-100/70 border border-brand-200 text-brand-800 text-sm font-semibold transition-colors"
            >
              <span className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-brand-600" /> Connect Hospital QR
              </span>
              <ChevronRight className="w-4 h-4 text-brand-600" />
            </button>

            <div className="pt-3 px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Preferences & Support
            </div>

            <button
              onClick={() => navigateTo('consent')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-600" /> Privacy & Consent
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('settings')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-slate-600" /> Accessibility & Settings
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('help')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600" /> Help & Support
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setIsProfileDrawerOpen(false);
                setIsFeedbackModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600" /> Give Feedback
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Footer Logout */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold border border-red-200 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
