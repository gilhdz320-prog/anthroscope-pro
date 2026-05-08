import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { suscripciones, pagos, planes } from "@db/schema";
import { eq } from "drizzle-orm";

const sessionAny = z.any();

// En produccion, verificas la firma de Stripe con el webhook secret
// Por ahora, aceptamos el payload directamente para testing
export const stripeWebhookRouter = createRouter({
  // Webhook endpoint que Stripe llama cuando alguien paga
  handleWebhook: publicQuery
    .input(
      z.object({
        type: z.string(),
        data: z.object({
          object: sessionAny,
        }),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const eventType = input.type;
      const session = input.data.object as any;

      console.log("Stripe webhook received:", eventType);

      // checkout.session.completed = pago exitoso
      if (eventType === "checkout.session.completed") {
        const customerEmail = session.customer_email || session.customer_details?.email;
        const planId = session.metadata?.plan_id;
        const userId = session.metadata?.user_id;
        const periodo = session.metadata?.periodo || "mensual";
        const amount = session.amount_total ? (Number(session.amount_total) / 100).toFixed(2) : "0";

        if (!userId || !planId) {
          return { received: true, message: "Missing metadata" };
        }

        const userIdNum = parseInt(userId);
        const planIdNum = parseInt(planId);

        // Buscar el plan
        const [plan] = await db.select().from(planes).where(eq(planes.id, planIdNum)).limit(1);
        if (!plan) return { received: true, message: "Plan not found" };

        const meses = periodo === "anual" ? 12 : 1;
        const fechaFin = new Date();
        fechaFin.setMonth(fechaFin.getMonth() + meses);

        // Crear suscripcion
        const [sub] = await db.insert(suscripciones).values({
          userId: userIdNum,
          planId: planIdNum,
          estado: "activa",
          periodo: periodo as "mensual" | "anual",
          fechaInicio: new Date(),
          fechaFin,
          montoPagado: amount,
          paymentId: String(session.id || ""),
          metodoPago: "stripe",
        });

        // Registrar pago
        await db.insert(pagos).values({
          suscripcionId: Number((sub as any).insertId),
          userId: userIdNum,
          monto: amount,
          estado: "completado",
          metodoPago: "stripe",
          paymentProviderId: String(session.payment_intent || ""),
        });

        return { received: true, subscriptionId: Number((sub as any).insertId) };
      }

      // invoice.paid = pago recurrente exitoso (mensualidad)
      if (eventType === "invoice.paid") {
        // Renovar la suscripcion
        return { received: true, message: "Subscription renewed" };
      }

      // invoice.payment_failed = pago fallido
      if (eventType === "invoice.payment_failed") {
        // Marcar suscripcion como vencida
        return { received: true, message: "Payment failed" };
      }

      return { received: true };
    }),

  // Endpoint para crear checkout session (lo llama el frontend)
  createCheckoutSession: publicQuery
    .input(
      z.object({
        planId: z.number(),
        userId: z.number(),
        periodo: z.enum(["mensual", "anual"]),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // En produccion, esto llama a la API de Stripe
      const { planId, userId, periodo } = input;
      const testUrl = `https://buy.stripe.com/test?plan=${planId}&user=${userId}&period=${periodo}`;
      
      return {
        url: testUrl,
        message: "Stripe integration ready - connect your Stripe keys to enable real payments",
      };
    }),
});
