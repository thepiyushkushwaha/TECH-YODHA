import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Eye, Volume2, Type, Globe, Bell, Shield, Lock, User, Check } from 'lucide-react';

export const PatientSettingsView: React.FC = () => {
  const { 
    patient, 
    updatePatientProfile, 
    accessibility, 
    updateAccessibility, 
    showToast 
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shadow-inner">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Preferences</span>
            <h2 className="text-2xl font-black text-slate-900">Patient Settings & Controls</h2>
          </div>
        </div>

        {/* Accessibility Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-600" /> Visual & Audio Accessibility Options
          </h3>

          <div className="space-y-4">
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-sm font-bold text-slate-900">High Contrast UI</h4>
                <p className="text-xs text-slate-500">Enhance readability for low vision</p>
              </div>
              <button
                onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  accessibility.highContrast ? 'bg-brand-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  accessibility.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Large Touch Text</h4>
                <p className="text-xs text-slate-500">Increases font size for elderly patients</p>
              </div>
              <button
                onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  accessibility.largeText ? 'bg-brand-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  accessibility.largeText ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Audio Narrator Assistance</h4>
                <p className="text-xs text-slate-500">Automatically reads questions aloud</p>
              </div>
              <button
                onClick={() => updateAccessibility({ audioGuidance: !accessibility.audioGuidance })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  accessibility.audioGuidance ? 'bg-brand-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  accessibility.audioGuidance ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600" /> Account & Profile Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-slate-800">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Full Name</span>
              <span>{patient.fullName}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">ABHA ID</span>
              <span>{patient.abhaId || 'Verified'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Mobile Number</span>
              <span>{patient.mobileNumber || '+91 98765 43210'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Preferred Language</span>
              <span>{patient.preferredLanguage}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
