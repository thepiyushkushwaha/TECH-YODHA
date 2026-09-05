import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import { VoiceModeModal } from './VoiceModeModal';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  Volume2, 
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Brain
} from 'lucide-react';

export const AIChatCaseTakingView: React.FC = () => {
  const { 
    patient, 
    connectedHospital, 
    setPatientStep, 
    triggerEmergencyAlert, 
    caseSummary, 
    updateCaseSummary,
    speakText,
    accessibility,
    showToast
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${patient.fullName ? patient.fullName.split(' ')[0] : 'Rahul'}. I'm DRISHTI, your AI Case-Taking Assistant for King George’s Medical University OPD. I'll ask a few structured questions about your health so your doctor can focus more on your care.`,
      timestamp: '10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: 'What primary health problem or symptom are you experiencing today?',
      timestamp: '10:01 AM',
      options: ['I have chest pain', 'Persistent dry cough', 'Fever & chills', 'Joint pain / stiffness']
    }
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [questionStep, setQuestionStep] = useState<number>(1);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const questionsList = [
    'What primary health problem or symptom are you experiencing today?',
    'When did this discomfort start?',
    'Where exactly do you feel the pain or discomfort?',
    'How would you describe the sensation (e.g. sharp, dull pressure, burning, throbbing)?',
    'On a scale of 0 to 10, how severe is it right now?',
    'Does the pain spread or radiate anywhere else (such as arm, neck, or back)?',
    'Does anything make the symptom better or worse (e.g. rest, eating, walking)?',
    'Are you experiencing any difficulty breathing, sweating, or dizziness?',
    'Have you experienced similar symptoms in the past?'
  ];

  const currentQuestionText = questionsList[Math.min(questionStep, questionsList.length - 1)];

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const emergencyKeywords = ['chest pain', 'severe chest pain', 'shortness of breath', 'difficulty breathing', 'unconscious', 'fainting', 'severe pain'];

  const checkRedFlags = (text: string) => {
    const lower = text.toLowerCase();
    const foundKeyword = emergencyKeywords.find(kw => lower.includes(kw));
    if (foundKeyword) {
      triggerEmergencyAlert(`Reported symptom: "${text}"`);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Check emergency red flags
    checkRedFlags(textToSend);

    // 1. Append Patient Message
    const patientMsg: ChatMessage = {
      id: `msg-pat-${Date.now()}`,
      sender: 'patient',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, patientMsg]);
    setInputVal('');
    setIsTyping(true);

    // 2. Update HPI summary draft in context dynamically
    if (questionStep === 1) {
      updateCaseSummary({
        ...caseSummary,
        chiefComplaint: textToSend,
        hpi: { ...caseSummary.hpi, character: textToSend }
      });
    } else if (questionStep === 2) {
      updateCaseSummary({
        ...caseSummary,
        hpi: { ...caseSummary.hpi, onset: textToSend }
      });
    } else if (questionStep === 5) {
      updateCaseSummary({
        ...caseSummary,
        hpi: { ...caseSummary.hpi, severity: textToSend }
      });
    }

    // 3. Simulate AI response after 1 second
    setTimeout(() => {
      setIsTyping(false);
      const nextStep = questionStep + 1;
      setQuestionStep(nextStep);

      if (nextStep < questionsList.length) {
        const nextQ = questionsList[nextStep];
        let chips: string[] | undefined = undefined;

        if (nextStep === 2) chips = ['2 days ago', 'Yesterday', 'This morning', 'Over a week'];
        else if (nextStep === 3) chips = ['Mid-chest region', 'Upper abdomen', 'Throat', 'Left arm'];
        else if (nextStep === 4) chips = ['Dull pressure', 'Sharp aching', 'Burning sensation', 'Throbbing'];
        else if (nextStep === 5) chips = ['3 / 10 (Mild)', '5 / 10 (Moderate)', '8 / 10 (Severe)'];
        else if (nextStep === 7) chips = ['Yes, mild dyspnea', 'No breathing difficulty', 'Sweating present'];
        else chips = ['Yes', 'No', 'Not sure'];

        const aiReply: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: nextQ,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: chips
        };

        setMessages(prev => [...prev, aiReply]);
        if (accessibility.audioGuidance) {
          speakText(nextQ);
        }
      } else {
        // Final completion message
        const finalReply: ChatMessage = {
          id: `msg-ai-final-${Date.now()}`,
          sender: 'ai',
          text: 'Thank you, Rahul! I have gathered your clinical history and structured a case summary draft for your doctor.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, finalReply]);
        showToast('Clinical history collection completed!');
      }
    }, 1000);
  };

  const progressPercent = Math.min(Math.round((questionStep / (questionsList.length - 1)) * 100), 100);

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-slate-50 flex flex-col justify-between">
      
      {/* Voice Input Modal */}
      <VoiceModeModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentQuestion={currentQuestionText}
        onConfirmSpeech={(spokenText) => handleSendMessage(spokenText)}
      />

      {/* Header with OPD Progress */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-18 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">DRISHTI AI Assistant</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                  {connectedHospital?.department || 'General Medicine OPD'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {connectedHospital?.name || 'King George’s Medical University'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-36 sm:w-48 space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-600">
              <span>Clinical History</span>
              <span className="text-brand-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-600 to-teal-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Thread */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 space-y-4 overflow-y-auto">
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'} space-y-1`}
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 px-1">
              <span>{msg.sender === 'patient' ? patient.fullName : 'DRISHTI AI'}</span>
              <span>• {msg.timestamp}</span>
            </div>

            <div 
              className={`max-w-[88%] sm:max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'patient'
                  ? 'bg-brand-600 text-white rounded-br-none font-medium'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none font-medium'
              }`}
            >
              <p>{msg.text}</p>
            </div>

            {/* Quick Option Chips (If provided by AI) */}
            {msg.options && msg.options.length > 0 && msg.sender === 'ai' && (
              <div className="flex flex-wrap gap-2 pt-2 max-w-[88%]">
                {msg.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(opt)}
                    className="py-2 px-3.5 rounded-full bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold transition-all shadow-2xs hover:scale-105"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 w-24 text-slate-400">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Completion Banner when finished */}
      {questionStep >= questionsList.length && (
        <div className="max-w-4xl mx-auto w-full px-4 mb-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-200 shrink-0" />
              <div>
                <h4 className="font-extrabold text-base">Case Preparation Complete!</h4>
                <p className="text-xs text-emerald-100">Review your clinical summary draft before choosing a doctor.</p>
              </div>
            </div>
            <button
              onClick={() => setPatientStep('case_summary')}
              className="py-3 px-6 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              Review Case Summary <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Input Controls Bar */}
      <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
          
          {/* Voice Mode Button */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="p-3.5 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 transition-colors shrink-0 flex items-center gap-1.5 font-bold text-xs"
            title="Speak with Voice"
          >
            <Mic className="w-5 h-5 text-brand-600" /> <span className="hidden sm:inline">Voice</span>
          </button>

          {/* Attach Document Button */}
          <button
            onClick={() => setPatientStep('documents')}
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
            title="Attach Medical Document"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Input text field */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputVal); }}
            className="flex-1 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`Answer in ${patient.preferredLanguage || 'Hindi'} or English...`}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-medium text-slate-900 outline-none shadow-xs bg-slate-50"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className={`p-3.5 rounded-2xl font-bold transition-all shrink-0 ${
                inputVal.trim()
                  ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
