import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label,
} from 'recharts';

interface SomatocartaProps {
  endomorfia: number;
  mesomorfia: number;
  ectomorfia: number;
  nombre?: string;
}

export function Somatocarta({ endomorfia, mesomorfia, ectomorfia, nombre = 'Sujeto' }: SomatocartaProps) {
  // Coordenadas del somatotipo en el plano cartesiano
  // Sistema de Carter: X = Meso - Endo, Y = 2*Ecto - (Endo + Meso)
  const x = mesomorfia - endomorfia;
  const y = 2 * ectomorfia - (endomorfia + mesomorfia);

  const data = [{ x, y, nombre, endo: endomorfia, meso: mesomorfia, ecto: ectomorfia }];

  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="x"
            name="Meso - Endo"
            domain={[-6, 6]}
            tickCount={7}
            stroke="#64748b"
            fontSize={12}
          >
            <Label value="Mesomorfia →  Endomorfia ←" offset={0} position="insideBottom" fontSize={11} fill="#64748b" />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            name="2×Ecto - (Endo+Meso)"
            domain={[-8, 8]}
            tickCount={9}
            stroke="#64748b"
            fontSize={12}
          >
            <Label value="Ectomorfia ↑" angle={-90} position="insideLeft" fontSize={11} fill="#64748b" />
          </YAxis>

          <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="5 5" />
          <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="5 5" />

          {/* Cuadrantes etiquetados */}
          <text x="85%" y="15%" textAnchor="middle" fill="#3b82f6" fontSize={12} fontWeight={600} opacity={0.4}>
            BALANCED ECTOMORPH
          </text>
          <text x="15%" y="15%" textAnchor="middle" fill="#10b981" fontSize={12} fontWeight={600} opacity={0.4}>
            ECTOMORPH
          </text>
          <text x="85%" y="85%" textAnchor="middle" fill="#ef4444" fontSize={12} fontWeight={600} opacity={0.4}>
            MESOMORPH
          </text>
          <text x="15%" y="85%" textAnchor="middle" fill="#f59e0b" fontSize={12} fontWeight={600} opacity={0.4}>
            ENDOMORPH
          </text>

          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg text-sm">
                    <p className="font-bold mb-1">{p.nombre}</p>
                    <p className="text-amber-600">Endo: {p.endo.toFixed(1)}</p>
                    <p className="text-blue-600">Meso: {p.meso.toFixed(1)}</p>
                    <p className="text-emerald-600">Ecto: {p.ecto.toFixed(1)}</p>
                    <p className="text-slate-500 mt-1 text-xs">({p.x.toFixed(1)}, {p.y.toFixed(1)})</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Scatter
            name={nombre}
            data={data}
            fill="#ef4444"
            stroke="#991b1b"
            strokeWidth={2}
            shape="circle"
            r={8}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
