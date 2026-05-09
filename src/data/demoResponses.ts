// ============================================================
// ANTHROSCOPE PRO — AI Coach Demo Responses
// 100+ evidence-based nutrition responses (ES/EN)
// References: ISSN, ACSM, IOC, AND, SCAN
// ============================================================

export interface DemoResponse {
  keywords: string[];      // Keywords in ES and EN for matching
  category: string;
  es: string;              // Spanish response
  en: string;              // English response
}

export const DEMO_RESPONSES: DemoResponse[] = [
  // ═══════════════════════════════════════════════════════════
  // 1. PROTEÍNA / PROTEIN (10 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['proteina', 'protein', 'cuanta proteina', 'how much protein', 'gramos proteina', 'protein grams', 'requerimiento proteico', 'protein intake'],
    category: 'protein',
    es: `**Requerimiento Proteico para Atletas — Basado en Evidencea**

**Rangos por g/kg/día (ISSN 2022):**
• Sedentario general: 0.8 g/kg
• Atleta resistencia: 1.2–1.4 g/kg (entrenamiento) / 1.6–1.8 g/kg (periodo intenso)
• Atleta fuerza/potencia: 1.6–2.2 g/kg
• Fase hipertrófica máxima: 2.2–2.4 g/kg (mayor no es mejor)
• Atleta master (>40 años): 1.6–2.0 g/kg (anabolismo resistencia + MPS)
• Pérdida de grasa + mantener músculo: 2.3–3.1 g/kg

**Timing óptimo:**
• Dosis per meal: 0.25–0.40 g/kg (máxima estimulación MPS)
• Leucina threshold: 2–3g por comida para activar mTOR
• Frecuencia: 4–5 ingestas distribuidas cada 3–4h
• Post-entreno: 20–40g dentro de las primeras 2h (ventana extendida)

**Calidad:**
• PDCAAS/DIAAS: Suero > Caseína > Huevo > Leche > Carne > Soja > Leguminosas
• Combinar fuentes vegetales para perfil aminoacídico completo

**Referencia:** Jäger et al. ISSN Position Stand: Protein & Exercise (2022), J Int Soc Sports Nutr`,
    en: `**Protein Requirements for Athletes — Evidence-Based**

**Ranges in g/kg/day (ISSN 2022):**
• General sedentary: 0.8 g/kg
• Endurance athletes: 1.2–1.4 g/kg (training) / 1.6–1.8 g/kg (intense period)
• Strength/power athletes: 1.6–2.2 g/kg
• Maximum hypertrophy phase: 2.2–2.4 g/kg (more is not better)
• Masters athletes (>40y): 1.6–2.0 g/kg (anabolic resistance + MPS)
• Fat loss + muscle retention: 2.3–3.1 g/kg

**Optimal timing:**
• Per meal dose: 0.25–0.40 g/kg (max MPS stimulation)
• Leucine threshold: 2–3g per meal to trigger mTOR
• Frequency: 4–5 feedings every 3–4h
• Post-workout: 20–40g within first 2h (extended window)

**Quality:**
• PDCAAS/DIAAS: Whey > Casein > Egg > Milk > Meat > Soy > Legumes
• Combine plant sources for complete amino acid profile

**Reference:** Jäger et al. ISSN Position Stand: Protein & Exercise (2022)`
  },
  {
    keywords: ['proteina post', 'post workout protein', 'proteina despues', 'protein after workout', 'ventana anabolica', 'anabolic window', ' cuando tomar proteina'],
    category: 'protein',
    es: `**Proteína Post-Entreno: La "Ventana Anabólica" Actualizada**

**Lo que dice la ciencia actual (ISSN 2017, Schoenfeld 2018):**
• La ventana es MUCHO más amplia de lo que se creía: 4–6h post-entreno
• Lo más importante: proteína total diaria > timing exacto
• Si entrenaste en ayunas → prioriza proteína dentro de 1–2h
• Si comiste 1–2h antes → la ventana se extiende

**Dosis óptima post-entreno:**
• 20g proteína completa (suero/huevo) para mayoría
• 40g si eres >80kg o buscas máxima hipertrofia
• Incluir 2–3g leucina (trigger mTOR)
• Combinar con 0.5–1g carbohidratos/kg si entrenamiento glycogen-depleting

**Mejores fuentes post-entreno:**
1. Whey isolate (rápida digestión, alto leucina)
2. Huevos enteros (whole eggs > solo claras para MPS — study 2017)
3. Carne magra + carbohidrato

**Referencia:** Schoenfeld et al. The Mechanisms of Muscle Hypertrophy (2010); ISSN Stand (2017)`,
    en: `**Post-Workout Protein: The Updated "Anabolic Window"**

**What current science says (ISSN 2017, Schoenfeld 2018):**
• The window is MUCH wider than believed: 4–6h post-workout
• Most important: total daily protein > exact timing
• If trained fasted → prioritize protein within 1–2h
• If ate 1–2h before → window extends

**Optimal post-workout dose:**
• 20g complete protein (whey/egg) for most
• 40g if >80kg or maximum hypertrophy goal
• Include 2–3g leucine (mTOR trigger)
• Combine with 0.5–1g carbs/kg if glycogen-depleting training

**Best post-workout sources:**
1. Whey isolate (fast digestion, high leucine)
2. Whole eggs (whole eggs > whites for MPS — 2017 study)
3. Lean meat + carbohydrate

**Reference:** Schoenfeld et al. (2010); ISSN Stand (2017)`
  },
  {
    keywords: ['proteina antes dormir', 'protein before bed', 'caseina', 'casein', 'proteina nocturna', 'nighttime protein'],
    category: 'protein',
    es: `**Proteína Nocturna: Caseína vs Suero**

**Evidencea clave (Trommelen 2016, Snijders 2015):**
• 30–40g caseína antes de dormir (30 min pre-sueño) aumenta MPS nocturna en ~22%
• Caseína micelar: digestión lenta (7–8h) = aminoácidos durante toda la noche
• Suero (rápido) no es ideal pre-sueño — se absorbe muy rápido
• Huevos o yogur griego también funcionan (proteína de digestión media-lenta)

**Protocolo recomendado:**
• 30–40g caseína micelar en 200–300ml agua/leche
• Timing: 30 min antes de acostarse
• Sin carbohidratos adicionales (no interrumpen el sueño)
• Consistencia diaria > dosis ocasional

**Poblaciones con mayor beneficio:**
• Atletas en fase de hipertrofia
• Adultos mayores (anabolismo resistencia)
• Atletas en déficit calórico (preservar músculo)

**Referencia:** Snijders et al. Protein ingestion before sleep increases muscle mass (2015), J Nutr`,
    en: `**Nighttime Protein: Casein vs Whey**

**Key evidence (Trommelen 2016, Snijders 2015):**
• 30–40g casein before bed (30 min pre-sleep) increases overnight MPS by ~22%
• Micellar casein: slow digestion (7–8h) = amino acids throughout night
• Whey (fast) is not ideal pre-sleep — absorbs too quickly
• Eggs or Greek yogurt also work (medium-slow digestion protein)

**Recommended protocol:**
• 30–40g micellar casein in 200–300ml water/milk
• Timing: 30 min before bed
• No added carbohydrates (don't interrupt sleep)
• Daily consistency > occasional dosing

**Populations with greatest benefit:**
• Athletes in hypertrophy phase
• Older adults (anabolic resistance)
• Athletes in caloric deficit (preserve muscle)

**Reference:** Snijders et al. (2015), J Nutr`
  },
  {
    keywords: ['proteina vegetal', 'plant protein', 'proteina vegana', 'vegan protein', 'combinar proteinas vegetales', 'protein combining'],
    category: 'protein',
    es: `**Proteína Vegetal para Atletas: Guía Completa**

**El mito de "combinar" (Myth busting):**
• NO necesitas combinar en CADA comida — el cuerpo tiene pool de aminoácidos
• SÍ necesitas variedad a lo largo del día para perfil completo
• Objetivo: 10–20% MÁS proteína total que omnívoro (menor digestibilidad)

**Diana ISSN para veganos:**
• Atleta fuerza: 1.8–2.7 g/kg (vs 1.6–2.2 omnívoro)
• Atleta resistencia: 1.4–1.8 g/kg
• Leucina: asegurar 2.5–3g por comida (crítico para MPS)

**Top fuentes vegetales (g proteína / 100g):**
• Seitán: 75g (pero bajo lisina)
• Tempeh/tofu: 12–20g (completo)
• Lentejas cocidas: 9g
• Garbanzos: 9g
• Edamame: 11g
• Proteína de guisante (powder): 80g, alto leucina
• Proteína de arroz + guisante: perfil completo (complementarias)
• Nutritional yeast: 50g (completo B12 fortificado)

**Tip:** Suplementar B12 (2.4–2.8 mcg/día), creatina (5g/día), y considerar leucina adicional.

**Referencia:** Rogerson H. Vegan diets for athletes (2017), J Int Soc Sports Nutr`,
    en: `**Plant Protein for Athletes: Complete Guide**

**The "combining" myth (busted):**
• You DON'T need to combine at EVERY meal — body has amino acid pool
• You DO need variety throughout the day for complete profile
• Target: 10–20% MORE total protein than omnivore (lower digestibility)

**ISSN targets for vegans:**
• Strength athletes: 1.8–2.7 g/kg (vs 1.6–2.2 omnivore)
• Endurance athletes: 1.4–1.8 g/kg
• Leucine: ensure 2.5–3g per meal (critical for MPS)

**Top plant sources (g protein / 100g):**
• Seitan: 75g (but low lysine)
• Tempeh/tofu: 12–20g (complete)
• Cooked lentils: 9g
• Chickpeas: 9g
• Edamame: 11g
• Pea protein (powder): 80g, high leucine
• Rice + pea protein: complete profile (complementary)
• Nutritional yeast: 50g (complete, B12 fortified)

**Tip:** Supplement B12 (2.4–2.8 mcg/day), creatine (5g/day), and consider additional leucine.

**Reference:** Rogerson H. (2017), J Int Soc Sports Nutr`
  },
  {
    keywords: ['leucina', 'leucine', 'bcaa', 'aminoacidos esenciales', 'eaas', 'essential amino acids', 'aminoacidos ramificados'],
    category: 'protein',
    es: `**Leucina, BCAA y EAA: Lo que Realmente Funciona**

**Jerarquía de evidencea:**
Proteína completa > EAA > Leucina sola > BCAA

**Por qué los BCAA NO valen la pena (ISSN 2022):**
• Si ya consumes suficiente proteína (1.6–2.2 g/kg), los BCAA añaden CERO beneficio
• Los BCAA sin los otros 6 EAA pueden INHIBIR MPS (via amino acid imbalance)
• Meta-análisis (Wolfe 2017): BCAA no aumentan hipertrofía vs placebo

**Leucina: el trigger mTOR**
• Threshold: 2–3g por comida para máxima MPS
• Whey isolate: ~2.5g leucina por 25g scoop
• Guisante protein: ~1.8g por 25g
• Huevo entero: ~0.5g por huevo

**Cuándo SÍ usar leucina/EAA:**
• Atletas veganos con bajo intake de leucina
• Adultos mayores (anabolismo resistencia → necesitan MÁS leucina)
• Entrenamientos en ayuno (10g EAA pre-workout)
• Comidas bajas en proteína (añadir leucina para compensar)

**Dosis EAA óptima:**
• 10–12g EAA (con ~3g leucina) = equivalente a ~25g proteína completa

**Referencia:** Wolfe RR. Branched-chain amino acids and muscle protein synthesis (2017), J Int Soc Sports Nutr`,
    en: `**Leucine, BCAA and EAA: What Actually Works**

**Evidence hierarchy:**
Complete protein > EAA > Leucine alone > BCAA

**Why BCAAs are NOT worth it (ISSN 2022):**
• If you already consume enough protein (1.6–2.2 g/kg), BCAAs add ZERO benefit
• BCAAs without the other 6 EAAs can INHIBIT MPS (via amino acid imbalance)
• Meta-analysis (Wolfe 2017): BCAAs don't increase hypertrophy vs placebo

**Leucine: the mTOR trigger**
• Threshold: 2–3g per meal for maximum MPS
• Whey isolate: ~2.5g leucine per 25g scoop
• Pea protein: ~1.8g per 25g
• Whole egg: ~0.5g per egg

**When EAA/leucine DOES make sense:**
• Vegan athletes with low leucine intake
• Older adults (anabolic resistance → need MORE leucine)
• Fasted training (10g EAA pre-workout)
• Low-protein meals (add leucine to compensate)

**Optimal EAA dose:**
• 10–12g EAA (with ~3g leucine) = equivalent to ~25g complete protein

**Reference:** Wolfe RR. (2017), J Int Soc Sports Nutr`
  },

  // ═══════════════════════════════════════════════════════════
  // 2. PÉRDIDA DE GRASA / FAT LOSS (8 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['perder grasa', 'lose fat', 'deficit calorico', 'caloric deficit', 'quemar grasa', 'fat loss', 'bajar de peso', 'cut', 'cutting', 'definicion'],
    category: 'fat_loss',
    es: `**Estrategia de Pérdida de Grasa para Atletas — Basado en Evidencea**

**El déficit calórico:**
• Déficit moderado: -300 a -500 kcal del TDEE (máx 0.5–1% peso corporal/semana)
• Déficit agresivo: -750 a -1000 kcal (SOLO para atletas con >15% grasa hombre / >22% mujer)
• Mínimo seguro: NUNCA bajar de BMR (metabolismo basal)

**Proteína: tu mejor aliado en déficit**
• 2.3–3.1 g/kg peso corporal (Helms 2014 — mayor rango que en mantenimiento)
• Preserva masa magra, saciedad, y TEF (efecto térmico)

**Distribución de macros en déficit:**
• Proteína: 30–35% calorías (2.3–3.1 g/kg)
• Grasas: 20–25% calorías (0.6–0.8 g/kg mínimo para hormonalidad)
• Carbohidratos: resto (priorizar alrededor del entrenamiento)

**Timing para preservar rendimiento:**
• Carbohidratos pre-entreno: 1–2 g/kg 1–3h antes
• Carbohidratos intra-entreno (si >60 min): 30–60g/h
• Proteína post: 0.3–0.5 g/kg

**Señales de déficit excesivo:**
• Pérdida de fuerza >10%, irritabilidad, sueño perturbado, libido baja

**Referencia:** Helms et al. Evidence-based recommendations for natural bodybuilding (2014), JISSN`,
    en: `**Fat Loss Strategy for Athletes — Evidence-Based**

**The caloric deficit:**
• Moderate deficit: -300 to -500 kcal from TDEE (max 0.5–1% body weight/week)
• Aggressive deficit: -750 to -1000 kcal (ONLY for athletes with >15% fat male / >22% female)
• Safe minimum: NEVER drop below BMR

**Protein: your best ally in deficit**
• 2.3–3.1 g/kg body weight (Helms 2014 — higher range than maintenance)
• Preserves lean mass, satiety, and TEF (thermic effect)

**Macro distribution in deficit:**
• Protein: 30–35% calories (2.3–3.1 g/kg)
• Fats: 20–25% calories (0.6–0.8 g/kg minimum for hormones)
• Carbohydrates: remainder (prioritize around training)

**Timing to preserve performance:**
• Pre-workout carbs: 1–2 g/kg 1–3h before
• Intra-workout carbs (if >60 min): 30–60g/h
• Post protein: 0.3–0.5 g/kg

**Signs of excessive deficit:**
• Strength loss >10%, irritability, disturbed sleep, low libido

**Reference:** Helms et al. (2014), JISSN`
  },
  {
    keywords: ['metabolismo', 'metabolism', 'metabolismo lento', 'slow metabolism', 'tdee', 'gasto energetico', 'energy expenditure', 'ree', 'rmr'],
    category: 'fat_loss',
    es: `**Metabolismo y Gasto Energético Total (TDEE)**

**Componentes del TDEE:**
• REE/RMR (60–75%): metabolismo en reposo
• TEF (8–15%): efecto térmico de los alimentos
• NEAT (15–50%): actividad no ejercicio (¡más variable!)
• EAT (10–30%): ejercicio programado

**Ecuaciones para estimar RMR (validadas):**
• Harris-Benedict (más antigua, sobrestima ~5%)
• Mifflin-St Jeor (más precisa general)
• Cunningham (mejor para atletas con %grasa conocido): 500 + 22 × masa magra (kg)
• De Lorenzo (específica atletas): útil para población entrenada

**Adaptación metabólica (diet break refeed):**
• Después de 8–12 semanas en déficit, el TDEE baja 10–15%
• Solución: diet break 1–2 semanas en mantenimiento cada 8–12 semanas
• Refeed days 1–2x/semana (carbohidratos +100-200g) ayudan leptina/psicológico

**Cosas que "aceleran" metabolismo (evidencea limitada):**
• Café/CAF: +3–11% TDEE (dosis dependiente, tolerancia)
• Capsaicina: mínimo efecto clínico
• NEAT: caminar 10k pasos/día = +200–400 kcal

**Referencia:** Rosenbaum & Leibel. Adaptive thermogenesis in humans (2010), Int J Obes`,
    en: `**Metabolism and Total Daily Energy Expenditure (TDEE)**

**Components of TDEE:**
• REE/RMR (60–75%): resting metabolism
• TEF (8–15%): thermic effect of food
• NEAT (15–50%): non-exercise activity (most variable!)
• EAT (10–30%): programmed exercise

**Equations to estimate RMR (validated):**
• Harris-Benedict (older, overestimates ~5%)
• Mifflin-St Jeor (more accurate general)
• Cunningham (better for athletes with known %fat): 500 + 22 × fat-free mass (kg)
• De Lorenzo (athlete-specific): useful for trained population

**Metabolic adaptation (diet break/refeed):**
• After 8–12 weeks in deficit, TDEE drops 10–15%
• Solution: diet break 1–2 weeks at maintenance every 8–12 weeks
• Refeed days 1–2x/week (+100-200g carbs) help leptin/psychology

**Things that "boost" metabolism (limited evidence):**
• Coffee/CAF: +3–11% TDEE (dose-dependent, tolerance)
• Capsaicin: minimal clinical effect
• NEAT: walking 10k steps/day = +200–400 kcal

**Reference:** Rosenbaum & Leibel. (2010), Int J Obes`
  },
  {
    keywords: ['ciclado carbohidratos', 'carb cycling', 'ciclar carbohidratos', 'high carb low carb', 'dias altos bajos'],
    category: 'fat_loss',
    es: `**Ciclado de Carbohidratos para Atletas**

**Protocolos evidence-based:**

**Opción A: Días de entrenamiento vs descanso**
• Días entreno (alto): 4–6 g/kg carbohidratos
• Días descanso (bajo): 2–3 g/kg
• Proteína constante: 2.0–2.4 g/kg
• Grasas inversas: bajo en días entreno, alto en descanso

**Opción B: Refeed estructurado (Helms 2015)**
• 5–6 días bajo: 1–2 g/kg carbs
• 1–2 días alto: 4–6 g/kg (días de entrenamiento grande)
• Beneficio: leptina, glicógeno, psicológico, T3

**Opción C: Ciclado dentro del día (nutrient timing)**
• Bajo carb mañana, alto carb alrededor entrenamiento
• Útil para pérdida de grasa + mantener rendimiento

**Quién se beneficia más:**
• Atletas en déficit prolongado (pre-competencia)
• Deportes de peso (lucha, halterofilia, BJJ)
• Personas con buena sensibilidad a insulina
• NO recomendado: principiantes o atletas en volumen

**Referencias:** Helms et al. (2015); Murray & Rosenbloom. (2018)`,
    en: `**Carbohydrate Cycling for Athletes**

**Evidence-based protocols:**

**Option A: Training vs rest days**
• Training days (high): 4–6 g/kg carbs
• Rest days (low): 2–3 g/kg
• Constant protein: 2.0–2.4 g/kg
• Inverse fats: low on training days, high on rest days

**Option B: Structured refeed (Helms 2015)**
• 5–6 days low: 1–2 g/kg carbs
• 1–2 days high: 4–6 g/kg (big training days)
• Benefit: leptin, glycogen, psychology, T3

**Option C: Within-day cycling (nutrient timing)**
• Low carb morning, high carb around training
• Useful for fat loss + maintaining performance

**Who benefits most:**
• Athletes in prolonged deficit (pre-competition)
• Weight-class sports (wrestling, weightlifting, BJJ)
• People with good insulin sensitivity
• NOT recommended: beginners or athletes in mass phase

**References:** Helms et al. (2015); Murray & Rosenbloom. (2018)`
  },
  {
    keywords: ['diet break', 'pausa dieta', 'refeed', 'refeed day', 'dia alto', 'high day', 'leptina', 'reverse diet'],
    category: 'fat_loss',
    es: `**Diet Break y Refeed Days: Cuándo y Cómo**

**Diet Break (pausa completa 1–2 semanas):**
• Timing: cada 8–12 semanas de déficit o cuando se estanca 2+ semanas
• Calorías: mantenimiento TDEE (NO superávit)
• Macros: balanceados, sin restricciones extremas
• Beneficios: restaura leptina, T3, NEAT, motivación, llenar glicógeno

**Refeed Day (1–2 días/semana en déficit):**
• Carbohidratos: +100 a +200g sobre baseline (principalmente carbs)
• Grasas: bajar a 0.3 g/kg ese día
• Proteína: mantener constante
• Fuente: carbohidratos de bajo IG (arroz, avena, papa)
• Timing: días de entrenamiento más exigente

**Señales de que necesitas un diet break:**
• Estancamiento 2+ semanas a pesar de adherencia perfecta
• Fatiga crónica, irritabilidad, baja libido
• Sueño de mala calidad
• Pérdida de fuerza >10%
• Hambre insaciable

**Reverse Dieting (post-deficit):**
• Aumentar 50–100 kcal/semana desde el final del déficit
• Duración: 4–8 semanas hasta mantenimiento
• Previene rebound de grasa y daño metabólico

**Referencia:** Trexler et al. Metabolic adaptation to weight loss (2014), Obesity`,
    en: `**Diet Break and Refeed Days: When and How**

**Diet Break (full 1–2 week pause):**
• Timing: every 8–12 weeks of deficit or when stalled 2+ weeks
• Calories: maintenance TDEE (NO surplus)
• Macros: balanced, no extreme restrictions
• Benefits: restores leptin, T3, NEAT, motivation, refill glycogen

**Refeed Day (1–2 days/week in deficit):**
• Carbs: +100 to +200g above baseline (mostly carbs)
• Fats: drop to 0.3 g/kg that day
• Protein: keep constant
• Source: low GI carbs (rice, oats, potato)
• Timing: most demanding training days

**Signs you need a diet break:**
• Stalled 2+ weeks despite perfect adherence
• Chronic fatigue, irritability, low libido
• Poor sleep quality
• Strength loss >10%
• Insatiable hunger

**Reverse Dieting (post-deficit):**
• Increase 50–100 kcal/week from end of deficit
• Duration: 4–8 weeks until maintenance
• Prevents fat rebound and metabolic damage

**Reference:** Trexler et al. (2014), Obesity`
  },

  // ═══════════════════════════════════════════════════════════
  // 3. CARBOHIDRATOS / CARBOHYDRATES (6 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['carbohidratos', 'carbohydrates', 'carbs', 'cuantos carbohidratos', 'how many carbs', 'carga de carbohidratos', 'carb loading'],
    category: 'carbs',
    es: `**Carbohidratos para Atletas: Requerimientos por Deporte**

**Rangos de ingesta (ACSM/IOC 2018):**
• Sedentario: 3–5 g/kg
• Atleta fuerza/potencia: 4–7 g/kg
• Atleta resistencia (moderado): 5–7 g/kg
• Atleta resistencia (intenso >3h/día): 7–10 g/kg
• Deportes de equipo/intermitente: 5–7 g/kg
• Ultra-endurance: 8–12 g/kg

**Carga de carbohidratos clásica (para maratón/ultra):**
• 6 días pre-competencia: 8–12 g/kg
• Día competencia: 1–4 g/kg 1–4h antes (familiar)
• Reduce fibra y grasa 24–48h pre-competencia

**Periodización de carbohidratos ( nuevo paradigma):**
• "Train low, compete high": entrenar con bajo glycogen para adaptación
• "Sleep low": bajo carb post-entreno tarde, alto mañana
• CUIDADO: no más de 2–3x/semana "train low" — puede comprometer intensidad

**Timing peri-entreno:**
• Pre (1–3h): 1–2 g/kg de bajo/moderado IG
• Durante (>60–90 min): 30–90 g/h (maltodextrina, fructosa 2:1)
• Post (0–4h): 1–1.2 g/kg para reponer glycogen

**Referencia:** Burke LM. Re-examining high-dose CHO loading (2011), J Sports Sci`,
    en: `**Carbohydrates for Athletes: Requirements by Sport**

**Intake ranges (ACSM/IOC 2018):**
• Sedentary: 3–5 g/kg
• Strength/power athletes: 4–7 g/kg
• Endurance athletes (moderate): 5–7 g/kg
• Endurance athletes (intense >3h/day): 7–10 g/kg
• Team/intermittent sports: 5–7 g/kg
• Ultra-endurance: 8–12 g/kg

**Classic carb loading (marathon/ultra):**
• 6 days pre-competition: 8–12 g/kg
• Competition day: 1–4 g/kg 1–4h before (familiar)
• Reduce fiber and fat 24–48h pre-competition

**Carb periodization (new paradigm):**
• "Train low, compete high": train with low glycogen for adaptation
• "Sleep low": low carb post-evening workout, high morning
• CAUTION: no more than 2–3x/week "train low" — can compromise intensity

**Peri-workout timing:**
• Pre (1–3h): 1–2 g/kg low/moderate GI
• During (>60–90 min): 30–90 g/h (maltodextrin, fructose 2:1)
• Post (0–4h): 1–1.2 g/kg to replenish glycogen

**Reference:** Burke LM. (2011), J Sports Sci`
  },
  {
    keywords: ['carbohidratos durante ejercicio', 'carbs during exercise', 'intra workout carbs', 'maltodextrina', 'bebida deportiva', 'sports drink', 'durante entreno'],
    category: 'carbs',
    es: `**Carbohidratos DURANTE el Ejercicio: Protocolos**

**Cuándo son necesarios:**
• Entrenamiento >60–90 minutos
• Entrenamiento de alta intensidad >45 min
• Ambiente caluroso (>30°C)
• Múltiples sesiones el mismo día

**Dosis óptimas por hora (ACSM 2016):**
• <1h: agua o electrólitos suficiente (no requiere carbs)
• 1–2h: 30g/h de un solo transportador (glucosa/maltodextrina)
• 2–3h: 60g/h (múltiples transportadores 2:1 glucosa:fructosa)
• >3h: 90g/h (ratio 1:0.8 glucosa:fructosa optimizado)

**Múltiples transportadores (Importante!):**
• Glucosa sola: máx ~60g/h (SGLT1 saturado)
• Fructosa adicional: +30g/h vía GLUT5 (total 90g/h)
• Ratio optimizado: 1:0.8 a 2:1 glucosa:fructosa
• Productos comerciales: Maurten, SiS Beta Fuel, Precision

**Formato:**
• Líquido > sólido para alta intensidad
• Gel: 20–25g carbs por gel (tomar con agua)
• Barra: 20–40g (más lenta digestión)
• Casero: 60g maltodextrina + 30g fructosa en 500ml agua

**Práctica gastrointestinal:**
• ENTRENA tu gut: empezar con 30g/h, aumentar gradualmente
• NUNCA pruebes algo nuevo en competencia

**Referencia:** Jeukendrup AE. Training the Gut for Athletes (2017), Sports Med`,
    en: `**Carbohydrates DURING Exercise: Protocols**

**When they are needed:**
• Training >60–90 minutes
• High intensity training >45 min
• Hot environment (>30°C)
• Multiple sessions same day

**Optimal doses per hour (ACSM 2016):**
• <1h: water or electrolytes sufficient (no carbs needed)
• 1–2h: 30g/h single transporter (glucose/maltodextrin)
• 2–3h: 60g/h (multiple transporters 2:1 glucose:fructose)
• >3h: 90g/h (optimized 1:0.8 glucose:fructose ratio)

**Multiple transporters (Important!):**
• Glucose alone: max ~60g/h (SGLT1 saturated)
• Added fructose: +30g/h via GLUT5 (total 90g/h)
• Optimized ratio: 1:0.8 to 2:1 glucose:fructose
• Commercial products: Maurten, SiS Beta Fuel, Precision

**Format:**
• Liquid > solid for high intensity
• Gel: 20–25g carbs per gel (take with water)
• Bar: 20–40g (slower digestion)
• Homemade: 60g maltodextrin + 30g fructose in 500ml water

**Gut training:**
• TRAIN your gut: start with 30g/h, gradually increase
• NEVER try something new in competition

**Reference:** Jeukendrup AE. (2017), Sports Med`
  },

  // ═══════════════════════════════════════════════════════════
  // 4. GRASAS / FATS (4 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['grasas', 'fats', 'grasa saludable', 'healthy fats', 'lipidos', 'lipids', 'omega 3', 'omega-3', 'aceite pescado', 'fish oil'],
    category: 'fats',
    es: `**Grasas para Atletas: Guía Completa**

**Requerimiento mínimo (crítico!):**
• 0.6 g/kg/día: mínimo absoluto para salud hormonal
• 0.8–1.0 g/kg/día: óptimo para atletas
• <0.6 g/kg por >1 semana = baja testosterona, problemas celulares

**Distribución de tipos:**
• Monoinsaturadas (30–35% grasa total): aguacate, aceite oliva, almendras
• Poliinsaturadas (30–35%): omega-3, omega-6, nueces, semillas
• Saturadas (<20–25%): carne, huevos, coco (no eliminar completamente)
• Trans (<1%): evitar industrial

**Omega-3 (EPA/DHA):**
• Dosis evidenceada: 2–3g EPA+DHA combinados al día
• Fuente ideal: pescado graso 2–3x/semana (salmón, sardina, caballa)
• Suplemento: aceite de pescado o alga (vegano)
• Beneficios: antiinflamatorio, salud cardiovascular, posible MPS

**Timing:**
• Grasas RALENTIZAN digestión de proteína/carb
• Evitar grasas altas PRE-entreno (más lento vaciado gástrico)
• Grasas OK post-entreno y en comidas lejanas al entreno

**Referencia:** Thomas DT et al. Position of the Academy of Nutrition and Dietetics (2016), JAND`,
    en: `**Fats for Athletes: Complete Guide**

**Minimum requirement (critical!):**
• 0.6 g/kg/day: absolute minimum for hormonal health
• 0.8–1.0 g/kg/day: optimal for athletes
• <0.6 g/kg for >1 week = low testosterone, cellular issues

**Type distribution:**
• Monounsaturated (30–35% total fat): avocado, olive oil, almonds
• Polyunsaturated (30–35%): omega-3, omega-6, nuts, seeds
• Saturated (<20–25%): meat, eggs, coconut (don't eliminate completely)
• Trans (<1%): avoid industrial

**Omega-3 (EPA/DHA):**
• Evidence-based dose: 2–3g EPA+DHA combined daily
• Ideal source: fatty fish 2–3x/week (salmon, sardine, mackerel)
• Supplement: fish oil or algae (vegan)
• Benefits: anti-inflammatory, cardiovascular health, possible MPS

**Timing:**
• Fats SLOW digestion of protein/carb
• Avoid high fats PRE-workout (slower gastric emptying)
• Fats OK post-workout and in meals far from training

**Reference:** Thomas DT et al. (2016), JAND`
  },

  // ═══════════════════════════════════════════════════════════
  // 5. HIDRATACIÓN / HYDRATION (6 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['hidratacion', 'hydration', 'agua', 'water', 'sudor', 'sweat', 'electrolitos', 'electrolytes', 'sodio', 'sodium', 'deshidratacion', 'dehydration'],
    category: 'hydration',
    es: `**Protocolo de Hidratación Completo para Atletas**

**Test de pérdida de sudor (hazlo tú mismo):**
1. Pésate desnudo pre-entreno (ej: 75.0 kg)
2. Entrena 60 min, NO bebas nada
3. Pésate post-entreno desnudo (ej: 74.2 kg)
4. Pérdida = 0.8 kg = 800 ml/h

**Protocolo por fase:**

**Pre-entreno (2–4h antes):**
• 5–7 ml/kg (375–525 ml para 75kg)
• Orina debe ser pajiza/clara
• Evitar producir mucha orina (no exceso)

**Durante entreno:**
• Objetivo: perder <2% peso corporal
• Si pérdida = 800ml/h → beber 600–700ml/h (no reponer 100%)
• Si <1h + clima templado: agua suficiente
• Si >1h o caluroso: agua + electrólitos

**Post-entreno:**
• Reponer 150% del peso perdido (si perdiste 1kg → 1.5L)
• Con sodio: ayuda retención de líquido
• Timing: dentro de las 2–4h

**Referencia:** Sawka MN et al. ACSM Position Stand: Exercise & Fluid Replacement (2007)`,
    en: `**Complete Hydration Protocol for Athletes**

**Sweat loss test (do it yourself):**
1. Weigh naked pre-workout (e.g., 75.0 kg)
2. Train 60 min, drink NOTHING
3. Weigh naked post-workout (e.g., 74.2 kg)
4. Loss = 0.8 kg = 800 ml/h

**Protocol by phase:**

**Pre-workout (2–4h before):**
• 5–7 ml/kg (375–525 ml for 75kg)
• Urine should be straw/clear colored
• Avoid producing lots of urine (not excess)

**During workout:**
• Goal: lose <2% body weight
• If loss = 800ml/h → drink 600–700ml/h (don't replace 100%)
• If <1h + temperate: water sufficient
• If >1h or hot: water + electrolytes

**Post-workout:**
• Replace 150% of weight lost (if lost 1kg → 1.5L)
• With sodium: helps fluid retention
• Timing: within 2–4h

**Reference:** Sawka MN et al. ACSM Position Stand (2007)`
  },
  {
    keywords: ['sodio', 'sodium', 'sales', 'salt', 'electrolitos', 'electrolytes', 'bebida hidratante', 'hydration drink', 'sports drink', 'gatorade'],
    category: 'hydration',
    es: `**Electrolitos y Sodio para Atletas**

**Sodio: el electrólito crítico**
• Sudor promedio: 500–1000 mg sodio/L (altamente individual!)
• "Salty sweaters": >1000 mg/L (camisa blanca post-entreno)
• Bajo sodio + mucha agua = hiponatremia (peligrosa!)

**Dosis de sodio según duración:**
• <1h entreno: no necesario (reservas corporales)
• 1–2h: 300–600 mg/h
• >2h o caluroso: 500–1000 mg/h
• Ultra (>4h): 1000–2000 mg/h (algunos necesitan más)

**Bebidas deportivas comparación (por 500ml):**
• Gatorade: 110 mg sodio, 30g carbs — demasiado bajo en sodio para >2h
• Powerade: 100 mg sodio — similar
• Maurten 320: 200 mg sodio, 80g carbs — bueno para carbs, bajo sodio
• **Casera óptima:** 500ml agua + 60g maltodextrina + 30g fructosa + 500–1000mg sodio (sal/capsula)

**Magnesio y potasio:**
• Potasio: 150–250 mg/L (menos crítico que sodio)
• Magnesio: 50–100 mg/L (puede ayudar a calambres en algunos)

**Prueba de sudor:**
• Hacer test de peso pre/post para estimar necesidad
• Si pierdes >1.5kg/h → necesitas más sodio

**Referencia:** Baker LB. Sweating Rate and Sweat Sodium Concentration (2017), Sports Med`,
    en: `**Electrolytes and Sodium for Athletes**

**Sodium: the critical electrolyte**
• Average sweat: 500–1000 mg sodium/L (highly individual!)
• "Salty sweaters": >1000 mg/L (white shirt post-workout)
• Low sodium + lots of water = hyponatremia (dangerous!)

**Sodium doses by duration:**
• <1h workout: not needed (body reserves)
• 1–2h: 300–600 mg/h
• >2h or hot: 500–1000 mg/h
• Ultra (>4h): 1000–2000 mg/h (some need more)

**Sports drinks comparison (per 500ml):**
• Gatorade: 110 mg sodium, 30g carbs — too low sodium for >2h
• Powerade: 100 mg sodium — similar
• Maurten 320: 200 mg sodium, 80g carbs — good for carbs, low sodium
• **Optimal homemade:** 500ml water + 60g maltodextrin + 30g fructose + 500–1000mg sodium (salt/capsule)

**Magnesium and potassium:**
• Potassium: 150–250 mg/L (less critical than sodium)
• Magnesium: 50–100 mg/L (may help cramps in some)

**Sweat test:**
• Do pre/post weight test to estimate need
• If you lose >1.5kg/h → need more sodium

**Reference:** Baker LB. (2017), Sports Med`
  },

  // ═══════════════════════════════════════════════════════════
  // 6. SUPLEMENTOS / SUPPLEMENTS (15 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['creatina', 'creatine', 'monohidratada', 'monohydrate', 'creatina dosis', 'creatine loading', 'cargar creatina'],
    category: 'supplements',
    es: `**Creatina Monohidratada: El Suplemento #1 Evidenceado**

**Evidencea (ISSN 2021 — Position Stand):**
• Más estudios que CUALQUIER otro suplemento (1000+)
• Segura a largo plazo (hasta 5 años continuos monitoreados)
• NO daña riñones en personas sanas (meta-análisis 2018)
• NO es esteroide, NO es dopante (WADA legal)

**Protocolos:**

**Opción A: Carga (más rápido)**
• Días 1–5: 20g/día divididos en 4 tomas de 5g
• Día 6+: 3–5g/día mantenimiento
• Beneficio: saturación en 5–7 días

**Opción B: Sin carga (más cómodo)**
• Desde día 1: 3–5g/día continuo
• Saturación en 3–4 semanas (mismo resultado final)

**Beneficios documentados:**
• +5–15% fuerza máxima (1RM)
• +5–30% trabajo en sprint repetidos
• +1–2kg masa magra (retención agua intramuscular + MPS)
• Beneficios cognitivos (dosis igual, especialmente en veganos/vegetarianos)

**Quién se beneficia MENOS:**
• Personas con altos niveles basales (muy pocos)
• Respondedores "bajos" (~20–30% población)

**Forma:** Monohidratada micronizada (la más estudiada, barata, efectiva)

**Referencia:** Kreider et al. ISSN Position Stand: Safety & Efficacy of Creatine (2021)`,
    en: `**Creatine Monohydrate: The #1 Evidence-Based Supplement**

**Evidence (ISSN 2021 — Position Stand):**
• More studies than ANY other supplement (1000+)
• Safe long-term (up to 5 years continuous monitored)
• Does NOT damage kidneys in healthy people (2018 meta-analysis)
• NOT a steroid, NOT doping (WADA legal)

**Protocols:**

**Option A: Loading (faster)**
• Days 1–5: 20g/day divided in 4 doses of 5g
• Day 6+: 3–5g/day maintenance
• Benefit: saturation in 5–7 days

**Option B: No loading (more comfortable)**
• From day 1: 3–5g/day continuous
• Saturation in 3–4 weeks (same final result)

**Documented benefits:**
• +5–15% maximum strength (1RM)
• +5–30% work in repeated sprints
• +1–2kg lean mass (intramuscular water retention + MPS)
• Cognitive benefits (same dose, especially in vegans/vegetarians)

**Who benefits LESS:**
• People with high baseline levels (very few)
• "Low" responders (~20–30% of population)

**Form:** Micronized monohydrate (most studied, cheap, effective)

**Reference:** Kreider et al. ISSN Position Stand (2021)`
  },
  {
    keywords: ['cafeina', 'caffeine', 'pre entreno', 'pre workout', 'estimulante', 'stimulant', 'dosis cafeina', 'caffeine dose'],
    category: 'supplements',
    es: `**Cafeína para Rendimiento Deportivo (ISSN 2021)**

**Dosis óptima:**
• 3–6 mg/kg peso corporal, 30–60 min pre-ejercicio
• Ejemplo: 75kg → 225–450 mg (1–2 shots espresso)
• >9 mg/kg NO añade beneficio + aumenta efectos secundarios

**Beneficios documentados:**
• Reduce percepción de esfuerzo (RPE -5–6%)
• Mejora endurance 2–4%
• Mejora fuerza en algunos estudios (inconcluso)
• Mejora reacción y alerta
• Efecto ergogénico en ~90% personas

**Timing óptimo:**
• 30–60 min pre-entreno (pico en sangre)
• Duración efecto: 3–6h
• Evitar >6h antes de dormir (afecta sueño)

**Tolerancia y ciclado:**
• Se desarrolla tolerancia en 4–7 días de uso continuo
• Estrategia: usar solo días importantes o ciclar 4 semanas ON / 1 semana OFF
• Abstención 7–14 días restaura sensibilidad

**Formatos:**
• Anhidra (comprimido/polvo): más preciso
• Café: variable (80–200mg por taza)
• Café pre-entreno: cuidado con otros estimulantes combinados

**Efectos secundarios >6 mg/kg:**
• Taquicardia, ansiedad, GI distress, insomnio, temblores

**Referencia:** Goldstein et al. ISSN Position Stand: Caffeine & Performance (2021)`,
    en: `**Caffeine for Sports Performance (ISSN 2021)**

**Optimal dose:**
• 3–6 mg/kg body weight, 30–60 min pre-exercise
• Example: 75kg → 225–450 mg (1–2 shots espresso)
• >9 mg/kg adds NO benefit + increases side effects

**Documented benefits:**
• Reduces perceived exertion (RPE -5–6%)
• Improves endurance 2–4%
• Improves strength in some studies (inconclusive)
• Improves reaction and alertness
• Ergogenic effect in ~90% of people

**Optimal timing:**
• 30–60 min pre-workout (peak in blood)
• Effect duration: 3–6h
• Avoid >6h before sleep (affects sleep)

**Tolerance and cycling:**
• Tolerance develops in 4–7 days of continuous use
• Strategy: use only important days or cycle 4 weeks ON / 1 week OFF
• Abstinence 7–14 days restores sensitivity

**Formats:**
• Anhydrous (tablet/powder): more precise
• Coffee: variable (80–200mg per cup)
• Pre-workout coffee: beware combined stimulants

**Side effects >6 mg/kg:**
• Rapid heart rate, anxiety, GI distress, insomnia, tremors

**Reference:** Goldstein et al. ISSN Position Stand (2021)`
  },
  {
    keywords: ['beta alanina', 'beta-alanine', 'betaalanina', 'carnosina', 'acido lactico', 'lactic acid', 'buffer'],
    category: 'supplements',
    es: `**Beta-Alanina: El Buffer Anti-Acidez**

**Mecanismo:**
• Aumenta carnosina muscular (+40–80% en 4 semanas)
• Carnosina = buffer de pH (neutraliza ácido láctico)
• Ideal: ejercicios de 1–4 minutos de alta intensidad

**Dosis:**
• Carga: 3.2–6.4 g/día divididos en 2–4 tomas de 1.6–1.8g
• Dosis ÚNICA de >1.8g causa parestesia (hormigueo) — HARMLESS pero incómodo
• Tiempo de carga: 4–12 semanas para saturación
• Mantenimiento: 1.2g/día

**Beneficios:**
• +2–3% rendimiento en ejercicios 1–4 min
• Útil para: 400–800m, repechajes, series lactato, CrossFit
• NO beneficia ejercicios <1 min o >5 min

**Timing:**
• Con comidas (aumenta retención)
• Dividir dosis para evitar parestesia
• No necesita timing específico pre-entreno

**Combinación con creatina:**
• Sinérgica (vías diferentes)
• Ambas seguras juntas

**Referencia:** Trexler et al. ISSN Position Stand: Beta-Alanine (2015)`,
    en: `**Beta-Alanine: The Anti-Acidity Buffer**

**Mechanism:**
• Increases muscle carnosine (+40–80% in 4 weeks)
• Carnosine = pH buffer (neutralizes lactic acid)
• Ideal: exercises of 1–4 minutes high intensity

**Dose:**
• Loading: 3.2–6.4 g/day divided in 2–4 doses of 1.6–1.8g
• SINGLE dose >1.8g causes paresthesia (tingling) — HARMLESS but uncomfortable
• Loading time: 4–12 weeks for saturation
• Maintenance: 1.2g/day

**Benefits:**
• +2–3% performance in 1–4 min exercises
• Useful for: 400–800m, repeats, lactate sets, CrossFit
• NO benefit for exercises <1 min or >5 min

**Timing:**
• With meals (increases retention)
• Split doses to avoid paresthesia
• No specific pre-workout timing needed

**Combination with creatine:**
• Synergistic (different pathways)
• Both safe together

**Reference:** Trexler et al. ISSN Position Stand (2015)`
  },
  {
    keywords: ['citrulina', 'citrulline', 'citrulline malate', 'oxido nitrico', 'nitric oxide', 'pompa', 'pump', 'vasodilatador'],
    category: 'supplements',
    es: `**Citrulina (Malato): Vasodilatador y Anti-Fatiga**

**Mecanismo:**
• Precursor de arginina → óxido nítrico → vasodilatación
• Mejor que arginina directa (mejor absorción intestinal)
• También participa en ciclo urea (elimina amoníaco)

**Dosis:**
• Citrulina libre: 3g, 60 min pre-entreno
• Citrulina malato (2:1): 6–8g, 60 min pre-entreno
• Tomar en ayunas para mejor absorción

**Beneficios documentados:**
• Mejora pump/vasodilatación (principalmente percepción)
• Reduce fatiga muscular en sets repetidos (+1–2 reps)
• Puede mejorar rendimiento anaeróbico
• Reduce DOMS post-entreno (mecanismo anti-amoniaco)

**Limitaciones:**
• Evidencea mixta en fuerza máxima (1RM)
• Efecto más consistente en volumen/metabólico
• NO es tan potente como cafeína

**Combinaciones populares:**
• + Cafeína: sinérgico
• + Creatina: complementario
• Muchos pre-workouts ya lo incluyen

**Referencia:** Perez-Guisado & Jakeman. Citrulline malate enhances athletic performance (2010)`,
    en: `**Citrulline (Malate): Vasodilator and Anti-Fatigue**

**Mechanism:**
• Arginine precursor → nitric oxide → vasodilation
• Better than direct arginine (better intestinal absorption)
• Also participates in urea cycle (eliminates ammonia)

**Dose:**
• Free citrulline: 3g, 60 min pre-workout
• Citrulline malate (2:1): 6–8g, 60 min pre-workout
• Take on empty stomach for better absorption

**Documented benefits:**
• Improves pump/vasodilation (mainly perception)
• Reduces muscle fatigue in repeated sets (+1–2 reps)
• May improve anaerobic performance
• Reduces post-workout DOMS (anti-ammonia mechanism)

**Limitations:**
• Mixed evidence on maximum strength (1RM)
• More consistent effect on volume/metabolic work
• NOT as potent as caffeine

**Popular combinations:**
• + Caffeine: synergistic
• + Creatine: complementary
• Many pre-workouts already include it

**Reference:** Perez-Guisado & Jakeman. (2010)`
  },
  {
    keywords: ['vitamina d', 'vitamin d', 'vit d', 'hierro', 'iron', 'ferropenia', 'anemia', 'magnesio', 'magnesium', 'zinc'],
    category: 'supplements',
    es: `**Micronutrientes Críticos para Atletas**

**Vitamina D (el más importante):**
• 40–80% atletas DEFICIENTES según latitud/estilo de vida
• Óptimo: 40–80 ng/mL (sangre)
• Dosis: 2000–4000 UI/día (ajustar según niveles)
• Beneficios: fuerza muscular, inmune, hueso, testosterona
• Testear niveles cada 6 meses

**Hierro (especial mujeres atletas):**
• 30–50% atletas femeninas con deficiencia
• Ferritina objetivo: >30–50 ng/mL (atletas >50 ideal)
• Dosis terapéutica: 65–100mg Fe elemental (bajo supervisión médica)
• NO suplementar sin testear (toxicidad)
• Absorción: con vitamina C, lejos de calcio/café/té

**Magnesio:**
• 10–20% no cumplen RDA
• Dosis: 200–400mg elemental (glicinato o malato mejor absorción)
• Beneficios: calambres, sueño, recuperación, energía
• Evitar óxido de magnesio (mala absorción, laxante)

**Zinc:**
• Dosis: 15–30mg/día (no exceder 40mg)
• Importante para testosterona e inmunidad
• Tomar lejos de calcio (competición absorción)

**Referencia:** Owens DJ et al. Vitamin D and the Athlete (2018), Eur J Sport Sci`,
    en: `**Critical Micronutrients for Athletes**

**Vitamin D (the most important):**
• 40–80% athletes DEFICIENT depending on latitude/lifestyle
• Optimal: 40–80 ng/mL (blood)
• Dose: 2000–4000 IU/day (adjust based on levels)
• Benefits: muscle strength, immune, bone, testosterone
• Test levels every 6 months

**Iron (especially female athletes):**
• 30–50% female athletes with deficiency
• Ferritin target: >30–50 ng/mL (athletes >50 ideal)
• Therapeutic dose: 65–100mg elemental Fe (medical supervision)
• DO NOT supplement without testing (toxicity)
• Absorption: with vitamin C, away from calcium/coffee/tea

**Magnesium:**
• 10–20% don't meet RDA
• Dose: 200–400mg elemental (glycinate or malate best absorption)
• Benefits: cramps, sleep, recovery, energy
• Avoid magnesium oxide (poor absorption, laxative)

**Zinc:**
• Dose: 15–30mg/day (don't exceed 40mg)
• Important for testosterone and immunity
• Take away from calcium (absorption competition)

**Reference:** Owens DJ et al. (2018), Eur J Sport Sci`
  },
  {
    keywords: ['pre workout', 'preworkout', 'pre-entreno', 'pre entreno', 'antes entrenar', 'before workout', 'que tomar antes'],
    category: 'supplements',
    es: `**Pre-Workout: Qué SÍ Funciona (Jerarquía Evidencea)**

**Tier 1 — Evidencea fuerte:**
1. **Cafeína:** 3–6 mg/kg, 30–60 min pre (ISSN 2021)
2. **Creatina:** 3–5g diario (carga no necesaria) (ISSN 2021)
3. **Beta-alanina:** 3.2–6.4g/día (carga 4 semanas) (ISSN 2015)
4. **Citrulina malato:** 6–8g, 60 min pre (evidencea moderada)

**Tier 2 — Puede ayudar:**
5. **Nitratos (remolacha):** 300–600mg, 2–3h pre → mejor eficiencia O2
6. **Sodio:** 300–500mg pre si entreno >2h
7. **Carbohidratos:** 1–2 g/kg, 1–3h pre

**Tier 3 — Evidencea limitada/anecdótica:**
8. Taurina (puede contrarrestar cafeína)
9. Tirosina (fatiga mental)
10. Cafeína + teanina (calma + focus)

**Lo que NO funciona:**
• BCAA (si ya consumes suficiente proteína)
• Glutamina (no ergogénica)
• Testosterone boosters (DAA, tribulus, etc.)
• "Proprietary blends" sin dosis transparentes

**Referencia:** ISSN Position Stands 2015–2021`,
    en: `**Pre-Workout: What Actually Works (Evidence Hierarchy)**

**Tier 1 — Strong evidence:**
1. **Caffeine:** 3–6 mg/kg, 30–60 min pre (ISSN 2021)
2. **Creatine:** 3–5g daily (loading not needed) (ISSN 2021)
3. **Beta-alanine:** 3.2–6.4g/day (4 week loading) (ISSN 2015)
4. **Citrulline malate:** 6–8g, 60 min pre (moderate evidence)

**Tier 2 — May help:**
5. **Nitrates (beetroot):** 300–600mg, 2–3h pre → O2 efficiency
6. **Sodium:** 300–500mg pre if workout >2h
7. **Carbohydrates:** 1–2 g/kg, 1–3h pre

**Tier 3 — Limited/anecdotal evidence:**
8. Taurine (may counteract caffeine)
9. Tyrosine (mental fatigue)
10. Caffeine + theanine (calm + focus)

**What does NOT work:**
• BCAA (if you already consume enough protein)
• Glutamine (not ergogenic)
• Testosterone boosters (DAA, tribulus, etc.)
• "Proprietary blends" without transparent dosing

**Reference:** ISSN Position Stands 2015–2021`
  },

  // ═══════════════════════════════════════════════════════════
  // 7. PRE/POST ENTRENO / PERI-WORKOUT NUTRITION (6 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['que comer antes entrenar', 'what to eat before workout', 'pre entreno comida', 'pre workout meal', 'antes de entrenar', 'comida pre'],
    category: 'peri_workout',
    es: `**Comida Pre-Entreno: Protocolo Completo**

**Timing:**
• 2–3h antes: comida completa (proteína + carbs + grasas moderadas)
• 1–2h antes: comida ligera (proteína + carbs, bajo en grasa/fibra)
• 30–60 min antes: snack rápido (carbs simples + proteína)

**Composición óptima (2–3h antes):**
• Proteína: 0.3–0.5 g/kg (ej: 75kg → 22–37g)
• Carbohidratos: 1–2 g/kg (ej: 75kg → 75–150g)
• Grasas: moderadas (<15g para evitar lentitud GI)
• Fibra: baja (evitar gases/distensión)

**Ejemplos prácticos:**

*2–3h antes (comida):*
• Pechuga pollo 150g + arroz blanco 100g + zanahoria
• Pescado blanco + pasta + puré papa

*1h antes (ligero):*
• Yogur griego + plátano + miel
• Batido whey + avena instantánea

*30 min antes (rápido):*
• Plátano + 20g whey
• Galletas de arroz + miel

**Qué EVITAR pre-entreno:**
• Comidas altas en grasa (>20g): lento vaciado gástrico
• Mucha fibra: gases, distensión
• Nuevo/ desconocido: nunca en competencia
• Alcohol (obviamente)

**Referencia:** Kerksick et al. ISSN Exercise & Sport Nutrition Review (2017)`,
    en: `**Pre-Workout Meal: Complete Protocol**

**Timing:**
• 2–3h before: complete meal (protein + carbs + moderate fats)
• 1–2h before: light meal (protein + carbs, low fat/fiber)
• 30–60 min before: quick snack (simple carbs + protein)

**Optimal composition (2–3h before):**
• Protein: 0.3–0.5 g/kg (e.g., 75kg → 22–37g)
• Carbohydrates: 1–2 g/kg (e.g., 75kg → 75–150g)
• Fats: moderate (<15g to avoid GI sluggishness)
• Fiber: low (avoid gas/bloating)

**Practical examples:**

*2–3h before (meal):*
• Chicken breast 150g + white rice 100g + carrots
• White fish + pasta + mashed potato

*1h before (light):*
• Greek yogurt + banana + honey
• Whey shake + instant oats

*30 min before (quick):*
• Banana + 20g whey
• Rice cakes + honey

**What to AVOID pre-workout:**
• High fat meals (>20g): slow gastric emptying
• Lots of fiber: gas, bloating
• New/unknown foods: never in competition
• Alcohol (obviously)

**Reference:** Kerksick et al. ISSN Exercise & Sport Nutrition Review (2017)`
  },
  {
    keywords: ['que comer despues entrenar', 'what to eat after workout', 'post entreno', 'post workout', 'recuperacion', 'recovery meal', 'despues de entrenar'],
    category: 'peri_workout',
    es: `**Nutrición Post-Entreno: La Ventana de Recuperación**

**Prioridades (en orden):**
1. **Proteína:** 0.3–0.5 g/kg dentro de 2h (20–40g para mayoría)
2. **Carbohidratos:** 0.8–1.2 g/kg si próximo entreno <24h
3. **Hidratación:** 150% del peso perdido
4. **Antiinflamatorios:** omega-3, frutas con antioxidantes

**La "ventana anabólica" actualizada:**
• NO es 30 min como se creía
• Es 4–6h post-entreno (Schoenfeld 2018)
• Si comiste 1–2h pre-entreno → la ventana se extiende
• Si entrenaste en ayunas → prioriza post más rápido

**Ejemplos post-entreno por objetivo:**

*Hipertrofia (máxima MPS):*
• 40g whey isolate + 2 plátanos
• 200g pechuga + 150g arroz blanco

*Pérdida de grasa:*
• 30g proteína + vegetales verdes (mínimo carb)
• 3 huevos enteros + espinaca

*Resistencia (reponer glycogen):*
• 1.2 g/kg carbs + 0.3 g/kg proteína
• Batido de recovery: maltodextrina + whey + electrolitos

**NO necesitas:**
• BCAA (si ya comes proteína completa)
• Glutamina (evidencea insuficiente)
• Dextrosa ultra-rápida (no es necesaria)

**Referencia:** Schoenfeld et al. (2018); Kerksick et al. ISSN Review (2017)`,
    en: `**Post-Workout Nutrition: The Recovery Window**

**Priorities (in order):**
1. **Protein:** 0.3–0.5 g/kg within 2h (20–40g for most)
2. **Carbohydrates:** 0.8–1.2 g/kg if next workout <24h
3. **Hydration:** 150% of weight lost
4. **Anti-inflammatory:** omega-3, antioxidant fruits

**The updated "anabolic window":**
• NOT 30 min as once believed
• It's 4–6h post-workout (Schoenfeld 2018)
• If ate 1–2h pre-workout → window extends
• If trained fasted → prioritize faster post nutrition

**Post-workout examples by goal:**

*Hypertrophy (maximum MPS):*
• 40g whey isolate + 2 bananas
• 200g chicken breast + 150g white rice

*Fat loss:*
• 30g protein + green vegetables (minimal carb)
• 3 whole eggs + spinach

*Endurance (replenish glycogen):*
• 1.2 g/kg carbs + 0.3 g/kg protein
• Recovery shake: maltodextrin + whey + electrolytes

**You do NOT need:**
• BCAA (if you already eat complete protein)
• Glutamine (insufficient evidence)
• Ultra-fast dextrose (not necessary)

**Reference:** Schoenfeld et al. (2018); Kerksick et al. ISSN Review (2017)`
  },
  {
    keywords: ['ayuno', 'fasting', 'ayuno intermitente', 'intermittent fasting', 'entrenar en ayunas', 'fasted training', '16 8', 'leangains'],
    category: 'peri_workout',
    es: `**Ayuno Intermitente y Entrenamiento: Evidencea Actual**

**Protocolos comunes:**
• 16:8 — 16h ayuno, 8h ventana alimentaria
• 20:4 — 20h ayuno, 4h ventana (más extremo)
• 5:2 — 5 días normal, 2 días restrictivos

**Entrenar en ayunas:**
• NO quema más grasa a largo plazo (meta-análisis 2020)
• Puede aumentar oxidación de grasa DURANTE el entreno
• PERO: compensación calórica posterior = mismo balance
• Riesgo: menor intensidad, pérdida de músculo si proteína insuficiente

**Evidencea para atletas:**
• No beneficio de composición corporal vs déficit isocalórico tradicional
• Puede comprometer entrenamientos de alta intensidad
• Atletas de fuerza/ potencia: NO recomendado en fases de pico
• Puede ser útil para adherencia psicológica (menos comidas que planificar)

**Si entrenas en ayuno:**
• Usar 10g EAA pre-entreno (proteger MPS)
• Primera comida post-entreno: 40–50g proteína + carbs
• No entrenar >90 min en ayuno
• Hidratación extra importante

**Poblaciones que deben EVITAR:**
• Atletas femeninas (mayor riesgo RED-S)
• Adolescentes
• Historia de TCA (trastornos conducta alimentaria)
• Embarazo/lactancia

**Referencia:** Henselmans et al. Intermittent Fasting & Body Composition (2020)`,
    en: `**Intermittent Fasting and Training: Current Evidence**

**Common protocols:**
• 16:8 — 16h fasting, 8h eating window
• 20:4 — 20h fasting, 4h window (more extreme)
• 5:2 — 5 days normal, 2 restrictive days

**Training fasted:**
• Does NOT burn more fat long-term (2020 meta-analysis)
• May increase fat oxidation DURING exercise
• BUT: subsequent caloric compensation = same balance
• Risk: lower intensity, muscle loss if protein insufficient

**Evidence for athletes:**
• No body composition benefit vs traditional isocaloric deficit
• May compromise high-intensity training
• Strength/power athletes: NOT recommended in peak phases
• May help psychological adherence (fewer meals to plan)

**If you train fasted:**
• Use 10g EAA pre-workout (protect MPS)
• First post-workout meal: 40–50g protein + carbs
• Don't train >90 min fasted
• Extra hydration important

**Populations who should AVOID:**
• Female athletes (higher RED-S risk)
• Adolescents
• History of ED (eating disorders)
• Pregnancy/lactation

**Reference:** Henselmans et al. (2020)`
  },

  // ═══════════════════════════════════════════════════════════
  // 8. ATLETAS FEMENINAS / FEMALE ATHLETES (6 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['atleta mujer', 'female athlete', 'atleta femenina', 'ciclo menstrual', 'menstrual cycle', 'periodo', 'period', 'fase folicular', 'fase lutea', 'follicular', 'luteal'],
    category: 'female',
    es: `**Nutrición según el Ciclo Menstrual para Atletas**

**Fase Folicular (Día 1–14, menstruación → ovulación):**
• **Metabolismo:** insulin sensitivity ALTA
• **Entreno:** ideal para HIIT, fuerza, intensidad alta
• **Nutrición:** tolera más carbohidratos bien
  - Carbs: 4–6 g/kg
  - Proteína: 1.8–2.2 g/kg
  - Timing de carbs alrededor entreno optimizado

**Fase Lútea (Día 15–28, post-ovulación):**
• **Metabolismo:** insulin sensitivity BAJA, más retención de agua (+0.5–2kg)
• **Entreno:** mejor volumen moderado, cardio LISS
• **Nutrición:**
  - Carbs: 3–5 g/kg (ligeramente menor)
  - Grasas: ligeramente mayor (apoyo hormonal)
  - Sodio: moderar (retención de agua)
  - **Crucial:** 250–350mg magnesio (calambres, sueño)

**Síntomas premenstruales (últimos 3–5 días):**
• Aumentar tryptophan (pavo, plátano) → serotonina
• Omega-3 (2–3g) → antiinflamatorio
• Evitar cafeína si afecta síntomas
• Hidratación: peso en báscula sube por agua, NO grasa

**Referencia:** Oosthuyse & Bosch. The effect of menstrual cycle on exercise (2010), Med Sci Sports Exerc`,
    en: `**Nutrition According to Menstrual Cycle for Athletes**

**Follicular Phase (Day 1–14, menstruation → ovulation):**
• **Metabolism:** HIGH insulin sensitivity
• **Training:** ideal for HIIT, strength, high intensity
• **Nutrition:** tolerates carbs well
  - Carbs: 4–6 g/kg
  - Protein: 1.8–2.2 g/kg
  - Carb timing around workout optimized

**Luteal Phase (Day 15–28, post-ovulation):**
• **Metabolism:** LOW insulin sensitivity, more water retention (+0.5–2kg)
• **Training:** better moderate volume, LISS cardio
• **Nutrition:**
  - Carbs: 3–5 g/kg (slightly lower)
  - Fats: slightly higher (hormonal support)
  - Sodium: moderate (water retention)
  - **Crucial:** 250–350mg magnesium (cramps, sleep)

**Premenstrual symptoms (last 3–5 days):**
• Increase tryptophan (turkey, banana) → serotonin
• Omega-3 (2–3g) → anti-inflammatory
• Avoid caffeine if it affects symptoms
• Hydration: scale weight goes up from water, NOT fat

**Reference:** Oosthuyse & Bosch. (2010), Med Sci Sports Exerc`
  },
  {
    keywords: ['red-s', 'reds', 'sindrome atleta femenina', 'female athlete triad', 'triada', 'amenorrea', 'amenorrhea', 'hueso', 'bone', 'osteopenia'],
    category: 'female',
    es: `**RED-S (Relative Energy Deficiency in Sport): Guía Completa**

**Definición (IOC 2018):**
• Déficit energético RELATIVO = energía disponible <30 kcal/kg masa magra/día
• EA = (Energía ingerida - Ejercicio) / Masa magra (kg)
• **EA óptima:** >45 kcal/kg FFM/día
• **EA de riesgo:** <30 kcal/kg FFM/día

**Consecuencias sistémicas:**
• Hormonal: baja LH, FSH, estrógeno, testosterona
• Ósea: osteopenia, osteoporosis, fracturas por estrés
• Metabólica: reducción REE, alteración glucosa
• Inmune: mayor susceptibilidad infecciones
• Cardiovascular: alteración lipídica
• GI: disbiosis, SIBO
• Psicológica: irritabilidad, depresión, TCA

**Screening:**
• ¿Perdido la regla >3 meses (amenorrea primaria) o irregular?
• ¿Historial de fracturas por estrés?
• ¿Restricción calórica con entrenamiento intenso?
• ¿Obsesión con peso/composición?

**Tratamiento:**
• Aumentar EA >45 kcal/kg FFM (mayor ingesta o menor ejercicio)
• Proteína: 1.6–2.2 g/kg (preservar masa)
• Calcio: 1000–1500mg/día + Vit D 2000–4000 UI
• Baja carga de impacto hasta recuperación hormonal
• **Equipo multidisciplinario:** médico, nutricionista, psicólogo

**Referencia:** Mountjoy et al. IOC Consensus Statement on RED-S (2018), Br J Sports Med`,
    en: `**RED-S (Relative Energy Deficiency in Sport): Complete Guide**

**Definition (IOC 2018):**
• Relative energy deficiency = energy availability <30 kcal/kg fat-free mass/day
• EA = (Energy intake - Exercise) / Fat-free mass (kg)
• **Optimal EA:** >45 kcal/kg FFM/day
• **At-risk EA:** <30 kcal/kg FFM/day

**Systemic consequences:**
• Hormonal: low LH, FSH, estrogen, testosterone
• Bone: osteopenia, osteoporosis, stress fractures
• Metabolic: reduced REE, altered glucose
• Immune: greater infection susceptibility
• Cardiovascular: altered lipids
• GI: dysbiosis, SIBO
• Psychological: irritability, depression, ED

**Screening:**
• Missed period >3 months (primary amenorrhea) or irregular?
• History of stress fractures?
• Caloric restriction with intense training?
• Obsession with weight/composition?

**Treatment:**
• Increase EA >45 kcal/kg FFM (more intake or less exercise)
• Protein: 1.6–2.2 g/kg (preserve mass)
• Calcium: 1000–1500mg/day + Vit D 2000–4000 IU
• Reduce impact load until hormonal recovery
• **Multidisciplinary team:** physician, nutritionist, psychologist

**Reference:** Mountjoy et al. IOC Consensus Statement (2018), Br J Sports Med`
  },
  {
    keywords: ['embarazo', 'pregnancy', 'embarazada', 'pregnant athlete', 'atleta embarazada', 'lactancia', 'breastfeeding', 'lactation'],
    category: 'female',
    es: `**Nutrición para Atleta Embarazada y Lactancia**

**Principios generales (ACSM/AND 2020):**
• NO es momento para mejorar rendimiento — mantener actividad segura
• La mayoría de atletas pueden continuar entrenando con modificaciones
• Ganancia de peso recomendada según IMC pre-embarazo:
  - IMC <18.5: 12.5–18 kg
  - IMC 18.5–24.9: 11.5–16 kg
  - IMC 25–29.9: 7–11.5 kg
  - IMC >30: 5–9 kg

**Ajustes nutricionales por trimestre:**
• **T1:** +85 kcal/día (mínimo), hierro, ácido fólico 600mcg
• **T2:** +285 kcal/día, proteína 1.1 g/kg → 1.3 g/kg
• **T3:** +475 kcal/día, calcio 1000mg, omega-3 DHA 200–300mg

**Consideraciones especiales:**
• Proteína: 1.1–1.3 g/kg (más que sedentaria)
• Hierro: 27mg/día (suplementar si ferritina <30)
• Hidratación: +300–500ml/día, evitar sobrecalentamiento
• Cafeína: <200mg/día (ACOG recomendación)
• Evitar: alcohol, pescado alto en mercurio, suplementos no testados

**Contraindicaciones absolutas para ejercicio:**
• Sangrado vaginal, placenta previa, riesgo parto prematuro
• Pre-eclampsia, insuficiencia cervix, rotura prematura membranas

**Retorno post-parto:**
• 6 semanas mínimo antes de retornar progresivamente
• Lactancia: +330 kcal/día (T1–6), +400 kcal/día (>6 meses)

**Referencia:** ACSM/AND Position Stand: Nutrition & Athletic Performance (2020)`,
    en: `**Nutrition for Pregnant Athletes and Breastfeeding**

**General principles (ACSM/AND 2020):**
• NOT the time to improve performance — maintain safe activity
• Most athletes can continue training with modifications
• Recommended weight gain according to pre-pregnancy BMI:
  - BMI <18.5: 12.5–18 kg
  - BMI 18.5–24.9: 11.5–16 kg
  - BMI 25–29.9: 7–11.5 kg
  - BMI >30: 5–9 kg

**Nutritional adjustments by trimester:**
• **T1:** +85 kcal/day (minimal), iron, folic acid 600mcg
• **T2:** +285 kcal/day, protein 1.1 g/kg → 1.3 g/kg
• **T3:** +475 kcal/day, calcium 1000mg, omega-3 DHA 200–300mg

**Special considerations:**
• Protein: 1.1–1.3 g/kg (more than sedentary)
• Iron: 27mg/day (supplement if ferritin <30)
• Hydration: +300–500ml/day, avoid overheating
• Caffeine: <200mg/day (ACOG recommendation)
• Avoid: alcohol, high-mercury fish, untested supplements

**Absolute contraindications for exercise:**
• Vaginal bleeding, placenta previa, premature labor risk
• Pre-eclampsia, cervical insufficiency, premature rupture of membranes

**Postpartum return:**
• 6 weeks minimum before gradual return
• Breastfeeding: +330 kcal/day (T1–6), +400 kcal/day (>6 months)

**Reference:** ACSM/AND Position Stand (2020)`
  },

  // ═══════════════════════════════════════════════════════════
  // 9. SUEÑO Y RECUPERACIÓN / SLEEP & RECOVERY (5 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['sueno', 'sleep', 'dormir', 'descanso', 'rest', 'insomnio', 'insomnia', 'recuperacion', 'recovery', 'melatonina', 'melatonin'],
    category: 'sleep',
    es: `**Sueño para Atletas: El "Suplemento" Más Ignorado**

**Impacto del sueño en rendimiento:**
• <7h/noche = riesgo lesión +70% (Milewski 2014)
• 5h/noche = respuesta insulina -30%, cortisol +50%
• Sueño deficitario = equivalencia cognitiva a alcohol 0.05%
• RECOMENDADO: 8–10h para atletas (vs 7–9 general)

**Nutrición para mejorar sueño:**

**Antes de dormir (1–2h):**
• Caseína: 30–40g (Snijders 2015 — MPS nocturna)
• Carbohidratos ligeros: pueden ayudar tryptophan a cruzar BBB
• **Evitar:** cafeína >6h antes, alcohol (fragmenta sueño REM), comidas grandes

**Suplementos con evidencea:**
• **Magnesio glicinato:** 200–400mg elemental (calma, GABA)
• **Glicina:** 3g, 30 min antes (baja core temp, mejora onset)
• **Melatonina:** 0.5–3mg (jet lag, insomnio ocasional)
• **L-teanina:** 200mg (calma sin sedación)
• **ZMA (zinc+mag+B6):** evidencea mixta

**Higiene del sueño (más importante que suplementos!):**
• Ritmo consistente (±30 min diario)
• Temperatura ambiente: 18–20°C
• Oscuridad total (o antifaz)
• Sin pantallas 1h antes (luz azul suprime melatonina)
• Limitar líquidos 2h antes

**Referencia:** Watson NF et al. Consensus Statement on Sleep (2015), J Clin Sleep Med`,
    en: `**Sleep for Athletes: The Most Ignored "Supplement"**

**Impact of sleep on performance:**
• <7h/night = injury risk +70% (Milewski 2014)
• 5h/night = insulin response -30%, cortisol +50%
• Sleep deficit = cognitive equivalent to 0.05% alcohol
• RECOMMENDED: 8–10h for athletes (vs 7–9 general)

**Nutrition to improve sleep:**

**Before bed (1–2h):**
• Casein: 30–40g (Snijders 2015 — overnight MPS)
• Light carbohydrates: may help tryptophan cross BBB
• **Avoid:** caffeine >6h before, alcohol (fragments REM sleep), large meals

**Evidence-based supplements:**
• **Magnesium glycinate:** 200–400mg elemental (calm, GABA)
• **Glycine:** 3g, 30 min before (lowers core temp, improves onset)
• **Melatonin:** 0.5–3mg (jet lag, occasional insomnia)
• **L-theanine:** 200mg (calm without sedation)
• **ZMA (zinc+mag+B6):** mixed evidence

**Sleep hygiene (more important than supplements!):**
• Consistent schedule (±30 min daily)
• Room temperature: 18–20°C
• Total darkness (or eye mask)
• No screens 1h before (blue light suppresses melatonin)
• Limit fluids 2h before

**Reference:** Watson NF et al. Consensus Statement (2015), J Clin Sleep Med`
  },

  // ═══════════════════════════════════════════════════════════
  // 10. COMPETENCIA / COMPETITION DAY (4 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['competencia', 'competition', 'dia competencia', 'competition day', 'maraton', 'marathon', 'dia carrera', 'race day', 'antes competir'],
    category: 'competition',
    es: `**Nutrición para Día de Competencia**

**La regla de oro: NADA NUEVO EN COMPETENCIA**
• Todo debe estar practicado en entrenamientos simulados
• Desayuno de competencia = desayuno que comes antes de entrenos largos

**Maratón / endurance (ejemplo):**

*La noche anterior:*
• Cena: 8–12 g/kg carbohidratos (pasta, arroz, papa)
• Baja fibra, baja grasa, bajo proteína
• Familiar, no experimental

*Desayuno (3–4h antes):**
• 1–2 g/kg carbs, bajo en fibra/grasa
• Ejemplo: pan blanco + miel + plátano + café (si toleras)
• 500–750ml agua

*1h antes:*
• 0.5–1 g/kg carbs simples (gel, plátano)
• 200–300ml agua

*Durante maratón:*
• 30–90g carbs/h según velocidad (ver protocolo intra-workout)
• Primer gel a min 45–60 (NO esperar a sentir hambre)
• Agua en cada puesto (no beber demasiado = hiponatremia)

**Deportes de equipo (fútbol, basket):**
• Pre-partido 3h: comida completa (pasta + pollo)
• 1h antes: snack ligero (plátano + tostada)
• Medio tiempo: 30g carbs (gel, plátano, bebida deportiva)

**Referencia:** Burke LM. Practical Sports Nutrition (2007)`,
    en: `**Nutrition for Competition Day**

**The golden rule: NOTHING NEW ON COMPETITION DAY**
• Everything must be practiced in simulated training
• Competition breakfast = breakfast you eat before long training

**Marathon / endurance (example):**

*Night before:*
• Dinner: 8–12 g/kg carbohydrates (pasta, rice, potato)
• Low fiber, low fat, low protein
• Familiar, not experimental

*Breakfast (3–4h before):**
• 1–2 g/kg carbs, low fiber/fat
• Example: white bread + honey + banana + coffee (if tolerated)
• 500–750ml water

*1h before:*
• 0.5–1 g/kg simple carbs (gel, banana)
• 200–300ml water

*During marathon:*
• 30–90g carbs/h depending on pace (see intra-workout protocol)
• First gel at min 45–60 (DON'T wait to feel hungry)
• Water at every station (don't overdrink = hyponatremia)

**Team sports (soccer, basketball):**
• Pre-game 3h: complete meal (pasta + chicken)
• 1h before: light snack (banana + toast)
• Halftime: 30g carbs (gel, banana, sports drink)

**Reference:** Burke LM. Practical Sports Nutrition (2007)`
  },
  {
    keywords: ['corte peso', 'weight cut', 'pesaje', 'weigh in', 'deporte combate', 'combat sport', 'mma', 'lucha', 'wrestling', 'box', 'boxing'],
    category: 'competition',
    es: `**Corte de Peso para Deportes de Combate**

**Estrategias SEGURAS (ACSM recomienda máx 1–1.5% peso/semana):**

**Fase 1: Pérdida de grasa (6–8 semanas pre-pesaje)**
• Déficit moderado -300 a -500 kcal
• Proteína alta: 2.2–2.8 g/kg (proteger músculo)
• Entrenamiento: fuerza + cardio LISS
• NO restricción de agua en esta fase

**Fase 2: Manipulación agua (últimas 24–48h)**
• **Solo si necesitas perder <3% peso**
• Reducir sodio 48h antes
• Reducir agua gradualmente (no cortar completamente)
• Bajar carbs (cada 1g glycogen retiene ~3g agua)
• Sauna/sudoración pasiva (con supervisión!)

**Fase 3: Rehidratación post-pesaje (crítica!)**
• Beber 150% del peso perdido (ej: perdí 2kg → 3L)
• Con sodio: ayuda retención
• Carbohidratos: 1–1.5 g/kg para rellenar glycogen
• Proteína: 0.5 g/kg
• Timing: 3–5h entre pesaje y competencia ideal

**¡NUNCA hacer!**
• Cortar agua >24h (riesgo renal, rendimiento cae 10–15%)
• Vómitos/diuréticos/laxantes (peligroso, dopante WADA)
• Perder >5% peso en agua (riesgo de muerte)

**Referencia:** Artioli et al. Weight Management for Combat Sports (2010), Int J Sport Nutr Exerc Metab`,
    en: `**Weight Cutting for Combat Sports**

**SAFE strategies (ACSM recommends max 1–1.5% body weight/week):**

**Phase 1: Fat loss (6–8 weeks pre-weigh-in)**
• Moderate deficit -300 to -500 kcal
• High protein: 2.2–2.8 g/kg (protect muscle)
• Training: strength + LISS cardio
• NO water restriction in this phase

**Phase 2: Water manipulation (last 24–48h)**
• **Only if you need to lose <3% body weight**
• Reduce sodium 48h before
• Gradually reduce water (don't cut completely)
• Lower carbs (each 1g glycogen retains ~3g water)
• Sauna/passive sweating (with supervision!)

**Phase 3: Post-weigh-in rehydration (critical!)**
• Drink 150% of weight lost (e.g., lost 2kg → 3L)
• With sodium: helps retention
• Carbohydrates: 1–1.5 g/kg to refill glycogen
• Protein: 0.5 g/kg
• Timing: 3–5h between weigh-in and competition ideal

**NEVER do!**
• Cut water >24h (kidney risk, performance drops 10–15%)
• Vomiting/diuretics/laxatives (dangerous, WADA doping)
• Lose >5% body weight in water (risk of death)

**Reference:** Artioli et al. (2010), Int J Sport Nutr Exerc Metab`
  },

  // ═══════════════════════════════════════════════════════════
  // 11. VEGANO/VEGETARIANO / VEGAN (3 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['vegano', 'vegan', 'vegetariano', 'vegetarian', 'dieta planta', 'plant based', 'dieta vegetal', 'plant based athlete'],
    category: 'vegan',
    es: `**Atleta Vegano: Guía Completa de Nutrición**

**Suplementación OBLIGATORIA:**
• **B12:** 250–500 mcg/día o 2500 mcg semanal (sublingual)
• **Vitamina D3 (vegana):** 2000–4000 UI/día
• **Omega-3 (alga):** 250–500mg EPA+DHA combinados
• **Hierro:** solo si deficiente (test ferritina)

**Suplementación RECOMENDADA:**
• **Creatina:** 5g/día (veganos tienen niveles basales MÁS bajos → mayor beneficio!)
• **Proteína en polvo (guisante/arroz):** para alcanzar 1.8–2.7 g/kg
• **Zinc:** 10–15mg (biodisponibilidad menor en fuentes vegetales)
• **Calcio:** si no consume suficientes fuentes fortificadas

**Proteína — el mayor desafío:**
• Objetivo: 1.8–2.7 g/kg (10–20% más que omnívoro)
• Leucina por comida: 2.5–3g (activar mTOR)
• Combinar fuentes: legumbres + cereales (arroz + frijoles = completo)

**Fuentes clave (g proteína/100g cocido):**
• Lentejas: 9g | Garbanzos: 9g | Tofu: 12g | Tempeh: 19g
• Seitán: 25g | Edamame: 11g | Proteína guisante (powder): 80g
• Avena: 13g (seco) | Quinoa: 4.4g | Nutritional yeast: 50g

**Referencia:** Rogerson D. Vegan Diets for Athletes (2017), J Int Soc Sports Nutr`,
    en: `**Vegan Athlete: Complete Nutrition Guide**

**MANDATORY supplementation:**
• **B12:** 250–500 mcg/day or 2500 mcg weekly (sublingual)
• **Vitamin D3 (vegan):** 2000–4000 IU/day
• **Omega-3 (algae):** 250–500mg EPA+DHA combined
• **Iron:** only if deficient (test ferritin)

**RECOMMENDED supplementation:**
• **Creatine:** 5g/day (vegans have LOWER baseline levels → greater benefit!)
• **Protein powder (pea/rice):** to reach 1.8–2.7 g/kg
• **Zinc:** 10–15mg (lower bioavailability in plant sources)
• **Calcium:** if not consuming enough fortified sources

**Protein — the biggest challenge:**
• Target: 1.8–2.7 g/kg (10–20% more than omnivore)
• Leucine per meal: 2.5–3g (trigger mTOR)
• Combine sources: legumes + grains (rice + beans = complete)

**Key sources (g protein/100g cooked):**
• Lentils: 9g | Chickpeas: 9g | Tofu: 12g | Tempeh: 19g
• Seitan: 25g | Edamame: 11g | Pea protein (powder): 80g
• Oats: 13g (dry) | Quinoa: 4.4g | Nutritional yeast: 50g

**Reference:** Rogerson D. (2017), J Int Soc Sports Nutr`
  },

  // ═══════════════════════════════════════════════════════════
  // 12. LESIONES Y RECUPERACIÓN / INJURY RECOVERY (3 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['lesion', 'injury', 'recuperacion lesion', 'injury recovery', 'cirugia', 'surgery', 'rehab', 'rehabilitacion', 'inflamacion', 'inflammation'],
    category: 'injury',
    es: `**Nutrición para Recuperación de Lesiones**

**Fase 1: Inflamación aguda (Días 1–5 post-lesión)**
• NO suprimir completamente la inflamación (es necesaria!)
• Evitar mega-dosis antiinflamatorios (NSAIDs, omega-3 altas)
• Proteína: 2.0–2.5 g/kg (MPS elevado para reparación)
• Energía: NO déficit calórico (el tejido necesita energía)
• Vitamina C: 1–2g/día (síntesis colágeno)
• Calcio + Vit D: si lesión ósea

**Fase 2: Proliferación (Semanas 1–6)**
• Omega-3: 2–3g EPA+DHA (ahora SÍ ayuda a modular inflamación)
• Colágeno hidrolizado: 10–15g/día + Vit C 50mg (Praet 2019)
• Proteína: mantener 1.8–2.2 g/kg
• Creatina: 5g/día (preservar masa durante inmovilización)
• HMB: 3g/día (evidencea limitada pero puede ayudar)

**Fase 3: Remodelación (>6 semanas)**
• Retorno gradual a requerimientos normales
• Aumentar gradualmente carga + nutrición de acuerdo
• Monitorear %grasa para evitar ganancia excesiva

**Colágeno: lo que funciona**
• Dosis: 10–15g colágeno hidrolizado (tipo I + III)
• Timing: 30–60 min PRE-entreno de la zona lesionada
• + Vitamina C 50mg (obligatorio para síntesis)
• NO sustituye proteína completa — es ADICIONAL

**Referencia:** Shaw G et al. Nutrition for Injury Recovery (2017), Sports Med`,
    en: `**Nutrition for Injury Recovery**

**Phase 1: Acute inflammation (Days 1–5 post-injury)**
• DO NOT completely suppress inflammation (it's needed!)
• Avoid mega-dose anti-inflammatories (NSAIDs, high omega-3)
• Protein: 2.0–2.5 g/kg (elevated MPS for repair)
• Energy: NO caloric deficit (tissue needs energy)
• Vitamin C: 1–2g/day (collagen synthesis)
• Calcium + Vit D: if bone injury

**Phase 2: Proliferation (Weeks 1–6)**
• Omega-3: 2–3g EPA+DHA (now DOES help modulate inflammation)
• Hydrolyzed collagen: 10–15g/day + Vit C 50mg (Praet 2019)
• Protein: maintain 1.8–2.2 g/kg
• Creatine: 5g/day (preserve mass during immobilization)
• HMB: 3g/day (limited evidence but may help)

**Phase 3: Remodeling (>6 weeks)**
• Gradual return to normal requirements
• Gradually increase load + nutrition accordingly
• Monitor %fat to avoid excessive gain

**Collagen: what works**
• Dose: 10–15g hydrolyzed collagen (type I + III)
• Timing: 30–60 min PRE-rehab exercise of injured area
• + Vitamin C 50mg (required for synthesis)
• Does NOT replace complete protein — it's ADDITIONAL

**Reference:** Shaw G et al. (2017), Sports Med`
  },

  // ═══════════════════════════════════════════════════════════
  // 13. JÓVENES Y ADULTOS MAYORES / YOUTH & MASTERS (4 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['joven', 'young athlete', 'atleta joven', 'adolescente', 'adolescent', 'teenager', 'crecimiento', 'growth', 'deporte juvenil', 'youth sport'],
    category: 'youth',
    es: `**Nutrición para Atleta Joven (Adolescente)**

**Principios fundamentales:**
• PRIORIDAD: crecimiento + desarrollo + deporte (en ese orden)
• NUNCA restricción calórica en adolescentes (excepto obesidad bajo supervisión médica)
• Necesidades energéticas: MAYORES que adulto por crecimiento

**Requerimientos (más altos que adultos):**
• Energía: TDEE + crecimiento (varía mucho, 2500–4000+ kcal)
• Proteína: 1.6–2.0 g/kg (máximo, no necesitan más)
• Calcio: 1300mg/día (pico masa ósea)
• Hierro: 11mg (hombres) / 15mg (mujeres) — menstruación
• Vitamina D: 600–1000 UI/día

**Consideraciones especiales:**
• Timing: comidas frecuentes (3 comidas + 2–3 snacks)
• Hidratación: más propensos a deshidratación por inmadurez termorregulación
• Suplementos: la mayoría NO son necesarios
  - SÍ: proteína básica, creatina (>18 años), multivitamínico
  - NO: quemadores de grasa, pre-workouts con estimulantes, test boosters

**Señales de riesgo:**
• Estancamiento de crecimiento (altura)
• Retraso pubertario
• Fatiga crónica
• Obsesión con peso/composición → riesgo TCA

**Referencia:** Desbrow B et al. Nutrition for Young Athletes (2014)`,
    en: `**Nutrition for Young Athletes (Adolescents)**

**Fundamental principles:**
• PRIORITY: growth + development + sport (in that order)
• NEVER caloric restriction in adolescents (except obesity under medical supervision)
• Energy needs: HIGHER than adults due to growth

**Requirements (higher than adults):**
• Energy: TDEE + growth (varies greatly, 2500–4000+ kcal)
• Protein: 1.6–2.0 g/kg (maximum, don't need more)
• Calcium: 1300mg/day (peak bone mass)
• Iron: 11mg (males) / 15mg (females) — menstruation
• Vitamin D: 600–1000 IU/day

**Special considerations:**
• Timing: frequent meals (3 meals + 2–3 snacks)
• Hydration: more prone to dehydration due to immature thermoregulation
• Supplements: most are NOT needed
  - YES: basic protein, creatine (>18 years), multivitamin
  - NO: fat burners, pre-workouts with stimulants, test boosters

**Risk signs:**
• Growth stunting (height)
• Delayed puberty
• Chronic fatigue
• Obsession with weight/composition → ED risk

**Reference:** Desbrow B et al. (2014)`
  },
  {
    keywords: ['adulto mayor', 'masters athlete', 'mayor', 'older adult', 'envejecimiento', 'aging', 'anabolismo resistencia', 'anabolic resistance', 'sarcopenia'],
    category: 'youth',
    es: `**Nutrición para Atleta Master (>40 años): Combatir el Anabolismo de Resistencia**

**El problema: Anabolismo de Resistencia**
• MPS responde MENOS a la misma dosis de proteína vs joven
• Umbral de leucina más alto: 2.5–3g (vs 2g en jóvenes)
• Pérdida muscular: 3–8% por década después de los 30

**Solución nutricional:**
• **Proteína:** 1.6–2.2 g/kg (más alta que jóvenes para compensar)
• **Leucina:** asegurar 2.5–3g por comida (o suplementar)
• **Dosis per meal:** 0.4 g/kg (vs 0.25 g/kg en jóvenes)
• **HMB:** 3g/día (evidencea moderada para atenuar anabolismo resistencia)
• **Creatina:** 5g/día (especialmente beneficioso para masters)
• **Vitamina D:** 2000–4000 UI/día (test niveles)

**Proteína distribuida (más importante aún):**
• 4–5 comidas de 0.4 g/kg (vs 3 en jóvenes)
• Caseína nocturna: 30–40g (Snijders 2015)

**Entrenamiento + Nutrición:**
• Priorizar entrenamiento de fuerza (más importante que cardio)
• Proteína post-entreno INMEDIATA (ventana más corta)
• Omega-3: 2g EPA+DHA (antiinflamatorio + posible MPS)

**Referencia:** Moore DR et al. Protein ingestion to stimulate MPS in aged men (2015), Clin Nutr`,
    en: `**Nutrition for Masters Athletes (>40 years): Combating Anabolic Resistance**

**The problem: Anabolic Resistance**
• MPS responds LESS to the same protein dose vs young
• Higher leucine threshold: 2.5–3g (vs 2g in young)
• Muscle loss: 3–8% per decade after 30

**Nutritional solution:**
• **Protein:** 1.6–2.2 g/kg (higher than young to compensate)
• **Leucine:** ensure 2.5–3g per meal (or supplement)
• **Per meal dose:** 0.4 g/kg (vs 0.25 g/kg in young)
• **HMB:** 3g/day (moderate evidence to attenuate anabolic resistance)
• **Creatine:** 5g/day (especially beneficial for masters)
• **Vitamin D:** 2000–4000 IU/day (test levels)

**Distributed protein (even more important):**
• 4–5 meals of 0.4 g/kg (vs 3 in young)
• Nighttime casein: 30–40g (Snijders 2015)

**Training + Nutrition:**
• Prioritize strength training (more important than cardio)
• IMMEDIATE post-workout protein (shorter window)
• Omega-3: 2g EPA+DHA (anti-inflammatory + possible MPS)

**Reference:** Moore DR et al. (2015), Clin Nutr`
  },

  // ═══════════════════════════════════════════════════════════
  // 14. GANANCIA MUSCULAR / MUSCLE GAIN (4 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['ganar musculo', 'muscle gain', 'hipertrofia', 'hypertrophy', 'volumen', 'bulking', 'mass', 'masa muscular', 'aumentar musculo', 'build muscle'],
    category: 'muscle_gain',
    es: `**Hipertrofia Muscular: Protocolo Nutricional Completo**

**Requerimiento energético:**
• Superávit: +200 a +500 kcal sobre TDEE
• Máximo recomendado: +10–20% TDEE
• Superávit agresivo = más grasa ganada (más músculo también, pero ratio peor)

**Proteína (la clave):**
• 1.6–2.2 g/kg (máximo beneficio a 2.2 g/kg)
• >2.2 g/kg: NO más MPS, solo más saciedad/TEF
• Dosis per meal: 0.4 g/kg cada 3–4h (4–5 comidas)
• Leucina: 2–3g por comida

**Carbohidratos (para rendimiento y MPS):**
• 4–7 g/kg (según volumen de entrenamiento)
• Necesarios para entrenar duro = estímulo hipertrófico
• Post-entreno: 0.8–1.2 g/kg + proteína = sinérgico

**Grasas (hormonal):**
• 0.8–1.0 g/kg mínimo (testosterona)
• No bajar <0.6 g/kg por tiempo prolongado

**Suplementos con evidencea:**
• Creatina: 5g/día (+1–2kg masa, +5–15% fuerza)
• Cafeína: pre-entreno (más volumen = más hipertrofia)
• Caseína nocturna: 30–40g

**Tasa realista de ganancia:**
• Principiante: 0.5–1 kg/mes
• Intermedio: 0.25–0.5 kg/mes
• Avanzado: 0.1–0.25 kg/mes

**Referencia:** Schoenfeld BJ. Science & Development of Muscle Hypertrophy (2021)`,
    en: `**Muscle Hypertrophy: Complete Nutrition Protocol**

**Energy requirement:**
• Surplus: +200 to +500 kcal above TDEE
• Maximum recommended: +10–20% TDEE
• Aggressive surplus = more fat gained (more muscle too, but worse ratio)

**Protein (the key):**
• 1.6–2.2 g/kg (maximum benefit at 2.2 g/kg)
• >2.2 g/kg: NO more MPS, just more satiety/TEF
• Per meal dose: 0.4 g/kg every 3–4h (4–5 meals)
• Leucine: 2–3g per meal

**Carbohydrates (for performance and MPS):**
• 4–7 g/kg (depending on training volume)
• Needed to train hard = hypertrophic stimulus
• Post-workout: 0.8–1.2 g/kg + protein = synergistic

**Fats (hormonal):**
• 0.8–1.0 g/kg minimum (testosterone)
• Don't drop <0.6 g/kg for prolonged time

**Evidence-based supplements:**
• Creatine: 5g/day (+1–2kg mass, +5–15% strength)
• Caffeine: pre-workout (more volume = more hypertrophy)
• Nighttime casein: 30–40g

**Realistic gain rate:**
• Beginner: 0.5–1 kg/month
• Intermediate: 0.25–0.5 kg/month
• Advanced: 0.1–0.25 kg/month

**Reference:** Schoenfeld BJ. Science & Development of Muscle Hypertrophy (2021)`
  },

  // ═══════════════════════════════════════════════════════════
  // 15. PERIODIZACIÓN NUTRICIONAL / NUTRITION PERIODIZATION (3 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['periodizacion', 'periodization', 'nutricion periodizada', 'periodized nutrition', 'mesociclo', 'macrociclo', 'microciclo', 'fase preparacion'],
    category: 'periodization',
    es: `**Periodización Nutricional para Atletas**

**Principio: Nutrición debe seguir la carga de entrenamiento**

**Fase General/Preparación (GPP):**
• Objetivo: base aerobic + composición
• Carbs: 4–5 g/kg
• Proteína: 1.8–2.0 g/kg
• Deficit leve si necesita perder grasa

**Fase Específica/Build:**
• Objetivo: especificidad deportiva, intensidad creciente
• Carbs: 5–7 g/kg (aumentando con carga)
• Proteína: 2.0–2.2 g/kg
• Mantenimiento calórico o superávit leve

**Fase Pico/Peak (2–3 semanas pre-comp):**
• Objetivo: máximo rendimiento
• Carbs: 6–8 g/kg (taper + carga)
• Proteína: 1.8–2.0 g/kg
• Mantenimiento calórico

**Fase Competencia:**
• Ver protocolo "Día de Competencia"

**Fase Transición/Deload:**
• Objetivo: recuperación
• Carbs: 3–4 g/kg (reducir)
• Proteína: 1.8–2.0 g/kg (mantener)
• Grasas: 1.0 g/kg (apoyo hormonal)
• Déficit opcional si necesita composición

**Monitoreo:**
• Peso diario (promedio semanal más importante)
• %grasa ISAK cada 2–4 semanas
• Sensación subjetiva de recuperación (1–10)
• Sueño (horas + calidad)

**Referencia:** Stellingwerff T et al. Nutrition in Sport (2019), IOC Encyclopaedia`,
    en: `**Nutritional Periodization for Athletes**

**Principle: Nutrition must follow training load**

**General/Preparation Phase (GPP):**
• Goal: aerobic base + composition
• Carbs: 4–5 g/kg
• Protein: 1.8–2.0 g/kg
• Slight deficit if need to lose fat

**Specific/Build Phase:**
• Goal: sport specificity, increasing intensity
• Carbs: 5–7 g/kg (increasing with load)
• Protein: 2.0–2.2 g/kg
• Maintenance or slight surplus

**Peak Phase (2–3 weeks pre-comp):**
• Goal: maximum performance
• Carbs: 6–8 g/kg (taper + loading)
• Protein: 1.8–2.0 g/kg
• Caloric maintenance

**Competition Phase:**
• See "Competition Day" protocol

**Transition/Deload Phase:**
• Goal: recovery
• Carbs: 3–4 g/kg (reduce)
• Protein: 1.8–2.0 g/kg (maintain)
• Fats: 1.0 g/kg (hormonal support)
• Optional deficit if composition needed

**Monitoring:**
• Daily weight (weekly average more important)
• ISAK %fat every 2–4 weeks
• Subjective recovery feeling (1–10)
• Sleep (hours + quality)

**Reference:** Stellingwerff T et al. (2019), IOC Encyclopaedia`
  },

  // ═══════════════════════════════════════════════════════════
  // 16. SALUD INTESTINAL / GUT HEALTH (2 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['microbiota', 'microbiome', 'intestino', 'gut', 'probiotico', 'probiotic', 'fibra', 'fiber', 'digestion', 'barrera intestinal', 'gut barrier', 'prebiotico', 'prebiotic'],
    category: 'gut',
    es: `**Salud Intestinal para Atletas: El "Segundo Cerebro"**

**Impacto en rendimiento:**
• Microbiota produce ~50% de dopamina y 95% de serotonina
• Barrera intestinal "leaky gut" = inflamación sistémica, fatiga
• Intensidad alta + estrés reduce flujo sanguíneo GI → disbiosis

**Estrategias para atletas:**

**Diversidad de fibra (objetivo: 30+ fuentes/semana):**
• Frutas, verduras, legumbres, cereales integrales, nueces, semillas
• Polifenoles (cacao puro, té verde, frutos rojos) → alimento para microbios buenos
• Evitar ultraprocesados y edulcorantes artificiales (alteran microbiota)

**Probióticos (evidencea específica):**
• Lactobacillus + Bifidobacterium: pueden reducir URI (infecciones respiratorias) en atletas
• Dosis: 10^9–10^10 UFC/día
• Timing: con comida, curso 4–12 semanas
• NO sustituyen fibra diversa

**Prebióticos (alimento de probióticos):**
• Inulina: achicoria, alcachofa, plátano verde
• GOS: legumbres
• Resistent starch: arroz/papa fríos (recalentados)

**Cuándo NO darle fibra (competencia!):**
• 24–48h pre-competencia: reducir fibra (menos residuo intestinal)
• Post-entreno inmediato: priorizar absorción rápida

**Referencia:** Mohr AE et al. Gut Microbiota & Athletic Performance (2020), Curr Nutr Rep`,
    en: `**Gut Health for Athletes: The "Second Brain"**

**Impact on performance:**
• Microbiota produces ~50% dopamine and 95% serotonin
• "Leaky gut" barrier = systemic inflammation, fatigue
• High intensity + stress reduces GI blood flow → dysbiosis

**Strategies for athletes:**

**Fiber diversity (goal: 30+ sources/week):**
• Fruits, vegetables, legumes, whole grains, nuts, seeds
• Polyphenols (pure cacao, green tea, berries) → food for good microbes
• Avoid ultra-processed foods and artificial sweeteners (alter microbiota)

**Probiotics (specific evidence):**
• Lactobacillus + Bifidobacterium: may reduce URI (respiratory infections) in athletes
• Dose: 10^9–10^10 CFU/day
• Timing: with food, 4–12 week course
• Do NOT replace diverse fiber

**Prebiotics (probiotic food):**
• Inulin: chicory, artichoke, green banana
• GOS: legumes
• Resistant starch: cooled/reheated rice/potato

**When NOT to give fiber (competition!):**
• 24–48h pre-competition: reduce fiber (less intestinal residue)
• Immediate post-workout: prioritize fast absorption

**Reference:** Mohr AE et al. (2020), Curr Nutr Rep`
  },

  // ═══════════════════════════════════════════════════════════
  // 17. DOPING Y SUPLEMENTACIÓN SEGURA / DOPING & SAFE SUPPS (2 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['dopaje', 'doping', 'wada', 'prohibido', 'banned', 'contaminado', 'contaminated supplement', 'seguridad suplementos', 'supplement safety', 'certificado'],
    category: 'doping',
    es: `**Suplementación Segura: Evitar Dopaje Accidental**

**El riesgo real:**
• 10–20% de suplementos están CONTAMINADOS con sustancias prohibidas (WADA)
• Más común en: quemadores de grasa, pre-workouts, testo-boosters
• Fabricados en mismas instalaciones = cross-contaminación

**Certificaciones confiables (testeo independiente):**
• **NSF Certified for Sport** (más estricto)
• **Informed Sport** (testeo por lotes)
• **BSCG Certified Drug Free**
• **Collegiate/Professional** specific programs

**Categorías de riesgo (WADA 2024):**
• **SIEMPRE prohibido:** EPO, AAS, GH, SARMs, peptidos
• **Prohibido en competencia (no fuera):** estimulantes (amphetamina), glucocorticoides orales/IV/IM
• **Permitido con restricción:** cafeína (<12 mcg/mL orina), pseudoefedrina (<150 mcg/L)
• **Permitido:** creatina, proteína, cafeína (dosis normales), vitaminas

**Precauciones:**
• NUNCA usar suplementos de países sin regulación
• Revisar cada lote en app "Informed Sport" o "NSF"
• Desconfiar de: "proprietary blends", promesas extremas
• Documentar TODO lo que consumes

**Referencia:** WADA Prohibited List 2024; Maughan RJ. Contaminated Supplements (2018)`,
    en: `**Safe Supplementation: Avoiding Accidental Doping**

**The real risk:**
• 10–20% of supplements are CONTAMINATED with prohibited substances (WADA)
• Most common in: fat burners, pre-workouts, testo-boosters
• Made in same facilities = cross-contamination

**Reliable certifications (independent testing):**
• **NSF Certified for Sport** (strictest)
• **Informed Sport** (batch testing)
• **BSCG Certified Drug Free**
• **Collegiate/Professional** specific programs

**Risk categories (WADA 2024):**
• **ALWAYS prohibited:** EPO, AAS, GH, SARMs, peptides
• **Prohibited in-competition (not out):** stimulants (amphetamine), oral/IV/IM glucocorticoids
• **Permitted with restriction:** caffeine (<12 mcg/mL urine), pseudoephedrine (<150 mcg/L)
• **Permitted:** creatine, protein, caffeine (normal doses), vitamins

**Precautions:**
• NEVER use supplements from unregulated countries
• Check every batch on "Informed Sport" or "NSF" app
• Beware of: "proprietary blends", extreme promises
• Document EVERYTHING you consume

**Reference:** WADA Prohibited List 2024; Maughan RJ. (2018)`
  },

  // ═══════════════════════════════════════════════════════════
  // 18. RESPUESTAS ESPECÍFICAS POR DEPORTE / SPORT-SPECIFIC (6 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['corredor', 'runner', 'running', 'maraton', 'marathon', 'carrera', 'correr', 'endurance', 'resistencia'],
    category: 'sport_specific',
    es: `**Nutrición para Corredores de Fondo**

**Carbohidratos (el combustible principal):**
• Entrenamiento <1h/día: 4–5 g/kg
• Entrenamiento 1–2h/día: 5–7 g/kg
• Entrenamiento >2h/día: 7–10 g/kg
• Fase carga pre-maraton: 10–12 g/kg (últimos 2–3 días)

**Proteína (reparación muscular):**
• 1.4–1.8 g/kg (runner damage muscular es real)
• Timing post-carrera larga: 20–30g dentro de 2h

**Hidratación (critical para runners):**
• Test de sudor obligatorio (ver protocolo hidratación)
• Maraton: 30–60g carbs/h líquido
• Hiponatremia es riesgo real (no beber demasiado agua pura)

**Hierro ( runners especialmente):**
• Foot-strike hemolisis = pérdida de hierro
• Test ferritina cada 6 meses
• Objetivo: ferritina >50 ng/mL
• Suplementar solo si deficiente

**Gut training:**
• ENTRENAR GI con gels/bebidas que usarás en competencia
• Nunca algo nuevo en maratón
• Practicar carga de carbs en carreras largas de entreno

**Referencia:** Burke LM. Nutrition for Distance Events (2007), J Sports Sci`,
    en: `**Nutrition for Distance Runners**

**Carbohydrates (the main fuel):**
• Training <1h/day: 4–5 g/kg
• Training 1–2h/day: 5–7 g/kg
• Training >2h/day: 7–10 g/kg
• Pre-marathon loading: 10–12 g/kg (last 2–3 days)

**Protein (muscle repair):**
• 1.4–1.8 g/kg (runner muscle damage is real)
• Post-long run timing: 20–30g within 2h

**Hydration (critical for runners):**
• Mandatory sweat test (see hydration protocol)
• Marathon: 30–60g carbs/h liquid
• Hyponatremia is real risk (don't overdrink plain water)

**Iron (runners especially):**
• Foot-strike hemolysis = iron loss
• Test ferritin every 6 months
• Target: ferritin >50 ng/mL
• Supplement only if deficient

**Gut training:**
• TRAIN GI with gels/drinks you'll use in competition
• Never something new in marathon
• Practice carb loading in long training runs

**Reference:** Burke LM. (2007), J Sports Sci`
  },
  {
    keywords: ['halterofilia', 'weightlifting', 'powerlifting', 'fuerza', 'strength', 'levantamiento', 'olympic lifting', 'crossfit', 'crossfit'],
    category: 'sport_specific',
    es: `**Nutrición para Halterofilia / Powerlifting / Fuerza**

**Carbohidratos (para volumen de entreno):**
• Fase volumen: 4–6 g/kg (soportar mucho volumen)
• Fase intensidad/pico: 3–5 g/kg
• Pre-entreno: 1–2 g/kg 1–2h antes (rendimiento)

**Proteína (máxima prioridad):**
• 1.8–2.4 g/kg (más alto por búsqueda de masa)
• Dosis per meal: 0.4–0.5 g/kg
• Caseína nocturna: 30–40g (recuperación nocturna)

**Suplementos específicos:**
• **Creatina:** 5g/día (REQUERIDO — mayor beneficio en deportes de fuerza)
• **Cafeína:** 3–6 mg/kg pre-competencia (mejora 1RM)
• **Beta-alanina:** para sets de 1–4 min (accesorios de volumen)
• **Citrulina malato:** 6–8g pre (volumen accesorios)

**Corte de peso (competencia):**
• Máx 1–1.5% peso/semana (ACSM)
• Proteína: 2.4–3.1 g/kg en déficit (Helms 2014)
• Manipulación agua SOLO últimas 24h
• No restricción de sodio hasta 48h antes

**Vitamina D + Calcio:**
• Importante para salud ósea con cargas extremas
• Vit D: 2000–4000 UI/día
• Calcio: 1000mg/día

**Referencia:** Helms et al. Evidence-based recommendations for bodybuilding (2014)`,
    en: `**Nutrition for Weightlifting / Powerlifting / Strength**

**Carbohydrates (for training volume):**
• Volume phase: 4–6 g/kg (support high volume)
• Intensity/peak phase: 3–5 g/kg
• Pre-workout: 1–2 g/kg 1–2h before (performance)

**Protein (highest priority):**
• 1.8–2.4 g/kg (higher due to mass goals)
• Per meal dose: 0.4–0.5 g/kg
• Nighttime casein: 30–40g (overnight recovery)

**Specific supplements:**
• **Creatine:** 5g/day (REQUIRED — greatest benefit in strength sports)
• **Caffeine:** 3–6 mg/kg pre-competition (improves 1RM)
• **Beta-alanine:** for sets of 1–4 min (volume accessories)
• **Citrulline malate:** 6–8g pre (accessory volume)

**Weight cut (competition):**
• Max 1–1.5% body weight/week (ACSM)
• Protein: 2.4–3.1 g/kg in deficit (Helms 2014)
• Water manipulation ONLY last 24h
• No sodium restriction until 48h before

**Vitamin D + Calcium:**
• Important for bone health with extreme loads
• Vit D: 2000–4000 IU/day
• Calcium: 1000mg/day

**Reference:** Helms et al. (2014)`
  },
  {
    keywords: ['futbol', 'soccer', 'football', 'baloncesto', 'basketball', 'deporte equipo', 'team sport', 'deporte intermitente', 'intermittent sport'],
    category: 'sport_specific',
    es: `**Nutrición para Deportes de Equipo (Intermitente)**

**Características metabólicas:**
• Patrón: sprint repetido + recuperación parcial
• 50–70% de carbs provienen de glycogen muscular
• Partidos/cancha: 60–90 min de alta intensidad

**Carbohidratos:**
• Entrenamiento: 5–7 g/kg
• Día partido: 6–8 g/kg (carga moderada)
• Medio tiempo: 30g carbs (gel, plátano, bebida deportiva)

**Proteína:**
• 1.6–2.0 g/kg
• Timing post-partido: 25–40g dentro de 2h
• Reparación muscular de sprint repetido

**Hidratación (crítica en campo):**
• Pre-partido: 5–7 ml/kg 2–4h antes
• Medio tiempo: 150–250ml con electrolitos
• Temperatura >30°C: bebida con sodio + carbs

**Suplementos:**
• Cafeína: 3 mg/kg 60 min pre (mejora sprint repetido)
• Creatina: 5g/día (beneficia sprint recovery)
• Carb líquido durante: 30g/h si >60 min

**Periodización por temporada:**
• Pretemporada (alta carga): 6–8 g/kg carbs
• Temporada (competencia): 5–7 g/kg
• Entre temporadas: 4–5 g/kg

**Referencia:** Collins J et al. UEFA Nutrition Consensus (2021)`,
    en: `**Nutrition for Team Sports (Intermittent)**

**Metabolic characteristics:**
• Pattern: repeated sprint + partial recovery
• 50–70% carbs come from muscle glycogen
• Matches/court: 60–90 min high intensity

**Carbohydrates:**
• Training: 5–7 g/kg
• Match day: 6–8 g/kg (moderate loading)
• Halftime: 30g carbs (gel, banana, sports drink)

**Protein:**
• 1.6–2.0 g/kg
• Post-match timing: 25–40g within 2h
• Muscle repair from repeated sprints

**Hydration (critical on field):**
• Pre-match: 5–7 ml/kg 2–4h before
• Halftime: 150–250ml with electrolytes
• Temperature >30°C: drink with sodium + carbs

**Supplements:**
• Caffeine: 3 mg/kg 60 min pre (improves repeated sprint)
• Creatine: 5g/day (benefits sprint recovery)
• Liquid carb during: 30g/h if >60 min

**Periodization by season:**
• Pre-season (high load): 6–8 g/kg carbs
• Season (competition): 5–7 g/kg
• Off-season: 4–5 g/kg

**Reference:** Collins J et al. UEFA Nutrition Consensus (2021)`
  },

  // ═══════════════════════════════════════════════════════════
  // 19. MENTAL/COGNITIVO / MENTAL PERFORMANCE (2 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['mente', 'mental', 'cognitivo', 'cognitive', 'focus', 'enfoque', 'nootropico', 'nootropic', 'concentracion', 'concentration', 'estres', 'stress'],
    category: 'mental',
    es: `**Nutrición para Rendimiento Cognitivo y Mental**

**Carbohidratos cerebrales:**
• El cerebro usa ~120g glucosa/día (20% gasto energético total)
• <100g carbs/día = cognición reducida, decisión peor
• Para deportes de táctica (fútbol, basket, ajedrez): mantener 4–5 g/kg mínimo

**Cafeína (el nootrópico más evidenceado):**
• 1–3 mg/kg: mejor alerta sin ansiedad
• 3–6 mg/kg: máximo beneficio ergogénico
• Timing: 30–60 min pre-competencia

**L-teanina (sinérgica con cafeína):**
• 100–200mg + cafeína = calma enfocada (sin nerviosismo)
• Encontrada en té verde
• Ratio ideal: 1:2 teanina:cafeína

**Creatina (beneficios cognitivos):**
• 5g/día mejora memoria de trabajo y procesamiento
• Especialmente beneficioso en: vegetarianos, adultos mayores, privación de sueño
• Mismo protocolo que para músculo

**Omega-3 (DHA específicamente):**
• DHA es 40% del peso cerebral
• 1–2g DHA/día para función cognitiva
• Antiinflamatorio neuroprotector

**Hidratación cerebral:**
• 1–2% deshidratación = deterioro cognitivo medible
• 500ml agua pre-competencia puede mejorar decisión

**Referencia:** Rhee et al. Nutritional Supplements & Cognitive Performance (2021)`,
    en: `**Nutrition for Cognitive and Mental Performance**

**Brain carbohydrates:**
• Brain uses ~120g glucose/day (20% total energy expenditure)
• <100g carbs/day = reduced cognition, worse decision-making
• For tactical sports (soccer, basketball, chess): maintain 4–5 g/kg minimum

**Caffeine (the most evidence-based nootropic):**
• 1–3 mg/kg: better alertness without anxiety
• 3–6 mg/kg: maximum ergogenic benefit
• Timing: 30–60 min pre-competition

**L-theanine (synergistic with caffeine):**
• 100–200mg + caffeine = calm focus (no jitters)
• Found in green tea
• Ideal ratio: 1:2 theanine:caffeine

**Creatine (cognitive benefits):**
• 5g/day improves working memory and processing
• Especially beneficial for: vegetarians, older adults, sleep deprivation
• Same protocol as for muscle

**Omega-3 (DHA specifically):**
• DHA is 40% of brain weight
• 1–2g DHA/day for cognitive function
• Neuroprotective anti-inflammatory

**Brain hydration:**
• 1–2% dehydration = measurable cognitive decline
• 500ml water pre-competition can improve decision-making

**Reference:** Rhee et al. (2021)`
  },

  // ═══════════════════════════════════════════════════════════
  // 20. RESPUESTAS GENÉRICAS ÚTILES / GENERAL (3 responses)
  // ═══════════════════════════════════════════════════════════
  {
    keywords: ['ejemplo comida', 'meal example', 'menu', 'plan alimenticio', 'meal plan', 'que deberia comer', 'what should i eat', 'dieta tipo'],
    category: 'general',
    es: `**Ejemplo de Plan Alimenticio para Atleta (75kg, Fuerza)**

**Desayuno (7:00):**
• 3 huevos enteros + 100g claras
• 80g avena + plátano + miel
• Café con leche
• Macros: ~P:35g C:75g F:20g

**Snack medio mañana (10:00):**
• 200g yogur griego
• 30g almendras
• 1 fruta
• Macros: ~P:20g C:25g F:18g

**Comida (14:00) — Pre-entreno (2h antes):**
• 200g pechuga pollo
• 150g arroz blanco
• Verduras al vapor
• 1 cda aceite oliva
• Macros: ~P:55g C:60g F:15g

**Post-entreno (18:00):**
• 40g whey isolate
• 2 plátanos
• 30g miel
• Macros: ~P:45g C:70g F:2g

**Cena (21:00):**
• 200g pescado (salmón)
• 200g papa
• Ensalada grande
• Macros: ~P:45g C:40g F:25g

**Pre-sueño (22:30):**
• 35g caseína en agua
• Macros: ~P:30g C:2g F:1g

**TOTAL DÍA:** ~P:230g (3.1g/kg) | C:272g (3.6g/kg) | F:81g (1.1g/kg) | ~2850 kcal

**Referencia:** Distribución basada en ISSN 2022`,
    en: `**Example Meal Plan for Athlete (75kg, Strength)**

**Breakfast (7:00):**
• 3 whole eggs + 100g egg whites
• 80g oats + banana + honey
• Coffee with milk
• Macros: ~P:35g C:75g F:20g

**Mid-morning snack (10:00):**
• 200g Greek yogurt
• 30g almonds
• 1 fruit
• Macros: ~P:20g C:25g F:18g

**Lunch (14:00) — Pre-workout (2h before):**
• 200g chicken breast
• 150g white rice
• Steamed vegetables
• 1 tbsp olive oil
• Macros: ~P:55g C:60g F:15g

**Post-workout (18:00):**
• 40g whey isolate
• 2 bananas
• 30g honey
• Macros: ~P:45g C:70g F:2g

**Dinner (21:00):**
• 200g fish (salmon)
• 200g potato
• Large salad
• Macros: ~P:45g C:40g F:25g

**Pre-sleep (22:30):**
• 35g casein in water
• Macros: ~P:30g C:2g F:1g

**DAILY TOTAL:** ~P:230g (3.1g/kg) | C:272g (3.6g/kg) | F:81g (1.1g/kg) | ~2850 kcal

**Reference:** Distribution based on ISSN 2022`
  },
  {
    keywords: ['gracias', 'thank', 'adios', 'bye', 'hola', 'hello', 'buenos dias', 'good morning', 'buenas tardes', 'good afternoon', 'que tal', 'how are you'],
    category: 'general',
    es: `¡Hola! Soy tu AI Coach Nutricional de ANTHROSCOPE PRO. Estoy aquí para ayudarte con:

• Requerimientos de proteína, carbohidratos y grasas
• Suplementación evidence-based (creatina, cafeína, etc.)
• Nutrición pre/post entreno y durante competencia
• Hidratación personalizada
• Pérdida de grasa o ganancia muscular
• Nutrición femenina, vegana, para jóvenes o masters
• Prevención de RED-S y salud metabólica

**Pregúntame lo que necesites!** Algunos ejemplos:
- "¿Cuánta proteína necesito para hipertrofia?"
- "¿Cómo hidratarme en un maratón?"
- "¿Qué comer antes de entrenar fuerza?"
- "¿La creatina es segura?"
- "¿Cómo hacer un corte de peso para MMA?"

Todas mis respuestas están basadas en la evidencia científica actual (ISSN, ACSM, IOC 2018–2024).`,
    en: `Hello! I'm your AI Nutrition Coach from ANTHROSCOPE PRO. I'm here to help you with:

• Protein, carbohydrate, and fat requirements
• Evidence-based supplementation (creatine, caffeine, etc.)
• Pre/post workout and competition nutrition
• Personalized hydration
• Fat loss or muscle gain
• Female, vegan, youth, or masters nutrition
• RED-S prevention and metabolic health

**Ask me anything!** Some examples:
- "How much protein do I need for hypertrophy?"
- "How to hydrate for a marathon?"
- "What to eat before strength training?"
- "Is creatine safe?"
- "How to do a weight cut for MMA?"

All my responses are based on current scientific evidence (ISSN, ACSM, IOC 2018–2024).`
  },
];

// ============================================================
// Función de matching inteligente
// ============================================================

/**
 * Encuentra la mejor respuesta demo según la pregunta del usuario.
 * Usa un sistema de scoring basado en coincidencias de keywords.
 */
export function findBestDemoResponse(question: string, lang: 'es' | 'en'): string {
  const lowerQ = question.toLowerCase().trim();
  
  // Puntuación para cada respuesta
  let bestMatch: DemoResponse | null = null;
  let bestScore = 0;
  
  for (const response of DEMO_RESPONSES) {
    let score = 0;
    
    for (const keyword of response.keywords) {
      const lowerKeyword = keyword.toLowerCase();
      
      if (lowerQ === lowerKeyword) {
        // Coincidencia exacta = máxima puntuación
        score += 100;
      } else if (lowerQ.includes(lowerKeyword)) {
        // Contiene keyword = buena puntuación
        score += 10 * lowerKeyword.length; // Keywords más largas = más específicas
      } else {
        // Coincidencia parcial de palabras
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
  
  // Umbral mínimo de coincidencia
  if (bestMatch && bestScore >= 5) {
    return lang === 'en' ? bestMatch.en : bestMatch.es;
  }
  
  // Respuesta genérica de fallback
  return lang === 'en' 
    ? `**Analysis of your question:**\n\nBased on current evidence (ACSM, ISSN, IOC 2018–2024), I don't have a specific pre-programmed response for "${question.substring(0, 60)}..."\n\n**General guidance:**\n1. **Anthropometric assessment:** ISAK Level 1–4 for body composition\n2. **Individualization:** Every athlete has unique needs based on training load, goals, and physiology\n3. **Evidence-based approach:** Prioritize whole foods, adequate protein (1.6–2.2 g/kg), and periodized nutrition\n4. **Professional consultation:** For personalized plans, consult a sports nutritionist\n\n⚡ **Try asking about:** protein requirements, hydration protocols, supplements (creatine, caffeine), pre/post workout nutrition, or competition day strategies.`
    : `**Análisis de tu consulta:**\n\nBasado en la evidencia actual (ACSM, ISSN, IOC 2018–2024), no tengo una respuesta específica pre-programmada para "${question.substring(0, 60)}..."\n\n**Orientación general:**\n1. **Evaluación antropométrica:** ISAK Nivel 1–4 para composición corporal\n2. **Individualización:** Cada atleta tiene necesidades únicas según carga, objetivos y fisiología\n3. **Enfoque evidence-based:** Prioriza alimentos reales, proteína adecuada (1.6–2.2 g/kg), y nutrición periodizada\n4. **Consulta profesional:** Para planes personalizados, consulta a un nutricionista deportivo\n\n⚡ **Intenta preguntar sobre:** requerimientos de proteína, protocolos de hidratación, suplementos (creatina, cafeína), nutrición pre/post entreno, o estrategias para día de competencia.`;
}

/**
 * Devuelve las categorías disponibles para debugging
 */
export function getDemoCategories(): string[] {
  const cats = new Set(DEMO_RESPONSES.map(r => r.category));
  return Array.from(cats);
}

/**
 * Cuenta el total de respuestas
 */
export function getDemoResponseCount(): number {
  return DEMO_RESPONSES.length;
}
