import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalCaseSummary } from '../../types';
import { 
  FileText, 
  CheckCircle2, 
  Edit3, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  Activity,
  ShieldCheck,
  Building2,
  Brain
} from 'lucide-react';

export const AICaseSummaryView: React.FC = () => {
  const { caseSummary, updateCaseSummary, setPatientStep, connectedHospital, showToast } = useApp();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedSummary, setEditedSummary] = useState<ClinicalCaseSummary>(caseSummary);

  const handleSaveEdit = () => {
    updateCaseSummary(editedSummary);
    setIsEditing(false);
    showToast('Case summary updated');
  };

  const handleConfirm = () => {
    setPatientStep('department_recommendation');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-inner">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Clinical History Draft</span>
                <h2 className="text-2xl font-black text-slate-900">Your Case Summary is Ready</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                AI-generated draft
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Hospital: {connectedHospital?.name || 'KGMU OPD'}
              </span>
            </div>
          </div>

          <p className="text-slate-600 text-sm font-medium">
            Review your structured clinical information before sharing it with your consulting physician.
          </p>

          {/* Warning Disclaimer Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>“AI-generated draft – Please verify the information before sharing with your doctor.”</span>
          </div>
        </div>

        {/* Clinical Summary Document Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-600" /> Clinical History Report (Draft)
            </h3>
            
            <button
              onClick={() => {
                if (isEditing) handleSaveEdit();
                else setIsEditing(true);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4 text-brand-600" /> {isEditing ? 'Save Changes' : 'Edit Summary'}
            </button>
          </div>

          {/* Section 1: Chief Complaint */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-700">CHIEF COMPLAINT</h4>
            {isEditing ? (
              <textarea
                value={editedSummary.chiefComplaint}
                onChange={(e) => setEditedSummary({ ...editedSummary, chiefComplaint: e.target.value })}
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none"
              />
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900">
                "{caseSummary.chiefComplaint}"
              </div>
            )}
          </div>

          {/* Section 2: HPI (History of Present Illness) */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-700">
              HISTORY OF PRESENT ILLNESS (HPI)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Onset</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.onset}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Location</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.location}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Duration</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.duration}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Character</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.character}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Severity</span>
                <span className="font-semibold text-brand-700 text-sm">{caseSummary.hpi.severity}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Aggravating Factors</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.aggravatingFactors}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Relieving Factors</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.relievingFactors}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Associated Symptoms</span>
                <span className="font-semibold text-slate-900 text-sm">{caseSummary.hpi.associatedSymptoms}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Past Medical & Surgical History */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">PAST MEDICAL HISTORY</h4>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 space-y-1">
                {caseSummary.pastMedicalHistory.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">PAST SURGICAL HISTORY</h4>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 space-y-1">
                {caseSummary.pastSurgicalHistory.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Current Medications & Allergies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700">CURRENT MEDICATIONS</h4>
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs font-bold text-blue-900 space-y-1">
                {caseSummary.currentMedications.map((item, i) => (
                  <p key={i}>💊 {item}</p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-700">DRUG / FOOD ALLERGIES</h4>
              <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 text-xs font-bold text-red-900 space-y-1">
                {caseSummary.allergies.map((item, i) => (
                  <p key={i}>⚠️ {item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Family & Personal History */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-600 uppercase block mb-1">FAMILY HISTORY</span>
              <p className="font-medium text-slate-800">{caseSummary.familyHistory}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-extrabold text-slate-600 uppercase block mb-1">PERSONAL HISTORY</span>
              <p className="font-medium text-slate-800">{caseSummary.personalHistory}</p>
            </div>
          </div>

          {/* Section 6: Previous Investigations & Document Summary */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-2">
            <span className="font-extrabold text-teal-900 uppercase tracking-wider block">PREVIOUS INVESTIGATIONS & OCR SUMMARY</span>
            <p className="text-slate-800 font-medium">{caseSummary.previousInvestigations}</p>
            <p className="text-teal-800 font-semibold italic">{caseSummary.documentSummary}</p>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              onClick={() => setPatientStep('chat_case_taking')}
              className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Back to AI Chat
            </button>

            <button
              onClick={handleConfirm}
              className="py-4 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
            >
              Confirm & Continue to Departments <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
