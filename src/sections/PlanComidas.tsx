import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { UtensilsCrossed, Plus, Trash2, Save, Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

// Top 100 alimentos LATAM con equivalentes para el sistema de planes
const ALIMENTOS_EQ: Record<string, { nombre: string; categoria: string; porcion: string; cal: number; prot: number; carbs: number; grasa: number; equivalente: string }> = {
  'pollo_pechuga': { nombre: 'Pechuga de pollo', categoria: 'Carnes', porcion: '100g', cal: 165, prot: 31, carbs: 0, grasa: 3.6, equivalente: '1 pieza mediana' },
  'pollo_pierna': { nombre: 'Pierna de pollo', categoria: 'Carnes', porcion: '100g', cal: 174, prot: 26, carbs: 0, grasa: 7, equivalente: '1 pieza' },
  'res_filete': { nombre: 'Filete de res magro', categoria: 'Carnes', porcion: '100g', cal: 250, prot: 26, carbs: 0, grasa: 15, equivalente: '1 pieza delgada' },
  'res_molida': { nombre: 'Carne molida 90/10', categoria: 'Carnes', porcion: '100g', cal: 176, prot: 20, carbs: 0, grasa: 10, equivalente: '1/2 taza cocida' },
  'pescado_salmon': { nombre: 'Salmón', categoria: 'Pescados', porcion: '100g', cal: 208, prot: 20, carbs: 0, grasa: 13, equivalente: '1 filete mediano' },
  'pescado_atun': { nombre: 'Atún en agua', categoria: 'Pescados', porcion: '100g', cal: 116, prot: 26, carbs: 0, grasa: 1, equivalente: '1 lata pequeña' },
  'pescado_tilapia': { nombre: 'Tilapia', categoria: 'Pescados', porcion: '100g', cal: 96, prot: 20, carbs: 0, grasa: 2, equivalente: '1 filete' },
  'huevo': { nombre: 'Huevo entero', categoria: 'Huevos', porcion: '1 pieza', cal: 70, prot: 6, carbs: 0.6, grasa: 5, equivalente: '1 pieza' },
  'huevo_clara': { nombre: 'Clara de huevo', categoria: 'Huevos', porcion: '3 piezas', cal: 51, prot: 11, carbs: 0.7, grasa: 0.2, equivalente: '3 claras' },
  'arroz_blanco': { nombre: 'Arroz blanco cocido', categoria: 'Cereales', porcion: '1/2 taza', cal: 100, prot: 2, carbs: 22, grasa: 0.2, equivalente: '1/2 taza' },
  'arroz_integral': { nombre: 'Arroz integral cocido', categoria: 'Cereales', porcion: '1/2 taza', cal: 110, prot: 2.5, carbs: 23, grasa: 0.9, equivalente: '1/2 taza' },
  'pasta': { nombre: 'Pasta cocida', categoria: 'Cereales', porcion: '1/2 taza', cal: 100, prot: 3.5, carbs: 20, grasa: 0.5, equivalente: '1/2 taza' },
  'avena': { nombre: 'Avena cocida', categoria: 'Cereales', porcion: '1/2 taza', cal: 83, prot: 3, carbs: 14, grasa: 1.5, equivalente: '1/2 taza' },
  'tortilla_maiz': { nombre: 'Tortilla de maíz', categoria: 'Cereales', porcion: '1 pieza', cal: 65, prot: 1.5, carbs: 13, grasa: 0.8, equivalente: '1 tortilla' },
  'pan_integral': { nombre: 'Pan integral', categoria: 'Cereales', porcion: '1 rebaja', cal: 80, prot: 4, carbs: 14, grasa: 1, equivalente: '1 rebaja' },
  'papa': { nombre: 'Papa cocida', categoria: 'Verduras A', porcion: '1/2 taza', cal: 68, prot: 1.5, carbs: 16, grasa: 0, equivalente: '1 pieza mediana' },
  'camote': { nombre: 'Camote cocido', categoria: 'Verduras A', porcion: '1/2 taza', cal: 90, prot: 2, carbs: 20, grasa: 0.1, equivalente: '1/2 pieza' },
  'platano': { nombre: 'Plátano maduro', categoria: 'Frutas', porcion: '1 pieza', cal: 105, prot: 1.3, carbs: 27, grasa: 0.4, equivalente: '1 pieza' },
  'manzana': { nombre: 'Manzana', categoria: 'Frutas', porcion: '1 pieza', cal: 95, prot: 0.5, carbs: 25, grasa: 0.3, equivalente: '1 pieza' },
  'frijoles': { nombre: 'Frijoles cocidos', categoria: 'Leguminosas', porcion: '1/2 taza', cal: 114, prot: 8, carbs: 20, grasa: 0.5, equivalente: '1/2 taza' },
  'lentejas': { nombre: 'Lentejas cocidas', categoria: 'Leguminosas', porcion: '1/2 taza', cal: 115, prot: 9, carbs: 20, grasa: 0.4, equivalente: '1/2 taza' },
  'garbanzos': { nombre: 'Garbanzos cocidos', categoria: 'Leguminosas', porcion: '1/2 taza', cal: 134, prot: 7, carbs: 22, grasa: 2, equivalente: '1/2 taza' },
  'queso_cottage': { nombre: 'Queso cottage', categoria: 'Lácteos', porcion: '1/2 taza', cal: 100, prot: 13, carbs: 3.5, grasa: 4, equivalente: '1/2 taza' },
  'yogur_griego': { nombre: 'Yogur griego natural', categoria: 'Lácteos', porcion: '1/2 taza', cal: 100, prot: 10, carbs: 4, grasa: 4, equivalente: '1/2 taza' },
  'leche_descremada': { nombre: 'Leche descremada', categoria: 'Lácteos', porcion: '1 taza', cal: 90, prot: 8, carbs: 12, grasa: 0, equivalente: '1 vaso' },
  'aguacate': { nombre: 'Aguacate', categoria: 'Grasas', porcion: '1/4 pieza', cal: 60, prot: 0.7, carbs: 3, grasa: 5.5, equivalente: '1/4 pieza' },
  'aceite_oliva': { nombre: 'Aceite de oliva', categoria: 'Grasas', porcion: '1 cucharadita', cal: 40, prot: 0, carbs: 0, grasa: 4.5, equivalente: '1 cdta' },
  'almendras': { nombre: 'Almendras', categoria: 'Grasas', porcion: '10 piezas', cal: 70, prot: 2.5, carbs: 2.5, grasa: 6, equivalente: '10 piezas' },
  'nueces': { nombre: 'Nueces', categoria: 'Grasas', porcion: '5 piezas', cal: 65, prot: 1.5, carbs: 1.5, grasa: 6.5, equivalente: '5 mitades' },
  'aceite_coco': { nombre: 'Aceite de coco', categoria: 'Grasas', porcion: '1 cucharadita', cal: 40, prot: 0, carbs: 0, grasa: 4.5, equivalente: '1 cdta' },
  'mantequilla_mani': { nombre: 'Mantequilla de maní', categoria: 'Grasas', porcion: '1 cucharada', cal: 95, prot: 4, carbs: 3, grasa: 8, equivalente: '1 cda' },
  'espinacas': { nombre: 'Espinacas', categoria: 'Verduras B', porcion: '1 taza', cal: 7, prot: 0.9, carbs: 1.1, grasa: 0.1, equivalente: '1 taza' },
  'brocoli': { nombre: 'Brócoli', categoria: 'Verduras B', porcion: '1/2 taza', cal: 27, prot: 2, carbs: 5, grasa: 0.3, equivalente: '1/2 taza' },
  'pepino': { nombre: 'Pepino', categoria: 'Verduras B', porcion: '1 taza', cal: 16, prot: 0.8, carbs: 4, grasa: 0.1, equivalente: '1 pieza' },
  'tomate': { nombre: 'Tomate', categoria: 'Verduras B', porcion: '1 pieza', cal: 22, prot: 1, carbs: 4.8, grasa: 0.2, equivalente: '1 pieza' },
  'zanahoria': { nombre: 'Zanahoria', categoria: 'Verduras B', porcion: '1/2 taza', cal: 25, prot: 0.6, carbs: 6, grasa: 0.1, equivalente: '1 pieza mediana' },
  'fresa': { nombre: 'Fresa', categoria: 'Frutas', porcion: '1 taza', cal: 49, prot: 1, carbs: 12, grasa: 0.5, equivalente: '8 piezas' },
  'melon': { nombre: 'Melón', categoria: 'Frutas', porcion: '1 taza', cal: 60, prot: 1.5, carbs: 15, grasa: 0.3, equivalente: '1/4 pieza' },
  'sandia': { nombre: 'Sandía', categoria: 'Frutas', porcion: '1 taza', cal: 46, prot: 0.9, carbs: 11.5, grasa: 0.2, equivalente: '1 rebanada' },
  'naranja': { nombre: 'Naranja', categoria: 'Frutas', porcion: '1 pieza', cal: 62, prot: 1.2, carbs: 15, grasa: 0.2, equivalente: '1 pieza' },
  'pavo_pechuga': { nombre: 'Pechuga de pavo', categoria: 'Carnes', porcion: '100g', cal: 135, prot: 30, carbs: 0, grasa: 1, equivalente: '3 rebajas' },
  'jamon_pavo': { nombre: 'Jamón de pavo', categoria: 'Carnes', porcion: '2 rebajas', cal: 60, prot: 10, carbs: 1, grasa: 2, equivalente: '2 rebajas' },
  'atun_fresco': { nombre: 'Atún fresco', categoria: 'Pescados', porcion: '100g', cal: 132, prot: 28, carbs: 0, grasa: 1, equivalente: '1 filete' },
  'queso_panela': { nombre: 'Queso panela', categoria: 'Lácteos', porcion: '30g', cal: 70, prot: 5, carbs: 1, grasa: 5, equivalente: '1 rebanada' },
  'queso_oaxaca': { nombre: 'Queso Oaxaca', categoria: 'Lácteos', porcion: '30g', cal: 90, prot: 6, carbs: 1, grasa: 7, equivalente: '1 bola pequeña' },
  'crema': { nombre: 'Crema ligera', categoria: 'Lácteos', porcion: '2 cucharadas', cal: 50, prot: 1, carbs: 2, grasa: 4, equivalente: '2 cdas' },
  'elote': { nombre: 'Elote desgranado', categoria: 'Cereales', porcion: '1/2 taza', cal: 75, prot: 2.5, carbs: 16, grasa: 1, equivalente: '1/2 taza' },
  'tortilla_harina': { nombre: 'Tortilla de harina', categoria: 'Cereales', porcion: '1 pieza', cal: 150, prot: 3, carbs: 25, grasa: 4, equivalente: '1 tortilla mediana' },
  'cereal_integral': { nombre: 'Cereal integral', categoria: 'Cereales', porcion: '1/2 taza', cal: 80, prot: 2, carbs: 18, grasa: 1, equivalente: '1/2 taza' },
  'pasta_integral': { nombre: 'Pasta integral cocida', categoria: 'Cereales', porcion: '1/2 taza', cal: 105, prot: 4, carbs: 20, grasa: 0.8, equivalente: '1/2 taza' },
};

const GRUPOS_EQ = ['Carnes', 'Pescados', 'Huevos', 'Cereales', 'Verduras A', 'Verduras B', 'Frutas', 'Leguminosas', 'Lácteos', 'Grasas'];

const TIEMPOS_COMIDA = ['Desayuno', 'Colación AM', 'Comida', 'Colación PM', 'Cena'];

export interface ComidaItem {
  id: string;
  alimentoId: string;
  cantidad: number;
  equivalentes: string[]; // opciones de sustitución
}

export interface PlanComidaDia {
  tiempo: string;
  items: ComidaItem[];
}

export interface PlanComidaSemana {
  nombre: string;
  clienteNombre: string;
  dias: { [dia: string]: PlanComidaDia[] };
  macros: { cal: number; prot: number; carbs: number; grasa: number };
}

function generateId() {
  return 'p' + Date.now() + Math.random().toString(36).substr(2, 5);
}

export function PlanComidas() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [clienteNombre, setClienteNombre] = useState('');
  const [planNombre, setPlanNombre] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>(['Lunes']);
  const [comidasPorDia, setComidasPorDia] = useState<Record<string, PlanComidaDia[]>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [diaActivo, setDiaActivo] = useState('Lunes');
  const [tiempoActivo, setTiempoActivo] = useState('Desayuno');

  const t = {
    es: {
      titulo: 'Plan de Comidas',
      subtitulo: 'Crea planes nutricionales con sistema de equivalentes',
      cliente: 'Nombre del cliente',
      nombrePlan: 'Nombre del plan',
      seleccionaDias: 'Selecciona los días',
      agregarComida: 'Agregar alimento',
      alimento: 'Alimento',
      cantidad: 'Cantidad (porciones)',
      equivalentes: 'Equivalencias disponibles',
      guardarPlan: 'Guardar Plan',
      semanaCompleta: 'Semana completa',
      macrosTotales: 'Macros totales',
      cal: 'Cal',
      prot: 'Prot',
      carbs: 'Carbs',
      gras: 'Gras',
    },
    en: {
      titulo: 'Meal Plan',
      subtitulo: 'Create nutrition plans with equivalent system',
      cliente: 'Client name',
      nombrePlan: 'Plan name',
      seleccionaDias: 'Select days',
      agregarComida: 'Add food',
      alimento: 'Food',
      cantidad: 'Quantity (servings)',
      equivalentes: 'Available equivalents',
      guardarPlan: 'Save Plan',
      semanaCompleta: 'Full week',
      macrosTotales: 'Total macros',
      cal: 'Cal',
      prot: 'Prot',
      carbs: 'Carbs',
      gras: 'Fat',
    },
  }[isEn ? 'en' : 'es'];

  const diasSemana = isEn
    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const toggleDia = (dia: string) => {
    setDiasSeleccionados(prev => prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]);
  };

  const agregarComida = (dia: string, tiempo: string, alimentoId: string, cantidad: number) => {
    const alimento = ALIMENTOS_EQ[alimentoId];
    if (!alimento) return;

    // Encontrar equivalentes del mismo grupo
    const equivalentes = Object.entries(ALIMENTOS_EQ)
      .filter(([id, a]) => id !== alimentoId && a.categoria === alimento.categoria)
      .slice(0, 5)
      .map(([id, a]) => id);

    const nuevoItem: ComidaItem = {
      id: generateId(),
      alimentoId,
      cantidad,
      equivalentes,
    };

    setComidasPorDia(prev => {
      const key = `${dia}-${tiempo}`;
      const existing = prev[key] || [];
      return { ...prev, [key]: [...existing, nuevoItem] };
    });
  };

  const eliminarComida = (dia: string, tiempo: string, itemId: string) => {
    setComidasPorDia(prev => {
      const key = `${dia}-${tiempo}`;
      const existing = prev[key] || [];
      return { ...prev, [key]: existing.filter(i => i.id !== itemId) };
    });
  };

  const calcularMacros = () => {
    let cal = 0, prot = 0, carbs = 0, grasa = 0;
    Object.entries(comidasPorDia).forEach(([_, items]) => {
      items.forEach(item => {
        const alimento = ALIMENTOS_EQ[item.alimentoId];
        if (alimento) {
          cal += alimento.cal * item.cantidad;
          prot += alimento.prot * item.cantidad;
          carbs += alimento.carbs * item.cantidad;
          grasa += alimento.grasa * item.cantidad;
        }
      });
    });
    return { cal: Math.round(cal), prot: Math.round(prot), carbs: Math.round(carbs), grasa: Math.round(grasa) };
  };

  const guardarPlan = () => {
    if (!clienteNombre.trim() || !planNombre.trim()) {
      toast.error(isEn ? 'Client name and plan name are required' : 'Nombre del cliente y plan son obligatorios');
      return;
    }

    const macros = calcularMacros();
    const plan = {
      id: generateId(),
      nombre: planNombre,
      clienteNombre,
      fecha: new Date().toISOString(),
      comidasPorDia,
      macros,
    };

    const existing = JSON.parse(localStorage.getItem('anthroscope_planes_comida') || '[]');
    existing.push(plan);
    localStorage.setItem('anthroscope_planes_comida', JSON.stringify(existing));

    toast.success(isEn ? 'Meal plan saved!' : '¡Plan de comidas guardado!');
  };

  const macros = calcularMacros();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-[#f0f0f5] flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-[#c8ff00]" /> {t.titulo}
        </h2>
        <p className="text-xs text-[#8a8d9e]">{t.subtitulo}</p>
      </div>

      {/* Header inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-[#8a8d9e] mb-1 block">{t.cliente}</label>
          <Input value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} placeholder="Ej. Ana López" className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
        </div>
        <div>
          <label className="text-xs text-[#8a8d9e] mb-1 block">{t.nombrePlan}</label>
          <Input value={planNombre} onChange={e => setPlanNombre(e.target.value)} placeholder="Ej. Plan de definición 8 semanas" className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
        </div>
      </div>

      {/* Day selector */}
      <div>
        <label className="text-xs text-[#8a8d9e] mb-2 block">{t.seleccionaDias}</label>
        <div className="flex flex-wrap gap-2">
          {diasSemana.map(dia => (
            <button
              key={dia}
              onClick={() => { toggleDia(dia); setDiaActivo(dia); }}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                diasSeleccionados.includes(dia)
                  ? 'bg-[#c8ff00]/20 border-[#c8ff00]/50 text-[#c8ff00]'
                  : 'bg-[#1a1c29] border-[#2a2d3e] text-[#8a8d9e]'
              }`}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      {/* Macros summary */}
      <Card className="p-3 bg-[#11121a] border-[#2a2d3e]">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div><div className="text-lg font-bold text-[#c8ff00]">{macros.cal}</div><div className="text-[10px] text-[#8a8d9e]">{t.cal}</div></div>
          <div><div className="text-lg font-bold text-[#22c55e]">{macros.prot}g</div><div className="text-[10px] text-[#8a8d9e]">{t.prot}</div></div>
          <div><div className="text-lg font-bold text-[#3b82f6]">{macros.carbs}g</div><div className="text-[10px] text-[#8a8d9e]">{t.carbs}</div></div>
          <div><div className="text-lg font-bold text-[#f59e0b]">{macros.grasa}g</div><div className="text-[10px] text-[#8a8d9e]">{t.gras}</div></div>
        </div>
      </Card>

      {/* Day content */}
      {diasSeleccionados.includes(diaActivo) && (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {diasSeleccionados.map(dia => (
              <button
                key={dia}
                onClick={() => setDiaActivo(dia)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                  diaActivo === dia
                    ? 'bg-[#c8ff00]/20 text-[#c8ff00] border border-[#c8ff00]/40'
                    : 'bg-[#1a1c29] text-[#8a8d9e] border border-[#2a2d3e]'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>

          {TIEMPOS_COMIDA.map(tiempo => {
            const key = `${diaActivo}-${tiempo}`;
            const items = comidasPorDia[key] || [];
            return (
              <Card key={tiempo} className="p-4 bg-[#11121a] border-[#2a2d3e]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#f0f0f5]">{tiempo}</h4>
                  <Button variant="ghost" size="sm" className="text-[#c8ff00] hover:bg-[#c8ff00]/10 h-7" onClick={() => { setTiempoActivo(tiempo); setDialogOpen(true); }}>
                    <Plus className="w-3 h-3 mr-1" /> {t.agregarComida}
                  </Button>
                </div>
                {items.length === 0 ? (
                  <p className="text-xs text-[#55576b] text-center py-2">{isEn ? 'No foods added' : 'Sin alimentos'}</p>
                ) : (
                  <div className="space-y-2">
                    {items.map(item => {
                      const alimento = ALIMENTOS_EQ[item.alimentoId];
                      if (!alimento) return null;
                      return (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-[#1a1c29] rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-[#f0f0f5]">{alimento.nombre}</span>
                              <Badge className="bg-[#2a2d3e] text-[#8a8d9e] text-[10px]">{item.cantidad}x {alimento.porcion}</Badge>
                            </div>
                            <div className="flex gap-3 text-[10px] text-[#8a8d9e] mt-1">
                              <span>{alimento.cal * item.cantidad} cal</span>
                              <span>P: {alimento.prot * item.cantidad}g</span>
                              <span>C: {alimento.carbs * item.cantidad}g</span>
                              <span>G: {alimento.grasa * item.cantidad}g</span>
                            </div>
                            {item.equivalentes.length > 0 && (
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {item.equivalentes.map(eqId => {
                                  const eq = ALIMENTOS_EQ[eqId];
                                  if (!eq) return null;
                                  return (
                                    <Badge key={eqId} className="bg-[#c8ff00]/10 text-[#c8ff00] text-[9px] cursor-pointer hover:bg-[#c8ff00]/20" onClick={() => {
                                      setComidasPorDia(prev => ({
                                        ...prev,
                                        [key]: prev[key].map(i => i.id === item.id ? { ...i, alimentoId: eqId } : i),
                                      }));
                                      toast.success(`${isEn ? 'Changed to' : 'Cambiado a'} ${eq.nombre}`);
                                    }}>
                                      {isEn ? 'Swap' : 'Cambiar'}: {eq.nombre}
                                    </Badge>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10 h-7" onClick={() => eliminarComida(diaActivo, tiempo, item.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <Button className="w-full bg-[#c8ff00] text-black font-bold hover:bg-[#d4ff33]" size="lg" onClick={guardarPlan}>
        <Save className="w-4 h-4 mr-2" /> {t.guardarPlan}
      </Button>

      {/* Add food dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#11121a] border-[#2a2d3e] text-[#f0f0f5] max-w-lg max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-[#f0f0f5]">{t.agregarComida} — {tiempoActivo}</DialogTitle>
          </DialogHeader>
          <AddFoodDialog
            onAdd={(alimentoId, cantidad) => {
              agregarComida(diaActivo, tiempoActivo, alimentoId, cantidad);
              setDialogOpen(false);
            }}
            isEn={isEn}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddFoodDialog({ onAdd, isEn }: { onAdd: (alimentoId: string, cantidad: number) => void; isEn: boolean }) {
  const [categoria, setCategoria] = useState('');
  const [alimentoId, setAlimentoId] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const alimentosFiltrados = categoria
    ? Object.entries(ALIMENTOS_EQ).filter(([_, a]) => a.categoria === categoria)
    : Object.entries(ALIMENTOS_EQ);

  return (
    <div className="space-y-3">
      <Select value={categoria} onValueChange={setCategoria}>
        <SelectTrigger className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]">
          <SelectValue placeholder={isEn ? 'Filter by group' : 'Filtrar por grupo'} />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1c29] border-[#2a2d3e]">
          {GRUPOS_EQ.map(g => <SelectItem key={g} value={g} className="text-[#f0f0f5]">{g}</SelectItem>)}
        </SelectContent>
      </Select>

      <ScrollArea className="h-[200px]">
        <div className="space-y-1">
          {alimentosFiltrados.map(([id, a]) => (
            <button
              key={id}
              onClick={() => setAlimentoId(id)}
              className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                alimentoId === id
                  ? 'bg-[#c8ff00]/20 border border-[#c8ff00]/40 text-[#c8ff00]'
                  : 'bg-[#1a1c29] text-[#f0f0f5] hover:bg-[#2a2d3e]'
              }`}
            >
              <div className="flex justify-between">
                <span>{a.nombre}</span>
                <span className="text-[#8a8d9e] text-xs">{a.cal} cal/{a.porcion}</span>
              </div>
              <div className="text-[10px] text-[#8a8d9e]">P:{a.prot} C:{a.carbs} G:{a.grasa}</div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2">
        <label className="text-sm text-[#8a8d9e]">{isEn ? 'Servings' : 'Porciones'}:</label>
        <Input type="number" min={0.5} max={10} step={0.5} value={cantidad} onChange={e => setCantidad(Number(e.target.value))} className="w-20 bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
      </div>

      <DialogFooter>
        <Button className="bg-[#c8ff00] text-black hover:bg-[#d4ff33]" onClick={() => alimentoId && onAdd(alimentoId, cantidad)} disabled={!alimentoId}>
          <Check className="w-4 h-4 mr-1" /> {isEn ? 'Add' : 'Agregar'}
        </Button>
      </DialogFooter>
    </div>
  );
}
