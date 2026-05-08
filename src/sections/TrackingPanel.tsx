import { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, Users, Target, Calendar, RefreshCw } from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';

interface EvaluacionGuardada {
  id: string;
  fecha: string;
  resultado: ResultadoISAK;
}

function getHistorialStorage(): EvaluacionGuardada[] {
  try {
    const raw = localStorage.getItem('anthroscope_evaluaciones');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function TrackingPanel() {
  const [tick, setTick] = useState(0);
  const [atletaSeleccionado, setAtletaSeleccionado] = useState<string>('');
  const [compararCon, setCompararCon] = useState<string>('');
  const [metricaActiva, setMetricaActiva] = useState<'imo' | 'grasa' | 'musculo' | 'somatotipo'>('imo');

  // Forzar re-lectura cuando cambia localStorage o manualmente
  const recargar = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    const handleStorage = () => setTick(t => t + 1);
    window.addEventListener('storage', handleStorage);
    // También cada 3 segundos por si acaso
    const interval = setInterval(handleStorage, 3000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Leer directamente de localStorage — tick fuerza re-render
  const evaluaciones = getHistorialStorage();
  const nombres = [...new Set(evaluaciones.map(e => e.resultado?.sujeto?.nombre || ''))].filter(Boolean);

  const datosAtleta = atletaSeleccionado
    ? evaluaciones
        .filter(e => e.resultado?.sujeto?.nombre === atletaSeleccionado)
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    : [];
  const datosComparar = compararCon
    ? evaluaciones
        .filter(e => e.resultado?.sujeto?.nombre === compararCon)
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    : [];

  // Preparar datos para gráficos
  const chartData = datosAtleta.map((e) => ({
    fecha: e.fecha,
    fechaCorta: e.fecha.slice(5),
    IMO: Number(e.resultado.cincoComponentes?.indiceMusculoOseo?.toFixed(2) || 0),
    Grasa: Number(e.resultado.siriPorcentajeGrasa?.toFixed(1) || 0),
    Musculo: Number(e.resultado.cincoComponentes?.masaMuscular?.toFixed(1) || 0),
    Endo: Number(e.resultado.somatotipo?.endomorfia?.toFixed(1) || 0),
    Meso: Number(e.resultado.somatotipo?.mesomorfia?.toFixed(1) || 0),
    Ecto: Number(e.resultado.somatotipo?.ectomorfia?.toFixed(1) || 0),
  }));

  // Comparación data
  const compareData = chartData.map((d, i) => ({
    ...d,
    IMO_comp: datosComparar[i]?.resultado.cincoComponentes?.indiceMusculoOseo || null,
    Grasa_comp: datosComparar[i]?.resultado.siriPorcentajeGrasa || null,
    Musculo_comp: datosComparar[i]?.resultado.cincoComponentes?.masaMuscular || null,
  }));

  // Función helper para días entre fechas
  const diasEntre = (d1: string, d2: string) => {
    const a = new Date(d1), b = new Date(d2);
    return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Alertas: detectar cambios significativos
  const alertas: string[] = [];
  if (datosAtleta.length >= 2) {
    const ultimo = datosAtleta[datosAtleta.length - 1].resultado;
    const previo = datosAtleta[datosAtleta.length - 2].resultado;
    const cambioGrasa = (ultimo.siriPorcentajeGrasa || 0) - (previo.siriPorcentajeGrasa || 0);
    const cambioIMO = (ultimo.cincoComponentes?.indiceMusculoOseo || 0) - (previo.cincoComponentes?.indiceMusculoOseo || 0);
    
    if (cambioGrasa > 3) alertas.push(`${atletaSeleccionado}: Subió ${cambioGrasa.toFixed(1)}% de grasa en ${diasEntre(previo.sujeto.fechaEvaluacion, ultimo.sujeto.fechaEvaluacion)} días. Revisar dieta/carga.`);
    if (cambioGrasa < -3) alertas.push(`${atletaSeleccionado}: Bajó ${Math.abs(cambioGrasa).toFixed(1)}% de grasa. Posible sobreentrenamiento.`);
    if (cambioIMO < -0.3) alertas.push(`${atletaSeleccionado}: IMO descendió ${Math.abs(cambioIMO).toFixed(2)}. Pérdida de tejido muscular.`);
    if (cambioIMO > 0.5) alertas.push(`${atletaSeleccionado}: IMO subió ${cambioIMO.toFixed(2)}. Excelente ganancia muscular.`);
  }

  const metricaConfig = {
    imo: { key: 'IMO', color: '#D4FF00', label: 'IMO (Índice Músculo-Óseo)', yDomain: [3, 7] },
    grasa: { key: 'Grasa', color: '#ef4444', label: '% Grasa (Siri)', yDomain: [5, 25] },
    musculo: { key: 'Musculo', color: '#6366f1', label: 'Masa Muscular (kg)', yDomain: [20, 55] },
    somatotipo: { key: '', color: '', label: 'Somatotipo', yDomain: [0, 8] },
  };

  return (
    <div className="space-y-6">
      {/* Selector de atletas */}
      <Card className="p-6 bg-[#11121a] border-[#1e1f2e]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#D4FF00]" />
            <span className="text-[#f0f0f5] font-semibold">Atleta:</span>
            <select
              value={atletaSeleccionado}
              onChange={e => setAtletaSeleccionado(e.target.value)}
              className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#D4FF00]"
            >
              <option value="">Seleccionar atleta... ({nombres.length} en historial)</option>
              {nombres.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#6366f1]" />
            <span className="text-[#f0f0f5] font-semibold">Comparar:</span>
            <select
              value={compararCon}
              onChange={e => setCompararCon(e.target.value)}
              className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#D4FF00]"
            >
              <option value="">Nadie</option>
              {nombres.filter(n => n !== atletaSeleccionado).map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            {(['imo', 'grasa', 'musculo', 'somatotipo'] as const).map(m => (
              <Button
                key={m}
                size="sm"
                variant={metricaActiva === m ? 'default' : 'outline'}
                onClick={() => setMetricaActiva(m)}
                className={metricaActiva === m 
                  ? 'bg-[#D4FF00] text-[#050608] font-semibold hover:bg-[#a8cc00]'
                  : 'border-[#2e2f42] text-[#8a8d9e] hover:border-[#D4FF00] hover:text-[#D4FF00] bg-transparent'
                }
              >
                {m === 'imo' && 'IMO'}
                {m === 'grasa' && '% Grasa'}
                {m === 'musculo' && 'Músculo'}
                {m === 'somatotipo' && 'Somatotipo'}
              </Button>
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={recargar} className="border-[#2e2f42] text-[#8a8d9e]">
            <RefreshCw className="w-4 h-4 mr-1" /> Recargar
          </Button>
        </div>
      </Card>

      {/* Alertas */}
      {alertas.length > 0 && (
        <div className="space-y-2">
          {alertas.map((alerta, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-[#1e1f2e] border border-[#D4FF00]/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-[#D4FF00] shrink-0" />
              <span className="text-sm text-[#f0f0f5]">{alerta}</span>
            </div>
          ))}
        </div>
      )}

      {/* Gráficos */}
      {chartData.length > 0 ? (
        <>
          {/* Line chart: tendencia temporal */}
          <Card className="p-6 bg-[#11121a] border-[#1e1f2e]">
            <h3 className="text-lg font-bold text-[#f0f0f5] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D4FF00]" />
              Tendencia {metricaConfig[metricaActiva].label}
            </h3>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                {metricaActiva === 'somatotipo' ? (
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="#1e1f2e" />
                    <PolarAngleAxis dataKey="fechaCorta" tick={{ fill: '#8a8d9e', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 8]} tick={{ fill: '#55576b', fontSize: 10 }} />
                    <Radar name="Endo" dataKey="Endo" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                    <Radar name="Meso" dataKey="Meso" stroke="#D4FF00" fill="#D4FF00" fillOpacity={0.1} />
                    <Radar name="Ecto" dataKey="Ecto" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                    <Legend wrapperStyle={{ color: '#8a8d9e' }} />
                  </RadarChart>
                ) : (
                  <LineChart data={compareData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1f2e" />
                    <XAxis dataKey="fechaCorta" tick={{ fill: '#8a8d9e', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#8a8d9e', fontSize: 12 }} domain={metricaConfig[metricaActiva].yDomain} />
                    <Tooltip
                      contentStyle={{ background: '#11121a', border: '1px solid #1e1f2e', borderRadius: '8px', color: '#f0f0f5' }}
                      labelStyle={{ color: '#D4FF00' }}
                    />
                    <Legend wrapperStyle={{ color: '#8a8d9e' }} />
                    <Line
                      type="monotone"
                      dataKey={metricaConfig[metricaActiva].key}
                      stroke={metricaConfig[metricaActiva].color}
                      strokeWidth={3}
                      dot={{ fill: metricaConfig[metricaActiva].color, strokeWidth: 0, r: 5 }}
                      name={atletaSeleccionado}
                    />
                    {compararCon && (
                      <Line
                        type="monotone"
                        dataKey={metricaConfig[metricaActiva].key + '_comp'}
                        stroke="#8a8d9e"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        dot={{ fill: '#8a8d9e', strokeWidth: 0, r: 4 }}
                        name={compararCon}
                      />
                    )}
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Tabla de cambios */}
          {datosAtleta.length >= 2 && (
            <Card className="p-6 bg-[#11121a] border-[#1e1f2e]">
              <h3 className="text-lg font-bold text-[#f0f0f5] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#D4FF00]" />
                Cambios entre evaluaciones
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1f2e]">
                      <th className="text-left py-2 px-3 text-[#8a8d9e]">Fecha</th>
                      <th className="text-center py-2 px-3 text-[#8a8d9e]">IMO</th>
                      <th className="text-center py-2 px-3 text-[#8a8d9e]">% Grasa</th>
                      <th className="text-center py-2 px-3 text-[#8a8d9e]">Masa Muscular</th>
                      <th className="text-center py-2 px-3 text-[#8a8d9e]">Endo / Meso / Ecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosAtleta.map((e, i) => {
                      const prev = i > 0 ? datosAtleta[i - 1].resultado : null;
                      const r = e.resultado;
                      const cambioIMO = prev && r.cincoComponentes && prev.cincoComponentes
                        ? r.cincoComponentes.indiceMusculoOseo - prev.cincoComponentes.indiceMusculoOseo : 0;
                      const cambioGrasa = prev ? (r.siriPorcentajeGrasa || 0) - (prev.siriPorcentajeGrasa || 0) : 0;
                      
                      return (
                        <tr key={i} className="border-b border-[#1e1f2e]/50 hover:bg-[#1e1f2e]/30">
                          <td className="py-2 px-3 text-[#f0f0f5]">{e.fecha}</td>
                          <td className="py-2 px-3 text-center">
                            <span className="text-[#f0f0f5] font-mono">{r.cincoComponentes?.indiceMusculoOseo?.toFixed(2) || '-'}</span>
                            {i > 0 && (
                              <span className={`ml-2 text-xs ${cambioIMO > 0 ? 'text-[#22c55e]' : cambioIMO < 0 ? 'text-red-400' : 'text-[#55576b]'}`}>
                                {cambioIMO > 0 ? '+' : ''}{cambioIMO.toFixed(2)}
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="text-[#f0f0f5] font-mono">{r.siriPorcentajeGrasa?.toFixed(1) || '-'}%</span>
                            {i > 0 && (
                              <span className={`ml-2 text-xs ${cambioGrasa < 0 ? 'text-[#22c55e]' : cambioGrasa > 0 ? 'text-red-400' : 'text-[#55576b]'}`}>
                                {cambioGrasa > 0 ? '+' : ''}{cambioGrasa.toFixed(1)}%
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-center text-[#f0f0f5] font-mono">{r.cincoComponentes?.masaMuscular?.toFixed(1) || '-'} kg</td>
                          <td className="py-2 px-3 text-center text-[#f0f0f5] font-mono text-xs">
                            {r.somatotipo ? `${r.somatotipo.endomorfia.toFixed(1)} / ${r.somatotipo.mesomorfia.toFixed(1)} / ${r.somatotipo.ectomorfia.toFixed(1)}` : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card className="p-12 text-center bg-[#11121a] border-[#1e1f2e]">
          <TrendingUp className="w-12 h-12 text-[#55576b] mx-auto mb-4" />
          <p className="text-[#8a8d9e]">No hay evaluaciones guardadas para tracking longitudinal.</p>
          <p className="text-sm text-[#55576b] mt-2">Realiza evaluaciones y se guardarán automáticamente. Vuelve aquí para ver tendencias.</p>
        </Card>
      )}
    </div>
  );
}
