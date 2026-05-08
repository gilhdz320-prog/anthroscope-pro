import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BookOpen, Plus, Trash2, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EntradaDiario {
  id: string;
  fecha: string;
  comida: string; // desayuno, colacion1, almuerzo, colacion2, cena
  alimento: string;
  cantidad: string;
  calorias: number;
  proteinas: number;
  carbs: number;
  grasas: number;
}

interface PlanActivo {
  caloriasDiarias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

const COMIDAS_LABELS: Record<string, string> = {
  desayuno: 'Desayuno',
  colacion1: 'Colación Matutina',
  almuerzo: 'Comida Principal',
  colacion2: 'Colación Vespertina',
  cena: 'Cena',
};

// Base de datos mínima de alimentos comunes para diario rápido
const ALIMENTOS_RAPIDO: { nombre: string; calorias: number; p: number; c: number; g: number; porcion: string }[] = [
  { nombre: 'Pechuga de pollo cocida', calorias: 165, p: 31, c: 0, g: 3.6, porcion: '100g' },
  { nombre: 'Arroz blanco cocido', calorias: 130, p: 2.7, c: 28, g: 0.3, porcion: '100g' },
  { nombre: 'Huevo entero', calorias: 70, p: 6, c: 0.6, g: 5, porcion: '1 pieza' },
  { nombre: 'Aguacate', calorias: 160, p: 2, c: 8.5, g: 15, porcion: '100g' },
  { nombre: 'Tortilla de maíz', calorias: 60, p: 1.5, c: 12, g: 0.8, porcion: '1 pieza' },
  { nombre: 'Frijoles cocidos', calorias: 140, p: 9, c: 26, g: 0.5, porcion: '100g' },
  { nombre: 'Leche descremada', calorias: 35, p: 3.4, c: 5, g: 0.1, porcion: '100ml' },
  { nombre: 'Plátano', calorias: 89, p: 1.1, c: 23, g: 0.3, porcion: '1 mediano' },
  { nombre: 'Avena cocida', calorias: 70, p: 2.5, c: 12, g: 1.2, porcion: '100g' },
  { nombre: 'Salmón cocido', calorias: 206, p: 22, c: 0, g: 12, porcion: '100g' },
  { nombre: 'Yogurt griego natural', calorias: 59, p: 10, c: 3.6, g: 0.4, porcion: '100g' },
  { nombre: 'Almendras', calorias: 575, p: 21, c: 22, g: 49, porcion: '100g' },
  { nombre: 'Papa cocida', calorias: 87, p: 1.9, c: 20, g: 0.1, porcion: '100g' },
  { nombre: 'Pan integral', calorias: 250, p: 8, c: 47, g: 3, porcion: '100g' },
  { nombre: 'Queso cottage bajo en grasa', calorias: 72, p: 12, c: 3, g: 1, porcion: '100g' },
  { nombre: 'Manzana', calorias: 52, p: 0.3, c: 14, g: 0.2, porcion: '1 pieza' },
  { nombre: 'Atún en agua', calorias: 116, p: 26, c: 0, g: 1, porcion: '100g' },
  { nombre: 'Brócoli cocido', calorias: 35, p: 2.4, c: 7, g: 0.4, porcion: '100g' },
  { nombre: 'Pasta cocida', calorias: 131, p: 5, c: 25, g: 1.1, porcion: '100g' },
  { nombre: 'Mantequilla de maní natural', calorias: 598, p: 22, c: 22, g: 50, porcion: '100g' },
];

function getDiario(cliente: string): EntradaDiario[] {
  try {
    const raw = localStorage.getItem(`anthroscope_diario_${cliente}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveDiario(cliente: string, entries: EntradaDiario[]) {
  localStorage.setItem(`anthroscope_diario_${cliente}`, JSON.stringify(entries));
}

function getPlanActivo(cliente: string): PlanActivo | null {
  try {
    const raw = localStorage.getItem('anthroscope_planes');
    if (!raw) return null;
    const planes = JSON.parse(raw);
    const plan = planes.find((p: any) => p.clienteNombre === cliente);
    return plan ? { caloriasDiarias: plan.caloriasDiarias, proteinas: plan.proteinas, carbohidratos: plan.carbohidratos, grasas: plan.grasas } : null;
  } catch { return null; }
}

function getHoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DiarioAlimentos({ cliente }: { cliente: string }) {
  const [entradas, setEntradas] = useState<EntradaDiario[]>([]);
  const [plan, setPlan] = useState<PlanActivo | null>(null);
  const [alimentoSel, setAlimentoSel] = useState('');
  const [cantidadNum, setCantidadNum] = useState(1);
  const [comidaSel, setComidaSel] = useState('desayuno');
  const [customCal, setCustomCal] = useState(0);
  const [customP, setCustomP] = useState(0);
  const [customC, setCustomC] = useState(0);
  const [customG, setCustomG] = useState(0);
  const [modoCustom, setModoCustom] = useState(false);

  useEffect(() => {
    setEntradas(getDiario(cliente));
    setPlan(getPlanActivo(cliente));
  }, [cliente]);

  const hoy = getHoy();
  const entradasHoy = entradas.filter(e => e.fecha === hoy);

  const totalesHoy = entradasHoy.reduce(
    (acc, e) => ({ cal: acc.cal + e.calorias, p: acc.p + e.proteinas, c: acc.c + e.carbs, g: acc.g + e.grasas }),
    { cal: 0, p: 0, c: 0, g: 0 }
  );

  const agregar = () => {
    if (!modoCustom && !alimentoSel) { toast.error('Selecciona un alimento'); return; }
    if (!modoCustom) {
      const alimento = ALIMENTOS_RAPIDO.find(a => a.nombre === alimentoSel);
      if (!alimento) return;
      const factor = cantidadNum;
      const nueva: EntradaDiario = {
        id: Date.now().toString(),
        fecha: hoy,
        comida: comidaSel,
        alimento: `${cantidadNum}x ${alimento.nombre} (${alimento.porcion})`,
        cantidad: `${cantidadNum}x`,
        calorias: Math.round(alimento.calorias * factor),
        proteinas: Math.round(alimento.p * factor),
        carbs: Math.round(alimento.c * factor),
        grasas: Math.round(alimento.g * factor),
      };
      const all = [...entradas, nueva];
      saveDiario(cliente, all);
      setEntradas(all);
      toast.success('Agregado al diario');
    } else {
      const nueva: EntradaDiario = {
        id: Date.now().toString(),
        fecha: hoy,
        comida: comidaSel,
        alimento: 'Alimento personalizado',
        cantidad: `${cantidadNum}x`,
        calorias: Math.round(customCal * cantidadNum),
        proteinas: Math.round(customP * cantidadNum),
        carbs: Math.round(customC * cantidadNum),
        grasas: Math.round(customG * cantidadNum),
      };
      const all = [...entradas, nueva];
      saveDiario(cliente, all);
      setEntradas(all);
      toast.success('Agregado personalizado');
    }
  };

  const eliminar = (id: string) => {
    const all = entradas.filter(e => e.id !== id);
    saveDiario(cliente, all);
    setEntradas(all);
  };

  const pctCal = plan ? Math.round((totalesHoy.cal / plan.caloriasDiarias) * 100) : 0;
  const pctP = plan ? Math.round((totalesHoy.p / plan.proteinas) * 100) : 0;
  const pctC = plan ? Math.round((totalesHoy.c / plan.carbohidratos) * 100) : 0;
  const pctG = plan ? Math.round((totalesHoy.g / plan.grasas) * 100) : 0;

  // Alertas de adherencia
  const alertas: string[] = [];
  if (plan) {
    if (pctCal > 120) alertas.push('Calorías excedidas más de 20%');
    if (pctCal < 60) alertas.push('Calorías muy por debajo del plan');
    if (pctP < 50) alertas.push('Proteínas muy bajas');
    if (pctC > 140) alertas.push('Carbohidratos excedidos');
  }

  return (
    <div className="space-y-4">
      {/* Resumen vs Plan */}
      {plan && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#D4FF00]" /> Mi Progreso Hoy vs Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {[
                { label: 'Calorías', pct: pctCal, actual: totalesHoy.cal, meta: plan.caloriasDiarias, color: 'bg-[#f59e0b]' },
                { label: 'Proteínas', pct: pctP, actual: totalesHoy.p, meta: plan.proteinas, color: 'bg-[#ef4444]' },
                { label: 'Carbs', pct: pctC, actual: totalesHoy.c, meta: plan.carbohidratos, color: 'bg-[#22c55e]' },
                { label: 'Grasas', pct: pctG, actual: totalesHoy.g, meta: plan.grasas, color: 'bg-[#6366f1]' },
              ].map(item => (
                <div key={item.label} className="bg-[#0a0b0f] rounded-lg p-2 border border-[#1e1f2e]">
                  <div className="flex justify-between text-[10px] text-[#8a8d9e] mb-1">
                    <span>{item.label}</span>
                    <span>{item.actual} / {item.meta}</span>
                  </div>
                  <div className="w-full h-2 bg-[#1e1f2e] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.min(item.pct, 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-right mt-0.5 text-[#f0f0f5] font-bold">{item.pct}%</p>
                </div>
              ))}
            </div>
            {alertas.length > 0 ? (
              <div className="space-y-1">
                {alertas.map((a, i) => (
                  <p key={i} className="text-xs text-[#f59e0b] flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {a}</p>
                ))}
              </div>
            ) : pctCal >= 80 && pctCal <= 110 ? (
              <p className="text-xs text-[#22c55e] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> ¡Excelente adherencia al plan!</p>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Agregar alimento */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#22c55e]" /> Registrar Comida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <select value={comidaSel} onChange={e => setComidaSel(e.target.value)} className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm">
              {Object.entries(COMIDAS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select value={alimentoSel} onChange={e => setAlimentoSel(e.target.value)} className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm md:col-span-2">
              <option value="">Seleccionar alimento...</option>
              {ALIMENTOS_RAPIDO.map(a => <option key={a.nombre} value={a.nombre}>{a.nombre} ({a.porcion}) — {a.calorias} kcal</option>)}
            </select>
            <Input type="number" min={0.5} step={0.5} value={cantidadNum} onChange={e => setCantidadNum(parseFloat(e.target.value) || 1)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" placeholder="Porciones" />
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setModoCustom(!modoCustom)} className="border-[#2e2f42] text-[#8a8d9e] text-xs">
              {modoCustom ? 'Usar lista rápida' : 'Agregar personalizado'}
            </Button>
            <Button size="sm" onClick={agregar} className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs">
              <Plus className="w-3 h-3 mr-1" /> Agregar
            </Button>
          </div>

          {modoCustom && (
            <div className="grid grid-cols-4 gap-2">
              <Input type="number" placeholder="kcal" value={customCal} onChange={e => setCustomCal(parseFloat(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" />
              <Input type="number" placeholder="Prot (g)" value={customP} onChange={e => setCustomP(parseFloat(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" />
              <Input type="number" placeholder="Carbs (g)" value={customC} onChange={e => setCustomC(parseFloat(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" />
              <Input type="number" placeholder="Grasa (g)" value={customG} onChange={e => setCustomG(parseFloat(e.target.value) || 0)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Entradas de hoy */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#6366f1]" /> Mi Diario de Hoy ({hoy})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {entradasHoy.length === 0 ? (
            <p className="text-xs text-[#8a8d9e] text-center py-4">No has registrado alimentos hoy</p>
          ) : (
            <div className="space-y-1">
              {(['desayuno', 'colacion1', 'almuerzo', 'colacion2', 'cena'] as const).map(tipo => {
                const items = entradasHoy.filter(e => e.comida === tipo);
                if (items.length === 0) return null;
                return (
                  <div key={tipo} className="border-b border-[#1e1f2e]/50 pb-2 mb-2">
                    <p className="text-[10px] font-bold text-[#D4FF00] uppercase mb-1">{COMIDAS_LABELS[tipo]}</p>
                    {items.map(e => (
                      <div key={e.id} className="flex justify-between items-center py-1">
                        <span className="text-xs text-[#f0f0f5]">{e.alimento} — {e.calorias} kcal</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#55576b]">P:{e.proteinas}g C:{e.carbs}g G:{e.grasas}g</span>
                          <Button size="sm" variant="ghost" onClick={() => eliminar(e.id)} className="h-6 w-6 p-0 text-[#ef4444]">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
