import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Zap, X, QrCode, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const QRScannerModal: React.FC = () => {
  const { setPatientStep, connectHospital, showToast } = useApp();
  
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleAllowCamera = () => {
    setHasPermission(true);
    showToast('Camera access granted');
  };

  const handleDemoScan = () => {
    setIsScanning(true);
    showToast('Scanning QR code...');
    setTimeout(() => {
      connectHospital();
      setPatientStep('hospital_connected');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6 relative overflow-hidden">
        
        <button
          onClick={() => setPatientStep('dashboard')}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!hasPermission ? (
          /* Permission Request View */
          <div className="text-center space-y-5 py-4">
            <div className="w-20 h-20 rounded-3xl bg-brand-600/20 border border-brand-500/40 text-brand-400 flex items-center justify-center mx-auto shadow-inner">
              <Camera className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Security Verification
              </span>
              <h2 className="text-2xl font-black text-white">Camera Permission Required</h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                DRISHTI needs access to your camera to scan an authorized hospital QR code at the OPD reception desk.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleAllowCamera}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" /> Allow Camera
              </button>

              <button
                onClick={() => setPatientStep('dashboard')}
                className="w-full py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* QR Camera Interface */
          <div className="space-y-6 text-center">
            
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                <QrCode className="w-6 h-6 text-brand-400" /> Scan Hospital QR
              </h2>
              <p className="text-xs text-slate-400">
                Scan only QR codes provided by authorized hospitals.
              </p>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-3xl bg-slate-950 border-2 border-slate-700 overflow-hidden flex items-center justify-center shadow-2xl">
              
              {/* Animated Laser Scanning Line */}
              <div className="animate-scan-line" />

              {/* Corner Overlay Guide */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-brand-500 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-brand-500 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-brand-500 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-brand-500 rounded-br-lg"></div>

              {/* Center Hospital Symbol */}
              <div className="text-slate-600 flex flex-col items-center space-y-2">
                <Building2 className={`w-14 h-14 ${isScanning ? 'text-brand-400 animate-pulse' : 'text-slate-600'}`} />
                <span className="text-[11px] font-mono text-slate-400">
                  {isScanning ? 'Connecting OPD Session...' : 'Align Hospital QR Code'}
                </span>
              </div>

              {/* Flashlight toggle */}
              <button
                onClick={() => {
                  setFlashlightOn(!flashlightOn);
                  showToast(flashlightOn ? 'Flashlight Off' : 'Flashlight On');
                }}
                className={`absolute bottom-3 right-3 p-2.5 rounded-xl border transition-colors ${
                  flashlightOn 
                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                    : 'bg-slate-800/80 text-slate-300 border-slate-600'
                }`}
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>

            {/* Demo Instant Trigger */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDemoScan}
                disabled={isScanning}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-extrabold text-base shadow-xl shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-300" /> Use Demo Hospital QR (KGMU OPD)
              </button>

              <button
                onClick={() => setPatientStep('dashboard')}
                className="w-full py-2.5 text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel Scanning
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Only authorized OPD QR codes (KGMU-OPD-001) are accepted</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
