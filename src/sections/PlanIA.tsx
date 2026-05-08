import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/providers/trpc';
import { Sparkles, Send, Loader2, User, Target, Dumbbell, Scale, Ruler, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface PlanForm {
  name: string;
  age: number;
  sex: "male" | "female";
  weight: number;
  height: number;
  bodyFat: number;
  muscleMass: number;
  sport: string;
  trainingHours: number;
  goal: "lose_fat" | "gain_muscle" | "maintain" | "performance" | "recomposition";
  dietaryRestrictions: string;
  language: "es" | "en";
}

const GOAL_LABELS: Record<string, { es: string; en: string }> = {
  lose_fat: { es: "Perder grasa", en: "Lose fat" },
  gain_muscle: { es: "Ganar masa muscular", en: "Gain muscle" },
  maintain: { es: "Mantenimiento", en: "Maintain" },
  performance: { es: "Rendimiento deportivo", en: "Sports performance" },
  recomposition: { es: "Recomposicion corporal", en: "Body recomposition" },
};

export function PlanIA() {
  const lang: "es" | "en" = (localStorage.getItem('lang') as 'es' | 'en') || 'es';
  const t = {
    es: {
      title: "Plan Nutricional con IA",
      subtitle: "Genera planes personalizados con Claude AI basados en datos ISAK",
      name: "Nombre del paciente",
      age: "Edad (anos)",
      sex: "Sexo",
      male: "Masculino",
      female: "Femenino",
      weight: "Peso (kg)",
      height: "Estatura (cm)",
      bodyFat: "% Grasa corporal",
      muscleMass: "Masa muscular (kg)",
      sport: "Deporte / Actividad",
      trainingHours: "Horas entrenamiento/semana",
      goal: "Objetivo",
      restrictions: "Restricciones alimentarias (opcional)",
      generate: "Generar Plan con IA",
      generating: "Generando plan...",
      resultTitle: "Plan Nutricional Generado",
      disclaimer: "Este plan es generado por IA y debe ser revisado por un nutriologo certificado antes de su implementacion.",
      error: "Error al generar el plan. Intenta de nuevo.",
      noKey: "Claude API no configurada. Contacta al administrador.",
      sendEmail: "Enviar por email",
      sending: "Enviando...",
      sent: "Enviado exitosamente",
      patientData: "Datos del paciente",
    },
    en: {
      title: "Nutritional Plan with AI",
      subtitle: "Generate personalized plans with Claude AI based on ISAK data",
      name: "Patient name",
      age: "Age (years)",
      sex: "Sex",
      male: "Male",
      female: "Female",
      weight: "Weight (kg)",
      height: "Height (cm)",
      bodyFat: "Body fat %",
      muscleMass: "Muscle mass (kg)",
      sport: "Sport / Activity",
      trainingHours: "Training hours/week",
      goal: "Goal",
      restrictions: "Dietary restrictions (optional)",
      generate: "Generate Plan with AI",
      generating: "Generating plan...",
      resultTitle: "Generated Nutrition Plan",
      disclaimer: "This plan is AI-generated and must be reviewed by a certified nutritionist before implementation.",
      error: "Error generating plan. Please try again.",
      noKey: "Claude API not configured. Contact the administrator.",
      sendEmail: "Send by email",
      sending: "Sending...",
      sent: "Sent successfully",
      patientData: "Patient data",
    },
  }[lang];

  const [form, setForm] = useState<PlanForm>({
    name: "", age: 30, sex: "male", weight: 70, height: 170,
    bodyFat: 15, muscleMass: 30, sport: "", trainingHours: 5,
    goal: "maintain", dietaryRestrictions: "", language: lang,
  });
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailTo, setEmailTo] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const generateMutation = trpc.claude.generateNutritionPlan.useMutation({
    onSuccess: (data) => {
      if (data.error) { setError(data.error); setResult(null); }
      else { setResult(data.content); setError(null); }
    },
    onError: (err) => { setError(err.message); setResult(null); },
  });

  const sendEmailMutation = trpc.email.sendCustom.useMutation({
    onSuccess: () => setEmailSent(true),
  });

  const handleGenerate = () => {
    setResult(null); setError(null); setEmailSent(false);
    generateMutation.mutate(form);
  };

  const handleSendEmail = () => {
    if (!emailTo || !result) return;
    setEmailSent(false);
    sendEmailMutation.mutate({
      to: emailTo,
      subject: lang === "es" ? "Tu Plan Nutricional - Anthroscope Pro" : "Your Nutrition Plan - Anthroscope Pro",
      html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;background:#11121a;color:#f0f0f5;padding:30px;"><h1 style="color:#D4FF00">ANTHROSCOPE PRO</h1><h2>${t.resultTitle}</h2><hr style="border-color:#1e1f2e;margin:20px 0"><div style="line-height:1.6">${result.replace(/\n/g, "<br>")}</div><p style="color:#8a8d9e;font-size:12px;margin-top:30px">${t.disclaimer}</p></div>`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#D4FF00]" />
        <h2 className="text-xl font-bold text-[#f0f0f5]">{t.title}</h2>
      </div>
      <p className="text-xs text-[#8a8d9e]">{t.subtitle}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Form */}
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-[#D4FF00]">{t.patientData}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><User className="w-3 h-3" />{t.name}</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e]">{t.age}</label><Input type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: Number(e.target.value) }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e]">{t.sex}</label>
                <select value={form.sex} onChange={e => setForm(f => ({ ...f, sex: e.target.value as "male" | "female" }))} className="w-full h-8 bg-[#0a0b0f] border border-[#1e1f2e] rounded-md text-[#f0f0f5] text-xs px-2">
                  <option value="male">{t.male}</option><option value="female">{t.female}</option>
                </select>
              </div>
              <div><label className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Scale className="w-3 h-3" />{t.weight}</label><Input type="number" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Ruler className="w-3 h-3" />{t.height}</label><Input type="number" value={form.height} onChange={e => setForm(f => ({ ...f, height: Number(e.target.value) }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e]">{t.bodyFat}</label><Input type="number" step={0.1} value={form.bodyFat} onChange={e => setForm(f => ({ ...f, bodyFat: Number(e.target.value) }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e]">{t.muscleMass}</label><Input type="number" value={form.muscleMass} onChange={e => setForm(f => ({ ...f, muscleMass: Number(e.target.value) }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Dumbbell className="w-3 h-3" />{t.sport}</label><Input value={form.sport} onChange={e => setForm(f => ({ ...f, sport: e.target.value }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" placeholder="e.g. Triathlon" /></div>
              <div><label className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Clock className="w-3 h-3" />{t.trainingHours}</label><Input type="number" value={form.trainingHours} onChange={e => setForm(f => ({ ...f, trainingHours: Number(e.target.value) }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" /></div>
              <div><label className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Target className="w-3 h-3" />{t.goal}</label>
                <select value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value as PlanForm["goal"] }))} className="w-full h-8 bg-[#0a0b0f] border border-[#1e1f2e] rounded-md text-[#f0f0f5] text-xs px-2">
                  {Object.entries(GOAL_LABELS).map(([key, labels]) => <option key={key} value={key}>{labels[lang]}</option>)}
                </select>
              </div>
            </div>
            <div><label className="text-[10px] text-[#8a8d9e]">{t.restrictions}</label><Input value={form.dietaryRestrictions} onChange={e => setForm(f => ({ ...f, dietaryRestrictions: e.target.value }))} className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" placeholder="e.g. Vegetariano, sin gluten..." /></div>
            <Button onClick={handleGenerate} disabled={generateMutation.isPending} className="w-full bg-[#D4FF00] text-[#050608] hover:bg-[#D4FF00]/90 text-xs font-bold">
              {generateMutation.isPending ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />{t.generating}</> : <><Sparkles className="w-3 h-3 mr-1" />{t.generate}</>}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-[#D4FF00]">{t.resultTitle}</CardTitle></CardHeader>
          <CardContent>
            {error && (
              <div className="flex items-start gap-2 p-3 rounded bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
            {result ? (
              <div className="space-y-3">
                <div className="prose prose-invert prose-sm max-w-none bg-[#0a0b0f] rounded-lg p-4 max-h-[500px] overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, "<br>").replace(/#{1,6}\s+(.+)/g, "<h3 class='text-[#D4FF00] text-sm font-bold mt-3'>$1</h3>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\|(.+?)\|/g, "<td class='border border-[#1e1f2e] px-2 py-1 text-xs'>$1</td>") }} />
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0" />
                  <p className="text-[9px] text-yellow-400">{t.disclaimer}</p>
                </div>
                <div className="flex gap-2">
                  <Input value={emailTo} onChange={e => setEmailTo(e.target.value)} placeholder="Email del paciente" className="h-8 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" />
                  <Button onClick={handleSendEmail} disabled={!emailTo || sendEmailMutation.isPending} size="sm" className="bg-[#6366f1] hover:bg-[#6366f1]/80 text-xs">
                    {sendEmailMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : emailSent ? <CheckCircle className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                  </Button>
                </div>
                {emailSent && <p className="text-[10px] text-green-400">{t.sent}</p>}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-10 h-10 text-[#55576b] mx-auto mb-3" />
                <p className="text-xs text-[#8a8d9e]">{lang === "es" ? "Llena los datos y genera un plan" : "Fill in the data and generate a plan"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
