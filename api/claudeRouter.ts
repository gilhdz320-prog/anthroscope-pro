import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import Anthropic from "@anthropic-ai/sdk";
import { findBestDemoResponse } from "./demoResponses";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const CLAUDE_MODELS = [
  "claude-3-5-sonnet-20241022",
  "claude-3-sonnet-20240229", 
  "claude-3-haiku-20240307",
];

async function callClaudeWithFallback(systemPrompt: string, userMessage: string): Promise<{ answer: string | null; error: string | null }> {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.length < 10) {
    return { error: "No ANTHROPIC_API_KEY", answer: null };
  }
  for (const model of CLAUDE_MODELS) {
    try {
      const response = await anthropic.messages.create({
        model, max_tokens: 4000, system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      const content = response.content[0];
      return { answer: content.type === "text" ? content.text : "", error: null };
    } catch (err: any) {
      console.log(`[Claude] ${model} failed: ${err.message?.substring(0, 80)}`);
    }
  }
  return { error: "Todos los modelos fallaron", answer: null };
}

const NUTRITION_SYSTEM_PROMPT = `Eres un nutriologo deportivo certificado. Especialista en antropometria ISAK, periodizacion nutricional.
REGLAS:
1. SIEMPRE basa tus recomendaciones en evidencia cientifica (ACSM, ISSN, IOC)
2. Usa el Sistema de Equivalentes Mexicanos
3. Incluye INDICE GLICEMICO
4. Personaliza segun: sexo, edad, peso, % grasa, objetivo, deporte
5. NO recomiendes suplementos sin evidencia
6. FORMATO: Markdown con tablas claras
IDIOMA: Responde en el idioma del usuario.`;

export const claudeRouter = createRouter({
  generateNutritionPlan: publicQuery
    .input(z.object({
      name: z.string().optional(), age: z.number().min(10).max(100),
      sex: z.enum(["male", "female"]), weight: z.number().min(30).max(200),
      height: z.number().min(100).max(250), bodyFat: z.number().min(3).max(60),
      muscleMass: z.number().optional(), sport: z.string().optional(),
      trainingHours: z.number().min(0).max(40).optional(),
      goal: z.enum(["lose_fat", "gain_muscle", "maintain", "performance", "recomposition"]),
      dietaryRestrictions: z.string().optional(), language: z.enum(["es", "en"]).default("es"),
    }))
    .mutation(async ({ input }) => {
      const prompt = `Genera plan nutricional personalizado:
**PACIENTE:** ${input.name || "N/A"}, ${input.age}a, ${input.sex}, ${input.weight}kg, ${input.height}cm, ${input.bodyFat}% grasa, ${input.muscleMass || "N/A"}kg masa, ${input.sport || "N/A"}, ${input.trainingHours || "N/A"}h/semana, Objetivo: ${input.goal}, Restricciones: ${input.dietaryRestrictions || "Ninguna"}, Idioma: ${input.language}`;
      const result = await callClaudeWithFallback(NUTRITION_SYSTEM_PROMPT, prompt);
      if (result.answer) return result;
      const lang = input.language || "es";
      const fb = lang === "en"
        ? `**Plan for ${input.name || "Athlete"}**\n**Energy:** Use Cunningham (500 + 22 x fat-free mass kg) x activity (1.6-2.2)\n**Protein:** ${input.goal === "lose_fat" ? "2.3-3.1" : "1.6-2.2"} g/kg (ISSN 2022)\n**Carbs:** 4-7 g/kg periodized\n**Fats:** 0.8-1.0 g/kg min\n**Meals:** 4-5 every 3-4h, 0.3-0.5 g/kg protein per meal\n**Hydration:** 35-40 ml/kg daily\n**Supps:** Creatine 5g/d (ISSN 2021), Caffeine 3-6 mg/kg pre-workout\n\n**References:** ISSN (2022), ACSM Guidelines, IOC (2018)`
        : `**Plan para ${input.name || "Atleta"}**\n**Energia:** Usa Cunningham (500 + 22 x masa magra kg) x actividad (1.6-2.2)\n**Proteina:** ${input.goal === "lose_fat" ? "2.3-3.1" : "1.6-2.2"} g/kg (ISSN 2022)\n**Carbs:** 4-7 g/kg periodizado\n**Grasas:** 0.8-1.0 g/kg min\n**Comidas:** 4-5 cada 3-4h, 0.3-0.5 g/kg proteina por comida\n**Hidratacion:** 35-40 ml/kg diario\n**Suplementos:** Creatina 5g/d (ISSN 2021), Cafeina 3-6 mg/kg pre-entreno\n\n**Referencias:** ISSN (2022), ACSM Guidelines, IOC (2018)`;
      return { answer: fb, error: null };
    }),

  askNutritionQuestion: publicQuery
    .input(z.object({
      question: z.string().min(3).max(2000), context: z.string().optional(),
      language: z.enum(["es", "en"]).default("es"), lang: z.enum(["es", "en"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const idioma = (input.lang || input.language || "es") as "es" | "en";
      const systemPrompt = `Eres nutriologo deportivo experto (ACSM, ISSN, IOC, ISAK).
REGLAS: 1. Cita fuentes. 2. Lenguaje profesional. 3. Valores numericos. 4. Si no sabes, dilo. 5. NADA peligroso. 6. Idioma: ${idioma === "es" ? "Espanol" : "English"}`;
      const prompt = input.context ? `Contexto: ${input.context}\n\nPregunta: ${input.question}` : input.question;
      console.log("[ask] Q:", input.question.substring(0, 50), "| Lang:", idioma);
      const result = await callClaudeWithFallback(systemPrompt, prompt);
      if (result.answer) { console.log("[ask] Claude OK!"); return result; }
      console.log("[ask] Claude fallo, usando fallback...");
      return { answer: findBestDemoResponse(input.question, idioma), error: null };
    }),

  analyzeMeal: publicQuery
    .input(z.object({
      mealDescription: z.string().min(10).max(2000),
      goal: z.enum(["lose_fat", "gain_muscle", "maintain", "performance"]).optional(),
      language: z.enum(["es", "en"]).default("es"),
    }))
    .mutation(async ({ input }) => {
      const systemPrompt = `Analiza comida. Proporciona: 1. Calorias. 2. Macros. 3. IG. 4. Mejoras. 5. Equivalentes MX. Idioma: ${input.language === "es" ? "Espanol" : "English"}`;
      const result = await callClaudeWithFallback(systemPrompt, `Analiza: "${input.mealDescription}"\nObjetivo: ${input.goal || "N/A"}`);
      if (result.answer) return result;
      const lang = input.language || "es";
      return { answer: lang === "en" 
        ? `**Meal Analysis (AI unavailable)**\n\nFor: \"${input.mealDescription.substring(0, 50)}...\"\n\n1. **Track portions** with Mexican Equivalents\n2. **Protein every meal:** 0.3-0.5 g/kg\n3. **Include vegetables** for fiber & micronutrients\n4. **Time carbs** around training\n5. **Hydrate:** 35-40 ml/kg daily\n\n**References:** ISSN (2022), ACSM`
        : `**Analisis de Comida (IA no disponible)**\n\nPara: \"${input.mealDescription.substring(0, 50)}...\"\n\n1. **Controla porciones** con Equivalentes Mexicanos\n2. **Proteina cada comida:** 0.3-0.5 g/kg\n3. **Incluye verduras** para fibra y micronutrientes\n4. **Carbs alrededor del entreno**\n5. **Hidratacion:** 35-40 ml/kg diario\n\n**Referencias:** ISSN (2022), ACSM`, error: null };
    }),
});
