import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, 
  QrCode, 
  Brain, 
  Upload, 
  Calendar, 
  ShieldCheck, 
  PhoneCall, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

export const PatientHelpView: React.FC = () => {
  const { setPatientStep } = useApp();
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(0);

  const helpTopics = [
    {
      title: 'How to scan hospital QR code?',
      icon: QrCode,
      content: 'At your hospital OPD reception desk, look for the authorized DRISHTI QR code poster. Click "Scan Hospital QR" on your dashboard and point your phone camera at the code. This connects your profile directly to that hospital OPD session.'
    },
    {
      title: 'How AI case-taking works?',
      icon: Brain,
      content: 'DRISHTI asks you structured questions about your main symptoms, duration, location, and medical history in your preferred language. You can answer by voice or typing. It prepares a clinical history draft so your consulting doctor can review your case in seconds.'
    },
    {
      title: 'How to upload previous documents?',
      icon: Upload,
      content: 'Under "My Documents", click "+ Upload Document" and select your prescription, blood test, discharge summary, or imaging report. DRISHTI uses OCR vision to extract key metrics (e.g. Hemoglobin, WBC) automatically for your doctor.'
    },
    {
      title: 'How to book an appointment slot?',
      icon: Calendar,
      content: 'After reviewing your AI case summary draft, DRISHTI suggests relevant OPD departments. Select a department, browse available doctors, pick an available time slot, and grant explicit consent to share your history.'
    },
    {
      title: 'Privacy & data consent security',
      icon: ShieldCheck,
      content: 'Your medical information is encrypted and never shared without your explicit consent. You choose exactly which documents and summary sections are shared with your selected doctor.'
    },
    {
      title: 'Contact hospital OPD helpdesk',
      icon: PhoneCall,
      content: 'For immediate hospital receptionist assistance, call King George’s Medical University OPD helpline at +91 522 2257540 or visit counter #4.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">How can we help?</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Learn how DRISHTI simplifies clinical history taking, document uploads, and OPD appointment booking.
          </p>
        </div>

        {/* Accordion FAQ Cards */}
        <div className="space-y-4">
          {helpTopics.map((topic, idx) => {
            const Icon = topic.icon;
            const isOpen = openCardIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenCardIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{topic.title}</h3>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50 animate-fade-in">
                    {topic.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
