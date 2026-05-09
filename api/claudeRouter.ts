import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { findBestDemoResponse } from "./demoResponses";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o";

async function callOpenAI(systemPrompt: string, userMessage: string): Promise<{ answer: string | null; error: string | null }> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY.length < 10) {
    return { error: "OPENAI_API_KEY no configurada", answer: null };
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { error: `OpenAI: ${err.error?.message || response.status}`, answer: null };
    }
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    if (!answer) return { error: "OpenAI vacio", answer: null };
    return { answer, error: null };
  } catch (err: any) {
    return { error: `Error: ${err.message}`, answer: null };
  }
}

const NUTRITION_SYSTEM_PROMPT = `Eres nutriologo deportivo certificado (ACSM, ISSN, IOC). FORMATO: Markdown con tablas. Cita fuentes.`;

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
      const prompt = `Plan nutricional para: ${input.name || "N/A"}, ${input.age}a, ${input.sex}, ${input.weight}kg, ${input.height}cm, ${input.bodyFat}% grasa, ${input.muscleMass || "N/A"}kg masa, ${input.sport || "N/A"}, ${input.trainingHours || "N/A"}h/semana, Objetivo: ${input.goal}, Restricciones: ${input.dietaryRestrictions || "Ninguna"}, Idioma: ${input.language}`;
      const result = await callOpenAI(NUTRITION_SYSTEM_PROMPT, prompt);
      if (result.answer) return result;
      const fb = (input.language || "es") === "en"
        ? `**Plan**\\nProtein: ${input.goal === "lose_fat" ? "2.3-3.1" : "1.6-2.2"} g/kg\\nCarbs: 4-7 g/kg\\nFats: 0.8-1.0 g/kg\\nRef: ISSN 2022`
        : `**Plan**\\nProteina: ${input.goal === "lose_fat" ? "2.3-3.1" : "1.6-2.2"} g/kg\\nCarbs: 4-7 g/kg\\nGrasas: 0.8-1.0 g/kg\\nRef: ISSN 2022`;
      return { answer: fb, error: null };
    }),

  askNutritionQuestion: publicQuery
    .input(z.object({
      question: z.string().min(3).max(2000), context: z.string().optional(),
      language: z.enum(["es", "en"]).default("es"), lang: z.enum(["es", "en"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const idioma = (input.lang || input.language || "es") as "es" | "en";
      const systemPrompt = `Eres nutriologo deportivo experto (ACSM, ISSN, IOC, ISAK). Cita fuentes. FORMATO: Markdown. Idioma: ${idioma === "es" ? "Espanol" : "English"}`;
      const prompt = input.context ? `Contexto: ${input.context}\\n\\nPregunta: ${input.question}` : input.question;
      const result = await callOpenAI(systemPrompt, prompt);
      if (result.answer) return result;
      return { answer: findBestDemoResponse(input.question, idioma), error: null };
    }),

  analyzeMeal: publicQuery
    .input(z.object({
      mealDescription: z.string().min(10).max(2000),
      goal: z.enum(["lose_fat", "gain_muscle", "maintain", "performance"]).optional(),
      language: z.enum(["es", "en"]).default("es"),
    }))
    .mutation(async ({ input }) => {
      const systemPrompt = `Analiza comida. 1. Calorias 2. Macros 3. IG 4. Mejoras 5. Equiv MX. Idioma: ${input.language === "es" ? "Espanol" : "English"}`;
      const result = await callOpenAI(systemPrompt, `Analiza: "${input.mealDescription}"\\nObjetivo: ${input.goal || "N/A"}`);
      if (result.answer) return result;
      return { answer: (input.language || "es") === "en"
        ? `**Meal Analysis**\\n1. Track portions\\n2. Protein: 0.3-0.5 g/kg/meal\\n3. Include vegetables\\n4. Time carbs around training`
        : `**Analisis**\\n1. Controla porciones\\n2. Proteina: 0.3-0.5 g/kg/comida\\n3. Incluye verduras\\n4. Carbs alrededor del entreno`, error: null };
    }),
});
