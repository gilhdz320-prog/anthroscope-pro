import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, Dna, Target, Zap } from 'lucide-react';

interface PotencialGeneticoProps {
  masaMuscular: number;
  masaOsea: number;
  imo: number;
  sexo: 'masculino' | 'femenino';
  estatura: number;
}

// Límites naturales según Francis Holway y literatura ISAK
const LIMITES = {
  masculino: {
    imoPromedio: 4.0,
    imoSuperior: 4.8,
    imoElite: 5.2,
    imoMaxNatural: 5.5,  // Límite superior natural masculino
    imoDudoso: 5.8,
    categoria: ['Sedentario', 'Entrenado', 'Atleta', 'Elite Natural', 'Genética excepcional'],
  },
  femenino: {
    imoPromedio: 3.5,
    imoSuperior: 4.2,
    imoElite: 4.6,
    imoMaxNatural: 5.1,  // Límite superior natural femenino
    imoDudoso: 5.4,
    categoria: ['Sedentario', 'Entrenado', 'Atleta', 'Elite Natural', 'Genética excepcional'],
  },
};

// Tablas normativas por deporte - datos del Excel del usuario
const TABLAS_NORMATIVAS = [
  {
    deporte: 'Halterofilia',
    posiciones: [
      { categoria: '55kg', imoMin: 4.5, imoMax: 5.1, grasaMin: 5, grasaMax: 10 },
      { categoria: '61kg', imoMin: 4.6, imoMax: 5.2, grasaMin: 5, grasaMax: 10 },
      { categoria: '67kg', imoMin: 4.7, imoMax: 5.3, grasaMin: 5, grasaMax: 11 },
      { categoria: '73kg', imoMin: 4.8, imoMax: 5.4, grasaMin: 6, grasaMax: 12 },
      { categoria: '81kg', imoMin: 4.8, imoMax: 5.4, grasaMin: 6, grasaMax: 13 },
      { categoria: '96kg', imoMin: 4.7, imoMax: 5.3, grasaMin: 7, grasaMax: 14 },
      { categoria: '109kg', imoMin: 4.5, imoMax: 5.1, grasaMin: 8, grasaMax: 15 },
      { categoria: '+109kg', imoMin: 4.2, imoMax: 4.8, grasaMin: 10, grasaMax: 18 },
    ],
  },
  {
    deporte: 'Fútbol Profesional',
    posiciones: [
      { categoria: 'Delantero', imoMin: 4.2, imoMax: 5.0, grasaMin: 7, grasaMax: 12 },
      { categoria: 'Mediocampo', imoMin: 3.8, imoMax: 4.6, grasaMin: 6, grasaMax: 11 },
      { categoria: 'Defensa', imoMin: 4.0, imoMax: 4.8, grasaMin: 8, grasaMax: 13 },
      { categoria: 'Portero', imoMin: 3.5, imoMax: 4.5, grasaMin: 10, grasaMax: 16 },
      { categoria: 'Extremo', imoMin: 3.8, imoMax: 4.7, grasaMin: 6, grasaMax: 11 },
    ],
  },
  {
    deporte: 'Rugby',
    posiciones: [
      { categoria: 'Pilar', imoMin: 4.0, imoMax: 5.0, grasaMin: 12, grasaMax: 18 },
      { categoria: 'Talonador', imoMin: 4.2, imoMax: 5.1, grasaMin: 10, grasaMax: 16 },
      { categoria: 'Segunda línea', imoMin: 4.0, imoMax: 4.9, grasaMin: 10, grasaMax: 15 },
      { categoria: 'Ala', imoMin: 4.3, imoMax: 5.2, grasaMin: 8, grasaMax: 13 },
      { categoria: 'Número 8', imoMin: 4.1, imoMax: 5.0, grasaMin: 10, grasaMax: 15 },
      { categoria: 'Medio scrum', imoMin: 3.8, imoMax: 4.6, grasaMin: 8, grasaMax: 13 },
      { categoria: 'Apertura', imoMin: 3.9, imoMax: 4.8, grasaMin: 7, grasaMax: 12 },
      { categoria: 'Centro', imoMin: 4.1, imoMax: 5.0, grasaMin: 8, grasaMax: 13 },
      { categoria: 'Wing/Fullback', imoMin: 4.2, imoMax: 5.1, grasaMin: 6, grasaMax: 11 },
    ],
  },
  {
    deporte: 'Natación',
    posiciones: [
      { categoria: 'Sprint (50-100m)', imoMin: 3.8, imoMax: 4.7, grasaMin: 6, grasaMax: 11 },
      { categoria: 'Medio fondo (200-400m)', imoMin: 3.5, imoMax: 4.4, grasaMin: 7, grasaMax: 12 },
      { categoria: 'Fondo (800-1500m)', imoMin: 3.2, imoMax: 4.1, grasaMin: 8, grasaMax: 14 },
      { categoria: 'Mariposa', imoMin: 3.9, imoMax: 4.8, grasaMin: 6, grasaMax: 11 },
    ],
  },
  {
    deporte: 'Fuerzas Especiales / Militar',
    posiciones: [
      { categoria: 'Operador táctico', imoMin: 4.2, imoMax: 5.1, grasaMin: 8, grasaMax: 13 },
      { categoria: 'Comandos', imoMin: 4.0, imoMax: 4.9, grasaMin: 7, grasaMax: 12 },
      { categoria: 'Rangers', imoMin: 4.3, imoMax: 5.2, grasaMin: 6, grasaMax: 11 },
      { categoria: 'SEALs', imoMin: 4.1, imoMax: 5.0, grasaMin: 7, grasaMax: 12 },
      { categoria: 'Infantería elite', imoMin: 3.8, imoMax: 4.7, grasaMin: 8, grasaMax: 13 },
    ],
  },
];

export function PotencialGenetico({ masaMuscular, masaOsea, imo, sexo, estatura }: PotencialGeneticoProps) {
  const limites = LIMITES[sexo];

  // Determinar categoría actual
  let categoriaActual = 0;
  let colorCategoria = 'bg-slate-500';
  let mensajeGenetico = '';

  if (imo >= limites.imoMaxNatural) {
    categoriaActual = 4;
    colorCategoria = 'bg-purple-600';
    mensajeGenetico = imo > limites.imoDudoso
      ? '⚠️ VALOR FUERA DE RANGO DE REFERENCIA: Este IMO excede los límites documentados para atletas naturales. Recomendable revisar técnica de medición o antecedentes.'
      : '✓ LÍMITE NATURAL MÁXIMO: Has alcanzado el techo genético de masa muscular relativa al esqueleto. Muy pocos atletas en el mundo llegan aquí sin intervención.';
  } else if (imo >= limites.imoElite) {
    categoriaActual = 3;
    colorCategoria = 'bg-emerald-600';
    mensajeGenetico = 'Genética excepcional / Élite natural. Estás en el top 1% de la población. Tu relación músculo-esqueleto es comparable a atletas olímpicos.';
  } else if (imo >= limites.imoSuperior) {
    categoriaActual = 2;
    colorCategoria = 'bg-blue-500';
    mensajeGenetico = 'Atleta de alto nivel. Tu potencial muscular es muy bueno. Aún hay margen para mejorar hasta el límite élite.';
  } else if (imo >= limites.imoPromedio) {
    categoriaActual = 1;
    colorCategoria = 'bg-amber-500';
    mensajeGenetico = 'Entrenado activamente. Por encima del promedio poblacional pero con espacio considerable de mejora genética.';
  } else {
    categoriaActual = 0;
    colorCategoria = 'bg-slate-400';
    mensajeGenetico = 'Por debajo del promedio de referencia. Potencial de mejora muy alto con entrenamiento de fuerza progresivo.';
  }

  // Calcular potencial remanente
  const masaMuscularMaxNatural = limites.imoMaxNatural * masaOsea;
  const potencialRemanente = masaMuscularMaxNatural - masaMuscular;
  const porcentajeAlcanzado = (imo / limites.imoMaxNatural) * 100;

  // Deporte seleccionado para comparar
  const [deporteSeleccionado, setDeporteSeleccionado] = useState(0);
  const deporte = TABLAS_NORMATIVAS[deporteSeleccionado];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Dna className="w-7 h-7 text-emerald-400" />
            <h2 className="text-2xl font-bold">Potencial Genético Muscular</h2>
          </div>
          <p className="text-slate-400 text-sm">
            Basado en el Índice Músculo-Óseo (IMO) de Ross & Kerr. Límites naturales según Holway et al.
          </p>
        </CardContent>
      </Card>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`${colorCategoria} text-white`}>
          <CardContent className="pt-6 text-center">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">IMO Actual</p>
            <p className="text-4xl font-bold">{imo.toFixed(2)}</p>
            <p className="text-xs opacity-80 mt-1">{limites.categoria[categoriaActual]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Límite Natural</p>
            <p className="text-3xl font-bold text-slate-800">{limites.imoMaxNatural}</p>
            <p className="text-xs text-slate-400">Techo genético {sexo === 'masculino' ? 'masculino' : 'femenino'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">Potencial Remanente</p>
            <p className="text-3xl font-bold text-emerald-700">
              {potencialRemanente > 0 ? `+${potencialRemanente.toFixed(1)}` : `${potencialRemanente.toFixed(1)}`}
            </p>
            <p className="text-xs text-slate-400">kg de músculo posible</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">% del Techo</p>
            <p className="text-3xl font-bold text-blue-700">{porcentajeAlcanzado.toFixed(0)}%</p>
            <Progress value={porcentajeAlcanzado} max={100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* MENSAJE GENÉTICO */}
      {mensajeGenetico && (
        <Card className={imo >= limites.imoMaxNatural ? 'border-2 border-purple-400 bg-purple-50' : 'bg-slate-50'}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {imo > limites.imoDudoso ? (
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <Zap className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <p className="text-sm leading-relaxed">{mensajeGenetico}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ESCALA IMO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Escala de Índice Músculo-Óseo (IMO)
          </CardTitle>
          <p className="text-xs text-slate-500">
            Sexo: {sexo === 'masculino' ? 'Masculino' : 'Femenino'} | 
            Tu IMO: <span className="font-bold">{imo.toFixed(2)}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: 'Sedentario / Promedio', min: 0, max: limites.imoPromedio, color: 'bg-slate-300', desc: 'Sin entrenamiento sistemático de fuerza' },
              { label: 'Entrenado activo', min: limites.imoPromedio, max: limites.imoSuperior, color: 'bg-amber-400', desc: '1-3 años de entrenamiento de fuerza' },
              { label: 'Atleta de competición', min: limites.imoSuperior, max: limites.imoElite, color: 'bg-blue-400', desc: 'Atleta de élite deportivo' },
              { label: 'Élite natural', min: limites.imoElite, max: limites.imoMaxNatural, color: 'bg-emerald-500', desc: 'Top 1% genético + entrenamiento óptimo' },
              { label: 'Genética excepcional / Revisar', min: limites.imoMaxNatural, max: limites.imoDudoso, color: 'bg-purple-500', desc: 'Límite natural máximo documentado' },
            ].map((rango, i) => {
              const activo = imo >= rango.min && imo < rango.max;
              const pasado = imo >= rango.max;
              return (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${activo ? 'bg-slate-50 ring-2 ring-emerald-300' : ''}`}>
                  <div className={`w-4 h-4 rounded-full shrink-0 ${rango.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{rango.label}</span>
                      <span className="text-xs text-slate-500 font-mono">{rango.min.toFixed(1)} - {rango.max.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className={`h-full rounded-full ${rango.color} transition-all`} style={{ width: `${Math.min(100, ((rango.max - rango.min) / limites.imoDudoso) * 100)}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{rango.desc}</p>
                  </div>
                  {activo && <Badge className="bg-emerald-500 text-white shrink-0">TÚ</Badge>}
                  {pasado && i === 4 && <Badge className="bg-purple-500 text-white shrink-0">TÚ</Badge>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* TABLAS NORMATIVAS POR DEPORTE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="w-5 h-5 text-blue-600" />
            Tablas Normativas por Deporte y Posición
          </CardTitle>
          <div className="flex gap-2 mt-2 flex-wrap">
            {TABLAS_NORMATIVAS.map((t, i) => (
              <Button key={t.deporte} variant={deporteSeleccionado === i ? 'default' : 'outline'} size="sm"
                onClick={() => setDeporteSeleccionado(i)}>
                {t.deporte}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-xs text-slate-500">
                  <th className="text-left py-2 px-3">Posición / Categoría</th>
                  <th className="text-center py-2 px-3">IMO Mín</th>
                  <th className="text-center py-2 px-3">IMO Máx</th>
                  <th className="text-center py-2 px-3">% Grasa Mín</th>
                  <th className="text-center py-2 px-3">% Grasa Máx</th>
                  <th className="text-center py-2 px-3">Tu IMO</th>
                </tr>
              </thead>
              <tbody>
                {deporte.posiciones.map((pos, i) => {
                  const enRango = imo >= pos.imoMin && imo <= pos.imoMax;
                  return (
                    <tr key={i} className={`border-b hover:bg-slate-50 ${enRango ? 'bg-emerald-50' : ''}`}>
                      <td className="py-2 px-3 font-medium">{pos.categoria}</td>
                      <td className="text-center py-2 px-3 font-mono">{pos.imoMin.toFixed(1)}</td>
                      <td className="text-center py-2 px-3 font-mono">{pos.imoMax.toFixed(1)}</td>
                      <td className="text-center py-2 px-3">{pos.grasaMin}%</td>
                      <td className="text-center py-2 px-3">{pos.grasaMax}%</td>
                      <td className="text-center py-2 px-3">
                        {enRango ? (
                          <Badge className="bg-emerald-500 text-white text-xs">✓ EN RANGO</Badge>
                        ) : imo < pos.imoMin ? (
                          <span className="text-amber-600 text-xs">Por debajo</span>
                        ) : (
                          <span className="text-purple-600 text-xs">Por encima</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Fuentes: Holway & Barrios (2012), Ross et al. (1999), Carter & Ackland (1994), datos de selecciones nacionales.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
