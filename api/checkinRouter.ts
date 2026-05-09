import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { checkins } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

export const checkinRouter = createRouter({
  create: publicQuery.input(z.object({
    userId: z.number(), coachId: z.number(), semanaNumero: z.number(),
    pesoActual: z.number().optional(), pesoCambio: z.number().optional(),
    energia: z.number().min(1).max(10).optional(), suenoCalidad: z.number().min(1).max(10).optional(),
    suenoHoras: z.number().optional(), estres: z.number().min(1).max(10).optional(),
    humor: z.number().min(1).max(10).optional(), hambre: z.number().min(1).max(10).optional(),
    adherenciaDieta: z.number().min(0).max(100).optional(), adherenciaEntreno: z.number().min(0).max(100).optional(),
    adherenciaSueno: z.number().min(0).max(100).optional(), sintomas: z.string().optional(),
    notasCliente: z.string().optional(), cambioFuerza: z.enum(["aumento","mantuvo","disminuyo"]).optional(),
    cambioResistencia: z.enum(["aumento","mantuvo","disminuyo"]).optional(),
  })).mutation(async ({ input }) => {
    const db = getDb();
    const [result] = await db.insert(checkins).values({ ...input, estado: "completado" });
    return { id: Number(result.insertId), success: true };
  }),

  getByClient: publicQuery.input(z.object({ userId: z.number(), coachId: z.number().optional() }))
    .query(async ({ input }) => {
      const db = getDb();
      const where = input.coachId ? and(eq(checkins.userId, input.userId), eq(checkins.coachId, input.coachId)) : eq(checkins.userId, input.userId);
      return db.select().from(checkins).where(where).orderBy(desc(checkins.fechaCheckin));
    }),

  getPending: publicQuery.input(z.object({ coachId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(checkins).where(and(eq(checkins.coachId, input.coachId), eq(checkins.estado, "pendiente"))).orderBy(desc(checkins.fechaCheckin));
    }),

  review: publicQuery.input(z.object({ id: z.number(), coachId: z.number(), notasCoach: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(checkins).set({ notasCoach: input.notasCoach, estado: "revisado", revisadoPor: input.coachId, fechaRevision: new Date() }).where(eq(checkins.id, input.id));
      return { success: true };
    }),

  getStats: publicQuery.input(z.object({ coachId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const all = await db.select().from(checkins).where(eq(checkins.coachId, input.coachId));
      const c = all.filter(x => x.estado === "completado");
      return { total: all.length, completados: c.length, revisados: all.filter(x => x.estado === "revisado").length, pendientes: all.filter(x => x.estado === "pendiente").length, avgAdherencia: c.length > 0 ? Math.round(c.reduce((a,x) => a + (x.adherenciaDieta || 0), 0) / c.length) : 0 };
    }),
});
