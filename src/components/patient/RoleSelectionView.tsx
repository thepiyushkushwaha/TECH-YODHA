import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Stethoscope, 
  Leaf, 
  ArrowRight, 
  Activity, 
  Shield, 
  HelpCircle, 
  Info, 
  CheckCircle2,
  Sparkles,
  Clock,
  FileCheck
} from 'lucide-react';

export const RoleSelectionView: React.FC = () => {
  const { setRole, setPatientStep } = useApp();

  const handlePatientSelect = () => {
    setRole('patient');
    setPatientStep('login');
  };

  const handleDoctorSelect = () => {
    setRole('doctor');
  };

  const handleAyushSelect = () => {
    setRole('ayush');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 bg-clip-text text-transparent">
                DRISHTI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <button 
              onClick={() => { setRole('patient'); setPatientStep('help'); }}
              className="hover:text-brand-600 flex items-center gap-1.5 transition-colors"
            >
              <Info className="w-4 h-4 text-slate-400" /> About
            </button>
            <button 
              onClick={() => { setRole('patient'); setPatientStep('help'); }}
              className="hover:text-brand-600 flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" /> Help
            </button>
            <button 
              onClick={() => { setRole('patient'); setPatientStep('consent'); }}
              className="hover:text-brand-600 flex items-center gap-1.5 transition-colors"
            >
              <Shield className="w-4 h-4 text-slate-400" /> Privacy
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1 flex flex-col justify-center">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-500" /> SIH Problem Statement: Patient Case-Taking Software
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            DRISHTI
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 bg-clip-text text-transparent">
            Your Intelligent Patient Case-Taking Assistant
          </h2>

          <p className="text-base sm:text-lg font-medium text-slate-700 italic">
            “Tell your story. We prepare your case. Your doctor focuses on you.”
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-1">
            Record your symptoms, medical history and previous documents before your consultation so your doctor can focus more on your care.
          </p>
        </div>

        {/* 3 Large Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto w-full">
          
          {/* Card 1: Patient */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-brand-300 shadow-xl hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
                <User className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Role 01</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">Patient Portal</h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Record symptoms, upload medical documents and book your consultation with intelligent AI case assistance.
              </p>

              <div className="space-y-2 pt-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Interactive Voice & Chat History
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Scan Hospital OPD QR Codes
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Complete Privacy Control
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <button
                onClick={handlePatientSelect}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/25 transition-all group-hover:gap-3"
              >
                Continue as Patient <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card 2: Doctor */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Role 02</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">Doctor Portal</h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Review structured patient clinical history cases, attached lab reports, and prepare for OPD consultations in seconds.
              </p>

              <div className="space-y-2 pt-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Structured HPI & System Review
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Live OPD Patient Queue & Tokens
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> Red-Flag Emergency Alerts
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <button
                onClick={handleDoctorSelect}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all group-hover:gap-3"
              >
                Continue as Doctor <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card 3: AYUSH Doctor */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-emerald-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-ayush-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <Leaf className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Role 03</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">AYUSH Doctor</h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Review detailed Ayurvedic patient assessments, Prakriti/Vikriti analysis, and holistic clinical history.
              </p>

              <div className="space-y-2 pt-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Prakriti Dosha Wheel (Vata/Pitta/Kapha)
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dasha Vidha Pareeksha Assessment
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Ahara, Vihara & Samprapti Tracking
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <button
                onClick={handleAyushSelect}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-lg shadow-emerald-700/25 transition-all group-hover:gap-3"
              >
                Continue as AYUSH Doctor <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Bottom Footer Banner */}
      <div className="bg-white border-t border-slate-200 py-6 text-center text-slate-600 text-sm font-semibold shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <FileCheck className="w-5 h-5 text-brand-600" />
          <span>Built for faster, structured and patient-friendly clinical history taking.</span>
        </div>
      </div>

    </div>
  );
};
