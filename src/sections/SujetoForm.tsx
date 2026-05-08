import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Calendar, Venus, Mars, Trophy, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Sujeto } from '@/types/isak';

interface SujetoFormProps {
  sujeto: Sujeto;
  onChange: (s: Sujeto) => void;
}

export function SujetoForm({ sujeto, onChange }: SujetoFormProps) {
  const { t } = useTranslation();

  const update = (field: keyof Sujeto, value: string) => {
    onChange({ ...sujeto, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-[#f0f0f5]">
            <User className="w-5 h-5 text-[#D4FF00]" />
            {t('sujeto.datos')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-[#8a8d9e]">{t('sujeto.nombre')}</Label>
            <Input id="nombre" value={sujeto.nombre} onChange={(e) => update('nombre', e.target.value)} placeholder="Ej. Carlos Mendoza" className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] placeholder:text-[#55576b]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento" className="flex items-center gap-2 text-[#8a8d9e]">
                <Calendar className="w-4 h-4" /> {t('sujeto.fechaNacimiento')}
              </Label>
              <Input id="fechaNacimiento" type="date" value={sujeto.fechaNacimiento} onChange={(e) => update('fechaNacimiento', e.target.value)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaEvaluacion" className="flex items-center gap-2 text-[#8a8d9e]">
                <Calendar className="w-4 h-4" /> {t('sujeto.fechaEvaluacion')}
              </Label>
              <Input id="fechaEvaluacion" type="date" value={sujeto.fechaEvaluacion} onChange={(e) => update('fechaEvaluacion', e.target.value)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#8a8d9e]">{t('sujeto.sexo')}</Label>
            <div className="flex gap-4">
              <button type="button" onClick={() => update('sexo', 'masculino')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${sujeto.sexo === 'masculino' ? 'border-[#D4FF00] bg-[#D4FF00]/10 text-[#D4FF00]' : 'border-[#1e1f2e] text-[#55576b] hover:border-[#2e2f42]'}`}>
                <Mars className="w-5 h-5" /> {t('sujeto.masculino')}
              </button>
              <button type="button" onClick={() => update('sexo', 'femenino')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${sujeto.sexo === 'femenino' ? 'border-[#D4FF00] bg-[#D4FF00]/10 text-[#D4FF00]' : 'border-[#1e1f2e] text-[#55576b] hover:border-[#2e2f42]'}`}>
                <Venus className="w-5 h-5" /> {t('sujeto.femenino')}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-[#f0f0f5]">
            <Trophy className="w-5 h-5 text-[#D4FF00]" />
            {t('sujeto.contextoDeportivo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deporte" className="text-[#8a8d9e]">{t('sujeto.deporte')}</Label>
            <Input id="deporte" value={sujeto.deporte || ''} onChange={(e) => update('deporte', e.target.value)} placeholder="Ej. Halterofilia, Natación..." className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] placeholder:text-[#55576b]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nivelActividad" className="text-[#8a8d9e]">{t('sujeto.nivelActividad')}</Label>
            <Select value={sujeto.nivelActividad || ''} onValueChange={(v) => update('nivelActividad', v)}>
              <SelectTrigger className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]"><SelectValue placeholder={t('common.sinDatos')} /></SelectTrigger>
              <SelectContent className="bg-[#11121a] border-[#1e1f2e]">
                <SelectItem value="sedentario">{t('sujeto.sedentario')}</SelectItem>
                <SelectItem value="moderado">{t('sujeto.moderado')}</SelectItem>
                <SelectItem value="activo">{t('sujeto.activo')}</SelectItem>
                <SelectItem value="atleta">{t('sujeto.atleta')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notas" className="flex items-center gap-2 text-[#8a8d9e]">
              <ClipboardList className="w-4 h-4" /> {t('sujeto.notas')}
            </Label>
            <Textarea id="notas" value={sujeto.notas || ''} onChange={(e) => update('notas', e.target.value)} placeholder="Observaciones..." rows={3} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] placeholder:text-[#55576b]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
