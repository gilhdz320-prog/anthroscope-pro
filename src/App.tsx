import { useState, useCallback, Suspense } from 'react';
import './i18n';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster, toast } from 'sonner';
import {
  User,
  Ruler,
  Activity,
  FileText,
  BarChart3,
  Save,
  Download,
  RotateCcw,
  ChevronRight,
  Dna,
  Calculator,
  ShieldCheck,
  Globe,
  History,
  CreditCard,
  Printer,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';

import * as XLSX from 'xlsx';

import type { Sujeto, PerfilRestringido, PerfilCompleto, ResultadoISAK } from '@/types/isak';
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
import { Avatar3D } from '@/components/three/Avatar3D';
import { Somatocarta } from '@/components/Somatocarta';

function emptyPerfilRestringido(): PerfilRestringido {
  return {
    masaCorporal: 0, estatura: 0, triceps: 0, subescapular: 0, biceps: 0,
    crestaIliaca: 0, supraespinal: 0, abdominal: 0, musloAnterior: 0, piernaMedial: 0,
    brazoRelajado: 0, brazoFlexionado: 0, antebrazoMaximo: 0, toraxMesoesternal: 0,
    cinturaMinima: 0, gluteoMaximo: 0, musloMedio: 0, pantorrillaMaxima: 0,
    biacromial: 0, humeroBiepicondilar: 0, femurBicondilar: 0,
  };
}

function emptyPerfilCompleto(): PerfilCompleto {
  return { ...emptyPerfilRestringido(), biiliocrestal: 0, cabeza: 0, cuello: 0,
    munecaDistal: 0, musloSuperior: 0, tobilloMinimo: 0, tallaSentada: 0, envergadura: 0 };
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'es');

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    setLang(next);
  };

  const [sujeto, setSujeto] = useState<Sujeto>({
    id: crypto.randomUUID(),
    nombre: '', fechaNacimiento: '', sexo: 'masculino',
    fechaEvaluacion: new Date().toISOString().split('T')[0],
  });

  const [perfilR, setPerfilR] = useState<PerfilRestringido>(emptyPerfilRestringido());
  const [perfilC, setPerfilC] = useState<PerfilCompleto>(emptyPerfilCompleto());
  const [nivel, setNivel] = useState<1 | 2 | 3 | 4>(1);
  const [activeTab, setActiveTab] = useState('sujeto');
  const [resultado, setResultado] = useState<ResultadoISAK | null>(null);
  const [historial, setHistorial] = useState<ResultadoISAK[]>([]);

  const handleCalcular = useCallback(() => {
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
      catch (e) { toast.warning('No se pudo calcular 5 componentes'); }
    }

    const edad = sujeto.fechaNacimiento
      ? Math.floor((new Date().getTime() - new Date(sujeto.fechaNacimiento).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      : undefined;

    const clasicos = calcularClasicos(perfilR, perfilR.estatura, perfilR.masaCorporal, sujeto.sexo, edad);
    let phantom: ResultadoISAK['phantom'] = undefined;
    if (esCompleto) {
      try { phantom = calcularPhantom(perfilC, perfilC.estatura); } catch (e) {}
    }

    const resultado: ResultadoISAK = {
      sujeto, perfil, nivel, esPerfilCompleto: esCompleto,
      somatotipo, cincoComponentes, clasicos, phantom,
      ...indices,
    };

    setResultado(resultado);
    setHistorial(prev => [resultado, ...prev].slice(0, 20));
    toast.success('Evaluación calculada');
    setActiveTab('resultados');
  }, [sujeto, perfilR, perfilC, nivel, t]);

  const handleGuardar = useCallback(() => {
    if (!resultado) return;
    const blob = new Blob([JSON.stringify(resultado, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISAK_${resultado.sujeto.nombre}_${resultado.sujeto.fechaEvaluacion}.json`;
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
    pdf.save(`ISAK_Report_${resultado.sujeto.nombre}.pdf`);
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
      { Campo: 'Masa Grasa (kg)', Valor: resultado.masaGrasaSiri },
      { Campo: 'Masa Libre Grasa (kg)', Valor: resultado.masaLibreGrasa },
      { Campo: 'Endomorfia', Valor: resultado.somatotipo?.endomorfia },
      { Campo: 'Mesomorfia', Valor: resultado.somatotipo?.mesomorfia },
      { Campo: 'Ectomorfia', Valor: resultado.somatotipo?.ectomorfia },
      { Campo: 'Somatotipo', Valor: resultado.somatotipo?.categoria },
      { Campo: 'Índice Ponderal', Valor: resultado.indicePonderal },
      { Campo: 'Masa Muscular (kg)', Valor: resultado.cincoComponentes?.masaMuscular },
      { Campo: 'Masa Ósea (kg)', Valor: resultado.cincoComponentes?.masaOsea },
      { Campo: 'Masa Adiposa (kg)', Valor: resultado.cincoComponentes?.masaAdiposa },
      { Campo: 'Masa Piel (kg)', Valor: resultado.cincoComponentes?.masaPiel },
      { Campo: 'Masa Residual (kg)', Valor: resultado.cincoComponentes?.masaResidual },
      { Campo: 'Índice Músculo-Óseo', Valor: resultado.cincoComponentes?.indiceMusculoOseo },
      { Campo: 'Z-Score Muscular', Valor: resultado.cincoComponentes?.zScoreMuscular },
      { Campo: '% Grasa Carter', Valor: resultado.clasicos?.carterPorcentajeGrasa },
      { Campo: '% Grasa Faulkner', Valor: resultado.clasicos?.faulknerPorcentajeGrasa },
      { Campo: '% Grasa Yuhasz', Valor: resultado.clasicos?.yuhaszPorcentajeGrasa },
      { Campo: '% Grasa Durnin-Womersley', Valor: resultado.clasicos?.durninWomersleyPorcentajeGrasa },
      { Campo: 'Masa Muscular Lee (kg)', Valor: resultado.clasicos?.leeMasaMuscular },
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Evaluacion ISAK');
    XLSX.writeFile(wb, `ISAK_Excel_${resultado.sujeto.nombre}.xlsx`);
    toast.success('Excel exportado');
  }, [resultado]);

  const cargarDemoNivel4 = () => {
    const demoSujeto: Sujeto = {
      id: crypto.randomUUID(),
      nombre: 'Demo: Atleta de Élite (Nivel 4)',
      fechaNacimiento: '1998-03-15',
      sexo: 'masculino',
      fechaEvaluacion: new Date().toISOString().split('T')[0],
      deporte: 'Halterofilia / Fuerza Olímpica',
      nivelActividad: 'atleta',
      notas: 'Caso de estudio Nivel 4 ISAK. Atleta masculino 26 años, halterofilia categoría 81kg. Evaluación completa con Perfil Completo (42 medidas), Modelo de 5 Componentes, Phantom Stratagem, Somatotipo Heath-Carter y comparativa de fórmulas clásicas.',
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
      ...demoPerfilR,
      cabeza: 57.5, cuello: 38.2, munecaDistal: 17.8,
      musloSuperior: 60.2, tobilloMinimo: 22.4,
      tallaSentada: 90.5, envergadura: 178.0,
      biiliocrestal: 31.5,
      acromialeRadiale: 34.5, radialeStylion: 26.8, midStylionDactylion: 19.5,
      alturaIliospinale: 98.5, alturaTrochanterion: 96.2,
      longitudTrochanterionTibialeLaterale: 49.5,
      alturaTibialeLaterale: 52.8, longitudTibialeMedialeSphyrion: 38.5,
      longitudPie: 27.5,
      profundidadAPAbdominal: 18.5, toraxAP: 28.5,
      biestiloideo: 6.2,
    };

    setSujeto(demoSujeto);
    setPerfilR(demoPerfilR);
    setPerfilC(demoPerfilC);
    setNivel(4);
    toast.success('Demo Nivel 4 cargado: Atleta Halterofilia 81kg');
    setActiveTab('mediciones');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster position="top-right" richColors />

      <header className="bg-slate-900 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg"><Dna className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t('app.title')}</h1>
              <p className="text-xs text-slate-400">{t('app.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-amber-400 text-amber-300 hover:bg-amber-900 hover:text-amber-200 hidden md:flex"
              onClick={cargarDemoNivel4}>
              <Sparkles className="w-4 h-4 mr-1" /> Demo Nivel 4
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white" onClick={toggleLang}>
              <Globe className="w-4 h-4 mr-1" /> {lang === 'es' ? 'EN' : 'ES'}
            </Button>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              {t('app.nivel')} {nivel}
            </Badge>
            <Select value={String(nivel)} onValueChange={(v) => setNivel(Number(v) as 1 | 2 | 3 | 4)}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
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
          <TabsList className="grid grid-cols-7 bg-white border shadow-sm p-1">
            <TabsTrigger value="sujeto" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <User className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.sujeto')}</span>
            </TabsTrigger>
            <TabsTrigger value="mediciones" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <Ruler className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.mediciones')}</span>
            </TabsTrigger>
            <TabsTrigger value="etm" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.etm')}</span>
            </TabsTrigger>
            <TabsTrigger value="resultados" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <BarChart3 className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.resultados')}</span>
            </TabsTrigger>
            <TabsTrigger value="reporte" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <FileText className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.reporte')}</span>
            </TabsTrigger>
            <TabsTrigger value="historial" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <History className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.historial')}</span>
            </TabsTrigger>
            <TabsTrigger value="saas" className="flex items-center gap-1 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-xs md:text-sm">
              <CreditCard className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">{t('tabs.saas')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sujeto" className="space-y-4">
            <SujetoForm sujeto={sujeto} onChange={setSujeto} />
          </TabsContent>

          <TabsContent value="mediciones" className="space-y-4">
            <MedicionesForm perfilR={perfilR} perfilC={perfilC} nivel={nivel} onChangeR={setPerfilR} onChangeC={setPerfilC} />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setPerfilR(emptyPerfilRestringido()); setPerfilC(emptyPerfilCompleto()); }}>
                <RotateCcw className="w-4 h-4 mr-2" /> {t('mediciones.limpiar')}
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleCalcular}>
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

                {/* SOMATOCARTA */}
                {resultado.somatotipo && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
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
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      X = Mesomorfia - Endomorfia | Y = 2×Ectomorfia - (Endomorfia + Mesomorfia)
                    </p>
                  </Card>
                )}

                {/* AVATAR 3D */}
                {resultado.cincoComponentes && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Dna className="w-5 h-5 text-blue-600" />
                      {t('resultados.avatar3d')}
                    </h3>
                    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Cargando avatar 3D...</div>}>
                      <Avatar3D
                        estatura={resultado.perfil.estatura}
                        masaCorporal={resultado.perfil.masaCorporal}
                        siriPorcentajeGrasa={resultado.siriPorcentajeGrasa || 0}
                        cincoComponentes={resultado.cincoComponentes}
                        somatotipo={resultado.somatotipo}
                      />
                    </Suspense>
                    <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500/40" /> {t('resultados.masaAdiposa')}</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500/60" /> {t('resultados.masaMuscular')}</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-300/80" /> {t('resultados.masaOsea')}</span>
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{t('common.sinDatos')}</p>
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700" onClick={() => setActiveTab('mediciones')}>
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
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => window.print()}>
                    <Download className="w-4 h-4 mr-2" /> {t('reporte.imprimirPDF')}
                  </Button>
                </div>
                <div id="reporte-isak">
                  <ReporteView resultado={resultado} />
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{t('common.sinDatos')}</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-600" />
                {t('resultados.historial')}
              </h3>
              {historial.length === 0 ? (
                <p className="text-slate-400 text-center py-8">{t('common.sinDatos')}</p>
              ) : (
                <div className="space-y-3">
                  {historial.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                      <div>
                        <p className="font-semibold">{h.sujeto.nombre}</p>
                        <p className="text-xs text-slate-500">{h.sujeto.fechaEvaluacion} | {t('app.nivel')} {h.nivel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono">IMC {h.imc} | {h.siriPorcentajeGrasa}% Grasa</p>
                        <p className="text-xs text-slate-500">{h.somatotipo?.categoria}</p>
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
        </Tabs>
      </main>
    </div>
  );
}
