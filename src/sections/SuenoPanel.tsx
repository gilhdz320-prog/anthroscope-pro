import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Moon, Clock, Star, TrendingUp, BookOpen, Check, Sun, Smartphone, Coffee } from 'lucide-react';
import { toast } from 'sonner';

export interface RegistroSueno {
  id: string;
  fecha: string;
  horas: number;
  calidad: number; // 1-5
  horaDormir: string;
  horaDespertar: string;
  habitos: {
    sinPantallas: boolean;
    cafeTarde: boolean;
    alcohol: boolean;
    ejercicio: boolean;
    rutina: boolean;
  };
  notas: string;
}

const HABITOS_KEY = [
  { key: 'sinPantallas' as const, icon: Smartphone, label: 'Sin pantallas 1h antes', labelEn: 'No screens 1h before bed' },
  { key: 'cafeTarde' as const, icon: Coffee, label: 'Sin cafe después mediodía', labelEn: 'No coffee after noon' },
  { key: 'alcohol' as const, icon: Moon, label: 'Sin alcohol', labelEn: 'No alcohol' },
  { key: 'ejercicio' as const, icon: TrendingUp, label: 'Ejercicio hoy', labelEn: 'Exercised today' },
  { key: 'rutina' as const, icon: Clock, label: 'Ritmo regular (±30min)', labelEn: 'Consistent schedule (±30min)' },
];

const RECOMENDACIONES = [
  { min: 0, max: 5, es: '⚠️ Crítico: El déficit de sueño afecta recuperación muscular, hormonas y rendimiento. Prioriza 7-9h.', en: '⚠️ Critical: Sleep deficit affects muscle recovery, hormones, and performance. Prioritize 7-9h.' },
  { min: 5, max: 6, es: '😴 Insuficiente: Aumenta cortisol, reduce testosterona. Intenta dormir 30-60 min más.', en: '😴 Insufficient: Increases cortisol, reduces testosterone. Try sleeping 30-60 min more.' },
  { min: 6, max: 7, es: '⚡ Mejorable: Estás cerca del óptimo. Mejora hábitos de higiene del sueño.', en: '⚡ Could improve: You\'re close to optimal. Improve sleep hygiene habits.' },
  { min: 7, max: 9, es: '✅ Óptimo: 7-9h es el rango ideal para atletas (Watson et al., 2015).', en: '✅ Optimal: 7-9h is the ideal range for athletes (Watson et al., 2015).' },
  { min: 9, max: 24, es: '😴 Excesivo: >9h puede indicar sobreentrenamiento o fatiga acumulada.', en: '😴 Excessive: >9h may indicate overtraining or accumulated fatigue.' },
];

export function SuenoPanel() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [registros, setRegistros] = useState<RegistroSueno[]>(() => {
    const saved = localStorage.getItem('anthroscope_sueno');
    return saved ? JSON.parse(saved) : [];
  });
  const [horas, setHoras] = useState([7.5]);
  const [calidad, setCalidad] = useState(4);
  const [horaDormir, setHoraDormir] = useState('22:30');
  const [horaDespertar, setHoraDespertar] = useState('06:00');
  const [habitos, setHabitos] = useState({ sinPantallas: false, cafeTarde: false, alcohol: false, ejercicio: false, rutina: false });
  const [notas, setNotas] = useState('');

  useEffect(() => {
    localStorage.setItem('anthroscope_sueno', JSON.stringify(registros));
  }, [registros]);

  const promedioHoras = useMemo(() => {
    if (registros.length === 0) return 0;
    return registros.reduce((acc, r) => acc + r.horas, 0) / registros.length;
  }, [registros]);

  const promedioCalidad = useMemo(() => {
    if (registros.length === 0) return 0;
    return registros.reduce((acc, r) => acc + r.calidad, 0) / registros.length;
  }, [registros]);

  const suenoUltimaSemana = useMemo(() => {
    const hoy = new Date();
    const semanaAtras = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
    return registros.filter(r => new Date(r.fecha) >= semanaAtras);
  }, [registros]);

  const recomendacion = useMemo(() => {
    const h = promedioHoras;
    const rec = RECOMENDACIONES.find(r => h >= r.min && h < r.max);
    return rec ? (isEn ? rec.en : rec.es) : '';
  }, [promedioHoras, isEn]);

  const scoreSueno = useMemo(() => {
    // 0-100 score
    let score = 0;
    if (promedioHoras >= 7 && promedioHoras <= 9) score += 40;
    else if (promedioHoras >= 6) score += 25;
    else if (promedioHoras >= 5) score += 15;

    if (promedioCalidad >= 4) score += 30;
    else if (promedioCalidad >= 3) score += 20;
    else score += 10;

    const ultimosHabitos = registros.length > 0 ? registros[registros.length - 1].habitos : habitos;
    const habitosCount = Object.values(ultimosHabitos).filter(Boolean).length;
    score += habitosCount * 6; // max 30

    return Math.min(100, score);
  }, [promedioHoras, promedioCalidad, registros, habitos]);

  const guardarRegistro = () => {
    const registro: RegistroSueno = {
      id: 's' + Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      horas: horas[0],
      calidad,
      horaDormir,
      horaDespertar,
      habitos: { ...habitos },
      notas,
    };

    setRegistros(prev => {
      // Si ya existe registro de hoy, reemplazar
      const filtered = prev.filter(r => r.fecha !== registro.fecha);
      return [...filtered, registro].sort((a, b) => a.fecha.localeCompare(b.fecha));
    });
    toast.success(isEn ? 'Sleep log saved!' : '¡Registro de sueño guardado!');
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-400';
    if (s >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#f0f0f5] flex items-center gap-2">
          <Moon className="w-6 h-6 text-[#c8ff00]" />
          {isEn ? 'Sleep & Recovery' : 'Sueño y Recuperación'}
        </h2>
        <p className="text-sm text-[#8a8d9e] mt-1">
          {isEn ? 'Track sleep quality, habits and recovery metrics' : 'Registra calidad de sueño, hábitos y métricas de recuperación'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e] text-center">
          <Clock className="w-5 h-5 text-[#c8ff00] mx-auto mb-1" />
          <div className="text-2xl font-bold text-[#f0f0f5]">{promedioHoras.toFixed(1)}h</div>
          <div className="text-[10px] text-[#8a8d9e]">{isEn ? 'Avg sleep' : 'Prom. sueño'}</div>
        </Card>
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e] text-center">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-[#f0f0f5]">{promedioCalidad.toFixed(1)}/5</div>
          <div className="text-[10px] text-[#8a8d9e]">{isEn ? 'Avg quality' : 'Prom. calidad'}</div>
        </Card>
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e] text-center">
          <Sun className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-[#f0f0f5]">{suenoUltimaSemana.length}/7</div>
          <div className="text-[10px] text-[#8a8d9e]">{isEn ? 'Days tracked' : 'Días registrados'}</div>
        </Card>
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e] text-center">
          <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className={`text-2xl font-bold ${getScoreColor(scoreSueno)}`}>{scoreSueno}</div>
          <div className="text-[10px] text-[#8a8d9e]">Sleep Score</div>
        </Card>
      </div>

      {/* Recommendation */}
      {recomendacion && (
        <Card className="p-4 bg-[#c8ff00]/5 border-[#c8ff00]/20">
          <p className="text-sm text-[#f0f0f5]">{recomendacion}</p>
          <p className="text-[10px] text-[#8a8d9e] mt-1">
            <BookOpen className="w-3 h-3 inline mr-1" />
            {isEn ? 'Reference: Watson et al., Sleep Health (2015) / NCAA guidelines' : 'Referencia: Watson et al., Sleep Health (2015) / NCAA guidelines'}
          </p>
        </Card>
      )}

      {/* Sleep Log Form */}
      <Card className="p-5 bg-[#11121a] border-[#2a2d3e]">
        <h3 className="text-lg font-bold text-[#f0f0f5] mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5 text-[#c8ff00]" />
          {isEn ? 'Today\'s Sleep Log' : 'Registro de Hoy'}
        </h3>

        <div className="space-y-4">
          {/* Hours slider */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm text-[#8a8d9e]">{isEn ? 'Hours slept' : 'Horas dormidas'}</Label>
              <span className="text-sm font-bold text-[#c8ff00]">{horas[0]}h</span>
            </div>
            <Slider value={horas} onValueChange={setHoras} min={0} max={12} step={0.5} className="w-full" />
          </div>

          {/* Quality stars */}
          <div>
            <Label className="text-sm text-[#8a8d9e] mb-2 block">
              {isEn ? 'Sleep quality (1-5)' : 'Calidad del sueño (1-5)'}
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setCalidad(s)}
                  className={`p-2 rounded-lg transition-all ${
                    calidad >= s ? 'bg-amber-500/20 text-amber-400' : 'bg-[#1a1c29] text-[#55576b]'
                  }`}
                >
                  <Star className={`w-5 h-5 ${calidad >= s ? 'fill-amber-400' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Bed/wake times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-[#8a8d9e] mb-1 block">{isEn ? 'Bedtime' : 'Hora de dormir'}</Label>
              <Input type="time" value={horaDormir} onChange={e => setHoraDormir(e.target.value)} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
            </div>
            <div>
              <Label className="text-xs text-[#8a8d9e] mb-1 block">{isEn ? 'Wake time' : 'Hora de despertar'}</Label>
              <Input type="time" value={horaDespertar} onChange={e => setHoraDespertar(e.target.value)} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
            </div>
          </div>

          {/* Habits */}
          <div>
            <Label className="text-sm text-[#8a8d9e] mb-2 block">{isEn ? 'Sleep habits' : 'Hábitos de sueño'}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {HABITOS_KEY.map(h => (
                <label key={h.key} className="flex items-center gap-2 p-2 bg-[#1a1c29] rounded-lg cursor-pointer hover:bg-[#2a2d3e] transition-colors">
                  <Switch checked={habitos[h.key]} onCheckedChange={v => setHabitos(prev => ({ ...prev, [h.key]: v }))} />
                  <h.icon className="w-4 h-4 text-[#8a8d9e]" />
                  <span className="text-xs text-[#f0f0f5]">{isEn ? h.labelEn : h.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-xs text-[#8a8d9e] mb-1 block">{isEn ? 'Notes' : 'Notas'}</Label>
            <Input value={notas} onChange={e => setNotas(e.target.value)} placeholder={isEn ? 'How did you feel waking up?' : '¿Cómo te sentiste al despertar?'} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
          </div>

          <Button className="w-full bg-[#c8ff00] text-black font-bold hover:bg-[#d4ff33]" onClick={guardarRegistro}>
            <Check className="w-4 h-4 mr-2" /> {isEn ? 'Save Sleep Log' : 'Guardar Registro'}
          </Button>
        </div>
      </Card>

      {/* Sleep hygiene tips */}
      <Card className="p-5 bg-[#11121a] border-[#2a2d3e]">
        <h3 className="text-lg font-bold text-[#f0f0f5] mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#c8ff00]" />
          {isEn ? 'Sleep Hygiene Protocol' : 'Protocolo de Higiene del Sueño'}
        </h3>
        <div className="space-y-2">
          {(isEn ? [
            '1. Consistent schedule: ±30 min daily (circadian rhythm)',
            '2. Total darkness: blackout curtains or eye mask (melatonin production)',
            '3. No screens 2-3h before bed: blue light suppresses melatonin',
            '4. Room temperature: 18-20°C optimal for deep sleep',
            '5. Last meal: 3h before bed (digestion affects sleep quality)',
            '6. Caffeine cutoff: noon (half-life ~5-6h)',
            '7. Magnesium: 200-400mg before bed (muscle relaxation)',
            '8. Exercise timing: finish 3h before bed (except light yoga)',
          ] : [
            '1. Ritmo regular: ±30 min diarios (ritmo circadiano)',
            '2. Oscuridad total: cortinas blackout o antifaz (producción de melatonina)',
            '3. Sin pantallas 2-3h antes: la luz azul suprime melatonina',
            '4. Temperatura ambiente: 18-20°C óptimo para sueño profundo',
            '5. Última comida: 3h antes de dormir (digestión afecta calidad)',
            '6. Límite cafeína: mediodía (vida media ~5-6h)',
            '7. Magnesio: 200-400mg antes de dormir (relajación muscular)',
            '8. Timing de ejercicio: terminar 3h antes (excepto yoga ligero)',
          ]).map((tip, i) => (
            <p key={i} className="text-xs text-[#b0b3c7] flex items-start gap-2">
              <Check className="w-3 h-3 text-[#c8ff00] mt-0.5 shrink-0" />
              {tip}
            </p>
          ))}
        </div>
        <p className="text-[10px] text-[#55576b] mt-3">
          {isEn ? 'Refs: Watson et al. 2015, NCAA Sleep Guidelines, CSEP Position Stand' : 'Refs: Watson et al. 2015, NCAA Sleep Guidelines, CSEP Position Stand'}
        </p>
      </Card>

      {/* History */}
      {registros.length > 0 && (
        <Card className="p-5 bg-[#11121a] border-[#2a2d3e]">
          <h3 className="text-lg font-bold text-[#f0f0f5] mb-3">{isEn ? 'History' : 'Historial'}</h3>
          <div className="space-y-2">
            {registros.slice(-7).reverse().map(r => (
              <div key={r.id} className="flex items-center justify-between p-2 bg-[#1a1c29] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8a8d9e]">{r.fecha}</span>
                  <span className="text-sm font-bold text-[#f0f0f5]">{r.horas}h</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${r.calidad >= s ? 'text-amber-400 fill-amber-400' : 'text-[#55576b]'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  {Object.entries(r.habitos).filter(([_, v]) => v).length > 0 && (
                    <Badge className="bg-[#c8ff00]/20 text-[#c8ff00] text-[10px]">
                      {Object.entries(r.habitos).filter(([_, v]) => v).length} {isEn ? 'habits' : 'hábitos'}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
