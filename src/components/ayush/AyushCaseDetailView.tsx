import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Leaf, 
  PieChart, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Activity
} from 'lucide-react';

interface AyushCaseDetailViewProps {
  onBack: () => void;
}

export const AyushCaseDetailView: React.FC<AyushCaseDetailViewProps> = ({ onBack }) => {
  const { ayushData, showToast } = useApp();

  const [openSections, setOpenSections] = useState({
    prakriti: true,
    dashaVidha: true,
    nidanSamprapti: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAssessment = () => {
    showToast('AYUSH Assessment & Chikitsa plan verified by Vaidya');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to AYUSH Queue
          </button>

          <button
            onClick={handleSaveAssessment}
            className="py-2.5 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Save Ayurvedic Assessment
          </button>
        </div>

        {/* Patient Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-ayush-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900">AYUSH Clinical Assessment</h1>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-50 text-emerald-800 border border-emerald-300">
                  Token #A1024
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-1">
                Rahul Sharma • 32 Yrs • Male • Preferred Language: Hindi
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Dasha Vidha Pareeksha Complete
          </span>
        </div>

        {/* Section 1: Prakriti & Vikriti Wheel */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('prakriti')}
            className="w-full p-6 text-left flex items-center justify-between bg-slate-50 border-b border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">1. Prakriti & Vikriti Analysis</h3>
                <p className="text-xs text-slate-500">Deha Prakriti dosha distribution & active aggravation</p>
              </div>
            </div>
            {openSections.prakriti ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {openSections.prakriti && (
            <div className="p-6 space-y-6 animate-fade-in">
              
              {/* Prakriti Bar Graphs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Vata */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="flex justify-between font-bold text-xs text-blue-900">
                    <span>Vata Dosha</span>
                    <span>{ayushData.prakriti.vata}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-blue-200 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${ayushData.prakriti.vata}%` }}></div>
                  </div>
                  <span className="text-[10px] text-blue-700 font-medium">Air & Ether Element</span>
                </div>

                {/* Pitta */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex justify-between font-bold text-xs text-amber-900">
                    <span>Pitta Dosha</span>
                    <span>{ayushData.prakriti.pitta}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-amber-200 overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: `${ayushData.prakriti.pitta}%` }}></div>
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium">Fire & Water Element</span>
                </div>

                {/* Kapha */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex justify-between font-bold text-xs text-emerald-900">
                    <span>Kapha Dosha</span>
                    <span>{ayushData.prakriti.kapha}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-emerald-200 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${ayushData.prakriti.kapha}%` }}></div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">Earth & Water Element</span>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div className="p-4 rounded-2xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 space-y-1">
                  <span className="text-[10px] uppercase text-emerald-700 font-extrabold">Dominant Constitution</span>
                  <p className="text-base font-black">{ayushData.prakriti.dominant}</p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-1">
                  <span className="text-[10px] uppercase text-red-700 font-extrabold">Vikriti (Pathological State)</span>
                  <p className="text-sm font-black">{ayushData.vikriti}</p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Section 2: Dasha Vidha Pareeksha */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('dashaVidha')}
            className="w-full p-6 text-left flex items-center justify-between bg-slate-50 border-b border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ayush-100 text-ayush-700 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">2. Dasha Vidha Pareeksha (10-Fold Assessment)</h3>
                <p className="text-xs text-slate-500">Sara, Samhanana, Pramana, Satmya, Sattva & Agni Shakti</p>
              </div>
            </div>
            {openSections.dashaVidha ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {openSections.dashaVidha && (
            <div className="p-6 space-y-4 animate-fade-in text-xs font-bold text-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Sara (Tissue Essence)</span>
                  <span className="text-slate-900">{ayushData.sara}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Samhanana (Compactness)</span>
                  <span className="text-slate-900">{ayushData.samhanana}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Pramana (Proportions)</span>
                  <span className="text-slate-900">{ayushData.pramana}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Satmya (Adaptability)</span>
                  <span className="text-slate-900">{ayushData.satmya}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Sattva (Mental Strength)</span>
                  <span className="text-slate-900">{ayushData.sattva}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Ahara Shakti (Digestive Power)</span>
                  <span className="text-slate-900">{ayushData.aharaShakti}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Vyayama Shakti (Exercise Capacity)</span>
                  <span className="text-slate-900">{ayushData.vyayamaShakti}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Vaya (Age Stage)</span>
                  <span className="text-slate-900">{ayushData.vaya}</span>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Section 3: Ahara, Vihara, Nidana & Samprapti */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('nidanSamprapti')}
            className="w-full p-6 text-left flex items-center justify-between bg-slate-50 border-b border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">3. Ahara, Vihara, Nidana & Samprapti Pathogenesis</h3>
                <p className="text-xs text-slate-500">Etiological factors and disease progression</p>
              </div>
            </div>
            {openSections.nidanSamprapti ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {openSections.nidanSamprapti && (
            <div className="p-6 space-y-4 animate-fade-in text-xs font-medium text-slate-800">
              
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-extrabold text-amber-900 uppercase">AHARA (Dietary Habits)</span>
                <p>{ayushData.ahara}</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-extrabold text-blue-900 uppercase">VIHARA (Lifestyle & Daily Routine)</span>
                <p>{ayushData.vihara}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-extrabold text-purple-900 uppercase">NIDANA (Causative Factors)</span>
                <p>{ayushData.nidana}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-1">
                <span className="font-extrabold text-emerald-950 uppercase">SAMPRAPTI (Pathogenesis Mechanism)</span>
                <p className="text-sm font-semibold leading-relaxed">{ayushData.samprapti}</p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
