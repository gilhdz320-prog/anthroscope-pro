import { authRouter } from "./auth-router";
import { subscriptionRouter } from "./subscription-router";
import { stripeWebhookRouter } from "./stripe-webhook";
import { evaluacionesRouter } from "./evaluaciones-router";
import { claudeRouter } from "./claudeRouter";
import { emailRouter } from "./emailRouter";
import { checkinRouter } from "./checkinRouter";
import { wearablesRouter } from "./wearablesRouter";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  subscription: subscriptionRouter,
  stripe: stripeWebhookRouter,
  evaluaciones: evaluacionesRouter,
  claude: claudeRouter,
  email: emailRouter,
  checkin: checkinRouter,
  wearables: wearablesRouter,
});

export type AppRouter = typeof appRouter;
