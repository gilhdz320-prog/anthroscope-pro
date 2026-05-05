import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Trophy, Download, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AtletaDemo {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  imc: number;
  porcentajeGrasa: number;
  masaMuscular: number;
  imo: number;
  somatotipo: string;
  cuadrante: string;
}

const EQUIPO_DEMO: AtletaDemo[] = [
  { id: 1, nombre: 'Carlos Mendoza', edad: 24, posicion: 'Delantero', imc: 23.5, porcentajeGrasa: 8.2, masaMuscular: 38.5, imo: 5.1, somatotipo: 'Mesomorfo', cuadrante: 'Muscle High / Fat Low' },
  { id: 2, nombre: 'Juan Perez', edad: 22, posicion: 'Defensa', imc: 24.8, porcentajeGrasa: 12.5, masaMuscular: 36.2, imo: 4.2, somatotipo: 'Meso-Endo', cuadrante: 'Optimal Zone' },
  { id: 3, nombre: 'Luis Torres', edad: 26, posicion: 'Mediocampo', imc: 21.2, porcentajeGrasa: 6.8, masaMuscular: 32.1, imo: 3.8, somatotipo: 'Ectomorfo', cuadrante: 'Muscle Low / Fat Low' },
  { id: 4, nombre: 'Pedro Sanchez', edad: 25, posicion: 'Portero', imc: 26.1, porcentajeGrasa: 15.3, masaMuscular: 38.8, imo: 3.9, somatotipo: 'Endomorfo', cuadrante: 'Muscle High / Fat High' },
  { id: 5, nombre: 'Andres Ruiz', edad: 23, posicion: 'Delantero', imc: 22.8, porcentajeGrasa: 9.1, masaMuscular: 37.5, imo: 4.8, somatotipo: 'Mesomorfo', cuadrante: 'Muscle High / Fat Low' },
  { id: 6, nombre: 'Diego Flores', edad: 27, posicion: 'Defensa', imc: 25.5, porcentajeGrasa: 14.2, masaMuscular: 35.1, imo: 3.5, somatotipo: 'Endo-Meso', cuadrante: 'Neutral Zone' },
  { id: 7, nombre: 'Miguel Castro', edad: 21, posicion: 'Mediocampo', imc: 20.8, porcentajeGrasa: 7.5, masaMuscular: 30.2, imo: 3.6, somatotipo: 'Ecto-Meso', cuadrante: 'Muscle Low / Fat Low' },
  { id: 8, nombre: 'Roberto Vega', edad: 28, posicion: 'Defensa', imc: 27.3, porcentajeGrasa: 16.8, masaMuscular: 34.2, imo: 3.1, somatotipo: 'Endomorfo', cuadrante: 'Muscle Low / Fat High' },
];

export function GruposPanel() {
  const { t } = useTranslation();
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('demo-futbol');
  const [filtroCuadrante, setFiltroCuadrante] = useState('todos');

  const atletasFiltrados = filtroCuadrante === 'todos'
    ? EQUIPO_DEMO
    : EQUIPO_DEMO.filter(a => a.cuadrante.toLowerCase().includes(filtroCuadrante.toLowerCase()));

  const promedioGrasa = EQUIPO_DEMO.reduce((a, b) => a + b.porcentajeGrasa, 0) / EQUIPO_DEMO.length;
  const promedioIMO = EQUIPO_DEMO.reduce((a, b) => a + b.imo, 0) / EQUIPO_DEMO.length;

  const optimos = EQUIPO_DEMO.filter(a => a.cuadrante === 'Muscle High / Fat Low').length;
  const aMejorar = EQUIPO_DEMO.filter(a => a.cuadrante === 'Muscle Low / Fat High' || a.cuadrante === 'Muscle Low / Fat Low').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-emerald-600" />
            {t('grupos.titulo') || 'Evaluación Grupal de Equipos'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label>{t('grupos.equipo') || 'Equipo / Grupo'}</Label>
              <Select value={equipoSeleccionado} onValueChange={setEquipoSeleccionado}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo-futbol">Demo: Club de Fútbol Profesional (20 atletas)</SelectItem>
                  <SelectItem value="demo-rugby">Demo: Rugby Selección Nacional (30 atletas)</SelectItem>
                  <SelectItem value="demo-natacion">Demo: Natación Olímpica (15 atletas)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t('grupos.deporte') || 'Deporte'}</Label>
              <Input value="Fútbol Profesional" disabled />
            </div>
            <div>
              <Label>{t('grupos.filtro') || 'Filtrar por categoría'}</Label>
              <Select value={filtroCuadrante} onValueChange={setFiltroCuadrante}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los atletas</SelectItem>
                  <SelectItem value="muscle high">Músculo Alto + Grasa Baja</SelectItem>
                  <SelectItem value="optimal">Zona Óptima</SelectItem>
                  <SelectItem value="muscle low">Necesitan mejorar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard del equipo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6 text-center">
            <Target className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{optimos}/{EQUIPO_DEMO.length}</p>
            <p className="text-xs text-slate-600">Atletas en zona óptima</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{aMejorar}</p>
            <p className="text-xs text-slate-600">Requieren intervención</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-slate-500">Grasa promedio equipo</p>
            <p className="text-2xl font-bold">{promedioGrasa.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-slate-500">IMO promedio</p>
            <p className="text-2xl font-bold">{promedioIMO.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de atletas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="w-5 h-5 text-emerald-600" />
            {t('grupos.listaAtletas') || 'Atletas del equipo'}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Plus className="w-4 h-4 mr-1" /> Agregar</Button>
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Exportar</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Atleta</TableHead>
                  <TableHead>Posición</TableHead>
                  <TableHead>IMC</TableHead>
                  <TableHead>% Grasa</TableHead>
                  <TableHead>Músculo (kg)</TableHead>
                  <TableHead>IMO</TableHead>
                  <TableHead>Somatotipo</TableHead>
                  <TableHead>Cuadrante Holway</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atletasFiltrados.map((a) => (
                  <TableRow key={a.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{a.nombre}<div className="text-xs text-slate-400">{a.edad} años</div></TableCell>
                    <TableCell>{a.posicion}</TableCell>
                    <TableCell>{a.imc.toFixed(1)}</TableCell>
                    <TableCell>{a.porcentajeGrasa.toFixed(1)}%</TableCell>
                    <TableCell>{a.masaMuscular.toFixed(1)}</TableCell>
                    <TableCell>{a.imo.toFixed(1)}</TableCell>
                    <TableCell><Badge variant="outline">{a.somatotipo}</Badge></TableCell>
                    <TableCell>
                      <Badge className={
                        a.cuadrante === 'Muscle High / Fat Low' ? 'bg-emerald-500' :
                        a.cuadrante === 'Optimal Zone' ? 'bg-blue-500' :
                        a.cuadrante === 'Muscle Low / Fat Low' ? 'bg-amber-500' :
                        a.cuadrante === 'Muscle High / Fat High' ? 'bg-orange-500' :
                        'bg-slate-500'
                      }>{a.cuadrante}</Badge>
                    </TableCell>
                    <TableCell>
                      {a.cuadrante === 'Muscle High / Fat Low' || a.cuadrante === 'Optimal Zone'
                        ? <span className="text-emerald-600 text-sm">✓ Óptimo</span>
                        : <span className="text-amber-600 text-sm">⚠ Atención</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Comparación global por deporte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            Comparación con referencias globales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { ref: 'OLIREF', desc: 'Olimpiadas - Atletas élite', grasa: 10.2, imo: 4.5, estatura: 178, n: 2847 },
              { ref: 'ARGOREF', desc: 'Argentina - Deportistas nacionales', grasa: 12.8, imo: 3.9, estatura: 176, n: 892 },
              { ref: 'FIFA-REF', desc: 'FIFA - Futbolistas profesionales', grasa: 9.5, imo: 4.8, estatura: 180, n: 1543 },
            ].map((r) => (
              <div key={r.ref} className="p-4 border rounded-lg bg-slate-50">
                <h4 className="font-bold text-slate-800">{r.ref}</h4>
                <p className="text-xs text-slate-500 mb-3">{r.desc}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Grasa:</span><span className="font-mono">{r.grasa}%</span></div>
                  <div className="flex justify-between"><span>IMO:</span><span className="font-mono">{r.imo}</span></div>
                  <div className="flex justify-between"><span>Estatura:</span><span className="font-mono">{r.estatura}cm</span></div>
                  <div className="flex justify-between"><span>n=</span><span className="font-mono">{r.n}</span></div>
                </div>
                <div className="mt-3 p-2 bg-white rounded text-xs">
                  <p className="font-semibold">Tu equipo vs {r.ref}:</p>
                  <p className={promedioGrasa < r.grasa ? 'text-emerald-600' : 'text-amber-600'}>
                    Grasa: {promedioGrasa < r.grasa ? 'Mejor' : 'Mayor'} ({(promedioGrasa - r.grasa).toFixed(1)}%)
                  </p>
                  <p className={promedioIMO > r.imo ? 'text-emerald-600' : 'text-amber-600'}>
                    IMO: {promedioIMO > r.imo ? 'Superior' : 'Menor'} ({(promedioIMO - r.imo).toFixed(1)})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Globe } from 'lucide-react';
