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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-emerald-600" />
            {t('sujeto.datos')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">{t('sujeto.nombre')}</Label>
            <Input id="nombre" value={sujeto.nombre} onChange={(e) => update('nombre', e.target.value)} placeholder="Ej. Carlos Mendoza" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('sujeto.fechaNacimiento')}
              </Label>
              <Input id="fechaNacimiento" type="date" value={sujeto.fechaNacimiento} onChange={(e) => update('fechaNacimiento', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaEvaluacion" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('sujeto.fechaEvaluacion')}
              </Label>
              <Input id="fechaEvaluacion" type="date" value={sujeto.fechaEvaluacion} onChange={(e) => update('fechaEvaluacion', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('sujeto.sexo')}</Label>
            <div className="flex gap-4">
              <button type="button" onClick={() => update('sexo', 'masculino')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${sujeto.sexo === 'masculino' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                <Mars className="w-5 h-5" /> {t('sujeto.masculino')}
              </button>
              <button type="button" onClick={() => update('sexo', 'femenino')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${sujeto.sexo === 'femenino' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-slate-200 hover:border-slate-300'}`}>
                <Venus className="w-5 h-5" /> {t('sujeto.femenino')}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-emerald-600" />
            {t('sujeto.contextoDeportivo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deporte">{t('sujeto.deporte')}</Label>
            <Input id="deporte" value={sujeto.deporte || ''} onChange={(e) => update('deporte', e.target.value)} placeholder="Ej. Halterofilia, Natación..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nivelActividad">{t('sujeto.nivelActividad')}</Label>
            <Select value={sujeto.nivelActividad || ''} onValueChange={(v) => update('nivelActividad', v)}>
              <SelectTrigger><SelectValue placeholder={t('common.sinDatos')} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentario">{t('sujeto.sedentario')}</SelectItem>
                <SelectItem value="moderado">{t('sujeto.moderado')}</SelectItem>
                <SelectItem value="activo">{t('sujeto.activo')}</SelectItem>
                <SelectItem value="atleta">{t('sujeto.atleta')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notas" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> {t('sujeto.notas')}
            </Label>
            <Textarea id="notas" value={sujeto.notas || ''} onChange={(e) => update('notas', e.target.value)} placeholder="Observaciones..." rows={3} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
