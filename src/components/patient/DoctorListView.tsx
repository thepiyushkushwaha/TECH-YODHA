import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';
import { mockDoctors } from '../../data/mockData';
import { ShareMedicalHistoryModal } from './ShareMedicalHistoryModal';
import { 
  Stethoscope, 
  Star, 
  Clock, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Users
} from 'lucide-react';

export const DoctorListView: React.FC = () => {
  const { selectedDepartment, setSelectedDoctor, setSelectedTimeSlot } = useApp();

  const [activeFilterDept, setActiveFilterDept] = useState<string>(selectedDepartment?.id || 'all');
  const [selectedDocForModal, setSelectedDocForModal] = useState<Doctor | null>(null);
  const [selectedSlotForModal, setSelectedSlotForModal] = useState<string>('11:30 AM');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const filteredDoctors = mockDoctors.filter(doc => {
    if (activeFilterDept === 'all') return true;
    return doc.departmentId === activeFilterDept;
  });

  const handleBookClick = (doc: Doctor, slot: string) => {
    setSelectedDoctor(doc);
    setSelectedTimeSlot(slot);
    setSelectedDocForModal(doc);
    setSelectedSlotForModal(slot);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Share Modal Dialog */}
      {selectedDocForModal && (
        <ShareMedicalHistoryModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          doctor={selectedDocForModal}
          timeSlot={selectedSlotForModal}
        />
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-inner">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">OPD Consultation Booking</span>
                <h2 className="text-2xl font-black text-slate-900">Available Doctors</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                Department: {selectedDepartment?.name || 'General Medicine'}
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Department Filter:
            </span>
            <button
              onClick={() => setActiveFilterDept('all')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeFilterDept === 'all' 
                  ? 'bg-brand-600 text-white border-brand-600' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              All OPD Doctors
            </button>
            <button
              onClick={() => setActiveFilterDept('dept-gen-med')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeFilterDept === 'dept-gen-med' 
                  ? 'bg-brand-600 text-white border-brand-600' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              General Medicine
            </button>
            <button
              onClick={() => setActiveFilterDept('dept-cardio')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeFilterDept === 'dept-cardio' 
                  ? 'bg-brand-600 text-white border-brand-600' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Cardiology
            </button>
          </div>
        </div>

        {/* Doctor Cards List */}
        <div className="space-y-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-4">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-slate-900">{doc.name}</h3>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {doc.rating}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">
                      {doc.departmentName} • {doc.experienceYears} Years Experience
                    </p>
                    <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mt-1">
                      <Globe className="w-3 h-3 text-slate-400" /> Languages: {doc.languages.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Users className="w-3.5 h-3.5 text-emerald-600" /> {doc.availableSlotsCount} / {doc.totalSlotsCount} slots available
                  </span>
                </div>
              </div>

              {/* Available Slots Bar */}
              <div className="space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-600" /> Available Today Slots:
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {doc.availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBookClick(doc, slot)}
                      className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-brand-600 text-slate-800 hover:text-white border border-slate-300 hover:border-brand-600 font-bold text-xs transition-all shadow-2xs flex items-center gap-1"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleBookClick(doc, doc.availableSlots[0] || '11:30 AM')}
                  className="py-3 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
