import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Doctor, Appointment } from '../../types';
import { ShieldCheck, CheckSquare, Square, X, ArrowRight, UserCheck } from 'lucide-react';

interface ShareMedicalHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  timeSlot: string;
}

export const ShareMedicalHistoryModal: React.FC<ShareMedicalHistoryModalProps> = ({
  isOpen,
  onClose,
  doctor,
  timeSlot
}) => {
  const { 
    patient, 
    connectedHospital, 
    caseSummary, 
    setConfirmedAppointment, 
    setPatientStep, 
    showToast 
  } = useApp();

  const [sharedState, setSharedState] = useState({
    caseSummary: true,
    medicalHistory: true,
    labReports: true,
    prescriptionHistory: true,
    dischargeSummary: false
  });

  if (!isOpen) return null;

  const toggleShare = (key: keyof typeof sharedState) => {
    setSharedState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShareAndBook = () => {
    const newAppointment: Appointment = {
      id: `APT-${Date.now()}`,
      tokenNumber: '#A1024',
      patientName: patient.fullName || 'Rahul Sharma',
      patientAge: patient.age || 32,
      patientGender: patient.gender || 'Male',
      doctorName: doctor.name,
      doctorDepartment: doctor.departmentName,
      hospitalName: connectedHospital?.name || 'King George’s Medical University',
      appointmentTime: timeSlot,
      appointmentDate: 'Today',
      sharedData: sharedState,
      status: 'Waiting',
      caseSummaryDraft: caseSummary
    };

    setConfirmedAppointment(newAppointment);
    showToast(`Appointment booked with ${doctor.name} at ${timeSlot}`);
    onClose();
    setPatientStep('booking_confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl border border-slate-200 space-y-6">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Explicit Patient Consent</span>
              <h3 className="text-xl font-black text-slate-900">Share your medical information?</h3>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            We found medical information from your previous sessions and uploaded documents. Select what you wish to share with your doctor:
          </p>

          {/* Selectable Items */}
          <div className="space-y-2.5">
            
            <div 
              onClick={() => toggleShare('caseSummary')}
              className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-sm font-bold text-slate-800">AI Case Summary Draft</span>
              {sharedState.caseSummary ? <CheckSquare className="w-5 h-5 text-brand-600" /> : <Square className="w-5 h-5 text-slate-300" />}
            </div>

            <div 
              onClick={() => toggleShare('medicalHistory')}
              className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-sm font-bold text-slate-800">Medical History & Conditions</span>
              {sharedState.medicalHistory ? <CheckSquare className="w-5 h-5 text-brand-600" /> : <Square className="w-5 h-5 text-slate-300" />}
            </div>

            <div 
              onClick={() => toggleShare('labReports')}
              className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-sm font-bold text-slate-800">Lab Reports & OCR Data</span>
              {sharedState.labReports ? <CheckSquare className="w-5 h-5 text-brand-600" /> : <Square className="w-5 h-5 text-slate-300" />}
            </div>

            <div 
              onClick={() => toggleShare('prescriptionHistory')}
              className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-sm font-bold text-slate-800">Prescription History</span>
              {sharedState.prescriptionHistory ? <CheckSquare className="w-5 h-5 text-brand-600" /> : <Square className="w-5 h-5 text-slate-300" />}
            </div>

            <div 
              onClick={() => toggleShare('dischargeSummary')}
              className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-sm font-bold text-slate-800">Discharge Summary</span>
              {sharedState.dischargeSummary ? <CheckSquare className="w-5 h-5 text-brand-600" /> : <Square className="w-5 h-5 text-slate-300" />}
            </div>

          </div>

          {/* Selected Doctor Box */}
          <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 text-xs space-y-1">
            <span className="font-extrabold text-brand-900 uppercase">Selected Doctor</span>
            <p className="font-bold text-slate-900 text-sm">{doctor.name} ({doctor.departmentName})</p>
            <p className="text-slate-600 font-medium">Slot: Today at {timeSlot}</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleShareAndBook}
              className="py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
            >
              Share & Book Appointment <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
