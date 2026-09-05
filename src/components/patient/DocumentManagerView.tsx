import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MedicalDocument } from '../../types';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Plus, 
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const DocumentManagerView: React.FC = () => {
  const { documents, addDocument, setPatientStep, showToast } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(documents[0] || null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const categories = ['Prescription', 'Lab Report', 'Discharge Summary', 'Imaging Report', 'Other'] as const;

  const handleUploadCategory = (cat: typeof categories[number]) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const newDoc: MedicalDocument = {
        id: `doc-${Date.now()}`,
        filename: `${cat.replace(' ', '_')}_Recent_${Math.floor(Math.random() * 899 + 100)}.pdf`,
        documentType: cat,
        date: 'Today',
        uploadStatus: 'Processed',
        fileSize: '1.6 MB',
        extractedInformation: {
          'Extracted Parameter 1': 'Within Normal Limits',
          'Extracted Parameter 2': 'No Acute Findings',
          'Review Tag': 'AI Extraction Verified'
        },
        rawSummary: `Parsed content from newly uploaded ${cat}. Categorized for OPD consulting physician.`
      };
      addDocument(newDoc);
      setSelectedDoc(newDoc);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">ABDM Document Vault</span>
              <h2 className="text-2xl font-black text-slate-900">Your Medical Documents</h2>
            </div>
          </div>

          <button
            onClick={() => handleUploadCategory('Lab Report')}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Upload Document
          </button>
        </div>

        {/* Upload Category Chips */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Quick Upload Category:</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleUploadCategory(cat)}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-800 text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5"
              >
                <Upload className="w-4 h-4 text-brand-600" />
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skeleton Loader during simulated upload */}
        {isUploading && (
          <div className="p-6 bg-white rounded-3xl border border-brand-200 shadow-xl space-y-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-xl"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-brand-200 rounded w-1/3"></div>
                <div className="h-3 bg-brand-100 rounded w-1/4"></div>
              </div>
            </div>
            <p className="text-xs text-brand-600 font-bold">Parsing text with OCR vision model...</p>
          </div>
        )}

        {/* Grid: Document Cards & Extracted OCR Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Document Cards List */}
          <div className="space-y-3 lg:col-span-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">Uploaded Files ({documents.length}):</p>

            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedDoc?.id === doc.id
                    ? 'bg-brand-50 border-brand-500 shadow-md ring-2 ring-brand-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{doc.filename}</h4>
                      <p className="text-xs text-slate-500">{doc.documentType} • {doc.date}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {doc.uploadStatus}
                  </span>
                  <span className="text-slate-400 font-medium">{doc.fileSize}</span>
                </div>
              </div>
            ))}
          </div>

          {/* OCR Extracted Information View */}
          <div className="lg:col-span-2">
            {selectedDoc ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600">OCR Report Viewer</span>
                    <h3 className="text-xl font-extrabold text-slate-900">{selectedDoc.filename}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedDoc.documentType} • Uploaded {selectedDoc.date}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ✓ Processed
                  </span>
                </div>

                {/* AI Extracted Parameters Box */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600" /> Extracted Clinical Information:
                    </h4>
                  </div>

                  {selectedDoc.extractedInformation ? (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 text-sm">
                      {Object.entries(selectedDoc.extractedInformation).map(([key, val]) => (
                        <div key={key} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                          <span className="font-semibold text-slate-700">{key}</span>
                          <span className="font-bold text-brand-900 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No structured data extracted.</p>
                  )}
                </div>

                {/* Raw Summary */}
                {selectedDoc.rawSummary && (
                  <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200 text-xs text-slate-800 space-y-1">
                    <p className="font-bold text-brand-900 uppercase tracking-wider">AI Medical Summary</p>
                    <p className="leading-relaxed">{selectedDoc.rawSummary}</p>
                  </div>
                )}

                {/* Important Disclaimer Label */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>“AI-extracted information – verify with your doctor.”</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setPatientStep('case_summary')}
                    className="py-3 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Include in Case Summary
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-md text-center text-slate-400">
                Select a document to inspect AI extracted information.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
