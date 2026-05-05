import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell } from 'recharts';
import { Activity } from 'lucide-react';

interface AtletaSoma {
  nombre: string;
  endomorfia: number;
  mesomorfia: number;
  ectomorfia: number;
  posicion?: string;
}

interface SomatocartaGrupalProps {
  atletas: AtletaSoma[];
  titulo?: string;
}

const COLORS = [
  '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#84cc16', '#6366f1',
  '#14b8a6', '#eab308', '#a855f7', '#22c55e', '#f43f5e',
];

export function SomatocartaGrupal({ atletas, titulo = 'Somatocarta Grupal' }: SomatocartaGrupalProps) {
  const data = atletas.map((a) => {
    const x = a.mesomorfia - a.endomorfia;
    const y = 2 * a.ectomorfia - (a.endomorfia + a.mesomorfia);
    return { ...a, x, y };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5 text-emerald-600" />
          {titulo}
          <Badge variant="secondary" className="ml-2">{atletas.length} atletas</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="Meso - Endo" domain={[-6, 6]} tickCount={13} stroke="#64748b" fontSize={12} label={{ value: 'Mesomorfia →    ← Endomorfia', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#64748b' }} />
              <YAxis type="number" dataKey="y" name="2×Ecto - (Endo+Meso)" domain={[-8, 8]} tickCount={17} stroke="#64748b" fontSize={12} label={{ value: 'Ectomorfia ↑', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }} />
              <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="4 4" />
              <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />

              {/* Quadrant labels */}
              <text x="85%" y="12%" textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={600} opacity={0.35}>BALANCED ECTO</text>
              <text x="15%" y="12%" textAnchor="middle" fill="#10b981" fontSize={11} fontWeight={600} opacity={0.35}>ECTOMORPH</text>
              <text x="85%" y="88%" textAnchor="middle" fill="#ef4444" fontSize={11} fontWeight={600} opacity={0.35}>MESOMORPH</text>
              <text x="15%" y="88%" textAnchor="middle" fill="#f59e0b" fontSize={11} fontWeight={600} opacity={0.35}>ENDOMORPH</text>

              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const p = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg text-sm max-w-[200px]">
                        <p className="font-bold mb-1 text-slate-800">{p.nombre}</p>
                        {p.posicion && <p className="text-xs text-slate-500 mb-2">{p.posicion}</p>}
                        <p className="text-amber-600 text-xs">Endo: {p.endomorfia.toFixed(1)}</p>
                        <p className="text-blue-600 text-xs">Meso: {p.mesomorfia.toFixed(1)}</p>
                        <p className="text-emerald-600 text-xs">Ecto: {p.ectomorfia.toFixed(1)}</p>
                        <p className="text-slate-400 text-[10px] mt-1">({p.x.toFixed(1)}, {p.y.toFixed(1)})</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Scatter data={data} shape="circle">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#1e293b" strokeWidth={1} r={7} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {data.map((a, i) => (
            <div key={i} className="flex items-center gap-1 text-xs">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-slate-600">{a.nombre.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
