import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Palette, Building2, CheckCircle, Lock } from 'lucide-react';

export function WhiteLabelPanel() {
  const [config, setConfig] = useState({
    nombreOrg: 'Mi Institución',
    colorPrimario: '#D4FF00',
    colorAccent: '#6366f1',
    logoUrl: '',
  });
  const [guardado, setGuardado] = useState(false);

  const guardar = () => {
    localStorage.setItem('anthroscope_white_label', JSON.stringify(config));
    setGuardado(true);
    toast.success('Configuración white-label guardada (simulado)');
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <Card className="bg-[#11121a] border-[#1e1f2e]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#f0f0f5]">
          <Building2 className="w-5 h-5 text-[#a78bfa]" />
          White-Label
          <Badge className="bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20 text-xs">TEAM+</Badge>
        </CardTitle>
        <p className="text-xs text-[#8a8d9e]">
          Personaliza ANTHROSCOPE con los colores y logo de tu institución.
          Disponible en tier TEAM ($149/mes) o superior.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-[#8a8d9e]">Nombre de la institución</Label>
          <Input
            value={config.nombreOrg}
            onChange={e => setConfig({ ...config, nombreOrg: e.target.value })}
            className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-[#8a8d9e] flex items-center gap-1">
              <Palette className="w-3 h-3" /> Color Primario
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.colorPrimario}
                onChange={e => setConfig({ ...config, colorPrimario: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-xs text-[#f0f0f5] font-mono">{config.colorPrimario}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[#8a8d9e] flex items-center gap-1">
              <Palette className="w-3 h-3" /> Color Acento
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.colorAccent}
                onChange={e => setConfig({ ...config, colorAccent: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-xs text-[#f0f0f5] font-mono">{config.colorAccent}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-[#8a8d9e]">URL del logo (opcional)</Label>
          <Input
            value={config.logoUrl}
            onChange={e => setConfig({ ...config, logoUrl: e.target.value })}
            placeholder="https://tudominio.com/logo.png"
            className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]"
          />
        </div>

        {/* Preview */}
        <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e] space-y-2">
          <p className="text-[10px] text-[#55576b] uppercase">Preview del reporte</p>
          <div className="flex items-center gap-2">
            {config.logoUrl && <img src={config.logoUrl} alt="logo" className="w-6 h-6 object-contain" onError={() => {}} />}
            <span className="text-sm font-bold" style={{ color: config.colorPrimario }}>
              {config.nombreOrg}
            </span>
          </div>
          <div className="h-1 rounded-full w-24" style={{ background: config.colorAccent }} />
        </div>

        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-[#55576b]" />
          <span className="text-[10px] text-[#55576b]">
            En producción: se aplica a todos los reportes PDF, emails y la interfaz.
          </span>
        </div>

        <Button
          onClick={guardar}
          className="bg-[#a78bfa] hover:bg-[#8b5cf6] text-white w-full"
        >
          {guardado ? <CheckCircle className="w-4 h-4 mr-2" /> : <Palette className="w-4 h-4 mr-2" />}
          {guardado ? 'Guardado' : 'Guardar configuración'}
        </Button>
      </CardContent>
    </Card>
  );
}
