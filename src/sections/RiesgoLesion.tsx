import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldCheck, Activity, Heart, Bone, Dna } from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';

interface Props {
  resultado: ResultadoISAK;
}

interface Alerta {
  nivel: 'alto' | 'medio' | 'bajo';
  icono: any;
  titulo: string;
  mensaje: string;
  recomendacion: string;
}

export function RiesgoLesion({ resultado }: Props) {
  const { sujeto, cincoComponentes, siriPorcentajeGrasa, imc, perfil } = resultado;
  const alertas: Alerta[] = [];

  // 1. IMO bajo — riesgo de fuerza insuficiente / lesiones por fatiga
  if (cincoComponentes) {
    const imoMin = sujeto.sexo === 'masculino' ? 3.0 : 2.5;
    if (cincoComponentes.indiceMusculoOseo < imoMin) {
      alertas.push({
        nivel: 'alto',
        icono: Bone,
        titulo: 'IMO Bajo — Riesgo de lesión por fatiga',
        mensaje: `IMO ${cincoComponentes.indiceMusculoOseo.toFixed(2)} está por debajo del umbral recomendado (${imoMin}) para ${sujeto.sexo === 'masculino' ? 'hombres' : 'mujeres'}. Esto indica masa muscular insuficiente para estabilizar articulaciones durante cargas deportivas.`,
        recomendacion: 'Priorizar trabajo de fuerza excéntrica y estabilizadora. Evaluar técnica de ejecución en saltos y cambios de dirección.',
      });
    }
  }

  // 2. % grasa muy alto — riesgo cardiovascular y sobrecarga articular
  const grasaMax = sujeto.sexo === 'masculino' ? 25 : 32;
  const grasaMin = sujeto.sexo === 'masculino' ? 5 : 12;
  if (siriPorcentajeGrasa > grasaMax) {
    alertas.push({
      nivel: 'medio',
      icono: Heart,
      titulo: '% Grasa Elevado — Sobrecarga articular',
      mensaje: `${siriPorcentajeGrasa}% de grasa corporal supera el rango óptimo para rendimiento deportivo (${grasaMax}%). Aumenta carga en rodillas y tobillos.`,
      recomendacion: 'Implementar protocolo de composición corporal con énfasis en mantener masa muscular. Monitorear rodilla durante progresiones de carga.',
    });
  }

  // 3. % grasa muy bajo — riesgo hormonal y de fractura por estrés
  if (siriPorcentajeGrasa < grasaMin && siriPorcentajeGrasa > 0) {
    alertas.push({
      nivel: 'alto',
      icono: Dna,
      titulo: '% Grasa Muy Bajo — Riesgo endocrino / RED-S',
      mensaje: `${siriPorcentajeGrasa}% está por debajo del mínimo saludable (${grasaMin}%). Riesgo de amenorrea, osteoporosis, y fractura por estrés.`,
      recomendacion: 'Derivar a nutrición deportiva. No promover déficit calórico. Priorizar salud metabólica sobre rendimiento inmediato.',
    });
  }

  // 4. IMC extremo
  if (imc < 18.5) {
    alertas.push({
      nivel: 'medio',
      icono: Activity,
      titulo: 'IMC Bajo — Reserva insuficiente',
      mensaje: `IMC ${imc} indica bajo peso. Menor resiliencia ante infecciones y mayor tiempo de recuperación.`,
      recomendacion: 'Evaluar ingesta calórica y calidad del sueño. Considerar suplementación solo bajo supervisión médica.',
    });
  }
  if (imc > 30) {
    alertas.push({
      nivel: 'medio',
      icono: Activity,
      titulo: 'IMC Elevado — Carga articulatoria',
      mensaje: `IMC ${imc} indica obesidad. Mayor riesgo de artrosis, tendinopatías y apnea del sueño.`,
      recomendacion: 'Iniciar con ejercicio no impacto (natación, bicicleta). Progresar gradualmente a cargas.',
    });
  }

  // 5. Relación muslo/pantorrilla — proxy de desequilibrio cuádriceps/isquiotibial
  if (perfil) {
    const p = perfil as any;
    const muslo = p.musloMedio || p.gluteoMaximo || 0;
    const pantorrilla = p.pantorrillaMaxima || 0;
    if (muslo > 0 && pantorrilla > 0) {
      const relacion = muslo / pantorrilla;
      if (relacion < 1.2 || relacion > 1.8) {
        alertas.push({
          nivel: 'medio',
          icono: AlertTriangle,
          titulo: `Relación Muslo/Pantorrilla ${relacion.toFixed(2)} — Desequilibrio segmental`,
          mensaje: `La relación entre muslo (${muslo}cm) y pantorrilla (${pantorrilla}cm) está fuera del rango esperado (1.2–1.8). Puede indicar desequilibrio cuádriceps/isquiotibial.`,
          recomendacion: 'Fortalecer isquiotibiales con Nordic curls y RDL. Evaluar ROM de extensión de rodilla.',
        });
      }
    }
  }

  const riesgoGlobal = alertas.filter(a => a.nivel === 'alto').length > 0 ? 'alto' : alertas.filter(a => a.nivel === 'medio').length > 0 ? 'medio' : 'bajo';

  return (
    <Card className="bg-[#11121a] border-[#1e1f2e]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#f0f0f5]">
          <ShieldCheck className="w-5 h-5 text-[#ef4444]" />
          Predicción de Riesgo de Lesión
          <Badge className={
            riesgoGlobal === 'alto' ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30' :
            riesgoGlobal === 'medio' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30' :
            'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30'
          }>
            {riesgoGlobal === 'alto' ? 'ALTO' : riesgoGlobal === 'medio' ? 'MEDIO' : 'BAJO'}
          </Badge>
        </CardTitle>
        <p className="text-xs text-[#8a8d9e]">
          Basado en índices antropométricos ISAK. No reemplaza evaluación médica ni biomecánica.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {alertas.length === 0 ? (
          <div className="text-center py-6">
            <ShieldCheck className="w-10 h-10 text-[#22c55e] mx-auto mb-2" />
            <p className="text-sm text-[#22c55e] font-semibold">Sin alertas de riesgo detectadas</p>
            <p className="text-xs text-[#8a8d9e] mt-1">Los índices antropométricos están dentro de rangos seguros.</p>
          </div>
        ) : (
          alertas.map((a, i) => {
            const Icon = a.icono;
            return (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  a.nivel === 'alto' ? 'bg-[#ef4444]/5 border-[#ef4444]/20' :
                  a.nivel === 'medio' ? 'bg-[#f59e0b]/5 border-[#f59e0b]/20' :
                  'bg-[#22c55e]/5 border-[#22c55e]/20'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${
                    a.nivel === 'alto' ? 'text-[#ef4444]' : a.nivel === 'medio' ? 'text-[#f59e0b]' : 'text-[#22c55e]'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#f0f0f5]">{a.titulo}</p>
                      <Badge className={`text-[10px] ${
                        a.nivel === 'alto' ? 'bg-[#ef4444]/10 text-[#ef4444]' :
                        a.nivel === 'medio' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                        'bg-[#22c55e]/10 text-[#22c55e]'
                      }`}>
                        {a.nivel.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#8a8d9e] mt-1">{a.mensaje}</p>
                    <p className="text-xs text-[#D4FF00] mt-1 font-medium">→ {a.recomendacion}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
