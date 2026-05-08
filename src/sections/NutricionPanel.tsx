import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Apple, Beef, Carrot, ChefHat, Droplets, Flame,
  Calculator, Save, ChevronDown, ChevronUp, User, Target
} from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';

interface PlanAlimentario {
  id: string;
  clienteNombre: string;
  fecha: string;
  objetivo: 'perdida_grasa' | 'mantenimiento' | 'ganancia_muscular' | 'rendimiento';
  caloriasDiarias: number;
  proteinas: number; // gramos
  carbohidratos: number;
  grasas: number;
  fibra: number;
  agua: number; // litros
  comidas: Comida[];
}

interface Comida {
  nombre: string;
  horario: string;
  alimentos: AlimentoPorcion[];
  calorias: number;
  proteinas: number;
  carbs: number;
  grasas: number;
}

interface AlimentoPorcion {
  alimento: string;
  cantidad: string;
  proteina: number;
  carbs: number;
  grasa: number;
  calorias: number;
  icono: string;
}

function getResultadosStorage(): ResultadoISAK[] {
  try {
    const raw = localStorage.getItem('anthroscope_evaluaciones');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((e: any) => e.resultado).filter(Boolean) : [];
  } catch { return []; }
}

function getClientesUnicos(): string[] {
  const resultados = getResultadosStorage();
  return [...new Set(resultados.map(r => r.sujeto?.nombre).filter(Boolean))];
}

function getUltimoResultado(nombre: string): ResultadoISAK | null {
  const resultados = getResultadosStorage()
    .filter(r => r.sujeto?.nombre === nombre)
    .sort((a, b) => new Date(b.sujeto?.fechaEvaluacion || '').getTime() - new Date(a.sujeto?.fechaEvaluacion || '').getTime());
  return resultados[0] || null;
}

function calcularNecesidades(resultado: ResultadoISAK, objetivo: PlanAlimentario['objetivo']) {
  const { masaCorporal, estatura } = resultado.perfil;
  const sexo = resultado.sujeto.sexo;
  const edad = resultado.sujeto.edad || 25;
  const deporte = resultado.sujeto.deporte || '';
  const cc = resultado.cincoComponentes;
  const siri = resultado.siriPorcentajeGrasa || 20;

  // Masa magra en kg (no usar peso total)
  const masaGrasa = masaCorporal * (siri / 100);
  const masaMagra = masaCorporal - masaGrasa;

  // TMB basada en masa magra (Katch-McArdle más preciso para atletas)
  const tmb = 370 + (21.6 * masaMagra);

  // Factor de actividad basado en deporte
  const factoresActividad: Record<string, number> = {
    'futbol': 1.725, 'futbol americano': 1.725, 'rugby': 1.725,
    'basquetbol': 1.725, 'voleibol': 1.55, 'tenis': 1.725,
    'atletismo': 1.9, 'natacion': 1.9, 'ciclismo': 1.9,
    'halterofilia': 1.55, 'crossfit': 1.725, 'gimnasio': 1.55,
    'boxeo': 1.725, 'mma': 1.725, 'judo': 1.725,
    'golf': 1.375, 'default': 1.55
  };
  const factor = factoresActividad[deporte.toLowerCase()] || factoresActividad['default'];
  const gastoEnergetico = tmb * factor;

  // Ajuste por objetivo
  let calorias = gastoEnergetico;
  switch (objetivo) {
    case 'perdida_grasa': calorias *= 0.85; break;
    case 'ganancia_muscular': calorias *= 1.1; break;
    case 'rendimiento': calorias *= 1.05; break;
    default: break;
  }

  // Distribución de macros basada en composición corporal
  let proteinas: number, carbohidratos: number, grasas: number;

  if (siri > 25) {
    // Alto % grasa: más proteína, menos carbs
    proteinas = masaMagra * 2.4;
    grasas = (calorias * 0.30) / 9;
    carbohidratos = (calorias - (proteinas * 4) - (grasas * 9)) / 4;
  } else if (siri < 10) {
    // Muy bajo % grasa: más carbs para rendimiento
    proteinas = masaMagra * 2.0;
    carbohidratos = (calorias * 0.55) / 4;
    grasas = (calorias - (proteinas * 4) - (carbohidratos * 4)) / 9;
  } else {
    // Óptimo: balanceado
    proteinas = masaMagra * 2.2;
    carbohidratos = (calorias * 0.45) / 4;
    grasas = (calorias - (proteinas * 4) - (carbohidratos * 4)) / 9;
  }

  // Ajuste por IMO
  const imo = cc?.indiceMusculoOseo || 3.5;
  if (imo < 3.0 && objetivo === 'ganancia_muscular') {
    proteinas *= 1.15; // Más proteína para ganar músculo
  }

  // Ajuste por sexo
  if (sexo === 'femenino') {
    grasas = Math.max(grasas, (calorias * 0.30) / 9); // Mínimo 30% grasa para hormonal
  }

  return {
    calorias: Math.round(calorias),
    proteinas: Math.round(proteinas),
    carbohidratos: Math.round(Math.max(carbohidratos, 80)),
    grasas: Math.round(Math.max(grasas, 40)),
    fibra: Math.round((carbohidratos * 0.14)),
    agua: Math.round(masaCorporal * 0.035 * 10) / 10,
    masaMagra: Math.round(masaMagra * 10) / 10,
    tmb: Math.round(tmb),
  };
}

function generarComidas(objetivo: PlanAlimentario['objetivo'], macros: any): Comida[] {
  const { proteinas, carbohidratos, grasas } = macros;
  const pPorComida = Math.round(proteinas / 5);
  const cPorComida = Math.round(carbohidratos / 5);
  const gPorComida = Math.round(grasas / 5);

  const comidasBase: Omit<Comida, 'alimentos' | 'calorias' | 'proteinas' | 'carbs' | 'grasas'>[] = [
    { nombre: 'Desayuno', horario: '7:00 - 8:00' },
    { nombre: 'Colación Matutina', horario: '10:00 - 10:30' },
    { nombre: 'Comida Principal', horario: '13:00 - 14:30' },
    { nombre: 'Colación Vespertina', horario: '16:00 - 17:00' },
    { nombre: 'Cena', horario: '19:30 - 20:30' },
  ];

  // Banco de alimentos con porciones
  const proteins: AlimentoPorcion[] = [
    { alimento: 'Pechuga de pollo', cantidad: '150g', proteina: 31, carbs: 0, grasa: 3.6, calorias: 165, icono: '🍗' },
    { alimento: 'Filete de res magro', cantidad: '150g', proteina: 36, carbs: 0, grasa: 9, calorias: 243, icono: '🥩' },
    { alimento: 'Salmón', cantidad: '150g', proteina: 30, carbs: 0, grasa: 13, calorias: 267, icono: '🐟' },
    { alimento: 'Atún en agua', cantidad: '1 lata (140g)', proteina: 32, carbs: 0, grasa: 1, calorias: 140, icono: '🐟' },
    { alimento: 'Huevos enteros', cantidad: '3 huevos', proteina: 18, carbs: 1.2, grasa: 15, calorias: 215, icono: '🥚' },
    { alimento: 'Claras de huevo', cantidad: '5 claras', proteina: 18, carbs: 1, grasa: 0.5, calorias: 85, icono: '🥚' },
    { alimento: 'Cottage cheese bajo en grasa', cantidad: '200g', proteina: 24, carbs: 6, grasa: 3, calorias: 163, icono: '🧀' },
    { alimento: 'Pechuga de pavo', cantidad: '150g', proteina: 34, carbs: 0, grasa: 2, calorias: 165, icono: '🍗' },
  ];

  const carbs: AlimentoPorcion[] = [
    { alimento: 'Arroz blanco cocido', cantidad: '1 taza (200g)', proteina: 4, carbs: 45, grasa: 0.5, calorias: 205, icono: '🍚' },
    { alimento: 'Avena cocida', cantidad: '1 taza (250g)', proteina: 6, carbs: 54, grasa: 5, calorias: 333, icono: '🌾' },
    { alimento: 'Papa cocida', cantidad: '2 medianas (300g)', proteina: 4, carbs: 51, grasa: 0.2, calorias: 222, icono: '🥔' },
    { alimento: 'Pasta cocida', cantidad: '1 taza (200g)', proteina: 7, carbs: 50, grasa: 1, calorias: 250, icono: '🍝' },
    { alimento: 'Pan integral', cantidad: '2 rebanadas', proteina: 8, carbs: 30, grasa: 2, calorias: 180, icono: '🍞' },
    { alimento: 'Tortilla de maíz', cantidad: '3 piezas', proteina: 3, carbs: 30, grasa: 1.5, calorias: 150, icono: '🌮' },
    { alimento: 'Quinoa cocida', cantidad: '1 taza (200g)', proteina: 8, carbs: 39, grasa: 3.5, calorias: 222, icono: '🌾' },
    { alimento: 'Batata cocida', cantidad: '1 grande (300g)', proteina: 3, carbs: 54, grasa: 0.2, calorias: 234, icono: '🍠' },
  ];

  const grasasSaludables: AlimentoPorcion[] = [
    { alimento: 'Aguacate', cantidad: '½ pieza', proteina: 2, carbs: 8, grasa: 15, calorias: 160, icono: '🥑' },
    { alimento: 'Aceite de oliva', cantidad: '1 cda (15ml)', proteina: 0, carbs: 0, grasa: 14, calorias: 126, icono: '🫒' },
    { alimento: 'Almendras', cantidad: '20 piezas (30g)', proteina: 6, carbs: 6, grasa: 15, calorias: 180, icono: '🥜' },
    { alimento: 'Nueces', cantidad: '5 piezas (30g)', proteina: 4, carbs: 4, grasa: 18, calorias: 196, icono: '🥜' },
    { alimento: 'Mantequilla de maní natural', cantidad: '2 cda (30g)', proteina: 8, carbs: 6, grasa: 16, calorias: 190, icono: '🥜' },
  ];

  const verduras: AlimentoPorcion[] = [
    { alimento: 'Ensalada mixta', cantidad: '2 tazas', proteina: 2, carbs: 8, grasa: 0.5, calorias: 40, icono: '🥗' },
    { alimento: 'Brócoli cocido', cantidad: '1 taza', proteina: 3, carbs: 6, grasa: 0.5, calorias: 35, icono: '🥦' },
    { alimento: 'Espinaca cocida', cantidad: '1 taza', proteina: 3, carbs: 4, grasa: 0.5, calorias: 30, icono: '🍃' },
    { alimento: 'Zanahoria', cantidad: '1 taza rallada', proteina: 1, carbs: 10, grasa: 0, calorias: 45, icono: '🥕' },
    { alimento: 'Pimiento asado', cantidad: '1 taza', proteina: 1, carbs: 6, grasa: 0.5, calorias: 30, icono: '🫑' },
  ];

  const frutas: AlimentoPorcion[] = [
    { alimento: 'Manzana', cantidad: '1 pieza', proteina: 0.5, carbs: 25, grasa: 0.3, calorias: 95, icono: '🍎' },
    { alimento: 'Plátano', cantidad: '1 mediano', proteina: 1.3, carbs: 27, grasa: 0.4, calorias: 105, icono: '🍌' },
    { alimento: 'Fresas', cantidad: '1 taza', proteina: 1, carbs: 12, grasa: 0.5, calorias: 50, icono: '🍓' },
    { alimento: 'Naranja', cantidad: '1 pieza', proteina: 1, carbs: 15, grasa: 0.2, calorias: 62, icono: '🍊' },
    { alimento: 'Uvas', cantidad: '1 taza', proteina: 1, carbs: 23, grasa: 0.3, calorias: 90, icono: '🍇' },
  ];

  // Distribución por comida según objetivo
  const distribucion = objetivo === 'perdida_grasa'
    ? [{ p: 0.25, c: 0.15, g: 0.25 }, { p: 0.15, c: 0.10, g: 0.15 }, { p: 0.30, c: 0.35, g: 0.25 }, { p: 0.15, c: 0.15, g: 0.15 }, { p: 0.15, c: 0.25, g: 0.20 }]
    : objetivo === 'ganancia_muscular'
    ? [{ p: 0.25, c: 0.25, g: 0.20 }, { p: 0.10, c: 0.15, g: 0.10 }, { p: 0.30, c: 0.30, g: 0.25 }, { p: 0.15, c: 0.20, g: 0.15 }, { p: 0.20, c: 0.10, g: 0.30 }]
    : [{ p: 0.25, c: 0.20, g: 0.20 }, { p: 0.15, c: 0.15, g: 0.15 }, { p: 0.30, c: 0.30, g: 0.25 }, { p: 0.15, c: 0.20, g: 0.15 }, { p: 0.15, c: 0.15, g: 0.25 }];

  return comidasBase.map((base, i) => {
    const pNecesario = Math.round(pPorComida * distribucion[i].p * 5);
    const cNecesario = Math.round(cPorComida * distribucion[i].c * 5);
    const gNecesario = Math.round(gPorComida * distribucion[i].g * 5);

    // Seleccionar alimentos que se acerquen a los macros de esta comida
    const alimentos: AlimentoPorcion[] = [];
    let pAcum = 0, cAcum = 0, gAcum = 0, calAcum = 0;

    // Proteína principal
    const prot = proteins[i % proteins.length];
    alimentos.push(prot); pAcum += prot.proteina; cAcum += prot.carbs; gAcum += prot.grasa; calAcum += prot.calorias;

    // Carbohidrato
    const carb = carbs[i % carbs.length];
    if (cNecesario > 20) { alimentos.push(carb); pAcum += carb.proteina; cAcum += carb.carbs; gAcum += carb.grasa; calAcum += carb.calorias; }

    // Grasa
    const grasa = grasasSaludables[i % grasasSaludables.length];
    if (gNecesario > 8) { alimentos.push(grasa); pAcum += grasa.proteina; cAcum += grasa.carbs; gAcum += grasa.grasa; calAcum += grasa.calorias; }

    // Verdura siempre
    const verdura = verduras[i % verduras.length];
    alimentos.push(verdura); pAcum += verdura.proteina; cAcum += verdura.carbs; gAcum += verdura.grasa; calAcum += verdura.calorias;

    // Fruta en colaciones
    if (base.nombre.includes('Colación')) {
      const fruta = frutas[i % frutas.length];
      alimentos.push(fruta); pAcum += fruta.proteina; cAcum += fruta.carbs; gAcum += fruta.grasa; calAcum += fruta.calorias;
    }

    return {
      ...base,
      alimentos,
      calorias: calAcum,
      proteinas: pAcum,
      carbs: cAcum,
      grasas: gAcum,
    };
  });
}

export function NutricionPanel() {
  const [cliente, setCliente] = useState('');
  const [objetivo, setObjetivo] = useState<PlanAlimentario['objetivo']>('mantenimiento');
  const [plan, setPlan] = useState<PlanAlimentario | null>(null);
  const [planesGuardados, setPlanesGuardados] = useState<PlanAlimentario[]>([]);
  const [comidaAbierta, setComidaAbierta] = useState<number | null>(0);

  const clientes = getClientesUnicos();

  useEffect(() => {
    const raw = localStorage.getItem('anthroscope_planes');
    if (raw) {
      try { setPlanesGuardados(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const generarPlan = () => {
    if (!cliente) { toast.error('Selecciona un cliente'); return; }
    const resultado = getUltimoResultado(cliente);
    if (!resultado) { toast.error('No hay evaluación ISAK para este cliente'); return; }

    const macros = calcularNecesidades(resultado, objetivo);
    const comidas = generarComidas(objetivo, macros);

    const totalP = comidas.reduce((s, c) => s + c.proteinas, 0);
    const totalC = comidas.reduce((s, c) => s + c.carbs, 0);
    const totalG = comidas.reduce((s, c) => s + c.grasas, 0);
    const totalCal = comidas.reduce((s, c) => s + c.calorias, 0);

    const nuevoPlan: PlanAlimentario = {
      id: Date.now().toString(),
      clienteNombre: cliente,
      fecha: new Date().toISOString().slice(0, 10),
      objetivo,
      caloriasDiarias: totalCal,
      proteinas: totalP,
      carbohidratos: totalC,
      grasas: totalG,
      fibra: macros.fibra,
      agua: macros.agua,
      comidas,
    };

    setPlan(nuevoPlan);
    toast.success(`Plan generado: ${totalCal} kcal basado en composición corporal ISAK`);
  };

  const guardarPlan = () => {
    if (!plan) return;
    const all = [...planesGuardados, plan];
    localStorage.setItem('anthroscope_planes', JSON.stringify(all));
    setPlanesGuardados(all);
    toast.success('Plan guardado');
  };

  const objetivoLabel = {
    perdida_grasa: 'Pérdida de Grasa',
    mantenimiento: 'Mantenimiento',
    ganancia_muscular: 'Ganancia Muscular',
    rendimiento: 'Rendimiento Deportivo',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Plan Alimentario ISAK</h2>
          <p className="text-xs text-[#8a8d9e]">Generado automáticamente desde composición corporal</p>
        </div>
        <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20">Basado en Masa Magra</Badge>
      </div>

      {/* Configuración */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-[#8a8d9e] flex items-center gap-1"><User className="w-3 h-3" /> Cliente</Label>
              <select
                value={cliente}
                onChange={e => setCliente(e.target.value)}
                className="w-full bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Seleccionar...</option>
                {clientes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-[#8a8d9e] flex items-center gap-1"><Target className="w-3 h-3" /> Objetivo</Label>
              <select
                value={objetivo}
                onChange={e => setObjetivo(e.target.value as any)}
                className="w-full bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm"
              >
                <option value="perdida_grasa">Pérdida de Grasa</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="ganancia_muscular">Ganancia Muscular</option>
                <option value="rendimiento">Rendimiento Deportivo</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={generarPlan} className="w-full bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] font-semibold">
                <Calculator className="w-4 h-4 mr-2" /> Generar Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan generado */}
      {plan && (
        <>
          {/* Resumen de macros */}
          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#f0f0f5] flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-[#D4FF00]" />
                  {plan.clienteNombre} — {objetivoLabel[plan.objetivo]}
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={guardarPlan} className="border-[#2e2f42] text-[#8a8d9e]">
                    <Save className="w-4 h-4 mr-1" /> Guardar
                  </Button>
                </div>
              </div>
              <p className="text-xs text-[#8a8d9e]">Fecha: {plan.fecha} · Basado en última evaluación ISAK</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                  <Flame className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#f0f0f5]">{plan.caloriasDiarias}</p>
                  <p className="text-[10px] text-[#8a8d9e] uppercase">kcal/día</p>
                </div>
                <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                  <Beef className="w-4 h-4 text-[#ef4444] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#f0f0f5]">{plan.proteinas}g</p>
                  <p className="text-[10px] text-[#8a8d9e] uppercase">Proteínas</p>
                  <p className="text-[10px] text-[#55576b]">{Math.round(plan.proteinas * 4 / plan.caloriasDiarias * 100)}%</p>
                </div>
                <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                  <Carrot className="w-4 h-4 text-[#22c55e] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#f0f0f5]">{plan.carbohidratos}g</p>
                  <p className="text-[10px] text-[#8a8d9e] uppercase">Carbs</p>
                  <p className="text-[10px] text-[#55576b]">{Math.round(plan.carbohidratos * 4 / plan.caloriasDiarias * 100)}%</p>
                </div>
                <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                  <Droplets className="w-4 h-4 text-[#6366f1] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#f0f0f5]">{plan.grasas}g</p>
                  <p className="text-[10px] text-[#8a8d9e] uppercase">Grasas</p>
                  <p className="text-[10px] text-[#55576b]">{Math.round(plan.grasas * 9 / plan.caloriasDiarias * 100)}%</p>
                </div>
                <div className="bg-[#0a0b0f] rounded-lg p-3 text-center border border-[#1e1f2e]">
                  <Droplets className="w-4 h-4 text-[#06b6d4] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#f0f0f5]">{plan.agua}L</p>
                  <p className="text-[10px] text-[#8a8d9e] uppercase">Agua/día</p>
                </div>
              </div>

              {/* Comidas */}
              <div className="space-y-3">
                {plan.comidas.map((comida, i) => (
                  <div key={i} className="border border-[#1e1f2e] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setComidaAbierta(comidaAbierta === i ? null : i)}
                      className="w-full flex items-center justify-between p-3 bg-[#0a0b0f] hover:bg-[#1e1f2e]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{comida.nombre === 'Desayuno' ? '🌅' : comida.nombre.includes('Colación') ? '🥪' : comida.nombre === 'Comida Principal' ? '🍽️' : comida.nombre === 'Cena' ? '🌙' : '🍴'}</span>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-[#f0f0f5]">{comida.nombre}</p>
                          <p className="text-[10px] text-[#8a8d9e]">{comida.horario} · {comida.calorias} kcal · P:{comida.proteinas}g C:{comida.carbs}g G:{comida.grasas}g</p>
                        </div>
                      </div>
                      {comidaAbierta === i ? <ChevronUp className="w-4 h-4 text-[#55576b]" /> : <ChevronDown className="w-4 h-4 text-[#55576b]" />}
                    </button>
                    {comidaAbierta === i && (
                      <div className="p-3 space-y-2">
                        {comida.alimentos.map((a, j) => (
                          <div key={j} className="flex items-center justify-between py-2 border-b border-[#1e1f2e]/50 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{a.icono}</span>
                              <div>
                                <p className="text-sm text-[#f0f0f5]">{a.alimento}</p>
                                <p className="text-[10px] text-[#8a8d9e]">{a.cantidad}</p>
                              </div>
                            </div>
                            <div className="text-right text-xs text-[#8a8d9e]">
                              <p className="font-mono">{a.calorias} kcal</p>
                              <p className="text-[10px] text-[#55576b]">P:{a.proteina}g C:{a.carbs}g G:{a.grasa}g</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Planes guardados */}
      {planesGuardados.length > 0 && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="text-lg text-[#f0f0f5]">Planes Guardados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {planesGuardados.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <div>
                  <p className="text-sm text-[#f0f0f5]">{p.clienteNombre}</p>
                  <p className="text-[10px] text-[#8a8d9e]">{p.fecha} · {objetivoLabel[p.objetivo]} · {p.caloriasDiarias} kcal</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setPlan(p)} className="text-[#D4FF00]">
                  Ver
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
