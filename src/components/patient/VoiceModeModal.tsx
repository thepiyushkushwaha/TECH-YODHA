import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, RefreshCw, MessageSquare, CheckCircle2, Edit3, Volume2, X } from 'lucide-react';

interface VoiceModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion: string;
  onConfirmSpeech: (text: string) => void;
}

export const VoiceModeModal: React.FC<VoiceModeModalProps> = ({
  isOpen,
  onClose,
  currentQuestion,
  onConfirmSpeech
}) => {
  const { patient, speakText, showToast } = useApp();

  const [isListening, setIsListening] = useState<boolean>(true);
  const [transcription, setTranscription] = useState<string>(
    patient.preferredLanguage === 'Hindi' 
      ? 'Mujhe do din se chest pain aur halka sa saans phulne ka problem ho raha hai.' 
      : 'I have been experiencing chest pain and mild difficulty breathing for 2 days.'
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) showToast('Listening to voice input...');
  };

  const handleConfirm = () => {
    onConfirmSpeech(transcription);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white text-center shadow-2xl border border-slate-700 space-y-6">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Header */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-300">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
            Voice Input • Language: {patient.preferredLanguage || 'Hindi'}
          </div>

          {/* Animated Waveform & Mic Circle */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping"></div>
                <div className="absolute -inset-3 rounded-full bg-teal-500/10 animate-pulse"></div>
              </>
            )}

            <button
              onClick={handleToggleListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 z-10 ${
                isListening 
                  ? 'bg-gradient-to-tr from-brand-600 to-teal-500 text-white' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <MicOff className="w-10 h-10" />}
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-extrabold text-brand-300">
              {isListening ? '🎙 Listening natural voice...' : 'Speech Paused'}
            </p>
            <p className="text-xs text-slate-400">Current Question:</p>
            <p className="text-base font-bold text-white max-w-sm mx-auto">
              "{currentQuestion}"
            </p>
          </div>

          {/* Waveform graphic lines */}
          {isListening && (
            <div className="flex items-center justify-center gap-1.5 h-8">
              {[40, 70, 30, 90, 50, 80, 40, 60, 90, 30, 70].map((h, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-gradient-to-t from-brand-500 to-teal-400 rounded-full animate-wave"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}

          {/* Transcription Card */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-left space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>You said (Speech-to-Text):</span>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-brand-400 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> {isEditing ? 'Save Edit' : 'Edit Text'}
              </button>
            </div>

            {isEditing ? (
              <textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-brand-500 text-sm text-white outline-none"
              />
            ) : (
              <p className="text-sm font-medium text-teal-200 italic leading-snug">
                "{transcription}"
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleConfirm}
                className="py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Confirm & Send
              </button>

              <button
                onClick={handleToggleListening}
                className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 flex items-center justify-center gap-2"
              >
                {isListening ? 'Stop Recording' : 'Resume Mic'}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <button
                onClick={() => speakText(currentQuestion)}
                className="hover:text-white flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4 text-amber-400" /> Repeat Question
              </button>

              <button
                onClick={onClose}
                className="hover:text-white flex items-center gap-1"
              >
                <MessageSquare className="w-4 h-4 text-teal-400" /> Switch to Chat Mode
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
