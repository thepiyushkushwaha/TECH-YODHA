import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AyushCaseDetailView } from './AyushCaseDetailView';
import { 
  Leaf, 
  Activity, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Building2,
  PieChart
} from 'lucide-react';

export const AyushDashboardView: React.FC = () => {
  const { appointments, showToast } = useApp();
  const [selectedAyushPatient, setSelectedAyushPatient] = useState<boolean>(false);

  if (selectedAyushPatient) {
    return <AyushCaseDetailView onBack={() => setSelectedAyushPatient(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* AYUSH Doctor Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-ayush-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Leaf className="w-3.5 h-3.5" /> KGMU AYUSH Holistic OPD Wing
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              AYUSH Clinical Assessment Portal 🌿
            </h1>
            <p className="text-emerald-200 text-xs sm:text-sm">
              Dr. V. K. Vaidya (Ayurvedic Physician) • Prakriti & Vikriti Case Queue
            </p>
          </div>

          <button
            onClick={() => showToast('AYUSH Prakriti Queue Refreshed')}
            className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-emerald-300" /> Refresh Prakriti Queue
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>AYUSH OPD Patients</span>
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-slate-900">42</p>
            <p className="text-xs text-slate-500 font-medium">Scheduled today</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Prakriti Evaluated</span>
              <PieChart className="w-5 h-5 text-ayush-600" />
            </div>
            <p className="text-3xl font-black text-emerald-700">18</p>
            <p className="text-xs text-slate-500 font-medium">Dominant Vata/Pitta/Kapha</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Waiting</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-black text-amber-700">6</p>
            <p className="text-xs text-slate-500 font-medium">In waiting lounge</p>
          </div>
        </div>

        {/* Patient Queue Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">AYUSH OPD Queue</h2>
              <p className="text-xs text-slate-500">Inspect Prakriti, Vikriti & Dasha Vidha Pareeksha assessments</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Ayurvedic Triage
            </span>
          </div>

          {/* Sample Queue Item */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                R
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">Rahul Sharma</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white text-emerald-800 border border-emerald-300">
                    Token #A1024
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  32 yrs • Male • Dominant: <span className="text-emerald-700">Vata-Pitta Prakriti</span>
                </p>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  Chief Complaint: Chest discomfort & Hridaya Stambha
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAyushPatient(true)}
              className="py-3 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              Review AYUSH Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
