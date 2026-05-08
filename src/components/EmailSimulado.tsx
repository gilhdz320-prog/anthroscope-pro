import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Mail, Send, Smartphone, Copy, CheckCircle } from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';

interface Props {
  resultado: ResultadoISAK;
}

export function EmailSimulado({ resultado }: Props) {
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const { sujeto, imc, siriPorcentajeGrasa, indicePonderal, cincoComponentes, somatotipo } = resultado;
  const st = somatotipo;
  const cc = cincoComponentes;

  const asunto = `Tu evaluación ISAK — ${sujeto.nombre}`;
  const cuerpo = `Hola ${sujeto.nombre},

Tu evaluación antropométrica ha sido completada. Aquí tus resultados:

📊 INDICES:
• IMC: ${imc}
• % Grasa (Siri): ${siriPorcentajeGrasa}%
• Índice Ponderal: ${indicePonderal}
• IMO: ${cc?.indiceMusculoOseo?.toFixed(2) || 'N/A'}

🧬 COMPOSICION CORPORAL:
• Masa Muscular: ${cc?.masaMuscular?.toFixed(1) || 'N/A'} kg (${cc?.porcentajeMuscular?.toFixed(1) || 'N/A'}%)
• Masa Adiposa: ${cc?.masaAdiposa?.toFixed(1) || 'N/A'} kg (${cc?.porcentajeAdiposo?.toFixed(1) || 'N/A'}%)
• Masa Ósea: ${cc?.masaOsea?.toFixed(1) || 'N/A'} kg (${cc?.porcentajeOseo?.toFixed(1) || 'N/A'}%)

🏷️ SOMATOTIPO: ${st?.categoria || 'N/A'} (Endo ${st?.endomorfia?.toFixed(1) || 'N/A'} / Meso ${st?.mesomorfia?.toFixed(1) || 'N/A'} / Ecto ${st?.ectomorfia?.toFixed(1) || 'N/A'})

📅 Evaluación: ${sujeto.fechaEvaluacion}
🎓 Protocolo ISAK Nivel ${resultado.nivel}

---
ANTHROSCOPE PRO — antroscope.pro
Sistema profesional de antropometría ISAK`;

  const simularEnvio = () => {
    setEnviado(true);
    toast.success(`Email simulado enviado a ${sujeto.nombre}`);
    setTimeout(() => setEnviado(false), 3000);
  };

  const copiarTexto = () => {
    navigator.clipboard.writeText(cuerpo);
    setCopiado(true);
    toast.success('Texto copiado al portapapeles');
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <Card className="bg-[#11121a] border-[#1e1f2e]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#f0f0f5]">
          <Mail className="w-5 h-5 text-[#6366f1]" />
          Reporte por Email
          <Badge className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20 text-xs">Simulado</Badge>
        </CardTitle>
        <p className="text-xs text-[#8a8d9e]">
          En PRO/TEAM se envía automáticamente al atleta. Aquí puedes copiar el texto.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-[#8a8d9e]">
          <span className="font-medium text-[#f0f0f5]">Para:</span>
          <span className="bg-[#0a0b0f] px-2 py-1 rounded text-[#f0f0f5]">{sujeto.nombre} &lt;atleta@ejemplo.com&gt;</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#8a8d9e]">
          <span className="font-medium text-[#f0f0f5]">Asunto:</span>
          <span className="text-[#f0f0f5]">{asunto}</span>
        </div>

        <div className="bg-[#0a0b0f] border border-[#1e1f2e] rounded-lg p-3 max-h-48 overflow-y-auto">
          <pre className="text-xs text-[#8a8d9e] whitespace-pre-wrap font-mono">{cuerpo}</pre>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#2e2f42] text-[#8a8d9e]"
            onClick={copiarTexto}
          >
            {copiado ? <CheckCircle className="w-4 h-4 mr-1 text-[#22c55e]" /> : <Copy className="w-4 h-4 mr-1" />}
            {copiado ? 'Copiado' : 'Copiar texto'}
          </Button>
          <Button
            size="sm"
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white"
            onClick={simularEnvio}
          >
            {enviado ? <CheckCircle className="w-4 h-4 mr-1" /> : <Send className="w-4 h-4 mr-1" />}
            {enviado ? 'Enviado' : 'Simular envío'}
          </Button>
        </div>

        <p className="text-[10px] text-[#55576b] flex items-center gap-1">
          <Smartphone className="w-3 h-3" />
          En tier PRO/TEAM: envío real por SMTP configurado
        </p>
      </CardContent>
    </Card>
  );
}
