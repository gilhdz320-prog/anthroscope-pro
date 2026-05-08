import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  calcularSomatotipo,
  calcularCincoComponentes,
  calcularClasicos,
  calcularPhantom,
  calcularIndices,
} from '@/lib/calculations';
import type { PerfilRestringido, PerfilCompleto, Sujeto, ResultadoISAK } from '@/types/isak';
import { Calculator, Timer, Zap, QrCode, ClipboardCopy, RotateCcw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';

function calculateISAK(
  sujeto: Sujeto,
  perfilR: PerfilRestringido,
  perfilC: PerfilCompleto,
  nivel: number
): ResultadoISAK {
  const esCompleto = nivel >= 2;
  const perfil = esCompleto ? perfilC : perfilR;
  const indices = calcularIndices(perfilR, perfilR.estatura, perfilR.masaCorporal);
  const somatotipo = calcularSomatotipo(perfilR, sujeto.sexo);
  let cincoComponentes: ResultadoISAK['cincoComponentes'] = undefined;
  if (esCompleto) {
    try { cincoComponentes = calcularCincoComponentes(perfilC, perfilC.estatura, perfilC.masaCorporal, sujeto.sexo); }
    catch (e) { console.warn('5 componentes error:', e); }
  }
  const edad = sujeto.fechaNacimiento ? Math.floor((new Date().getTime() - new Date(sujeto.fechaNacimiento).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined;
  const clasicos = calcularClasicos(perfilR, perfilR.estatura, perfilR.masaCorporal, sujeto.sexo, edad);
  let phantom: ResultadoISAK['phantom'] = undefined;
  if (esCompleto) { try { phantom = calcularPhantom(perfilC, perfilC.estatura); } catch (e) { console.warn('Phantom error:', e); } }
  return { sujeto, perfil, nivel, esPerfilCompleto: esCompleto, somatotipo, cincoComponentes, clasicos, phantom, ...indices };
}

function emptyPerfilRestringido(): PerfilRestringido {
  return {
    masaCorporal: 0, estatura: 0, triceps: 0, subescapular: 0, biceps: 0,
    crestaIliaca: 0, supraespinal: 0, abdominal: 0, musloAnterior: 0, piernaMedial: 0,
    brazoRelajado: 0, brazoFlexionado: 0, cinturaMinima: 0, gluteoMaximo: 0, pantorrillaMaxima: 0,
  };
}

function emptyPerfilCompleto(): PerfilCompleto {
  return {
    ...emptyPerfilRestringido(),
    biacromial: 0, humeroBiepicondilar: 0, femurBicondilar: 0,
    toraxMesoesternal: 0, musloMedio: 0, antebrazoMaximo: 0,
    mano: 0, pie: 0, cabeza: 0, cuello: 0,
  };
}

function emptySujeto(): Sujeto {
  return {
    id: '', nombre: '', fechaNacimiento: '', fechaEvaluacion: new Date().toISOString().split('T')[0],
    sexo: 'masculino', deporte: '', notas: '', evaluador: '', organizacion: '',
  };
}

function generarId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function ModoCompetencia() {
  const [nombre, setNombre] = useState('');
  const [sexo, setSexo] = useState<'masculino' | 'femenino'>('masculino');
  const [medidas, setMedidas] = useState({
    masaCorporal: '', estatura: '', perimetroBrazoRelajado: '', pliegueTricipital: '', pliegueSubescapular: '', pliegueSupraespinal: '',
  });
  const [resultado, setResultado] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);
  const nombreRef = useRef<HTMLInputElement>(null);

  const handleCalcular = () => {
    if (!nombre || !medidas.masaCorporal || !medidas.estatura) {
      toast.error('Nombre, peso y estatura son obligatorios');
      return;
    }

    const sujeto: Sujeto = {
      ...emptySujeto(),
      id: generarId(),
      nombre,
      sexo,
      fechaEvaluacion: new Date().toISOString().split('T')[0],
    };

    const perfilR: PerfilRestringido = {
      ...emptyPerfilRestringido(),
      masaCorporal: parseFloat(medidas.masaCorporal),
      estatura: parseFloat(medidas.estatura),
      brazoRelajado: parseFloat(medidas.perimetroBrazoRelajado) || 0,
      triceps: parseFloat(medidas.pliegueTricipital) || 0,
      subescapular: parseFloat(medidas.pliegueSubescapular) || 0,
      supraespinal: parseFloat(medidas.pliegueSupraespinal) || 0,
    };

    const perfilC: PerfilCompleto = {
      ...emptyPerfilCompleto(),
      ...perfilR,
    };

    const res = calculateISAK(sujeto, perfilR, perfilC, 2);
    setResultado(res);
    
    // Guardar en localStorage para tracking
    const historial = JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');
    historial.push({ id: sujeto.id, fecha: sujeto.fechaEvaluacion, resultado: res });
    localStorage.setItem('anthroscope_evaluaciones', JSON.stringify(historial));
    
    toast.success('Evaluación completada en modo competencia');
  };

  const handleNuevo = () => {
    setNombre('');
    setMedidas({ masaCorporal: '', estatura: '', perimetroBrazoRelajado: '', pliegueTricipital: '', pliegueSubescapular: '', pliegueSupraespinal: '' });
    setResultado(null);
    setShowQR(false);
    nombreRef.current?.focus();
  };

  const copySummary = () => {
    if (!resultado) return;
    const text = `${resultado.sujeto.nombre} — ${resultado.sujeto.fechaEvaluacion}
Peso: ${resultado.perfil.masaCorporal}kg | Estatura: ${resultado.perfil.estatura}cm
IMC: ${resultado.imc} | %Grasa: ${resultado.siriPorcentajeGrasa?.toFixed(1)}%
IMO: ${resultado.cincoComponentes?.indiceMusculoOseo?.toFixed(2)}
Masa Muscular: ${resultado.cincoComponentes?.masaMuscular?.toFixed(1)}kg
Somatotipo: ${resultado.somatotipo?.endomorfia?.toFixed(1)}-${resultado.somatotipo?.mesomorfia?.toFixed(1)}-${resultado.somatotipo?.ectomorfia?.toFixed(1)}`;
    navigator.clipboard.writeText(text);
    toast.success('Resumen copiado al portapapeles');
  };

  const qrUrl = resultado ? `https://anthroscope.pro/shared/${resultado.sujeto.id}` : '';

  return (
    <div className="space-y-6">
      {/* Header modo competencia */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4FF00] p-2 rounded-lg">
            <Zap className="w-5 h-5 text-[#050608]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#f0f0f5]">Modo Competencia</h2>
            <p className="text-xs text-[#55576b]">Solo 5 mediciones. Resultado en 10 segundos.</p>
          </div>
        </div>
        <Badge variant="outline" className="border-[#D4FF00]/50 text-[#D4FF00] bg-[#D4FF00]/10">
          <Timer className="w-3 h-3 mr-1" /> Rápido
        </Badge>
      </div>

      {/* Formulario simplificado */}
      {!resultado ? (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                ref={nombreRef}
                placeholder="Nombre del atleta"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 text-lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setSexo('masculino')}
                  className={`flex-1 h-12 rounded-lg border-2 font-medium transition-all ${sexo === 'masculino' ? 'border-[#D4FF00] bg-[#D4FF00]/10 text-[#D4FF00]' : 'border-[#1e1f2e] text-[#55576b]'}`}
                >
                  Hombre
                </button>
                <button
                  onClick={() => setSexo('femenino')}
                  className={`flex-1 h-12 rounded-lg border-2 font-medium transition-all ${sexo === 'femenino' ? 'border-[#D4FF00] bg-[#D4FF00]/10 text-[#D4FF00]' : 'border-[#1e1f2e] text-[#55576b]'}`}
                >
                  Mujer
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-[#8a8d9e] mb-1 block">Peso (kg) *</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="78.5"
                  value={medidas.masaCorporal}
                  onChange={e => setMedidas({ ...medidas, masaCorporal: e.target.value })}
                  className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 font-mono text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-[#8a8d9e] mb-1 block">Estatura (cm) *</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="178.2"
                  value={medidas.estatura}
                  onChange={e => setMedidas({ ...medidas, estatura: e.target.value })}
                  className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 font-mono text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-[#8a8d9e] mb-1 block">Brazo relajado (cm)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="32.5"
                  value={medidas.perimetroBrazoRelajado}
                  onChange={e => setMedidas({ ...medidas, perimetroBrazoRelajado: e.target.value })}
                  className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 font-mono text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-[#8a8d9e] mb-1 block">Tricipital (mm)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="8.2"
                  value={medidas.pliegueTricipital}
                  onChange={e => setMedidas({ ...medidas, pliegueTricipital: e.target.value })}
                  className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 font-mono text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-[#8a8d9e] mb-1 block">Subescapular (mm)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="10.5"
                  value={medidas.pliegueSubescapular}
                  onChange={e => setMedidas({ ...medidas, pliegueSubescapular: e.target.value })}
                  className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 font-mono text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-[#8a8d9e] mb-1 block">Supraespinal (mm)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="12.8"
                  value={medidas.pliegueSupraespinal}
                  onChange={e => setMedidas({ ...medidas, pliegueSupraespinal: e.target.value })}
                  className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] h-12 font-mono text-lg"
                />
              </div>
            </div>

            <Button
              className="w-full h-14 bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] font-bold text-lg"
              onClick={handleCalcular}
            >
              <Calculator className="w-5 h-5 mr-2" /> Calcular Ahora
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Resultado rápido */
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#f0f0f5]">{resultado.sujeto.nombre}</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copySummary} className="border-[#2e2f42] text-[#8a8d9e] hover:text-[#D4FF00]">
                  <ClipboardCopy className="w-4 h-4 mr-1" /> Copiar
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowQR(!showQR)} className="border-[#2e2f42] text-[#8a8d9e] hover:text-[#D4FF00]">
                  <QrCode className="w-4 h-4 mr-1" /> QR
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">% Grasa</p>
                <p className="text-2xl font-bold text-[#D4FF00] font-mono">{resultado.siriPorcentajeGrasa?.toFixed(1)}%</p>
              </div>
              <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">IMO</p>
                <p className="text-2xl font-bold text-[#D4FF00] font-mono">{resultado.cincoComponentes?.indiceMusculoOseo?.toFixed(2)}</p>
              </div>
              <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">Masa Muscular</p>
                <p className="text-2xl font-bold text-[#6366f1] font-mono">{resultado.cincoComponentes?.masaMuscular?.toFixed(1)}<span className="text-sm">kg</span></p>
              </div>
              <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">Somatotipo</p>
                <p className="text-xl font-bold text-[#f0f0f5] font-mono">{resultado.somatotipo?.endomorfia?.toFixed(1)}-{resultado.somatotipo?.mesomorfia?.toFixed(1)}-{resultado.somatotipo?.ectomorfia?.toFixed(1)}</p>
              </div>
            </div>

            {showQR && (
              <div className="flex flex-col items-center gap-3 p-4 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <QRCodeSVG value={qrUrl} size={180} bgColor="#0a0b0f" fgColor="#D4FF00" />
                <p className="text-xs text-[#8a8d9e]">Escanea para ver el reporte completo</p>
              </div>
            )}

            <Button
              className="w-full h-12 bg-[#1e1f2e] hover:bg-[#2e2f42] text-[#f0f0f5] font-semibold"
              onClick={handleNuevo}
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Nuevo Atleta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
