import React from 'react';
import { useApp } from '../../context/AppContext';
import { Department } from '../../types';
import { mockDepartments } from '../../data/mockData';
import { Building2, ArrowRight, ShieldCheck, Users, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export const DepartmentRecommendationView: React.FC = () => {
  const { setSelectedDepartment, setPatientStep, connectedHospital, showToast } = useApp();

  const handleSelectDept = (dept: Department) => {
    setSelectedDepartment(dept);
    showToast(`Selected ${dept.name} department`);
    setPatientStep('doctor_list');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shadow-inner">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Triage Assistance</span>
              <h2 className="text-2xl font-black text-slate-900">Suggested Hospital Departments</h2>
            </div>
          </div>

          <p className="text-slate-700 text-sm font-medium leading-relaxed">
            “Based on the symptoms and information you provided, these departments may be relevant for your consultation at <span className="font-bold text-slate-900">{connectedHospital?.name || 'KGMU'}</span>.”
          </p>

          <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-900 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Note: These are suggested departments for history triage, not an AI diagnosis.</span>
          </div>
        </div>

        {/* Department Cards Grid */}
        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">Available OPD Departments:</p>

          <div className="grid grid-cols-1 gap-4">
            {mockDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => handleSelectDept(dept)}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                  dept.isSuggested 
                    ? 'border-brand-500 bg-gradient-to-r from-white via-white to-brand-50/40' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {dept.name}
                    </h3>
                    {dept.isSuggested && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-brand-100 text-brand-800 border border-brand-200">
                        <Sparkles className="w-3 h-3 text-brand-600" /> Suggested Department
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1 rounded-xl">
                      <Users className="w-4 h-4 text-blue-600" /> {dept.availableDoctors} Doctors Available
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                      <Calendar className="w-4 h-4 text-emerald-600" /> {dept.availableSlots} / {dept.totalSlots} Slots Open Today
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDept(dept);
                    }}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                  >
                    Select Department <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
