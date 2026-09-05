import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, ArrowRight, ShieldCheck, Lock, CheckCircle2, UserPlus, RefreshCw } from 'lucide-react';

export const PatientLoginView: React.FC = () => {
  const { setPatientStep, updatePatientProfile, setIsLoggedIn, showToast } = useApp();
  
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');
  const [email, setEmail] = useState<string>('rahul.sharma@example.com');
  
  const [isOtpStep, setIsOtpStep] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>(['4', '8', '2', '0', '1', '9']);
  const [resendTimer, setResendTimer] = useState<number>(30);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'mobile' && !mobileNumber) {
      showToast('Please enter a valid mobile number');
      return;
    }
    if (loginMethod === 'email' && !email) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsOtpStep(true);
    showToast('OTP sent: 482019');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < 6) {
      showToast('Please enter complete 6-digit OTP');
      return;
    }
    setIsLoggedIn(true);
    if (loginMethod === 'mobile') {
      updatePatientProfile({ mobileNumber: `+91 ${mobileNumber}` });
    } else {
      updatePatientProfile({ email });
    }
    showToast('Mobile number verified successfully');
    setPatientStep('profile_setup');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.charAt(val.length - 1);
    const updated = [...otpValues];
    updated[index] = val;
    setOtpValues(updated);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleContinueAsNewPatient = () => {
    setIsLoggedIn(true);
    setPatientStep('profile_setup');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {!isOtpStep ? (
          <>
            {/* Step 1: Login Phone/Email */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-500 font-medium">
                Log in to access your saved clinical cases & ABHA profile
              </p>
            </div>

            {/* Selector Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLoginMethod('mobile')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'mobile' 
                    ? 'bg-white text-brand-700 shadow-sm font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5" /> Mobile Number
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'email' 
                    ? 'bg-white text-brand-700 shadow-sm font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> Email Address
              </button>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              {loginMethod === 'mobile' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile Number
                  </label>
                  <div className="flex rounded-2xl border border-slate-300 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 overflow-hidden bg-white shadow-xs">
                    <span className="bg-slate-100 text-slate-700 px-4 py-3.5 font-bold text-sm border-r border-slate-300 flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      maxLength={10}
                      className="w-full px-4 py-3.5 text-sm font-medium text-slate-900 outline-none"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-medium text-slate-900 outline-none shadow-xs"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center space-y-3">
              <p className="text-xs font-semibold text-slate-500">New to DRISHTI?</p>
              
              <button
                onClick={handleContinueAsNewPatient}
                className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-slate-600" /> Create New Patient Profile
              </button>

              <button
                onClick={handleContinueAsNewPatient}
                className="text-xs font-semibold text-brand-600 hover:underline inline-block pt-1"
              >
                Continue as New Patient (Guest Mode)
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: OTP Verification Screen */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify Mobile Number</h2>
              <p className="text-xs text-slate-500 font-medium">
                Enter the 6-digit OTP code sent to <span className="font-bold text-slate-800">+91 {mobileNumber}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-between gap-2 max-w-xs mx-auto">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-13 text-center text-xl font-bold rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500 outline-none shadow-xs bg-slate-50"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Didn't receive code?</span>
                <button
                  type="button"
                  onClick={() => showToast('OTP Resent: 482019')}
                  className="text-brand-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Resend OTP
                </button>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> Verify & Continue
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Change Mobile Number
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
