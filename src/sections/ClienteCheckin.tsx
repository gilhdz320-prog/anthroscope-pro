import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'react-i18next';
import {
  Scale, Camera, Zap, Moon, Brain, Smile, Utensils,
  Dumbbell, Bed, Save, CheckCircle, TrendingUp, ChevronRight
} from 'lucide-react';

const STEPS = [
  { id: 'datos', icon: Scale, label: 'es' },
  { id: 'fotos', icon: Camera, label: 'es' },
  { id: 'metricas', icon: Zap, label: 'es' },
  { id: 'adherencia', icon: CheckCircle, label: 'es' },
  { id: 'notas', icon: Brain, label: 'es' },
];

export default function ClienteCheckin() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'es';
  const isEn = lang === 'en';

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [peso, setPeso] = useState('');
  const [energia, setEnergia] = useState([5]);
  const [suenoCalidad, setSuenoCalidad] = useState([5]);
  const [suenoHoras, setSuenoHoras] = useState('');
  const [estres, setEstres] = useState([5]);
  const [humor, setHumor] = useState([5]);
  const [hambre, setHambre] = useState([5]);
  const [adherenciaDieta, setAdherenciaDieta] = useState([80]);
  const [adherenciaEntreno, setAdherenciaEntreno] = useState([80]);
  const [adherenciaSueno, setAdherenciaSueno] = useState([80]);
  const [sintomas, setSintomas] = useState('');
  const [notas, setNotas] = useState('');

  const t = {
    es: {
      title: 'Check-in Semanal',
      subtitle: 'Semana 12 — Ayuda a tu coach a monitorear tu progreso',
      stepDatos: 'Datos Corporales',
      stepFotos: 'Fotos de Progreso',
      stepMetricas: 'Metricas Subjetivas',
      stepAdherencia: 'Adherencia al Plan',
      stepNotas: 'Notas y Sintomas',
      peso: 'Peso actual (kg)',
      pesoPlaceholder: 'Ej: 75.5',
      energia: 'Nivel de Energia',
      energiaLow: 'Muy baja',
      energiaHigh: 'Muy alta',
      suenoCalidad: 'Calidad de Sueno',
      suenoHoras: 'Horas de sueno',
      estres: 'Nivel de Estres',
      humor: 'Estado de Animo',
      hambre: 'Nivel de Hambre',
      adherenciaDieta: 'Adherencia a la Dieta',
      adherenciaEntreno: 'Adherencia al Entrenamiento',
      adherenciaSueno: 'Adherencia al Sueno',
      sintomas: 'Sintomas o molestias',
      sintomasPlaceholder: 'Ej: Dolor muscular, fatiga, retencion de liquidos...',
      notas: 'Notas adicionales',
      notasPlaceholder: 'Cualquier cosa que quieras compartir con tu coach...',
      fotosInfo: 'Sube 3 fotos: frontal, lateral y trasera. Usa la misma iluminacion y horario cada semana.',
      cambioFuerza: 'Como cambio tu fuerza esta semana?',
      cambioResistencia: 'Como cambio tu resistencia?',
      aumento: 'Aumento',
      mantuvo: 'Mantuvo',
      disminuyo: 'Disminuyo',
      save: 'Guardar Check-in',
      saving: 'Guardando...',
      saved: 'Check-in guardado!',
      prev: 'Anterior',
      next: 'Siguiente',
      reviewWithCoach: 'Tu coach revisara tu check-in en las proximas 24h',
    },
    en: {
      title: 'Weekly Check-in',
      subtitle: 'Week 12 — Help your coach monitor your progress',
      stepDatos: 'Body Data',
      stepFotos: 'Progress Photos',
      stepMetricas: 'Subjective Metrics',
      stepAdherencia: 'Plan Adherence',
      stepNotas: 'Notes & Symptoms',
      peso: 'Current weight (kg)',
      pesoPlaceholder: 'Ex: 75.5',
      energia: 'Energy Level',
      energiaLow: 'Very low',
      energiaHigh: 'Very high',
      suenoCalidad: 'Sleep Quality',
      suenoHoras: 'Sleep hours',
      estres: 'Stress Level',
      humor: 'Mood',
      hambre: 'Hunger Level',
      adherenciaDieta: 'Diet Adherence',
      adherenciaEntreno: 'Training Adherence',
      adherenciaSueno: 'Sleep Adherence',
      sintomas: 'Symptoms or discomfort',
      sintomasPlaceholder: 'Ex: Muscle soreness, fatigue, water retention...',
      notas: 'Additional notes',
      notasPlaceholder: 'Anything you want to share with your coach...',
      fotosInfo: 'Upload 3 photos: front, side and back. Use same lighting and time each week.',
      cambioFuerza: 'How did your strength change this week?',
      cambioResistencia: 'How did your endurance change?',
      aumento: 'Increased',
      mantuvo: 'Maintained',
      disminuyo: 'Decreased',
      save: 'Save Check-in',
      saving: 'Saving...',
      saved: 'Check-in saved!',
      prev: 'Previous',
      next: 'Next',
      reviewWithCoach: 'Your coach will review your check-in within 24h',
    }
  }[lang];

  const handleSave = async () => {
    setSaving(true);
    // Simular guardado (en produccion va al backend)
    await new Promise(r => setTimeout(r, 1500));
    setSaving(false);
    setSaved(true);
    // Guardar en localStorage para demo
    const checkinData = {
      fecha: new Date().toISOString(),
      semana: 12,
      peso, energia: energia[0], suenoCalidad: suenoCalidad[0], suenoHoras,
      estres: estres[0], humor: humor[0], hambre: hambre[0],
      adherenciaDieta: adherenciaDieta[0], adherenciaEntreno: adherenciaEntreno[0], adherenciaSueno: adherenciaSueno[0],
      sintomas, notas
    };
    localStorage.setItem('lastCheckin', JSON.stringify(checkinData));
  };

  const MetricSlider = ({ value, onChange, icon: Icon, label, lowLabel, highLabel }: any) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#a78bfa]" />
        <label className="text-xs text-gray-400">{label}</label>
      </div>
      <Slider value={value} onValueChange={onChange} min={1} max={10} step={1} className="w-full" />
      <div className="flex justify-between text-[10px] text-gray-500">
        <span>{lowLabel}</span>
        <span className="text-[#a78bfa] font-bold">{value[0]}/10</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );

  const AdherenceSlider = ({ value, onChange, icon: Icon, label }: any) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#6366f1]" />
        <label className="text-xs text-gray-400">{label}</label>
      </div>
      <Slider value={value} onValueChange={onChange} min={0} max={100} step={5} className="w-full" />
      <div className="text-center text-xs text-[#6366f1] font-bold">{value[0]}%</div>
    </div>
  );

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-[#0a0a0a] border-emerald-500/30">
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-400">{t.saved}</h2>
            <p className="text-sm text-gray-400">{t.reviewWithCoach}</p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <StatCard icon={Scale} label="Peso" value={`${peso || '--'} kg`} />
              <StatCard icon={Zap} label="Energia" value={`${energia[0]}/10`} />
              <StatCard icon={Moon} label="Sueno" value={`${suenoCalidad[0]}/10`} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        <p className="text-sm text-gray-400">{t.subtitle}</p>
        <Badge className="bg-[#6366f1]/20 text-[#a78bfa]">Semana 12</Badge>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (
              i <= step ? 'bg-[#6366f1] text-white' : 'bg-[#1a1a2e] text-gray-500 border border-[#333]'
            )}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-600" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="bg-[#0a0a0a]/80 border-[#333]">
        <CardContent className="p-6 space-y-6">
          {/* STEP 0: Datos Corporales */}
          {step === 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#a78bfa]" />
                {t.stepDatos}
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">{t.peso}</label>
                <input
                  type="number"
                  step="0.1"
                  value={peso}
                  onChange={e => setPeso(e.target.value)}
                  placeholder={t.pesoPlaceholder}
                  className="w-full bg-[#1a1a2e] border border-[#333] rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-[#6366f1] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">{t.cambioFuerza}</label>
                  <div className="flex gap-2">
                    {['aumento', 'mantuvo', 'disminuyo'].map(v => (
                      <Button key={v} size="sm" variant="outline" className="text-[10px] border-[#333] text-gray-400 hover:bg-[#6366f1]/20 hover:text-[#a78bfa]">
                        {t[v as keyof typeof t]}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">{t.cambioResistencia}</label>
                  <div className="flex gap-2">
                    {['aumento', 'mantuvo', 'disminuyo'].map(v => (
                      <Button key={v} size="sm" variant="outline" className="text-[10px] border-[#333] text-gray-400 hover:bg-[#6366f1]/20 hover:text-[#a78bfa]">
                        {t[v as keyof typeof t]}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Fotos */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#a78bfa]" />
                {t.stepFotos}
              </h3>
              <p className="text-sm text-gray-400">{t.fotosInfo}</p>
              <div className="grid grid-cols-3 gap-4">
                {['Frontal', 'Lateral', 'Trasera'].map((pos, i) => (
                  <div key={pos} className="border-2 border-dashed border-[#333] rounded-xl p-6 text-center hover:border-[#6366f1] transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">{pos}</p>
                    <p className="text-[10px] text-gray-600 mt-1">{isEn ? 'Tap to upload' : 'Toca para subir'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Metricas Subjetivas */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#a78bfa]" />
                {t.stepMetricas}
              </h3>
              
              <MetricSlider value={energia} onChange={setEnergia} icon={Zap} label={t.energia} lowLabel={t.energiaLow} highLabel={t.energiaHigh} />
              <MetricSlider value={suenoCalidad} onChange={setSuenoCalidad} icon={Moon} label={t.suenoCalidad} lowLabel={t.energiaLow} highLabel={t.energiaHigh} />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#a78bfa]" />
                  <label className="text-xs text-gray-400">{t.suenoHoras}</label>
                </div>
                <input type="number" step="0.5" value={suenoHoras} onChange={e => setSuenoHoras(e.target.value)} placeholder="7.5" className="w-full bg-[#1a1a2e] border border-[#333] rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-[#6366f1] focus:outline-none" />
              </div>
              
              <MetricSlider value={estres} onChange={setEstres} icon={Brain} label={t.estres} lowLabel="Bajo" highLabel="Alto" />
              <MetricSlider value={humor} onChange={setHumor} icon={Smile} label={t.humor} lowLabel="Malo" highLabel="Excelente" />
              <MetricSlider value={hambre} onChange={setHambre} icon={Utensils} label={t.hambre} lowLabel="Ninguna" highLabel="Extrema" />
            </div>
          )}

          {/* STEP 3: Adherencia */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#a78bfa]" />
                {t.stepAdherencia}
              </h3>
              
              <AdherenceSlider value={adherenciaDieta} onChange={setAdherenciaDieta} icon={Utensils} label={t.adherenciaDieta} />
              <AdherenceSlider value={adherenciaEntreno} onChange={setAdherenciaEntreno} icon={Dumbbell} label={t.adherenciaEntreno} />
              <AdherenceSlider value={adherenciaSueno} onChange={setAdherenciaSueno} icon={Bed} label={t.adherenciaSueno} />

              <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#333]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{isEn ? 'Weekly Average' : 'Promedio Semanal'}</span>
                  <Badge className="bg-[#6366f1]/20 text-[#a78bfa]">
                    {Math.round((adherenciaDieta[0] + adherenciaEntreno[0] + adherenciaSueno[0]) / 3)}%
                  </Badge>
                </div>
                <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#a78bfa] rounded-full transition-all" style={{ width: `${Math.round((adherenciaDieta[0] + adherenciaEntreno[0] + adherenciaSueno[0]) / 3)}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Notas */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#a78bfa]" />
                {t.stepNotas}
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">{t.sintomas}</label>
                <textarea
                  value={sintomas}
                  onChange={e => setSintomas(e.target.value)}
                  placeholder={t.sintomasPlaceholder}
                  rows={3}
                  className="w-full bg-[#1a1a2e] border border-[#333] rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-[#6366f1] focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">{t.notas}</label>
                <textarea
                  value={notas}
                  onChange={e => setNotas(e.target.value)}
                  placeholder={t.notasPlaceholder}
                  rows={4}
                  className="w-full bg-[#1a1a2e] border border-[#333] rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-[#6366f1] focus:outline-none resize-none"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="border-[#333] text-gray-400 hover:bg-[#1a1a2e]"
        >
          {t.prev}
        </Button>
        
        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-[#6366f1] hover:bg-[#5a5fdf] text-white"
          >
            {t.next}
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-[#6366f1] to-[#a78bfa] hover:opacity-90 text-white"
          >
            {saving ? <><Save className="w-4 h-4 mr-2 animate-spin" />{t.saving}</> : <><Save className="w-4 h-4 mr-2" />{t.save}</>}
          </Button>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-[#1a1a2e] rounded-lg p-3 text-center border border-[#333]">
      <Icon className="w-5 h-5 text-[#a78bfa] mx-auto mb-1" />
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}
