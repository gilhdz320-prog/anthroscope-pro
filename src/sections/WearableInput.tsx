import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Activity, Heart, Moon, Zap, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, Droplets, Flame } from 'lucide-react';

interface WearableData {
  fecha: string;
  hrv: number; // ms (RMSSD o SDNN)
  hrvBaseline: number;
  suenoHoras: number;
  suenoCalidad: number; // 1-10
  rpe: number; // 1-10 (Rate of Perceived Exertion)
  peso: number;
  fatiga: number; // 1-10
}

interface Recomendacion {
  tipo: 'alerta' | 'ajuste' | 'excelente';
  icono: any;
  mensaje: string;
  accion: string;
  color: string;
}

function generarRecomendaciones(data: WearableData): Recomendacion[] {
  const recs: Recomendacion[] = [];

  // HRV analysis
  const hrvDelta = ((data.hrv - data.hrvBaseline) / data.hrvBaseline) * 100;
  if (hrvDelta < -20) {
    recs.push({
      tipo: 'alerta', icono: AlertTriangle, color: 'text-[#ef4444]',
      mensaje: `HRV bajó ${Math.abs(hrvDelta).toFixed(0)}% respecto a tu baseline (${data.hrvBaseline} ms)`,
      accion: 'REDUCIR carga de entrenamiento 40% hoy. Priorizar carbohidratos de recuperación (+50g). Dormir 8+ horas.',
    });
  } else if (hrvDelta < -10) {
    recs.push({
      tipo: 'ajuste', icono: TrendingDown, color: 'text-[#f59e0b]',
      mensaje: `HRV ligeramente bajo (-${Math.abs(hrvDelta).toFixed(0)}%)`,
      accion: 'REDUCIR intensidad, mantener volumen. Añadir 30g carbs pre-entreno. Considerar dia activo recuperación.',
    });
  } else if (hrvDelta > 10) {
    recs.push({
      tipo: 'excelente', icono: TrendingUp, color: 'text-[#22c55e]',
      mensaje: `HRV óptimo (+${hrvDelta.toFixed(0)}% sobre baseline)`,
      accion: 'Sistema parasimpático recuperado. Puedes cargar intensidad hoy. Mantener macros actuales.',
    });
  }

  // Sleep analysis
  if (data.suenoHoras < 6) {
    recs.push({
      tipo: 'alerta', icono: Moon, color: 'text-[#ef4444]',
      mensaje: `Solo ${data.suenoHoras} horas de sueño — recuperación comprometida`,
      accion: 'AUMENTAR calorías 200 kcal (priorizar grasas saludables y proteína). Dormir siesta 20-30 min. No entrenar alta intensidad.',
    });
  } else if (data.suenoHoras < 7) {
    recs.push({
      tipo: 'ajuste', icono: Moon, color: 'text-[#f59e0b]',
      mensaje: `Sueño subóptimo (${data.suenoHoras}h)`,
      accion: 'Añadir 100 kcal extra hoy. Priorizar ventana de sueño 22:00-06:00. Melatonina 0.5mg si necesario.',
    });
  } else if (data.suenoHoras >= 8 && data.suenoCalidad >= 7) {
    recs.push({
      tipo: 'excelente', icono: CheckCircle2, color: 'text-[#22c55e]',
      mensaje: `Sueño excelente (${data.suenoHoras}h, calidad ${data.suenoCalidad}/10)`,
      accion: 'Recuperación hormonal óptima. Mantener plan nutricional actual. Buen día para cargas neuromusculares.',
    });
  }

  // RPE analysis
  if (data.rpe >= 9) {
    recs.push({
      tipo: 'alerta', icono: Flame, color: 'text-[#ef4444]',
      mensaje: `RPE muy alto (${data.rpe}/10) — sobreentrenamiento próximo`,
      accion: 'DÍA DE DESCANSO ACTIVO o reducir volumen 60%. Doblar carbohidratos de recuperación. Magnesio 400mg antes de dormir.',
    });
  } else if (data.rpe >= 7 && data.fatiga >= 7) {
    recs.push({
      tipo: 'ajuste', icono: Zap, color: 'text-[#f59e0b]',
      mensaje: `RPE ${data.rpe}/10 + fatiga ${data.fatiga}/10 — acumulación de carga`,
      accion: 'Reducir volumen 30%. Añadir BCAA o proteína intra-entreno. Priorizar hidratación con electrolitos.',
    });
  }

  // Fatigue + weight combo
  if (data.fatiga >= 8 && data.peso < 0) {
    recs.push({
      tipo: 'alerta', icono: AlertTriangle, color: 'text-[#ef4444]',
      mensaje: 'Fatiga extrema con pérdida de peso — posible LEA/RED-S',
      accion: 'URGENTE: Aumentar ingesta 500+ kcal. Reducir entrenamiento 50%. Verificar disponibilidad energética en módulo RED-S.',
    });
  }

  if (recs.length === 0) {
    recs.push({
      tipo: 'excelente', icono: CheckCircle2, color: 'text-[#22c55e]',
      mensaje: 'Todos los marcadores dentro de rangos normales',
      accion: 'Mantener plan actual. Monitorear tendencias a 7 días.',
    });
  }

  return recs;
}

export function WearableInput() {
  const [data, setData] = useState<WearableData>({
    fecha: new Date().toISOString().slice(0, 10),
    hrv: 55,
    hrvBaseline: 60,
    suenoHoras: 7,
    suenoCalidad: 7,
    rpe: 6,
    peso: 0, // delta
    fatiga: 5,
  });
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
  const [historial, setHistorial] = useState<WearableData[]>([]);

  const analizar = () => {
    const recs = generarRecomendaciones(data);
    setRecomendaciones(recs);
    const all = [...historial, data];
    setHistorial(all);
    localStorage.setItem('anthroscope_wearable', JSON.stringify(all));
    toast.success('Análisis completado: ' + recs.length + ' recomendaciones');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Wearables + IA Adaptativa</h2>
          <p className="text-xs text-[#8a8d9e]">Ingresa HRV, sueño, RPE → ajustes automáticos de nutrición</p>
        </div>
        <Badge className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20">Simulado / Listo para API</Badge>
      </div>

      {/* Input form */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#D4FF00]" /> Datos de Recuperación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><Heart className="w-3 h-3 text-[#ef4444]" /> HRV (ms)</label>
              <Input type="number" value={data.hrv} onChange={e => setData({ ...data, hrv: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><Heart className="w-3 h-3 text-[#a78bfa]" /> HRV Baseline</label>
              <Input type="number" value={data.hrvBaseline} onChange={e => setData({ ...data, hrvBaseline: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><Moon className="w-3 h-3 text-[#6366f1]" /> Sueño (horas)</label>
              <Input type="number" step="0.5" value={data.suenoHoras} onChange={e => setData({ ...data, suenoHoras: parseFloat(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><Moon className="w-3 h-3 text-[#06b6d4]" /> Calidad sueño (1-10)</label>
              <Input type="number" min={1} max={10} value={data.suenoCalidad} onChange={e => setData({ ...data, suenoCalidad: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><Flame className="w-3 h-3 text-[#f59e0b]" /> RPE ayer (1-10)</label>
              <Input type="number" min={1} max={10} value={data.rpe} onChange={e => setData({ ...data, rpe: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><Activity className="w-3 h-3 text-[#ef4444]" /> Fatiga hoy (1-10)</label>
              <Input type="number" min={1} max={10} value={data.fatiga} onChange={e => setData({ ...data, fatiga: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase flex items-center gap-1"><TrendingDown className="w-3 h-3 text-[#f59e0b]" /> Δ Peso (kg)</label>
              <Input type="number" step="0.1" value={data.peso} onChange={e => setData({ ...data, peso: parseFloat(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" placeholder="-0.5 = bajó" />
            </div>
            <div className="flex items-end">
              <Button onClick={analizar} className="w-full bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] font-semibold">
                <Zap className="w-4 h-4 mr-2" /> Analizar + Ajustar
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-[#55576b]">
            <Droplets className="w-3 h-3 inline mr-1" />
            En producción: integración automática con Whoop, Garmin, Oura, Apple Health via API. Datos manuales por ahora para demostración.
          </p>
        </CardContent>
      </Card>

      {/* Recomendaciones generadas */}
      {recomendaciones.length > 0 && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#f0f0f5]">Recomendaciones IA Adaptativas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recomendaciones.map((rec, i) => {
              const Icon = rec.icono;
              const bgColor = rec.tipo === 'alerta' ? 'bg-[#ef4444]/5 border-[#ef4444]/20' : rec.tipo === 'ajuste' ? 'bg-[#f59e0b]/5 border-[#f59e0b]/20' : 'bg-[#22c55e]/5 border-[#22c55e]/20';
              return (
                <div key={i} className={`p-3 rounded-lg border ${bgColor}`}>
                  <div className="flex items-start gap-2">
                    <Icon className={`w-4 h-4 ${rec.color} shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-sm font-semibold text-[#f0f0f5]">{rec.mensaje}</p>
                      <p className="text-xs text-[#D4FF00] mt-1 font-medium">→ {rec.accion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Mini historial */}
      {historial.length > 1 && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#f0f0f5]">Tendencia (últimas {Math.min(historial.length, 7)} entradas)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1 overflow-x-auto pb-2">
              {historial.slice(-7).map((h, i) => (
                <div key={i} className="min-w-[60px] text-center">
                  <div className={`w-full h-12 rounded flex items-end justify-center ${h.hrv < h.hrvBaseline * 0.8 ? 'bg-[#ef4444]/20' : h.hrv < h.hrvBaseline * 0.9 ? 'bg-[#f59e0b]/20' : 'bg-[#22c55e]/20'}`}>
                    <div className="w-4 rounded-t" style={{ height: `${(h.hrv / (h.hrvBaseline * 1.2)) * 100}%`, background: h.hrv < h.hrvBaseline * 0.8 ? '#ef4444' : h.hrv < h.hrvBaseline * 0.9 ? '#f59e0b' : '#22c55e' }} />
                  </div>
                  <p className="text-[9px] text-[#8a8d9e] mt-1">{h.fecha.slice(5)}</p>
                  <p className="text-[9px] text-[#f0f0f5] font-mono">{h.hrv}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
