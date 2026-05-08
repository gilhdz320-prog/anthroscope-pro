import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Heart, AlertTriangle, CheckCircle2, Activity, Flame, Info } from 'lucide-react';

interface REDSAnalisis {
  disponibilidadEnergetica: number; // kcal/kg FFM
  riesgoRED_S: 'bajo' | 'moderado' | 'alto' | 'critico';
  alertas: string[];
  recomendaciones: string[];
}

function analizarRED_S(
  caloriasConsumidas: number,
  gastoEjercicio: number,
  masaMagra: number,
  sexo: string,
  frecuenciaMenstrual?: string
): REDSAnalisis {
  // Fórmula de disponibilidad energética (EA) = (Ingesta − Gasto ejercicio) / kg masa magra
  const ea = ((caloriasConsumidas - gastoEjercicio) / masaMagra);
  const alertas: string[] = [];
  const recomendaciones: string[] = [];

  let riesgo: REDSAnalisis['riesgoRED_S'] = 'bajo';

  if (ea < 10) {
    riesgo = 'critico';
    alertas.push('Disponibilidad energética CRÍTICA (< 10 kcal/kg FFM)');
    alertas.push('Riesgo inminente de amenorrea, osteoporosis, fractura por estrés');
    recomendaciones.push('INTERVENCIÓN INMEDIATA: Aumentar ingesta calórica 500-800 kcal/día');
    recomendaciones.push('Reducir volumen de entrenamiento 30-40% inmediatamente');
    recomendaciones.push('Derivar a médico deportólogo y endocrinólogo');
    recomendaciones.push('Suplementar calcio (1500mg/día) y vitamina D (2000 UI/día)');
  } else if (ea < 20) {
    riesgo = 'alto';
    alertas.push('Disponibilidad energética BAJA (< 20 kcal/kg FFM) — Umbral RED-S');
    alertas.push('Función endocrina comprometida. Riesgo de disfunción hormonal');
    recomendaciones.push('Aumentar ingesta calórica 300-500 kcal/día');
    recomendaciones.push('Reducir volumen de entrenamiento 20%');
    recomendaciones.push('Monitorear menstruación / testosterona cada 4 semanas');
    recomendaciones.push('Priorizar carbohidratos peri-entreno');
  } else if (ea < 30) {
    riesgo = 'moderado';
    alertas.push('Disponibilidad energética SUBÓPTIMA (20-30 kcal/kg FFM)');
    alertas.push('Rendimiento puede estar comprometido a largo plazo');
    recomendaciones.push('Aumentar ingesta calórica 200-300 kcal/día');
    recomendaciones.push('Verificar timing de carbohidratos alrededor del entrenamiento');
    recomendaciones.push('Evaluar calidad del sueño (objetivo: 7-9 horas)');
  } else {
    riesgo = 'bajo';
    recomendaciones.push('Mantener ingesta actual — disponibilidad energética óptima');
    recomendaciones.push('Continuar monitoreo periódico de composición corporal');
  }

  // Alertas específicas por sexo
  if (sexo === 'femenino') {
    if (frecuenciaMenstrual === 'amenorrea') {
      alertas.push('AMENORREA detectada — indicador clínico de RED-S');
      recomendaciones.push('PRIORIDAD MÁXIMA: Recuperar ciclo menstrual antes que rendimiento');
    } else if (frecuenciaMenstrual === 'oligomenorrea') {
      alertas.push('OLIGOMENORREA — períodos irregulares, posible inicio de RED-S');
      recomendaciones.push('Monitorear ciclo cada mes — avisar si hay 2 ciclos ausentes seguidos');
    }
  } else {
    if (ea < 20) {
      alertas.push('Hombres con EA < 20 también presentan baja testosterona y densidad ósea reducida');
      recomendaciones.push('Monitorear libido, erecciones matutinas, y humor como indicadores indirectos');
    }
  }

  // Alertas de signos de alerta temprana
  if (ea < 25) {
    alertas.push('Fatiga persistente, recuperación lenta, caída de rendimiento');
    alertas.push('Irritabilidad, dificultad para concentrarse, obsesión con peso/comida');
  }

  return { disponibilidadEnergetica: Math.round(ea * 10) / 10, riesgoRED_S: riesgo, alertas, recomendaciones };
}

export function REDSModule() {
  const [calorias, setCalorias] = useState(2200);
  const [gastoEjercicio, setGastoEjercicio] = useState(600);
  const [masaMagra, setMasaMagra] = useState(55);
  const [sexo, setSexo] = useState('femenino');
  const [menstrual, setMenstrual] = useState('regular');
  const [resultado, setResultado] = useState<REDSAnalisis | null>(null);

  const calcular = () => {
    const res = analizarRED_S(calorias, gastoEjercicio, masaMagra, sexo, menstrual);
    setResultado(res);
    toast.success(`EA: ${res.disponibilidadEnergetica} kcal/kg FFM — Riesgo ${res.riesgoRED_S.toUpperCase()}`);
  };

  const colorRiesgo = {
    bajo: { bg: 'bg-[#22c55e]/10', border: 'border-[#22c55e]/20', text: 'text-[#22c55e]', label: 'BAJO' },
    moderado: { bg: 'bg-[#f59e0b]/10', border: 'border-[#f59e0b]/20', text: 'text-[#f59e0b]', label: 'MODERADO' },
    alto: { bg: 'bg-[#ef4444]/10', border: 'border-[#ef4444]/20', text: 'text-[#ef4444]', label: 'ALTO' },
    critico: { bg: 'bg-[#ef4444]/20', border: 'border-[#ef4444]/30', text: 'text-[#ef4444]', label: 'CRÍTICO' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Detección RED-S / LEA</h2>
          <p className="text-xs text-[#8a8d9e]">Disponibilidad Energética (EA) — novedad mundial en software</p>
        </div>
        <Badge className="bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20">No existe en ningún software</Badge>
      </div>

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="pt-6 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase">Ingesta calórica (kcal/día)</label>
              <Input type="number" value={calorias} onChange={e => setCalorias(parseInt(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase">Gasto ejercicio (kcal/día)</label>
              <Input type="number" value={gastoEjercicio} onChange={e => setGastoEjercicio(parseInt(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase">Masa magra (kg)</label>
              <Input type="number" value={masaMagra} onChange={e => setMasaMagra(parseFloat(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-[10px] text-[#8a8d9e] uppercase">Sexo</label>
              <select value={sexo} onChange={e => setSexo(e.target.value)} className="w-full bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm">
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>
          </div>
          {sexo === 'femenino' && (
            <div className="md:w-1/2">
              <label className="text-[10px] text-[#8a8d9e] uppercase">Frecuencia menstrual</label>
              <select value={menstrual} onChange={e => setMenstrual(e.target.value)} className="w-full bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm">
                <option value="regular">Regular (cada 21-35 días)</option>
                <option value="oligomenorrea">Irregular / Oligomenorrea</option>
                <option value="amenorrea">Amenorrea (&gt;3 meses sin ciclo)</option>
                <option value="NA">No aplica / prefiero no decir</option>
              </select>
            </div>
          )}
          <Button onClick={calcular} className="bg-[#ef4444] hover:bg-[#dc2626] text-white">
            <Heart className="w-4 h-4 mr-2" /> Calcular EA y Riesgo RED-S
          </Button>
        </CardContent>
      </Card>

      {/* Resultados */}
      {resultado && (
        <Card className={`${colorRiesgo[resultado.riesgoRED_S].bg} ${colorRiesgo[resultado.riesgoRED_S].border} border`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#f0f0f5] flex items-center gap-2">
                <Activity className={`w-5 h-5 ${colorRiesgo[resultado.riesgoRED_S].text}`} />
                Disponibilidad Energética: {resultado.disponibilidadEnergetica} kcal/kg FFM
              </CardTitle>
              <Badge className={`${colorRiesgo[resultado.riesgoRED_S].bg} ${colorRiesgo[resultado.riesgoRED_S].text} ${colorRiesgo[resultado.riesgoRED_S].border} font-bold`}>
                RIESGO {colorRiesgo[resultado.riesgoRED_S].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Referencia visual */}
            <div className="relative h-6 bg-[#1e1f2e] rounded-full overflow-hidden">
              <div className="absolute inset-0 flex text-[9px] text-white font-bold">
                <div className="flex-1 bg-[#ef4444] flex items-center justify-center">&lt;20 CRÍTICO</div>
                <div className="flex-1 bg-[#f59e0b] flex items-center justify-center">20-30 MODERADO</div>
                <div className="flex-1 bg-[#22c55e] flex items-center justify-center">&gt;30 ÓPTIMO</div>
              </div>
              <div className="absolute top-0 bottom-0 w-1 bg-white" style={{ left: `${Math.min((resultado.disponibilidadEnergetica / 50) * 100, 95)}%` }} />
            </div>

            {/* Alertas */}
            {resultado.alertas.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#ef4444] flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Alertas detectadas:</p>
                {resultado.alertas.map((a, i) => (
                  <p key={i} className="text-xs text-[#f0f0f5] flex items-start gap-1"><AlertTriangle className="w-3 h-3 text-[#f59e0b] shrink-0 mt-0.5" /> {a}</p>
                ))}
              </div>
            )}

            {/* Recomendaciones */}
            {resultado.recomendaciones.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#D4FF00] flex items-center gap-1"><Info className="w-3 h-3" /> Recomendaciones:</p>
                {resultado.recomendaciones.map((r, i) => (
                  <p key={i} className="text-xs text-[#8a8d9e] flex items-start gap-1"><CheckCircle2 className="w-3 h-3 text-[#22c55e] shrink-0 mt-0.5" /> {r}</p>
                ))}
              </div>
            )}

            {/* Contexto científico */}
            <div className="bg-[#0a0b0f] rounded-lg p-3 border border-[#1e1f2e] mt-2">
              <p className="text-[10px] text-[#55576b]">
                <Flame className="w-3 h-3 inline mr-1" />
                Basado en: IOC Consensus Statement 2023 (RED-S), Mountjoy et al. British Journal of Sports Medicine.
                EA &lt; 30 kcal/kg FFM asociado con disfunción endocrina, baja densidad ósea, y caída de rendimiento.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
