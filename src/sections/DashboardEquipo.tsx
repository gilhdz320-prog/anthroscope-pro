import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Users, Target, Dna } from 'lucide-react';

interface EvalGuardada {
  id: string;
  fecha: string;
  sujeto: any;
  perfilR: any;
  perfilC: any;
}

export function ComparacionPrePost({ nombre, sexo }: { nombre: string; sexo: string }) {
  const [evals] = useState<EvalGuardada[]>(() => {
    const all = JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');
    return all.filter((e: any) => e.sujeto?.nombre === nombre).sort((a: any, b: any) =>
      new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
  });

  if (evals.length < 2) {
    return (
      <Card className="bg-[#11121a] border-[#1e1f2e] p-6">
        <p className="text-[#8a8d9e] text-center">
          Necesitas al menos 2 evaluaciones de {nombre} para comparar evolución.
        </p>
      </Card>
    );
  }

  const prev = evals[evals.length - 2];
  const curr = evals[evals.length - 1];

  // Calculate deltas using stored raw data
  const calcDelta = (currVal: number, prevVal: number) => {
    const diff = currVal - prevVal;
    const pct = prevVal ? ((diff / prevVal) * 100) : 0;
    return { diff, pct };
  };

  const peso = calcDelta(curr.perfilR?.masaCorporal || 0, prev.perfilR?.masaCorporal || 0);
  const estatura = calcDelta(curr.perfilR?.estatura || 0, prev.perfilR?.estatura || 0);
  const imc = { diff: 0, pct: 0 }; // would need calculation

  return (
    <Card className="bg-[#11121a] border-[#1e1f2e]">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#f0f0f5] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#D4FF00]" />
            Comparación Pre/Post
          </h3>
          <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20">
            {prev.fecha} → {curr.fecha}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DeltaCard
            label="Peso"
            value={`${peso.diff > 0 ? '+' : ''}${peso.diff.toFixed(1)} kg`}
            sub={`${peso.pct > 0 ? '+' : ''}${peso.pct.toFixed(1)}%`}
            positive={peso.diff < 0}
          />
          <DeltaCard
            label="Estatura"
            value={`${estatura.diff > 0 ? '+' : ''}${estatura.diff.toFixed(1)} cm`}
            sub={`${estatura.pct > 0 ? '+' : ''}${estatura.pct.toFixed(1)}%`}
            positive={estatura.diff > 0}
          />
          <DeltaCard
            label="Suma Pliegues"
            value="--"
            sub="Importa evaluaciones con datos"
            positive={false}
          />
          <DeltaCard
            label="IMO"
            value="--"
            sub="Calcula primero en Mediciones"
            positive={false}
          />
        </div>

        <p className="text-xs text-[#55576b]">
          Nota: Para deltas completos (% grasa, IMO, masa muscular), las evaluaciones deben haber sido
          calculadas con la herramienta (no solo importadas raw).
        </p>
      </CardContent>
    </Card>
  );
}

function DeltaCard({ label, value, sub, positive }: { label: string; value: string; sub: string; positive: boolean }) {
  return (
    <div className={`p-3 rounded-lg border text-center ${
      positive ? 'bg-[#22c55e]/5 border-[#22c55e]/20' : 'bg-[#ef4444]/5 border-[#ef4444]/20'
    }`}>
      <p className="text-xs text-[#8a8d9e]">{label}</p>
      <p className={`text-lg font-bold ${positive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{value}</p>
      <p className="text-[10px] text-[#55576b]">{sub}</p>
    </div>
  );
}

export function DashboardEquipo() {
  const [evals] = useState<EvalGuardada[]>(() => {
    return JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');
  });

  const nombres = useMemo(() => {
    return [...new Set(evals.map(e => e.sujeto?.nombre).filter(Boolean))];
  }, [evals]);

  if (evals.length === 0) {
    return (
      <Card className="bg-[#11121a] border-[#1e1f2e] p-12 text-center">
        <Users className="w-12 h-12 text-[#55576b] mx-auto mb-4" />
        <p className="text-[#8a8d9e]">No hay evaluaciones guardadas.</p>
        <p className="text-xs text-[#55576b] mt-2">
          Realiza evaluaciones o importa desde Excel para ver el dashboard.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#11121a] border-[#1e1f2e] p-4">
          <p className="text-xs text-[#8a8d9e]">Atletas evaluados</p>
          <p className="text-2xl font-bold text-[#f0f0f5]">{nombres.length}</p>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e] p-4">
          <p className="text-xs text-[#8a8d9e]">Total evaluaciones</p>
          <p className="text-2xl font-bold text-[#D4FF00]">{evals.length}</p>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e] p-4">
          <p className="text-xs text-[#8a8d9e]">Promedio peso</p>
          <p className="text-2xl font-bold text-[#6366f1]">
            {(evals.reduce((s, e) => s + (e.perfilR?.masaCorporal || 0), 0) / evals.length).toFixed(1)} kg
          </p>
        </Card>
      </div>

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-[#f0f0f5] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            Alertas del Equipo
          </h3>
          <div className="space-y-2">
            {evals.slice(-5).map((e, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <div>
                  <p className="text-sm font-semibold text-[#f0f0f5]">{e.sujeto?.nombre || 'Sin nombre'}</p>
                  <p className="text-xs text-[#55576b]">{e.fecha} | {e.sujeto?.deporte || 'Sin deporte'}</p>
                </div>
                <Badge variant="outline" className="border-[#2e2f42] text-[#8a8d9e]">
                  {e.perfilR?.masaCorporal || '--'} kg
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-[#f0f0f5] mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#D4FF00]" />
            Comparativa por Atleta
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1f2e]">
                  <th className="text-left py-2 px-3 text-[#8a8d9e]">Nombre</th>
                  <th className="text-left py-2 px-3 text-[#8a8d9e]">Evaluaciones</th>
                  <th className="text-left py-2 px-3 text-[#8a8d9e]">Último peso</th>
                  <th className="text-left py-2 px-3 text-[#8a8d9e]">Deporte</th>
                </tr>
              </thead>
              <tbody>
                {nombres.map(nombre => {
                  const evs = evals.filter((e: any) => e.sujeto?.nombre === nombre);
                  const ultimo = evs[evs.length - 1];
                  return (
                    <tr key={nombre} className="border-b border-[#1e1f2e]/50">
                      <td className="py-2 px-3 text-[#f0f0f5] font-semibold">{nombre}</td>
                      <td className="py-2 px-3 text-[#D4FF00]">{evs.length}</td>
                      <td className="py-2 px-3 text-[#f0f0f5] font-mono">{ultimo?.perfilR?.masaCorporal || '--'} kg</td>
                      <td className="py-2 px-3 text-[#8a8d9e]">{ultimo?.sujeto?.deporte || '--'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
