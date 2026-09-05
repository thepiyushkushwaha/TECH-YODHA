import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, PhoneCall, ShieldAlert, X, Activity } from 'lucide-react';

export const EmergencyAlertModal: React.FC = () => {
  const { isEmergencyAlertOpen, setIsEmergencyAlertOpen, emergencyAlertReason, showToast } = useApp();

  if (!isEmergencyAlertOpen) return null;

  const handleCallEmergency = () => {
    showToast('Simulating call to 108 Emergency Response Service & Hospital Triage');
    setIsEmergencyAlertOpen(false);
  };

  const handleNotifyHospital = () => {
    showToast('Hospital OPD Emergency Desk alerted for Patient Rahul Sharma');
    setIsEmergencyAlertOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Red Backdrop */}
      <div 
        onClick={() => setIsEmergencyAlertOpen(false)}
        className="fixed inset-0 bg-red-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl border-2 border-red-500 overflow-hidden transform transition-all animate-bounce-subtle">
          
          {/* Top Red Caution Stripe */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>

          <button
            onClick={() => setIsEmergencyAlertOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Emergency Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shrink-0 shadow-inner">
              <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-100 text-red-800 tracking-wide uppercase">
                Triage Safety Alert
              </span>
              <h3 className="text-xl font-extrabold text-red-700 mt-0.5">
                ⚠️ POSSIBLE MEDICAL EMERGENCY
              </h3>
            </div>
          </div>

          {/* Alert Body */}
          <div className="space-y-3 bg-red-50/70 p-4 rounded-2xl border border-red-200 mb-6 text-sm text-slate-800">
            <p className="font-semibold text-red-900 leading-snug">
              Some symptoms you reported may require immediate medical attention:
            </p>
            {emergencyAlertReason && (
              <div className="p-3 bg-white rounded-xl border border-red-200 text-red-800 font-mono text-xs font-semibold">
                "{emergencyAlertReason}"
              </div>
            )}
            <p className="text-xs text-slate-600 leading-relaxed">
              If you are experiencing severe chest pain, shortness of breath, sudden numbness, or loss of consciousness, please do not wait for an OPD routine appointment.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 mb-6 text-[11px] text-slate-500 font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Disclaimer: DRISHTI does not provide medical diagnoses. This triage alert is for patient safety.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleCallEmergency}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-600/30 transition-all"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" /> Contact Emergency Staff (108)
            </button>

            <button
              onClick={handleNotifyHospital}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-300 text-sm transition-all"
            >
              <Activity className="w-4 h-4 text-amber-600" /> Fast-Track OPD Emergency Desk
            </button>

            <button
              onClick={() => setIsEmergencyAlertOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Return to Case-Taking Conversation
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
