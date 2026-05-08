import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'cal1', label: 'Calíper calibrado (plumilla en 0)', done: false },
  { id: 'cal2', label: 'Balanza calibrada (peso de referencia)', done: false },
  { id: 'temp', label: 'Temperatura ambiente 20-25°C', done: false },
  { id: 'ayuno', label: 'Sujeto ayunado ≥3 horas', done: false },
  { id: 'higiene', label: 'Sujeto sin crema/loción en piel', done: false },
  { id: 'marcado', label: 'Puntos anatómicos marcados correctamente', done: false },
  { id: 'reposo', label: 'Sujeto en reposo ≥15 min antes de medir', done: false },
  { id: 'vestimenta', label: 'Vestimenta mínima, calzado ligero', done: false },
];

export function ChecklistISAK({ onComplete }: { onComplete?: (items: ChecklistItem[]) => void }) {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('anthroscope_checklist');
    return saved ? JSON.parse(saved) : CHECKLIST_ITEMS;
  });
  const [notes, setNotes] = useState(() => localStorage.getItem('anthroscope_checklist_notes') || '');

  const toggle = (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, done: !i.done } : i);
    setItems(updated);
    localStorage.setItem('anthroscope_checklist', JSON.stringify(updated));
    if (onComplete) onComplete(updated);
  };

  const allDone = items.every(i => i.done);
  const percent = Math.round((items.filter(i => i.done).length / items.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#f0f0f5] flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#D4FF00]" />
          Checklist ISAK Pre-Evaluación
        </h3>
        <Badge className={allDone ? 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30' : 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30'}>
          {percent}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
              item.done
                ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]'
                : 'bg-[#0a0b0f] border-[#1e1f2e] text-[#8a8d9e] hover:border-[#2e2f42]'
            }`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              item.done ? 'bg-[#22c55e] border-[#22c55e]' : 'border-[#55576b]'
            }`}>
              {item.done && <CheckCircle className="w-3.5 h-3.5 text-[#050608]" />}
            </div>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-[#8a8d9e]">Notas de sesión (aparecerán en el reporte PDF)</Label>
        <Textarea
          value={notes}
          onChange={e => { setNotes(e.target.value); localStorage.setItem('anthroscope_checklist_notes', e.target.value); }}
          placeholder="Condiciones especiales, observaciones del sujeto, problemas con mediciones..."
          className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] placeholder:text-[#55576b] min-h-[80px]"
        />
      </div>

      {!allDone && (
        <p className="text-xs text-[#f59e0b]">
          ⚠️ Completa todo el checklist para cumplir con protocolo ISAK Nivel 4
        </p>
      )}
    </div>
  );
}

export function FotosProgreso({ sujetoId }: { sujetoId: string }) {
  const key = `anthroscope_fotos_${sujetoId}`;
  const [fotos, setFotos] = useState<string[]>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fotos.length >= 3) {
      toast.error('Máximo 3 fotos por evaluación');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const updated = [...fotos, base64];
      setFotos(updated);
      localStorage.setItem(key, JSON.stringify(updated));
      toast.success('Foto guardada');
    };
    reader.readAsDataURL(file);
  };

  const remove = (idx: number) => {
    const updated = fotos.filter((_, i) => i !== idx);
    setFotos(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-[#f0f0f5] flex items-center gap-2">
        <Camera className="w-4 h-4 text-[#D4FF00]" />
        Fotos de Progreso (máx 3)
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {fotos.map((foto, i) => (
          <div key={i} className="relative aspect-[3/4] bg-[#0a0b0f] rounded-lg border border-[#1e1f2e] overflow-hidden">
            <img src={foto} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => remove(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-[#ef4444] rounded-full flex items-center justify-center text-white"
            >
              <X className="w-3 h-3" />
            </button>
            <span className="absolute bottom-1 left-1 text-[10px] text-white bg-black/50 px-1 rounded">
              {['Frontal', 'Lateral', 'Trasera'][i] || `Foto ${i + 1}`}
            </span>
          </div>
        ))}
        {fotos.length < 3 && (
          <label className="aspect-[3/4] bg-[#0a0b0f] border border-dashed border-[#2e2f42] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#D4FF00] transition-colors">
            <Camera className="w-6 h-6 text-[#55576b] mb-1" />
            <span className="text-xs text-[#55576b]">Agregar foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        )}
      </div>
    </div>
  );
}

export function CalculadoraObjetivos({
  imoActual,
  imoMaximo,
  masaMuscular,
  masaGrasa,
  sexo,
}: {
  imoActual: number;
  imoMaximo: number;
  masaMuscular: number;
  masaGrasa: number;
  sexo: string;
}) {
  const [objetivoIMO, setObjetivoIMO] = useState(imoMaximo);
  const difIMO = objetivoIMO - imoActual;
  const kgMusculoNecesario = difIMO > 0 ? difIMO * 5 : 0;
  const semanasEstimadas = kgMusculoNecesario > 0 ? Math.ceil(kgMusculoNecesario / 0.25) : 0;

  return (
    <Card className="bg-[#11121a] border-[#1e1f2e]">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#f0f0f5] flex items-center gap-2">
          <Target className="w-5 h-5 text-[#D4FF00]" />
          Calculadora de Objetivos
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
            <p className="text-xs text-[#8a8d9e]">IMO Actual</p>
            <p className="text-xl font-bold text-[#f0f0f5]">{imoActual.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
            <p className="text-xs text-[#8a8d9e]">Techo Genético ({sexo === 'masculino' ? '5.5' : '5.1'})</p>
            <p className="text-xl font-bold text-[#D4FF00]">{imoMaximo.toFixed(2)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#8a8d9e]">IMO objetivo:</Label>
          <Input
            type="number"
            step="0.1"
            value={objetivoIMO}
            onChange={e => setObjetivoIMO(parseFloat(e.target.value))}
            className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]"
          />
        </div>

        {difIMO > 0 && (
          <div className="p-4 bg-[#D4FF00]/5 border border-[#D4FF00]/20 rounded-lg">
            <p className="text-sm text-[#f0f0f5] mb-2">
              Para llegar a IMO <span className="text-[#D4FF00] font-bold">{objetivoIMO.toFixed(2)}</span> necesitas:
            </p>
            <ul className="space-y-1 text-sm text-[#8a8d9e]">
              <li>• Ganar ~<span className="text-[#D4FF00] font-bold">{kgMusculoNecesario.toFixed(1)} kg</span> de masa muscular</li>
              <li>• Timeline estimado: <span className="text-[#D4FF00] font-bold">~{semanasEstimadas} semanas</span> (0.25kg/semana)</li>
              <li>• Superávit calórico recomendado: <span className="text-[#D4FF00] font-bold">+300 a +500 kcal/día</span></li>
              <li>• Proteína objetivo: <span className="text-[#D4FF00] font-bold">2.0-2.2g/kg</span></li>
            </ul>
          </div>
        )}

        {difIMO <= 0 && (
          <p className="text-sm text-[#22c55e]">
            ✅ ¡Ya estás en o cerca de tu techo genético! Mantén composición actual.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Helper import
import { Target } from 'lucide-react';
