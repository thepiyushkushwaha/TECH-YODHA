import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  QrCode, 
  Stethoscope, 
  FileText, 
  Calendar, 
  Brain, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const PatientDashboardView: React.FC = () => {
  const { 
    patient, 
    setPatientStep, 
    isHospitalConnected, 
    connectedHospital, 
    documents, 
    confirmedAppointment 
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header Banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl rounded-l-full pointer-events-none hidden md:block"></div>

          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-brand-100 backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" /> Patient Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Good evening, {patient.fullName ? patient.fullName.split(' ')[0] : 'Rahul'} 👋
            </h1>
            <p className="text-brand-100 text-sm sm:text-base font-medium">
              Ready to prepare your case? Connect with your hospital OPD to begin structured AI case-taking.
            </p>
          </div>
        </div>

        {/* MAIN PROMINENT CARD – CONNECT TO HOSPITAL */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-500 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-brand-600" /> Primary OPD Journey
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                🏥 CONNECT TO HOSPITAL
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Scan the QR code provided by your hospital to begin your consultation journey and connect directly with available OPD doctors.
              </p>

              {isHospitalConnected && connectedHospital && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Currently Connected: {connectedHospital.name} ({connectedHospital.department})</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-auto shrink-0">
              <button
                onClick={() => setPatientStep(isHospitalConnected ? 'hospital_connected' : 'qr_scanner')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-lg shadow-xl shadow-brand-600/30 transition-all hover:scale-105"
              >
                <QrCode className="w-6 h-6" /> {isHospitalConnected ? 'View Hospital OPD Session' : 'Scan Hospital QR'}
              </button>
            </div>
          </div>
        </div>

        {/* SECONDARY DASHBOARD CARDS (GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Medical History */}
          <div 
            onClick={() => setPatientStep('case_summary')}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-300 shadow-lg hover:shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                🩺 Medical History
              </h3>
              <p className="text-xs text-slate-500 mt-1">View your health history & conditions</p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-700 group-hover:gap-1.5 transition-all">
              View History <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: My Documents */}
          <div 
            onClick={() => setPatientStep('documents')}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                📄 My Documents
              </h3>
              <p className="text-xs text-slate-500 mt-1">{documents.length} uploaded reports & prescriptions</p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-700 group-hover:gap-1.5 transition-all">
              View Documents <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Appointments */}
          <div 
            onClick={() => setPatientStep('doctor_list')}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                📅 Appointments
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {confirmedAppointment ? `Token ${confirmedAppointment.tokenNumber} Active` : 'View upcoming appointments'}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 group-hover:gap-1.5 transition-all">
              View Slots & Booking <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: AI Case Summary */}
          <div 
            onClick={() => setPatientStep('case_summary')}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                🧠 AI Case Summary
              </h3>
              <p className="text-xs text-slate-500 mt-1">View your structured clinical summary</p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-700 group-hover:gap-1.5 transition-all">
              Review Draft <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* RECENT ACTIVITY FEED */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-brand-600" />
              <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Live Timeline</span>
          </div>

          <div className="space-y-4">
            
            {/* Activity 1 */}
            <div className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Brain className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Case Summary Draft Prepared</h4>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 10 mins ago
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  AI Assistant structured Chief Complaint & HPI for General Medicine OPD review.
                </p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Blood Report Uploaded & Analyzed</h4>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Today 10:15 AM
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">Blood_Test_March.pdf</span> processed. Hb 11.2 g/dL extracted.
                </p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">OPD Appointment Booked (Token #A1024)</h4>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Today 09:30 AM
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dr. Ankit Sharma • King George’s Medical University OPD • 11:30 AM slot.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
