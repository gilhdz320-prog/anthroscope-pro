import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = "Anthroscope <noreply@anthroscope.app>";

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!resend) {
    return { success: false, error: "Resend no configurado. Agrega RESEND_API_KEY en .env", messageId: null };
  }
  try {
    const { data, error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
    if (error) return { success: false, error: error.message, messageId: null };
    return { success: true, error: null, messageId: data?.id };
  } catch (err: any) {
    return { success: false, error: err.message, messageId: null };
  }
}

function welcomeTemplate(name: string, lang: "es" | "en"): { subject: string; html: string } {
  if (lang === "es") {
    return {
      subject: "Bienvenido a Anthroscope Pro - Tu nutricion deportiva inteligente",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #D4FF00; background: #0a0b0f; padding: 20px; margin: 0;">
            ANTHROSCOPE PRO
          </h1>
          <div style="padding: 30px; background: #11121a; color: #f0f0f5;">
            <h2>Hola ${name},</h2>
            <p>Bienvenido a <strong>Anthroscope Pro</strong> - la plataforma mas completa de nutricion deportiva y antropometria ISAK.</p>
            <h3>Lo que puedes hacer:</h3>
            <ul>
              <li>Realizar evaluaciones antropometricas completas (43 mediciones ISAK)</li>
              <li>Generar planes nutricionales personalizados con IA</li>
              <li>Acceder a 355 alimentos LATAM con sistema de equivalentes</li>
              <li>Consultar 180 recetas deportivas</li>
              <li>Usar nuestro AI Coach 24/7</li>
              <li>Periodizar tu nutricion segun tu calendario deportivo</li>
            </ul>
            <p style="margin-top: 30px;">
              <a href="#" style="background: #D4FF00; color: #050608; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Empezar Ahora
              </a>
            </p>
            <p style="color: #8a8d9e; font-size: 12px; margin-top: 30px;">
              Si tienes preguntas, responde a este email o contacta a soporte.
            </p>
          </div>
        </div>
      `,
    };
  }
  return {
    subject: "Welcome to Anthroscope Pro - Your smart sports nutrition",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4FF00; background: #0a0b0f; padding: 20px; margin: 0;">
          ANTHROSCOPE PRO
        </h1>
        <div style="padding: 30px; background: #11121a; color: #f0f0f5;">
          <h2>Hello ${name},</h2>
          <p>Welcome to <strong>Anthroscope Pro</strong> - the most complete sports nutrition and ISAK anthropometry platform.</p>
          <h3>What you can do:</h3>
          <ul>
            <li>Complete ISAK anthropometric assessments (43 measurements)</li>
            <li>Generate personalized nutrition plans with AI</li>
            <li>Access 355 LATAM foods with Mexican equivalent system</li>
            <li>Browse 180 sports recipes</li>
            <li>Use our 24/7 AI Coach</li>
            <li>Periodize nutrition according to your sports calendar</li>
          </ul>
          <p style="margin-top: 30px;">
            <a href="#" style="background: #D4FF00; color: #050608; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Start Now
            </a>
          </p>
          <p style="color: #8a8d9e; font-size: 12px; margin-top: 30px;">
            If you have questions, reply to this email or contact support.
          </p>
        </div>
      </div>
    `,
  };
}

function reminderTemplate(name: string, lang: "es" | "en"): { subject: string; html: string } {
  if (lang === "es") {
    return {
      subject: "Recordatorio: Tu seguimiento nutricional te espera",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #11121a; color: #f0f0f5; padding: 30px;">
          <h2 style="color: #D4FF00;">Hola ${name},</h2>
          <p>Tu nutriologo te esta esperando en <strong>Anthroscope Pro</strong>.</p>
          <p>No olvides registrar tus comidas de hoy y completar tu diario de hidratacion.</p>
          <p style="margin-top: 20px; color: #8a8d9e; font-size: 12px;">
            Este es un recordatorio automatico. Puedes desactivarlo en tu perfil.
          </p>
        </div>
      `,
    };
  }
  return {
    subject: "Reminder: Your nutrition tracking is waiting",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #11121a; color: #f0f0f5; padding: 30px;">
        <h2 style="color: #D4FF00;">Hello ${name},</h2>
        <p>Your nutritionist is waiting for you at <strong>Anthroscope Pro</strong>.</p>
        <p>Don't forget to log today's meals and complete your hydration diary.</p>
        <p style="margin-top: 20px; color: #8a8d9e; font-size: 12px;">
          This is an automatic reminder. You can disable it in your profile.
        </p>
      </div>
    `,
  };
}

export const emailRouter = createRouter({
  sendWelcome: authedQuery
    .input(z.object({ to: z.string().email(), name: z.string(), lang: z.enum(["es", "en"]).default("es") }))
    .mutation(async ({ input }) => {
      const { subject, html } = welcomeTemplate(input.name, input.lang);
      return sendEmail({ to: input.to, subject, html });
    }),

  sendReminder: authedQuery
    .input(z.object({ to: z.string().email(), name: z.string(), lang: z.enum(["es", "en"]).default("es") }))
    .mutation(async ({ input }) => {
      const { subject, html } = reminderTemplate(input.name, input.lang);
      return sendEmail({ to: input.to, subject, html });
    }),

  sendCustom: authedQuery
    .input(
      z.object({
        to: z.string().email(),
        subject: z.string(),
        html: z.string(),
      })
    )
    .mutation(async ({ input }) => sendEmail(input)),
});
