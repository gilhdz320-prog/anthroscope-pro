import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ShieldCheck, AlertTriangle, CheckCircle, Users, User,
  Calculator, ArrowRightLeft
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ETMResultado } from '@/types/isak';
import { calcularETMIndividual } from '@/lib/calculations';

interface MedicionDual {
  nombre: string;
  key: string;
  esPliegue: boolean;
  unidad: string;
  tecnicoA: number;
  tecnicoB: number;
}

const MEDICIONES_DUAL_DEFAULT: MedicionDual[] = [
  { nombre: 'Tríceps', key: 'triceps', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Subescapular', key: 'subescapular', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Bíceps', key: 'biceps', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Cresta Ilíaca', key: 'crestaIliaca', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Supraespinal', key: 'supraespinal', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Abdominal', key: 'abdominal', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Muslo Ant.', key: 'musloAnterior', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Pierna Medial', key: 'piernaMedial', esPliegue: true, unidad: 'mm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Brazo Relajado', key: 'brazoRelajado', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Brazo Flexionado', key: 'brazoFlexionado', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Cintura Mín.', key: 'cinturaMinima', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Glúteo Máx.', key: 'gluteoMaximo', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Pantorrilla Máx.', key: 'pantorrillaMaxima', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Húmero Biep.', key: 'humeroBiepicondilar', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
  { nombre: 'Fémur Bicond.', key: 'femurBicondilar', esPliegue: false, unidad: 'cm', tecnicoA: 0, tecnicoB: 0 },
];

interface ETMMedicion {
  nombre: string;
  key: string;
  esPliegue: boolean;
  valores: number[];
}

export function ETMPanel() {
  const { t } = useTranslation();
  const [modoDual, setModoDual] = useState(false);

  // ===== MODO INDIVIDUAL (original) =====
  const [mediciones, setMediciones] = useState<ETMMedicion[]>([
    { nombre: t('mediciones.triceps'), key: 'triceps', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.subescapular'), key: 'subescapular', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.biceps'), key: 'biceps', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.crestaIliaca'), key: 'crestaIliaca', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.supraespinal'), key: 'supraespinal', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.abdominal'), key: 'abdominal', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.musloAnterior'), key: 'musloAnterior', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.piernaMedial'), key: 'piernaMedial', esPliegue: true, valores: [0, 0] },
    { nombre: 'Brazo Relajado', key: 'brazoRelajado', esPliegue: false, valores: [0, 0] },
    { nombre: 'Brazo Flexionado', key: 'brazoFlexionado', esPliegue: false, valores: [0, 0] },
    { nombre: t('mediciones.musloMedio'), key: 'musloMedio', esPliegue: false, valores: [0, 0] },
    { nombre: 'Pantorrilla', key: 'pantorrillaMaxima', esPliegue: false, valores: [0, 0] },
    { nombre: 'Húmero', key: 'humeroBiepicondilar', esPliegue: false, valores: [0, 0] },
    { nombre: 'Fémur', key: 'femurBicondilar', esPliegue: false, valores: [0, 0] },
  ]);
  const [resultados, setResultados] = useState<ETMResultado[]>([]);
  const [calculado, setCalculado] = useState(false);

  // ===== MODO DUAL (nuevo) =====
  const [dual, setDual] = useState<MedicionDual[]>(MEDICIONES_DUAL_DEFAULT.map(m => ({ ...m })));
  const [dualResults, setDualResults] = useState<Array<ETMResultado & { diff: number }>>([]);
  const [dualCalculado, setDualCalculado] = useState(false);

  const updateDual = (index: number, field: 'tecnicoA' | 'tecnicoB', value: number) => {
    const nuevas = [...dual];
    nuevas[index][field] = value;
    setDual(nuevas);
  };

  const calcularDual = () => {
    const res = dual.map((m) => {
      if (m.tecnicoA <= 0 || m.tecnicoB <= 0) return null;
      const etm = calcularETMIndividual([m.tecnicoA, m.tecnicoB], m.nombre, m.esPliegue);
      return { ...etm, diff: Math.abs(m.tecnicoA - m.tecnicoB) };
    }).filter(Boolean) as Array<ETMResultado & { diff: number }>;
    setDualResults(res);
    setDualCalculado(true);
  };

  const totalDualCumple = dualResults.filter(r => r.cumple).length;
  const totalDual = dualResults.length;

  // ===== MODO INDIVIDUAL handlers =====
  const updateValor = (index: number, valorIndex: number, value: number) => {
    const nuevas = [...mediciones];
    nuevas[index].valores[valorIndex] = value;
    setMediciones(nuevas);
  };

  const agregarTerceraMedicion = () => {
    const nuevas = mediciones.map(m => ({ ...m, valores: [...m.valores, 0] }));
    setMediciones(nuevas);
  };

  const calcular = () => {
    const res = mediciones.map((m) => {
      const validos = m.valores.filter(v => v > 0);
      if (validos.length < 2) return null;
      return calcularETMIndividual(validos, m.nombre, m.esPliegue);
    }).filter(Boolean) as ETMResultado[];
    setResultados(res);
    setCalculado(true);
  };

  const totalCumple = resultados.filter(r => r.cumple).length;
  const total = resultados.length;

  return (
    <div className="space-y-6">
      {/* Toggle modo */}
      <div className="flex items-center justify-between p-4 bg-[#11121a] border border-[#1e1f2e] rounded-lg">
        <div className="flex items-center gap-3">
          {modoDual ? <Users className="w-5 h-5 text-[#6366f1]" /> : <User className="w-5 h-5 text-[#D4FF00]" />}
          <div>
            <p className="text-sm font-semibold text-[#f0f0f5]">
              {modoDual ? 'Modo Técnico Duplicado (ISAK Nivel 4)' : 'Modo Individual'}
            </p>
            <p className="text-xs text-[#8a8d9e]">
              {modoDual
                ? 'Dos técnicos miden al mismo sujeto. Se calcula ETM entre técnicos.'
                : 'Un técnico mide 2-3 veces. Se calcula ETM de repetibilidad.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8a8d9e]">{modoDual ? 'Duplicado' : 'Individual'}</span>
          <Switch checked={modoDual} onCheckedChange={setModoDual} className="data-[state=checked]:bg-[#6366f1]" />
        </div>
      </div>

      {/* ===== MODO DUAL ===== */}
      {modoDual && (
        <div className="space-y-6">
          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-[#f0f0f5]">
                <Users className="w-5 h-5 text-[#6366f1]" />
                Captura Duplicada — Técnico A vs Técnico B
              </CardTitle>
              <p className="text-sm text-[#8a8d9e]">
                ISAK exige que un técnico Nivel 4 supervise. Capture las mediciones de ambos técnicos para calcular el ETM entre evaluadores.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2e2f42] text-[#8a8d9e]"
                  onClick={() => { setDual(MEDICIONES_DUAL_DEFAULT.map(m => ({ ...m }))); setDualCalculado(false); }}
                >
                  Limpiar
                </Button>
                <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white" onClick={calcularDual}>
                  <Calculator className="w-4 h-4 mr-2" /> Calcular ETM entre Técnicos
                </Button>
              </div>

              <div className="overflow-x-auto border border-[#1e1f2e] rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#1e1f2e]">
                      <TableHead className="text-[#8a8d9e]">Medición</TableHead>
                      <TableHead className="text-[#8a8d9e]">Tipo</TableHead>
                      <TableHead className="text-[#D4FF00]">Técnico A</TableHead>
                      <TableHead className="text-[#6366f1]">Técnico B</TableHead>
                      <TableHead className="text-[#8a8d9e]">Diferencia</TableHead>
                      <TableHead className="text-[#8a8d9e]">ETM%</TableHead>
                      <TableHead className="text-[#8a8d9e]">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dual.map((m, i) => {
                      const diff = Math.abs(m.tecnicoA - m.tecnicoB);
                      const result = dualCalculado ? dualResults.find(r => r.nombre === m.nombre) : null;
                      const limite = m.esPliegue ? 5 : 1;
                      return (
                        <TableRow key={m.key} className="border-[#1e1f2e]/50">
                          <TableCell className="font-medium text-[#f0f0f5]">{m.nombre}</TableCell>
                          <TableCell>
                            <Badge className={m.esPliegue ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20' : 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20'}>
                              {m.esPliegue ? 'Pliegue ≤5%' : 'Perímetro/Diám ≤1%'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.1"
                              className="w-24 h-8 text-sm bg-[#0a0b0f] border-[#D4FF00]/30 text-[#f0f0f5] text-right font-mono"
                              value={m.tecnicoA || ''}
                              onChange={e => updateDual(i, 'tecnicoA', parseFloat(e.target.value) || 0)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.1"
                              className="w-24 h-8 text-sm bg-[#0a0b0f] border-[#6366f1]/30 text-[#f0f0f5] text-right font-mono"
                              value={m.tecnicoB || ''}
                              onChange={e => updateDual(i, 'tecnicoB', parseFloat(e.target.value) || 0)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-[#f0f0f5]">
                            {m.tecnicoA > 0 && m.tecnicoB > 0 ? diff.toFixed(1) : '—'}
                          </TableCell>
                          <TableCell className="font-mono">
                            {result ? (
                              <span className={result.cumple ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                                {result.etmPorcentaje.toFixed(2)}%
                              </span>
                            ) : '—'}
                          </TableCell>
                          <TableCell>
                            {result ? (
                              result.cumple ? (
                                <span className="flex items-center gap-1 text-[#22c55e]"><CheckCircle className="w-4 h-4" /> ≤{limite}%</span>
                              ) : (
                                <span className="flex items-center gap-1 text-[#ef4444]"><AlertTriangle className="w-4 h-4" /> &gt;{limite}%</span>
                              )
                            ) : '—'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {dualCalculado && (
            <Card className="bg-[#11121a] border-[#1e1f2e] text-center p-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: totalDualCumple === totalDual && totalDual > 0 ? '#22c55e/10' : '#ef4444/10' }}>
                  {totalDualCumple === totalDual && totalDual > 0 ? (
                    <CheckCircle className="w-8 h-8 text-[#22c55e]" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-[#ef4444]" />
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-[#f0f0f5]">
                    {totalDualCumple === totalDual && totalDual > 0 ? 'Protocolo APROBADO' : 'Protocolo CON OBSERVACIONES'}
                  </h3>
                  <p className="text-sm text-[#8a8d9e]">
                    {totalDualCumple}/{totalDual} mediciones dentro del límite ISAK
                  </p>
                </div>
              </div>
              {totalDualCumple === totalDual && totalDual > 0 && (
                <p className="text-sm text-[#22c55e]">
                  ✅ Los técnicos cumplen con la precisión ISAK requerida. El protocolo es válido para certificación.
                </p>
              )}
              {totalDualCumple < totalDual && (
                <p className="text-sm text-[#ef4444]">
                  ⚠️ Revise las mediciones marcadas en rojo. ISAK requiere re-entrenamiento técnico antes de evaluar sujetos reales.
                </p>
              )}
            </Card>
          )}
        </div>
      )}

      {/* ===== MODO INDIVIDUAL (original) ===== */}
      {!modoDual && (
        <div className="space-y-6">
          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-[#f0f0f5]">
                <ShieldCheck className="w-5 h-5 text-[#D4FF00]" />
                {t('etm.titulo')}
              </CardTitle>
              <p className="text-sm text-[#8a8d9e]">{t('etm.descripcion')}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="border-[#2e2f42] text-[#8a8d9e]" onClick={agregarTerceraMedicion}>
                  {t('etm.medicion3Btn')}
                </Button>
                <Button className="bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608]" onClick={calcular}>
                  <Calculator className="w-4 h-4 mr-2" /> {t('etm.calcularETM')}
                </Button>
              </div>
              <div className="overflow-x-auto border border-[#1e1f2e] rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#1e1f2e]">
                      <TableHead className="text-[#8a8d9e]">{t('etm.variable')}</TableHead>
                      <TableHead className="text-[#8a8d9e]">{t('etm.tipo')}</TableHead>
                      <TableHead className="text-[#8a8d9e]">{t('etm.medicion1')}</TableHead>
                      <TableHead className="text-[#8a8d9e]">{t('etm.medicion2')}</TableHead>
                      {mediciones[0]?.valores.length === 3 && <TableHead className="text-[#8a8d9e]">{t('etm.medicion3')}</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mediciones.map((m, i) => (
                      <TableRow key={m.key} className="border-[#1e1f2e]/50">
                        <TableCell className="font-medium text-[#f0f0f5]">{m.nombre}</TableCell>
                        <TableCell>
                          <Badge className={m.esPliegue ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20' : 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20'}>
                            {m.esPliegue ? 'Pliegue (≤5%)' : 'Otra (≤1%)'}
                          </Badge>
                        </TableCell>
                        {m.valores.map((v, vi) => (
                          <TableCell key={vi}>
                            <Input
                              type="number"
                              step="0.1"
                              className="w-24 h-8 text-sm bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-right font-mono"
                              value={v || ''}
                              onChange={e => updateValor(i, vi, parseFloat(e.target.value) || 0)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {calculado && (
            <Card className="bg-[#11121a] border-[#1e1f2e]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#f0f0f5]">
                  <ArrowRightLeft className="w-5 h-5 text-[#D4FF00]" />
                  {t('etm.resultados')}
                  <Badge className={totalCumple === total && total > 0 ? 'bg-[#22c55e] text-white' : 'bg-[#f59e0b] text-[#050608]'}>
                    {totalCumple}/{total} {t('etm.dentroLimite')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e1f2e]">
                        <TableHead className="text-[#8a8d9e]">{t('etm.variable')}</TableHead>
                        <TableHead className="text-[#8a8d9e]">{t('etm.media')}</TableHead>
                        <TableHead className="text-[#8a8d9e]">{t('etm.etmAbs')}</TableHead>
                        <TableHead className="text-[#8a8d9e]">{t('etm.etmPct')}</TableHead>
                        <TableHead className="text-[#8a8d9e]">{t('etm.limite')}</TableHead>
                        <TableHead className="text-[#8a8d9e]">{t('etm.estado')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resultados.map((r) => (
                        <TableRow key={r.nombre} className="border-[#1e1f2e]/50">
                          <TableCell className="font-medium text-[#f0f0f5]">{r.nombre}</TableCell>
                          <TableCell className="text-[#f0f0f5] font-mono">{r.media.toFixed(2)}</TableCell>
                          <TableCell className="text-[#f0f0f5] font-mono">{r.etmAbsoluto.toFixed(2)}</TableCell>
                          <TableCell className={r.cumple ? 'text-[#22c55e] font-semibold font-mono' : 'text-[#ef4444] font-semibold font-mono'}>
                            {r.etmPorcentaje.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-[#8a8d9e]">{mediciones.find(m => m.nombre === r.nombre)?.esPliegue ? '5%' : '1%'}</TableCell>
                          <TableCell>
                            {r.cumple ? (
                              <span className="flex items-center gap-1 text-[#22c55e]"><CheckCircle className="w-4 h-4" /> {t('etm.aceptable')}</span>
                            ) : (
                              <span className="flex items-center gap-1 text-[#ef4444]"><AlertTriangle className="w-4 h-4" /> {t('etm.revisar')}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
