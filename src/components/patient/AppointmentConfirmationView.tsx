import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Building2, 
  Ticket, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

export const AppointmentConfirmationView: React.FC = () => {
  const { confirmedAppointment, setPatientStep, showToast } = useApp();

  const apt = confirmedAppointment || {
    tokenNumber: '#A1024',
    doctorName: 'Dr. Ankit Sharma',
    doctorDepartment: 'General Medicine OPD',
    hospitalName: 'King George’s Medical University',
    appointmentTime: '11:30 AM',
    appointmentDate: 'Today',
    sharedData: { caseSummary: true, medicalHistory: true, labReports: true }
  };

  const handleAddToCalendar = () => {
    showToast('Appointment added to device calendar');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 text-center space-y-6">
          
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
              OPD Booking Complete
            </span>
            <h2 className="text-3xl font-black text-slate-900 pt-1">
              ✓ Appointment Confirmed
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Your clinical history has been shared with your consulting doctor
            </p>
          </div>

          {/* Token Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-teal-800 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-700 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">OPD Queue Token</span>
              <span className="font-mono font-black text-2xl text-amber-300">{apt.tokenNumber}</span>
            </div>

            <div className="text-left space-y-1.5">
              <h3 className="text-xl font-extrabold text-white">{apt.doctorName}</h3>
              <p className="text-xs font-bold text-brand-200">{apt.doctorDepartment}</p>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                <Building2 className="w-4 h-4 text-brand-300" /> {apt.hospitalName}
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-300" /> {apt.appointmentDate} at {apt.appointmentTime}
              </p>
            </div>
          </div>

          {/* Information Shared List */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
            <p className="font-extrabold text-slate-700 uppercase tracking-wider">Information Shared with Doctor:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-bold text-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Case Summary
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Medical History
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Selected Documents
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setPatientStep('case_summary')}
                className="py-3.5 px-4 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-brand-600" /> View Case Summary
              </button>

              <button
                onClick={handleAddToCalendar}
                className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-slate-600" /> Add to Calendar
              </button>
            </div>

            <button
              onClick={() => setPatientStep('dashboard')}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
            >
              Back to Dashboard <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
