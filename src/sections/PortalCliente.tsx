import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  User, TrendingUp, Activity, Dna, Flame, Scale, Droplets, Award, Calendar, BookOpen
} from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';
import { DiarioAlimentos } from './DiarioAlimentos';

function getResultadosPorCliente(nombre: string): ResultadoISAK[] {
  try {
    const raw = localStorage.getItem('anthroscope_evaluaciones');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed
          .map((e: any) => e.resultado)
          .filter((r: any) => r?.sujeto?.nombre === nombre)
          .sort((a: any, b: any) => new Date(a.sujeto?.fechaEvaluacion || '').getTime() - new Date(b.sujeto?.fechaEvaluacion || '').getTime())
      : [];
  } catch { return []; }
}

function getPlanesPorCliente(nombre: string) {
  try {
    const raw = localStorage.getItem('anthroscope_planes');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((p: any) => p.clienteNombre === nombre) : [];
  } catch { return []; }
}

export function PortalCliente() {
  const [nombre, setNombre] = useState('');
  const [ingresado, setIngresado] = useState(false);
  const [resultados, setResultados] = useState<ResultadoISAK[]>([]);
  const [planes, setPlanes] = useState<any[]>([]);

  const buscar = () => {
    if (!nombre) return;
    const r = getResultadosPorCliente(nombre);
    const p = getPlanesPorCliente(nombre);
    setResultados(r);
    setPlanes(p);
    setIngresado(true);
  };

  if (!ingresado || resultados.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <Card className="bg-[#11121a] border-[#1e1f2e] text-center p-8">
          <User className="w-12 h-12 text-[#D4FF00] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#f0f0f5] mb-2">Portal del Atleta</h2>
          <p className="text-xs text-[#8a8d9e] mb-6">Ingresa tu nombre para ver tu evolución y plan nutricional</p>
          <div className="flex gap-2">
            <Input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && buscar()}
              placeholder="Tu nombre exacto (como en la evaluación)"
              className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]"
            />
            <Button onClick={buscar} className="bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] shrink-0">
              Ver
            </Button>
          </div>
          {ingresado && resultados.length === 0 && (
            <p className="text-xs text-[#ef4444] mt-3">No se encontraron evaluaciones con ese nombre</p>
          )}
        </Card>
      </div>
    );
  }

  const ultimo = resultados[resultados.length - 1];
  const primero = resultados[0];
  const cc = ultimo.cincoComponentes;
  const st = ultimo.somatotipo;

  const chartData = resultados.map(r => ({
    fecha: r.sujeto?.fechaEvaluacion?.slice(0, 10) || '',
    peso: r.perfil?.masaCorporal || 0,
    imo: r.cincoComponentes?.indiceMusculoOseo || 0,
    grasa: r.siriPorcentajeGrasa || 0,
    musculo: r.cincoComponentes?.porcentajeMuscular || 0,
  }));

  const cambioPeso = primero && ultimo ? ((ultimo.perfil?.masaCorporal || 0) - (primero.perfil?.masaCorporal || 0)) : 0;
  const cambioGrasa = primero && ultimo ? ((ultimo.siriPorcentajeGrasa || 0) - (primero.siriPorcentajeGrasa || 0)) : 0;
  const cambioIMO = primero && ultimo ? ((ultimo.cincoComponentes?.indiceMusculoOseo || 0) - (primero.cincoComponentes?.indiceMusculoOseo || 0)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#f0f0f5]">{nombre}</h2>
        <p className="text-xs text-[#8a8d9e]">
          <Calendar className="w-3 h-3 inline mr-1" />
          {ultimo.sujeto?.fechaEvaluacion} · {ultimo.sujeto?.deporte || 'Sin deporte'} · Evaluación ISAK Nivel {ultimo.nivel}
        </p>
      </div>

      {/* Cambios desde primera evaluación */}
      {resultados.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
            <Scale className="w-4 h-4 text-[#D4FF00] mx-auto mb-1" />
            <p className={`text-lg font-bold ${cambioPeso < 0 ? 'text-[#22c55e]' : cambioPeso > 0 ? 'text-[#f59e0b]' : 'text-[#f0f0f5]'}`}>
              {cambioPeso > 0 ? '+' : ''}{cambioPeso.toFixed(1)} kg
            </p>
            <p className="text-[10px] text-[#8a8d9e]">Desde primera evaluación</p>
          </Card>
          <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
            <Activity className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
            <p className={`text-lg font-bold ${cambioGrasa < 0 ? 'text-[#22c55e]' : cambioGrasa > 0 ? 'text-[#ef4444]' : 'text-[#f0f0f5]'}`}>
              {cambioGrasa > 0 ? '+' : ''}{cambioGrasa.toFixed(1)}%
            </p>
            <p className="text-[10px] text-[#8a8d9e]">% Grasa corporal</p>
          </Card>
          <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
            <Dna className="w-4 h-4 text-[#a78bfa] mx-auto mb-1" />
            <p className={`text-lg font-bold ${cambioIMO > 0 ? 'text-[#22c55e]' : cambioIMO < 0 ? 'text-[#ef4444]' : 'text-[#f0f0f5]'}`}>
              {cambioIMO > 0 ? '+' : ''}{cambioIMO.toFixed(2)} IMO
            </p>
            <p className="text-[10px] text-[#8a8d9e]">Índice Músculo-Óseo</p>
          </Card>
        </div>
      )}

      {/* KPIs actuales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
          <Flame className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
          <p className="text-lg font-bold text-[#f0f0f5]">{ultimo.perfil?.masaCorporal || 'N/A'} kg</p>
          <p className="text-[10px] text-[#8a8d9e]">Peso</p>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
          <Activity className="w-4 h-4 text-[#ef4444] mx-auto mb-1" />
          <p className="text-lg font-bold text-[#f0f0f5]">{ultimo.siriPorcentajeGrasa || 'N/A'}%</p>
          <p className="text-[10px] text-[#8a8d9e]">% Grasa (Siri)</p>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
          <Dna className="w-4 h-4 text-[#a78bfa] mx-auto mb-1" />
          <p className="text-lg font-bold text-[#f0f0f5]">{cc?.indiceMusculoOseo?.toFixed(2) || 'N/A'}</p>
          <p className="text-[10px] text-[#8a8d9e]">IMO</p>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e] p-3 text-center">
          <Award className="w-4 h-4 text-[#22c55e] mx-auto mb-1" />
          <p className="text-lg font-bold text-[#f0f0f5]">{st?.categoria || 'N/A'}</p>
          <p className="text-[10px] text-[#8a8d9e]">Somatotipo</p>
        </Card>
      </div>

      {/* Composición corporal donut visual */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#D4FF00]" /> Composición Corporal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Masa Muscular', val: cc?.masaMuscular?.toFixed(1), pct: cc?.porcentajeMuscular?.toFixed(1), color: 'text-[#6366f1]', bar: 'bg-[#6366f1]' },
              { label: 'Masa Adiposa', val: cc?.masaAdiposa?.toFixed(1), pct: cc?.porcentajeAdiposo?.toFixed(1), color: 'text-[#f59e0b]', bar: 'bg-[#f59e0b]' },
              { label: 'Masa Ósea', val: cc?.masaOsea?.toFixed(1), pct: cc?.porcentajeOseo?.toFixed(1), color: 'text-[#a78bfa]', bar: 'bg-[#a78bfa]' },
              { label: 'Otros (piel, residual)', val: cc?.masaResidual?.toFixed(1), pct: cc?.porcentajeResidual?.toFixed(1), color: 'text-[#8a8d9e]', bar: 'bg-[#8a8d9e]' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className={`text-lg font-bold ${item.color}`}>{item.val || 'N/A'} kg</p>
                <div className="w-full h-1.5 bg-[#1e1f2e] rounded-full mt-1 mb-1 overflow-hidden">
                  <div className={`h-full ${item.bar} rounded-full`} style={{ width: `${Math.min(parseFloat(item.pct || '0'), 100)}%` }} />
                </div>
                <p className="text-[10px] text-[#8a8d9e]">{item.label} ({item.pct || '0'}%)</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de evolución */}
      {resultados.length > 1 && (
        <>
          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#f0f0f5]">Evolución IMO y % Grasa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1f2e" />
                  <XAxis dataKey="fecha" stroke="#55576b" fontSize={10} />
                  <YAxis yAxisId="left" stroke="#a78bfa" fontSize={10} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={10} />
                  <Tooltip contentStyle={{ background: '#11121a', border: '1px solid #1e1f2e', borderRadius: '8px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="imo" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa' }} name="IMO" />
                  <Line yAxisId="right" type="monotone" dataKey="grasa" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} name="% Grasa" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#f0f0f5]">Evolución Peso y % Músculo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1f2e" />
                  <XAxis dataKey="fecha" stroke="#55576b" fontSize={10} />
                  <YAxis yAxisId="left" stroke="#D4FF00" fontSize={10} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6366f1" fontSize={10} />
                  <Tooltip contentStyle={{ background: '#11121a', border: '1px solid #1e1f2e', borderRadius: '8px' }} />
                  <Area yAxisId="left" type="monotone" dataKey="peso" stroke="#D4FF00" fill="#D4FF00" fillOpacity={0.1} name="Peso (kg)" />
                  <Area yAxisId="right" type="monotone" dataKey="musculo" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} name="% Músculo" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Plan nutricional activo */}
      {planes.length > 0 && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#06b6d4]" /> Plan Nutricional Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const p = planes[planes.length - 1];
              return (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#8a8d9e]">Objetivo: <span className="text-[#f0f0f5] font-semibold">{p.objetivo?.replace('_', ' ') || 'Mantenimiento'}</span></span>
                    <span className="text-xs text-[#8a8d9e]">{p.fecha}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="bg-[#0a0b0f] rounded p-2"><p className="text-sm font-bold text-[#f59e0b]">{p.caloriasDiarias}</p><p className="text-[9px] text-[#55576b]">kcal</p></div>
                    <div className="bg-[#0a0b0f] rounded p-2"><p className="text-sm font-bold text-[#ef4444]">{p.proteinas}g</p><p className="text-[9px] text-[#55576b]">prot</p></div>
                    <div className="bg-[#0a0b0f] rounded p-2"><p className="text-sm font-bold text-[#22c55e]">{p.carbohidratos}g</p><p className="text-[9px] text-[#55576b]">carbs</p></div>
                    <div className="bg-[#0a0b0f] rounded p-2"><p className="text-sm font-bold text-[#6366f1]">{p.grasas}g</p><p className="text-[9px] text-[#55576b]">grasa</p></div>
                    <div className="bg-[#0a0b0f] rounded p-2"><p className="text-sm font-bold text-[#06b6d4]">{p.agua}L</p><p className="text-[9px] text-[#55576b]">agua</p></div>
                  </div>
                  {p.comidas?.map((c: any, i: number) => (
                    <div key={i} className="flex justify-between text-xs py-1 border-b border-[#1e1f2e]/50">
                      <span className="text-[#f0f0f5]">{c.nombre}</span>
                      <span className="text-[#8a8d9e]">{c.calorias} kcal · P:{c.proteinas}g C:{c.carbs}g</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Mi Diario de Alimentos */}
      {nombre && <DiarioAlimentos cliente={nombre} />}

      <Button onClick={() => { setIngresado(false); setNombre(''); }} variant="outline" className="w-full border-[#2e2f42] text-[#8a8d9e]">
        Salir del portal
      </Button>
    </div>
  );
}
