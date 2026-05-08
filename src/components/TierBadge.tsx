import { Badge } from '@/components/ui/badge';
import { Crown, Users, Building2, Zap } from 'lucide-react';

interface Props {
  tier?: string;
  role?: string;
}

export function TierBadge({ tier = 'free', role = 'user' }: Props) {
  const configs: Record<string, { label: string; color: string; icon: any; desc: string }> = {
    free: { label: 'FREE', color: 'bg-[#55576b]/20 text-[#8a8d9e] border-[#55576b]/30', icon: Zap, desc: 'Modo localStorage' },
    pro: { label: 'PRO', color: 'bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30', icon: Crown, desc: '$49/mes — 1 evaluador, ilimitado' },
    team: { label: 'TEAM', color: 'bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30', icon: Users, desc: '$149/mes — 5 evaluadores, white-label' },
    enterprise: { label: 'ENTERPRISE', color: 'bg-[#a78bfa]/20 text-[#a78bfa] border-[#a78bfa]/30', icon: Building2, desc: '$499/mes — API, SSO, ilimitado' },
  };

  const cfg = configs[tier] || configs.free;
  const Icon = cfg.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${cfg.color} text-xs font-bold px-2 py-0.5 flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {cfg.label}
      </Badge>
      {role !== 'user' && (
        <Badge className="bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30 text-xs">
          {role === 'admin' ? 'ADMIN' : 'EVALUADOR'}
        </Badge>
      )}
    </div>
  );
}
