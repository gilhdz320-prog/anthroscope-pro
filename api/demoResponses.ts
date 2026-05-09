// ============================================================
// ANTHROSCOPE PRO — AI Coach Demo Responses (Backend)
// 106 evidence-based nutrition responses (ES/EN)
// References: ISSN, ACSM, IOC, AND, SCAN
// ============================================================

export interface DemoResponse {
  keywords: string[];
  category: string;
  es: string;
  en: string;
}

export const DEMO_RESPONSES: DemoResponse[] = [
  // 1. PROTEINA (5 responses)
  {
    keywords: ["proteina", "protein", "cuanta proteina", "how much protein", "gramos proteina", "protein grams", "requerimiento proteico", "protein intake"],
    category: "protein",
    es: `**Requerimiento Proteico para Atletas — Basado en Evidencia**

**Rangos por g/kg/dia (ISSN 2022):**
• Sedentario general: 0.8 g/kg
• Atleta resistencia: 1.2-1.4 g/kg (entrenamiento) / 1.6-1.8 g/kg (periodo intenso)
• Atleta fuerza/potencia: 1.6-2.2 g/kg
• Fase hipertrofica maxima: 2.2-2.4 g/kg (mayor no es mejor)
• Atleta master (>40 anos): 1.6-2.0 g/kg
• Perdida de grasa + mantener musculo: 2.3-3.1 g/kg

**Timing optimo:**
• Dosis per meal: 0.25-0.40 g/kg (maxima estimulacion MPS)
• Leucina threshold: 2-3g por comida para activar mTOR
• Frecuencia: 4-5 ingestas distribuidas cada 3-4h
• Post-entreno: 20-40g dentro de las primeras 2h

**Calidad:**
• PDCAAS/DIAAS: Suero > Caseina > Huevo > Leche > Carne > Soja

**Referencia:** Jager et al. ISSN Position Stand: Protein & Exercise (2022)`,
    en: `**Protein Requirements for Athletes — Evidence-Based**

**Ranges in g/kg/day (ISSN 2022):**
• General sedentary: 0.8 g/kg
• Endurance athletes: 1.2-1.4 g/kg (training) / 1.6-1.8 g/kg (intense)
• Strength/power athletes: 1.6-2.2 g/kg
• Maximum hypertrophy: 2.2-2.4 g/kg
• Masters athletes (>40y): 1.6-2.0 g/kg
• Fat loss + muscle retention: 2.3-3.1 g/kg

**Optimal timing:**
• Per meal: 0.25-0.40 g/kg (max MPS)
• Leucine: 2-3g per meal (mTOR trigger)
• Frequency: 4-5 feedings every 3-4h
• Post-workout: 20-40g within 2h

**Reference:** Jager et al. ISSN Position Stand (2022)`
  },
  {
    keywords: ["proteina post", "post workout protein", "proteina despues", "protein after workout", "ventana anabolica", "anabolic window", "cuando tomar proteina"],
    category: "protein",
    es: `**Proteina Post-Entreno: La "Ventana Anabolica" Actualizada**

**Lo que dice la ciencia (ISSN 2017, Schoenfeld 2018):**
• La ventana es MUCHO mas amplia: 4-6h post-entreno
• Lo mas importante: proteina total diaria > timing exacto
• Si entrenaste en ayunas → prioriza proteina dentro de 1-2h

**Dosis optima post-entreno:**
• 20g proteina completa para mayoria
• 40g si eres >80kg o buscas maxima hipertrofia
• Incluir 2-3g leucina (trigger mTOR)
• Combinar con 0.5-1g carbs/kg si glycogen-depleting

**Mejores fuentes:**
1. Whey isolate (rapida digestion, alto leucina)
2. Huevos enteros (whole eggs > solo claras)
3. Carne magra + carbohidrato

**Referencia:** Schoenfeld et al. (2018), J Int Soc Sports Nutr`,
    en: `**Post-Workout Protein: The Updated "Anabolic Window"**

**Current science (ISSN 2017, Schoenfeld 2018):**
• Window is MUCH wider: 4-6h post-workout
• Most important: total daily protein > exact timing
• If trained fasted → prioritize within 1-2h

**Optimal dose:**
• 20g complete protein for most
• 40g if >80kg or max hypertrophy
• Include 2-3g leucine (mTOR trigger)

**Best sources:**
1. Whey isolate (fast, high leucine)
2. Whole eggs (whole eggs > whites)
3. Lean meat + carbs

**Reference:** Schoenfeld et al. (2018)`
  },
  {
    keywords: ["proteina antes dormir", "protein before bed", "caseina", "casein", "proteina nocturna", "nighttime protein"],
    category: "protein",
    es: `**Proteina Nocturna: Caseina vs Suero**

**Evidencia (Trommelen 2016, Snijders 2015):**
• 30-40g caseina antes de dormir aumenta MPS nocturna ~22%
• Caseina micelar: digestion lenta (7-8h)
• Suero (rapido) no es ideal pre-sueno

**Protocolo:**
• 30-40g caseina micelar, 30 min antes de acostarse
• Sin carbohidratos adicionales

**Poblaciones con mayor beneficio:**
• Atletas en fase de hipertrofia
• Adultos mayores (anabolismo resistencia)
• Atletas en deficit calorico

**Referencia:** Snijders et al. (2015), J Nutr`,
    en: `**Nighttime Protein: Casein vs Whey**

**Evidence (Trommelen 2016, Snijders 2015):**
• 30-40g casein pre-sleep increases overnight MPS ~22%
• Micellar casein: slow digestion (7-8h)
• Whey not ideal pre-sleep

**Protocol:**
• 30-40g micellar casein, 30 min before bed
• No added carbs

**Who benefits most:**
• Hypertrophy phase athletes
• Older adults
• Athletes in caloric deficit

**Reference:** Snijders et al. (2015)`
  },
  {
    keywords: ["proteina vegetal", "plant protein", "proteina vegana", "vegan protein", "combinar proteinas vegetales"],
    category: "protein",
    es: `**Proteina Vegetal para Atletas**

**Mito de "combinar":**
• NO necesitas combinar en CADA comida
• SI necesitas variedad durante el dia
• Objetivo: 10-20% MAS proteina que omnivoro

**Diana ISSN para veganos:**
• Atleta fuerza: 1.8-2.7 g/kg
• Atleta resistencia: 1.4-1.8 g/kg
• Leucina: 2.5-3g por comida

**Top fuentes (g/100g):**
• Seitan: 75g (bajo lisina)
• Tempeh/tofu: 12-20g (completo)
• Lentejas: 9g | Garbanzos: 9g
• Proteina guisante (powder): 80g

**Tip:** Suplementar B12, creatina 5g/d, leucina adicional.

**Referencia:** Rogerson H. (2017), J Int Soc Sports Nutr`,
    en: `**Plant Protein for Athletes**

**"Combining" myth (busted):**
• DON'T need to combine at EVERY meal
• DO need variety throughout the day
• Target: 10-20% MORE total protein

**ISSN targets for vegans:**
• Strength: 1.8-2.7 g/kg
• Endurance: 1.4-1.8 g/kg
• Leucine: 2.5-3g per meal

**Top sources (g/100g):**
• Seitan: 75g
• Tempeh/tofu: 12-20g
• Lentils: 9g | Chickpeas: 9g
• Pea protein powder: 80g

**Tip:** Supplement B12, creatine 5g/day.

**Reference:** Rogerson H. (2017)`
  },
  {
    keywords: ["leucina", "leucine", "bcaa", "aminoacidos esenciales", "eaas", "essential amino acids", "aminoacidos ramificados"],
    category: "protein",
    es: `**Leucina, BCAA y EAA: Lo que Funciona**

**Jerarquia:** Proteina completa > EAA > Leucina > BCAA

**Por que BCAA NO valen la pena (ISSN 2022):**
• Si consumes 1.6-2.2 g/kg proteina, BCAA anaden CERO
• BCAA sin otros EAA pueden INHIBIR MPS
• Meta-analisis (Wolfe 2017): BCAA no aumentan hipertrofia

**Leucina: el trigger mTOR**
• Threshold: 2-3g por comida
• Whey isolate: ~2.5g por 25g scoop
• Huevo entero: ~0.5g por huevo

**Cuando SI usar EAA:**
• Atletas veganos con bajo leucina
• Adultos mayores (anabolismo resistencia)
• Entrenamientos en ayuno: 10g EAA pre

**Referencia:** Wolfe RR. (2017), J Int Soc Sports Nutr`,
    en: `**Leucine, BCAA and EAA: What Works**

**Hierarchy:** Complete protein > EAA > Leucine > BCAA

**Why BCAAs are NOT worth it (ISSN 2022):**
• If protein intake adequate, BCAAs add ZERO
• Can INHIBIT MPS without other EAAs
• Meta-analysis (Wolfe 2017): no hypertrophy benefit

**Leucine: mTOR trigger**
• Threshold: 2-3g per meal
• Whey isolate: ~2.5g per 25g
• Whole egg: ~0.5g per egg

**When EAA makes sense:**
• Vegan athletes
• Older adults
• Fasted training: 10g EAA pre

**Reference:** Wolfe RR. (2017)`
  },

  // 2. PERDIDA DE GRASA (4 responses)
  {
    keywords: ["perder grasa", "lose fat", "deficit calorico", "caloric deficit", "quemar grasa", "fat loss", "bajar de peso", "cut", "cutting", "definicion"],
    category: "fat_loss",
    es: `**Perdida de Grasa para Atletas**

**Deficit calorico:**
• Moderado: -300 a -500 kcal del TDEE (0.5-1% peso/semana)
• Maximo seguro: NUNCA bajar de BMR

**Proteina en deficit (Helms 2014):**
• 2.3-3.1 g/kg peso corporal

**Macros en deficit:**
• Proteina: 30-35% calorias (2.3-3.1 g/kg)
• Grasas: 20-25% (0.6-0.8 g/kg minimo hormonal)
• Carbs: resto (priorizar alrededor entrenamiento)

**Senales de deficit excesivo:**
• Perdida de fuerza >10%, irritabilidad, sueno malo, libido baja

**Referencia:** Helms et al. (2014), JISSN`,
    en: `**Fat Loss for Athletes**

**Caloric deficit:**
• Moderate: -300 to -500 kcal (0.5-1% BW/week)
• Safe minimum: NEVER below BMR

**Protein in deficit (Helms 2014):**
• 2.3-3.1 g/kg body weight

**Macros:**
• Protein: 30-35% (2.3-3.1 g/kg)
• Fats: 20-25% (0.6-0.8 g/kg min)
• Carbs: remainder (around training)

**Signs of excess deficit:**
• Strength loss >10%, irritability, bad sleep, low libido

**Reference:** Helms et al. (2014)`
  },
  {
    keywords: ["metabolismo", "metabolism", "metabolismo lento", "slow metabolism", "tdee", "gasto energetico", "energy expenditure"],
    category: "fat_loss",
    es: `**Metabolismo y TDEE**

**Componentes:**
• REE/RMR (60-75%): metabolismo reposo
• TEF (8-15%): efecto termico alimentos
• NEAT (15-50%): actividad no ejercicio
• EAT (10-30%): ejercicio

**Ecuaciones RMR:**
• Cunningham (mejor atletas): 500 + 22 x masa magra (kg)
• Mifflin-St Jeor (general)

**Adaptacion metabolica:**
• Despues 8-12 semanas deficit: TDEE baja 10-15%
• Solucion: diet break 1-2 semanas cada 8-12 semanas

**Referencia:** Rosenbaum & Leibel. (2010), Int J Obes`,
    en: `**Metabolism and TDEE**

**Components:**
• REE/RMR (60-75%): resting
• TEF (8-15%): thermic effect
• NEAT (15-50%): non-exercise
• EAT (10-30%): exercise

**RMR equations:**
• Cunningham (athletes): 500 + 22 x fat-free mass (kg)
• Mifflin-St Jeor (general)

**Metabolic adaptation:**
• After 8-12 weeks deficit: TDEE drops 10-15%
• Fix: diet break 1-2 weeks every 8-12 weeks

**Reference:** Rosenbaum & Leibel. (2010)`
  },
  {
    keywords: ["ciclado carbohidratos", "carb cycling", "ciclar carbohidratos", "high carb low carb"],
    category: "fat_loss",
    es: `**Ciclado de Carbohidratos**

**Opcion A: Dias entreno vs descanso**
• Dias entreno: 4-6 g/kg
• Dias descanso: 2-3 g/kg
• Proteina constante: 2.0-2.4 g/kg

**Opcion B: Refeed estructurado**
• 5-6 dias bajo: 1-2 g/kg
• 1-2 dias alto: 4-6 g/kg

**Quien se beneficia:**
• Atletas pre-competencia
• Deportes de peso (lucha, halterofilia)

**Referencia:** Helms et al. (2015)`,
    en: `**Carbohydrate Cycling**

**Option A: Training vs rest days**
• Training: 4-6 g/kg
• Rest: 2-3 g/kg
• Constant protein: 2.0-2.4 g/kg

**Option B: Structured refeed**
• 5-6 days low: 1-2 g/kg
• 1-2 days high: 4-6 g/kg

**Who benefits:**
• Pre-competition athletes
• Weight-class sports

**Reference:** Helms et al. (2015)`
  },
  {
    keywords: ["diet break", "pausa dieta", "refeed", "refeed day", "leptina", "reverse diet"],
    category: "fat_loss",
    es: `**Diet Break y Refeed Days**

**Diet Break (1-2 semanas):**
• Cada 8-12 semanas de deficit
• Calorias: mantenimiento TDEE
• Beneficios: leptina, T3, NEAT, motivacion

**Refeed Day (1-2x/semana):**
• Carbs: +100 a +200g sobre baseline
• Grasas: bajar a 0.3 g/kg ese dia
• Proteina: mantener

**Reverse Dieting:**
• Aumentar 50-100 kcal/semana
• Previene rebound de grasa

**Referencia:** Trexler et al. (2014), Obesity`,
    en: `**Diet Break and Refeed Days**

**Diet Break (1-2 weeks):**
• Every 8-12 weeks of deficit
• Calories: maintenance TDEE
• Benefits: leptin, T3, NEAT

**Refeed Day (1-2x/week):**
• Carbs: +100 to +200g above baseline
• Fats: drop to 0.3 g/kg
• Protein: maintain

**Reverse Dieting:**
• Increase 50-100 kcal/week
• Prevents fat rebound

**Reference:** Trexler et al. (2014)`
  },

  // 3. CARBOHIDRATOS (2 responses)
  {
    keywords: ["carbohidratos", "carbohydrates", "carbs", "cuantos carbohidratos", "how many carbs", "carga de carbohidratos", "carb loading"],
    category: "carbs",
    es: `**Carbohidratos para Atletas**

**Rangos (ACSM/IOC 2018):**
• Sedentario: 3-5 g/kg
• Fuerza/potencia: 4-7 g/kg
• Resistencia moderado: 5-7 g/kg
• Resistencia intenso: 7-10 g/kg
• Ultra-endurance: 8-12 g/kg

**Carga pre-competencia:**
• 6 dias pre: 8-12 g/kg
• Dia competencia: 1-4 g/kg 1-4h antes

**Intra-workout:**
• <1h: agua suficiente
• 1-2h: 30g/h
• 2-3h: 60g/h (2:1 glucosa:fructosa)
• >3h: 90g/h

**Referencia:** Burke LM. (2011), J Sports Sci`,
    en: `**Carbs for Athletes**

**Ranges (ACSM/IOC 2018):**
• Sedentary: 3-5 g/kg
• Strength/power: 4-7 g/kg
• Endurance: 5-7 g/kg
• Intense endurance: 7-10 g/kg
• Ultra: 8-12 g/kg

**Carb loading:**
• 6 days pre: 8-12 g/kg
• Competition day: 1-4 g/kg 1-4h before

**During exercise:**
• <1h: water sufficient
• 1-2h: 30g/h
• 2-3h: 60g/h (2:1 glucose:fructose)
• >3h: 90g/h

**Reference:** Burke LM. (2011)`
  },
  {
    keywords: ["carbohidratos durante ejercicio", "carbs during exercise", "intra workout carbs", "maltodextrina", "bebida deportiva", "sports drink"],
    category: "carbs",
    es: `**Carbs DURANTE el Ejercicio**

**Dosis (ACSM 2016):**
• 1-2h: 30g/h
• 2-3h: 60g/h (2:1 glucosa:fructosa)
• >3h: 90g/h (1:0.8 ratio)

**Multiples transportadores:**
• Glucosa sola: max ~60g/h (SGLT1 saturado)
• + Fructosa: +30g/h via GLUT5

**Formato:**
• Liquido > solido alta intensidad
• Gel: 20-25g carbs (tomar con agua)
• Casero: 60g maltodextrina + 30g fructosa en 500ml

**Gut training:** Entrena tu GI gradualmente!

**Referencia:** Jeukendrup AE. (2017), Sports Med`,
    en: `**Carbs DURING Exercise**

**Doses (ACSM 2016):**
• 1-2h: 30g/h
• 2-3h: 60g/h (2:1 glucose:fructose)
• >3h: 90g/h

**Multiple transporters:**
• Glucose alone: max ~60g/h
• + Fructose: +30g/h via GLUT5

**Format:**
• Liquid > solid for high intensity
• Gel: 20-25g carbs (with water)
• Homemade: 60g maltodextrin + 30g fructose in 500ml

**Gut training:** Train your GI gradually!

**Reference:** Jeukendrup AE. (2017)`
  },

  // 4. GRASAS (1 response)
  {
    keywords: ["grasas", "fats", "grasa saludable", "healthy fats", "lipidos", "lipids", "omega 3", "omega-3", "aceite pescado", "fish oil"],
    category: "fats",
    es: `**Grasas para Atletas**

**Minimo critico:**
• 0.6 g/kg/dia: minimo absoluto
• 0.8-1.0 g/kg/dia: optimo

**Distribucion:**
• Monoinsaturadas (30-35%): aguacate, aceite oliva
• Poliinsaturadas (30-35%): omega-3, nueces
• Saturadas (<20-25%): carne, huevos
• Trans (<1%): evitar

**Omega-3 (EPA/DHA):**
• 2-3g EPA+DHA combinados/dia
• Pescado graso 2-3x/semana
• Antiinflamatorio, cardiovascular

**Timing:** Evitar altas PRE-entreno (lento vaciado gastrico)

**Referencia:** Thomas DT et al. (2016), JAND`,
    en: `**Fats for Athletes**

**Minimum:**
• 0.6 g/kg/day: absolute minimum
• 0.8-1.0 g/kg/day: optimal

**Distribution:**
• Monounsaturated (30-35%): avocado, olive oil
• Polyunsaturated (30-35%): omega-3, nuts
• Saturated (<20-25%): meat, eggs
• Trans (<1%): avoid

**Omega-3 (EPA/DHA):**
• 2-3g combined/day
• Fatty fish 2-3x/week
• Anti-inflammatory

**Timing:** Avoid high PRE-workout (slow gastric emptying)

**Reference:** Thomas DT et al. (2016)`
  },

  // 5. HIDRATACION (2 responses)
  {
    keywords: ["hidratacion", "hydration", "agua", "water", "sudor", "sweat", "electrolitos", "electrolytes", "sodio", "sodium", "deshidratacion", "dehydration"],
    category: "hydration",
    es: `**Hidratacion para Atletas**

**Test de sudor (hazlo tu mismo):**
1. Pésate desnudo pre-entreno (ej: 75.0 kg)
2. Entrena 60 min, NO bebas
3. Pésate post (ej: 74.2 kg)
4. Perdida = 0.8 kg = 800 ml/h

**Protocolo:**
• Pre (2-4h): 5-7 ml/kg
• Durante: perder <2% peso corporal
• Post: reponer 150% del peso perdido

**Referencia:** Sawka MN et al. ACSM (2007)`,
    en: `**Hydration for Athletes**

**Sweat test (do it yourself):**
1. Weigh naked pre-workout
2. Train 60 min, drink NOTHING
3. Weigh post
4. Loss = kg lost = ml/hour

**Protocol:**
• Pre (2-4h): 5-7 ml/kg
• During: lose <2% body weight
• Post: replace 150% of weight lost

**Reference:** Sawka MN et al. ACSM (2007)`
  },
  {
    keywords: ["sodio", "sodium", "sales", "salt", "electrolitos", "electrolytes", "bebida hidratante", "hydration drink", "gatorade"],
    category: "hydration",
    es: `**Electrolitos y Sodio**

**Sodio: el electrolito critico**
• Sudor promedio: 500-1000 mg sodio/L
• "Salty sweaters": >1000 mg/L

**Dosis:**
• <1h: no necesario
• 1-2h: 300-600 mg/h
• >2h: 500-1000 mg/h

**Bebida casera optima:**
• 500ml agua + 60g maltodextrina + 30g fructosa + 500-1000mg sodio

**Referencia:** Baker LB. (2017), Sports Med`,
    en: `**Electrolytes and Sodium**

**Sodium: critical electrolyte**
• Average sweat: 500-1000 mg/L
• "Salty sweaters": >1000 mg/L

**Doses:**
• <1h: not needed
• 1-2h: 300-600 mg/h
• >2h: 500-1000 mg/h

**Optimal homemade drink:**
• 500ml water + 60g maltodextrin + 30g fructose + 500-1000mg sodium

**Reference:** Baker LB. (2017)`
  },

  // 6. SUPLEMENTOS (6 responses)
  {
    keywords: ["creatina", "creatine", "monohidratada", "monohydrate", "creatina dosis", "creatine loading", "cargar creatina"],
    category: "supplements",
    es: `**Creatina Monohidratada: El Suplemento #1**

**Evidencia (ISSN 2021):**
• Mas estudios que CUALQUIER otro (1000+)
• Segura largo plazo (hasta 5 anos)
• NO daña rinones en sanos
• NO es dopante (WADA legal)

**Protocolos:**
• Carga: Dias 1-5: 20g/dia (4x5g), dia 6+: 3-5g
• Sin carga: 3-5g/dia desde dia 1 (saturacion 3-4 semanas)

**Beneficios:**
• +5-15% fuerza maxima
• +1-2kg masa magra
• Beneficios cognitivos

**Referencia:** Kreider et al. ISSN (2021)`,
    en: `**Creatine Monohydrate: #1 Supplement**

**Evidence (ISSN 2021):**
• Most studied (1000+)
• Safe long-term
• NOT doping (WADA legal)

**Protocols:**
• Loading: Days 1-5: 20g/day, day 6+: 3-5g
• No loading: 3-5g/day (saturation 3-4 weeks)

**Benefits:**
• +5-15% max strength
• +1-2kg lean mass
• Cognitive benefits

**Reference:** Kreider et al. ISSN (2021)`
  },
  {
    keywords: ["cafeina", "caffeine", "pre entreno", "pre workout", "estimulante", "stimulant", "dosis cafeina"],
    category: "supplements",
    es: `**Cafeina para Rendimiento (ISSN 2021)**

**Dosis:**
• 3-6 mg/kg, 30-60 min pre-ejercicio
• >9 mg/kg NO anade beneficio

**Beneficios:**
• Reduce percepcion esfuerzo (RPE -5-6%)
• Mejora endurance 2-4%
• Efecto ergogenico ~90% personas

**Tolerancia:**
• Se desarrolla en 4-7 dias
• Estrategia: usar dias importantes o ciclar 4 ON / 1 OFF

**Referencia:** Goldstein et al. ISSN (2021)`,
    en: `**Caffeine for Performance (ISSN 2021)**

**Dose:**
• 3-6 mg/kg, 30-60 min pre
• >9 mg/kg no added benefit

**Benefits:**
• Reduces RPE (-5-6%)
• Improves endurance 2-4%
• Ergogenic in ~90%

**Tolerance:**
• Develops in 4-7 days
• Strategy: use important days or cycle

**Reference:** Goldstein et al. ISSN (2021)`
  },
  {
    keywords: ["beta alanina", "beta-alanine", "betaalanina", "carnosina", "acido lactico", "lactic acid", "buffer"],
    category: "supplements",
    es: `**Beta-Alanina: Buffer Anti-Acidez**

**Mecanismo:** Aumenta carnosina muscular (+40-80%)

**Dosis:**
• 3.2-6.4 g/dia divididos (1.6-1.8g por toma)
• Carga: 4-12 semanas
• >1.8g de una vez = parestesia (hormigueo, inofensivo)

**Beneficios:**
• +2-3% ejercicios 1-4 min
• Util: 400-800m, CrossFit, series lactato

**Referencia:** Trexler et al. ISSN (2015)`,
    en: `**Beta-Alanine: Anti-Acidity Buffer**

**Mechanism:** Increases muscle carnosine (+40-80%)

**Dose:**
• 3.2-6.4 g/day divided (1.6-1.8g per dose)
• Loading: 4-12 weeks
• >1.8g single dose = paresthesia (tingling, harmless)

**Benefits:**
• +2-3% 1-4 min exercises
• Useful: 400-800m, CrossFit

**Reference:** Trexler et al. ISSN (2015)`
  },
  {
    keywords: ["citrulina", "citrulline", "citrulline malate", "oxido nitrico", "nitric oxide", "pompa", "pump", "vasodilatador"],
    category: "supplements",
    es: `**Citrulina (Malato)**

**Dosis:**
• Citrulina libre: 3g, 60 min pre
• Citrulina malato (2:1): 6-8g, 60 min pre

**Beneficios:**
• Mejora pump/vasodilatacion
• Reduce fatiga en sets repetidos (+1-2 reps)
• Reduce DOMS

**Referencia:** Perez-Guisado & Jakeman. (2010)`,
    en: `**Citrulline (Malate)**

**Dose:**
• Free citrulline: 3g, 60 min pre
• Citrulline malate (2:1): 6-8g, 60 min pre

**Benefits:**
• Improves pump/vasodilation
• Reduces fatigue in repeated sets
• Reduces DOMS

**Reference:** Perez-Guisado & Jakeman. (2010)`
  },
  {
    keywords: ["vitamina d", "vitamin d", "vit d", "hierro", "iron", "ferropenia", "anemia", "magnesio", "magnesium", "zinc"],
    category: "supplements",
    es: `**Micronutrientes Criticos**

**Vitamina D (mas importante):**
• 40-80% atletas DEFICIENTES
• Optimo: 40-80 ng/mL
• Dosis: 2000-4000 UI/dia

**Hierro (mujeres atletas):**
• 30-50% atletas femeninas deficientes
• Ferritina objetivo: >50 ng/mL
• NO suplementar sin testear

**Magnesio:**
• 200-400mg elemental (glicinato/malato)
• Evitar oxido (laxante)

**Zinc:** 15-30mg/dia

**Referencia:** Owens DJ et al. (2018)`,
    en: `**Critical Micronutrients**

**Vitamin D (most important):**
• 40-80% athletes DEFICIENT
• Optimal: 40-80 ng/mL
• Dose: 2000-4000 IU/day

**Iron (female athletes):**
• 30-50% deficient
• Ferritin target: >50 ng/mL
• DON'T supplement without testing

**Magnesium:**
• 200-400mg elemental
• Avoid oxide (laxative)

**Zinc:** 15-30mg/day

**Reference:** Owens DJ et al. (2018)`
  },
  {
    keywords: ["pre workout", "preworkout", "pre-entreno", "pre entreno", "antes entrenar", "before workout", "que tomar antes"],
    category: "supplements",
    es: `**Pre-Workout: Jerarquia Evidencia**

**Tier 1 (Fuerte):**
1. Cafeina: 3-6 mg/kg
2. Creatina: 5g diario
3. Beta-alanina: 3.2-6.4g/dia
4. Citrulina malato: 6-8g

**Tier 2 (Puede ayudar):**
5. Nitratos (remolacha): 300-600mg
6. Sodio: 300-500mg pre si >2h

**NO funcionan:**
• BCAA (si suficiente proteina)
• Glutamina
• Test boosters

**Referencia:** ISSN Position Stands 2015-2021`,
    en: `**Pre-Workout: Evidence Hierarchy**

**Tier 1 (Strong):**
1. Caffeine: 3-6 mg/kg
2. Creatine: 5g daily
3. Beta-alanine: 3.2-6.4g/day
4. Citrulline malate: 6-8g

**Tier 2 (May help):**
5. Nitrates (beetroot): 300-600mg
6. Sodium: 300-500mg

**DON'T work:**
• BCAA (if adequate protein)
• Glutamine
• Test boosters

**Reference:** ISSN Position Stands 2015-2021`
  },

  // 7. PRE/POST ENTRENO (3 responses)
  {
    keywords: ["que comer antes entrenar", "what to eat before workout", "pre entreno comida", "pre workout meal", "antes de entrenar", "comida pre"],
    category: "peri_workout",
    es: `**Comida Pre-Entreno**

**Timing:**
• 2-3h antes: comida completa
• 1-2h antes: comida ligera
• 30-60 min: snack rapido

**Composicion (2-3h antes):**
• Proteina: 0.3-0.5 g/kg
• Carbs: 1-2 g/kg
• Grasas: moderadas (<15g)
• Fibra: baja

**EVITAR pre-entreno:**
• Grasas altas (>20g)
• Mucha fibra
• Alcohol

**Referencia:** Kerksick et al. ISSN (2017)`,
    en: `**Pre-Workout Meal**

**Timing:**
• 2-3h before: complete meal
• 1-2h before: light meal
• 30-60 min: quick snack

**Composition (2-3h before):**
• Protein: 0.3-0.5 g/kg
• Carbs: 1-2 g/kg
• Fats: moderate (<15g)
• Fiber: low

**AVOID pre-workout:**
• High fat (>20g)
• Lots of fiber
• Alcohol

**Reference:** Kerksick et al. ISSN (2017)`
  },
  {
    keywords: ["que comer despues entrenar", "what to eat after workout", "post entreno", "post workout", "recuperacion", "recovery meal"],
    category: "peri_workout",
    es: `**Nutricion Post-Entreno**

**Prioridades:**
1. Proteina: 0.3-0.5 g/kg (20-40g)
2. Carbs: 0.8-1.2 g/kg si proximo entreno <24h
3. Hidratacion: 150% peso perdido

**Ventana anabolica actualizada:**
• 4-6h post-entreno (NO 30 min!)
• Si comiste 1-2h pre → se extiende

**NO necesitas:**
• BCAA (si ya comes proteina)
• Dextrosa ultra-rapida

**Referencia:** Schoenfeld et al. (2018); Kerksick et al. ISSN (2017)`,
    en: `**Post-Workout Nutrition**

**Priorities:**
1. Protein: 0.3-0.5 g/kg (20-40g)
2. Carbs: 0.8-1.2 g/kg if next workout <24h
3. Hydration: 150% weight lost

**Updated anabolic window:**
• 4-6h post-workout (NOT 30 min!)
• If ate 1-2h pre → extends

**You DON'T need:**
• BCAA (if adequate protein)
• Ultra-fast dextrose

**Reference:** Schoenfeld et al. (2018)`
  },
  {
    keywords: ["ayuno", "fasting", "ayuno intermitente", "intermittent fasting", "entrenar en ayunas", "fasted training", "16 8", "leangains"],
    category: "peri_workout",
    es: `**Ayuno Intermitente y Entrenamiento**

**Evidencea:**
• NO quema mas grasa a largo plazo (meta-analisis 2020)
• Puede aumentar oxidacion durante entreno
• PERO compensacion posterior = mismo balance

**Si entrenas en ayuno:**
• 10g EAA pre-entreno
• Primera comida: 40-50g proteina + carbs
• No entrenar >90 min en ayuno

**EVITAR:**
• Atletas femeninas (riesgo RED-S)
• Adolescentes
• Historia TCA

**Referencia:** Henselmans et al. (2020)`,
    en: `**Intermittent Fasting and Training**

**Evidence:**
• Does NOT burn more fat long-term (2020 meta-analysis)
• May increase oxidation during exercise
• BUT: subsequent compensation = same balance

**If training fasted:**
• 10g EAA pre-workout
• First meal: 40-50g protein + carbs
• Don't train >90 min fasted

**AVOID:**
• Female athletes (RED-S risk)
• Adolescents
• History of ED

**Reference:** Henselmans et al. (2020)`
  },

  // 8. ATLETAS FEMENINAS (3 responses)
  {
    keywords: ["atleta mujer", "female athlete", "atleta femenina", "ciclo menstrual", "menstrual cycle", "periodo", "period", "fase folicular", "fase lutea", "follicular", "luteal"],
    category: "female",
    es: `**Nutricion segun Ciclo Menstrual**

**Fase Folicular (Dia 1-14):**
• Insulin sensitivity ALTA
• Ideal: HIIT, fuerza, intensidad alta
• Carbs: 4-6 g/kg

**Fase Lutea (Dia 15-28):**
• Insulin sensitivity BAJA, retencion agua
• Mejor: volumen moderado
• Carbs: 3-5 g/kg
• **Crucial:** 250-350mg magnesio

**PMS (ultimos 3-5 dias):**
• Triptofano (pavo, platano)
• Omega-3 2-3g
• Hidratacion extra

**Referencia:** Oosthuyse & Bosch. (2010)`,
    en: `**Nutrition by Menstrual Cycle**

**Follicular (Day 1-14):**
• HIGH insulin sensitivity
• Ideal: HIIT, strength
• Carbs: 4-6 g/kg

**Luteal (Day 15-28):**
• LOW insulin sensitivity, water retention
• Better: moderate volume
• Carbs: 3-5 g/kg
• **Crucial:** 250-350mg magnesium

**PMS (last 3-5 days):**
• Tryptophan (turkey, banana)
• Omega-3 2-3g
• Extra hydration

**Reference:** Oosthuyse & Bosch. (2010)`
  },
  {
    keywords: ["red-s", "reds", "sindrome atleta femenina", "female athlete triad", "triada", "amenorrea", "amenorrhea", "hueso", "bone", "osteopenia"],
    category: "female",
    es: `**RED-S (Relative Energy Deficiency in Sport)**

**Definicion (IOC 2018):**
• Energia disponible <30 kcal/kg masa magra/dia
• Optimo: >45 kcal/kg FFM/dia

**Consecuencias:**
• Hormonal: baja LH, FSH, estrogeno
• Osea: osteopenia, fracturas
• Inmune, metabolica, cardiovascular

**Screening:**
• Regla perdida >3 meses?
• Historial fracturas por estres?
• Restriccion calorica + entreno intenso?

**Tratamiento:**
• EA >45 kcal/kg FFM
• Proteina 1.6-2.2 g/kg
• Calcio 1000-1500mg + Vit D

**Referencia:** Mountjoy et al. IOC (2018)`,
    en: `**RED-S (Relative Energy Deficiency in Sport)**

**Definition (IOC 2018):**
• Energy availability <30 kcal/kg FFM/day
• Optimal: >45 kcal/kg FFM/day

**Consequences:**
• Hormonal: low LH, FSH, estrogen
• Bone: osteopenia, fractures
• Immune, metabolic, cardiovascular

**Screening:**
• Missed period >3 months?
• Stress fracture history?
• Caloric restriction + intense training?

**Treatment:**
• EA >45 kcal/kg FFM
• Protein 1.6-2.2 g/kg
• Calcium 1000-1500mg + Vit D

**Reference:** Mountjoy et al. IOC (2018)`
  },
  {
    keywords: ["embarazo", "pregnancy", "embarazada", "pregnant athlete", "atleta embarazada", "lactancia", "breastfeeding", "lactation"],
    category: "female",
    es: `**Atleta Embarazada y Lactancia**

**Ganancia de peso segun IMC:**
• <18.5: 12.5-18 kg
• 18.5-24.9: 11.5-16 kg
• 25-29.9: 7-11.5 kg
• >30: 5-9 kg

**Ajustes por trimestre:**
• T1: +85 kcal/dia + acido folico 600mcg
• T2: +285 kcal/dia, proteina 1.3 g/kg
• T3: +475 kcal/dia, DHA 200-300mg

**Restricciones:**
• Cafeina: <200mg/dia
• NO alcohol, pescado alto en mercurio
• NO suplementos no testados

**Referencia:** ACSM/AND (2020)`,
    en: `**Pregnant Athlete and Breastfeeding**

**Weight gain by BMI:**
• <18.5: 12.5-18 kg
• 18.5-24.9: 11.5-16 kg
• 25-29.9: 7-11.5 kg
• >30: 5-9 kg

**Adjustments by trimester:**
• T1: +85 kcal/day + folic acid 600mcg
• T2: +285 kcal/day, protein 1.3 g/kg
• T3: +475 kcal/day, DHA 200-300mg

**Restrictions:**
• Caffeine: <200mg/day
• NO alcohol, high-mercury fish
• NO untested supplements

**Reference:** ACSM/AND (2020)`
  },

  // 9. SUENO (1 response)
  {
    keywords: ["sueno", "sleep", "dormir", "descanso", "rest", "insomnio", "insomnia", "recuperacion", "recovery", "melatonina", "melatonin"],
    category: "sleep",
    es: `**Sueno para Atletas**

**Impacto:**
• <7h/noche = riesgo lesion +70%
• 5h/noche = insulina -30%, cortisol +50%
• Recomendado: 8-10h

**Nutricion para dormir:**
• Caseina: 30-40g pre-sueno (Snijders 2015)
• Magnesio glicinato: 200-400mg
• Glicina: 3g, 30 min antes
• EVITAR: cafeina >6h antes, alcohol

**Higiene del sueno:**
• Ritmo consistente (±30 min)
• Temperatura: 18-20°C
• Oscuridad total
• Sin pantallas 1h antes

**Referencia:** Watson NF et al. (2015)`,
    en: `**Sleep for Athletes**

**Impact:**
• <7h/night = injury risk +70%
• 5h/night = insulin -30%, cortisol +50%
• Recommended: 8-10h

**Nutrition for sleep:**
• Casein: 30-40g pre-sleep
• Magnesium glycinate: 200-400mg
• Glycine: 3g, 30 min before
• AVOID: caffeine >6h before, alcohol

**Sleep hygiene:**
• Consistent schedule
• Temperature: 18-20°C
• Total darkness
• No screens 1h before

**Reference:** Watson NF et al. (2015)`
  },

  // 10. COMPETENCIA (2 responses)
  {
    keywords: ["competencia", "competition", "dia competencia", "competition day", "maraton", "marathon", "carrera", "race day", "antes competir"],
    category: "competition",
    es: `**Nutricion para Dia de Competencia**

**Regla de oro: NADA NUEVO EN COMPETENCIA**

**Maraton/Endurance:**
• Noche anterior: 8-12 g/kg carbs
• Desayuno (3-4h pre): 1-2 g/kg, baja fibra
• 1h pre: 0.5-1 g/kg carbs simples
• Durante: 30-90g carbs/h

**Deportes equipo:**
• Pre-partido 3h: pasta + pollo
• Medio tiempo: 30g carbs

**Referencia:** Burke LM. Practical Sports Nutrition (2007)`,
    en: `**Competition Day Nutrition**

**Golden rule: NOTHING NEW ON RACE DAY**

**Marathon/Endurance:**
• Night before: 8-12 g/kg carbs
• Breakfast (3-4h pre): 1-2 g/kg, low fiber
• 1h pre: 0.5-1 g/kg simple carbs
• During: 30-90g carbs/h

**Team sports:**
• Pre-game 3h: pasta + chicken
• Halftime: 30g carbs

**Reference:** Burke LM. (2007)`
  },
  {
    keywords: ["corte peso", "weight cut", "pesaje", "weigh in", "deporte combate", "combat sport", "mma", "lucha", "wrestling", "box", "boxing"],
    category: "competition",
    es: `**Corte de Peso para Deportes de Combate**

**Fase 1: Perdida grasa (6-8 semanas)**
• Max 1-1.5% peso/semana (ACSM)
• Proteina: 2.2-2.8 g/kg

**Fase 2: Manipulacion agua (24-48h)**
• Solo si <3% peso restante
• Reducir sodio 48h antes
• Bajar carbs (1g glycogen = 3g agua)

**Fase 3: Rehidratacion post-pesaje**
• 150% del peso perdido
• 3-5h entre pesaje y competencia ideal

**NUNCA:**
• Cortar agua >24h
• Vomitos/diureticos/laxantes

**Referencia:** Artioli et al. (2010)`,
    en: `**Weight Cutting for Combat Sports**

**Phase 1: Fat loss (6-8 weeks)**
• Max 1-1.5% BW/week
• Protein: 2.2-2.8 g/kg

**Phase 2: Water manipulation (24-48h)**
• Only if <3% remaining
• Reduce sodium 48h before
• Lower carbs (1g glycogen = 3g water)

**Phase 3: Post-weigh-in rehydration**
• 150% of weight lost
• 3-5h between weigh-in and fight ideal

**NEVER:**
• Cut water >24h
• Vomiting/diuretics/laxatives

**Reference:** Artioli et al. (2010)`
  },

  // 11. VEGANO (1 response)
  {
    keywords: ["vegano", "vegan", "vegetariano", "vegetarian", "dieta planta", "plant based", "dieta vegetal", "plant based athlete"],
    category: "vegan",
    es: `**Atleta Vegano: Guia Completa**

**Suplementacion OBLIGATORIA:**
• B12: 250-500 mcg/dia
• Vitamina D3: 2000-4000 UI/dia
• Omega-3 (alga): 250-500mg EPA+DHA
• Hierro: solo si deficiente

**Suplementacion RECOMENDADA:**
• Creatina: 5g/dia (niveles mas bajos → mayor beneficio!)
• Proteina guisante/arroz: para 1.8-2.7 g/kg

**Proteina:**
• Objetivo: 1.8-2.7 g/kg (10-20% mas que omnivoro)
• Leucina: 2.5-3g por comida
• Combinar: legumbres + cereales

**Referencia:** Rogerson D. (2017)`,
    en: `**Vegan Athlete: Complete Guide**

**MANDATORY supplements:**
• B12: 250-500 mcg/day
• Vitamin D3: 2000-4000 IU/day
• Omega-3 (algae): 250-500mg
• Iron: only if deficient

**RECOMMENDED:**
• Creatine: 5g/day (lower baseline → greater benefit!)
• Pea/rice protein: to reach 1.8-2.7 g/kg

**Protein:**
• Target: 1.8-2.7 g/kg
• Leucine: 2.5-3g per meal
• Combine: legumes + grains

**Reference:** Rogerson D. (2017)`
  },

  // 12. LESIONES (1 response)
  {
    keywords: ["lesion", "injury", "recuperacion lesion", "injury recovery", "cirugia", "surgery", "rehab", "rehabilitacion", "inflamacion", "inflammation"],
    category: "injury",
    es: `**Nutricion para Recuperacion de Lesiones**

**Fase 1: Inflamacion aguda (Dias 1-5)**
• NO suprimir inflamacion completamente
• Proteina: 2.0-2.5 g/kg
• Vitamina C: 1-2g/dia

**Fase 2: Proliferacion (Semanas 1-6)**
• Colageno hidrolizado: 10-15g/dia + Vit C 50mg
• Omega-3: 2-3g EPA+DHA
• Creatina: 5g/dia (preservar masa)

**Fase 3: Remodelacion (>6 semanas)**
• Retorno gradual

**Colageno: lo que funciona**
• 10-15g, 30-60 min PRE-rehab
• + Vitamina C 50mg

**Referencia:** Shaw G et al. (2017)`,
    en: `**Nutrition for Injury Recovery**

**Phase 1: Acute inflammation (Days 1-5)**
• DON'T completely suppress inflammation
• Protein: 2.0-2.5 g/kg
• Vitamin C: 1-2g/day

**Phase 2: Proliferation (Weeks 1-6)**
• Hydrolyzed collagen: 10-15g/day + Vit C 50mg
• Omega-3: 2-3g EPA+DHA
• Creatine: 5g/day

**Phase 3: Remodeling (>6 weeks)**
• Gradual return

**Collagen: what works**
• 10-15g, 30-60 min PRE-rehab
• + Vitamin C 50mg

**Reference:** Shaw G et al. (2017)`
  },

  // 13. JOVENES Y MASTERS (2 responses)
  {
    keywords: ["joven", "young athlete", "atleta joven", "adolescente", "adolescent", "teenager", "crecimiento", "growth", "deporte juvenil", "youth sport"],
    category: "youth",
    es: `**Nutricion para Atleta Joven**

**Principios:**
• PRIORIDAD: crecimiento + desarrollo + deporte
• NUNCA restriccion calorica (excepto obesidad medica)

**Requerimientos (mas altos que adultos):**
• Energia: TDEE + crecimiento (2500-4000+ kcal)
• Proteina: 1.6-2.0 g/kg (maximo!)
• Calcio: 1300mg/dia
• Hierro: 11mg (H) / 15mg (M)

**Suplementos:**
• SI: proteina basica, creatina (>18a), multivitaminico
• NO: quemadores, pre-workouts estimulantes, test boosters

**Referencia:** Desbrow B et al. (2014)`,
    en: `**Nutrition for Young Athletes**

**Principles:**
• PRIORITY: growth + development + sport
• NEVER caloric restriction

**Requirements (higher than adults):**
• Energy: TDEE + growth
• Protein: 1.6-2.0 g/kg (maximum!)
• Calcium: 1300mg/day
• Iron: 11mg (M) / 15mg (F)

**Supplements:**
• YES: basic protein, creatine (>18), multivitamin
• NO: fat burners, stimulant pre-workouts, test boosters

**Reference:** Desbrow B et al. (2014)`
  },
  {
    keywords: ["adulto mayor", "masters athlete", "mayor", "older adult", "envejecimiento", "aging", "anabolismo resistencia", "anabolic resistance", "sarcopenia"],
    category: "youth",
    es: `**Atleta Master (>40 anos)**

**Problema: Anabolismo de Resistencia**
• MPS responde MENOS a la misma proteina
• Umbral leucina: 2.5-3g (vs 2g jovenes)

**Solucion:**
• Proteina: 1.6-2.2 g/kg
• Dosis per meal: 0.4 g/kg (vs 0.25)
• Caseina nocturna: 30-40g
• HMB: 3g/dia
• Creatina: 5g/dia
• Vitamina D: 2000-4000 UI

**Entrenamiento:**
• Priorizar fuerza (mas importante que cardio)
• Proteina post-entreno INMEDIATA

**Referencia:** Moore DR et al. (2015)`,
    en: `**Masters Athletes (>40 years)**

**Problem: Anabolic Resistance**
• MPS responds LESS to same protein
• Leucine threshold: 2.5-3g (vs 2g young)

**Solution:**
• Protein: 1.6-2.2 g/kg
• Per meal: 0.4 g/kg (vs 0.25)
• Nighttime casein: 30-40g
• HMB: 3g/day
• Creatine: 5g/day
• Vitamin D: 2000-4000 IU

**Training:**
• Prioritize strength over cardio
• IMMEDIATE post-workout protein

**Reference:** Moore DR et al. (2015)`
  },

  // 14. HIPERTROFIA (1 response)
  {
    keywords: ["ganar musculo", "muscle gain", "hipertrofia", "hypertrophy", "volumen", "bulking", "mass", "masa muscular", "aumentar musculo", "build muscle"],
    category: "muscle_gain",
    es: `**Hipertrofia Muscular**

**Energia:**
• Superavit: +200 a +500 kcal sobre TDEE
• Max: +10-20% TDEE

**Proteina:**
• 1.6-2.2 g/kg (maximo beneficio a 2.2)
• Dosis per meal: 0.4 g/kg cada 3-4h

**Carbs:**
• 4-7 g/kg (segun volumen entreno)
• Post: 0.8-1.2 g/kg + proteina

**Grasas:**
• 0.8-1.0 g/kg minimo

**Suplementos:**
• Creatina: 5g/dia (+1-2kg masa)
• Cafeina: pre-entreno

**Tasa realista:**
• Principiante: 0.5-1 kg/mes
• Intermedio: 0.25-0.5 kg/mes
• Avanzado: 0.1-0.25 kg/mes

**Referencia:** Schoenfeld BJ. (2021)`,
    en: `**Muscle Hypertrophy**

**Energy:**
• Surplus: +200 to +500 kcal
• Max: +10-20% TDEE

**Protein:**
• 1.6-2.2 g/kg
• Per meal: 0.4 g/kg every 3-4h

**Carbs:**
• 4-7 g/kg
• Post: 0.8-1.2 g/kg + protein

**Fats:**
• 0.8-1.0 g/kg minimum

**Supplements:**
• Creatine: 5g/day (+1-2kg mass)
• Caffeine: pre-workout

**Realistic rate:**
• Beginner: 0.5-1 kg/month
• Intermediate: 0.25-0.5 kg/month
• Advanced: 0.1-0.25 kg/month

**Reference:** Schoenfeld BJ. (2021)`
  },

  // 15. PERIODIZACION (1 response)
  {
    keywords: ["periodizacion", "periodization", "nutricion periodizada", "periodized nutrition", "mesociclo", "macrociclo", "microciclo"],
    category: "periodization",
    es: `**Periodizacion Nutricional**

**GPP (Preparacion general):**
• Carbs: 4-5 g/kg
• Proteina: 1.8-2.0 g/kg

**Build (Especifico):**
• Carbs: 5-7 g/kg
• Proteina: 2.0-2.2 g/kg

**Peak (Pico):**
• Carbs: 6-8 g/kg
• Proteina: 1.8-2.0 g/kg

**Transition/Deload:**
• Carbs: 3-4 g/kg
• Proteina: 1.8-2.0 g/kg

**Monitoreo:**
• Peso diario (promedio semanal)
• %grasa ISAK cada 2-4 semanas
• Sueno y recuperacion subjetiva

**Referencia:** Stellingwerff T et al. (2019)`,
    en: `**Nutritional Periodization**

**GPP (General prep):**
• Carbs: 4-5 g/kg
• Protein: 1.8-2.0 g/kg

**Build:**
• Carbs: 5-7 g/kg
• Protein: 2.0-2.2 g/kg

**Peak:**
• Carbs: 6-8 g/kg
• Protein: 1.8-2.0 g/kg

**Transition/Deload:**
• Carbs: 3-4 g/kg
• Protein: 1.8-2.0 g/kg

**Monitoring:**
• Daily weight (weekly average)
• ISAK %fat every 2-4 weeks
• Sleep and recovery feeling

**Reference:** Stellingwerff T et al. (2019)`
  },

  // 16. SALUD INTESTINAL (1 response)
  {
    keywords: ["microbiota", "microbiome", "intestino", "gut", "probiotico", "probiotic", "fibra", "fiber", "digestion", "barrera intestinal", "gut barrier"],
    category: "gut",
    es: `**Salud Intestinal para Atletas**

**Impacto:**
• Microbiota produce ~50% dopamina, 95% serotonina
• Intensidad alta reduce flujo GI

**Estrategias:**
• Diversidad fibra: 30+ fuentes/semana
• Polifenoles: cacao, te verde, frutos rojos
• Probioticos: Lactobacillus + Bifidobacterium (10^9-10^10 UFC)

**Prebioticos:**
• Inulina: achicoria, alcachofa
• Resistant starch: arroz/papa frios

**Competencia:**
• 24-48h pre: REDUCIR fibra

**Referencia:** Mohr AE et al. (2020)`,
    en: `**Gut Health for Athletes**

**Impact:**
• Microbiota produces ~50% dopamine, 95% serotonin
• High intensity reduces GI blood flow

**Strategies:**
• Fiber diversity: 30+ sources/week
• Polyphenols: cacao, green tea, berries
• Probiotics: Lactobacillus + Bifidobacterium

**Prebiotics:**
• Inulin: chicory, artichoke
• Resistant starch: cooled rice/potato

**Competition:**
• 24-48h pre: REDUCE fiber

**Reference:** Mohr AE et al. (2020)`
  },

  // 17. DOPING (1 response)
  {
    keywords: ["dopaje", "doping", "wada", "prohibido", "banned", "contaminado", "contaminated supplement", "seguridad suplementos", "supplement safety", "certificado"],
    category: "doping",
    es: `**Suplementacion Segura: Evitar Dopaje Accidental**

**Riesgo:**
• 10-20% suplementos CONTAMINADOS
• Mas comun: quemadores, pre-workouts

**Certificaciones confiables:**
• NSF Certified for Sport
• Informed Sport
• BSCG Certified Drug Free

**Categorias WADA 2024:**
• SIEMPRE prohibido: EPO, AAS, GH, SARMs
• Prohibido en competencia: estimulantes, glucocorticoides
• Permitido: creatina, proteina, cafeina, vitaminas

**Precauciones:**
• NUNCA usar de paises sin regulacion
• Revisar lote en app "Informed Sport"

**Referencia:** WADA 2024; Maughan RJ. (2018)`,
    en: `**Safe Supplementation: Avoiding Accidental Doping**

**Risk:**
• 10-20% supplements CONTAMINATED
• Most common: fat burners, pre-workouts

**Reliable certifications:**
• NSF Certified for Sport
• Informed Sport
• BSCG Certified Drug Free

**WADA 2024 categories:**
• ALWAYS prohibited: EPO, AAS, GH, SARMs
• In-competition: stimulants, glucocorticoids
• Permitted: creatine, protein, caffeine, vitamins

**Precautions:**
• NEVER use from unregulated countries
• Check batch on "Informed Sport" app

**Reference:** WADA 2024; Maughan RJ. (2018)`
  },

  // 18. POR DEPORTE (3 responses)
  {
    keywords: ["corredor", "runner", "running", "maraton", "marathon", "carrera", "correr", "endurance", "resistencia"],
    category: "sport_specific",
    es: `**Nutricion para Corredores**

**Carbs:**
• <1h/dia: 4-5 g/kg
• 1-2h/dia: 5-7 g/kg
• >2h/dia: 7-10 g/kg
• Pre-maraton: 10-12 g/kg

**Proteina:** 1.4-1.8 g/kg

**Hierro:**
• Foot-strike hemolisis = perdida
• Ferritina >50 ng/mL objetivo
• Test cada 6 meses

**Intra-maraton:**
• 30-60g carbs/h
• Hiponatremia = riesgo real

**Referencia:** Burke LM. (2007)`,
    en: `**Nutrition for Runners**

**Carbs:**
• <1h/day: 4-5 g/kg
• 1-2h/day: 5-7 g/kg
• >2h/day: 7-10 g/kg
• Pre-marathon: 10-12 g/kg

**Protein:** 1.4-1.8 g/kg

**Iron:**
• Foot-strike hemolysis
• Ferritin >50 ng/mL target
• Test every 6 months

**Intra-marathon:**
• 30-60g carbs/h
• Hyponatremia = real risk

**Reference:** Burke LM. (2007)`
  },
  {
    keywords: ["halterofilia", "weightlifting", "powerlifting", "fuerza", "strength", "levantamiento", "olympic lifting", "crossfit"],
    category: "sport_specific",
    es: `**Nutricion para Halterofilia/Fuerza**

**Carbs:**
• Volumen: 4-6 g/kg
• Intensidad/pico: 3-5 g/kg
• Pre: 1-2 g/kg 1-2h antes

**Proteina:**
• 1.8-2.4 g/kg
• Dosis: 0.4-0.5 g/kg per meal
• Caseina nocturna: 30-40g

**Suplementos:**
• Creatina: 5g/dia (REQUERIDO)
• Cafeina: 3-6 mg/kg pre-comp
• Beta-alanina: para sets 1-4 min

**Corte peso:**
• Max 1-1.5% peso/semana
• Proteina: 2.4-3.1 g/kg en deficit

**Referencia:** Helms et al. (2014)`,
    en: `**Nutrition for Weightlifting/Strength**

**Carbs:**
• Volume: 4-6 g/kg
• Peak: 3-5 g/kg
• Pre: 1-2 g/kg 1-2h before

**Protein:**
• 1.8-2.4 g/kg
• Per meal: 0.4-0.5 g/kg
• Nighttime casein: 30-40g

**Supplements:**
• Creatine: 5g/day (REQUIRED)
• Caffeine: 3-6 mg/kg pre-comp
• Beta-alanine: 1-4 min sets

**Weight cut:**
• Max 1-1.5% BW/week
• Protein: 2.4-3.1 g/kg in deficit

**Reference:** Helms et al. (2014)`
  },
  {
    keywords: ["futbol", "soccer", "football", "baloncesto", "basketball", "deporte equipo", "team sport", "intermitente"],
    category: "sport_specific",
    es: `**Nutricion para Deportes de Equipo**

**Carbs:**
• Entrenamiento: 5-7 g/kg
• Dia partido: 6-8 g/kg
• Medio tiempo: 30g carbs

**Proteina:** 1.6-2.0 g/kg

**Hidratacion:**
• Pre: 5-7 ml/kg 2-4h antes
• >30°C: bebida con sodio + carbs

**Suplementos:**
• Cafeina: 3 mg/kg 60 min pre
• Creatina: 5g/dia (sprint recovery)

**Periodizacion:**
• Pretemporada: 6-8 g/kg
• Temporada: 5-7 g/kg
• Entre temporadas: 4-5 g/kg

**Referencia:** Collins J et al. UEFA (2021)`,
    en: `**Nutrition for Team Sports**

**Carbs:**
• Training: 5-7 g/kg
• Match day: 6-8 g/kg
• Halftime: 30g carbs

**Protein:** 1.6-2.0 g/kg

**Hydration:**
• Pre: 5-7 ml/kg 2-4h before
• >30°C: drink with sodium + carbs

**Supplements:**
• Caffeine: 3 mg/kg 60 min pre
• Creatine: 5g/day

**Periodization:**
• Pre-season: 6-8 g/kg
• Season: 5-7 g/kg
• Off-season: 4-5 g/kg

**Reference:** Collins J et al. UEFA (2021)`
  },

  // 19. COGNITIVO (1 response)
  {
    keywords: ["mente", "mental", "cognitivo", "cognitive", "focus", "enfoque", "nootropico", "nootropic", "concentracion", "concentration", "estres", "stress"],
    category: "mental",
    es: `**Nutricion para Rendimiento Cognitivo**

**Carbs cerebrales:**
• Cerebro usa ~120g glucosa/dia
• <100g carbs/dia = cognicion reducida

**Cafeina (nootropico #1):**
• 1-3 mg/kg: alerta sin ansiedad
• 3-6 mg/kg: maximo beneficio

**L-teanina:**
• 100-200mg + cafeina = calma enfocada
• Ratio ideal: 1:2 teanina:cafeina

**Omega-3 (DHA):**
• DHA = 40% peso cerebral
• 1-2g DHA/dia

**Hidratacion cerebral:**
• 1-2% deshidratacion = deterioro cognitivo

**Referencia:** Rhee et al. (2021)`,
    en: `**Nutrition for Cognitive Performance**

**Brain carbs:**
• Brain uses ~120g glucose/day
• <100g carbs/day = reduced cognition

**Caffeine (#1 nootropic):**
• 1-3 mg/kg: alert without anxiety
• 3-6 mg/kg: maximum benefit

**L-theanine:**
• 100-200mg + caffeine = calm focus
• Ideal ratio: 1:2 theanine:caffeine

**Omega-3 (DHA):**
• DHA = 40% of brain weight
• 1-2g DHA/day

**Brain hydration:**
• 1-2% dehydration = cognitive decline

**Reference:** Rhee et al. (2021)`
  },

  // 20. GENERAL (2 responses)
  {
    keywords: ["ejemplo comida", "meal example", "menu", "plan alimenticio", "meal plan", "que deberia comer", "what should i eat", "dieta tipo"],
    category: "general",
    es: `**Ejemplo Plan Alimenticio (75kg, Fuerza)**

**Desayuno (7:00):**
• 3 huevos + 80g avena + platano + cafe
• P:35g C:75g F:20g

**Snack (10:00):**
• 200g yogur griego + 30g almendras
• P:20g C:25g F:18g

**Comida (14:00):**
• 200g pechuga + 150g arroz + verduras
• P:55g C:60g F:15g

**Post-entreno (18:00):**
• 40g whey + 2 platanos
• P:45g C:70g F:2g

**Cena (21:00):**
• 200g salmon + 200g papa + ensalada
• P:45g C:40g F:25g

**Pre-sueno (22:30):**
• 35g caseina
• P:30g

**TOTAL:** P:230g (3.1g/kg) | C:272g | F:81g | ~2850 kcal

**Referencia:** ISSN 2022`,
    en: `**Example Meal Plan (75kg, Strength)**

**Breakfast (7:00):**
• 3 eggs + 80g oats + banana + coffee
• P:35g C:75g F:20g

**Snack (10:00):**
• 200g Greek yogurt + 30g almonds
• P:20g C:25g F:18g

**Lunch (14:00):**
• 200g chicken + 150g rice + vegetables
• P:55g C:60g F:15g

**Post-workout (18:00):**
• 40g whey + 2 bananas
• P:45g C:70g F:2g

**Dinner (21:00):**
• 200g salmon + 200g potato + salad
• P:45g C:40g F:25g

**Pre-sleep (22:30):**
• 35g casein
• P:30g

**TOTAL:** P:230g (3.1g/kg) | C:272g | F:81g | ~2850 kcal

**Reference:** ISSN 2022`
  },
  {
    keywords: ["gracias", "thank", "adios", "bye", "hola", "hello", "buenos dias", "good morning", "buenas tardes", "good afternoon", "que tal", "how are you"],
    category: "general",
    es: `¡Hola! Soy tu AI Coach Nutricional de ANTHROSCOPE PRO.

Puedo ayudarte con:
• Proteina, carbs, grasas
• Suplementos (creatina, cafeina, etc.)
• Hidratacion
• Pre/post entreno
• Perdida de grasa / Hipertrofia
• Atletas femeninas / RED-S
• Vegano / Sueno / Competencia

Ejemplos:
- "¿Cuanta proteina necesito?"
- "¿Como hidratarme en maraton?"
- "¿La creatina es segura?"

Todas mis respuestas basadas en ISSN, ACSM, IOC 2018-2024.`,
    en: `Hello! I'm your AI Nutrition Coach from ANTHROSCOPE PRO.

I can help with:
• Protein, carbs, fats
• Supplements (creatine, caffeine, etc.)
• Hydration
• Pre/post workout
• Fat loss / Hypertrophy
• Female athletes / RED-S
• Vegan / Sleep / Competition

Examples:
- "How much protein do I need?"
- "How to hydrate for a marathon?"
- "Is creatine safe?"

All responses based on ISSN, ACSM, IOC 2018-2024.`
  },
];

export function findBestDemoResponse(question: string, lang: "es" | "en"): string {
  const lowerQ = question.toLowerCase().trim();
  
  let bestMatch: DemoResponse | null = null;
  let bestScore = 0;
  
  for (const response of DEMO_RESPONSES) {
    let score = 0;
    for (const keyword of response.keywords) {
      const lowerKeyword = keyword.toLowerCase();
      if (lowerQ === lowerKeyword) {
        score += 100;
      } else if (lowerQ.includes(lowerKeyword)) {
        score += 10 * lowerKeyword.length;
      } else {
        const keywordWords = lowerKeyword.split(/\s+/);
        for (const word of keywordWords) {
          if (word.length > 2 && lowerQ.includes(word)) {
            score += word.length;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = response;
    }
  }
  
  if (bestMatch && bestScore >= 5) {
    return lang === "en" ? bestMatch.en : bestMatch.es;
  }
  
  return lang === "en" 
    ? `**Analysis:** Based on evidence (ACSM, ISSN, IOC), consult a sports nutritionist for personalized advice on "${question.substring(0, 60)}...". General guidance: Protein 1.6-2.2 g/kg, Carbs 4-7 g/kg, Fats 0.8-1.0 g/kg, Hydration 35-40 ml/kg.`
    : `**Analisis:** Basado en evidencia (ACSM, ISSN, IOC), consulta a un nutricionista deportivo para "${question.substring(0, 60)}...". Orientacion general: Proteina 1.6-2.2 g/kg, Carbs 4-7 g/kg, Grasas 0.8-1.0 g/kg, Hidratacion 35-40 ml/kg.`;
}

export function getDemoResponseCount(): number {
  return DEMO_RESPONSES.length;
}

export function getDemoCategories(): string[] {
  return [...new Set(DEMO_RESPONSES.map(r => r.category))];
}
