import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { wearablesData } from "../db/schema";
import { eq, and, desc, gte } from "drizzle-orm";

export const wearablesRouter = createRouter({
  // Registrar datos de un wearable
  sync: publicQuery
    .input(
      z.object({
        userId: z.number(),
        coachId: z.number(),
        dispositivo: z.enum(["google_fit", "fitbit", "apple_health", "samsung_health", "garmin"]),
        dispositivoId: z.string().optional(),
        fecha: z.string().optional(),
        pasos: z.number().optional(),
        caloriasQuemadas: z.number().optional(),
        distanciaMetros: z.number().optional(),
        ritmoCardiacoPromedio: z.number().optional(),
        ritmoCardiacoMax: z.number().optional(),
        ritmoCardiacoMin: z.number().optional(),
        minutosSedentario: z.number().optional(),
        minutosLigero: z.number().optional(),
        minutosModerado: z.number().optional(),
        minutosIntenso: z.number().optional(),
        horasSueno: z.number().optional(),
        minutosSuenoProfundo: z.number().optional(),
        minutosSuenoREM: z.number().optional(),
        peso: z.number().optional(),
        actividadPrincipal: z.string().optional(),
        rawData: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const fecha = input.fecha ? new Date(input.fecha) : new Date();
      const [result] = await db.insert(wearablesData).values({
        userId: input.userId,
        coachId: input.coachId,
        dispositivo: input.dispositivo,
        dispositivoId: input.dispositivoId,
        fecha,
        pasos: input.pasos,
        caloriasQuemadas: input.caloriasQuemadas,
        distanciaMetros: input.distanciaMetros,
        ritmoCardiacoPromedio: input.ritmoCardiacoPromedio,
        ritmoCardiacoMax: input.ritmoCardiacoMax,
        ritmoCardiacoMin: input.ritmoCardiacoMin,
        minutosSedentario: input.minutosSedentario,
        minutosLigero: input.minutosLigero,
        minutosModerado: input.minutosModerado,
        minutosIntenso: input.minutosIntenso,
        horasSueno: input.horasSueno,
        minutosSuenoProfundo: input.minutosSuenoProfundo,
        minutosSuenoREM: input.minutosSuenoREM,
        peso: input.peso,
        actividadPrincipal: input.actividadPrincipal,
        rawData: input.rawData,
      });
      return { id: Number(result.insertId), success: true };
    }),

  // Obtener datos de un cliente (ultimos 7 dias)
  getByClient: publicQuery
    .input(z.object({ userId: z.number(), dias: z.number().default(7) }))
    .query(async ({ input }) => {
      const db = getDb();
      const desde = new Date();
      desde.setDate(desde.getDate() - input.dias);
      return db.select().from(wearablesData)
        .where(and(eq(wearablesData.userId, input.userId), gte(wearablesData.fecha, desde)))
        .orderBy(desc(wearablesData.fecha));
    }),

  // Obtener ultimo registro de un cliente
  getLatest: publicQuery
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db.select().from(wearablesData)
        .where(eq(wearablesData.userId, input.userId))
        .orderBy(desc(wearablesData.fecha))
        .limit(1);
      return results[0] || null;
    }),

  // Estadisticas resumen (ultimos 7 dias)
  getStats: publicQuery
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const desde = new Date();
      desde.setDate(desde.getDate() - 7);
      const data = await db.select().from(wearablesData)
        .where(and(eq(wearablesData.userId, input.userId), gte(wearablesData.fecha, desde)))
        .orderBy(desc(wearablesData.fecha));

      if (data.length === 0) return null;

      const avgSteps = Math.round(data.reduce((a, r) => a + (r.pasos || 0), 0) / data.length);
      const avgCalories = Math.round(data.reduce((a, r) => a + (r.caloriasQuemadas || 0), 0) / data.length);
      const avgHeartRate = Math.round(data.reduce((a, r) => a + (r.ritmoCardiacoPromedio || 0), 0) / data.filter(r => r.ritmoCardiacoPromedio).length) || 0;
      const avgSleep = (data.reduce((a, r) => a + (Number(r.horasSueno) || 0), 0) / data.filter(r => r.horasSueno).length) || 0;
      const avgActiveMinutes = Math.round(data.reduce((a, r) => a + ((r.minutosLigero || 0) + (r.minutosModerado || 0) + (r.minutosIntenso || 0)), 0) / data.length);

      return {
        diasRegistrados: data.length,
        promedioPasos: avgSteps,
        promedioCalorias: avgCalories,
        promedioRitmoCardiaco: avgHeartRate,
        promedioSueno: avgSleep.toFixed(1),
        promedioMinutosActivos: avgActiveMinutes,
        totalPasosSemana: data.reduce((a, r) => a + (r.pasos || 0), 0),
        totalCaloriasSemana: data.reduce((a, r) => a + (r.caloriasQuemadas || 0), 0),
        ultimaSincronizacion: data[0]?.syncAt,
        dispositivo: data[0]?.dispositivo,
      };
    }),

  // Eliminar datos de un wearable desconectado
  disconnect: publicQuery
    .input(z.object({ userId: z.number(), dispositivo: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(wearablesData).where(
        and(eq(wearablesData.userId, input.userId), eq(wearablesData.dispositivo, input.dispositivo))
      );
      return { success: true };
    }),
});
