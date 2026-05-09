import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const CLAUDE_MODEL = "claude-sonnet-4-20250514";

async function callClaude(systemPrompt: string, userMessage: string): Promise<{ answer: string | null; error: string | null }> {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.length < 10) {
    return { 
      error: "ANTHROPIC_API_KEY no configurada. Ve a Render > Environment Variables.", 
      answer: null 
    };
  }
  
  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });
    const content = response.content[0];
    return { answer: content.type === "text" ? content.text : "", error: null };
  } catch (err: any) {
    return { error: err.message || "Error de Claude API", answer: null };
  }
}

const NUTRITION_SYSTEM_PROMPT = `Eres un nutriologo deportivo certificado. Especialista en antropometria ISAK, periodizacion nutricional.

REGLAS:
1. SIEMPRE basa tus recomendaciones en evidencia cientifica (ACSM, ISSN, IOC)
2. Usa el Sistema de Equivalentes Mexicanos para las porciones
3. Incluye INDICE GLICEMICO de cada alimento recomendado
4. Personaliza segun: sexo, edad, peso, % grasa, objetivo, deporte
5. NO recomiendes suplementos sin justificar con evidencia
6. FORMATO: Markdown con tablas claras

IDIOMA: Responde en el idioma del usuario.`;

export const claudeRouter = createRouter({
  generateNutritionPlan: publicQuery
    .input(
      z.object({
        name: z.string().optional(),
        age: z.number().min(10).max(100),
        sex: z.enum(["male", "female"]),
        weight: z.number().min(30).max(200),
        height: z.number().min(100).max(250),
        bodyFat: z.number().min(3).max(60),
        muscleMass: z.number().optional(),
        sport: z.string().optional(),
        trainingHours: z.number().min(0).max(40).optional(),
        goal: z.enum(["lose_fat", "gain_muscle", "maintain", "performance", "recomposition"]),
        dietaryRestrictions: z.string().optional(),
        language: z.enum(["es", "en"]).default("es"),
      })
    )
    .mutation(async ({ input }) => {
      const prompt = `Genera un plan nutricional completo y personalizado:

**DATOS DEL PACIENTE:**
- Nombre: ${input.name || "No especificado"}
- Edad: ${input.age} anos
- Sexo: ${input.sex === "male" ? "Masculino" : "Femenino"}
- Peso: ${input.weight} kg
- Estatura: ${input.height} cm
- % Grasa corporal: ${input.bodyFat}%
- Masa muscular: ${input.muscleMass || "No medida"} kg
- Deporte: ${input.sport || "No especificado"}
- Horas/semana: ${input.trainingHours || "No especificado"}
- Objetivo: ${input.goal}
- Restricciones: ${input.dietaryRestrictions || "Ninguna"}
- Idioma: ${input.language === "es" ? "Espanol" : "English"}`;

      return callClaude(NUTRITION_SYSTEM_PROMPT, prompt);
    }),

  askNutritionQuestion: publicQuery
    .input(
      z.object({
        question: z.string().min(3).max(2000),
        context: z.string().optional(),
        language: z.enum(["es", "en"]).default("es"),
        lang: z.enum(["es", "en"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const idioma = input.lang || input.language || "es";
      
      const systemPrompt = `Eres un nutriologo deportivo experto certificado. Responde basandote en evidencia cientifica (ACSM, ISSN, IOC, ISAK).

REGLAS:
1. SIEMPRE cita la fuente de tus respuestas
2. Usa lenguaje claro pero profesional
3. Incluye valores numericos especificos cuando sea posible
4. Si no estas seguro, di "No tengo evidencia suficiente para responder con certeza"
5. NUNCA recomiendes algo peligroso para la salud
6. Idioma: ${idioma === "es" ? "Espanol" : "English"}`;

      const prompt = input.context
        ? `Contexto del paciente: ${input.context}\n\nPregunta: ${input.question}`
        : input.question;

      return callClaude(systemPrompt, prompt);
    }),

  analyzeMeal: publicQuery
    .input(
      z.object({
        mealDescription: z.string().min(10).max(2000),
        goal: z.enum(["lose_fat", "gain_muscle", "maintain", "performance"]).optional(),
        language: z.enum(["es", "en"]).default("es"),
      })
    )
    .mutation(async ({ input }) => {
      const systemPrompt = `Eres un nutriologo experto en analisis de comidas. Analiza la comida descrita y proporciona:
1. Estimacion de calorias totales
2. Distribucion de macronutrientes (proteinas, carbohidratos, grasas, fibra)
3. Indice glicemico estimado
4. Recomendaciones de mejora
5. Equivalentes mexicanos estimados

Idioma: ${input.language === "es" ? "Espanol" : "English"}`;

      return callClaude(
        systemPrompt,
        `Analiza esta comida: "${input.mealDescription}"\nObjetivo: ${input.goal || "No especificado"}`
      );
    }),
});
