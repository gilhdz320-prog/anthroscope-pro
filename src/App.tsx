import { useState, useCallback } from 'react';
import './i18n';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster, toast } from 'sonner';
import {
  User, Ruler, Activity, FileText, BarChart3, Save,
  Download, RotateCcw, ChevronRight, Dna, Calculator,
  ShieldCheck, Globe, History, CreditCard, Printer,
  Sparkles, FileSpreadsheet, Users, Brain, TrendingUp, Zap, Upload, Trophy, Palette, Mail, Apple, ChefHat, MapPin, Heart, Droplets, MessageSquare, Calendar,
} from 'lucide-react';
import * as XLSX from 'xlsx';

import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import type { Sujeto, PerfilRestringido, PerfilCompleto, ResultadoISAK, MedicionesAvanzadas } from '@/types/isak';
import {
  calcularSomatotipo,
  calcularCincoComponentes,
  calcularClasicos,
  calcularPhantom,
  calcularIndices,
} from '@/lib/calculations';

import { SujetoForm } from '@/sections/SujetoForm';
import { MedicionesForm } from '@/sections/MedicionesForm';
import { ETMPanel } from '@/sections/ETMPanel';
import { ResultadosDashboard } from '@/sections/ResultadosDashboard';
import { ReporteView } from '@/sections/ReporteView';
import { SaasPanel } from '@/sections/SaasPanel';
import { ReporteWhatsApp } from '@/sections/ReporteWhatsApp';
import { RiesgoLesion } from '@/sections/RiesgoLesion';
import { TierBadge } from '@/components/TierBadge';
import { EmailSimulado } from '@/components/EmailSimulado';
import { WhiteLabelPanel } from '@/components/WhiteLabelPanel';
import { GruposPanel } from '@/sections/GruposPanel';
import { CuadrantesHolway } from '@/sections/CuadrantesHolway';
import { PotencialGenetico } from '@/sections/PotencialGenetico';
import { TrackingPanel } from '@/sections/TrackingPanel';
import { ModoCompetencia } from '@/sections/ModoCompetencia';
import { ImportarExcel } from '@/sections/ImportarExcel';
import { NutricionPanel } from '@/sections/NutricionPanel';
import { Recetario } from '@/sections/Recetario';
import { ClientesPanel } from '@/sections/ClientesPanel';
import { PortalCliente } from '@/sections/PortalCliente';
import { AlimentosLATAM } from '@/sections/AlimentosLATAM';
import { PeriodizacionNutricional } from '@/sections/PeriodizacionNutricional';
import { HidratacionPanel } from '@/sections/HidratacionPanel';
import { REDSModule } from '@/sections/REDSModule';
import { WADAVerificador } from '@/sections/WADAVerificador';
import { CoachDashboard } from '@/sections/CoachDashboard';
import { NutriAICoach } from '@/sections/NutriAICoach';
import { PlanIA } from '@/sections/PlanIA';
import { CoachReportCard } from '@/lib/lenguajeCoach';
import { ChecklistISAK, FotosProgreso, CalculadoraObjetivos } from '@/sections/ChecklistYExtras';
import { ComparacionPrePost, DashboardEquipo } from '@/sections/DashboardEquipo';
import { Avatar3DLazy } from '@/components/three/Avatar3DLazy';
import { Somatocarta } from '@/components/Somatocarta';
import { SomatocartaGrupal } from '@/components/SomatocartaGrupal';
import Login from '@/pages/Login';
import LandingPage from '@/pages/LandingPage';
import { encontrarReferencia, calcularPercentil, mensajePercentil } from '@/data/referenciasOlimpicas';

function emptyPerfilRestringido(): PerfilRestringido {
  return {
    masaCorporal: 0, estatura: 0, tallaSentada: 0,
    triceps: 0, subescapular: 0, biceps: 0,
    crestaIliaca: 0, supraespinal: 0, abdominal: 0, musloAnterior: 0, piernaMedial: 0,
    brazoRelajado: 0, brazoFlexionado: 0, cinturaMinima: 0, gluteoMaximo: 0, pantorrillaMaxima: 0,
  };
}

function emptyPerfilCompleto(): PerfilCompleto {
  return {
    ...emptyPerfilRestringido(),
    biacromial: 0, humeroBiepicondilar: 0, femurBicondilar: 0,
    toraxMesoesternal: 0, musloMedio: 0, antebrazoMaximo: 0,
    mano: 0, pie: 0,
    cabeza: 0, cuello: 0,
  };
}

function ISAKApp() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [lang, setLang] = useState('es');

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : lang === 'en' ? 'fr' : lang === 'fr' ? 'pt' : 'es';
    i18n.changeLanguage(next);
    setLang(next);
  };

  const [sujeto, setSujeto] = useState<Sujeto>({
    id: crypto.randomUUID(), nombre: '', fechaNacimiento: '', sexo: 'masculino',
    fechaEvaluacion: new Date().toISOString().split('T')[0],
  });
  const [perfilR, setPerfilR] = useState<PerfilRestringido>(emptyPerfilRestringido());
  const [perfilC, setPerfilC] = useState<PerfilCompleto>(emptyPerfilCompleto());
  const [medAvanzado, setMedAvanzado] = useState<MedicionesAvanzadas>({
    pectoral: 0, axilar: 0, pantorrilla: 0,
    biIliocrestal: 0, bitrocanterico: 0,
    longitudBrazo: 0, longitudAntebrazo: 0, longitudMuslo: 0, longitudPierna: 0, longitudTronco: 0,
    envergadura: 0,
  });
  const [nivel, setNivel] = useState<1 | 2 | 3 | 4>(1);
  const [activeTab, setActiveTab] = useState(() => {
    const gotoTab = localStorage.getItem('anthroscope_goto_tab');
    if (gotoTab) {
      localStorage.removeItem('anthroscope_goto_tab');
      return gotoTab;
    }
    return 'sujeto';
  });
  const [resultado, setResultado] = useState<ResultadoISAK | null>(null);
  const [historial, setHistorial] = useState<ResultadoISAK[]>([]);

  const createPatient = trpc.patients.create.useMutation({
    onSuccess: () => {
      toast.success('Paciente guardado en la base de datos');
    },
    onError: (err) => {
      toast.error('Error al guardar paciente: ' + err.message);
    },
  });

  const handleGuardarPaciente = useCallback(() => {
    if (!sujeto.nombre) {
      toast.error('El nombre del paciente es obligatorio');
      return;
    }
    createPatient.mutate({
      nombre: sujeto.nombre,
      fechaNacimiento: sujeto.fechaNacimiento || undefined,
      sexo: sujeto.sexo,
      deporte: sujeto.deporte || undefined,
      notas: sujeto.notas || undefined,
    });
  }, [sujeto, createPatient]);

  const handleCalcular = useCallback(() => {
    try {
      if (!sujeto.nombre) { toast.error(t('common.sinDatos')); return; }
      if (perfilR.estatura <= 0 || perfilR.masaCorporal <= 0) {
        toast.error('Estatura y masa corporal son obligatorias'); return;
      }
      const esCompleto = nivel >= 2;
      const perfil = esCompleto ? perfilC : perfilR;
      const indices = calcularIndices(perfilR, perfilR.estatura, perfilR.masaCorporal);
      const somatotipo = calcularSomatotipo(perfilR, sujeto.sexo);
      let cincoComponentes: ResultadoISAK['cincoComponentes'] = undefined;
      if (esCompleto) {
        try { cincoComponentes = calcularCincoComponentes(perfilC, perfilC.estatura, perfilC.masaCorporal, sujeto.sexo); }
        catch (e) { console.warn('5 componentes error:', e); toast.warning('No se pudo calcular 5 componentes'); }
      }
      const edad = sujeto.fechaNacimiento ? Math.floor((new Date().getTime() - new Date(sujeto.fechaNacimiento).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined;
      const clasicos = calcularClasicos(perfilR, perfilR.estatura, perfilR.masaCorporal, sujeto.sexo, edad);
      let phantom: ResultadoISAK['phantom'] = undefined;
      if (esCompleto) { try { phantom = calcularPhantom(perfilC, perfilC.estatura); } catch (e) { console.warn('Phantom error:', e); } }
      const resultado: ResultadoISAK = { sujeto, perfil, nivel, esPerfilCompleto: esCompleto, somatotipo, cincoComponentes, clasicos, phantom, avanzado: nivel >= 3 ? medAvanzado : undefined, ...indices };
      setResultado(resultado);
      setHistorial(prev => [resultado, ...prev].slice(0, 50));

      // Guardar automáticamente para tracking longitudinal
      const all = JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');
      all.push({ id: sujeto.id + '_' + sujeto.fechaEvaluacion, fecha: sujeto.fechaEvaluacion, resultado });
      localStorage.setItem('anthroscope_evaluaciones', JSON.stringify(all.slice(-100)));

      toast.success('Evaluación calculada y guardada para tracking');
      setActiveTab('resultados');
    } catch (err: any) {
      console.error('CALCULAR ERROR:', err);
      toast.error('Error al calcular: ' + (err?.message || 'Error desconocido'));
    }
  }, [sujeto, perfilR, perfilC, nivel, t]);

  const handleGuardar = useCallback(() => {
    if (!resultado) return;
    const blob = new Blob([JSON.stringify(resultado, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ANTHROSCOPE_${resultado.sujeto.nombre}_${resultado.sujeto.fechaEvaluacion}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t('reporte.guardarJSON'));
  }, [resultado, t]);

  const handleExportPDF = useCallback(async () => {
    if (!resultado) return;
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');
    const element = document.getElementById('reporte-isak');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`ANTHROSCOPE_Report_${resultado.sujeto.nombre}.pdf`);
    toast.success('PDF exportado');
  }, [resultado]);

  const handleExportExcel = useCallback(() => {
    if (!resultado) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      { Campo: 'Nombre', Valor: resultado.sujeto.nombre },
      { Campo: 'Fecha Evaluación', Valor: resultado.sujeto.fechaEvaluacion },
      { Campo: 'Sexo', Valor: resultado.sujeto.sexo },
      { Campo: 'Estatura (cm)', Valor: resultado.perfil.estatura },
      { Campo: 'Masa Corporal (kg)', Valor: resultado.perfil.masaCorporal },
      { Campo: 'IMC', Valor: resultado.imc },
      { Campo: '% Grasa (Siri)', Valor: resultado.siriPorcentajeGrasa + '%' },
      { Campo: 'Endomorfia', Valor: resultado.somatotipo?.endomorfia },
      { Campo: 'Mesomorfia', Valor: resultado.somatotipo?.mesomorfia },
      { Campo: 'Ectomorfia', Valor: resultado.somatotipo?.ectomorfia },
      { Campo: 'Masa Muscular (kg)', Valor: resultado.cincoComponentes?.masaMuscular },
      { Campo: 'Masa Ósea (kg)', Valor: resultado.cincoComponentes?.masaOsea },
      { Campo: 'Masa Adiposa (kg)', Valor: resultado.cincoComponentes?.masaAdiposa },
      { Campo: 'Índice Músculo-Óseo', Valor: resultado.cincoComponentes?.indiceMusculoOseo },
      { Campo: 'Z-Score Muscular', Valor: resultado.cincoComponentes?.zScoreMuscular },
      { Campo: '% Grasa Carter', Valor: resultado.clasicos?.carterPorcentajeGrasa },
      { Campo: '% Grasa Faulkner', Valor: resultado.clasicos?.faulknerPorcentajeGrasa },
      { Campo: '% Grasa Durnin-Womersley', Valor: resultado.clasicos?.durninWomersleyPorcentajeGrasa },
      { Campo: 'Masa Muscular Lee (kg)', Valor: resultado.clasicos?.leeMasaMuscular },
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Evaluacion');
    XLSX.writeFile(wb, `ANTHROSCOPE_Excel_${resultado.sujeto.nombre}.xlsx`);
    toast.success('Excel exportado');
  }, [resultado]);

  const cargarDemoNivel4 = () => {
    const demoSujeto: Sujeto = {
      id: crypto.randomUUID(), nombre: 'Demo: Atleta Elite Nivel 4',
      fechaNacimiento: '1998-03-15', sexo: 'masculino',
      fechaEvaluacion: new Date().toISOString().split('T')[0],
      deporte: 'Halterofilia / Fuerza Olimpica',
      nivelActividad: 'atleta',
      notas: 'Caso de estudio Nivel 4. Atleta masculino 26 años, halterofilia categoria 81kg.',
    };
    const demoPerfilR: PerfilRestringido = {
      masaCorporal: 80.5, estatura: 172.0,
      triceps: 6.2, subescapular: 8.5, biceps: 4.1, crestaIliaca: 9.8,
      supraespinal: 6.4, abdominal: 10.2, musloAnterior: 11.5, piernaMedial: 7.8,
      brazoRelajado: 32.5, brazoFlexionado: 34.8, antebrazoMaximo: 28.4,
      toraxMesoesternal: 102.0, cinturaMinima: 78.5, gluteoMaximo: 96.0,
      musloMedio: 58.5, pantorrillaMaxima: 38.2,
      biacromial: 42.5, humeroBiepicondilar: 7.2, femurBicondilar: 10.1,
    };
    const demoPerfilC: PerfilCompleto = {
      ...demoPerfilR, cabeza: 57.5, cuello: 38.2, munecaDistal: 17.8,
      musloSuperior: 60.2, tobilloMinimo: 22.4, tallaSentada: 90.5, envergadura: 178.0,
      biiliocrestal: 31.5, acromialeRadiale: 34.5, radialeStylion: 26.8, midStylionDactylion: 19.5,
      alturaIliospinale: 98.5, alturaTrochanterion: 96.2,
      longitudTrochanterionTibialeLaterale: 49.5, alturaTibialeLaterale: 52.8,
      longitudTibialeMedialeSphyrion: 38.5, longitudPie: 27.5,
      profundidadAPAbdominal: 18.5, toraxAP: 28.5, biestiloideo: 6.2,
    };
    setSujeto(demoSujeto); setPerfilR(demoPerfilR); setPerfilC(demoPerfilC);
    setNivel(4); toast.success('Demo Nivel 4 cargado'); setActiveTab('mediciones');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#f0f0f5]">
      <Toaster position="top-right" richColors />

      <header className="bg-[#0a0b0f] text-[#f0f0f5] py-4 px-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#D4FF00]/100 p-2 rounded-lg">
              <Dna className="w-6 h-6 text-[#f0f0f5]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ANTHROSCOPE<span className="text-[#D4FF00]"> PRO</span></h1>
              <p className="text-xs text-[#55576b]">Kinanthropometric Intelligence System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-[#D4FF00] text-[#D4FF00] rounded-md hover:bg-[#D4FF00]/10 hover:text-[#D4FF00] transition-colors">
              <User className="w-4 h-4" /> Login
            </a>
            {user && (
              <>
                <TierBadge tier={(user as any).tier || 'free'} role={(user as any).role || 'user'} />
                <span className="text-sm text-[#D4FF00] hidden md:inline">{user.name || user.email}</span>
                <Button variant="ghost" size="sm" className="text-[#55576b] hover:text-[#f0f0f5]" onClick={logout}>Salir</Button>
              </>
            )}
            <Button variant="outline" size="sm" className="border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/10 hover:text-amber-200 hidden md:flex"
              onClick={cargarDemoNivel4}>
              <Sparkles className="w-4 h-4 mr-1" /> Demo Nivel 4
            </Button>
            <div className="flex items-center gap-1 bg-[#11121a] border border-[#1e1f2e] rounded-lg px-1 py-0.5">
              <button
                onClick={() => { i18n.changeLanguage('es'); setLang('es'); }}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${lang === 'es' ? 'bg-[#D4FF00] text-[#050608]' : 'text-[#55576b] hover:text-[#f0f0f5]'}`}
              >ES</button>
              <button
                onClick={() => { i18n.changeLanguage('en'); setLang('en'); }}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${lang === 'en' ? 'bg-[#D4FF00] text-[#050608]' : 'text-[#55576b] hover:text-[#f0f0f5]'}
`}
              >EN</button>
            </div>
            <Badge variant="outline" className="border-[#D4FF00] text-[#D4FF00]">
              Nivel {nivel}
            </Badge>
            <Select value={String(nivel)} onValueChange={(v) => setNivel(Number(v) as 1 | 2 | 3 | 4)}>
              <SelectTrigger className="w-32 bg-[#11121a] border-slate-700 text-[#f0f0f5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#11121a] border-slate-700">
                <SelectItem value="1">Nivel 1</SelectItem>
                <SelectItem value="2">Nivel 2</SelectItem>
                <SelectItem value="3">Nivel 3</SelectItem>
                <SelectItem value="4">Nivel 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 bg-[#11121a] border shadow-sm p-1 h-auto">
            <TabsTrigger value="sujeto" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <User className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.sujeto')}</span>
            </TabsTrigger>
            <TabsTrigger value="mediciones" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Ruler className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.mediciones')}</span>
            </TabsTrigger>
            <TabsTrigger value="etm" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.etm')}</span>
            </TabsTrigger>
            <TabsTrigger value="resultados" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <BarChart3 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.resultados')}</span>
            </TabsTrigger>
            <TabsTrigger value="reporte" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <FileText className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.reporte')}</span>
            </TabsTrigger>
            <TabsTrigger value="grupos" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Users className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.grupos')}</span>
            </TabsTrigger>
            <TabsTrigger value="genetico" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Brain className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.genetico') || 'Genetico'}</span>
            </TabsTrigger>
            <TabsTrigger value="historial" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <History className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.historial')}</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <TrendingUp className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="competencia" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Zap className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Competencia</span>
            </TabsTrigger>
            <TabsTrigger value="nutricion" className="flex items-center gap-1.5 data-[state=active]:bg-[#f59e0b]/10 data-[state=active]:text-[#f59e0b] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Apple className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Nutrición</span>
            </TabsTrigger>
            <TabsTrigger value="recetas" className="flex items-center gap-1.5 data-[state=active]:bg-[#22c55e]/10 data-[state=active]:text-[#22c55e] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <ChefHat className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Recetas</span>
            </TabsTrigger>
            <TabsTrigger value="alimentos" className="flex items-center gap-1.5 data-[state=active]:bg-[#f472b6]/10 data-[state=active]:text-[#f472b6] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Alimentos</span>
            </TabsTrigger>
            <TabsTrigger value="plan-ia" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#D4FF00] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Plan IA</span>
            </TabsTrigger>
            <TabsTrigger value="periodizacion" className="flex items-center gap-1.5 data-[state=active]:bg-[#a78bfa]/10 data-[state=active]:text-[#a78bfa] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Periodizar</span>
            </TabsTrigger>
            <TabsTrigger value="hidratacion" className="flex items-center gap-1.5 data-[state=active]:bg-[#06b6d4]/10 data-[state=active]:text-[#06b6d4] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Droplets className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Hidratacion</span>
            </TabsTrigger>
            <TabsTrigger value="reds" className="flex items-center gap-1.5 data-[state=active]:bg-[#ef4444]/10 data-[state=active]:text-[#ef4444] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Heart className="w-3.5 h-3.5" /> <span className="hidden sm:inline">RED-S</span>
            </TabsTrigger>
            <TabsTrigger value="wada" className="flex items-center gap-1.5 data-[state=active]:bg-[#f59e0b]/10 data-[state=active]:text-[#f59e0b] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" /> <span className="hidden sm:inline">WADA</span>
            </TabsTrigger>
            <TabsTrigger value="wearables" className="flex items-center gap-1.5 data-[state=active]:bg-[#06b6d4]/10 data-[state=active]:text-[#06b6d4] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Activity className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Wearables</span>
            </TabsTrigger>
            <TabsTrigger value="clientes" className="flex items-center gap-1.5 data-[state=active]:bg-[#6366f1]/10 data-[state=active]:text-[#6366f1] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Users className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="coach" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#D4FF00] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <TrendingUp className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Coach</span>
            </TabsTrigger>
            <TabsTrigger value="ai-coach" className="flex items-center gap-1.5 data-[state=active]:bg-[#22c55e]/10 data-[state=active]:text-[#22c55e] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <MessageSquare className="w-3.5 h-3.5" /> <span className="hidden sm:inline">AI Coach</span>
            </TabsTrigger>
            <TabsTrigger value="portal" className="flex items-center gap-1.5 data-[state=active]:bg-[#06b6d4]/10 data-[state=active]:text-[#06b6d4] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <User className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Portal</span>
            </TabsTrigger>
            <TabsTrigger value="importar" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Upload className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Importar</span>
            </TabsTrigger>
            <TabsTrigger value="saas" className="flex items-center gap-1.5 data-[state=active]:bg-[#D4FF00]/10 data-[state=active]:text-[#050608] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <CreditCard className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('tabs.saas')}</span>
            </TabsTrigger>
            <TabsTrigger value="white-label" className="flex items-center gap-1.5 data-[state=active]:bg-[#a78bfa]/10 data-[state=active]:text-[#a78bfa] text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md whitespace-nowrap">
              <Palette className="w-3.5 h-3.5" /> <span className="hidden sm:inline">White-Label</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sujeto" className="space-y-4">
            <SujetoForm sujeto={sujeto} onChange={setSujeto} />
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00]/10"
                onClick={handleGuardarPaciente}
                disabled={createPatient.isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                {createPatient.isPending ? 'Guardando...' : 'Guardar Paciente'}
              </Button>
            </div>
            <Card className="bg-[#11121a] border-[#1e1f2e] p-6">
              <ChecklistISAK />
            </Card>
          </TabsContent>

          <TabsContent value="mediciones" className="space-y-4">
            <MedicionesForm perfilR={perfilR} perfilC={perfilC} nivel={nivel} onChangeR={setPerfilR} onChangeC={setPerfilC} avanzado={medAvanzado} onChangeAvanzado={setMedAvanzado} />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setPerfilR(emptyPerfilRestringido()); setPerfilC(emptyPerfilCompleto()); }}>
                <RotateCcw className="w-4 h-4 mr-2" /> {t('mediciones.limpiar')}
              </Button>
              <Button className="bg-[#D4FF00] hover:bg-[#a8cc00]" onClick={handleCalcular}>
                <Calculator className="w-4 h-4 mr-2" /> {t('mediciones.calcular')}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="etm" className="space-y-4">
            <ETMPanel />
          </TabsContent>

          <TabsContent value="resultados" className="space-y-4">
            {resultado ? (
              <div className="space-y-6">
                <ResultadosDashboard resultado={resultado} />

                <ReporteWhatsApp resultado={resultado} />

                <RiesgoLesion resultado={resultado} />

                <EmailSimulado resultado={resultado} />

                <CoachReportCard resultado={resultado} />

                {/* REFERENCIAS OLIMPICAS - Percentiles */}
                {resultado.cincoComponentes && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#D4FF00]" />
                      Comparativa con Referencias Olimpicas
                    </h3>
                    <div className="space-y-3">
                      {(() => {
                        const deporte = resultado.sujeto.deporte?.toLowerCase().trim() || '';
                        const ref = encontrarReferencia(deporte, resultado.sujeto.sexo as 'masculino' | 'femenino', resultado.perfil.masaCorporal) || encontrarReferencia('halterofilia', resultado.sujeto.sexo as 'masculino' | 'femenino');
                        if (!ref) return <p className="text-[#8a8d9e]">No hay referencias disponibles para este deporte.</p>;
                        const pIMO = calcularPercentil(resultado.cincoComponentes!.indiceMusculoOseo, ref.imoPromedio, ref.imoSD);
                        const pGrasa = calcularPercentil(resultado.siriPorcentajeGrasa || 0, ref.porcentajeGrasaPromedio, ref.porcentajeGrasaSD);
                        const pMusculo = calcularPercentil(resultado.cincoComponentes!.masaMuscular, ref.masaMuscularPromedio, ref.masaMuscularSD);
                        return (
                          <>
                            <p className="text-sm text-[#8a8d9e] mb-3">Comparado con {ref.deporte} {resultado.sujeto.sexo} (n={ref.n}) — {ref.fuente}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                                <p className="text-xs text-[#8a8d9e]">IMO — Percentil</p>
                                <p className="text-2xl font-bold text-[#D4FF00]">{pIMO}<span className="text-sm">/100</span></p>
                                <p className="text-xs text-[#55576b]">{mensajePercentil(pIMO, 'IMO')}</p>
                              </div>
                              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                                <p className="text-xs text-[#8a8d9e]">% Grasa — Percentil</p>
                                <p className="text-2xl font-bold text-[#f59e0b]">{pGrasa}<span className="text-sm">/100</span></p>
                                <p className="text-xs text-[#55576b]">{mensajePercentil(pGrasa, '% grasa')}</p>
                              </div>
                              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                                <p className="text-xs text-[#8a8d9e]">Masa Muscular — Percentil</p>
                                <p className="text-2xl font-bold text-[#6366f1]">{pMusculo}<span className="text-sm">/100</span></p>
                                <p className="text-xs text-[#55576b]">{mensajePercentil(pMusculo, 'masa muscular')}</p>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </Card>
                )}

                {resultado.somatotipo && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#D4FF00]" />
                      {t('resultados.somatocarta')}
                    </h3>
                    <div className="h-[400px]">
                      <Somatocarta
                        endomorfia={resultado.somatotipo.endomorfia}
                        mesomorfia={resultado.somatotipo.mesomorfia}
                        ectomorfia={resultado.somatotipo.ectomorfia}
                        nombre={resultado.sujeto.nombre}
                      />
                    </div>
                  </Card>
                )}

                {resultado.cincoComponentes && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Dna className="w-5 h-5 text-[#6366f1]" />
                      {t('resultados.avatar3d')}
                    </h3>
                    <Avatar3DLazy
                      estatura={resultado.perfil.estatura}
                      masaCorporal={resultado.perfil.masaCorporal}
                      siriPorcentajeGrasa={resultado.siriPorcentajeGrasa || 0}
                      cincoComponentes={resultado.cincoComponentes}
                      somatotipo={resultado.somatotipo}
                      labels={{
                        grasa: t('avatar.grasa'),
                        musculo: t('avatar.musculo'),
                        hueso: t('avatar.hueso'),
                        imo: t('avatar.imo'),
                        somatotipo: t('avatar.somatotipo'),
                      }}
                    />
                  </Card>
                )}

                {resultado.somatotipo && resultado.cincoComponentes && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#a78bfa]" />
                      Cuadrantes de Francis Holway
                    </h3>
                    <CuadrantesHolway
                      masaMuscular={resultado.cincoComponentes.masaMuscular}
                      masaGrasa={resultado.cincoComponentes.masaAdiposa}
                      imo={resultado.cincoComponentes.indiceMusculoOseo}
                      porcentajeGrasa={resultado.siriPorcentajeGrasa || 0}
                    />
                  </Card>
                )}
                {resultado.cincoComponentes && (
                  <CalculadoraObjetivos
                    imoActual={resultado.cincoComponentes.indiceMusculoOseo}
                    imoMaximo={sujeto.sexo === 'masculino' ? 5.5 : 5.1}
                    masaMuscular={resultado.cincoComponentes.masaMuscular}
                    masaGrasa={resultado.cincoComponentes.masaAdiposa}
                    sexo={sujeto.sexo}
                  />
                )}

                <ComparacionPrePost nombre={sujeto.nombre} sexo={sujeto.sexo} />

                <FotosProgreso sujetoId={resultado.sujeto.id} />

              </div>
            ) : (
              <Card className="p-12 text-center bg-[#11121a] border-[#1e1f2e]">
                <Activity className="w-12 h-12 text-[#55576b] mx-auto mb-4" />
                <p className="text-[#8a8d9e]">{t('common.sinDatos')}</p>
                <Button className="mt-4 bg-[#D4FF00] hover:bg-[#a8cc00]" onClick={() => setActiveTab('mediciones')}>
                  {t('tabs.mediciones')} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reporte" className="space-y-4">
            {resultado ? (
              <>
                <div className="flex justify-end gap-3 mb-4 no-print">
                  <Button variant="outline" onClick={handleGuardar}>
                    <Save className="w-4 h-4 mr-2" /> {t('reporte.guardarJSON')}
                  </Button>
                  <Button variant="outline" onClick={handleExportExcel}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" /> Excel
                  </Button>
                  <Button variant="outline" onClick={handleExportPDF}>
                    <Printer className="w-4 h-4 mr-2" /> PDF
                  </Button>
                  <Button className="bg-[#D4FF00] hover:bg-[#a8cc00]" onClick={() => window.print()}>
                    <Download className="w-4 h-4 mr-2" /> {t('reporte.imprimirPDF')}
                  </Button>
                </div>
                <div id="reporte-isak">
                  <ReporteView resultado={resultado} />
                </div>
              </>
            ) : (
              <Card className="p-12 text-center bg-[#11121a] border-[#1e1f2e]">
                <FileText className="w-12 h-12 text-[#55576b] mx-auto mb-4" />
                <p className="text-[#8a8d9e]">{t('common.sinDatos')}</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="grupos" className="space-y-4">
            <DashboardEquipo />
            <GruposPanel />
          </TabsContent>

          <TabsContent value="genetico" className="space-y-4">
            {resultado?.cincoComponentes ? (
              <PotencialGenetico
                masaMuscular={resultado.cincoComponentes.masaMuscular}
                masaOsea={resultado.cincoComponentes.masaOsea}
                imo={resultado.cincoComponentes.indiceMusculoOseo}
                sexo={sujeto.sexo}
                estatura={sujeto.sexo === 'masculino' ? 178.5 : 165.0}
              />
            ) : (
              <Card className="p-12 text-center bg-[#11121a] border-[#1e1f2e]">
                <Brain className="w-12 h-12 text-[#55576b] mx-auto mb-4" />
                <p className="text-[#8a8d9e]">Calcula primero la evaluación para ver el potencial genético</p>
                <Button className="mt-4 bg-[#D4FF00] hover:bg-[#a8cc00]" onClick={() => setActiveTab('mediciones')}>
                  Ir a Mediciones <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <TrackingPanel />
          </TabsContent>

          <TabsContent value="competencia" className="space-y-4">
            <ModoCompetencia />
          </TabsContent>

          <TabsContent value="nutricion" className="space-y-4">
            <NutricionPanel />
          </TabsContent>

          <TabsContent value="recetas" className="space-y-4">
            <Recetario />
          </TabsContent>

          <TabsContent value="alimentos" className="space-y-4">
            <AlimentosLATAM />
          </TabsContent>

          <TabsContent value="plan-ia" className="space-y-4">
            <PlanIA />
          </TabsContent>

          <TabsContent value="periodizacion" className="space-y-4">
            <PeriodizacionNutricional />
          </TabsContent>

          <TabsContent value="hidratacion" className="space-y-4">
            <HidratacionPanel />
          </TabsContent>

          <TabsContent value="reds" className="space-y-4">
            <REDSModule />
          </TabsContent>

          <TabsContent value="wada" className="space-y-4">
            <WADAVerificador />
          </TabsContent>

          <TabsContent value="wearables" className="space-y-4">
            <WearableInput />
          </TabsContent>

          <TabsContent value="clientes" className="space-y-4">
            <ClientesPanel />
          </TabsContent>

          <TabsContent value="coach" className="space-y-4">
            <CoachDashboard />
          </TabsContent>

          <TabsContent value="ai-coach" className="space-y-4">
            <NutriAICoach />
          </TabsContent>

          <TabsContent value="portal" className="space-y-4">
            <PortalCliente />
          </TabsContent>

          <TabsContent value="importar" className="space-y-4">
            <ImportarExcel />
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-[#D4FF00]" />
                {t('resultados.historial')}
              </h3>
              {historial.length === 0 ? (
                <p className="text-[#55576b] text-center py-8">{t('common.sinDatos')}</p>
              ) : (
                <div className="space-y-3">
                  {historial.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#11121a] border rounded-lg hover:shadow-lg hover:shadow-[#D4FF00]/5 transition-shadow cursor-pointer" onClick={() => { setResultado(h); setActiveTab('resultados'); }}>
                      <div>
                        <p className="font-semibold">{h.sujeto.nombre}</p>
                        <p className="text-xs text-[#8a8d9e]">{h.sujeto.fechaEvaluacion} | Nivel {h.nivel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono">IMC {h.imc} | {h.siriPorcentajeGrasa}% Grasa</p>
                        <p className="text-xs text-[#8a8d9e]">{h.somatotipo?.categoria}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="saas" className="space-y-4">
            <SaasPanel />
          </TabsContent>

          <TabsContent value="white-label" className="space-y-4">
            <WhiteLabelPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ISAKApp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="*" element={<ISAKApp />} />
    </Routes>
  );
}
