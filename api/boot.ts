import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";
import { getDb } from "./queries/connection";
import { suscripciones, pagos, planes } from "@db/schema";
import { eq } from "drizzle-orm";

const app = new Hono<{ Bindings: HttpBindings }>();

// Healthcheck endpoint - Railway pings this to verify the service is alive
app.get("/api/ping", (c) => c.json({ ok: true, ts: Date.now() }));

// Auto-sync database on startup (delayed so server starts first)
setTimeout(async () => {
  try {
    const { execSync } = await import('child_process');
    console.log('[DB] Syncing schema...');
    execSync('npm run db:push', { stdio: 'inherit', timeout: 30000 });
    console.log('[DB] Seeding plans...');
    execSync('npx tsx db/seed.ts', { stdio: 'inherit', timeout: 30000 });
    console.log('[DB] Done!');
  } catch (e) {
    console.log('[DB] Skipping auto-sync:', (e as Error).message);
  }
}, 5000);

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.get(Paths.oauthCallback, createOAuthCallbackHandler());

// Stripe webhook endpoint - HTTP directo (Stripe no usa tRPC)
app.post("/api/webhooks/stripe", async (c) => {
  try {
    const body = await c.req.json();
    const eventType = body.type;
    const session = body.data?.object;

    console.log("[Stripe Webhook] Event:", eventType);

    if (eventType === "checkout.session.completed" && session) {
      const planId = session.metadata?.plan_id;
      const userId = session.metadata?.user_id;
      const periodo = session.metadata?.periodo || "mensual";
      const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0";

      if (!userId || !planId) {
        return c.json({ received: true, message: "Missing metadata" });
      }

      const db = getDb();
      const userIdNum = parseInt(userId);
      const planIdNum = parseInt(planId);

      const [plan] = await db.select().from(planes).where(eq(planes.id, planIdNum)).limit(1);
      if (!plan) return c.json({ received: true, message: "Plan not found" });

      const meses = periodo === "anual" ? 12 : 1;
      const fechaFin = new Date();
      fechaFin.setMonth(fechaFin.getMonth() + meses);

      const [sub] = await db.insert(suscripciones).values({
        userId: userIdNum,
        planId: planIdNum,
        estado: "activa",
        periodo: periodo as "mensual" | "anual",
        fechaInicio: new Date(),
        fechaFin,
        montoPagado: amount,
        paymentId: session.id,
        metodoPago: "stripe",
      });

      await db.insert(pagos).values({
        suscripcionId: Number(sub.insertId),
        userId: userIdNum,
        monto: amount,
        estado: "completado",
        metodoPago: "stripe",
        paymentProviderId: session.payment_intent,
      });

      return c.json({ received: true, subscriptionId: Number(sub.insertId) });
    }

    return c.json({ received: true });
  } catch (err) {
    console.error("[Stripe Webhook] Error:", err);
    return c.json({ received: true, error: String(err) });
  }
});

app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
