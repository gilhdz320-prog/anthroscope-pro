import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Trophy, Download, Target, TrendingUp, Eye, Printer, FileSpreadsheet, UserPlus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SomatocartaGrupal } from '@/components/SomatocartaGrupal';
import { CuadrantesHolway } from '@/sections/CuadrantesHolway';

interface Atleta {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  estatura: number;
  masa: number;
  imc: number;
  porcentajeGrasa: number;
  masaMuscular: number;
  imo: number;
  endomorfia: number;
  mesomorfia: number;
  ectomorfia: number;
  somatotipo: string;
  cuadrante: string;
  estado: 'optimo' | 'atencion' | 'intervencion';
}

// DEMO DATA - Equipo de fútbol profesional
const EQUIPO_INICIAL: Atleta[] = [
  { id: 1, nombre: 'Carlos Mendoza', edad: 24, posicion: 'Delantero', estatura: 178, masa: 74.5, imc: 23.5, porcentajeGrasa: 8.2, masaMuscular: 38.5, imo: 5.1, endomorfia: 2.5, mesomorfia: 5.8, ectomorfia: 3.2, somatotipo: 'Mesomorfo', cuadrante: 'Muscle High / Fat Low', estado: 'optimo' },
  { id: 2, nombre: 'Juan Perez', edad: 22, posicion: 'Defensa', estatura: 185, masa: 85.0, imc: 24.8, porcentajeGrasa: 12.5, masaMuscular: 36.2, imo: 4.2, endomorfia: 3.8, mesomorfia: 5.2, ectomorfia: 2.8, somatotipo: 'Meso-Endo', cuadrante: 'Optimal Zone', estado: 'optimo' },
  { id: 3, nombre: 'Luis Torres', edad: 26, posicion: 'Mediocampo', estatura: 172, masa: 62.8, imc: 21.2, porcentajeGrasa: 6.8, masaMuscular: 32.1, imo: 3.8, endomorfia: 1.8, mesomorfia: 4.5, ectomorfia: 4.8, somatotipo: 'Ectomorfo', cuadrante: 'Muscle Low / Fat Low', estado: 'atencion' },
  { id: 4, nombre: 'Pedro Sanchez', edad: 25, posicion: 'Portero', estatura: 190, masa: 94.2, imc: 26.1, porcentajeGrasa: 15.3, masaMuscular: 38.8, imo: 3.9, endomorfia: 4.5, mesomorfia: 5.0, ectomorfia: 2.1, somatotipo: 'Endomorfo', cuadrante: 'Muscle High / Fat High', estado: 'atencion' },
  { id: 5, nombre: 'Andres Ruiz', edad: 23, posicion: 'Delantero', estatura: 180, masa: 73.8, imc: 22.8, porcentajeGrasa: 9.1, masaMuscular: 37.5, imo: 4.8, endomorfia: 2.8, mesomorfia: 5.5, ectomorfia: 3.5, somatotipo: 'Mesomorfo', cuadrante: 'Muscle High / Fat Low', estado: 'optimo' },
  { id: 6, nombre: 'Diego Flores', edad: 27, posicion: 'Defensa', estatura: 188, masa: 90.2, imc: 25.5, porcentajeGrasa: 14.2, masaMuscular: 35.1, imo: 3.5, endomorfia: 4.2, mesomorfia: 4.8, ectomorfia: 2.5, somatotipo: 'Endo-Meso', cuadrante: 'Neutral Zone', estado: 'atencion' },
  { id: 7, nombre: 'Miguel Castro', edad: 21, posicion: 'Mediocampo', estatura: 170, masa: 60.2, imc: 20.8, porcentajeGrasa: 7.5, masaMuscular: 30.2, imo: 3.6, endomorfia: 2.1, mesomorfia: 4.0, ectomorfia: 4.5, somatotipo: 'Ecto-Meso', cuadrante: 'Muscle Low / Fat Low', estado: 'atencion' },
  { id: 8, nombre: 'Roberto Vega', edad: 28, posicion: 'Defensa', estatura: 192, masa: 100.5, imc: 27.3, porcentajeGrasa: 16.8, masaMuscular: 34.2, imo: 3.1, endomorfia: 5.2, mesomorfia: 4.2, ectomorfia: 1.8, somatotipo: 'Endomorfo', cuadrante: 'Muscle Low / Fat High', estado: 'intervencion' },
  { id: 9, nombre: 'Santiago Blanco', edad: 24, posicion: 'Extremo', estatura: 175, masa: 68.5, imc: 22.3, porcentajeGrasa: 8.5, masaMuscular: 35.8, imo: 4.5, endomorfia: 2.2, mesomorfia: 5.0, ectomorfia: 3.8, somatotipo: 'Meso-Ecto', cuadrante: 'Muscle High / Fat Low', estado: 'optimo' },
  { id: 10, nombre: 'Fernando Diaz', edad: 29, posicion: 'Portero', estatura: 195, masa: 98.0, imc: 25.8, porcentajeGrasa: 13.5, masaMuscular: 37.5, imo: 4.0, endomorfia: 3.8, mesomorfia: 5.2, ectomorfia: 2.2, somatotipo: 'Meso-Endo', cuadrante: 'Optimal Zone', estado: 'optimo' },
];

// REFERENCIAS GLOBALES EXPANDIDAS
const REFERENCIAS = [
  { codigo: 'OLIREF', nombre: 'Olimpiadas - Atletas elite mundial', deporte: 'Multi-deporte', sexo: 'M', grasa: 10.2, imo: 4.5, estatura: 178.5, n: 2847, fuente: 'Ross et al. 1999' },
  { codigo: 'ARGOREF', nombre: 'Argentina - Deportistas nacionales', deporte: 'Multi-deporte', sexo: 'M', grasa: 12.8, imo: 3.9, estatura: 176.2, n: 892, fuente: 'Holway & Barrios 2012' },
  { codigo: 'FIFA-REF', nombre: 'FIFA - Futbolistas profesionales', deporte: 'Futbol', sexo: 'M', grasa: 9.5, imo: 4.8, estatura: 180.1, n: 1543, fuente: 'Reilly et al. 2000' },
  { codigo: 'NBA-REF', nombre: 'NBA - Baloncesto profesional', deporte: 'Baloncesto', sexo: 'M', grasa: 8.8, imo: 4.2, estatura: 200.5, n: 450, fuente: 'Carter et al. 2005' },
  { codigo: 'FINA-REF', nombre: 'FINA - Natacion elite', deporte: 'Natacion', sexo: 'M', grasa: 9.2, imo: 4.6, estatura: 187.2, n: 621, fuente: 'Carter & Ackland 1994' },
  { codigo: 'IAAF-REF', nombre: 'World Athletics - Atletismo elite', deporte: 'Atletismo', sexo: 'M', grasa: 7.5, imo: 5.2, estatura: 182.0, n: 1105, fuente: 'Carter 1984' },
  { codigo: 'IRB-REF', nombre: 'World Rugby - Rugby internacional', deporte: 'Rugby', sexo: 'M', grasa: 14.5, imo: 4.0, estatura: 185.5, n: 380, fuente: 'Quarrie & Hopkins 2007' },
  { codigo: 'MIL-REF', nombre: 'Fuerzas Especiales - Militar elite', deporte: 'Militar', sexo: 'M', grasa: 11.5, imo: 4.5, estatura: 177.0, n: 450, fuente: 'Vanderburgh 2007' },
  { codigo: 'SWAT-REF', nombre: 'SWAT/Tactical - Operaciones especiales', deporte: 'Tactico', sexo: 'M', grasa: 12.0, imo: 4.3, estatura: 178.5, n: 210, fuente: 'Nindl et al. 2002' },
  { codigo: 'NHL-REF', nombre: 'NHL - Hockey hielo profesional', deporte: 'Hockey', sexo: 'M', grasa: 11.8, imo: 4.1, estatura: 185.0, n: 520, fuente: 'Montgomery 1988' },
  { codigo: 'ATP-REF', nombre: 'ATP - Tenis profesional', deporte: 'Tenis', sexo: 'M', grasa: 10.8, imo: 4.4, estatura: 183.5, n: 340, fuente: 'Girard et al. 2007' },
  { codigo: 'UCI-REF', nombre: 'UCI - Ciclismo profesional', deporte: 'Ciclismo', sexo: 'M', grasa: 7.0, imo: 5.0, estatura: 180.0, n: 280, fuente: 'Rodriguez et al. 2005' },
];

export function GruposPanel() {
  const { t } = useTranslation();
  const [atletas, setAtletas] = useState<Atleta[]>(EQUIPO_INICIAL);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [refSeleccionada, setRefSeleccionada] = useState('FIFA-REF');
  const [selectedAtleta, setSelectedAtleta] = useState<Atleta | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const atletasFiltrados = filtroEstado === 'todos'
    ? atletas
    : atletas.filter(a => a.estado === filtroEstado);

  const optimos = atletas.filter(a => a.estado === 'optimo').length;
  const atencion = atletas.filter(a => a.estado === 'atencion').length;
  const intervencion = atletas.filter(a => a.estado === 'intervencion').length;

  const promedioGrasa = atletas.reduce((a, b) => a + b.porcentajeGrasa, 0) / atletas.length;
  const promedioIMO = atletas.reduce((a, b) => a + b.imo, 0) / atletas.length;

  const ref = REFERENCIAS.find(r => r.codigo === refSeleccionada)!;

  const handleExportExcel = () => {
    const XLSX = require('xlsx');
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(atletas.map(a => ({
      Nombre: a.nombre,
      Edad: a.edad,
      Posicion: a.posicion,
      Estatura: a.estatura,
      Masa: a.masa,
      IMC: a.imc,
      Grasa: a.porcentajeGrasa + '%',
      Muscular: a.masaMuscular,
      IMO: a.imo,
      Endomorfia: a.endomorfia,
      Mesomorfia: a.mesomorfia,
      Ectomorfia: a.ectomorfia,
      Somatotipo: a.somatotipo,
      Cuadrante: a.cuadrante,
      Estado: a.estado,
    })));
    XLSX.utils.book_append_sheet(wb, ws, 'Equipo');
    XLSX.writeFile(wb, `ISAK_Equipo_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  const agregarAtleta = (nuevo: Partial<Atleta>) => {
    const id = Math.max(...atletas.map(a => a.id), 0) + 1;
    setAtletas([...atletas, { ...nuevo, id } as Atleta]);
  };

  return (
    <div className="space-y-6">
      {/* HEADER DEL EQUIPO */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                {t('grupos.equipo')}
              </h2>
              <p className="text-slate-400 text-sm mt-1">{atletas.length} athletes | {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" onClick={handleExportExcel}>
                <FileSpreadsheet className="w-4 h-4 mr-1" /> Excel
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-1" /> Imprimir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6 text-center">
            <Target className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-emerald-800">{optimos}</p>
            <p className="text-xs text-emerald-600 font-medium">{t('grupos.optimo')}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-amber-800">{atencion}</p>
            <p className="text-xs text-amber-600 font-medium">{t('grupos.atencion')}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6 text-center">
            <Users className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-red-800">{intervencion}</p>
            <p className="text-xs text-red-600 font-medium">{t('grupos.intervencion')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-slate-500">{t('grupos.grasaProm')}</p>
            <p className="text-3xl font-bold">{promedioGrasa.toFixed(1)}%</p>
            <p className="text-xs text-slate-400">IMO: {promedioIMO.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lista" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="lista" className="flex items-center gap-1"><Users className="w-4 h-4" /> {t('grupos.listaAtletas')}</TabsTrigger>
          <TabsTrigger value="somatocarta" className="flex items-center gap-1"><Target className="w-4 h-4" /> Somatocarta</TabsTrigger>
          <TabsTrigger value="cuadrantes" className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {t('cuadrantes.titulo')}</TabsTrigger>
          <TabsTrigger value="comparacion" className="flex items-center gap-1"><Trophy className="w-4 h-4" /> {t('grupos.comparacionGlobal')}</TabsTrigger>
        </TabsList>

        {/* TAB: LISTA DE ATLETAS */}
        <TabsContent value="lista" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t('grupos.todos')}</SelectItem>
                  <SelectItem value="optimo">{t('grupos.soloOptimos')}</SelectItem>
                  <SelectItem value="atencion">{t('grupos.atencion')}</SelectItem>
                  <SelectItem value="intervencion">{t('grupos.intervencion')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm"><UserPlus className="w-4 h-4 mr-1" /> {t('grupos.agregar')}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>{t('grupos.agregar')}</DialogTitle></DialogHeader>
                <AgregarAtletaForm onAdd={agregarAtleta} />
              </DialogContent>
            </Dialog>
          </div>

          <div ref={tableRef} className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>{t('grupos.atleta')}</TableHead>
                  <TableHead>{t('grupos.pos')}</TableHead>
                  <TableHead>IMC</TableHead>
                  <TableHead>% Grasa</TableHead>
                  <TableHead>Musc. (kg)</TableHead>
                  <TableHead>IMO</TableHead>
                  <TableHead>Somatotipo</TableHead>
                  <TableHead>Cuadrante</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atletasFiltrados.map((a) => (
                  <TableRow key={a.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => { setSelectedAtleta(a); setDialogOpen(true); }}>
                    <TableCell className="font-mono text-xs">{a.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{a.nombre}</div>
                      <div className="text-xs text-slate-400">{a.edad} {t('grupos.anos')} | {a.estatura}cm | {a.masa}kg</div>
                    </TableCell>
                    <TableCell>{a.posicion}</TableCell>
                    <TableCell>{a.imc.toFixed(1)}</TableCell>
                    <TableCell className={a.porcentajeGrasa > 15 ? 'text-red-600 font-semibold' : a.porcentajeGrasa < 8 ? 'text-blue-600 font-semibold' : ''}>
                      {a.porcentajeGrasa.toFixed(1)}%
                    </TableCell>
                    <TableCell>{a.masaMuscular.toFixed(1)}</TableCell>
                    <TableCell>{a.imo.toFixed(1)}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{a.somatotipo}</Badge></TableCell>
                    <TableCell>
                      <Badge className={
                        a.cuadrante === 'Muscle High / Fat Low' ? 'bg-emerald-500 text-white' :
                        a.cuadrante === 'Optimal Zone' ? 'bg-blue-500 text-white' :
                        a.cuadrante === 'Muscle Low / Fat Low' ? 'bg-amber-500 text-white' :
                        a.cuadrante === 'Muscle High / Fat High' ? 'bg-orange-500 text-white' :
                        'bg-slate-500 text-white'
                      }>{a.cuadrante.split(' / ')[0]}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedAtleta(a); setDialogOpen(true); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* TAB: SOMATOCARTA GRUPAL */}
        <TabsContent value="somatocarta">
          <SomatocartaGrupal
            atletas={atletas.map(a => ({
              nombre: a.nombre,
              endomorfia: a.endomorfia,
              mesomorfia: a.mesomorfia,
              ectomorfia: a.ectomorfia,
              posicion: a.posicion,
            }))}
            titulo={`Somatocarta - ${atletas.length} atletas`}
          />
        </TabsContent>

        {/* TAB: CUADRANTES */}
        <TabsContent value="cuadrantes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedAtleta ? (
              <>
                <CuadrantesHolway
                  masaMuscular={selectedAtleta.masaMuscular}
                  masaGrasa={selectedAtleta.porcentajeGrasa * selectedAtleta.masa / 100}
                  imo={selectedAtleta.imo}
                  porcentajeGrasa={selectedAtleta.porcentajeGrasa}
                />
                <Card className="p-6">
                  <h4 className="font-bold mb-4">{t('grupos.distribucion')}</h4>
                  <div className="space-y-3">
                    {['Muscle High / Fat Low', 'Optimal Zone', 'Muscle Low / Fat Low', 'Muscle High / Fat High', 'Neutral Zone', 'Muscle Low / Fat High'].map((cuad, i) => {
                      const count = atletas.filter(a => a.cuadrante === cuad).length;
                      const pct = (count / atletas.length) * 100;
                      return (
                        <div key={cuad} className="flex items-center gap-3">
                          <span className="text-xs w-32 truncate">{cuad}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#64748b', '#ef4444'][i] }} />
                          </div>
                          <span className="text-xs font-mono w-12 text-right">{count} ({pct.toFixed(0)}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="col-span-2 p-12 text-center text-slate-400">
                <p>{t('grupos.seleccionarRef')}</p>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB: COMPARACION GLOBAL */}
        <TabsContent value="comparacion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-indigo-600" />
                {t('grupos.comparacionGlobal')}
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <Select value={refSeleccionada} onValueChange={setRefSeleccionada}>
                  <SelectTrigger className="w-72">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REFERENCIAS.map(r => (
                      <SelectItem key={r.codigo} value={r.codigo}>{r.codigo} - {r.deporte}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg bg-slate-50">
                  <h4 className="font-bold text-slate-800 mb-2">{ref.codigo}</h4>
                  <p className="text-sm text-slate-500 mb-4">{ref.nombre}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Deporte:</span><span className="font-medium">{ref.deporte}</span></div>
                    <div className="flex justify-between"><span>% Grasa ref:</span><span className="font-mono">{ref.grasa}%</span></div>
                    <div className="flex justify-between"><span>IMO ref:</span><span className="font-mono">{ref.imo}</span></div>
                    <div className="flex justify-between"><span>Estatura ref:</span><span className="font-mono">{ref.estatura}cm</span></div>
                    <div className="flex justify-between"><span>n=</span><span className="font-mono">{ref.n}</span></div>
                    <div className="flex justify-between"><span>Fuente:</span><span className="text-xs text-slate-400">{ref.fuente}</span></div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-slate-800 mb-2">Team vs {ref.codigo}</h4>
                  <div className="space-y-4">
                    <ComparadorBarra label="% Grasa" tuValor={promedioGrasa} refValor={ref.grasa} unidad="%" invertido={false} />
                    <ComparadorBarra label="IMO" tuValor={promedioIMO} refValor={ref.imo} unidad="" invertido={true} />
                    <ComparadorBarra label="Estatura" tuValor={atletas.reduce((a,b) => a + b.estatura, 0) / atletas.length} refValor={ref.estatura} unidad="cm" invertido={false} />
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm">
                    <p className="font-semibold text-amber-800">{t('resultados.interpretacion')}:</p>
                    <p className="text-amber-700">
                      {promedioGrasa < ref.grasa ? 'Lower body fat vs reference. ' : 'Higher body fat vs reference. '}
                      {promedioIMO > ref.imo ? 'Higher muscle/bone ratio (more power).' : 'Lower muscle/bone ratio.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabla de todas las referencias */}
              <div className="mt-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referencia</TableHead>
                      <TableHead>Deporte</TableHead>
                      <TableHead>% Grasa</TableHead>
                      <TableHead>IMO</TableHead>
                      <TableHead>Estatura</TableHead>
                      <TableHead>n</TableHead>
                      <TableHead>Tu equipo vs Ref</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {REFERENCIAS.map(r => {
                      const diffGrasa = promedioGrasa - r.grasa;
                      const diffIMO = promedioIMO - r.imo;
                      return (
                        <TableRow key={r.codigo} className={r.codigo === refSeleccionada ? 'bg-indigo-50' : ''}>
                          <TableCell className="font-semibold">{r.codigo}</TableCell>
                          <TableCell>{r.deporte}</TableCell>
                          <TableCell>{r.grasa}%</TableCell>
                          <TableCell>{r.imo}</TableCell>
                          <TableCell>{r.estatura}cm</TableCell>
                          <TableCell>{r.n}</TableCell>
                          <TableCell>
                            <span className={diffGrasa < 0 ? 'text-emerald-600' : 'text-amber-600'}>
                              Grasa {diffGrasa < 0 ? 'mejor' : 'mayor'} ({diffGrasa > 0 ? '+' : ''}{diffGrasa.toFixed(1)}%)
                            </span>
                            <br />
                            <span className={diffIMO > 0 ? 'text-emerald-600' : 'text-amber-600'}>
                              IMO {diffIMO > 0 ? 'superior' : 'menor'} ({diffIMO > 0 ? '+' : ''}{diffIMO.toFixed(1)})
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* DIALOG: DETALLE DEL ATLETA */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAtleta && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-600" />
                  {selectedAtleta.nombre}
                  <Badge className={
                    selectedAtleta.estado === 'optimo' ? 'bg-emerald-500' :
                    selectedAtleta.estado === 'atencion' ? 'bg-amber-500' : 'bg-red-500'
                  }>
                    {selectedAtleta.estado === 'optimo' ? t('grupos.optimo') : selectedAtleta.estado === 'atencion' ? t('grupos.atencion') : t('grupos.intervencion')}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('sujeto.fechaNacimiento')}:</span> <span className="font-semibold">{selectedAtleta.edad} {t('grupos.anos')}</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('grupos.pos')}:</span> <span className="font-semibold">{selectedAtleta.posicion}</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('mediciones.estatura')}:</span> <span className="font-semibold">{selectedAtleta.estatura}cm</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('mediciones.masaCorporal')}:</span> <span className="font-semibold">{selectedAtleta.masa}kg</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">IMC:</span> <span className="font-semibold">{selectedAtleta.imc}</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">% Fat:</span> <span className="font-semibold">{selectedAtleta.porcentajeGrasa}%</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('resultados.masaMuscular')}:</span> <span className="font-semibold">{selectedAtleta.masaMuscular}kg</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">IMO:</span> <span className="font-semibold">{selectedAtleta.imo}</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('resultados.somatotipo')}:</span> <span className="font-semibold">{selectedAtleta.somatotipo}</span></div>
                <div className="p-3 bg-slate-50 rounded"><span className="text-slate-500">{t('cuadrantes.titulo')}:</span> <span className="font-semibold">{selectedAtleta.cuadrante}</span></div>
              </div>
              <div className="mt-4">
                <CuadrantesHolway
                  masaMuscular={selectedAtleta.masaMuscular}
                  masaGrasa={selectedAtleta.porcentajeGrasa * selectedAtleta.masa / 100}
                  imo={selectedAtleta.imo}
                  porcentajeGrasa={selectedAtleta.porcentajeGrasa}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1"><Printer className="w-4 h-4 mr-2" /> {t('grupos.imprimirFicha')}</Button>
                <Button variant="outline" className="flex-1"><FileSpreadsheet className="w-4 h-4 mr-2" /> {t('grupos.exportarFicha')}</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ComparadorBarra({ label, tuValor, refValor, unidad, invertido }: { label: string; tuValor: number; refValor: number; unidad: string; invertido: boolean }) {
  const diff = tuValor - refValor;
  const esBueno = invertido ? diff > 0 : diff < 0;
  const maxVal = Math.max(tuValor, refValor) * 1.2;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className={esBueno ? 'text-emerald-600' : 'text-amber-600'}>
          Tu equipo: {tuValor.toFixed(1)}{unidad} | Ref: {refValor.toFixed(1)}{unidad}
          <span className="ml-1">({diff > 0 ? '+' : ''}{diff.toFixed(1)})</span>
        </span>
      </div>
      <div className="h-6 bg-slate-100 rounded-full overflow-hidden relative flex">
        <div className="h-full bg-emerald-400 flex items-center justify-end pr-1 text-[10px] text-white font-bold transition-all" style={{ width: `${(tuValor / maxVal) * 100}%` }}>
          Tu equipo
        </div>
        <div className="absolute top-0 h-full border-l-2 border-dashed border-slate-500" style={{ left: `${(refValor / maxVal) * 100}%` }}>
          <span className="absolute -top-4 -left-2 text-[10px] text-slate-500">Ref</span>
        </div>
      </div>
    </div>
  );
}

function AgregarAtletaForm({ onAdd }: { onAdd: (a: Partial<Atleta>) => void }) {
  const [form, setForm] = useState({ nombre: '', edad: 20, posicion: '', estatura: 175, masa: 70 });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Nombre</Label><Input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /></div>
        <div><Label>Edad</Label><Input type="number" value={form.edad} onChange={e => setForm({ ...form, edad: Number(e.target.value) })} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Posicion</Label><Input value={form.posicion} onChange={e => setForm({ ...form, posicion: e.target.value })} /></div>
        <div><Label>Estatura (cm)</Label><Input type="number" value={form.estatura} onChange={e => setForm({ ...form, estatura: Number(e.target.value) })} /></div>
      </div>
      <div><Label>Masa (kg)</Label><Input type="number" value={form.masa} onChange={e => setForm({ ...form, masa: Number(e.target.value) })} /></div>
      <Button className="w-full" onClick={() => onAdd(form)}>Agregar al equipo</Button>
    </div>
  );
}
