import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, Dna, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  },
  femenino: {
    imoPromedio: 3.5,
    imoSuperior: 4.2,
    imoElite: 4.6,
    imoMaxNatural: 5.1,  // Límite superior natural femenino
    imoDudoso: 5.4,
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
  const { t } = useTranslation();
  const limites = LIMITES[sexo];

  // Categorías traducidas
  const categorias = [
    t('genetico.sedentario'),
    t('genetico.entrenado'),
    t('genetico.atletaComp'),
    t('genetico.eliteNatural'),
    t('genetico.geneticaExc'),
  ];

  // Determinar categoría actual
  let categoriaActual = 0;
  let colorCategoria = 'bg-[#0a0b0f]0';
  let mensajeGenetico = '';

  if (imo >= limites.imoMaxNatural) {
    categoriaActual = 4;
    colorCategoria = 'bg-purple-600';
    mensajeGenetico = imo > limites.imoDudoso
      ? t('genetico.alertaFuera')
      : t('genetico.alertaMaximo');
  } else if (imo >= limites.imoElite) {
    categoriaActual = 3;
    colorCategoria = 'bg-[#D4FF00]';
    mensajeGenetico = t('genetico.alertaElite');
  } else if (imo >= limites.imoSuperior) {
    categoriaActual = 2;
    colorCategoria = 'bg-[#6366f1]/100';
    mensajeGenetico = t('genetico.alertaAtleta');
  } else if (imo >= limites.imoPromedio) {
    categoriaActual = 1;
    colorCategoria = 'bg-[#f59e0b]/100';
    mensajeGenetico = t('genetico.alertaEntrenado');
  } else {
    categoriaActual = 0;
    colorCategoria = 'bg-slate-400';
    mensajeGenetico = t('genetico.alertaSedentario');
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
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-[#f0f0f5]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Dna className="w-7 h-7 text-[#D4FF00]" />
            <h2 className="text-2xl font-bold">{t('genetico.titulo')}</h2>
          </div>
          <p className="text-[#55576b] text-sm">
            {t('genetico.subtitulo')}
          </p>
        </CardContent>
      </Card>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`${colorCategoria} text-[#f0f0f5]`}>
          <CardContent className="pt-6 text-center">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">{t('genetico.imoActual')}</p>
            <p className="text-4xl font-bold">{imo.toFixed(2)}</p>
            <p className="text-xs opacity-80 mt-1">{categorias[categoriaActual]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-[#8a8d9e] uppercase mb-1">{t('genetico.limiteNatural')}</p>
            <p className="text-3xl font-bold text-[#f0f0f5]">{limites.imoMaxNatural}</p>
            <p className="text-xs text-[#55576b]">{sexo === 'masculino' ? 'Male' : 'Female'} limit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-[#8a8d9e] uppercase mb-1">{t('genetico.potencialRemanente')}</p>
            <p className="text-3xl font-bold text-[#050608]">
              {potencialRemanente > 0 ? `+${potencialRemanente.toFixed(1)}` : `${potencialRemanente.toFixed(1)}`}
            </p>
            <p className="text-xs text-[#55576b]">{t('genetico.potencialKg')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-[#8a8d9e] uppercase mb-1">{t('genetico.porcTecho')}</p>
            <p className="text-3xl font-bold text-[#6366f1]">{porcentajeAlcanzado.toFixed(0)}%</p>
            <Progress value={porcentajeAlcanzado} max={100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* MENSAJE GENÉTICO */}
      {mensajeGenetico && (
        <Card className={imo >= limites.imoMaxNatural ? 'border-2 border-purple-400 bg-[#a78bfa]/10' : 'bg-[#0a0b0f]'}>
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
            <TrendingUp className="w-5 h-5 text-[#D4FF00]" />
            {t('genetico.escala')}
          </CardTitle>
          <p className="text-xs text-[#8a8d9e]">
            {sexo === 'masculino' ? 'Male' : 'Female'} | 
            IMO: <span className="font-bold">{imo.toFixed(2)}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: t('genetico.sedentario'), min: 0, max: limites.imoPromedio, color: 'bg-[#2e2f42]', desc: t('genetico.descSed') },
              { label: t('genetico.entrenado'), min: limites.imoPromedio, max: limites.imoSuperior, color: 'bg-amber-400', desc: t('genetico.descEnt') },
              { label: t('genetico.atletaComp'), min: limites.imoSuperior, max: limites.imoElite, color: 'bg-blue-400', desc: t('genetico.descAtl') },
              { label: t('genetico.eliteNatural'), min: limites.imoElite, max: limites.imoMaxNatural, color: 'bg-[#22c55e]/100', desc: t('genetico.descEli') },
              { label: t('genetico.geneticaExc'), min: limites.imoMaxNatural, max: limites.imoDudoso, color: 'bg-[#a78bfa]/100', desc: t('genetico.descGen') },
            ].map((rango, i) => {
              const activo = imo >= rango.min && imo < rango.max;
              const pasado = imo >= rango.max;
              return (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${activo ? 'bg-[#0a0b0f] ring-2 ring-emerald-300' : ''}`}>
                  <div className={`w-4 h-4 rounded-full shrink-0 ${rango.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{rango.label}</span>
                      <span className="text-xs text-[#8a8d9e] font-mono">{rango.min.toFixed(1)} - {rango.max.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-[#11121a] rounded-full mt-1 overflow-hidden">
                      <div className={`h-full rounded-full ${rango.color} transition-all`} style={{ width: `${Math.min(100, ((rango.max - rango.min) / limites.imoDudoso) * 100)}%` }} />
                    </div>
                    <p className="text-[10px] text-[#55576b] mt-1">{rango.desc}</p>
                  </div>
                  {activo && <Badge className="bg-[#22c55e]/100 text-[#f0f0f5] shrink-0">{imo >= limites.imoMaxNatural ? 'MAX' : 'YOU'}</Badge>}
                  {pasado && i === 4 && <Badge className="bg-[#a78bfa]/100 text-[#f0f0f5] shrink-0">YOU</Badge>}
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
            <Target className="w-5 h-5 text-[#6366f1]" />
            {t('genetico.tablasTitulo')}
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
                <tr className="border-b text-xs text-[#8a8d9e]">
                  <th className="text-left py-2 px-3">{t('genetico.posicion')}</th>
                  <th className="text-center py-2 px-3">{t('genetico.imoMin')}</th>
                  <th className="text-center py-2 px-3">{t('genetico.imoMax')}</th>
                  <th className="text-center py-2 px-3">{t('genetico.grasaMin')}</th>
                  <th className="text-center py-2 px-3">{t('genetico.grasaMax')}</th>
                  <th className="text-center py-2 px-3">{t('genetico.tuIMO')}</th>
                </tr>
              </thead>
              <tbody>
                {deporte.posiciones.map((pos, i) => {
                  const enRango = imo >= pos.imoMin && imo <= pos.imoMax;
                  return (
                    <tr key={i} className={`border-b hover:bg-[#0a0b0f] ${enRango ? 'bg-[#22c55e]/10' : ''}`}>
                      <td className="py-2 px-3 font-medium">{pos.categoria}</td>
                      <td className="text-center py-2 px-3 font-mono">{pos.imoMin.toFixed(1)}</td>
                      <td className="text-center py-2 px-3 font-mono">{pos.imoMax.toFixed(1)}</td>
                      <td className="text-center py-2 px-3">{pos.grasaMin}%</td>
                      <td className="text-center py-2 px-3">{pos.grasaMax}%</td>
                      <td className="text-center py-2 px-3">
                        {enRango ? (
                          <Badge className="bg-[#22c55e]/100 text-[#f0f0f5] text-xs">{t('genetico.enRango')}</Badge>
                        ) : imo < pos.imoMin ? (
                          <span className="text-amber-600 text-xs">{t('genetico.porDebajo')}</span>
                        ) : (
                          <span className="text-[#a78bfa] text-xs">{t('genetico.porEncima')}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#55576b] mt-3">
            {t('genetico.fuentes')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
