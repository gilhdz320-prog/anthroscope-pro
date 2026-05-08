import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Ruler, Layers, CircleDot, ArrowLeftRight, MoveVertical, Activity,
  ChevronDown, ChevronUp, Keyboard, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PerfilRestringido, PerfilCompleto, MedicionesAvanzadas } from '@/types/isak';

interface Props {
  perfilR: PerfilRestringido;
  perfilC: PerfilCompleto;
  nivel: number;
  onChangeR: (p: PerfilRestringido) => void;
  onChangeC: (p: PerfilCompleto) => void;
  avanzado?: MedicionesAvanzadas;
  onChangeAvanzado?: (m: MedicionesAvanzadas) => void;
}

const labelClass = "text-xs font-medium text-[#8a8d9e] flex items-center gap-1";

// ===== RANGOS ISAK ESPERADOS PARA VALIDACIÓN SEMAFORO =====
// min, max en unidades del campo
const RANGOS: Record<string, [number, number]> = {
  masaCorporal: [25, 250], estatura: [100, 250], tallaSentada: [50, 120],
  triceps: [2, 50], subescapular: [2, 55], biceps: [1.5, 25],
  crestaIliaca: [2, 60], supraespinal: [2, 50], abdominal: [2, 80],
  musloAnterior: [3, 55], piernaMedial: [2, 45],
  brazoRelajado: [15, 50], brazoFlexionado: [16, 55],
  cinturaMinima: [40, 150], gluteoMaximo: [50, 160], pantorrillaMaxima: [18, 50],
  biacromial: [25, 50], humeroBiepicondilar: [4, 10], femurBicondilar: [5, 12],
  toraxMesoesternal: [55, 140], musloMedio: [30, 80], antebrazoMaximo: [15, 35],
  mano: [5, 12], pie: [15, 35], cabeza: [45, 65], cuello: [25, 55],
  pectoral: [2, 40], axilar: [2, 35], pantorrilla: [2, 45],
  biIliocrestal: [20, 40], bitrocanterico: [20, 45],
  longitudBrazo: [15, 45], longitudAntebrazo: [10, 35],
  longitudMuslo: [25, 55], longitudPierna: [20, 50],
  longitudTronco: [30, 70], envergadura: [130, 230],
};

function getBorderClass(field: string, value: number): string {
  const [min, max] = RANGOS[field] || [0, 9999];
  if (!value || value === 0) return 'border-[#1e1f2e]'; // gris = vacío
  if (value < min * 0.5 || value > max * 1.5) return 'border-[#ef4444] focus-visible:ring-[#ef4444] bg-[#ef4444]/5'; // rojo = imposible
  if (value < min || value > max) return 'border-[#f59e0b] focus-visible:ring-[#f59e0b] bg-[#f59e0b]/5'; // amarillo = outlier
  return 'border-[#22c55e] focus-visible:ring-[#22c55e] bg-[#22c55e]/5'; // verde = OK
}

function getValidationIcon(field: string, value: number) {
  const [min, max] = RANGOS[field] || [0, 9999];
  if (!value || value === 0) return null;
  if (value < min * 0.5 || value > max * 1.5) return <AlertTriangle className="w-3 h-3 text-[#ef4444] shrink-0" />;
  if (value < min || value > max) return <AlertTriangle className="w-3 h-3 text-[#f59e0b] shrink-0" />;
  return <CheckCircle2 className="w-3 h-3 text-[#22c55e] shrink-0" />;
}

// ===== COMPONENTE NUMBERINPUT CON NAVEGACIÓN Y VALIDACIÓN =====
interface NIProps {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  suffix?: string;
  fieldKey: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onEnter?: () => void;
  modoCampo?: boolean;
}

function NumberInput({ value, onChange, placeholder = '0.0', suffix = '', fieldKey, inputRef, onEnter, modoCampo }: NIProps) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (modoCampo) e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  const borderClass = getBorderClass(fieldKey, value);
  const icon = getValidationIcon(fieldKey, value);

  return (
    <div className="flex items-center gap-1">
      <Input
        ref={inputRef}
        type="number"
        step="0.1"
        value={value || ''}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        placeholder={placeholder}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className={`h-9 text-right font-mono text-sm bg-[#0a0b0f] text-[#f0f0f5] focus-visible:ring-1 transition-colors ${borderClass}`}
      />
      {icon}
      {suffix && <span className="text-xs text-[#55576b] w-8">{suffix}</span>}
    </div>
  );
}

function SectionCard({ title, icon: Icon, color, children, defaultOpen = true }: { title: string; icon: any; color: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="bg-[#11121a] border-[#1e1f2e] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#1e1f2e]/30 transition-colors"
      >
        <CardTitle className={`flex items-center gap-2 text-sm ${color}`}>
          <Icon className="w-4 h-4" />
          {title}
        </CardTitle>
        {open ? <ChevronUp className="w-4 h-4 text-[#55576b]" /> : <ChevronDown className="w-4 h-4 text-[#55576b]" />}
      </button>
      {open && <CardContent className="pt-0 pb-4">{children}</CardContent>}
    </Card>
  );
}

// Mediciones avanzadas por defecto
const defaultAvanzado: MedicionesAvanzadas = {
  pectoral: 0, axilar: 0, pantorrilla: 0,
  biIliocrestal: 0, bitrocanterico: 0,
  longitudBrazo: 0, longitudAntebrazo: 0, longitudMuslo: 0, longitudPierna: 0, longitudTronco: 0,
  envergadura: 0,
};

export function MedicionesForm({ perfilR, perfilC, nivel, onChangeR, onChangeC, avanzado, onChangeAvanzado }: Props) {
  const { t } = useTranslation();
  const [modoCampo, setModoCampo] = useState(false);
  const medAvanzado = avanzado || defaultAvanzado;

  // Refs para navegación Enter-to-next
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const setRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  }, []);
  const focusNext = useCallback((currentIndex: number) => {
    const next = inputRefs.current[currentIndex + 1];
    if (next) { next.focus(); if (modoCampo) next.select(); }
  }, [modoCampo]);

  let globalInputIndex = 0;
  const getNextRef = () => globalInputIndex++;

  const setMedAvanzado = (updates: Partial<MedicionesAvanzadas>) => {
    if (onChangeAvanzado) onChangeAvanzado({ ...medAvanzado, ...updates });
  };

  const updateR = <K extends keyof PerfilRestringido>(key: K, value: number) => {
    onChangeR({ ...perfilR, [key]: value });
  };

  const updateC = <K extends keyof PerfilCompleto>(key: K, value: number) => {
    onChangeC({ ...perfilC, [key]: value });
  };

  // Suma de pliegues en vivo
  const sumaPliegues = perfilR.triceps + perfilR.subescapular + perfilR.biceps + perfilR.crestaIliaca + perfilR.supraespinal + perfilR.abdominal + perfilR.musloAnterior + perfilR.piernaMedial;

  // Contar errores de validación
  const allFields = [
    ...Object.entries(perfilR).filter(([k]) => k !== 'tallaSentada' || (perfilR.tallaSentada && perfilR.tallaSentada > 0)),
    ...(nivel >= 2 ? Object.entries(perfilC).filter(([k]) => !Object.keys(perfilR).includes(k)) : []),
    ...(nivel >= 3 ? Object.entries(medAvanzado).filter(([,v]) => (v as number) > 0) : []),
  ];
  const erroresRojo = allFields.filter(([k, v]) => {
    const [min, max] = RANGOS[k] || [0, 9999];
    return v && (v < min * 0.5 || v > max * 1.5);
  }).length;
  const outliers = allFields.filter(([k, v]) => {
    const [min, max] = RANGOS[k] || [0, 9999];
    return v && (v < min || v > max) && v >= min * 0.5 && v <= max * 1.5;
  }).length;

  return (
    <div className="space-y-4">
      {/* Barra superior: Modo Campo + Suma pliegues */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-[#D4FF00]" />
          <span className="text-xs text-[#8a8d9e]">Modo Campo</span>
          <Switch checked={modoCampo} onCheckedChange={setModoCampo} className="data-[state=checked]:bg-[#D4FF00]" />
          {modoCampo && <span className="text-[10px] text-[#D4FF00]">Auto-select + Enter→next</span>}
        </div>
        <div className="flex items-center gap-2">
          {erroresRojo > 0 && (
            <Badge className="bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20 text-xs">
              {erroresRojo} error{erroresRojo > 1 ? 'es' : ''}
            </Badge>
          )}
          {outliers > 0 && (
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20 text-xs">
              {outliers} outlier{outliers > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#D4FF00]/5 border border-[#D4FF00]/20 rounded-lg">
          <span className="text-xs text-[#8a8d9e]">∑ 8 pliegues:</span>
          <span className="text-sm font-bold text-[#D4FF00] font-mono">{sumaPliegues.toFixed(1)} mm</span>
        </div>
      </div>

      {/* === NIVEL 1: BÁSICAS === */}
      <SectionCard title="1. Medidas Básicas (Nivel 1)" icon={Ruler} color="text-[#D4FF00]" defaultOpen={true}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'masaCorporal', label: 'Peso', suffix: 'kg', icon: Ruler },
            { key: 'estatura', label: 'Estatura', suffix: 'cm', icon: Ruler },
            { key: 'tallaSentada', label: 'Talla Sentada', suffix: 'cm', icon: Ruler },
          ].map(p => {
            const idx = getNextRef();
            return (
              <div key={p.key} className="space-y-1">
                <Label className={labelClass}><p.icon className="w-3 h-3" /> {p.label}</Label>
                <NumberInput
                  fieldKey={p.key}
                  inputRef={setRef(idx)}
                  onEnter={() => focusNext(idx)}
                  modoCampo={modoCampo}
                  value={(perfilR as any)[p.key] || 0}
                  onChange={v => { updateR(p.key as any, v); updateC(p.key as any, v); }}
                  suffix={p.suffix}
                />
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* === NIVEL 1: PLIEGUES (8) === */}
      <SectionCard title="2. Pliegues Cutáneos — 8 ISAK (mm)" icon={Layers} color="text-[#f59e0b]" defaultOpen={true}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'triceps', label: 'Tríceps', desc: 'Posterior brazo' },
            { key: 'subescapular', label: 'Subescapular', desc: 'Inferior escápula' },
            { key: 'biceps', label: 'Bíceps', desc: 'Anterior brazo' },
            { key: 'crestaIliaca', label: 'Cresta Ilíaca', desc: 'Suprailiaco' },
            { key: 'supraespinal', label: 'Supraespinal', desc: 'Supraespinal' },
            { key: 'abdominal', label: 'Abdominal', desc: '2cm derecha ombligo' },
            { key: 'musloAnterior', label: 'Muslo Ant.', desc: 'Anterior muslo' },
            { key: 'piernaMedial', label: 'Pierna Medial', desc: 'Medial pantorrilla' },
          ].map(p => {
            const idx = getNextRef();
            return (
              <div key={p.key} className="space-y-1">
                <Label className={labelClass}><Layers className="w-3 h-3" /> {p.label}</Label>
                <NumberInput
                  fieldKey={p.key}
                  inputRef={setRef(idx)}
                  onEnter={() => focusNext(idx)}
                  modoCampo={modoCampo}
                  value={(perfilR as any)[p.key] || 0}
                  onChange={v => { updateR(p.key as any, v); updateC(p.key as any, v); }}
                  suffix="mm"
                />
                <p className="text-[10px] text-[#55576b]">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* === NIVEL 1: PERÍMETROS (5) === */}
      <SectionCard title="3. Perímetros — 5 ISAK (cm)" icon={CircleDot} color="text-[#6366f1]" defaultOpen={true}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { key: 'brazoRelajado', label: 'Brazo Relajado' },
            { key: 'brazoFlexionado', label: 'Brazo Flexionado' },
            { key: 'cinturaMinima', label: 'Cintura Mínima' },
            { key: 'gluteoMaximo', label: 'Glúteo Máximo' },
            { key: 'pantorrillaMaxima', label: 'Pantorrilla Máx.' },
          ].map(p => {
            const idx = getNextRef();
            return (
              <div key={p.key} className="space-y-1">
                <Label className={labelClass}><CircleDot className="w-3 h-3" /> {p.label}</Label>
                <NumberInput
                  fieldKey={p.key}
                  inputRef={setRef(idx)}
                  onEnter={() => focusNext(idx)}
                  modoCampo={modoCampo}
                  value={(perfilR as any)[p.key] || 0}
                  onChange={v => { updateR(p.key as any, v); updateC(p.key as any, v); }}
                  suffix="cm"
                />
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* === NIVEL 2: DIÁMETROS (3) === */}
      {nivel >= 2 && (
        <SectionCard title="4. Diámetros Óseos — 3 ISAK (cm)" icon={ArrowLeftRight} color="text-[#a78bfa]" defaultOpen={true}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: 'biacromial', label: 'Biacromial', desc: 'Entre acromiones' },
              { key: 'humeroBiepicondilar', label: 'Húmero Biepicondilar', desc: 'Epicondilos húmero' },
              { key: 'femurBicondilar', label: 'Fémur Bicondilar', desc: 'Cóndilos fémur' },
            ].map(p => {
              const idx = getNextRef();
              return (
                <div key={p.key} className="space-y-1">
                  <Label className={labelClass}><ArrowLeftRight className="w-3 h-3" /> {p.label}</Label>
                  <NumberInput
                    fieldKey={p.key}
                    inputRef={setRef(idx)}
                    onEnter={() => focusNext(idx)}
                    modoCampo={modoCampo}
                    value={(perfilC as any)[p.key] || 0}
                    onChange={v => updateC(p.key as any, v)}
                    suffix="cm"
                  />
                  <p className="text-[10px] text-[#55576b]">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* === NIVEL 2: PERÍMETROS ADICIONALES (3) === */}
      {nivel >= 2 && (
        <SectionCard title="5. Perímetros Adicionales — 3 ISAK (cm)" icon={CircleDot} color="text-[#22c55e]" defaultOpen={false}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: 'toraxMesoesternal', label: 'Tórax Mesoesternal' },
              { key: 'musloMedio', label: 'Muslo Medio' },
              { key: 'antebrazoMaximo', label: 'Antebrazo Máximo' },
            ].map(p => {
              const idx = getNextRef();
              return (
                <div key={p.key} className="space-y-1">
                  <Label className={labelClass}><CircleDot className="w-3 h-3" /> {p.label}</Label>
                  <NumberInput
                    fieldKey={p.key}
                    inputRef={setRef(idx)}
                    onEnter={() => focusNext(idx)}
                    modoCampo={modoCampo}
                    value={(perfilC as any)[p.key] || 0}
                    onChange={v => updateC(p.key as any, v)}
                    suffix="cm"
                  />
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* === NIVEL 2: LONGITUDES (2) === */}
      {nivel >= 2 && (
        <SectionCard title="6. Longitudes — 2 ISAK (cm)" icon={MoveVertical} color="text-[#06b6d4]" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'mano', label: 'Mano' },
              { key: 'pie', label: 'Pie' },
            ].map(p => {
              const idx = getNextRef();
              return (
                <div key={p.key} className="space-y-1">
                  <Label className={labelClass}><MoveVertical className="w-3 h-3" /> {p.label}</Label>
                  <NumberInput
                    fieldKey={p.key}
                    inputRef={setRef(idx)}
                    onEnter={() => focusNext(idx)}
                    modoCampo={modoCampo}
                    value={(perfilC as any)[p.key] || 0}
                    onChange={v => updateC(p.key as any, v)}
                    suffix="cm"
                  />
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* === NIVEL 2: CIRCUNFERENCIAS ADICIONALES (2) === */}
      {nivel >= 2 && (
        <SectionCard title="7. Circunferencias Adicionales — 2 ISAK (cm)" icon={CircleDot} color="text-[#f472b6]" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'cabeza', label: 'Cabeza' },
              { key: 'cuello', label: 'Cuello' },
            ].map(p => {
              const idx = getNextRef();
              return (
                <div key={p.key} className="space-y-1">
                  <Label className={labelClass}><CircleDot className="w-3 h-3" /> {p.label}</Label>
                  <NumberInput
                    fieldKey={p.key}
                    inputRef={setRef(idx)}
                    onEnter={() => focusNext(idx)}
                    modoCampo={modoCampo}
                    value={(perfilC as any)[p.key] || 0}
                    onChange={v => updateC(p.key as any, v)}
                    suffix="cm"
                  />
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* === NIVEL 3-4: MEDICIONES AVANZADAS (13) === */}
      {nivel >= 3 && (
        <SectionCard title="8. Mediciones Avanzadas Nivel 3-4 (13)" icon={Activity} color="text-[#ec4899]" defaultOpen={false}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'pectoral', label: 'Pectoral', desc: 'Pliegue pectoral', icon: Layers },
              { key: 'axilar', label: 'Axilar', desc: 'Pliegue axilar', icon: Layers },
              { key: 'pantorrilla', label: 'Pantorrilla', desc: 'Pliegue pantorrilla lateral', icon: Layers },
              { key: 'biIliocrestal', label: 'Bi-iliocrestal', desc: 'Diámetro bi-iliocrestal', icon: ArrowLeftRight },
              { key: 'bitrocanterico', label: 'Bitrocanterico', desc: 'Diámetro bitrocanterico', icon: ArrowLeftRight },
              { key: 'longitudBrazo', label: 'Long. Brazo', desc: 'Acromion-radial', icon: Ruler },
              { key: 'longitudAntebrazo', label: 'Long. Antebrazo', desc: 'Radial-estiloide', icon: Ruler },
              { key: 'longitudMuslo', label: 'Long. Muslo', desc: 'Trocant-tibial lateral', icon: Ruler },
              { key: 'longitudPierna', label: 'Long. Pierna', desc: 'Tibial lateral-maléolo', icon: Ruler },
              { key: 'longitudTronco', label: 'Long. Tronco', desc: 'Silla-acromion', icon: Ruler },
              { key: 'envergadura', label: 'Envergadura', desc: 'Alcance máximo', icon: Ruler },
            ].map(p => {
              const idx = getNextRef();
              return (
                <div key={p.key} className="space-y-1">
                  <Label className={labelClass}><p.icon className="w-3 h-3" /> {p.label}</Label>
                  <NumberInput
                    fieldKey={p.key}
                    inputRef={setRef(idx)}
                    onEnter={() => focusNext(idx)}
                    modoCampo={modoCampo}
                    value={(medAvanzado as any)[p.key] || 0}
                    onChange={v => setMedAvanzado({ [p.key]: v })}
                    suffix={p.icon === Layers ? 'mm' : 'cm'}
                  />
                  <p className="text-[10px] text-[#55576b]">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* === PROGRESO === */}
      {(() => {
        const camposNivel1 = [
          perfilR.masaCorporal, perfilR.estatura, perfilR.tallaSentada,
          perfilR.triceps, perfilR.subescapular, perfilR.biceps, perfilR.crestaIliaca,
          perfilR.supraespinal, perfilR.abdominal, perfilR.musloAnterior, perfilR.piernaMedial,
          perfilR.brazoRelajado, perfilR.brazoFlexionado, perfilR.cinturaMinima,
          perfilR.gluteoMaximo, perfilR.pantorrillaMaxima,
        ];
        const camposNivel2 = nivel >= 2 ? [
          perfilC.biacromial, perfilC.humeroBiepicondilar, perfilC.femurBicondilar,
          perfilC.toraxMesoesternal, perfilC.musloMedio, perfilC.antebrazoMaximo,
          perfilC.mano, perfilC.pie, perfilC.cabeza, perfilC.cuello,
        ] : [];
        const camposNivel3 = nivel >= 3 ? [
          medAvanzado.pectoral, medAvanzado.axilar, medAvanzado.pantorrilla,
          medAvanzado.biIliocrestal, medAvanzado.bitrocanterico,
          medAvanzado.longitudBrazo, medAvanzado.longitudAntebrazo,
          medAvanzado.longitudMuslo, medAvanzado.longitudPierna,
          medAvanzado.longitudTronco, medAvanzado.envergadura,
        ] : [];
        const c1 = camposNivel1.filter(v => v > 0).length;
        const c2 = camposNivel2.filter(v => v > 0).length;
        const c3 = camposNivel3.filter(v => v > 0).length;
        const t1 = camposNivel1.length, t2 = camposNivel2.length, t3 = camposNivel3.length;
        const total = t1 + t2 + t3, completadas = c1 + c2 + c3;
        const pct = total > 0 ? Math.round((completadas / total) * 100) : 0;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-[#D4FF00]" />
                <span className="text-xs text-[#8a8d9e]">Progreso:</span>
                <div className="w-32 h-2 bg-[#1e1f2e] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#D4FF00] to-[#22c55e] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-bold text-[#D4FF00]">{pct}%</span>
                <span className="text-xs text-[#55576b]">{completadas}/{total}</span>
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20 text-xs">N1: {c1}/{t1}</Badge>
                {nivel >= 2 && <Badge className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20 text-xs">N2: {c2}/{t2}</Badge>}
                {nivel >= 3 && <Badge className="bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/20 text-xs">N3-4: {c3}/{t3}</Badge>}
              </div>
            </div>
            {pct === 100 && <p className="text-xs text-center text-[#22c55e]">✅ Todas las mediciones completadas</p>}
            {pct >= 50 && pct < 100 && <p className="text-xs text-center text-[#8a8d9e]">⏳ Avance bueno</p>}
            {pct < 50 && pct > 0 && <p className="text-xs text-center text-[#f59e0b]">⚠️ Faltan mediciones</p>}
          </div>
        );
      })()}
    </div>
  );
}
