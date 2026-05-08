import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface CuadranteProps {
  masaMuscular: number;
  masaGrasa: number;
  imo: number;
  porcentajeGrasa: number;
}

export function CuadrantesHolway({ masaMuscular, masaGrasa, imo, porcentajeGrasa }: CuadranteProps) {
  const { t } = useTranslation();

  // Sistema de 6 cuadrantes de Francis Holway
  // Basado en: alto/bajo músculo vs alto/bajo grasa
  // + optimo/optimo como categoría central

  const umbralMusculoAlto = 35; // kg de masa muscular como referencia
  const umbralGrasaBaja = 10;   // % grasa como referencia
  const umbralGrasaAlta = 18;   // % grasa como referencia

  let cuadrante = '';
  let descripcion = '';
  let color = '';
  let recomendacion = '';

  if (porcentajeGrasa <= umbralGrasaBaja && masaMuscular >= umbralMusculoAlto) {
    cuadrante = t('cuadrantes.musculoAltoGrasaBaja') || 'MÚSCULO ALTO + GRASA BAJA';
    descripcion = t('cuadrantes.descMHGL');
    color = 'bg-emerald-100 text-[#050608] border-emerald-300';
    recomendacion = t('cuadrantes.recMHGL');
  } else if (porcentajeGrasa <= umbralGrasaBaja && masaMuscular < umbralMusculoAlto) {
    cuadrante = t('cuadrantes.musculoBajoGrasaBaja') || 'MÚSCULO BAJO + GRASA BAJA';
    descripcion = t('cuadrantes.descMBGL');
    color = 'bg-[#f59e0b]/10 text-[#f59e0b] border-amber-300';
    recomendacion = t('cuadrantes.recMBGL');
  } else if (porcentajeGrasa > umbralGrasaAlta && masaMuscular >= umbralMusculoAlto) {
    cuadrante = t('cuadrantes.musculoAltoGrasaAlta') || 'MÚSCULO ALTO + GRASA ALTA';
    descripcion = t('cuadrantes.descMHGH');
    color = 'bg-orange-100 text-orange-800 border-orange-300';
    recomendacion = t('cuadrantes.recMHGH');
  } else if (porcentajeGrasa > umbralGrasaAlta && masaMuscular < umbralMusculoAlto) {
    cuadrante = t('cuadrantes.musculoBajoGrasaAlta') || 'MÚSCULO BAJO + GRASA ALTA';
    descripcion = t('cuadrantes.descMBGH');
    color = 'bg-red-100 text-red-800 border-red-300';
    recomendacion = t('cuadrantes.recMBGH');
  } else {
    // Zona intermedia (óptimo/óptimo)
    cuadrante = t('cuadrantes.optimo') || 'COMPOSICIÓN ÓPTIMA';
    descripcion = t('cuadrantes.descOpt');
    color = 'bg-[#6366f1]/10 text-[#6366f1] border-blue-300';
    recomendacion = t('cuadrantes.recOpt');
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-6 rounded-xl border-2 ${color}`}>
          <h4 className="text-sm font-bold uppercase tracking-wide mb-2">{cuadrante}</h4>
          <p className="text-sm opacity-80 leading-relaxed">{descripcion}</p>
        </div>
        <div className="bg-[#0a0b0f] p-6 rounded-xl border">
          <h4 className="text-sm font-bold text-[#f0f0f5] uppercase tracking-wide mb-2">{t('cuadrantes.recomendacion')}</h4>
          <p className="text-sm text-[#8a8d9e] leading-relaxed">{recomendacion}</p>
        </div>
      </div>

      {/* Visualización de los 6 cuadrantes */}
      <div className="grid grid-cols-3 gap-3">
        <CuadranteCelda
          titulo={t('cuadrantes.musculoAltoGrasaBaja') || 'Muscle High\nFat Low'}
          activo={porcentajeGrasa <= umbralGrasaBaja && masaMuscular >= umbralMusculoAlto}
          colorBase="emerald"
          icono="🏆"
        />
        <CuadranteCelda
          titulo={t('cuadrantes.optimo') || 'Optimal\nOptimal'}
          activo={porcentajeGrasa > umbralGrasaBaja && porcentajeGrasa <= umbralGrasaAlta && masaMuscular >= umbralMusculoAlto * 0.8}
          colorBase="blue"
          icono="✓"
        />
        <CuadranteCelda
          titulo={t('cuadrantes.musculoAltoGrasaAlta') || 'Muscle High\nFat High'}
          activo={porcentajeGrasa > umbralGrasaAlta && masaMuscular >= umbralMusculoAlto}
          colorBase="orange"
          icono="⚡"
        />
        <CuadranteCelda
          titulo={t('cuadrantes.musculoBajoGrasaBaja') || 'Muscle Low\nFat Low'}
          activo={porcentajeGrasa <= umbralGrasaBaja && masaMuscular < umbralMusculoAlto}
          colorBase="amber"
          icono="📈"
        />
        <CuadranteCelda
          titulo={t('cuadrantes.neutro') || 'Neutral\nZone'}
          activo={porcentajeGrasa > umbralGrasaBaja && porcentajeGrasa <= umbralGrasaAlta && masaMuscular < umbralMusculoAlto * 0.8 && masaMuscular >= umbralMusculoAlto * 0.5}
          colorBase="slate"
          icono="○"
        />
        <CuadranteCelda
          titulo={t('cuadrantes.musculoBajoGrasaAlta') || 'Muscle Low\nFat High'}
          activo={porcentajeGrasa > umbralGrasaAlta && masaMuscular < umbralMusculoAlto}
          colorBase="red"
          icono="⚠"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-[#0a0b0f] rounded">
          <p className="text-xs text-[#8a8d9e]">IMO</p>
          <p className="text-xl font-bold">{imo.toFixed(2)}</p>
          <Badge variant="outline">motor/chassis</Badge>
        </div>
        <div className="p-3 bg-[#0a0b0f] rounded">
          <p className="text-xs text-[#8a8d9e]">Masa Muscular</p>
          <p className="text-xl font-bold">{masaMuscular.toFixed(1)} kg</p>
        </div>
        <div className="p-3 bg-[#0a0b0f] rounded">
          <p className="text-xs text-[#8a8d9e]">Masa Adiposa</p>
          <p className="text-xl font-bold">{masaGrasa.toFixed(1)} kg</p>
          <p className="text-xs text-[#55576b]">{porcentajeGrasa.toFixed(1)}% total</p>
        </div>
      </div>
    </div>
  );
}

function CuadranteCelda({ titulo, activo, colorBase, icono }: { titulo: string; activo: boolean; colorBase: string; icono: string }) {
  const baseClasses: Record<string, string> = {
    emerald: 'bg-[#22c55e]/10 border-[#D4FF00]/30 text-[#050608]',
    blue: 'bg-[#6366f1]/10 border-blue-200 text-[#6366f1]',
    orange: 'bg-[#f59e0b]/10 border-orange-200 text-orange-700',
    amber: 'bg-[#f59e0b]/10 border-amber-200 text-[#f59e0b]',
    slate: 'bg-[#0a0b0f] border-[#1e1f2e] text-[#8a8d9e]',
    red: 'bg-[#ef4444]/10 border-red-200 text-red-700',
  };

  return (
    <div className={`p-4 rounded-lg border-2 text-center transition-all ${
      activo ? `${baseClasses[colorBase]} ring-2 ring-offset-2 ring-${colorBase}-400 scale-105 shadow-lg` : 'bg-[#0a0b0f] border-[#1e1f2e] text-[#55576b] opacity-60'
    }`}>
      <div className="text-2xl mb-1">{icono}</div>
      <p className="text-xs font-semibold whitespace-pre-line">{titulo}</p>
      {activo && <Badge className="mt-2 bg-[#11121a]/80">ACTUAL</Badge>}
    </div>
  );
}
