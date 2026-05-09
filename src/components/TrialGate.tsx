import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Check, X, Sparkles, Zap, Shield } from 'lucide-react';
import { toast } from 'sonner';

// Códigos de acceso beta — compartir con testers
const BETA_CODES = [
  'BETA2026GIL',      // Código general
  'CRUNCHVIP',        // Para Crunch
  'PLANETFITPRO',     // Para Planet Fitness
  'GILMASTERS2026',   // Gil personal
  'NUTRIOSCOPE14',    // Para nutriólogos beta
  'ANTHRO14FREE',     // 14 días gratis
  'UNIVERSIDADPRO',   // Para universidad
  'HOSPITALISAK',     // Para hospital
];

const TRIAL_DAYS = 14;

function getTrialStatus(): {
  isActive: boolean;
  daysLeft: number;
  isBeta: boolean;
  startDate: string | null;
} {
  // Verificar si tiene código beta
  const betaCode = localStorage.getItem('anthroscope_beta_code');
  const isBeta = betaCode ? BETA_CODES.includes(betaCode) : false;
  if (isBeta) {
    return { isActive: true, daysLeft: 999, isBeta: true, startDate: null };
  }

  // Verificar trial
  const startDate = localStorage.getItem('anthroscope_trial_start');
  if (!startDate) {
    // Primer uso — iniciar trial
    const now = new Date().toISOString();
    localStorage.setItem('anthroscope_trial_start', now);
    return { isActive: true, daysLeft: TRIAL_DAYS, isBeta: false, startDate: now };
  }

  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, TRIAL_DAYS - diffDays);

  return {
    isActive: daysLeft > 0,
    daysLeft,
    isBeta: false,
    startDate,
  };
}

export function TrialGate({ children }: { children: React.ReactNode }) {
  const [trial, setTrial] = useState(() => getTrialStatus());
  const [code, setCode] = useState('');

  const verifyCode = () => {
    const trimmed = code.trim().toUpperCase();
    if (BETA_CODES.includes(trimmed)) {
      localStorage.setItem('anthroscope_beta_code', trimmed);
      setTrial({ isActive: true, daysLeft: 999, isBeta: true, startDate: null });
      toast.success('Beta access activated!');
    } else {
      toast.error('Invalid code. Contact Gil for access.');
    }
  };

  const resetTrial = () => {
    // Para debug — Gil puede usar esto para reiniciar trials
    localStorage.removeItem('anthroscope_trial_start');
    localStorage.removeItem('anthroscope_beta_code');
    const now = new Date().toISOString();
    localStorage.setItem('anthroscope_trial_start', now);
    setTrial({ isActive: true, daysLeft: TRIAL_DAYS, isBeta: false, startDate: now });
    toast.success('Trial restarted');
  };

  if (trial.isActive) {
    return (
      <>
        {/* Trial banner */}
        {trial.daysLeft <= 14 && !trial.isBeta && (
          <div className="bg-[#c8ff00]/10 border-b border-[#c8ff00]/20 px-4 py-1.5 flex items-center justify-center gap-2 text-xs">
            <Clock className="w-3 h-3 text-[#c8ff00]" />
            <span className="text-[#c8ff00]">
              {trial.daysLeft} day{trial.daysLeft !== 1 ? 's' : ''} left in your free trial
            </span>
            <Badge className="bg-[#c8ff00]/20 text-[#c8ff00] text-[10px] cursor-pointer hover:bg-[#c8ff00]/30" onClick={() => window.open('https://buy.stripe.com', '_blank')}>
              Upgrade
            </Badge>
          </div>
        )}
        {trial.isBeta && (
          <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-1.5 flex items-center justify-center gap-2 text-xs">
            <Zap className="w-3 h-3 text-green-400" />
            <span className="text-green-400">Beta access — all features unlocked</span>
          </div>
        )}
        {children}
      </>
    );
  }

  // Trial expired screen
  return (
    <div className="min-h-screen bg-[#0d0e14] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-[#11121a] border-[#2a2d3e] text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#c8ff00]/10 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-[#c8ff00]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-2">Your trial has ended</h2>
          <p className="text-sm text-[#8a8d9e]">
            Your 14-day free trial has expired. Upgrade to continue using ANTHROSCOPE PRO.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-[#1a1c29] border-[#2a2d3e]">
            <div className="text-xl font-bold text-[#c8ff00]">$59</div>
            <div className="text-[10px] text-[#8a8d9e]">Starter/mo</div>
          </Card>
          <Card className="p-3 bg-[#c8ff00]/5 border-[#c8ff00]/20">
            <div className="text-xl font-bold text-[#c8ff00]">$99</div>
            <div className="text-[10px] text-[#8a8d9e]">Pro/mo</div>
          </Card>
        </div>

        <Button className="w-full bg-[#c8ff00] text-black font-bold hover:bg-[#d4ff33]" onClick={() => window.open('https://buy.stripe.com', '_blank')}>
          <Sparkles className="w-4 h-4 mr-2" /> Upgrade Now
        </Button>

        <div className="border-t border-[#2a2d3e] pt-4">
          <p className="text-xs text-[#8a8d9e] mb-2">Have a beta access code?</p>
          <div className="flex gap-2">
            <Input
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter code"
              className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5] text-sm"
              onKeyDown={e => e.key === 'Enter' && verifyCode()}
            />
            <Button variant="outline" className="border-[#2a2d3e] text-[#f0f0f5]" onClick={verifyCode}>
              <Shield className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hidden reset for Gil */}
        <button onClick={resetTrial} className="text-[10px] text-[#333] hover:text-[#555] transition-colors">
          Reset trial (admin only)
        </button>
      </Card>
    </div>
  );
}
