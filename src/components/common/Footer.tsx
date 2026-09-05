import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ShieldCheck, Heart, FileText, HelpCircle, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPatientStep, setRole, setIsFeedbackModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              DRISHTI
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Intelligent Patient Case-Taking Assistant. Built for faster, structured, and patient-friendly clinical history taking.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SIH Hackathon Prototype</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Patient Care</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setRole('patient'); setPatientStep('qr_scanner'); }} className="hover:text-white transition-colors">
                  Scan Hospital QR
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('patient'); setPatientStep('chat_case_taking'); }} className="hover:text-white transition-colors">
                  AI Case-Taking Assistant
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('patient'); setPatientStep('documents'); }} className="hover:text-white transition-colors">
                  Medical Documents & OCR
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('patient'); setPatientStep('case_summary'); }} className="hover:text-white transition-colors">
                  Clinical Draft Summary
                </button>
              </li>
            </ul>
          </div>

          {/* Doctor Portals */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Doctor Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setRole('doctor')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  Doctor OPD Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setRole('ayush')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  AYUSH Prakriti Assessment
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('patient'); setPatientStep('consent'); }} className="hover:text-white transition-colors">
                  Privacy & Data Sharing Consent
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Feedback */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Support & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setRole('patient'); setPatientStep('help'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Help & User Guide
                </button>
              </li>
              <li>
                <button onClick={() => setIsFeedbackModalOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Send Feedback
                </button>
              </li>
              <li className="pt-2 text-[11px] text-amber-400/90 leading-tight">
                ⚠️ DRISHTI is an AI history-taking assistant. It does not provide medical diagnosis or replace doctors.
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 DRISHTI Healthcare. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Tell your story. We prepare your case. Your doctor focuses on you. <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
