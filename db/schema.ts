import { mysqlTable, serial, varchar, text, timestamp, boolean, decimal, bigint, int, mysqlEnum } from "drizzle-orm/mysql-core";

export const usuarios = mysqlTable("usuarios", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  nombre: varchar("nombre", { length: 100 }),
  avatarUrl: text("avatarUrl"),
  rol: mysqlEnum("rol", ["admin", "evaluador", "viewer"]).default("viewer").notNull(),
  isPremium: boolean("isPremium").default(false),
  trialEndsAt: timestamp("trialEndsAt"),
  stripeCustomerId: varchar("stripeCustomerId", { length: 100 }),
  subscriptionStatus: varchar("subscriptionStatus", { length: 50 }),
  plan: varchar("plan", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const planes = mysqlTable("planes", {
  id: serial("id").primaryKey(),
  codigo: varchar("codigo", { length: 50 }).notNull().unique(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion"),
  precioMensual: decimal("precioMensual", { precision: 10, scale: 2 }),
  precioAnual: decimal("precioAnual", { precision: 10, scale: 2 }),
  maxEvaluadores: int("maxEvaluadores").default(1),
  maxAtletas: int("maxAtletas").default(10),
  incluyeReportesNivel4: boolean("incluyeReportesNivel4").default(false),
  incluyeAPI: boolean("incluyeAPI").default(false),
  incluyeWhiteLabel: boolean("incluyeWhiteLabel").default(false),
  activo: boolean("activo").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const suscripciones = mysqlTable("suscripciones", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  planId: bigint("planId", { mode: "number", unsigned: true }).notNull(),
  estado: mysqlEnum("estado", ["activa", "cancelada", "vencida", "trial"]).default("trial").notNull(),
  periodo: mysqlEnum("periodo", ["mensual", "anual"]).default("mensual").notNull(),
  fechaInicio: timestamp("fechaInicio").defaultNow().notNull(),
  fechaFin: timestamp("fechaFin"),
  montoPagado: decimal("montoPagado", { precision: 10, scale: 2 }),
  paymentId: varchar("paymentId", { length: 100 }),
  metodoPago: varchar("metodoPago", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const pagos = mysqlTable("pagos", {
  id: serial("id").primaryKey(),
  suscripcionId: bigint("suscripcionId", { mode: "number", unsigned: true }),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  monto: decimal("monto", { precision: 10, scale: 2 }).notNull(),
  estado: mysqlEnum("estado", ["completado", "pendiente", "fallido", "reembolsado"]).default("pendiente").notNull(),
  metodoPago: varchar("metodoPago", { length: 50 }),
  paymentProviderId: varchar("paymentProviderId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const evaluacionesISAK = mysqlTable("evaluaciones_isak", {
  id: serial("id").primaryKey(),
  evaluadorId: bigint("evaluadorId", { mode: "number", unsigned: true }).notNull(),
  nombreAtleta: varchar("nombreAtleta", { length: 100 }).notNull(),
  sexo: mysqlEnum("sexo", ["M", "F"]).notNull(),
  edad: int("edad").notNull(),
  peso: decimal("peso", { precision: 5, scale: 2 }),
  talla: decimal("talla", { precision: 5, scale: 2 }),
  mediciones: text("mediciones"),
  resultados: text("resultados"),
  metodo: varchar("metodo", { length: 50 }).default("ISAK"),
  nivel: int("nivel").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const organizaciones = mysqlTable("organizaciones", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  planId: bigint("planId", { mode: "number", unsigned: true }).notNull(),
  logoUrl: text("logoUrl"),
  colorPrimario: varchar("colorPrimario", { length: 20 }),
  stripeAccountId: varchar("stripeAccountId", { length: 100 }),
  activo: boolean("activo").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const miembrosOrg = mysqlTable("miembros_org", {
  id: serial("id").primaryKey(),
  organizacionId: bigint("organizacionId", { mode: "number", unsigned: true }).notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  rol: mysqlEnum("rol", ["owner", "admin", "evaluador", "cliente"]).default("cliente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// CHECK-INS SEMANALES — Seguimiento de clientes
// ============================================================

export const checkins = mysqlTable("checkins", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  coachId: bigint("coachId", { mode: "number", unsigned: true }).notNull(),
  semanaNumero: int("semanaNumero").notNull(),
  fechaCheckin: timestamp("fechaCheckin").defaultNow().notNull(),
  pesoActual: decimal("pesoActual", { precision: 5, scale: 2 }),
  pesoCambio: decimal("pesoCambio", { precision: 5, scale: 2 }),
  foto
