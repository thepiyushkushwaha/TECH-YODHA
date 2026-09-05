import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { 
  User, 
  Globe, 
  CreditCard, 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Trash2,
  AlertCircle
} from 'lucide-react';

export const PatientProfileSetupView: React.FC = () => {
  const { patient, updatePatientProfile, documents, addDocument, setPatientStep, showToast } = useApp();

  const [fullName, setFullName] = useState<string>(patient.fullName || 'Rahul Sharma');
  const [age, setAge] = useState<number>(patient.age || 32);
  const [gender, setGender] = useState<any>(patient.gender || 'Male');
  const [language, setLanguage] = useState<Language>(patient.preferredLanguage || 'Hindi');
  const [abhaId, setAbhaId] = useState<string>(patient.abhaId || '91-4820-1940-5829');

  const languages: Language[] = ['Hindi', 'English', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Other'];
  const docTypes = ['Prescription', 'Lab Report', 'Discharge Summary', 'Imaging Report', 'Other'] as const;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientProfile({
      fullName,
      age: Number(age),
      gender,
      preferredLanguage: language,
      abhaId
    });
    showToast('Profile saved successfully');
    setPatientStep('consent');
  };

  const handleMockUpload = (type: typeof docTypes[number]) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      filename: `${type.replace(' ', '_')}_Upload_${Math.floor(Math.random()*100)}.pdf`,
      documentType: type,
      date: 'Today',
      uploadStatus: 'Processed' as const,
      fileSize: '1.2 MB',
      extractedInformation: {
        'Category': type,
        'Upload Time': new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'Status': 'AI Extract Complete'
      },
      rawSummary: `Extracted data from newly uploaded ${type}. Prepared for doctor review.`
    };
    addDocument(newDoc);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 1 of 2</span>
              <h2 className="text-2xl font-extrabold text-slate-900">Let’s create your patient profile</h2>
            </div>
          </div>
          <p className="text-slate-600 text-sm">
            This information will be used to structure your case history for your hospital OPD consultation.
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-medium text-slate-900 outline-none"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Age (Years) *
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min={1}
                max={120}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-medium text-slate-900 outline-none"
                required
              />
            </div>

            {/* ABHA ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>ABHA ID</span>
                <span className="text-[10px] text-slate-400 font-normal">Optional</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  placeholder="e.g. 91-4820-1940-5829"
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-medium text-slate-900 outline-none pr-10"
                />
                <CreditCard className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Gender Pills */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Gender *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Male', 'Female', 'Other', 'Prefer not to say'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border text-center ${
                      gender === g 
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Language */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-600" /> Preferred AI Case-Taking Language *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border text-center ${
                      language === lang 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Document Upload Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Upload Previous Medical Documents</h4>
                <p className="text-xs text-slate-500">Optional • Upload prescriptions, blood tests or reports to auto-extract history</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                Optional
              </span>
            </div>

            {/* Quick Upload Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {docTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleMockUpload(type)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 border border-dashed border-slate-300 hover:border-brand-400 transition-all text-center group"
                >
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-brand-600 mb-1" />
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-800">{type}</span>
                </button>
              ))}
            </div>

            {/* Uploaded Files Cards */}
            {documents.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Uploaded Files ({documents.length}):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-800 truncate">{doc.filename}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{doc.documentType} • {doc.date}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Processed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setPatientStep('consent')}
              className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Skip for Now
            </button>

            <button
              type="submit"
              className="py-3.5 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
