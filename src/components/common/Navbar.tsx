import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Stethoscope, 
  Leaf, 
  User, 
  Bell, 
  Volume2, 
  VolumeX, 
  Eye, 
  Settings, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    patientStep, 
    setPatientStep, 
    patient, 
    setIsProfileDrawerOpen, 
    setIsAccessibilityModalOpen,
    accessibility,
    updateAccessibility,
    isAudioPlaying,
    stopAudio,
    speakText
  } = useApp();

  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      stopAudio();
    } else {
      speakText("Welcome to DRISHTI. Your intelligent patient case-taking assistant.");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div 
          onClick={() => {
            if (role === 'patient') setPatientStep('dashboard');
            else setRole('landing');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 bg-clip-text text-transparent">
                DRISHTI
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                <Sparkles className="w-3 h-3 mr-1 text-brand-500" /> AI Assistant
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 hidden sm:block">
              Case-Taking & Clinical History
            </p>
          </div>
        </div>

        {/* Center Role Navigation Pill for Demo presentation */}
        <div className="hidden md:flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 text-sm font-medium">
          <button
            onClick={() => { setRole('patient'); setPatientStep('dashboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              role === 'patient' 
                ? 'bg-white text-brand-700 font-semibold shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-brand-600" /> Patient
          </button>

          <button
            onClick={() => setRole('doctor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              role === 'doctor' 
                ? 'bg-white text-brand-700 font-semibold shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-blue-600" /> Doctor
          </button>

          <button
            onClick={() => setRole('ayush')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              role === 'ayush' 
                ? 'bg-white text-ayush-700 font-semibold shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Leaf className="w-4 h-4 text-ayush-600" /> AYUSH Doctor
          </button>
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio Guidance button */}
          <button
            onClick={handleAudioToggle}
            title="Audio Guidance / Explanation"
            className={`p-2 rounded-xl border transition-all ${
              isAudioPlaying 
                ? 'bg-amber-50 text-amber-600 border-amber-300 animate-pulse' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Accessibility Modal Toggle */}
          <button
            onClick={() => setIsAccessibilityModalOpen(true)}
            title="Accessibility Options"
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Patient Profile Avatar (Only when in Patient Role) */}
          {role === 'patient' && (
            <>
              <button 
                onClick={() => setPatientStep('dashboard')}
                className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors hidden sm:block"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full"></span>
              </button>

              <button
                onClick={() => setIsProfileDrawerOpen(true)}
                className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-brand-300 bg-white hover:bg-brand-50/50 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm">
                  {patient.fullName ? patient.fullName.charAt(0) : 'R'}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">
                    {patient.fullName || 'Rahul Sharma'}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">
                    ABHA: {patient.abhaId ? patient.abhaId.substring(0, 10) + '...' : 'Verified'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </>
          )}

          {/* Quick Doctor Role Label */}
          {role === 'doctor' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Stethoscope className="w-4 h-4 text-blue-600" /> Dr. Ankit Sharma (General Medicine)
            </div>
          )}

          {role === 'ayush' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Leaf className="w-4 h-4 text-emerald-600" /> Dr. V. K. Vaidya (AYUSH OPD)
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
