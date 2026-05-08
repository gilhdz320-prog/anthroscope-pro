import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { evaluaciones } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const evaluacionesRouter = createRouter({
  // Listar evaluaciones del usuario
  list: publicQuery
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(evaluaciones)
        .where(eq(evaluaciones.evaluadorId, input.userId))
        .orderBy(desc(evaluaciones.createdAt));
      return rows;
    }),

  // Crear nueva evaluación
  create: publicQuery
    .input(
      z.object({
        atletaId: z.number(),
        equipoId: z.number().optional(),
        evaluadorId: z.number(),
        nivel: z.number().min(1).max(4),
        fechaEvaluacion: z.string().optional(),
        // Básicas
        masaCorporal: z.number(),
        estatura: z.number(),
        tallaSentada: z.number().optional(),
        // Pliegues
        triceps: z.number(),
        subescapular: z.number(),
        biceps: z.number(),
        crestaIliaca: z.number(),
        supraespinal: z.number(),
        abdominal: z.number(),
        musloAnterior: z.number(),
        piernaMedial: z.number(),
        // Perímetros
        brazoRelajado: z.number(),
        brazoFlexionado: z.number(),
        cinturaMinima: z.number(),
        gluteoMaximo: z.number(),
        pantorrillaMaxima: z.number(),
        // Nivel 2
        biacromial: z.number().optional(),
        humeroBiepicondilar: z.number().optional(),
        femurBicondilar: z.number().optional(),
        toraxMesoesternal: z.number().optional(),
        musloMedio: z.number().optional(),
        antebrazoMaximo: z.number().optional(),
        mano: z.number().optional(),
        pie: z.number().optional(),
        cabeza: z.number().optional(),
        cuello: z.number().optional(),
        // Resultados calculados
        resultadosJson: z.any().optional(),
        avanzadoJson: z.any().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [row] = await db.insert(evaluaciones).values({
        atletaId: input.atletaId,
        equipoId: input.equipoId,
        evaluadorId: input.evaluadorId,
        nivel: input.nivel,
        fechaEvaluacion: input.fechaEvaluacion ? new Date(input.fechaEvaluacion) : new Date(),
        masaCorporal: input.masaCorporal,
        estatura: input.estatura,
        tallaSentada: input.tallaSentada ?? 0,
        triceps: input.triceps,
        subescapular: input.subescapular,
        biceps: input.biceps,
        crestaIliaca: input.crestaIliaca,
        supraespinal: input.supraespinal,
        abdominal: input.abdominal,
        musloAnterior: input.musloAnterior,
        piernaMedial: input.piernaMedial,
        brazoRelajado: input.brazoRelajado,
        brazoFlexionado: input.brazoFlexionado,
        cinturaMinima: input.cinturaMinima,
        gluteoMaximo: input.gluteoMaximo,
        pantorrillaMaxima: input.pantorrillaMaxima,
        biacromial: input.biacromial ?? 0,
        humeroBiepicondilar: input.humeroBiepicondilar ?? 0,
        femurBicondilar: input.femurBicondilar ?? 0,
        toraxMesoesternal: input.toraxMesoesternal ?? 0,
        musloMedio: input.musloMedio ?? 0,
        antebrazoMaximo: input.antebrazoMaximo ?? 0,
        mano: input.mano ?? 0,
        pie: input.pie ?? 0,
        cabeza: input.cabeza ?? 0,
        cuello: input.cuello ?? 0,
        resultadosJson: input.resultadosJson ?? null,
        avanzadoJson: input.avanzadoJson ?? null,
      } as any);
      return { id: Number((row as any).insertId), success: true };
    }),

  // Obtener una evaluación por ID
  get: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [row] = await db
        .select()
        .from(evaluaciones)
        .where(eq(evaluaciones.id, input.id))
        .limit(1);
      return row ?? null;
    }),

  // Eliminar evaluación
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(evaluaciones).where(eq(evaluaciones.id, input.id));
      return { success: true };
    }),
});
