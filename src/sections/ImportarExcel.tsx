import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, ArrowRight, Database, Download, TrendingUp } from 'lucide-react';

// Types
interface ColumnMapping {
  header: string;
  field: string | null;
  confidence: number;
}

interface ImportRow {
  sujeto: any;
  perfilR: any;
  perfilC: any;
  raw: Record<string, any>;
  errors: string[];
}

// XLSX loaded dynamically from CDN
let xlsxLib: any = null;
async function loadXLSX(): Promise<any> {
  if (xlsxLib) return xlsxLib;
  if ((window as any).XLSX) { xlsxLib = (window as any).XLSX; return xlsxLib; }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js';
    script.onload = () => { xlsxLib = (window as any).XLSX; resolve(xlsxLib); };
    script.onerror = () => reject(new Error('Failed to load XLSX'));
    document.head.appendChild(script);
  });
}

// Column aliases for auto-detection — incluye ISAK + equipos comerciales
const COLUMN_ALIASES: Record<string, string[]> = {
  nombre: ['nombre','name','atleta','athlete','paciente','sujeto','jugador','deportista','id','member name','user name'],
  fechaEvaluacion: ['fecha','date','fecha eval','fecha evaluacion','eval date','evaluation date','test date','measurement date'],
  sexo: ['sexo','genero','gender','sex','género'],
  edad: ['edad','age','años','years'],
  deporte: ['deporte','sport','disciplina','discipline','activity level'],
  masaCorporal: ['peso','masa','mass','body weight','bw','weight','kg','bodyweight','masa corporal','body mass'],
  estatura: ['estatura','altura','talla','height','stature','cm','body height'],
  triceps: ['triceps','tríceps','pliegue tricipital','triceps skinfold','pt'],
  subescapular: ['subescapular','subescapula','pliegue subescapular','subscapular'],
  biceps: ['biceps','bíceps','pliegue bicipital','biceps skinfold','pb'],
  crestaIliaca: ['cresta iliaca','cri','iliac crest','suprailiac','suprailiaco','pliegue suprailiaco'],
  supraespinal: ['supraespinal','supraespinal','supraspinale','pse','supraspinal'],
  abdominal: ['abdominal','abdomen','ab','pliegue abdominal','pa'],
  musloAnterior: ['muslo anterior','muslo ant','anterior thigh','thigh ant','pliegue muslo ant'],
  piernaMedial: ['pierna medial','pierna','medial calf','calf','pliegue pierna','pantorrilla'],
  brazoRelajado: ['brazo relajado','brazo rel','relaxed arm','arm relaxed','perímetro brazo relajado','arm circ'],
  brazoFlexionado: ['brazo flexionado','brazo flex','flexed arm','arm flexed','perímetro brazo flexionado'],
  musloMedio: ['muslo medio','muslo','mid thigh','thigh mid','perímetro muslo','thigh circ'],
  pantorrillaMaxima: ['pantorrilla','pantorrilla max','calf max','max calf','perímetro pantorrilla','calf circ'],
  biacromial: ['biacromial','bi-acromial','shoulder breadth','biacromial diam'],
  humeroBiepicondilar: ['humero','húmero','humeral','biepicondilar humeral','humero biepicondilar','humeral diam'],
  femurBicondilar: ['femur','fémur','bicondilar femoral','femur bicondilar','femoral diam'],
  muneca: ['muneca','muñeca','wrist','perímetro muñeca','wrist circ'],
  cabeza: ['cabeza','head','perímetro cabeza','head circ'],
  cuello: ['cuello','neck','perímetro cuello','neck circ'],
  toraxMesoesternal: ['torax','tórax','torax mesoesternal','chest','perímetro torax','chest circ','thorax'],
  cinturaMinima: ['cintura','waist','perímetro cintura','cintura minima','waist circ','waist cm'],
  gluteoMaximo: ['gluteo','glúteo','gluteo maximo','hip','perímetro glúteo','hip circ','hips'],
  antebrazoMaximo: ['antebrazo','antebrazo maximo','forearm','perímetro antebrazo','forearm circ'],
  pie: ['pie','foot','perímetro pie','foot length'],
};

function detectField(header: string): string | null {
  const h = header.toLowerCase().trim().replace(/[\s_\-()]+/g, ' ').replace(/\s+/g, ' ').trim();
  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    for (const alias of aliases) {
      if (h === alias || h.includes(alias)) return field;
    }
  }
  return null;
}

function calcularFechaNacimiento(edad: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - edad);
  return d.toISOString().split('T')[0];
}

function emptyPerfilR() {
  return {
    masaCorporal: 0, estatura: 0, triceps: 0, subescapular: 0, biceps: 0,
    crestaIliaca: 0, supraespinal: 0, abdominal: 0, musloAnterior: 0, piernaMedial: 0,
    brazoRelajado: 0, brazoFlexionado: 0, antebrazoMaximo: 0, toraxMesoesternal: 0,
    cinturaMinima: 0, gluteoMaximo: 0, musloMedio: 0, pantorrillaMaxima: 0,
    biacromial: 0, humeroBiepicondilar: 0, femurBicondilar: 0,
  };
}

function emptyPerfilC() {
  return { ...emptyPerfilR(), cabeza: 0, pie: 0, cuello: 0, muneca: 0 };
}

function emptySujeto() {
  return {
    id: '', nombre: '', fechaNacimiento: '', fechaEvaluacion: new Date().toISOString().split('T')[0],
    sexo: 'masculino', deporte: '', nivelActividad: '', notas: '', evaluador: '', organizacion: '',
  };
}

function generarId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function ImportarExcel() {
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'done'>('upload');
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping[]>([]);
  const [previewRows, setPreviewRows] = useState<ImportRow[]>([]);
  const [importedCount, setImportedCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else setDragActive(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(xlsx?|csv)$/i)) {
      toast.error('Solo archivos .xlsx, .xls o .csv');
      return;
    }
    setLoading(true);
    try {
      const XLSX = await loadXLSX();
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      if (json.length < 2) {
        toast.error('El archivo parece estar vacío');
        setLoading(false);
        return;
      }

      const headers = json[0].map(String);
      const rows = json.slice(1).filter(r => r.some(c => c !== undefined && c !== ''));

      const autoMapping: ColumnMapping[] = headers.map(h => {
        const field = detectField(h);
        return { header: h, field, confidence: field ? 85 : 0 };
      });

      setRawHeaders(headers);
      setRawData(rows);
      setMapping(autoMapping);
      setStep('mapping');
      toast.success(`${autoMapping.filter(m => m.field).length} columnas detectadas, ${rows.length} filas encontradas`);
    } catch (err) {
      toast.error('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  const descargarPlantilla = async () => {
    try {
      const XLSX = await loadXLSX();
      const wb = XLSX.utils.book_new();
      const data = [
        ['nombre','sexo','fecha_evaluacion','peso_kg','estatura_cm','triceps_mm','subescapular_mm','biceps_mm','cresta_iliaca_mm','supraespinal_mm','abdominal_mm','muslo_anterior_mm','pierna_medial_mm','brazo_relajado_cm','brazo_flexionado_cm','muslo_medio_cm','pantorrilla_cm','biacromial_cm','humeral_biepicondilar_cm','femoral_bicondilar_cm','deporte'],
        ['Carlos Mendez','masculino','2024-01-15',78.5,178.2,8.2,10.5,6.1,12.8,8.4,14.2,15.6,10.2,32.5,34.2,55.8,38.5,40.2,7.2,10.1,'Halterofilia'],
        ['Maria Garcia','femenino','2024-01-15',62.3,165.8,14.5,16.2,9.8,18.5,12.1,18.4,22.8,14.5,28.4,30.1,52.4,35.2,38.5,6.2,9.8,'Natacion'],
      ];
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Mediciones ISAK');
      XLSX.writeFile(wb, 'ANTHROSCOPE_PRO_plantilla_ISAK.xlsx');
      toast.success('Plantilla descargada');
    } catch (e) {
      toast.error('No se pudo descargar la plantilla');
    }
  };

  const handleManualMapping = (headerIdx: number, field: string) => {
    const newMapping = [...mapping];
    newMapping[headerIdx] = { ...newMapping[headerIdx], field, confidence: 100 };
    setMapping(newMapping);
  };

  const buildPreview = () => {
    const rows: ImportRow[] = rawData.map((rawRow, idx) => {
      const sujeto = emptySujeto();
      const perfilR = emptyPerfilR();
      const perfilC = emptyPerfilC();
      const errors: string[] = [];

      mapping.forEach((m, colIdx) => {
        if (!m.field || rawRow[colIdx] === undefined) return;
        let val = rawRow[colIdx];
        if (typeof val === 'string') val = val.replace(',', '.').trim();
        const num = parseFloat(val);
        const str = String(val).toLowerCase().trim();

        switch (m.field) {
          case 'nombre': sujeto.nombre = String(val); break;
          case 'fechaEvaluacion': sujeto.fechaEvaluacion = String(val); break;
          case 'sexo': sujeto.sexo = str.includes('f') || str.includes('mujer') || str.includes('female') ? 'femenino' : 'masculino'; break;
          case 'edad': sujeto.fechaNacimiento = calcularFechaNacimiento(parseInt(val)); break;
          case 'deporte': sujeto.deporte = String(val); break;
          case 'masaCorporal': perfilR.masaCorporal = num; break;
          case 'estatura': perfilR.estatura = num; break;
          case 'triceps': perfilR.triceps = num; break;
          case 'subescapular': perfilR.subescapular = num; break;
          case 'biceps': perfilR.biceps = num; break;
          case 'crestaIliaca': perfilR.crestaIliaca = num; break;
          case 'supraespinal': perfilR.supraespinal = num; break;
          case 'abdominal': perfilR.abdominal = num; break;
          case 'musloAnterior': perfilR.musloAnterior = num; break;
          case 'piernaMedial': perfilR.piernaMedial = num; break;
          case 'brazoRelajado': perfilR.brazoRelajado = num; break;
          case 'brazoFlexionado': perfilR.brazoFlexionado = num; break;
          case 'musloMedio': perfilR.musloMedio = num; break;
          case 'pantorrillaMaxima': perfilR.pantorrillaMaxima = num; break;
          case 'biacromial': perfilR.biacromial = num; break;
          case 'humeroBiepicondilar': perfilR.humeroBiepicondilar = num; break;
          case 'femurBicondilar': perfilR.femurBicondilar = num; break;
          case 'muneca': perfilC.muneca = num; break;
          case 'cabeza': perfilC.cabeza = num; break;
          case 'cuello': perfilC.cuello = num; break;
          case 'toraxMesoesternal': perfilR.toraxMesoesternal = num; break;
          case 'cinturaMinima': perfilR.cinturaMinima = num; break;
          case 'gluteoMaximo': perfilR.gluteoMaximo = num; break;
          case 'antebrazoMaximo': perfilR.antebrazoMaximo = num; break;
          case 'pie': perfilC.pie = num; break;
        }
      });

      if (!sujeto.nombre) errors.push('Sin nombre');
      if (!perfilR.masaCorporal || perfilR.masaCorporal < 30 || perfilR.masaCorporal > 200) errors.push('Peso inválido');
      if (!perfilR.estatura || perfilR.estatura < 100 || perfilR.estatura > 250) errors.push('Estatura inválida');

      Object.assign(perfilC, perfilR);
      sujeto.id = generarId();

      return { sujeto, perfilR, perfilC, raw: rawRow, errors };
    });

    setPreviewRows(rows);
    setStep('preview');
    toast.success(`${rows.length} filas procesadas`);
  };

  const doImport = async () => {
    const validRows = previewRows.filter(r => r.errors.length === 0);
    const historial = JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');

    let count = 0;
    for (const row of validRows) {
      try {
        // Store raw data with ID for tracking
        historial.push({
          id: row.sujeto.id,
          fecha: row.sujeto.fechaEvaluacion,
          sujeto: row.sujeto,
          perfilR: row.perfilR,
          perfilC: row.perfilC,
        });
        count++;
      } catch (e) {
        console.warn('Error fila:', e);
      }
    }

    localStorage.setItem('anthroscope_evaluaciones', JSON.stringify(historial.slice(-200)));
    setImportedCount(count);
    setStep('done');
    toast.success(`${count} evaluaciones importadas`);
  };

  return (
    <div className="space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-[#050608]/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#f0f0f5]">Leyendo Excel...</p>
          </div>
        </div>
      )}

      {step === 'upload' && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <FileSpreadsheet className="w-6 h-6 text-[#D4FF00] mb-2" />
                <p className="text-sm font-semibold text-[#f0f0f5]">Cualquier formato Excel</p>
                <p className="text-xs text-[#55576b]">Detecta columnas en español o inglés automáticamente</p>
              </div>
              <div className="p-4 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <Database className="w-6 h-6 text-[#6366f1] mb-2" />
                <p className="text-sm font-semibold text-[#f0f0f5]">Importación masiva</p>
                <p className="text-xs text-[#55576b]">Procesa cientos o miles de evaluaciones en segundos</p>
              </div>
              <div className="p-4 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <TrendingUp className="w-6 h-6 text-[#22c55e] mb-2" />
                <p className="text-sm font-semibold text-[#f0f0f5]">Tracking inmediato</p>
                <p className="text-xs text-[#55576b]">Las evaluaciones aparecen automáticamente en gráficos</p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                dragActive ? 'border-[#D4FF00] bg-[#D4FF00]/5' : 'border-[#1e1f2e] hover:border-[#2e2f42]'
              }`}
              onDragEnter={onDrag}
              onDragLeave={onDrag}
              onDragOver={onDrag}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
            >
              <div className="w-16 h-16 bg-[#D4FF00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-[#D4FF00]" />
              </div>
              <h3 className="text-lg font-semibold text-[#f0f0f5] mb-2">
                Arrastra tu archivo Excel aquí
              </h3>
              <p className="text-sm text-[#8a8d9e] mb-4">
                ISAK, InBody, Tanita, Bod Pod, o cualquier formato (.xlsx, .xls, .csv)
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20">ISAK</Badge>
                <Badge className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20">InBody</Badge>
                <Badge className="bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20">Tanita</Badge>
                <Badge className="bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20">Bod Pod</Badge>
              </div>
              <p className="text-xs text-[#55576b]">
                Auto-detección de 80+ nombres de campo en español e inglés
              </p>
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files?.[0])}
              />
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={descargarPlantilla}
                className="border-[#2e2f42] text-[#8a8d9e] hover:text-[#D4FF00] hover:border-[#D4FF00]"
              >
                <Download className="w-4 h-4 mr-2" /> Descargar Plantilla Excel
              </Button>
              <p className="text-xs text-[#55576b] mt-2">
                ¿No tienes formato? Descarga la plantilla y pega tus datos
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'mapping' && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="text-[#f0f0f5] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#D4FF00]" />
              Mapeo de Columnas
            </CardTitle>
            <p className="text-sm text-[#8a8d9e]">
              {mapping.filter(m => m.field).length} de {mapping.length} columnas detectadas. Corrige manualmente si es necesario.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {mapping.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#f0f0f5]">{m.header}</p>
                  {rawData[0] && (
                    <p className="text-xs text-[#55576b] font-mono">Ej: {String(rawData[0][i] ?? '')}</p>
                  )}
                </div>
                <select
                  value={m.field || ''}
                  onChange={e => handleManualMapping(i, e.target.value)}
                  className="bg-[#11121a] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Ignorar</option>
                  {Object.keys(COLUMN_ALIASES).map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
                {m.field && m.confidence >= 85 ? (
                  <CheckCircle className="w-5 h-5 text-[#22c55e] shrink-0" />
                ) : m.field ? (
                  <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0" />
                ) : (
                  <span className="w-5 h-5 shrink-0" />
                )}
              </div>
            ))}
            <Button
              className="w-full h-12 bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] font-bold"
              onClick={buildPreview}
            >
              <ArrowRight className="w-5 h-5 mr-2" /> Previsualizar Datos
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'preview' && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="text-[#f0f0f5] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#D4FF00]" />
              Vista Previa ({previewRows.filter(r => r.errors.length === 0).length} válidas / {previewRows.length} total)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1f2e]">
                    <th className="text-left py-2 px-3 text-[#8a8d9e]">Estado</th>
                    <th className="text-left py-2 px-3 text-[#8a8d9e]">Nombre</th>
                    <th className="text-left py-2 px-3 text-[#8a8d9e]">Peso</th>
                    <th className="text-left py-2 px-3 text-[#8a8d9e]">Estatura</th>
                    <th className="text-left py-2 px-3 text-[#8a8d9e]">Errores</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, i) => {
                    const isValid = row.errors.length === 0;
                    return (
                      <tr key={i} className={`border-b border-[#1e1f2e]/50 ${!isValid ? 'opacity-50' : ''}`}>
                        <td className="py-2 px-3">
                          {isValid ? (
                            <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
                          )}
                        </td>
                        <td className="py-2 px-3 text-[#f0f0f5]">{row.sujeto.nombre || '—'}</td>
                        <td className="py-2 px-3 text-[#f0f0f5] font-mono">{row.perfilR.masaCorporal || '—'}</td>
                        <td className="py-2 px-3 text-[#f0f0f5] font-mono">{row.perfilR.estatura || '—'}</td>
                        <td className="py-2 px-3">
                          {row.errors.length > 0 && (
                            <Badge variant="outline" className="border-red-500/50 text-red-400 text-xs">
                              {row.errors.join(', ')}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setStep('mapping')} className="border-[#2e2f42] text-[#8a8d9e]">
                ← Volver al Mapeo
              </Button>
              <Button
                className="flex-1 h-12 bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] font-bold"
                onClick={doImport}
                disabled={previewRows.filter(r => r.errors.length === 0).length === 0}
              >
                <Database className="w-5 h-5 mr-2" />
                Importar {previewRows.filter(r => r.errors.length === 0).length} Evaluaciones
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'done' && (
        <Card className="bg-[#11121a] border-[#1e1f2e] text-center p-12">
          <div className="w-20 h-20 bg-[#D4FF00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#D4FF00]" />
          </div>
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-2">
            {importedCount} evaluaciones importadas
          </h2>
          <p className="text-[#8a8d9e] mb-6">
            Ve al tab Tracking para ver gráficos de evolución
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              className="bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] font-bold"
              onClick={() => {
                localStorage.setItem('anthroscope_goto_tab', 'tracking');
                window.location.hash = '/app';
                window.location.reload();
              }}
            >
              <TrendingUp className="w-5 h-5 mr-2" /> Ver Tracking
            </Button>
            <Button
              variant="outline"
              onClick={() => { setStep('upload'); setImportedCount(0); }}
              className="border-[#2e2f42] text-[#8a8d9e]"
            >
              Importar Otro Archivo
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
