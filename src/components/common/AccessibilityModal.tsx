import React from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Volume2, Type, X, Check } from 'lucide-react';

export const AccessibilityModal: React.FC = () => {
  const { 
    isAccessibilityModalOpen, 
    setIsAccessibilityModalOpen, 
    accessibility, 
    updateAccessibility,
    speakText,
    showToast 
  } = useApp();

  if (!isAccessibilityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={() => setIsAccessibilityModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 text-left shadow-2xl border border-slate-200">
          
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Accessibility & Visuals</h3>
              <p className="text-xs text-slate-500">Customize display for comfort & low literacy</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  HC
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">High Contrast Mode</h4>
                  <p className="text-xs text-slate-500">Increases visual readability</p>
                </div>
              </div>
              <button
                onClick={() => {
                  updateAccessibility({ highContrast: !accessibility.highContrast });
                  showToast(accessibility.highContrast ? 'Standard Mode Enabled' : 'High Contrast Mode Enabled');
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  accessibility.highContrast ? 'bg-brand-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  accessibility.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Large Touch Text</h4>
                  <p className="text-xs text-slate-500">Easier reading for elderly users</p>
                </div>
              </div>
              <button
                onClick={() => {
                  updateAccessibility({ largeText: !accessibility.largeText });
                  showToast(accessibility.largeText ? 'Standard Font Size' : 'Large Font Size Enabled');
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  accessibility.largeText ? 'bg-brand-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  accessibility.largeText ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Voice Guidance */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Audio Narrator Assistance</h4>
                  <p className="text-xs text-slate-500">Auto-reads questions in your language</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const next = !accessibility.audioGuidance;
                  updateAccessibility({ audioGuidance: next });
                  if (next) speakText('Audio narration is now active');
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  accessibility.audioGuidance ? 'bg-brand-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  accessibility.audioGuidance ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsAccessibilityModalOpen(false)}
              className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Done & Save Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
