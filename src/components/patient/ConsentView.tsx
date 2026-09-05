import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Volume2, CheckCircle2, ArrowRight, Lock, Eye, Info, Sparkles } from 'lucide-react';

export const ConsentView: React.FC = () => {
  const { isConsentGiven, setIsConsentGiven, setPatientStep, speakText, showToast } = useApp();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleAudioExplanation = () => {
    speakText(
      "Your privacy matters. DRISHTI uses your information to understand your symptoms, prepare your medical history, and share only your selected information with your healthcare provider. You are always in control of what is shared."
    );
  };

  const handleContinue = () => {
    if (!isConsentGiven) {
      showToast('Please check the consent checkbox to continue');
      return;
    }
    showToast('Privacy & Consent accepted');
    setPatientStep('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Data Control & Trust</span>
              <h2 className="text-2xl font-black text-slate-900">Your Privacy Matters</h2>
            </div>
          </div>

          <button
            onClick={handleAudioExplanation}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" /> Listen to explanation 🔊
          </button>
        </div>

        {/* Explanation Card */}
        <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
          “DRISHTI uses your information to understand your symptoms, prepare your medical history and share your selected information with your healthcare provider.”
        </div>

        {/* Checklist Cards - Accessible Large Touch Friendly */}
        <div className="space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">What we record & structure for your doctor:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Symptom Information</h4>
                <p className="text-xs text-slate-500">Duration, severity & character</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Medical History</h4>
                <p className="text-xs text-slate-500">Prior conditions & medications</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Uploaded Documents</h4>
                <p className="text-xs text-slate-500">Prescriptions & lab test results</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Appointment Details</h4>
                <p className="text-xs text-slate-500">OPD hospital & doctor token</p>
              </div>
            </div>

          </div>
        </div>

        {/* Privacy Details Modal Expand */}
        {showDetails && (
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-xs text-slate-700 space-y-2 animate-fade-in">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-brand-600" /> Technical Data Governance
            </h5>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>All health data is encrypted end-to-end adhering to ABDM guidelines.</li>
              <li>Data is shared ONLY with doctors you explicitly choose during appointment booking.</li>
              <li>AI extracts structured clinical notes as drafts—the consulting doctor retains full diagnosis authority.</li>
            </ul>
          </div>
        )}

        {/* Consent Checkbox */}
        <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-start gap-3">
          <input
            type="checkbox"
            id="consent-checkbox"
            checked={isConsentGiven}
            onChange={(e) => setIsConsentGiven(e.target.checked)}
            className="w-6 h-6 rounded-md text-brand-600 focus:ring-brand-500 border-slate-300 mt-0.5 cursor-pointer"
          />
          <label htmlFor="consent-checkbox" className="text-sm font-bold text-brand-950 cursor-pointer leading-snug">
            I understand and consent to the collection and sharing of my health information for clinical preparation.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 text-slate-500" /> {showDetails ? 'Hide Privacy Details' : 'View Privacy Details'}
          </button>

          <button
            onClick={handleContinue}
            disabled={!isConsentGiven}
            className={`w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
              isConsentGiven
                ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/25'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Continue to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
