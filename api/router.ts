import { authRouter } from "./auth-router";
import { subscriptionRouter } from "./subscription-router";
import { stripeWebhookRouter } from "./stripe-webhook";
import { evaluacionesRouter } from "./evaluaciones-router";
import { patientsRouter } from "./patients-router";
import { claudeRouter } from "./claudeRouter";
import { emailRouter } from "./emailRouter";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  subscription: subscriptionRouter,
  stripe: stripeWebhookRouter,
  evaluaciones: evaluacionesRouter,
  patients: patientsRouter,
  claude: claudeRouter,
  email: emailRouter,
});

export type AppRouter = typeof appRouter;
