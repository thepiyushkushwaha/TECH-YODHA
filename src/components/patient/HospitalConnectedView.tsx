import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { 
  CheckCircle2, 
  Building2, 
  Users, 
  Mic, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HospitalConnectedView: React.FC = () => {
  const { connectedHospital, patient, updatePatientProfile, setPatientStep } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(patient.preferredLanguage || 'Hindi');

  const languages: Language[] = ['Hindi', 'English', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Other'];

  const handleStartChat = () => {
    updatePatientProfile({ preferredLanguage: selectedLanguage });
    setPatientStep('chat_case_taking');
  };

  const handleStartVoice = () => {
    updatePatientProfile({ preferredLanguage: selectedLanguage });
    setPatientStep('chat_case_taking');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Connected Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-left">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-inner">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Scan Verified</span>
                <h2 className="text-2xl font-black text-slate-900">Hospital Connected ✓</h2>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Active OPD Session
            </span>
          </div>

          {/* Hospital Details Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-900 to-brand-800 text-white space-y-4 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-brand-300 uppercase tracking-wider">Hospital Name</p>
                <h3 className="text-xl font-black">{connectedHospital?.name || 'King George’s Medical University'}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Building2 className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-brand-700 text-xs">
              <div>
                <p className="text-brand-300 font-medium">Department</p>
                <p className="font-bold text-white mt-0.5">{connectedHospital?.department || 'General Medicine OPD'}</p>
              </div>
              <div>
                <p className="text-brand-300 font-medium">Hospital ID</p>
                <p className="font-bold text-white mt-0.5 font-mono">{connectedHospital?.hospitalCode || 'KGMU-OPD-001'}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-brand-300 font-medium">Session ID</p>
                <p className="font-bold text-teal-300 mt-0.5 font-mono">{connectedHospital?.sessionId || 'OPD Session #A1024'}</p>
              </div>
            </div>
          </div>

          {/* Available Doctors Badge */}
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between text-brand-900">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-bold">18 Doctors Available in General Medicine OPD</span>
            </div>
            <span className="text-xs font-extrabold text-brand-700 bg-white px-3 py-1 rounded-full border border-brand-200">
              Live Queue
            </span>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-brand-600" /> Select Case-Taking Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-bold text-slate-800 bg-white outline-none cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* START YOUR AI CASE MODE CARDS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-extrabold text-slate-900">Start Your AI Case</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: VOICE */}
              <div 
                onClick={handleStartVoice}
                className="p-6 rounded-3xl bg-gradient-to-tr from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                    <Mic className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
                    Hands Free
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold">🎙 VOICE MODE</h4>
                  <p className="text-xs text-brand-100 mt-1">Talk naturally with DRISHTI in {selectedLanguage}</p>
                </div>

                <div className="flex items-center text-xs font-bold text-white group-hover:gap-1.5 transition-all pt-2">
                  Start Voice Case <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Option 2: CHAT */}
              <div 
                onClick={handleStartChat}
                className="p-6 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-teal-400 text-slate-900 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full uppercase border border-teal-200">
                    Text Input
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">💬 CHAT MODE</h4>
                  <p className="text-xs text-slate-500 mt-1">Answer questions by typing at your own pace</p>
                </div>

                <div className="flex items-center text-xs font-bold text-teal-700 group-hover:gap-1.5 transition-all pt-2">
                  Start Chat Case <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Your information will be used to prepare your clinical history for the doctor.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
