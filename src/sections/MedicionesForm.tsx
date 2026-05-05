import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Ruler, Target, Circle, MoveDiagonal, ArrowRight, Info,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PerfilRestringido, PerfilCompleto } from '@/types/isak';

interface MedicionesFormProps {
  perfilR: PerfilRestringido;
  perfilC: PerfilCompleto;
  nivel: number;
  onChangeR: (p: PerfilRestringido) => void;
  onChangeC: (p: PerfilCompleto) => void;
}

export function MedicionesForm({ perfilR, perfilC, nivel, onChangeR, onChangeC }: MedicionesFormProps) {
  const { t } = useTranslation();
  const esCompleto = nivel >= 2;

  const updateR = <K extends keyof PerfilRestringido>(key: K, value: number) => {
    onChangeR({ ...perfilR, [key]: value });
  };
  const updateC = <K extends keyof PerfilCompleto>(key: K, value: number) => {
    onChangeC({ ...perfilC, [key]: value });
  };
  const updateBoth = <K extends keyof PerfilRestringido & keyof PerfilCompleto>(key: K, value: number) => {
    updateR(key, value);
    updateC(key, value);
  };

  const inputClass = "h-10 text-right font-mono text-sm";
  const labelClass = "text-xs font-medium text-slate-600 flex items-center gap-1";

  return (
    <div className="space-y-6">
      {/* BÁSICAS */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Ruler className="w-5 h-5 text-emerald-600" />
            {t('mediciones.basicas')}
            <Badge variant="secondary" className="ml-2">{t('mediciones.obligatorias')}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label className={labelClass}><ArrowRight className="w-3 h-3" /> {t('mediciones.masaCorporal')} ({t('common.kg')})</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilR.masaCorporal || ''} onChange={(e) => updateBoth('masaCorporal', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1">
              <Label className={labelClass}><ArrowRight className="w-3 h-3" /> {t('mediciones.estatura')} ({t('common.cm')})</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilR.estatura || ''} onChange={(e) => updateBoth('estatura', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1">
              <Label className={labelClass}><ArrowRight className="w-3 h-3" /> {t('mediciones.tallaSentada')} ({t('common.cm')})</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilC.tallaSentada || ''} onChange={(e) => updateC('tallaSentada', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1">
              <Label className={labelClass}><ArrowRight className="w-3 h-3" /> {t('mediciones.envergadura')} ({t('common.cm')})</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilC.envergadura || ''} onChange={(e) => updateC('envergadura', parseFloat(e.target.value) || 0)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PLIEGUES */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="w-5 h-5 text-amber-600" />
            {t('mediciones.pliegues')}
            <span className="text-xs text-slate-400 font-normal">({t('common.mm')})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'triceps' as const, label: t('mediciones.triceps') },
              { key: 'subescapular' as const, label: t('mediciones.subescapular') },
              { key: 'biceps' as const, label: t('mediciones.biceps') },
              { key: 'crestaIliaca' as const, label: t('mediciones.crestaIliaca') },
              { key: 'supraespinal' as const, label: t('mediciones.supraespinal') },
              { key: 'abdominal' as const, label: t('mediciones.abdominal') },
              { key: 'musloAnterior' as const, label: t('mediciones.musloAnterior') },
              { key: 'piernaMedial' as const, label: t('mediciones.piernaMedial') },
            ].map((p) => (
              <div key={p.key} className="space-y-1">
                <Label className={labelClass}><Info className="w-3 h-3 text-slate-400" />{p.label}</Label>
                <Input type="number" step="0.1" className={inputClass} value={(perfilR[p.key] as number) || ''} onChange={(e) => updateBoth(p.key, parseFloat(e.target.value) || 0)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PERÍMETROS */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Circle className="w-5 h-5 text-blue-600" />
            {t('mediciones.perimetros')}
            <span className="text-xs text-slate-400 font-normal">({t('common.cm')})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'brazoRelajado' as const, label: 'Brazo Relajado' },
              { key: 'brazoFlexionado' as const, label: 'Brazo Flexionado' },
              { key: 'antebrazoMaximo' as const, label: 'Antebrazo Máx.' },
              { key: 'toraxMesoesternal' as const, label: 'Tórax Meso.' },
              { key: 'cinturaMinima' as const, label: 'Cintura Mín.' },
              { key: 'gluteoMaximo' as const, label: 'Glúteo Máx.' },
              { key: 'musloMedio' as const, label: t('mediciones.musloMedio') },
              { key: 'pantorrillaMaxima' as const, label: 'Pantorrilla Máx.' },
            ].map((p) => (
              <div key={p.key} className="space-y-1">
                <Label className={labelClass}>{p.label}</Label>
                <Input type="number" step="0.1" className={inputClass} value={(perfilR[p.key] as number) || ''} onChange={(e) => updateBoth(p.key, parseFloat(e.target.value) || 0)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* DIÁMETROS */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MoveDiagonal className="w-5 h-5 text-purple-600" />
            {t('mediciones.diametros')}
            <span className="text-xs text-slate-400 font-normal">({t('common.cm')})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label className={labelClass}>Biacromial</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilR.biacromial || ''} onChange={(e) => updateBoth('biacromial', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1">
              <Label className={labelClass}>Biiliocrestal <span className="text-[10px] text-slate-400">(N2)</span></Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilC.biiliocrestal || ''} onChange={(e) => updateC('biiliocrestal', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1">
              <Label className={labelClass}>Húmero Biepic.</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilR.humeroBiepicondilar || ''} onChange={(e) => updateBoth('humeroBiepicondilar', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1">
              <Label className={labelClass}>Fémur Bicond.</Label>
              <Input type="number" step="0.1" className={inputClass} value={perfilR.femurBicondilar || ''} onChange={(e) => updateBoth('femurBicondilar', parseFloat(e.target.value) || 0)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LONGITUDES - SOLO PERFIL COMPLETO */}
      {esCompleto && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ArrowRight className="w-5 h-5 text-rose-600" />
              {t('mediciones.longitudes')}
              <Badge variant="secondary" className="ml-2">{t('app.perfilCompleto')}</Badge>
              <span className="text-xs text-slate-400 font-normal">({t('common.cm')})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'acromialeRadiale', label: 'Acromiale-Radiale' },
                { key: 'radialeStylion', label: 'Radiale-Stylion' },
                { key: 'midStylionDactylion', label: 'Mid-Stylion-Dactylion' },
                { key: 'alturaIliospinale', label: 'Altura Iliospinale' },
                { key: 'alturaTrochanterion', label: 'Altura Trochanterion' },
                { key: 'longitudTrochanterionTibialeLaterale', label: 'Troch.-Tibiale Lat.' },
                { key: 'alturaTibialeLaterale', label: 'Altura Tibiale Lat.' },
                { key: 'longitudTibialeMedialeSphyrion', label: 'Tib. Med.-Sphyrion' },
                { key: 'longitudPie', label: 'Longitud del Pie' },
              ].map((p) => (
                <div key={p.key} className="space-y-1">
                  <Label className={labelClass}>{p.label}</Label>
                  <Input type="number" step="0.1" className={inputClass} value={(perfilC[p.key as keyof PerfilCompleto] as number) || ''} onChange={(e) => updateC(p.key as keyof PerfilCompleto, parseFloat(e.target.value) || 0)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
