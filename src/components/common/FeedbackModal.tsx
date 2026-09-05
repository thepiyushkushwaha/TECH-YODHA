import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquare, X, Send } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen, showToast } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>('');

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your feedback has been submitted.');
    setIsFeedbackModalOpen(false);
    setComments('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={() => setIsFeedbackModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 text-left shadow-2xl border border-slate-200">
          
          <button
            onClick={() => setIsFeedbackModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">How was your experience?</h3>
              <p className="text-xs text-slate-500">Help us refine DRISHTI case-taking assistant</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Rating
              </label>
              <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        star <= rating 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                What can we improve?
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts on AI case taking, voice feature, or clinical summary layout..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm text-slate-800 outline-none transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Send className="w-4 h-4" /> Submit Feedback
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
