import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Users, AlertTriangle, TrendingUp, Heart, Activity, ShieldCheck,
  Utensils, ChevronDown, ChevronUp, Filter, Bell, Zap, BarChart3,
  Calendar, Target, Brain
} from 'lucide-react';
import i18n from '@/i18n';
import { trpc } from '@/providers/trpc';

// ═══════════════════════════════════════════════════════════
// TRANSLATIONS - BILINGUAL
// ═══════════════════════════════════════════════════════════
const T = {
  es: {
    title: 'Panel del Head Coach',
    subtitle: 'Dashboard de equipo · Alertas automaticas · RED-S · Adherencia',
    tabTable: 'Tabla', tabCards: 'Tarjetas', tabAlerts: 'Alertas',
    kpiAthletes: 'Atletas activos', kpiRisk: 'Riesgo RED-S',
    kpiRiskSub: 'Alto o critico', kpiAdherence: 'Adherencia nutricional',
    kpiEA: 'EA promedio', kpiEAUnit: 'kcal/kg FFM/dia',
    alertBanner: 'Atletas afectados', badgeCritical: 'CRITICA',
    badgeHigh: 'ALTA', badgeMedium: 'MEDIA', badgeLow: 'BAJA',
    filterSearch: 'Buscar atleta...', filterRisk: 'Todos los riesgos',
    filterSport: 'Todos los deportes', filterClear: 'Limpiar',
    athleteCol: 'Atleta', sportCol: 'Deporte', riskCol: 'RED-S',
    eaCol: 'EA', fatCol: '% Grasa', imoCol: 'IMO',
    adherenceCol: 'Adherencia', hrvCol: 'HRV', alertsCol: 'Alertas',
    compositionTitle: 'Composicion Corporal',
    imcLabel: 'IMC', muscleLabel: 'Masa Muscular', fatLabel: '% Grasa',
    imoLabel: 'IMO', nutritionTitle: 'Nutricion Hoy',
    nutritionCal: 'Calorias', wearablesTitle: 'Wearables (7 dias)',
    hrvLabel: 'HRV', sleepLabel: 'Sueno', rpeLabel: 'RPE',
    comparisonTitle: 'Comparacion Grupal',
    avgFat: 'Promedio % Grasa', avgIMO: 'Promedio IMO',
    avgMuscle: 'Promedio Masa Muscular', avgIMC: 'Promedio IMC',
    bestIMO: 'Mejor IMO del equipo', bestAdherence: 'Mejor adherencia nutricional',
    noAthletes: 'No hay atletas que coincidan con los filtros.',
    noAlerts: 'Sin alertas activas. Todo el equipo esta dentro de parametros normales.',
    male: 'M', female: 'F', years: 'anios',
    riskLevels: { bajo: 'BAJO', moderado: 'MODERADO', alto: 'ALTO', critico: 'CRITICO' },
    alertTypes: {
      reds: { icon: 'heart' as const, label: 'RED-S' },
      adherencia: { icon: 'utensils' as const, label: 'Adherencia' },
      wearable: { icon: 'activity' as const, label: 'Wearable' },
      lesion: { icon: 'alert' as const, label: 'Lesion' },
      general: { icon: 'bell' as const, label: 'General' },
    },
  },
  en: {
    title: 'Head Coach Dashboard',
    subtitle: 'Team dashboard · Automatic alerts · RED-S · Adherence',
    tabTable: 'Table', tabCards: 'Cards', tabAlerts: 'Alerts',
    kpiAthletes: 'Active Athletes', kpiRisk: 'RED-S Risk',
    kpiRiskSub: 'High or critical', kpiAdherence: 'Nutritional Adherence',
    kpiEA: 'Avg EA', kpiEAUnit: 'kcal/kg FFM/day',
    alertBanner: 'Athletes affected', badgeCritical: 'CRITICAL',
    badgeHigh: 'HIGH', badgeMedium: 'MEDIUM', badgeLow: 'LOW',
    filterSearch: 'Search athlete...', filterRisk: 'All risks',
    filterSport: 'All sports', filterClear: 'Clear',
    athleteCol: 'Athlete', sportCol: 'Sport', riskCol: 'RED-S',
    eaCol: 'EA', fatCol: '% Fat', imoCol: 'IMO',
    adherenceCol: 'Adherence', hrvCol: 'HRV', alertsCol: 'Alerts',
    compositionTitle: 'Body Composition',
    imcLabel: 'BMI', muscleLabel: 'Muscle Mass', fatLabel: '% Fat',
    imoLabel: 'IMO', nutritionTitle: 'Nutrition Today',
    nutritionCal: 'Calories', wearablesTitle: 'Wearables (7 days)',
    hrvLabel: 'HRV', sleepLabel: 'Sleep', rpeLabel: 'RPE',
    comparisonTitle: 'Group Comparison',
    avgFat: 'Avg % Fat', avgIMO: 'Avg IMO',
    avgMuscle: 'Avg Muscle Mass', avgIMC: 'Avg BMI',
    bestIMO: 'Best IMO on team', bestAdherence: 'Best nutritional adherence',
    noAthletes: 'No athletes match the filters.',
    noAlerts: 'No active alerts. The entire team is within normal parameters.',
    male: 'M', female: 'F', years: 'years',
    riskLevels: { bajo: 'LOW', moderado: 'MODERATE', alto: 'HIGH', critico: 'CRITICAL' },
    alertTypes: {
      reds: { icon: 'heart' as const, label: 'RED-S' },
      adherencia: { icon: 'utensils' as const, label: 'Adherence' },
      wearable: { icon: 'activity' as const, label: 'Wearable' },
      lesion: { icon: 'alert' as const, label: 'Injury' },
      general: { icon: 'bell' as const, label: 'General' },
    },
  },
};

// ═══════════════════════════════════════════════════════════
// DATA & LOGIC (same)
// ═══════════════════════════════════════════════════════════

interface AtletaR {
  id: string; nombre: string; sexo: string; deporte?: string; edad?: number;
  fechaEvaluacion?: string; imc?: number; porcentajeGrasa?: number; imo?: number;
  masaMuscular?: number; ea?: number; riesgoREDS: 'bajo'|'moderado'|'alto'|'critico';
  caloriasPlan?: number; caloriasConsumidasHoy?: number; adherenciaPct?: number;
  hrvPromedio?: number; suenoPromedio?: number; rpePromedio?: number; alertas: string[];
}

interface AlertaE {
  id: string; tipo: 'reds'|'adherencia'|'wearable'|'lesion'|'general';
  mensaje: string; atletasAfectados: string[]; fecha: string;
  severidad: 'baja'|'media'|'alta'|'critica';
}

function calcEA(cc: number, ge: number, mm: number): number {
  return (!mm || mm <= 0) ? 0 : (cc - ge) / mm;
}

function nivRiesgo(ea: number, sx: string): AtletaR['riesgoREDS'] {
  if (sx === 'femenino') { if (ea < 20) return 'critico'; if (ea < 25) return 'alto'; if (ea < 30) return 'moderado'; }
  if (ea < 15) return 'critico'; if (ea < 20) return 'alto'; if (ea < 25) return 'moderado';
  return 'bajo';
}

function cRiesgo(r: AtletaR['riesgoREDS']) {
  switch (r) { case 'critico': return 'bg-red-500/20 text-red-400 border-red-500/40'; case 'alto': return 'bg-orange-500/20 text-orange-400 border-orange-500/40'; case 'moderado': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'; default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'; }
}

function cSev(s: AlertaE['severidad']) {
  switch (s) { case 'critica': return 'bg-red-500 text-white'; case 'alta': return 'bg-orange-500 text-white'; case 'media': return 'bg-yellow-500 text-black'; default: return 'bg-blue-500 text-white'; }
}

function genDemo(lang: string): AtletaR[] {
  const n = lang === 'en' ?
    [['Carlos Mendoza','masculino','Weightlifting',26,81.2,172,8.5,4.2,38.5],['Ana Lopez','femenino','CrossFit',24,62.5,165,14.2,3.8,28.2],['Diego Herrera','masculino','Soccer',22,74.0,178,9.8,3.9,35.1],['Mariana Ruiz','femenino','Track',21,55.0,168,12.5,3.5,24.8],['Luis Torres','masculino','Swimming',25,78.5,180,7.2,4.5,42.0],['Sofia Castro','femenino','Gymnastics',19,52.0,160,16.0,3.2,22.1],['Jorge Vargas','masculino','Rugby',28,95.0,185,12.0,4.0,45.0],['Valeria Soto','femenino','Triathlon',23,58.0,170,11.0,3.6,29.5]] :
    [['Carlos Mendoza','masculino','Halterofilia',26,81.2,172,8.5,4.2,38.5],['Ana Lopez','femenino','CrossFit',24,62.5,165,14.2,3.8,28.2],['Diego Herrera','masculino','Futbol',22,74.0,178,9.8,3.9,35.1],['Mariana Ruiz','femenino','Atletismo',21,55.0,168,12.5,3.5,24.8],['Luis Torres','masculino','Natacion',25,78.5,180,7.2,4.5,42.0],['Sofia Castro','femenino','Gimnasia',19,52.0,160,16.0,3.2,22.1],['Jorge Vargas','masculino','Rugby',28,95.0,185,12.0,4.0,45.0],['Valeria Soto','femenino','Triatlon',23,58.0,170,11.0,3.6,29.5]];
  return n.map((d, i) => {
    const [nm, sx, dp, ed, ms, est, gr, im, mu] = d as any[];
    const mm = ms * (1 - gr / 100);
    const cp = Math.round(ms * 35 + (sx === 'masculino' ? 400 : 300));
    const ge = Math.round(cp * 0.35);
    const cr = cp + (Math.random() - 0.5) * 600;
    const ea = calcEA(cr, ge, mm);
    const rg = nivRiesgo(ea, sx as string);
    const ad = Math.min(100, Math.max(40, Math.round((cr / cp) * 100)));
    const al: string[] = [];
    if (rg === 'critico' || rg === 'alto') al.push(lang === 'en' ? 'RED-S: Low EA' : 'RED-S: EA baja');
    if (ad < 70) al.push(lang === 'en' ? 'Low nutritional adherence' : 'Adherencia nutricional baja');
    if (Math.random() > 0.7) al.push(lang === 'en' ? 'HRV reduced -20%' : 'HRV reducido -20%');
    return { id: 'demo_'+i, nombre: nm as string, sexo: sx as string, deporte: dp as string, edad: ed as number, fechaEvaluacion: new Date().toISOString().split('T')[0], imc: Math.round((ms as number)/((est as number)/100)**2*10)/10, porcentajeGrasa: gr as number, imo: im as number, masaMuscular: mu as number, ea: Math.round(ea*10)/10, riesgoREDS: rg, caloriasPlan: cp, caloriasConsumidasHoy: Math.round(cr), adherenciaPct: ad, hrvPromedio: Math.round(45+Math.random()*30), suenoPromedio: Math.round(5+Math.random()*3), rpePromedio: Math.round(6+Math.random()*4), alertas: al };
  });
}

function genAlertas(at: AtletaR[], lang: string): AlertaE[] {
  const al: AlertaE[] = [];
  const rc = at.filter(a => a.riesgoREDS === 'critico');
  const ra = at.filter(a => a.riesgoREDS === 'alto');
  const ab = at.filter(a => (a.adherenciaPct || 100) < 70);
  const hb = at.filter(a => a.alertas.includes(lang === 'en' ? 'HRV reduced -20%' : 'HRV reducido -20%'));
  const f = new Date().toISOString().split('T')[0];
  if (rc.length > 0) al.push({ id:'1', tipo:'reds', severidad:'critica', mensaje: lang === 'en' ? `${rc.length} athlete(s) in CRITICAL RED-S risk (EA < 20)` : `${rc.length} atleta(s) en riesgo critico RED-S (EA < 20)`, atletasAfectados: rc.map(a=>a.nombre), fecha: f });
  if (ra.length > 0) al.push({ id:'2', tipo:'reds', severidad:'alta', mensaje: lang === 'en' ? `${ra.length} athlete(s) in HIGH RED-S risk` : `${ra.length} atleta(s) en riesgo alto RED-S`, atletasAfectados: ra.map(a=>a.nombre), fecha: f });
  if (ab.length > 0) al.push({ id:'3', tipo:'adherencia', severidad:'media', mensaje: lang === 'en' ? `${ab.length} athlete(s) with nutritional adherence < 70%` : `${ab.length} atleta(s) con adherencia nutricional < 70%`, atletasAfectados: ab.map(a=>a.nombre), fecha: f });
  if (hb.length > 0) al.push({ id:'4', tipo:'wearable', severidad:'media', mensaje: lang === 'en' ? `${hb.length} athlete(s) with HRV reduced > 20%` : `${hb.length} atleta(s) con HRV reducido > 20%`, atletasAfectados: hb.map(a=>a.nombre), fecha: f });
  return al;
}

export function CoachDashboard() {
  const lang = (i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const tx = T[lang];

  const [atletas, setAtletas] = useState<AtletaR[]>([]);
  const [alertas, setAlertas] = useState<AlertaE[]>([]);
  const [filtroRiesgo, setFiltroRiesgo] = useState('todos');
  const [filtroDeporte, setFiltroDeporte] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [expandido, setExpandido] = useState<Set<string>>(new Set());
  const [vista, setVista] = useState<'tabla'|'tarjetas'|'alertas'>('tabla');

  const { data: pacientesDb, isLoading } = trpc.patients.list.useQuery();

  useEffect(() => {
    // Si hay datos reales de la BD, usarlos
    if (pacientesDb && pacientesDb.length > 0) {
      const mapeados: AtletaR[] = pacientesDb.map((p) => {
        const edad = p.fechaNacimiento
          ? Math.floor(
              (new Date().getTime() - new Date(p.fechaNacimiento).getTime()) /
                (365.25 * 24 * 60 * 60 * 1000)
            )
          : undefined;
        return {
          id: String(p.id),
          nombre: p.nombre,
          sexo: p.sexo,
          deporte: p.deporte || 'General',
          edad,
          fechaEvaluacion: p.createdAt
            ? new Date(p.createdAt).toISOString().split('T')[0]
            : undefined,
          imc: undefined,
          porcentajeGrasa: undefined,
          imo: undefined,
          masaMuscular: undefined,
          ea: undefined,
          riesgoREDS: 'bajo',
          caloriasPlan: undefined,
          caloriasConsumidasHoy: undefined,
          adherenciaPct: undefined,
          hrvPromedio: undefined,
          suenoPromedio: undefined,
          rpePromedio: undefined,
          alertas: [],
        };
      });
      setAtletas(mapeados);
      setAlertas([]);
      return;
    }

    // Fallback: localStorage o demo
    const evs = JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');
    const cl = JSON.parse(localStorage.getItem('anthroscope_clientes') || '[]');
    if (evs.length === 0 && cl.length === 0) {
      const demo = genDemo(lang);
      setAtletas(demo);
      setAlertas(genAlertas(demo, lang));
      return;
    }
    const mapa: Record<string, AtletaR> = {};
    for (const ev of evs) {
      const r = ev.resultado || ev;
      const id = r.sujeto?.id || ev.id || crypto.randomUUID();
      const sx = r.sujeto?.sexo || 'masculino';
      const ms = r.perfil?.masaCorporal || 70;
      const est = r.perfil?.estatura || 170;
      const gr = r.siriPorcentajeGrasa || 12;
      const mm = ms * (1 - gr / 100);
      const im = r.cincoComponentes?.indiceMusculoOseo || 3.8;
      const mu = r.cincoComponentes?.masaMuscular || 35;
      const cp = Math.round(ms * 35);
      const di = JSON.parse(localStorage.getItem('anthroscope_diario') || '{}');
      const diHoy = di[id]?.hoy || { calorias: cp };
      const cc = diHoy.calorias || cp;
      const ge = Math.round(cp * 0.35);
      const ea = calcEA(cc, ge, mm);
      const rg = nivRiesgo(ea, sx);
      const ad = cp > 0 ? Math.round((cc / cp) * 100) : 100;
      const wr = JSON.parse(localStorage.getItem('anthroscope_wearables') || '{}');
      const w = wr[id];
      const al: string[] = [];
      if (rg === 'critico' || rg === 'alto') al.push(lang === 'en' ? 'RED-S: Low EA' : 'RED-S: EA baja');
      if (ad < 70) al.push(lang === 'en' ? 'Low nutritional adherence' : 'Adherencia nutricional baja');
      if (w && w.hrv < (w.hrvBaseline * 0.8)) al.push(lang === 'en' ? 'HRV reduced' : 'HRV reducido');
      mapa[id] = { id, nombre: r.sujeto?.nombre || (lang === 'en' ? 'Unnamed' : 'Sin nombre'), sexo: sx, deporte: r.sujeto?.deporte || 'General', fechaEvaluacion: r.sujeto?.fechaEvaluacion || ev.fecha, imc: r.imc || Math.round(ms/((est/100)**2)*10)/10, porcentajeGrasa: gr, imo: im, masaMuscular: mu, ea: Math.round(ea*10)/10, riesgoREDS: rg, caloriasPlan: cp, caloriasConsumidasHoy: cc, adherenciaPct: ad, hrvPromedio: w?.hrv, suenoPromedio: w?.suenoHoras, rpePromedio: w?.rpe, alertas: al };
    }
    const lista = Object.values(mapa);
    if (lista.length === 0) { const d = genDemo(lang); setAtletas(d); setAlertas(genAlertas(d, lang)); }
    else { setAtletas(lista); setAlertas(genAlertas(lista, lang)); }
  }, [lang, pacientesDb]);

  const deportes = useMemo(() => { const s = new Set(atletas.map(a => a.deporte || 'General')); return Array.from(s); }, [atletas]);

  const filtrados = useMemo(() => atletas.filter(a => {
    if (filtroRiesgo !== 'todos' && a.riesgoREDS !== filtroRiesgo) return false;
    if (filtroDeporte !== 'todos' && a.deporte !== filtroDeporte) return false;
    if (busqueda && !a.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  }), [atletas, filtroRiesgo, filtroDeporte, busqueda]);

  const stats = useMemo(() => {
    const t = atletas.length;
    return { total: t, riesgoAlto: atletas.filter(a => a.riesgoREDS === 'alto' || a.riesgoREDS === 'critico').length, adherenciaPromedio: t > 0 ? Math.round(atletas.reduce((s, a) => s + (a.adherenciaPct || 100), 0) / t) : 0, eaPromedio: t > 0 ? Math.round(atletas.reduce((s, a) => s + (a.ea || 0), 0) / t * 10) / 10 : 0 };
  }, [atletas]);

  const toggleExp = (id: string) => { const n = new Set(expandido); if (n.has(id)) n.delete(id); else n.add(id); setExpandido(n); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4FF00] p-2.5 rounded-lg"><Users className="w-6 h-6 text-[#050608]" /></div>
          <div>
            <h2 className="text-xl font-bold text-[#f0f0f5]">{tx.title}</h2>
            <p className="text-xs text-[#55576b]">{tx.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['tabla','tarjetas','alertas'] as const).map(v => (
            <Button key={v} variant="outline" size="sm"
              className={vista===v ? 'border-[#D4FF00] text-[#D4FF00]' : 'border-[#1e1f2e] text-[#8a8d9e]'}
              onClick={() => setVista(v)}>
              {v==='tabla' && <BarChart3 className="w-4 h-4 mr-1" />}{v==='tarjetas' && <Activity className="w-4 h-4 mr-1" />}{v==='alertas' && <Bell className="w-4 h-4 mr-1" />}
              {v==='tabla' ? tx.tabTable : v==='tarjetas' ? tx.tabCards : `${tx.tabAlerts} (${alertas.length})`}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-[#11121a] border-[#1e1f2e]"><CardContent className="p-4"><p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Users className="w-3 h-3" /> {tx.kpiAthletes}</p><p className="text-2xl font-bold text-[#f0f0f5] mt-1">{stats.total}</p></CardContent></Card>
        <Card className="bg-[#11121a] border-[#1e1f2e]"><CardContent className="p-4"><p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" /> {tx.kpiRisk}</p><p className="text-2xl font-bold text-red-400 mt-1">{stats.riesgoAlto}</p><p className="text-[10px] text-[#55576b]">{tx.kpiRiskSub}</p></CardContent></Card>
        <Card className="bg-[#11121a] border-[#1e1f2e]"><CardContent className="p-4"><p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Utensils className="w-3 h-3 text-emerald-400" /> {tx.kpiAdherence}</p><p className="text-2xl font-bold text-emerald-400 mt-1">{stats.adherenciaPromedio}%</p><Progress value={stats.adherenciaPromedio} className="h-1 mt-2 bg-[#1e1f2e]" /></CardContent></Card>
        <Card className="bg-[#11121a] border-[#1e1f2e]"><CardContent className="p-4"><p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Zap className="w-3 h-3 text-[#D4FF00]" /> {tx.kpiEA}</p><p className="text-2xl font-bold text-[#D4FF00] mt-1">{stats.eaPromedio}</p><p className="text-[10px] text-[#55576b]">{tx.kpiEAUnit}</p></CardContent></Card>
      </div>

      {alertas.filter(a => a.severidad === 'critica' || a.severidad === 'alta').length > 0 && (
        <div className="space-y-2">
          {alertas.filter(a => a.severidad === 'critica' || a.severidad === 'alta').map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border bg-red-500/10 border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-300">{a.mensaje}</p>
                <p className="text-xs text-[#8a8d9e]">{tx.alertBanner}: {a.atletasAfectados.join(', ')}</p>
              </div>
              <Badge className={cSev(a.severidad)}>{a.severidad === 'critica' ? tx.badgeCritical : a.severidad === 'alta' ? tx.badgeHigh : a.severidad === 'media' ? tx.badgeMedium : tx.badgeLow}</Badge>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="w-4 h-4 text-[#8a8d9e]" />
        <Input placeholder={tx.filterSearch} value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-48 bg-[#11121a] border-[#1e1f2e] text-[#f0f0f5] text-sm h-8" />
        <Select value={filtroRiesgo} onValueChange={setFiltroRiesgo}>
          <SelectTrigger className="w-36 bg-[#11121a] border-[#1e1f2e] text-[#f0f0f5] text-xs h-8"><SelectValue placeholder={tx.filterRisk} /></SelectTrigger>
          <SelectContent className="bg-[#11121a] border-[#1e1f2e]">
            <SelectItem value="todos">{tx.filterRisk}</SelectItem>
            <SelectItem value="bajo">{tx.riskLevels.bajo}</SelectItem>
            <SelectItem value="moderado">{tx.riskLevels.moderado}</SelectItem>
            <SelectItem value="alto">{tx.riskLevels.alto}</SelectItem>
            <SelectItem value="critico">{tx.riskLevels.critico}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroDeporte} onValueChange={setFiltroDeporte}>
          <SelectTrigger className="w-36 bg-[#11121a] border-[#1e1f2e] text-[#f0f0f5] text-xs h-8"><SelectValue placeholder={tx.filterSport} /></SelectTrigger>
          <SelectContent className="bg-[#11121a] border-[#1e1f2e]">
            <SelectItem value="todos">{tx.filterSport}</SelectItem>
            {deportes.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="text-[#8a8d9e] h-8" onClick={() => { setFiltroRiesgo('todos'); setFiltroDeporte('todos'); setBusqueda(''); }}>{tx.filterClear}</Button>
      </div>

      {vista === 'tabla' && (
        <Card className="bg-[#11121a] border-[#1e1f2e] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1f2e] text-[#8a8d9e] text-xs">
                  <th className="text-left p-3">{tx.athleteCol}</th>
                  <th className="text-left p-3">{tx.sportCol}</th>
                  <th className="text-center p-3">{tx.riskCol}</th>
                  <th className="text-center p-3">{tx.eaCol}</th>
                  <th className="text-center p-3">{tx.fatCol}</th>
                  <th className="text-center p-3">{tx.imoCol}</th>
                  <th className="text-center p-3">{tx.adherenceCol}</th>
                  <th className="text-center p-3">{tx.hrvCol}</th>
                  <th className="text-center p-3">{tx.alertsCol}</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {filtrados.map(a => (
                  <>
                    <tr key={a.id} className="border-b border-[#1e1f2e]/50 hover:bg-[#1e1f2e]/30 transition-colors cursor-pointer" onClick={() => toggleExp(a.id)}>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#D4FF00]/10 flex items-center justify-center text-[#D4FF00] text-xs font-bold">{a.nombre.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                          <div>
                            <p className="font-medium text-[#f0f0f5]">{a.nombre}</p>
                            <p className="text-[10px] text-[#55576b]">{a.sexo === 'masculino' ? tx.male : tx.female} · {a.edad || '--'} {tx.years}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-[#8a8d9e]">{a.deporte}</td>
                      <td className="p-3 text-center"><Badge variant="outline" className={cRiesgo(a.riesgoREDS)}>{tx.riskLevels[a.riesgoREDS]}</Badge></td>
                      <td className="p-3 text-center font-mono text-[#D4FF00]">{a.ea || '--'}</td>
                      <td className="p-3 text-center">{a.porcentajeGrasa?.toFixed(1)}%</td>
                      <td className="p-3 text-center font-mono">{a.imo?.toFixed(1)}</td>
                      <td className="p-3"><div className="w-20 mx-auto"><Progress value={a.adherenciaPct} className="h-1.5 bg-[#1e1f2e]" /><p className="text-[10px] text-center mt-1 text-[#8a8d9e]">{a.adherenciaPct}%</p></div></td>
                      <td className="p-3 text-center text-[#8a8d9e]">{a.hrvPromedio || '--'}</td>
                      <td className="p-3 text-center">{a.alertas.length > 0 ? <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{a.alertas.length}</Badge> : <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />}</td>
                      <td className="p-3 text-center">{expandido.has(a.id) ? <ChevronUp className="w-4 h-4 text-[#8a8d9e]" /> : <ChevronDown className="w-4 h-4 text-[#8a8d9e]" />}</td>
                    </tr>
                    {expandido.has(a.id) && (
                      <tr>
                        <td colSpan={10} className="p-4 bg-[#0a0b0f]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-[#D4FF00] flex items-center gap-1"><Activity className="w-3 h-3" /> {tx.compositionTitle}</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.imcLabel}</p><p className="font-mono text-[#f0f0f5]">{a.imc}</p></div>
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.muscleLabel}</p><p className="font-mono text-[#f0f0f5]">{a.masaMuscular?.toFixed(1)} kg</p></div>
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.fatLabel}</p><p className="font-mono text-[#f0f0f5]">{a.porcentajeGrasa?.toFixed(1)}%</p></div>
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.imoLabel}</p><p className="font-mono text-[#f0f0f5]">{a.imo?.toFixed(2)}</p></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1"><Utensils className="w-3 h-3" /> {tx.nutritionTitle}</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs"><span className="text-[#8a8d9e]">{tx.nutritionCal}</span><span className="font-mono">{a.caloriasConsumidasHoy} / {a.caloriasPlan} kcal</span></div>
                                <Progress value={Math.min((a.caloriasConsumidasHoy||0)/(a.caloriasPlan||1)*100,100)} className="h-1 bg-[#1e1f2e]" />
                                <div className="flex justify-between text-xs mt-2"><span className="text-[#8a8d9e]">{tx.adherenceCol}</span><span className={a.adherenciaPct && a.adherenciaPct >= 90 ? 'text-emerald-400' : a.adherenciaPct && a.adherenciaPct >= 70 ? 'text-yellow-400' : 'text-red-400'}>{a.adherenciaPct}%</span></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-[#06b6d4] flex items-center gap-1"><Brain className="w-3 h-3" /> {tx.wearablesTitle}</p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e] text-center"><p className="text-[#55576b]">{tx.hrvLabel}</p><p className="font-mono text-[#f0f0f5]">{a.hrvPromedio || '--'}</p></div>
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e] text-center"><p className="text-[#55576b]">{tx.sleepLabel}</p><p className="font-mono text-[#f0f0f5]">{a.suenoPromedio ? a.suenoPromedio + 'h' : '--'}</p></div>
                                <div className="p-2 bg-[#11121a] rounded border border-[#1e1f2e] text-center"><p className="text-[#55576b]">{tx.rpeLabel}</p><p className="font-mono text-[#f0f0f5]">{a.rpePromedio || '--'}</p></div>
                              </div>
                              {a.alertas.length > 0 && <div className="space-y-1 mt-2">{a.alertas.map((al,i) => <div key={i} className="flex items-center gap-1 text-xs text-red-400"><AlertTriangle className="w-3 h-3" />{al}</div>)}</div>}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {filtrados.length === 0 && <tr><td colSpan={10} className="p-8 text-center text-[#55576b]">{tx.noAthletes}</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {vista === 'tarjetas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtrados.map(a => (
            <Card key={a.id} className="bg-[#11121a] border-[#1e1f2e] hover:border-[#D4FF00]/30 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4FF00]/10 flex items-center justify-center text-[#D4FF00] text-xs font-bold">{a.nombre.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                    <div>
                      <p className="font-medium text-sm text-[#f0f0f5]">{a.nombre}</p>
                      <p className="text-[10px] text-[#55576b]">{a.deporte} · {a.edad || '--'} {tx.years}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cRiesgo(a.riesgoREDS)}>{tx.riskLevels[a.riesgoREDS]}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">EA</p><p className="font-mono text-[#D4FF00]">{a.ea || '--'}</p></div>
                  <div className="p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.fatLabel}</p><p className="font-mono text-[#f0f0f5]">{a.porcentajeGrasa?.toFixed(1)}%</p></div>
                  <div className="p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.imoLabel}</p><p className="font-mono text-[#f0f0f5]">{a.imo?.toFixed(2)}</p></div>
                  <div className="p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]"><p className="text-[#55576b]">{tx.muscleLabel}</p><p className="font-mono text-[#f0f0f5]">{a.masaMuscular?.toFixed(1)}kg</p></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-[#8a8d9e]">{tx.adherenceCol}</span><span className={a.adherenciaPct && a.adherenciaPct >= 90 ? 'text-emerald-400' : a.adherenciaPct && a.adherenciaPct >= 70 ? 'text-yellow-400' : 'text-red-400'}>{a.adherenciaPct}%</span></div>
                  <Progress value={a.adherenciaPct} className="h-1 bg-[#1e1f2e]" />
                </div>
                {a.alertas.length > 0 && <div className="space-y-1">{a.alertas.map((al,i) => <div key={i} className="flex items-center gap-1 text-xs text-red-400"><AlertTriangle className="w-3 h-3" />{al}</div>)}</div>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {vista === 'alertas' && (
        <div className="space-y-3">
          {alertas.length === 0 ? (
            <Card className="bg-[#11121a] border-[#1e1f2e] p-8 text-center">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-[#8a8d9e]">{tx.noAlerts}</p>
            </Card>
          ) : alertas.map(a => (
            <Card key={a.id} className="bg-[#11121a] border-[#1e1f2e]">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${a.tipo === 'reds' ? 'bg-red-500/20' : a.tipo === 'adherencia' ? 'bg-orange-500/20' : a.tipo === 'wearable' ? 'bg-blue-500/20' : 'bg-yellow-500/20'}`}>
                  {a.tipo === 'reds' ? <Heart className="w-5 h-5 text-red-400" /> : a.tipo === 'adherencia' ? <Utensils className="w-5 h-5 text-orange-400" /> : a.tipo === 'wearable' ? <Activity className="w-5 h-5 text-blue-400" /> : <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cSev(a.severidad)}>{a.severidad === 'critica' ? tx.badgeCritical : a.severidad === 'alta' ? tx.badgeHigh : a.severidad === 'media' ? tx.badgeMedium : tx.badgeLow}</Badge>
                    <span className="text-xs text-[#55576b]">{a.fecha}</span>
                  </div>
                  <p className="text-sm text-[#f0f0f5] font-medium">{a.mensaje}</p>
                  <p className="text-xs text-[#8a8d9e] mt-1">{tx.alertBanner}: {a.atletasAfectados.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#D4FF00]" /> {tx.comparisonTitle}</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div><p className="text-[10px] text-[#8a8d9e] uppercase">{tx.avgFat}</p><p className="text-xl font-bold text-[#f0f0f5]">{atletas.length > 0 ? (atletas.reduce((s,a)=>s+(a.porcentajeGrasa||0),0)/atletas.length).toFixed(1) : '--'}%</p></div>
            <div><p className="text-[10px] text-[#8a8d9e] uppercase">{tx.avgIMO}</p><p className="text-xl font-bold text-[#f0f0f5]">{atletas.length > 0 ? (atletas.reduce((s,a)=>s+(a.imo||0),0)/atletas.length).toFixed(2) : '--'}</p></div>
            <div><p className="text-[10px] text-[#8a8d9e] uppercase">{tx.avgMuscle}</p><p className="text-xl font-bold text-[#f0f0f5]">{atletas.length > 0 ? (atletas.reduce((s,a)=>s+(a.masaMuscular||0),0)/atletas.length).toFixed(1) : '--'} kg</p></div>
            <div><p className="text-[10px] text-[#8a8d9e] uppercase">{tx.avgIMC}</p><p className="text-xl font-bold text-[#f0f0f5]">{atletas.length > 0 ? (atletas.reduce((s,a)=>s+(a.imc||0),0)/atletas.length).toFixed(1) : '--'}</p></div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
              <p className="text-xs font-semibold text-[#D4FF00] mb-2 flex items-center gap-1"><Target className="w-3 h-3" /> {tx.bestIMO}</p>
              {(() => { const m = [...atletas].sort((a,b)=>(b.imo||0)-(a.imo||0))[0]; return m ? <div className="flex items-center justify-between"><span className="text-sm text-[#f0f0f5]">{m.nombre}</span><span className="font-mono text-[#D4FF00]">{m.imo?.toFixed(2)}</span></div> : <span className="text-xs text-[#55576b]">--</span>; })()}
            </div>
            <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
              <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" /> {tx.bestAdherence}</p>
              {(() => { const m = [...atletas].sort((a,b)=>(b.adherenciaPct||0)-(a.adherenciaPct||0))[0]; return m ? <div className="flex items-center justify-between"><span className="text-sm text-[#f0f0f5]">{m.nombre}</span><span className="font-mono text-emerald-400">{m.adherenciaPct}%</span></div> : <span className="text-xs text-[#55576b]">--</span>; })()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
