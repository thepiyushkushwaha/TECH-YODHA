import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../types';
import { DoctorCaseDetailView } from './DoctorCaseDetailView';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Stethoscope, 
  ArrowRight, 
  FileText, 
  Search,
  Filter,
  Activity,
  Sparkles,
  Building2
} from 'lucide-react';

export const DoctorDashboardView: React.FC = () => {
  const { appointments, updateAppointmentStatus, showToast } = useApp();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredQueue = appointments.filter(apt => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'emergency') return apt.status === 'Emergency Priority';
    if (filterStatus === 'waiting') return apt.status === 'Waiting';
    if (filterStatus === 'completed') return apt.status === 'Completed';
    return true;
  });

  if (selectedAppointment) {
    return (
      <DoctorCaseDetailView
        appointment={selectedAppointment}
        onBack={() => setSelectedAppointment(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Doctor Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Building2 className="w-3.5 h-3.5" /> King George’s Medical University OPD
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Good Morning, Dr. Ankit Sharma 👨‍⚕️
            </h1>
            <p className="text-blue-200 text-xs sm:text-sm">
              General Medicine OPD Session • Token #A1024 to #A1152 Active
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('OPD Patient Queue Refresh Complete')}
              className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" /> Refresh Queue
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Total Patients</span>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-black text-slate-900">128</p>
            <p className="text-xs text-slate-500 font-medium">Scheduled today</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Completed</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-emerald-700">32</p>
            <p className="text-xs text-slate-500 font-medium">Consulted cases</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Waiting</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-black text-amber-700">18</p>
            <p className="text-xs text-slate-500 font-medium">In waiting lounge</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Remaining</span>
              <Stethoscope className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-black text-slate-900">78</p>
            <p className="text-xs text-slate-500 font-medium">Slots upcoming</p>
          </div>

        </div>

        {/* Emergency Triage Banner if present */}
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-700">Triage Priority Alert</span>
              <h3 className="text-lg font-black text-red-900">1 High-Priority Emergency Case Detected</h3>
              <p className="text-xs text-red-800 font-medium">
                Token #A1026 (Amit Kumar) reported acute crushing chest pain & severe diaphoresis.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedAppointment(appointments.find(a => a.tokenNumber === '#A1026') || appointments[0])}
            className="py-3 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
          >
            Review Priority Case <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Patient Queue Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">OPD Patient Queue & Case Summaries</h2>
              <p className="text-xs text-slate-500">Click on any patient to review AI clinical draft history</p>
            </div>

            {/* Queue Filter */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  filterStatus === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                All Queue
              </button>
              <button
                onClick={() => setFilterStatus('waiting')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  filterStatus === 'waiting' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                Waiting
              </button>
              <button
                onClick={() => setFilterStatus('emergency')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  filterStatus === 'emergency' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                Emergency
              </button>
            </div>
          </div>

          {/* Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4 rounded-l-2xl">Token</th>
                  <th className="p-4">Patient Demographics</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Case Summary</th>
                  <th className="p-4 rounded-r-2xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredQueue.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Token */}
                    <td className="p-4 font-mono font-black text-brand-700 text-base">
                      {apt.tokenNumber}
                    </td>

                    {/* Patient */}
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{apt.patientName}</p>
                      <p className="text-xs text-slate-500">{apt.patientAge} yrs • {apt.patientGender}</p>
                    </td>

                    {/* Department */}
                    <td className="p-4 text-xs font-semibold text-slate-700">
                      {apt.doctorDepartment}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {apt.status === 'Emergency Priority' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-black text-red-700 bg-red-100 px-3 py-1 rounded-full border border-red-200 animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" /> Emergency
                        </span>
                      ) : apt.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5" /> Waiting
                        </span>
                      )}
                    </td>

                    {/* Case Summary badge */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Case Draft Ready
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedAppointment(apt)}
                        className="py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition-all inline-flex items-center gap-1.5"
                      >
                        Review Case <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
