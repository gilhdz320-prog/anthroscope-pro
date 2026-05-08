import { useTranslation } from 'react-i18next';
import type { ResultadoISAK } from '@/types/isak';

interface CoachLanguage {
  resumen: string;
  nutricion: string[];
  entrenamiento: string[];
  riesgo: string[];
  periodizacion: string;
  potencial: string;
}

export function generarLenguajeCoach(resultado: ResultadoISAK): CoachLanguage {
  const r = resultado;
  const cc = r.cincoComponentes;
  const s = r.somatotipo;
  const sexo = r.sujeto.sexo;
  
  // Categorías de IMO
  const imo = cc?.indiceMusculoOseo || 0;
  const grasa = r.siriPorcentajeGrasa || 0;
  const masaMusc = cc?.masaMuscular || 0;
  const masaGrasa = cc?.masaAdiposa || 0;
  
  // Somatotipo categoria
  const somaCat = s?.categoria?.toLowerCase() || '';
  
  const lang: CoachLanguage = {
    resumen: '',
    nutricion: [],
    entrenamiento: [],
    riesgo: [],
    periodizacion: '',
    potencial: '',
  };

  // === RESUMEN GENERAL ===
  if (somaCat.includes('meso')) {
    lang.resumen = `${r.sujeto.nombre} tiene un perfil MESOMÓRFICO dominante — construcción muscular naturalmente robusta. Responde excelente a entrenamiento de fuerza e hipertrofia.`;
  } else if (somaCat.includes('ecto')) {
    lang.resumen = `${r.sujeto.nombre} tiene un perfil ECTOMÓRFICO — metabolismo acelerado, dificultad para ganar masa. Priorizar superávit calórico + bajo volumen cardio.`;
  } else if (somaCat.includes('endo')) {
    lang.resumen = `${r.sujeto.nombre} tiene tendencia ENDOMÓRFICA — mayor facilidad para acumular grasa. Control estricto de nutrición + metabolismo.`;
  } else {
    lang.resumen = `${r.sujeto.nombre} tiene un perfil EQUILIBRADO — versátil para múltiples deportes y estrategias de entrenamiento.`;
  }

  // === NUTRICIÓN ===
  if (grasa > 15 && sexo === 'masculino') {
    lang.nutricion.push(`Deficit calórico moderado (-300 kcal). % grasa ${grasa.toFixed(1)}% está por encima del rango óptimo para la mayoría de deportes de élite masculinos.`);
  } else if (grasa > 22 && sexo === 'femenino') {
    lang.nutricion.push(`Deficit calórico suave (-200 kcal). % grasa ${grasa.toFixed(1)}% está levemente elevada. Priorizar timing de carbohidratos alrededor del entrenamiento.`);
  } else if (grasa < 6 && sexo === 'masculino') {
    lang.nutricion.push(`¡ALERTA: % grasa extremadamente baja (${grasa.toFixed(1)}%). Riesgo de disfunción hormonal y sistema inmune. Aumentar grasas saludables + calorías inmediatamente.`);
  } else {
    lang.nutricion.push(`% grasa en rango funcional (${grasa.toFixed(1)}%). Mantener ingesta proteica en 1.8-2.2g/kg. Periodizar carbohidratos según carga de entrenamiento.`);
  }

  if (masaMusc && masaGrasa) {
    const ratio = masaMusc / masaGrasa;
    if (ratio < 2.5) {
      lang.nutricion.push(`Ratio músculo/grasa bajo (${ratio.toFixed(1)}). Prioridad: recomposición corporal con déficit suave + alta proteína.`);
    } else if (ratio > 4.5) {
      lang.nutricion.push(`Ratio músculo/grasa excelente (${ratio.toFixed(1)}). Atleta en ventana óptima. Mantener mantenimiento o superávit limpio para ganancia.`);
    }
  }

  // === ENTRENAMIENTO ===
  if (imo >= 5.2 && sexo === 'masculino') {
    lang.entrenamiento.push(`IMO elite (${imo.toFixed(2)}). Potencial excepcional para fuerza y potencia. Programar periodos de intensidad >85% 1RM.`);
  } else if (imo >= 4.5 && sexo === 'masculino') {
    lang.entrenamiento.push(`IMO competitivo (${imo.toFixed(2)}). Responde bien a ciclos de fuerza de 4-6 semanas.`);
  } else if (imo < 3.8 && sexo === 'masculino') {
    lang.entrenamiento.push(`IMO bajo (${imo.toFixed(2)}). Priorizar hipertrofia sarcoplásmica + densidad ósea. No forzar intensidad máxima.`);
  }

  if (s?.mesomorfia > 6) {
    lang.entrenamiento.push(`Mesomorfia alta (${s.mesomorfia.toFixed(1)}). Ventana natural para ganancia muscular. 3-4 sesiones de fuerza/semana.`);
  }
  if (s?.ectomorfia > 4) {
    lang.entrenamiento.push(`Ectomorfia alta (${s.ectomorfia.toFixed(1)}). Evitar cardio excesivo. Fuerza + volumen moderado.`);
  }

  // === RIESGOS ===
  if (grasa > 18 && sexo === 'masculino') {
    lang.riesgo.push(`% grasa elevado aumenta carga articular en saltos/impacto. Mayor riesgo de lesión en rodilla/tobillo.`);
  }
  if (grasa < 5) {
    lang.riesgo.push(`Grasa corporal críticamente baja. Riesgo: amenorrea (mujeres), baja testosterona (hombres), fatiga crónica.`);
  }
  if (imo < 3.5 && sexo === 'masculino') {
    lang.riesgo.push(`IMO muy bajo indica baja masa muscular relativa. Riesgo de lesión por inestabilidad articular.`);
  }

  // === PERIODIZACIÓN ===
  if (grasa > 15 && sexo === 'masculino') {
    lang.periodizacion = `FASE 1 (4 semanas): Densidad corporal — déficit -300 kcal + fuerza 70-80% 1RM. FASE 2 (4 semanas): Potencia — superávit limpio + intensidad >85%.`;
  } else if (grasa < 8 && sexo === 'masculino') {
    lang.periodizacion = `FASE 1 (3 semanas): Recuperación metabólica — superávit +300 kcal + volumen moderado. FASE 2 (5 semanas): Construcción — intensidad progresiva.`;
  } else {
    lang.periodizacion = `MANTENIMIENTO: Alternar bloques de 3 semanas fuerza + 2 semanas potencia. Ajustar calorías ±10% según carga.`;
  }

  // === POTENCIAL ===
  const imoMax = sexo === 'masculino' ? 5.5 : 5.1;
  const difIMO = imoMax - imo;
  const kgPotencial = difIMO > 0 ? (difIMO * 5).toFixed(1) : '0';
  
  lang.potencial = `Potencial de ganancia natural: ~${kgPotencial} kg de masa muscular adicional. Techo genético IMO: ${imoMax} (actual: ${imo.toFixed(2)}).`;

  return lang;
}

export function CoachReportCard({ resultado }: { resultado: ResultadoISAK }) {
  const { t } = useTranslation();
  const coach = generarLenguajeCoach(resultado);
  
  const Section = ({ title, icon, items, color }: { title: string; icon: string; items: string[]; color: string }) => (
    items.length > 0 && (
      <div className="mb-5">
        <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2`} style={{ color }}>
          <span>{icon}</span> {title}
        </h4>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-[#c4c6d0] leading-relaxed pl-3 border-l-2" style={{ borderColor: color + '40' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  );

  return (
    <div className="bg-[#11121a] border border-[#1e1f2e] rounded-xl p-6">
      <div className="mb-5 pb-4 border-b border-[#1e1f2e]">
        <h3 className="text-lg font-bold text-[#D4FF00] mb-2">🎯 Lenguaje del Coach</h3>
        <p className="text-sm text-[#f0f0f5] leading-relaxed">{coach.resumen}</p>
      </div>
      
      <Section title="Nutrición" icon="🍽️" items={coach.nutricion} color="#22c55e" />
      <Section title="Entrenamiento" icon="💪" items={coach.entrenamiento} color="#D4FF00" />
      <Section title="Riesgos / Precauciones" icon="⚠️" items={coach.riesgo} color="#ef4444" />
      
      {coach.periodizacion && (
        <div className="mb-5">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-[#6366f1] flex items-center gap-2">
            <span>📅</span> Periodización Recomendada
          </h4>
          <p className="text-sm text-[#c4c6d0] leading-relaxed pl-3 border-l-2 border-[#6366f1]/40">
            {coach.periodizacion}
          </p>
        </div>
      )}
      
      {coach.potencial && (
        <div className="bg-[#D4FF00]/5 border border-[#D4FF00]/20 rounded-lg p-4">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-1 text-[#D4FF00] flex items-center gap-2">
            <span>🚀</span> Potencial Genético
          </h4>
          <p className="text-sm text-[#f0f0f5] leading-relaxed">{coach.potencial}</p>
        </div>
      )}
    </div>
  );
}
