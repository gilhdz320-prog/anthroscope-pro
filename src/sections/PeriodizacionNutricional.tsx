import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Target, Activity, Dumbbell, Zap, Trophy, AlertTriangle, Droplets } from 'lucide-react';

interface Mesociclo {
  nombre: string;
  semanas: number;
  descripcion: string;
  color: string;
  ajusteCalorias: number; // multiplicador
  ajusteCarbs: number;   // multiplicador
  ajusteProteinas: number; // multiplicador
  ajusteGrasas: number;   // multiplicador
  hidratacionExtra: number; // litros extra
  timing: string;
  icono: any;
}

const MESOCICLOS: Mesociclo[] = [
  {
    nombre: 'Fase General / Transición',
    semanas: 2,
    descripcion: 'Recuperación activa, movilidad, base aeróbica. Intensidad baja, volumen moderado.',
    color: 'bg-[#8a8d9e]',
    ajusteCalorias: 0.95,
    ajusteCarbs: 0.85,
    ajusteProteinas: 1.0,
    ajusteGrasas: 1.1,
    hidratacionExtra: 0,
    timing: '3 comidas principales + 1 colación. Timing flexible.',
    icono: Activity,
  },
  {
    nombre: 'Fase de Volumen / Base',
    semanas: 4,
    descripcion: 'Alto volumen, acumulación de carga. Mayor demanda de carbohidratos para sostener sesiones largas.',
    color: 'bg-[#22c55e]',
    ajusteCalorias: 1.1,
    ajusteCarbs: 1.25,
    ajusteProteinas: 1.05,
    ajusteGrasas: 1.0,
    hidratacionExtra: 0.5,
    timing: 'Carbos 60-90 min PRE-entreno. Proteína inmediata POST. 5-7g carbs/kg peso.',
    icono: Dumbbell,
  },
  {
    nombre: 'Fase de Intensidad / Potencia',
    semanas: 3,
    descripcion: 'Volumen bajo, intensidad máxima. Necesidad de recuperación rápida y proteína elevada.',
    color: 'bg-[#f59e0b]',
    ajusteCalorias: 1.05,
    ajusteCarbs: 1.0,
    ajusteProteinas: 1.15,
    ajusteGrasas: 1.0,
    hidratacionExtra: 0.3,
    timing: 'Proteína 1.6-2.2g/kg. Carbos cíclicos: alto en días fuerte, moderado en días light.',
    icono: Zap,
  },
  {
    nombre: 'Fase de Tapering / Pico',
    semanas: 1,
    descripcion: 'Reducción de volumen, mantenimiento de intensidad. Carga de carbohidratos estratégica.',
    color: 'bg-[#6366f1]',
    ajusteCalorias: 1.0,
    ajusteCarbs: 1.15,
    ajusteProteinas: 1.0,
    ajusteGrasas: 0.95,
    hidratacionExtra: 0.2,
    timing: 'Carga de carbohidratos 2-3 días pre-evento. Reducir fibra. 8-10g carbs/kg.',
    icono: TrendingUp,
  },
  {
    nombre: 'Día de Competencia / Evento',
    semanas: 0,
    descripcion: 'Máxima disponibilidad de energía, mínimo peso gastrointestinal.',
    color: 'bg-[#D4FF00]',
    ajusteCalorias: 1.1,
    ajusteCarbs: 1.3,
    ajusteProteinas: 0.85,
    ajusteGrasas: 0.7,
    hidratacionExtra: 1.0,
    timing: '3-4 hrs PRE: 1-4g carbs/kg. 1 hr PRE: 0.5-1g carbs/kg líquidos. Nada nuevo.',
    icono: Trophy,
  },
  {
    nombre: 'Recuperación / Post-Evento',
    semanas: 1,
    descripcion: 'Reposición de glucógeno, reparación muscular, antiinflamatorio.',
    color: 'bg-[#06b6d4]',
    ajusteCalorias: 1.0,
    ajusteCarbs: 1.0,
    ajusteProteinas: 1.1,
    ajusteGrasas: 1.15,
    hidratacionExtra: 0.5,
    timing: '20-40g proteína + 60-100g carbs en primeros 30 min POST. Omega-3 y antioxidantes.',
    icono: Target,
  },
];

const DEPORTES_MESOCICLOS: Record<string, { recomendado: string; semanasTotales: number }> = {
  'atletismo': { recomendado: 'Fase de Volumen / Base', semanasTotales: 12 },
  'natacion': { recomendado: 'Fase de Volumen / Base', semanasTotales: 14 },
  'ciclismo': { recomendado: 'Fase de Volumen / Base', semanasTotales: 16 },
  'triatlon': { recomendado: 'Fase de Volumen / Base', semanasTotales: 16 },
  'futbol': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'futbol americano': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 10 },
  'basquetbol': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'rugby': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 10 },
  'halterofilia': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'crossfit': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'mma': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'boxeo': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'judo': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'gimnasio': { recomendado: 'Fase de Volumen / Base', semanasTotales: 10 },
  'voleibol': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'tenis': { recomendado: 'Fase de Intensidad / Potencia', semanasTotales: 8 },
  'golf': { recomendado: 'Fase General / Transición', semanasTotales: 6 },
  'default': { recomendado: 'Fase de Volumen / Base', semanasTotales: 10 },
};

export function PeriodizacionNutricional() {
  const [deporte, setDeporte] = useState('');
  const [semanaActual, setSemanaActual] = useState(1);
  const [macrosBase, setMacrosBase] = useState({ cal: 2500, p: 150, c: 300, g: 80 });

  const deporteInfo = DEPORTES_MESOCICLOS[deporte.toLowerCase()] || DEPORTES_MESOCICLOS['default'];

  // Determinar fase según semana
  const determinarFase = (): Mesociclo => {
    if (semanaActual <= 2) return MESOCICLOS[0]; // Transición
    const semanasBase = deporteInfo.semanasTotales;
    const pct = semanaActual / semanasBase;
    if (pct <= 0.5) return MESOCICLOS[1]; // Volumen (primera mitad)
    if (pct <= 0.75) return MESOCICLOS[2]; // Intensidad
    if (pct <= 0.9) return MESOCICLOS[3]; // Tapering
    return MESOCICLOS[4]; // Competencia
  };

  const fase = determinarFase();

  const calcMacros = () => {
    if (!fase) return macrosBase;
    return {
      cal: Math.round(macrosBase.cal * fase.ajusteCalorias),
      p: Math.round(macrosBase.p * fase.ajusteProteinas),
      c: Math.round(macrosBase.c * fase.ajusteCarbs),
      g: Math.round(macrosBase.g * fase.ajusteGrasas),
    };
  };

  const ajustados = calcMacros();
  const Icon = fase?.icono || Activity;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Periodización Nutricional</h2>
          <p className="text-xs text-[#8a8d9e]">Ajuste automático de macros según fase del mesociclo</p>
        </div>
        <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20">Elite Feature</Badge>
      </div>

      {/* Configuración */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="pt-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-[#8a8d9e] block mb-1">Deporte / Disciplina</label>
              <Input value={deporte} onChange={e => setDeporte(e.target.value)} placeholder="Ej: ciclismo, futbol..." className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-xs text-[#8a8d9e] block mb-1">Semana del mesociclo</label>
              <Input type="number" min={1} max={52} value={semanaActual} onChange={e => setSemanaActual(parseInt(e.target.value) || 1)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            </div>
            <div>
              <label className="text-xs text-[#8a8d9e] block mb-1">Macros base (cal/p/c/g)</label>
              <div className="flex gap-1">
                <Input type="number" value={macrosBase.cal} onChange={e => setMacrosBase({ ...macrosBase, cal: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" placeholder="kcal" />
                <Input type="number" value={macrosBase.p} onChange={e => setMacrosBase({ ...macrosBase, p: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" placeholder="P" />
                <Input type="number" value={macrosBase.c} onChange={e => setMacrosBase({ ...macrosBase, c: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" placeholder="C" />
                <Input type="number" value={macrosBase.g} onChange={e => setMacrosBase({ ...macrosBase, g: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" placeholder="G" />
              </div>
            </div>
          </div>
          {deporte && (
            <p className="text-xs text-[#8a8d9e]">
              <AlertTriangle className="w-3 h-3 inline mr-1 text-[#f59e0b]" />
              Recomendado para {deporte}: <span className="text-[#D4FF00] font-semibold">{deporteInfo.recomendado}</span> · Mesociclo típico: {deporteInfo.semanasTotales} semanas
            </p>
          )}
        </CardContent>
      </Card>

      {/* Fase actual */}
      <Card className={`border-[#1e1f2e] ${fase.color.replace('bg-', 'bg-opacity-10 ')}`} style={{ background: fase.color.includes('D4FF00') ? '#D4FF0010' : fase.color.includes('22c55e') ? '#22c55e10' : fase.color.includes('f59e0b') ? '#f59e0b10' : fase.color.includes('6366f1') ? '#6366f110' : fase.color.includes('06b6d4') ? '#06b6d410' : '#8a8d9e10' }}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${fase.color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-[#f0f0f5]">Semana {semanaActual}: {fase.nombre}</CardTitle>
              <p className="text-xs text-[#8a8d9e]">{fase.descripcion}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Macros ajustados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Calorías', base: macrosBase.cal, ajust: ajustados.cal, pct: fase.ajusteCalorias, color: 'text-[#f59e0b]', bar: 'bg-[#f59e0b]' },
              { label: 'Proteínas', base: macrosBase.p, ajust: ajustados.p, pct: fase.ajusteProteinas, color: 'text-[#ef4444]', bar: 'bg-[#ef4444]' },
              { label: 'Carbs', base: macrosBase.c, ajust: ajustados.c, pct: fase.ajusteCarbs, color: 'text-[#22c55e]', bar: 'bg-[#22c55e]' },
              { label: 'Grasas', base: macrosBase.g, ajust: ajustados.g, pct: fase.ajusteGrasas, color: 'text-[#6366f1]', bar: 'bg-[#6366f1]' },
            ].map(item => (
              <div key={item.label} className="bg-[#0a0b0f] rounded-lg p-3 border border-[#1e1f2e] text-center">
                <p className="text-[10px] text-[#8a8d9e] uppercase">{item.label}</p>
                <p className={`text-xl font-bold ${item.color}`}>{item.ajust}</p>
                <p className="text-[10px] text-[#55576b]">Base: {item.base} × {item.pct}</p>
                <div className="w-full h-1.5 bg-[#1e1f2e] rounded-full mt-1 overflow-hidden">
                  <div className={`h-full ${item.bar} rounded-full`} style={{ width: `${Math.min(item.pct * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Timing e hidratación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#0a0b0f] rounded-lg p-3 border border-[#1e1f2e]">
              <p className="text-xs font-semibold text-[#D4FF00] mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Timing Nutricional</p>
              <p className="text-xs text-[#8a8d9e]">{fase.timing}</p>
            </div>
            <div className="bg-[#0a0b0f] rounded-lg p-3 border border-[#1e1f2e]">
              <p className="text-xs font-semibold text-[#06b6d4] mb-1 flex items-center gap-1"><Droplets className="w-3 h-3" /> Hidratación Extra</p>
              <p className="text-xs text-[#8a8d9e]">+{fase.hidratacionExtra} litros sobre base</p>
              <p className="text-xs text-[#55576b] mt-1">Electrolitos recomendados en sesiones &gt; 90 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendario visual del mesociclo */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5]">Calendario del Mesociclo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {Array.from({ length: deporteInfo.semanasTotales || 12 }).map((_, i) => {
              const sem = i + 1;
              let color = 'bg-[#1e1f2e]';
              if (sem <= 2) color = 'bg-[#8a8d9e]';
              else if (sem <= deporteInfo.semanasTotales * 0.5) color = 'bg-[#22c55e]';
              else if (sem <= deporteInfo.semanasTotales * 0.75) color = 'bg-[#f59e0b]';
              else if (sem <= deporteInfo.semanasTotales * 0.9) color = 'bg-[#6366f1]';
              else color = 'bg-[#D4FF00]';
              const isCurrent = sem === semanaActual;
              return (
                <button
                  key={i}
                  onClick={() => setSemanaActual(sem)}
                  className={`min-w-[28px] h-8 rounded text-[10px] font-bold flex items-center justify-center transition-all ${color} ${isCurrent ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                  title={`Semana ${sem}`}
                >
                  {sem}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[10px] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8a8d9e]" /> Transición</span>
            <span className="text-[10px] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22c55e]" /> Volumen</span>
            <span className="text-[10px] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Intensidad</span>
            <span className="text-[10px] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#6366f1]" /> Tapering</span>
            <span className="text-[10px] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D4FF00]" /> Competencia</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
