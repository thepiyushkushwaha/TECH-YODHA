import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const DoctorLoginView: React.FC = () => {
  const { setRole, showToast } = useApp();
  const [email, setEmail] = useState<string>('dr.ankit.sharma@kgmu.edu.in');
  const [password, setPassword] = useState<string>('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Authenticated as Dr. Ankit Sharma (General Medicine OPD)');
    setRole('doctor');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Stethoscope className="w-9 h-9" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
            Physician Portal Access
          </span>
          <h2 className="text-2xl font-black text-white pt-1">Doctor Login</h2>
          <p className="text-xs text-slate-400 font-medium">
            Enter your Medical ID or KGMU Institutional Email
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Email / Medical License ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.gov.in"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 focus:border-blue-500 text-sm font-medium text-white outline-none pr-10"
                required
              />
              <Mail className="w-5 h-5 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 focus:border-blue-500 text-sm font-medium text-white outline-none pr-10"
                required
              />
              <Lock className="w-5 h-5 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            Access Doctor Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Encrypted OPD Queue System • Authorized Medical Personnel Only</span>
        </div>

      </div>
    </div>
  );
};
