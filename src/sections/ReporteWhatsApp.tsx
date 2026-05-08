import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Share2, Smartphone, User, Scale, Target, Dna, TrendingUp, Zap } from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';

interface Props {
  resultado: ResultadoISAK;
}

export function ReporteWhatsApp({ resultado }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generando, setGenerando] = useState(false);

  const generarImagen = async () => {
    if (!cardRef.current) return;
    setGenerando(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#050608',
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `ANTHROSCOPE_${resultado.sujeto.nombre}_resumen.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Imagen descargada — lista para WhatsApp');
    } catch (e) {
      toast.error('Error al generar imagen');
    }
    setGenerando(false);
  };

  const { sujeto, somatotipo, cincoComponentes, imc, siriPorcentajeGrasa, indicePonderal, suma6Pliegues } = resultado;
  const st = somatotipo;
  const cc = cincoComponentes;

  // Colores del somatotipo
  const stColor = st?.categoria?.includes('Endo') ? '#f59e0b' : st?.categoria?.includes('Meso') ? '#ef4444' : '#22c55e';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#f0f0f5]">Reporte para WhatsApp</h3>
          <p className="text-xs text-[#8a8d9e]">Genera una tarjeta 9:16 para compartir con el atleta</p>
        </div>
        <Button
          onClick={generarImagen}
          disabled={generando}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white"
        >
          <Share2 className="w-4 h-4 mr-2" />
          {generando ? 'Generando...' : 'Descargar PNG'}
        </Button>
      </div>

      {/* Preview de la tarjeta */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          style={{ width: 360, height: 640, background: '#050608' }}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
        >
          {/* Header con degradado */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#D4FF00]/20 to-transparent" />
          
          {/* Logo marca */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#D4FF00]" />
            <span className="text-xs font-bold text-[#D4FF00] tracking-wider">ANTHROSCOPE</span>
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 pt-16 px-6">
            {/* Nombre y fecha */}
            <div className="text-center mb-6">
              <User className="w-8 h-8 text-[#D4FF00] mx-auto mb-2" />
              <h2 className="text-xl font-bold text-[#f0f0f5] leading-tight">{sujeto.nombre}</h2>
              <p className="text-xs text-[#8a8d9e] mt-1">{sujeto.fechaEvaluacion} · {sujeto.deporte || 'Evaluación ISAK'}</p>
            </div>

            {/* KPIs principales */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#11121a]/80 border border-[#1e1f2e] rounded-xl p-3 text-center">
                <Scale className="w-4 h-4 text-[#D4FF00] mx-auto mb-1" />
                <p className="text-lg font-bold text-[#f0f0f5]">{imc}</p>
                <p className="text-[10px] text-[#8a8d9e] uppercase">IMC</p>
              </div>
              <div className="bg-[#11121a]/80 border border-[#1e1f2e] rounded-xl p-3 text-center">
                <Target className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
                <p className="text-lg font-bold text-[#f0f0f5]">{siriPorcentajeGrasa}%</p>
                <p className="text-[10px] text-[#8a8d9e] uppercase">% Grasa</p>
              </div>
              <div className="bg-[#11121a]/80 border border-[#1e1f2e] rounded-xl p-3 text-center">
                <TrendingUp className="w-4 h-4 text-[#6366f1] mx-auto mb-1" />
                <p className="text-lg font-bold text-[#f0f0f5]">{indicePonderal}</p>
                <p className="text-[10px] text-[#8a8d9e] uppercase">IPonderal</p>
              </div>
              <div className="bg-[#11121a]/80 border border-[#1e1f2e] rounded-xl p-3 text-center">
                <Dna className="w-4 h-4 text-[#a78bfa] mx-auto mb-1" />
                <p className="text-lg font-bold text-[#f0f0f5]">{suma6Pliegues}</p>
                <p className="text-[10px] text-[#8a8d9e] uppercase">∑6 pliegues</p>
              </div>
            </div>

            {/* Somatotipo */}
            {st && (
              <div className="bg-[#11121a]/80 border border-[#1e1f2e] rounded-xl p-4 mb-4">
                <p className="text-[10px] text-[#8a8d9e] uppercase text-center mb-2">Somatotipo</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className="text-sm font-bold px-3 py-1" style={{ background: stColor + '20', color: stColor, borderColor: stColor + '40' }}>
                    {st.categoria}
                  </Badge>
                </div>
                <div className="flex justify-center gap-4 text-xs">
                  <span className="text-[#f59e0b]">Endo {st.endomorfia.toFixed(1)}</span>
                  <span className="text-[#ef4444]">Meso {st.mesomorfia.toFixed(1)}</span>
                  <span className="text-[#22c55e]">Ecto {st.ectomorfia.toFixed(1)}</span>
                </div>
              </div>
            )}

            {/* Composición corporal */}
            {cc && (
              <div className="bg-[#11121a]/80 border border-[#1e1f2e] rounded-xl p-4 mb-4">
                <p className="text-[10px] text-[#8a8d9e] uppercase text-center mb-3">Composición Corporal</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6366f1]">● Muscular</span>
                    <span className="text-[#f0f0f5] font-mono">{cc.masaMuscular.toFixed(1)} kg ({cc.porcentajeMuscular.toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#f59e0b]">● Adiposa</span>
                    <span className="text-[#f0f0f5] font-mono">{cc.masaAdiposa.toFixed(1)} kg ({cc.porcentajeAdiposo.toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a78bfa]">● Ósea</span>
                    <span className="text-[#f0f0f5] font-mono">{cc.masaOsea.toFixed(1)} kg ({cc.porcentajeOseo.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-[#1e1f2e] flex justify-between text-xs">
                  <span className="text-[#22c55e]">● IMO</span>
                  <span className="text-[#f0f0f5] font-bold font-mono">{cc.indiceMusculoOseo.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-[10px] text-[#55576b]">Evaluación ISAK Nivel {resultado.nivel}</p>
              <p className="text-[9px] text-[#3a3b4e]">anthroscope.pro</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-[#55576b]">
        <Smartphone className="w-3 h-3 inline mr-1" />
        La imagen se guarda en tu dispositivo. Ábrela y compártela por WhatsApp.
      </p>
    </div>
  );
}
