import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, ClinicalCaseSummary } from '../../types';
import { 
  ArrowLeft, 
  Stethoscope, 
  FileText, 
  CheckCircle2, 
  Edit3, 
  Save, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  Activity,
  Play,
  FileCheck
} from 'lucide-react';

interface DoctorCaseDetailViewProps {
  appointment: Appointment;
  onBack: () => void;
}

export const DoctorCaseDetailView: React.FC<DoctorCaseDetailViewProps> = ({
  appointment,
  onBack
}) => {
  const { updateAppointmentStatus, showToast } = useApp();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [caseSummary, setCaseSummary] = useState<ClinicalCaseSummary>(appointment.caseSummaryDraft);
  const [consultationStatus, setConsultationStatus] = useState<string>('Ready for Review');

  const handleSaveSummary = () => {
    setIsEditing(false);
    showToast('Doctor clinical notes & summary saved');
  };

  const handleConfirmSummary = () => {
    setCaseSummary({ ...caseSummary, verifiedByDoctor: true });
    showToast('Clinical summary verified by Dr. Ankit Sharma');
  };

  const handleStartConsultation = () => {
    setConsultationStatus('Consultation Active');
    updateAppointmentStatus(appointment.id, 'In Consultation');
    showToast(`Started active consultation for Token ${appointment.tokenNumber}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to OPD Queue
          </button>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
              {consultationStatus}
            </span>
            <button
              onClick={handleStartConsultation}
              className="py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Consultation
            </button>
          </div>
        </div>

        {/* Patient Demographics Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-lg">
              {appointment.patientName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900">{appointment.patientName}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-brand-50 text-brand-700 border border-brand-200">
                  {appointment.tokenNumber}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-1">
                {appointment.patientAge} Years • {appointment.patientGender} • Language: Hindi/English
              </p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Hospital: {appointment.hospitalName} ({appointment.doctorDepartment})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isEditing) handleSaveSummary();
                else setIsEditing(true);
              }}
              className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4 text-brand-600" /> {isEditing ? 'Save Edit' : 'Edit Summary'}
            </button>

            <button
              onClick={handleConfirmSummary}
              className={`py-3 px-5 rounded-2xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                caseSummary.verifiedByDoctor 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> {caseSummary.verifiedByDoctor ? 'Verified by Doctor ✓' : 'Confirm Summary'}
            </button>
          </div>
        </div>

        {/* Clinical Responsibility Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>“Doctor Clinical Responsibility: AI summary is editable. The consulting doctor remains responsible for final diagnosis and clinical decisions.”</span>
        </div>

        {/* Main Grid: Left Clinical History / Right Attached Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: AI Clinical Case Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-600" /> Structured AI Clinical Summary Draft
                </h3>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" /> AI Prepared
                </span>
              </div>

              {/* Chief Complaint */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-700">CHIEF COMPLAINT</h4>
                {isEditing ? (
                  <textarea
                    value={caseSummary.chiefComplaint}
                    onChange={(e) => setCaseSummary({ ...caseSummary, chiefComplaint: e.target.value })}
                    rows={2}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none"
                  />
                ) : (
                  <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-900">
                    "{caseSummary.chiefComplaint}"
                  </p>
                )}
              </div>

              {/* HPI Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-700">
                  HISTORY OF PRESENT ILLNESS (HPI)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Onset</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.onset}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Location</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.location}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Duration</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.duration}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Character</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.character}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Severity</span>
                    <span className="font-bold text-brand-700">{caseSummary.hpi.severity}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Aggravating Factors</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.aggravatingFactors}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Relieving Factors</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.relievingFactors}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-500 uppercase block text-[10px]">Associated Symptoms</span>
                    <span className="font-semibold text-slate-900">{caseSummary.hpi.associatedSymptoms}</span>
                  </div>
                </div>
              </div>

              {/* Past History & Meds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-700 uppercase block">PAST MEDICAL HISTORY</span>
                  {caseSummary.pastMedicalHistory.map((item, i) => (
                    <p key={i} className="font-medium text-slate-800">• {item}</p>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                  <span className="font-extrabold text-blue-900 uppercase block">CURRENT MEDICATIONS</span>
                  {caseSummary.currentMedications.map((item, i) => (
                    <p key={i} className="font-bold text-blue-900">💊 {item}</p>
                  ))}
                </div>
              </div>

              {/* Allergies & ROS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 space-y-1">
                  <span className="font-extrabold text-red-900 uppercase block">ALLERGIES</span>
                  {caseSummary.allergies.map((item, i) => (
                    <p key={i} className="font-bold text-red-900">⚠️ {item}</p>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-extrabold text-slate-700 uppercase block">REVIEW OF SYSTEMS</span>
                  <p className="font-medium text-slate-800">{caseSummary.reviewOfSystems}</p>
                </div>
              </div>

              {/* Investigations */}
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-1">
                <span className="font-extrabold text-teal-900 uppercase block">PREVIOUS INVESTIGATIONS & OCR METRICS</span>
                <p className="text-slate-800 font-medium">{caseSummary.previousInvestigations}</p>
              </div>

            </div>
          </div>

          {/* Right 1 Col: Shared Medical Documents */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                <FileText className="w-5 h-5 text-blue-600" /> Attached Medical Reports
              </h3>

              <div className="space-y-3">
                
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Blood_Test_March.pdf</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Lab Report</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-700 font-mono space-y-1">
                    <p className="font-bold text-brand-800">Hemoglobin: 11.2 g/dL</p>
                    <p>WBC: 8,200 /µL</p>
                    <p>Platelets: 2.4 lakh/µL</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Previous_Prescription_Jan2026.pdf</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Prescription</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">
                    Tab Antacid 20mg OD x 7 days prescribed for transient epigastric acidity.
                  </p>
                </div>

              </div>

              <div className="pt-2">
                <button
                  onClick={() => showToast('Full high-resolution PDF document viewer launched')}
                  className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
                >
                  View Full Document Attachments
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
