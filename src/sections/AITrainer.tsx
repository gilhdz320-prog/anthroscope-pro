import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dumbbell, Clock, Target, Zap, TrendingUp, Calendar, ChevronRight, Sparkles, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export interface PlanEntrenamiento {
  nombre: string;
  deporte: string;
  nivel: string;
  duracionSemanas: number;
  diasSemana: number;
  objetivo: string;
  equipo: string[];
  restricciones: string;
  semanas: SemanaEntrenamiento[];
  notasGenerales: string;
}

export interface SemanaEntrenamiento {
  semana: number;
  fase: string;
  intensidad: string;
  volumen: string;
  dias: DiaEntrenamiento[];
}

export interface DiaEntrenamiento {
  dia: number;
  nombre: string;
  focus: string;
  ejercicios: Ejercicio[];
  duracion: string;
  notas: string;
}

export interface Ejercicio {
  nombre: string;
  series: number;
  reps: string;
  rpe: string;
  descanso: string;
  notas?: string;
}

const DEPORTES = ['Halterofilia', 'Powerlifting', 'CrossFit', 'Fútbol', 'Natación', 'Atletismo', 'Ciclismo', 'Triatlón', 'Baloncesto', 'Voleibol', 'Artes Marciales', 'Otro'];
const NIVELES = ['Principiante (< 6 meses)', 'Intermedio (6 meses - 2 años)', 'Avanzado (> 2 años)', 'Elite'];
const OBJETIVOS = ['Fuerza máxima', 'Hipertrofia', 'Resistencia', 'Potencia', 'Velocidad', 'Pérdida de grasa', 'Recomposición', 'Rehabilitación'];
const EQUIPOS = [
  { id: 'barra', label: 'Barra + Discos' },
  { id: 'mancuernas', label: 'Mancuernas' },
  { id: 'maquinas', label: 'Máquinas de gimnasio' },
  { id: 'cables', label: 'Poleas/Cables' },
  { id: 'peso-corporal', label: 'Peso corporal' },
  { id: 'kettlebells', label: 'Kettlebells' },
  { id: 'bandas', label: 'Bandas elásticas' },
  { id: 'colchoneta', label: 'Colchoneta' },
  { id: 'cinta', label: 'Cinta de correr' },
  { id: 'bici', label: 'Bicicleta estática' },
  { id: 'remo', label: 'Remo indoor' },
];

// Plantillas pre-generadas de alta calidad
const TEMPLATES: Record<string, Partial<PlanEntrenamiento>> = {
  halterofilia_principiante: {
    nombre: 'Introducción a la Halterofilia',
    duracionSemanas: 8,
    diasSemana: 3,
    notasGenerales: 'Priorizar técnica sobre peso. Video todas las sesiones. Descanso completo entre días.',
    semanas: [
      {
        semana: 1, fase: 'Adaptación Anatómica', intensidad: 'RPE 5-6', volumen: 'Bajo',
        dias: [
          {
            dia: 1, nombre: 'Arranque + Sentadilla', focus: 'Técnica de tirón + patrón de sentadilla',
            duracion: '60-75 min',
            ejercicios: [
              { nombre: 'Arranque desde bloques (técnica)', series: 5, reps: '3', rpe: '5', descanso: '2 min' },
              { nombre: 'Sentadilla trasera', series: 4, reps: '5', rpe: '6', descanso: '3 min' },
              { nombre: 'Peso muerto rumano', series: 3, reps: '8', rpe: '6', descanso: '2 min' },
              { nombre: 'Puente de glúteos', series: 3, reps: '12', rpe: '7', descanso: '90s' },
              { nombre: 'Core: Plancha + Dead bug', series: 3, reps: '30s c/u', rpe: '6', descanso: '60s' },
            ],
            notas: 'Foco 100% en posición de inicio y trayectoria de barra. No maximizar peso.'
          },
          {
            dia: 2, nombre: 'Descanso Activo / Movilidad', focus: 'Recuperación y movilidad articular',
            duracion: '30-45 min',
            ejercicios: [
              { nombre: 'Caminata / Bici suave', series: 1, reps: '20 min', rpe: '4', descanso: 'N/A' },
              { nombre: 'Movilidad de hombros y cadera', series: 2, reps: '10 min', rpe: '3', descanso: 'N/A' },
              { nombre: 'Foam rolling: espalda, IT band', series: 1, reps: '10 min', rpe: '3', descanso: 'N/A' },
            ],
            notas: 'Día de recuperación activa. No forzar nada.'
          },
          {
            dia: 3, nombre: 'Envión + Tirón', focus: 'Técnica de envión + fuerza de tirón',
            duracion: '60-75 min',
            ejercicios: [
              { nombre: 'Envión desde bloques (técnica)', series: 5, reps: '3', rpe: '5', descanso: '2 min' },
              { nombre: 'Press militar', series: 4, reps: '5', rpe: '6', descanso: '2 min' },
              { nombre: 'Dominadas', series: 3, reps: '6-8', rpe: '7', descanso: '2 min' },
              { nombre: 'Remo unilateral', series: 3, reps: '10', rpe: '6', descanso: '90s' },
              { nombre: 'Face pulls', series: 3, reps: '15', rpe: '6', descanso: '60s' },
            ],
            notas: 'Posición de recepción en envión: pies anchos, codos altos.'
          },
        ]
      },
      {
        semana: 4, fase: 'Fuerza Base', intensidad: 'RPE 6-7', volumen: 'Moderado',
        dias: [
          {
            dia: 1, nombre: 'Arranque + Sentadilla', focus: 'Velocidad de barra + fuerza',
            duracion: '75-90 min',
            ejercicios: [
              { nombre: 'Arranque (completo)', series: 5, reps: '2', rpe: '7', descanso: '3 min' },
              { nombre: 'Sentadilla trasera', series: 5, reps: '3', rpe: '7', descanso: '3-4 min' },
              { nombre: 'Peso muerto', series: 3, reps: '5', rpe: '7', descanso: '3 min' },
              { nombre: 'Sentadilla búlgara', series: 3, reps: '8', rpe: '7', descanso: '2 min' },
              { nombre: 'Core: Rollouts + Pallof', series: 3, reps: '10 + 20s', rpe: '7', descanso: '90s' },
            ],
            notas: 'Aumentar peso gradualmente. Primera semana con peso significativo.'
          },
          {
            dia: 2, nombre: 'Descanso Activo', focus: 'Recuperación',
            duracion: '30-45 min', ejercicios: [
              { nombre: 'Bici / Caminata', series: 1, reps: '25 min', rpe: '4', descanso: 'N/A' },
              { nombre: 'Estiramientos dinámicos', series: 2, reps: '10 min', rpe: '3', descanso: 'N/A' },
            ],
            notas: 'Día de recuperación activa.'
          },
          {
            dia: 3, nombre: 'Envión + Tirón', focus: 'Potencia de envión + fuerza de espalda',
            duracion: '75-90 min',
            ejercicios: [
              { nombre: 'Envión (completo)', series: 5, reps: '2', rpe: '7', descanso: '3 min' },
              { nombre: 'Press de banca', series: 4, reps: '4', rpe: '7', descanso: '3 min' },
              { nombre: 'Dominadas con peso', series: 3, reps: '5', rpe: '7', descanso: '2 min' },
              { nombre: 'Press militar', series: 4, reps: '4', rpe: '7', descanso: '2 min' },
              { nombre: 'Curl de bíceps', series: 3, reps: '10', rpe: '7', descanso: '60s' },
            ],
            notas: 'Envión: no rebote en recepción. Controlar descenso.'
          },
        ]
      },
    ]
  },
};

function generarPlanDemo(deporte: string, nivel: string, objetivo: string, diasSemana: number, semanas: number): PlanEntrenamiento {
  const base = TEMPLATES.halterofilia_principiante;
  return {
    nombre: `${objetivo} - ${deporte} (${nivel})`,
    deporte,
    nivel,
    duracionSemanas: semanas,
    diasSemana,
    objetivo,
    equipo: ['Barra + Discos', 'Mancuernas'],
    restricciones: '',
    semanas: base.semanas || [],
    notasGenerales: base.notasGenerales || 'Plan generado en modo demo. Conecta el backend para planes personalizados con Claude AI.',
  };
}

export function AITrainer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [deporte, setDeporte] = useState('Halterofilia');
  const [nivel, setNivel] = useState('Intermedio (6 meses - 2 años)');
  const [objetivo, setObjetivo] = useState('Fuerza máxima');
  const [diasSemana, setDiasSemana] = useState(4);
  const [semanas, setSemanas] = useState(8);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<string[]>(['barra', 'mancuernas']);
  const [restricciones, setRestricciones] = useState('');
  const [plan, setPlan] = useState<PlanEntrenamiento | null>(null);
  const [generando, setGenerando] = useState(false);
  const [semanaActiva, setSemanaActiva] = useState(0);

  const toggleEquipo = (id: string) => {
    setEquipoSeleccionado(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const generarPlan = () => {
    setGenerando(true);
    setTimeout(() => {
      const nuevoPlan = generarPlanDemo(deporte, nivel, objetivo, diasSemana, semanas);
      if (restricciones) nuevoPlan.restricciones = restricciones;
      nuevoPlan.equipo = EQUIPOS.filter(e => equipoSeleccionado.includes(e.id)).map(e => e.label);
      setPlan(nuevoPlan);
      setSemanaActiva(0);
      setGenerando(false);
      toast.success(isEn ? 'Training plan generated!' : '¡Plan de entrenamiento generado!');
    }, 1500);
  };

  const exportarPlan = () => {
    if (!plan) return;
    const contenido = generarTextoPlan(plan, isEn);
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Plan_${plan.deporte}_${plan.objetivo}.txt`.replace(/\s+/g, '_');
    a.click();
    URL.revokeObjectURL(url);
    toast.success(isEn ? 'Plan downloaded' : 'Plan descargado');
  };

  const compartirWhatsApp = () => {
    if (!plan) return;
    const texto = encodeURIComponent(`🎯 *${plan.nombre}*\n\n${generarResumenCorto(plan)}`);
    window.open(`https://wa.me/?text=${texto}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#f0f0f5] flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-[#c8ff00]" />
            {isEn ? 'AI Trainer' : 'Entrenador IA'}
          </h2>
          <p className="text-sm text-[#8a8d9e] mt-1">
            {isEn ? 'Generate personalized training plans based on sport, level and goals' : 'Genera planes de entrenamiento personalizados según deporte, nivel y objetivos'}
          </p>
        </div>
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
          {isEn ? 'DEMO MODE' : 'MODO DEMO'}
        </Badge>
      </div>

      {!plan ? (
        <Card className="p-6 bg-[#11121a] border-[#2a2d3e]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#8a8d9e] mb-1.5 block">{isEn ? 'Sport' : 'Deporte'}</Label>
              <Select value={deporte} onValueChange={setDeporte}>
                <SelectTrigger className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#1a1c29] border-[#2a2d3e]">
                  {DEPORTES.map(d => <SelectItem key={d} value={d} className="text-[#f0f0f5]">{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#8a8d9e] mb-1.5 block">{isEn ? 'Level' : 'Nivel'}</Label>
              <Select value={nivel} onValueChange={setNivel}>
                <SelectTrigger className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#1a1c29] border-[#2a2d3e]">
                  {NIVELES.map(n => <SelectItem key={n} value={n} className="text-[#f0f0f5]">{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#8a8d9e] mb-1.5 block">{isEn ? 'Goal' : 'Objetivo'}</Label>
              <Select value={objetivo} onValueChange={setObjetivo}>
                <SelectTrigger className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#1a1c29] border-[#2a2d3e]">
                  {OBJETIVOS.map(o => <SelectItem key={o} value={o} className="text-[#f0f0f5]">{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-[#8a8d9e] mb-1.5 block">{isEn ? 'Days/week' : 'Días/semana'}</Label>
                <Input type="number" min={1} max={7} value={diasSemana} onChange={e => setDiasSemana(Number(e.target.value))} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
              <div>
                <Label className="text-[#8a8d9e] mb-1.5 block">{isEn ? 'Weeks' : 'Semanas'}</Label>
                <Input type="number" min={1} max={52} value={semanas} onChange={e => setSemanas(Number(e.target.value))} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-[#8a8d9e] mb-2 block">{isEn ? 'Available equipment' : 'Equipo disponible'}</Label>
            <div className="flex flex-wrap gap-2">
              {EQUIPOS.map(e => (
                <button
                  key={e.id}
                  onClick={() => toggleEquipo(e.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    equipoSeleccionado.includes(e.id)
                      ? 'bg-[#c8ff00]/20 border-[#c8ff00]/50 text-[#c8ff00]'
                      : 'bg-[#1a1c29] border-[#2a2d3e] text-[#8a8d9e] hover:border-[#3a3d4e]'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-[#8a8d9e] mb-1.5 block">{isEn ? 'Restrictions / Injuries' : 'Restricciones / Lesiones'}</Label>
            <Textarea
              value={restricciones}
              onChange={e => setRestricciones(e.target.value)}
              placeholder={isEn ? 'E.g.: shoulder injury, avoid squats, etc.' : 'Ej.: lesión de hombro, evitar sentadillas, etc.'}
              className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]"
              rows={2}
            />
          </div>

          <Button
            className="w-full mt-6 bg-[#c8ff00] text-black font-bold hover:bg-[#d4ff33]"
            size="lg"
            onClick={generarPlan}
            disabled={generando}
          >
            {generando ? <Clock className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {isEn ? 'Generate Training Plan' : 'Generar Plan de Entrenamiento'}
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Plan header */}
          <Card className="p-5 bg-[#11121a] border-[#2a2d3e]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#f0f0f5]">{plan.nombre}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-[#c8ff00]/20 text-[#c8ff00]">{plan.deporte}</Badge>
                  <Badge className="bg-blue-500/20 text-blue-400">{plan.nivel}</Badge>
                  <Badge className="bg-purple-500/20 text-purple-400">{plan.objetivo}</Badge>
                  <Badge className="bg-orange-500/20 text-orange-400">{plan.diasSemana} días/semana</Badge>
                  <Badge className="bg-green-500/20 text-green-400">{plan.duracionSemanas} semanas</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-[#2a2d3e] text-[#f0f0f5]" onClick={exportarPlan}>
                  <Download className="w-4 h-4 mr-1" /> {isEn ? 'Export' : 'Exportar'}
                </Button>
                <Button variant="outline" size="sm" className="border-[#2a2d3e] text-[#f0f0f5]" onClick={compartirWhatsApp}>
                  <Share2 className="w-4 h-4 mr-1" /> WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="border-[#2a2d3e] text-[#8a8d9e]" onClick={() => setPlan(null)}>
                  {isEn ? 'New plan' : 'Nuevo plan'}
                </Button>
              </div>
            </div>
            {plan.notasGenerales && (
              <p className="text-sm text-[#8a8d9e] mt-3 p-3 bg-[#c8ff00]/5 rounded-lg border border-[#c8ff00]/10">
                <Zap className="w-4 h-4 inline mr-1 text-[#c8ff00]" /> {plan.notasGenerales}
              </p>
            )}
          </Card>

          {/* Week selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {plan.semanas.map((s, i) => (
              <button
                key={i}
                onClick={() => setSemanaActiva(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  semanaActiva === i
                    ? 'bg-[#c8ff00]/20 text-[#c8ff00] border border-[#c8ff00]/40'
                    : 'bg-[#1a1c29] text-[#8a8d9e] border border-[#2a2d3e] hover:border-[#3a3d4e]'
                }`}
              >
                <Calendar className="w-3 h-3 inline mr-1" />
                {isEn ? 'Week' : 'Sem'} {s.semana}
              </button>
            ))}
          </div>

          {/* Week details */}
          {plan.semanas[semanaActiva] && (
            <Card className="p-5 bg-[#11121a] border-[#2a2d3e]">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-[#c8ff00]" />
                <div>
                  <h4 className="font-bold text-[#f0f0f5]">
                    {isEn ? 'Week' : 'Semana'} {plan.semanas[semanaActiva].semana}: {plan.semanas[semanaActiva].fase}
                  </h4>
                  <p className="text-xs text-[#8a8d9e]">
                    {isEn ? 'Intensity' : 'Intensidad'}: {plan.semanas[semanaActiva].intensidad} | {isEn ? 'Volume' : 'Volumen'}: {plan.semanas[semanaActiva].volumen}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {plan.semanas[semanaActiva].dias.map((dia, di) => (
                  <div key={di} className="border border-[#2a2d3e] rounded-lg p-4 bg-[#0d0e14]">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-[#f0f0f5] flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#c8ff00]" />
                        {dia.nombre}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-[#8a8d9e]">
                        <Clock className="w-3 h-3" /> {dia.duracion}
                        <Badge className="bg-[#2a2d3e] text-[#8a8d9e] text-[10px]">{dia.focus}</Badge>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#2a2d3e] text-[#8a8d9e] text-xs">
                            <th className="text-left py-2 px-2">{isEn ? 'Exercise' : 'Ejercicio'}</th>
                            <th className="text-center py-2 px-2">{isEn ? 'Sets' : 'Series'}</th>
                            <th className="text-center py-2 px-2">{isEn ? 'Reps' : 'Reps'}</th>
                            <th className="text-center py-2 px-2">RPE</th>
                            <th className="text-center py-2 px-2">{isEn ? 'Rest' : 'Descanso'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dia.ejercicios.map((ej, ei) => (
                            <tr key={ei} className="border-b border-[#1e2030]/50">
                              <td className="py-2 px-2 text-[#f0f0f5]">{ej.nombre}</td>
                              <td className="py-2 px-2 text-center text-[#c8ff00]">{ej.series}</td>
                              <td className="py-2 px-2 text-center text-[#8a8d9e]">{ej.reps}</td>
                              <td className="py-2 px-2 text-center">
                                <Badge className={`text-[10px] ${getRPEColor(ej.rpe)}`}>{ej.rpe}</Badge>
                              </td>
                              <td className="py-2 px-2 text-center text-[#8a8d9e]">{ej.descanso}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {dia.notas && (
                      <p className="text-xs text-[#8a8d9e] mt-2 p-2 bg-[#1a1c29] rounded">{dia.notas}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function getRPEColor(rpe: string): string {
  const num = parseInt(rpe);
  if (num <= 5) return 'bg-green-500/20 text-green-400';
  if (num <= 7) return 'bg-blue-500/20 text-blue-400';
  if (num <= 8) return 'bg-orange-500/20 text-orange-400';
  return 'bg-red-500/20 text-red-400';
}

function generarTextoPlan(plan: PlanEntrenamiento, isEn: boolean): string {
  let text = `🏋️ ${plan.nombre.toUpperCase()}\n`;
  text += `${plan.deporte} | ${plan.nivel} | ${plan.objetivo}\n`;
  text += `${plan.diasSemana} días/semana | ${plan.duracionSemanas} semanas\n\n`;
  text += `NOTAS: ${plan.notasGenerales}\n\n`;

  plan.semanas.forEach(s => {
    text += `=== SEMANA ${s.semana}: ${s.fase} ===\n`;
    text += `Intensidad: ${s.intensidad} | Volumen: ${s.volumen}\n\n`;
    s.dias.forEach(d => {
      text += `[${d.nombre}] ${d.duracion}\n`;
      text += `Focus: ${d.focus}\n`;
      d.ejercicios.forEach(e => {
        text += `  • ${e.nombre}: ${e.series} series x ${e.reps} @ RPE ${e.rpe} (${e.descanso})\n`;
      });
      if (d.notas) text += `  Notas: ${d.notas}\n`;
      text += `\n`;
    });
  });

  return text;
}

function generarResumenCorto(plan: PlanEntrenamiento): string {
  let text = `*${plan.nombre}*\n`;
  text += `${plan.duracionSemanas} semanas | ${plan.diasSemana} días/semana | ${plan.objetivo}\n\n`;
  plan.semanas.slice(0, 2).forEach(s => {
    text += `*Semana ${s.semana}* (${s.fase}):\n`;
    s.dias.forEach(d => {
      text += `• ${d.nombre}: ${d.ejercicios.length} ejercicios (${d.duracion})\n`;
    });
    text += `\n`;
  });
  return text;
}
