import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Droplets, Thermometer, Timer, Zap, FlaskConical,
  AlertTriangle, Info, Beaker, Wind, Scale
} from 'lucide-react';
import i18n from '@/i18n';

// ═══════════════════════════════════════════════════════════
// TRANSLATIONS - BILINGUAL
// ═══════════════════════════════════════════════════════════
const T = {
  es: {
    title: 'Hidratacion Deportiva de Precision',
    subtitle: 'Sodio · Maltodextrina · Fructosa · Osmolaridad · ACSM 2021 / Jeukendrup',
    tabCalculator: 'Calculadora', tabCommercial: 'Comercial', tabRecipe: 'Receta',
    athleteData: 'Datos del Atleta y Entorno',
    weightPre: 'Peso pre-ejercicio (kg)', weightPost: 'Peso post-ejercicio (kg)',
    weightPostHint: 'opcional', duration: 'Duracion (horas)',
    intensity: 'Intensidad', intensityLow: 'Baja', intensityMod: 'Moderada',
    intensityHigh: 'Alta', intensityMax: 'Max',
    temp: 'Temperatura (°C)', humidity: 'Humedad (%)',
    sweatType: 'Tipo de sudoracion', sweatLight: 'Ligero', sweatMod: 'Moderado',
    sweatSalt: 'Salado', sweatLightDesc: 'Sin residuo blanco. Na+ ~500 mg/L',
    sweatModDesc: 'Ocasionalmente blanco. Na+ ~850 mg/L',
    sweatSaltDesc: 'Cristales blancos visibles. Na+ ~1500 mg/L',
    kpiSweat: 'Perdida sudor', kpiSweatUnit: 'ml/h', kpiSodium: 'Sodio perdido',
    kpiSodiumUnit: 'mg/h', kpiSodiumReplace: 'Reponer ~{val} mg/h',
    kpiCarbs: 'Carbs necesarios', kpiCarbsUnit: 'g/h',
    kpiCarbsDetail: '{md}g MD + {fru}g F', kpiOsmo: 'Osmolaridad',
    kpiOsmoUnit: 'mOsm/L (ideal <270)', kpiOsmoOptimal: 'Optima',
    kpiOsmoGut: 'Requiere gut training', kpiOsmoHigh: 'Alta - entrenar',
    formulaTitle: 'Formula Personalizada (por hora)',
    vol: 'Volumen', volSub: 'por hora', volTotal: '{val} ml totales',
    md: 'Maltodextrina', mdSub: '~{val} kcal', fru: 'Fructosa', fruSub: '~{val} kcal',
    na: 'Sodio (Na+)', naSub: 'perdida: {val} mg/h',
    k: 'Potasio (K+)', kSub: 'previene calambres',
    timingTitle: 'Protocolo de ingestion (cada {val} min)',
    timingPer: 'por toma', timingCarbs: 'carbs/toma',
    timingStrategy: 'Tomar {ml}ml cada {min} min desde el minuto 0. Beber ANTES de sentir sed.',
    conc: 'Concentracion carbs', concOpt: 'Optima', concGut: 'Requiere gut training', concHigh: 'Alta - entrenar',
    giTitle: 'Recomendaciones GI (Gut Health)',
    giTrain: 'Gut Training', giTrainDesc: 'Entrena tu GI en 6-10 sesiones consumiendo la concentracion objetivo. Empieza con 30g/h y sube 15g cada 2 sesiones.',
    giSens: 'Sensibilidad individual', giSensDesc: 'Algunos atletas toleran 120g/h, otros max 60g/h. Usa la osmolaridad como guia: <270 mOsm/L = gut-friendly.',
    giAvoid: 'Evitar', giAvoidDesc: 'Nunca probar una nueva formula en competencia. Evitar fructosa pura >30g/h. No mezclar con proteinas en carbs >90g/h.',
    commTitle: 'Productos Comerciales Comparados',
    colProd: 'Producto', colCarbs: 'Carbs/100ml', colNa: 'Sodio/100ml',
    colK: 'K/100ml', colSource: 'Fuente carbs', colRatio: 'Ratio',
    colOsmo: 'Osmo (mOsm)', colEval: 'Evaluacion',
    recipeTitle: 'Receta Casera para 1 Litro (Batch)',
    recipeMd: 'Maltodextrina en polvo', recipeMdSub: 'por litro',
    recipeFru: 'Fructosa en polvo', recipeFruSub: 'por litro',
    recipeSalt: 'Sal de mesa (NaCl)', recipeSaltSub: '~{val}g de sal',
    recipeK: 'Sal de frutas / KCl', recipeKSub: 'potasio',
    instrTitle: 'Instrucciones',
    step1: 'Mezclar la maltodextrina y fructosa en 500ml de agua tibia (disuelve mejor).',
    step2: 'Agregar la sal de mesa y sal de frutas (o KCl si tienes).',
    step3: 'Agitar vigorosamente hasta disolucion completa.',
    step4: 'Completar a 1 litro con agua fria.',
    step5: 'Probar en entrenamiento 2-3 veces antes de usar en competencia.',
    step6: 'Almacenar refrigerado maximo 48 horas.',
    altTitle: 'Alternativa: Electrolit + Carbs',
    altDesc: 'Si no consigues maltodextrina pura en Mexico: Compra Electrolit (1 botella 625ml) + Glucosa en polvo (farmacias, ~50g). Mezcla: 1 Electrolit + 375ml agua + 50g glucosa = ~6% carbs con electrolitos basicos. NO ideal para >2h — falta fructosa para absorcion dual.',
    testTitle: 'Test de Perdida de Sudor (Sweat Test)',
    testIntro: 'El metodo mas preciso para calcular TU perdida individual:',
    test1: 'Pesate desnudo antes de entrenar (evacua vejiga primero). Anota: {val} kg',
    test2: 'Entrena a intensidad similar a tu evento por 60 minutos exactos. No comas ni bebas NADA durante.',
    test3: 'Secate completamente con toalla. Pesate desnudo de nuevo. Anota el resultado en "Peso post-ejercicio" arriba.',
    test4: 'Formula: (Peso pre - Peso post) en kg x 1000 = ml de sudor perdidos por hora.',
    test5: 'El valor aparece automaticamente en "Perdida sudor" arriba cuando ingresas el peso post.',
    testEx: 'Ejemplo: 70.0kg pre → 68.8kg post = 1.2kg = 1200 ml/h de sudor. Reponer ~75% = 900 ml/h.',
    refs: 'Referencias: Sawka MN et al. ACSM Position Stand 2021. Jeukendrup AE. Training the Gut 2017. Santos DAS et al. Sweat sodium 2014.',
    alerts: {
      hot: 'Condiciones de alto estres termico. Considera precooling.',
      highSweat: 'Perdida de sudor muy alta. Monitorear signos de deshidratacion.',
      highOsmo: 'Osmolaridad elevada. Riesgo de distress GI. Aumentar volumen o reducir carbs.',
      modOsmo: 'Osmolaridad moderada. Atletas sensibles GI: aumentar volumen 10-15%.',
      salt: 'Suador salado confirmado. Sodio AGRESIVO requerido. Considerar capsulas de sal.',
      gutTrain: '90g/h de carbs requiere entrenamiento gastrointestinal previo. No intentar en competencia sin practica.',
      conc: 'Concentracion >10%. Requiere entrenamiento de gut. Empezar con 6-8% en entrenamiento.',
    },
  },
  en: {
    title: 'Precision Sports Hydration',
    subtitle: 'Sodium · Maltodextrin · Fructose · Osmolarity · ACSM 2021 / Jeukendrup',
    tabCalculator: 'Calculator', tabCommercial: 'Commercial', tabRecipe: 'Recipe',
    athleteData: 'Athlete & Environment Data',
    weightPre: 'Pre-exercise weight (kg)', weightPost: 'Post-exercise weight (kg)',
    weightPostHint: 'optional', duration: 'Duration (hours)',
    intensity: 'Intensity', intensityLow: 'Low', intensityMod: 'Moderate',
    intensityHigh: 'High', intensityMax: 'Max',
    temp: 'Temperature (°C)', humidity: 'Humidity (%)',
    sweatType: 'Sweat Type', sweatLight: 'Light', sweatMod: 'Moderate',
    sweatSalt: 'Salty', sweatLightDesc: 'No white residue. Na+ ~500 mg/L',
    sweatModDesc: 'Occasional white marks. Na+ ~850 mg/L',
    sweatSaltDesc: 'Visible white crystals. Na+ ~1500 mg/L',
    kpiSweat: 'Sweat Loss', kpiSweatUnit: 'ml/h', kpiSodium: 'Sodium Lost',
    kpiSodiumUnit: 'mg/h', kpiSodiumReplace: 'Replace ~{val} mg/h',
    kpiCarbs: 'Carbs Needed', kpiCarbsUnit: 'g/h',
    kpiCarbsDetail: '{md}g MD + {fru}g F', kpiOsmo: 'Osmolarity',
    kpiOsmoUnit: 'mOsm/L (ideal <270)', kpiOsmoOptimal: 'Optimal',
    kpiOsmoGut: 'Requires gut training', kpiOsmoHigh: 'High - train gut',
    formulaTitle: 'Custom Formula (per hour)',
    vol: 'Volume', volSub: 'per hour', volTotal: '{val} ml total',
    md: 'Maltodextrin', mdSub: '~{val} kcal', fru: 'Fructose', fruSub: '~{val} kcal',
    na: 'Sodium (Na+)', naSub: 'lost: {val} mg/h',
    k: 'Potassium (K+)', kSub: 'prevents cramps',
    timingTitle: 'Drinking Protocol (every {val} min)',
    timingPer: 'per serving', timingCarbs: 'carbs/serving',
    timingStrategy: 'Drink {ml}ml every {min} min from minute 0. Drink BEFORE feeling thirsty.',
    conc: 'Carb Concentration', concOpt: 'Optimal', concGut: 'Requires gut training', concHigh: 'High - train gut',
    giTitle: 'GI Recommendations (Gut Health)',
    giTrain: 'Gut Training', giTrainDesc: 'Train your GI over 6-10 sessions consuming the target concentration. Start with 30g/h and increase 15g every 2 sessions.',
    giSens: 'Individual Sensitivity', giSensDesc: 'Some athletes tolerate 120g/h, others max 60g/h. Use osmolarity as guide: <270 mOsm/L = gut-friendly.',
    giAvoid: 'Avoid', giAvoidDesc: 'Never try a new formula in competition. Avoid pure fructose >30g/h. Do not mix with protein when carbs >90g/h.',
    commTitle: 'Commercial Products Compared',
    colProd: 'Product', colCarbs: 'Carbs/100ml', colNa: 'Sodium/100ml',
    colK: 'K/100ml', colSource: 'Carb Source', colRatio: 'Ratio',
    colOsmo: 'Osmo (mOsm)', colEval: 'Evaluation',
    recipeTitle: 'Homemade Recipe for 1 Liter (Batch)',
    recipeMd: 'Maltodextrin powder', recipeMdSub: 'per liter',
    recipeFru: 'Fructose powder', recipeFruSub: 'per liter',
    recipeSalt: 'Table salt (NaCl)', recipeSaltSub: '~{val}g of salt',
    recipeK: 'Fruit salt / KCl', recipeKSub: 'potassium',
    instrTitle: 'Instructions',
    step1: 'Mix maltodextrin and fructose in 500ml warm water (dissolves better).',
    step2: 'Add table salt and fruit salt (or KCl if you have it).',
    step3: 'Shake vigorously until fully dissolved.',
    step4: 'Top up to 1 liter with cold water.',
    step5: 'Test in training 2-3 times before using in competition.',
    step6: 'Store refrigerated maximum 48 hours.',
    altTitle: 'Alternative: Electrolyte Drink + Carbs',
    altDesc: 'If you cannot find pure maltodextrin: Buy sports drink (1 bottle 625ml) + glucose powder (pharmacy, ~50g). Mix: 1 drink + 375ml water + 50g glucose = ~6% carbs with basic electrolytes. NOT ideal for >2h — lacks fructose for dual absorption.',
    testTitle: 'Sweat Loss Test (Sweat Test)',
    testIntro: 'The most accurate method to calculate YOUR individual loss:',
    test1: 'Weigh naked before training (empty bladder first). Record: {val} kg',
    test2: 'Train at event intensity for exactly 60 minutes. Do NOT eat or drink ANYTHING during.',
    test3: 'Dry completely with towel. Weigh naked again. Record the result in "Post-exercise weight" above.',
    test4: 'Formula: (Pre weight - Post weight) in kg x 1000 = ml of sweat lost per hour.',
    test5: 'The value appears automatically in "Sweat Loss" above when you enter post weight.',
    testEx: 'Example: 70.0kg pre → 68.8kg post = 1.2kg = 1200 ml/h of sweat. Replace ~75% = 900 ml/h.',
    refs: 'References: Sawka MN et al. ACSM Position Stand 2021. Jeukendrup AE. Training the Gut 2017. Santos DAS et al. Sweat sodium 2014.',
    alerts: {
      hot: 'High thermal stress conditions. Consider precooling.',
      highSweat: 'Very high sweat loss. Monitor dehydration signs.',
      highOsmo: 'High osmolarity. Risk of GI distress. Increase volume or reduce carbs.',
      modOsmo: 'Moderate osmolarity. GI-sensitive athletes: increase volume 10-15%.',
      salt: 'Confirmed salty sweater. AGGRESSIVE sodium required. Consider salt capsules.',
      gutTrain: '90g/h carbs requires prior gut training. Do not attempt in competition without practice.',
      conc: 'Concentration >10%. Requires gut training. Start with 6-8% in training.',
    },
  },
};

// ═══════════════════════════════════════════════════════════
// CALCULATION LOGIC (same as before)
// ═══════════════════════════════════════════════════════════

const NA_SUDOR: Record<string, number> = { ligero: 500, moderado: 850, salado: 1500 };
const PERDIDA_BASE: Record<string, number> = { baja: 8, moderada: 14, alta: 20, muy_alta: 28 };

function calcHidratacion(peso: number, pesoPost: number|undefined, dur: number, inten: string, temp: number, hum: number, tipoS: string) {
  let base = PERDIDA_BASE[inten] || 14;
  if (temp > 30) base *= 1.4; else if (temp > 25) base *= 1.2; else if (temp < 10) base *= 0.8;
  if (hum > 70) base *= 1.15;
  const factorPeso = Math.sqrt(peso / 70);
  let perdida = Math.round(base * factorPeso);
  if (pesoPost && pesoPost > 0 && pesoPost < peso) {
    perdida = Math.round(((peso - pesoPost) * 1000) / dur);
  }
  const naMgL = NA_SUDOR[tipoS] || 850;
  const naPerdido = Math.round((perdida / 1000) * naMgL);
  let carbs = 0;
  if (dur < 1) carbs = 0; else if (dur < 2) carbs = 45; else if (dur < 2.5) carbs = 75; else carbs = 90;
  if (inten === 'muy_alta') carbs = Math.min(carbs + 15, 120);
  if (inten === 'baja' && dur < 1.5) carbs = Math.min(carbs, 30);
  let rMD = 0.6, rF = 0.4;
  if (carbs <= 60) { rMD = 1.0; rF = 0; } else if (carbs <= 75) { rMD = 0.67; rF = 0.33; } else { rMD = 0.56; rF = 0.44; }
  const md = Math.round(carbs * rMD);
  const fru = Math.round(carbs * rF);
  const liquido = Math.min(Math.round(perdida * 0.75), 1000);
  const concCarbs = liquido > 0 ? (carbs / (liquido / 1000)) : 0;
  const volL = liquido / 1000;
  const osmo = Math.round((md / volL * 1.0) + (fru / volL * 5.5) + ((naPerdido / volL / 1000) * 43) + 5);
  const cadaMin = 15;
  const cantPorToma = Math.round(liquido * (cadaMin / 60));
  const carbsPorToma = Math.round(carbs * (cadaMin / 60) * 10) / 10;
  const potasio = Math.round(naPerdido * 0.15);
  const alertas: string[] = [];
  const tx = (i18n.language || 'es').startsWith('en') ? T.en.alerts : T.es.alerts;
  if (temp > 30 && hum > 60) alertas.push(tx.hot);
  if (perdida > 1500) alertas.push(tx.highSweat);
  if (osmo > 350) alertas.push(tx.highOsmo);
  else if (osmo > 290) alertas.push(tx.modOsmo);
  if (tipoS === 'salado' && naPerdido > 1000) alertas.push(tx.salt);
  if (carbs >= 90 && dur < 2) alertas.push(tx.gutTrain);
  if (concCarbs > 10) alertas.push(tx.conc);
  return { perdida, naPerdido, carbs, md, fru, liquido, concCarbs: Math.round(concCarbs * 10) / 10, osmo, cadaMin, cantPorToma, carbsPorToma, potasio, alertas };
}

const PRODUCTOS = [
  { n: 'Gatorade Thirst Quencher', c: 6, na: 450, k: 127, f: 'glucose/sucrose', r: '1:0', o: 330, e: 'High sugar, low sodium for salty sweaters' },
  { n: 'Gatorade Endurance', c: 6, na: 800, k: 200, f: 'sucrose/dextrose', r: '1:0.5', o: 290, e: 'Better for endurance, moderate sodium' },
  { n: 'Maurten Drink Mix 160', c: 8, na: 400, k: 100, f: 'maltodextrin/fructose', r: '1:0.8', o: 160, e: 'Hydrogel, very low osmolarity, excellent GI' },
  { n: 'Maurten Drink Mix 320', c: 16, na: 500, k: 100, f: 'maltodextrin/fructose', r: '1:0.8', o: 180, e: 'High carb concentration, requires gut training' },
  { n: 'Skratch Labs Hydration', c: 4, na: 760, k: 80, f: 'sucrose/dextrose', r: '1:1', o: 265, e: 'More food than drink, fewer carbs' },
  { n: 'Skratch Labs Superfuel', c: 10.7, na: 400, k: 100, f: 'maltodextrin/cluster', r: '1:0', o: 150, e: 'High molecular weight cluster dextrin' },
  { n: 'Tailwind Nutrition Endurance', c: 7, na: 870, k: 230, f: 'sucrose/dextrose', r: '1:1', o: 270, e: 'Balanced, gut-friendly, simple option' },
  { n: 'Carbomin (Mexico)', c: 8, na: 500, k: 150, f: 'maltodextrin/fructose', r: '2:1', o: 280, e: 'Mexican product, locally available' },
  { n: 'Sparta Hydration (Mexico)', c: 6.5, na: 650, k: 120, f: 'maltodextrin/sucrose', r: '1:0.5', o: 275, e: 'Made in Mexico for Mexican athletes' },
  { n: 'Electrolit', c: 1.5, na: 250, k: 70, f: 'dextrose', r: '1:0', o: 250, e: 'Basic rehydration, NOT for intense exercise >1h' },
];

export function HidratacionPanel() {
  const lang = (i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const tx = T[lang];

  const [peso, setPeso] = useState(70);
  const [pesoPost, setPesoPost] = useState<number|undefined>(undefined);
  const [duracion, setDuracion] = useState(2);
  const [intensidad, setIntensidad] = useState('moderada');
  const [temp, setTemp] = useState(28);
  const [humedad, setHumedad] = useState(55);
  const [tipoSudor, setTipoSudor] = useState('moderado');
  const [tabActivo, setTabActivo] = useState<'calculadora'|'comercial'|'receta'>('calculadora');

  useState(() => {
    try {
      const evs = JSON.parse(localStorage.getItem('anthroscope_evaluaciones') || '[]');
      if (evs.length > 0 && evs[0].resultado?.perfil?.masaCorporal) {
        setPeso(evs[0].resultado.perfil.masaCorporal);
      }
    } catch { /* ignore */ }
  });

  const calc = useMemo(() => calcHidratacion(peso, pesoPost, duracion, intensidad, temp, humedad, tipoSudor), [peso, pesoPost, duracion, intensidad, temp, humedad, tipoSudor]);

  const intLabels: Record<string, string> = { baja: tx.intensityLow, moderada: tx.intensityMod, alta: tx.intensityHigh, muy_alta: tx.intensityMax };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#06b6d4] p-2.5 rounded-lg"><Droplets className="w-6 h-6 text-white" /></div>
          <div>
            <h2 className="text-xl font-bold text-[#f0f0f5]">{tx.title}</h2>
            <p className="text-xs text-[#55576b]">{tx.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['calculadora','comercial','receta'] as const).map(t => (
            <Button key={t} variant="outline" size="sm"
              className={tabActivo===t ? 'border-[#06b6d4] text-[#06b6d4]' : 'border-[#1e1f2e] text-[#8a8d9e]'}
              onClick={() => setTabActivo(t)}>
              {t==='calculadora' && <Beaker className="w-3.5 h-3.5 mr-1" />}
              {t==='comercial' && <FlaskConical className="w-3.5 h-3.5 mr-1" />}
              {t==='receta' && <Scale className="w-3.5 h-3.5 mr-1" />}
              {t==='calculadora' ? tx.tabCalculator : t==='comercial' ? tx.tabCommercial : tx.tabRecipe}
            </Button>
          ))}
        </div>
      </div>

      {calc.alertas.length > 0 && (
        <div className="space-y-2">
          {calc.alertas.map((a,i) => (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg border text-sm ${a.includes('AGRESIVO') || a.includes('deshidratacion') || a.includes('Very high') ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'}`}>
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />{a}
            </div>
          ))}
        </div>
      )}

      {tabActivo === 'calculadora' && (
        <>
          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><Scale className="w-4 h-4 text-[#06b6d4]" /> {tx.athleteData}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-[#8a8d9e] block mb-1">{tx.weightPre}</label>
                  <Input type="number" value={peso} onChange={e => setPeso(Number(e.target.value))} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
                </div>
                <div>
                  <label className="text-xs text-[#8a8d9e] block mb-1">{tx.weightPost} <span className="text-[#55576b]">{tx.weightPostHint}</span></label>
                  <Input type="number" value={pesoPost || ''} onChange={e => setPesoPost(e.target.value ? Number(e.target.value) : undefined)} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
                </div>
                <div>
                  <label className="text-xs text-[#8a8d9e] block mb-1">{tx.duration}</label>
                  <Input type="number" step={0.5} min={0.5} max={12} value={duracion} onChange={e => setDuracion(Number(e.target.value))} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
                </div>
                <div>
                  <label className="text-xs text-[#8a8d9e] block mb-1">{tx.intensity}</label>
                  <div className="flex gap-1">
                    {(['baja','moderada','alta','muy_alta'] as const).map(i => (
                      <button key={i} onClick={() => setIntensidad(i)}
                        className={`flex-1 py-1.5 text-[10px] rounded border transition-all ${intensidad===i ? 'border-[#06b6d4] bg-[#06b6d4]/10 text-[#06b6d4]' : 'border-[#1e1f2e] text-[#55576b]'}`}>
                        {intLabels[i]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#8a8d9e] block mb-1 flex items-center gap-1"><Thermometer className="w-3 h-3" /> {tx.temp}</label>
                  <Input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
                </div>
                <div>
                  <label className="text-xs text-[#8a8d9e] block mb-1 flex items-center gap-1"><Wind className="w-3 h-3" /> {tx.humidity}</label>
                  <Input type="number" value={humedad} onChange={e => setHumedad(Number(e.target.value))} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-[#8a8d9e] block mb-1">{tx.sweatType}</label>
                  <div className="flex gap-1">
                    {(['ligero','moderado','salado'] as const).map(t => (
                      <button key={t} onClick={() => setTipoSudor(t)}
                        className={`flex-1 py-1.5 text-xs rounded border transition-all ${tipoSudor===t ? 'border-[#06b6d4] bg-[#06b6d4]/10 text-[#06b6d4]' : 'border-[#1e1f2e] text-[#55576b]'}`}>
                        {t==='ligero' ? tx.sweatLight : t==='moderado' ? tx.sweatMod : tx.sweatSalt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#55576b] mt-1">
                    {tipoSudor==='ligero' ? tx.sweatLightDesc : tipoSudor==='moderado' ? tx.sweatModDesc : tx.sweatSaltDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-[#11121a] border-[#1e1f2e]">
              <CardContent className="p-4">
                <p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Droplets className="w-3 h-3" /> {tx.kpiSweat}</p>
                <p className="text-2xl font-bold text-[#06b6d4] mt-1">{calc.perdida}<span className="text-sm font-normal text-[#8a8d9e]"> {tx.kpiSweatUnit}</span></p>
                <p className="text-[10px] text-[#55576b]">{tx.volTotal.replace('{val}', String(Math.round(calc.perdida * duracion)))}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#11121a] border-[#1e1f2e]">
              <CardContent className="p-4">
                <p className="text-xs text-[#8a8d9e] flex items-center gap-1"><FlaskConical className="w-3 h-3" /> {tx.kpiSodium}</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">{calc.naPerdido}<span className="text-sm font-normal text-[#8a8d9e]"> {tx.kpiSodiumUnit}</span></p>
                <p className="text-[10px] text-[#55576b]">{tx.kpiSodiumReplace.replace('{val}', String(Math.round(calc.naPerdido * 0.8)))}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#11121a] border-[#1e1f2e]">
              <CardContent className="p-4">
                <p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Zap className="w-3 h-3" /> {tx.kpiCarbs}</p>
                <p className="text-2xl font-bold text-[#D4FF00] mt-1">{calc.carbs}<span className="text-sm font-normal text-[#8a8d9e]"> {tx.kpiCarbsUnit}</span></p>
                <p className="text-[10px] text-[#55576b]">{tx.kpiCarbsDetail.replace('{md}', String(calc.md)).replace('{fru}', String(calc.fru))}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#11121a] border-[#1e1f2e]">
              <CardContent className="p-4">
                <p className="text-xs text-[#8a8d9e] flex items-center gap-1"><Beaker className="w-3 h-3" /> {tx.kpiOsmo}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: calc.osmo < 270 ? '#22c55e' : calc.osmo < 350 ? '#f59e0b' : '#ef4444' }}>{calc.osmo}</p>
                <p className="text-[10px] text-[#55576b]">{tx.kpiOsmoUnit}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#11121a] border-[#06b6d4]/30">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><FlaskConical className="w-4 h-4 text-[#06b6d4]" /> {tx.formulaTitle}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { l: tx.vol, v: `${calc.liquido} ml`, s: tx.volSub, c: 'text-[#06b6d4]' },
                  { l: tx.md, v: `${calc.md} g`, s: tx.mdSub.replace('{val}', String(Math.round(calc.md * 4))), c: 'text-[#D4FF00]' },
                  { l: tx.fru, v: `${calc.fru} g`, s: calc.fru > 0 ? tx.fruSub.replace('{val}', String(Math.round(calc.fru * 4))) : (lang === 'es' ? 'No requerida' : 'Not needed'), c: 'text-[#f472b6]' },
                  { l: tx.na, v: `${Math.round(calc.naPerdido * 0.8)} mg`, s: tx.naSub.replace('{val}', String(calc.naPerdido)), c: 'text-yellow-400' },
                  { l: tx.k, v: `${calc.potasio} mg`, s: tx.kSub, c: 'text-purple-400' },
                ].map(item => (
                  <div key={item.l} className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                    <p className="text-[10px] text-[#8a8d9e] uppercase">{item.l}</p>
                    <p className={`text-lg font-bold ${item.c}`}>{item.v}</p>
                    <p className="text-[10px] text-[#55576b]">{item.s}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <p className="text-xs font-semibold text-[#f0f0f5] mb-2 flex items-center gap-1"><Timer className="w-3 h-3 text-[#D4FF00]" /> {tx.timingTitle.replace('{val}', String(calc.cadaMin))}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#06b6d4]">{calc.cantPorToma} ml</p>
                    <p className="text-[10px] text-[#8a8d9e]">{tx.timingPer}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#D4FF00]">{calc.carbsPorToma} g</p>
                    <p className="text-[10px] text-[#8a8d9e]">{tx.timingCarbs}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#8a8d9e]">{tx.timingStrategy.replace('{ml}', String(calc.cantPorToma)).replace('{min}', String(calc.cadaMin))}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#8a8d9e]">{tx.conc}: <strong className="text-[#f0f0f5]">{calc.concCarbs}%</strong></span>
                <Progress value={Math.min(calc.concCarbs * 10, 100)} className="w-24 h-1.5 bg-[#1e1f2e]" />
                <span className={calc.concCarbs <= 8 ? 'text-emerald-400' : calc.concCarbs <= 10 ? 'text-yellow-400' : 'text-red-400'}>
                  {calc.concCarbs <= 8 ? tx.concOpt : calc.concCarbs <= 10 ? tx.concGut : tx.concHigh}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><Info className="w-4 h-4 text-[#8a8d9e]" /> {tx.giTitle}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-emerald-500/20">
                  <p className="font-semibold text-emerald-400 mb-1">{tx.giTrain}</p>
                  <p className="text-[#8a8d9e]">{tx.giTrainDesc}</p>
                </div>
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-yellow-500/20">
                  <p className="font-semibold text-yellow-400 mb-1">{tx.giSens}</p>
                  <p className="text-[#8a8d9e]">{tx.giSensDesc}</p>
                </div>
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-red-500/20">
                  <p className="font-semibold text-red-400 mb-1">{tx.giAvoid}</p>
                  <p className="text-[#8a8d9e]">{tx.giAvoidDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {tabActivo === 'comercial' && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><FlaskConical className="w-4 h-4 text-[#06b6d4]" /> {tx.commTitle}</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#1e1f2e] text-[#8a8d9e]">
                    <th className="text-left p-2">{tx.colProd}</th>
                    <th className="text-center p-2">{tx.colCarbs}</th>
                    <th className="text-center p-2">{tx.colNa}</th>
                    <th className="text-center p-2">{tx.colK}</th>
                    <th className="text-center p-2">{tx.colSource}</th>
                    <th className="text-center p-2">{tx.colRatio}</th>
                    <th className="text-center p-2">{tx.colOsmo}</th>
                    <th className="text-left p-2">{tx.colEval}</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTOS.map(p => {
                    const iNa = (calc.naPerdido * 0.8) / (calc.liquido / 1000);
                    const iC = calc.carbs / (calc.liquido / 1000);
                    const naOk = p.na >= iNa * 0.7 && p.na <= iNa * 1.3;
                    const cOk = p.c >= iC * 0.5;
                    const oOk = p.o < 300;
                    const score = [naOk, cOk, oOk].filter(Boolean).length;
                    return (
                      <tr key={p.n} className="border-b border-[#1e1f2e]/50 hover:bg-[#1e1f2e]/20">
                        <td className="p-2 font-medium text-[#f0f0f5]">{p.n}</td>
                        <td className="p-2 text-center">{p.c}g</td>
                        <td className="p-2 text-center">{p.na}mg</td>
                        <td className="p-2 text-center">{p.k}mg</td>
                        <td className="p-2 text-center text-[#8a8d9e]">{p.f}</td>
                        <td className="p-2 text-center">{p.r}</td>
                        <td className="p-2 text-center">
                          <Badge variant="outline" className={p.o < 270 ? 'border-emerald-500 text-emerald-400' : p.o < 300 ? 'border-yellow-500 text-yellow-400' : 'border-red-500 text-red-400'}>{p.o}</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            {score >= 2 ? <span className="text-emerald-400">&#10003;</span> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                            <span className="text-[#8a8d9e]">{p.e}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tabActivo === 'receta' && (
        <div className="space-y-4">
          <Card className="bg-[#11121a] border-[#06b6d4]/30">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><Scale className="w-4 h-4 text-[#06b6d4]" /> {tx.recipeTitle}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e] text-center">
                  <p className="text-[10px] text-[#8a8d9e]">{tx.recipeMd}</p>
                  <p className="text-xl font-bold text-[#D4FF00]">{Math.round(calc.md / (calc.liquido / 1000))}g</p>
                  <p className="text-[10px] text-[#55576b]">{tx.recipeMdSub}</p>
                </div>
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e] text-center">
                  <p className="text-[10px] text-[#8a8d9e]">{tx.recipeFru}</p>
                  <p className="text-xl font-bold text-[#f472b6]">{Math.round(calc.fru / (calc.liquido / 1000))}g</p>
                  <p className="text-[10px] text-[#55576b]">{tx.recipeFruSub}</p>
                </div>
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e] text-center">
                  <p className="text-[10px] text-[#8a8d9e]">{tx.recipeSalt}</p>
                  <p className="text-xl font-bold text-yellow-400">{Math.round((calc.naPerdido * 0.8) / (calc.liquido / 1000) / 393 * 1000)}mg</p>
                  <p className="text-[10px] text-[#55576b]">{tx.recipeSaltSub.replace('{val}', String(((calc.naPerdido * 0.8) / (calc.liquido / 1000) / 393).toFixed(1)))}</p>
                </div>
                <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e] text-center">
                  <p className="text-[10px] text-[#8a8d9e]">{tx.recipeK}</p>
                  <p className="text-xl font-bold text-purple-400">{Math.round(calc.potasio / (calc.liquido / 1000))}mg</p>
                  <p className="text-[10px] text-[#55576b]">{tx.recipeKSub}</p>
                </div>
              </div>
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <p className="text-xs font-semibold text-[#f0f0f5] mb-2">{tx.instrTitle}</p>
                <ol className="text-xs text-[#8a8d9e] space-y-1 list-decimal list-inside">
                  <li>{tx.step1}</li><li>{tx.step2}</li><li>{tx.step3}</li><li>{tx.step4}</li><li>{tx.step5}</li><li>{tx.step6}</li>
                </ol>
              </div>
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-yellow-500/20">
                <p className="text-xs font-semibold text-yellow-400 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {tx.altTitle}</p>
                <p className="text-xs text-[#8a8d9e]">{tx.altDesc}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#11121a] border-[#1e1f2e]">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2"><Scale className="w-4 h-4 text-[#D4FF00]" /> {tx.testTitle}</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-xs text-[#8a8d9e]">
              <p>{tx.testIntro}</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>{tx.test1.replace('{val}', String(peso))}</li>
                <li>{tx.test2}</li>
                <li>{tx.test3}</li>
                <li>{tx.test4}</li>
                <li>{tx.test5}</li>
              </ol>
              <div className="p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]">
                <p className="text-[#55576b]"><strong className="text-[#06b6d4]">{tx.testEx}</strong></p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-[10px] text-[#55576b] border-t border-[#1e1f2e] pt-3">
        <p>{tx.refs}</p>
      </div>
    </div>
  );
}
