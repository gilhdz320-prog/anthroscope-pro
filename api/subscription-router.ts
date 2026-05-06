import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { planes, suscripciones, pagos } from "@db/schema";
import { eq, and, gte } from "drizzle-orm";

export const subscriptionRouter = createRouter({
  // Obtener todos los planes activos
  listPlans: publicQuery.query(async () => {
    const db = getDb();
    const allPlans = await db.select().from(planes).where(eq(planes.activo, "si"));
    return allPlans;
  }),

  // Obtener plan por codigo
  getPlan: publicQuery
    .input(z.object({ codigo: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [plan] = await db
        .select()
        .from(planes)
        .where(and(eq(planes.codigo, input.codigo), eq(planes.activo, "si")))
        .limit(1);
      return plan ?? null;
    }),

  // Crear suscripcion (desde webhook o manual)
  createSubscription: publicQuery
    .input(
      z.object({
        userId: z.number(),
        planId: z.number(),
        periodo: z.enum(["mensual", "anual"]),
        montoPagado: z.string(),
        paymentId: z.string().optional(),
        metodoPago: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [plan] = await db.select().from(planes).where(eq(planes.id, input.planId)).limit(1);
      if (!plan) throw new Error("Plan no encontrado");

      const meses = input.periodo === "anual" ? 12 : 1;
      const fechaFin = new Date();
      fechaFin.setMonth(fechaFin.getMonth() + meses);

      const [sub] = await db.insert(suscripciones).values({
        userId: input.userId,
        planId: input.planId,
        estado: "activa",
        periodo: input.periodo,
        fechaInicio: new Date(),
        fechaFin,
        montoPagado: input.montoPagado,
        paymentId: input.paymentId,
        metodoPago: input.metodoPago,
      });

      // Registrar pago
      await db.insert(pagos).values({
        suscripcionId: Number(sub.insertId),
        userId: input.userId,
        monto: input.montoPagado,
        estado: "completado",
        metodoPago: input.metodoPago,
        paymentProviderId: input.paymentId,
      });

      return { success: true, subscriptionId: Number(sub.insertId) };
    }),

  // Verificar si usuario tiene suscripcion activa
  checkActive: publicQuery
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [active] = await db
        .select()
        .from(suscripciones)
        .where(
          and(
            eq(suscripciones.userId, input.userId),
            eq(suscripciones.estado, "activa"),
            gte(suscripciones.fechaFin, new Date())
          )
        )
        .orderBy(suscripciones.fechaFin)
        .limit(1);

      if (!active) {
        // Verificar trial
        const [trial] = await db
          .select()
          .from(suscripciones)
          .where(
            and(
              eq(suscripciones.userId, input.userId),
              eq(suscripciones.estado, "trial")
            )
          )
          .limit(1);

        return {
          hasActive: false,
          isTrial: !!trial,
          trialDaysLeft: trial ? Math.max(0, Math.ceil((new Date(trial.fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 14,
          plan: null,
        };
      }

      const [plan] = await db.select().from(planes).where(eq(planes.id, active.planId)).limit(1);

      return {
        hasActive: true,
        isTrial: false,
        trialDaysLeft: 0,
        plan,
        subscription: active,
        daysLeft: Math.max(0, Math.ceil((new Date(active.fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
      };
    }),
});
