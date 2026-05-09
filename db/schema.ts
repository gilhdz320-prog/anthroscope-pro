import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  decimal,
  bigint,
  int,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "evaluador", "admin"]).default("user").notNull(),
  tier: mysqlEnum("tier", ["free", "pro", "team", "enterprise"]).default("free").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================
// ISAK PRO - Sistema de Antropometria
// ============================================================

export const equipos = mysqlTable("equipos", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  deporte: varchar("deporte", { length: 100 }).notNull(),
  categoria: varchar("categoria", { length: 100 }),
  institucion: varchar("institucion", { length: 255 }),
  entrenador: varchar("entrenador", { length: 255 }),
  evaluadorId: bigint("evaluadorId", { mode: "number", unsigned: true }).notNull(),
  fechaEvaluacion: timestamp("fechaEvaluacion").defaultNow().notNull(),
  notas: text("notas"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const atletas = mysqlTable("atletas", {
  id: serial("id").primaryKey(),
  equipoId: bigint("equipoId", { mode: "number", unsigned: true }),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  fechaNacimiento: varchar("fechaNacimiento", { length: 20 }),
  sexo: mysqlEnum("sexo", ["masculino", "femenino"]).notNull(),
  deporte: varchar("deporte", { length: 100 }),
  posicion: varchar("posicion", { length: 100 }),
  notas: text("notas"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const evaluaciones = mysqlTable("evaluaciones", {
  id: serial("id").primaryKey(),
  atletaId: bigint("atletaId", { mode: "number", unsigned: true }).notNull(),
  equipoId: bigint("equipoId", { mode: "number", unsigned: true }),
  evaluadorId: bigint("evaluadorId", { mode: "number", unsigned: true }).notNull(),
  nivel: int("nivel").default(1).notNull(),
  fechaEvaluacion: timestamp("fechaEvaluacion").defaultNow().notNull(),

  // Basicas
  masaCorporal: decimal("masaCorporal", { precision: 6, scale: 2 }).notNull(),
  estatura: decimal("estatura", { precision: 6, scale: 2 }).notNull(),

  // Pliegues (mm)
  triceps: decimal("triceps", { precision: 5, scale: 1 }).default("0"),
  subescapular: decimal("subescapular", { precision: 5, scale: 1 }).default("0"),
  biceps: decimal("biceps", { precision: 5, scale: 1 }).default("0"),
  crestaIliaca: decimal("crestaIliaca", { precision: 5, scale: 1 }).default("0"),
  supraespinal: decimal("supraespinal", { precision: 5, scale: 1 }).default("0"),
  abdominal: decimal("abdominal", { precision: 5, scale: 1 }).default("0"),
  musloAnterior: decimal("musloAnterior", { precision: 5, scale: 1 }).default("0"),
  piernaMedial: decimal("piernaMedial", { precision: 5, scale: 1 }).default("0"),

  // Perímetros (cm)
  brazoRelajado: decimal("brazoRelajado", { precision: 5, scale: 1 }).default("0"),
  brazoFlexionado: decimal("brazoFlexionado", { precision: 5, scale: 1 }).default("0"),
  antebrazoMaximo: decimal("antebrazoMaximo", { precision: 5, scale: 1 }).default("0"),
  toraxMesoesternal: decimal("toraxMesoesternal", { precision: 5, scale: 1 }).default("0"),
  cinturaMinima: decimal("cinturaMinima", { precision: 5, scale: 1 }).default("0"),
  gluteoMaximo: decimal("gluteoMaximo", { precision: 5, scale: 1 }).default("0"),
  musloMedio: decimal("musloMedio", { precision: 5, scale: 1 }).default("0"),
  pantorrillaMaxima: decimal("pantorrillaMaxima", { precision: 5, scale: 1 }).default("0"),

  // Diámetros (cm)
  biacromial: decimal("biacromial", { precision: 5, scale: 1 }).default("0"),
  humeroBiepicondilar: decimal("humeroBiepicondilar", { precision: 5, scale: 1 }).default("0"),
  femurBicondilar: decimal("femurBicondilar", { precision: 5, scale: 1 }).default("0"),

  // Longitudes adicionales (cm)
  tallaSentada: decimal("tallaSentada", { precision: 6, scale: 2 }).default("0"),
  mano: decimal("mano", { precision: 5, scale: 1 }).default("0"),
  pie: decimal("pie", { precision: 5, scale: 1 }).default("0"),
  cabeza: decimal("cabeza", { precision: 5, scale: 1 }).default("0"),
  cuello: decimal("cuello", { precision: 5, scale: 1 }).default("0"),

  // Mediciones avanzadas Nivel 3-4 (JSON)
  avanzadoJson: json("avanzadoJson"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Referencias globales por deporte (OLIREF, ARGOREF, etc.)
export const referenciasDeporte = mysqlTable("referencias_deporte", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(), // "OLIREF", "ARGOREF", "FIFA_REF", etc.
  deporte: varchar("deporte", { length: 100 }).notNull(),
  sexo: mysqlEnum("sexo", ["masculino", "femenino"]).notNull(),
  categoria: varchar("categoria", { length: 100 }), // edad, nivel, etc.

  // Valores de referencia (Phantom)
  phantomEstatura: decimal("phantomEstatura", { precision: 6, scale: 2 }),
  phantomMasa: decimal("phantomMasa", { precision: 6, scale: 2 }),
  phantomImc: decimal("phantomImc", { precision: 5, scale: 2 }),
  phantomGrasa: decimal("phantomGrasa", { precision: 5, scale: 2 }),
  phantomMusculo: decimal("phantomMusculo", { precision: 5, scale: 2 }),
  phantomHueso: decimal("phantomHueso", { precision: 5, scale: 2 }),
  phantomImo: decimal("phantomImo", { precision: 5, scale: 2 }),

  // Desviaciones estándar
  sdEstatura: decimal("sdEstatura", { precision: 5, scale: 2 }),
  sdMasa: decimal("sdMasa", { precision: 5, scale: 2 }),
  sdImc: decimal("sdImc", { precision: 5, scale: 2 }),
  sdGrasa: decimal("sdGrasa", { precision: 5, scale: 2 }),

  // Medidas antropométricas promedio (JSON)
  medidasPromedio: json("medidasPromedio"),

  fuente: varchar("fuente", { length: 500 }),
  anio: int("anio"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Equipo = typeof equipos.$inferSelect;
export type Atleta = typeof atletas.$inferSelect;
export type Evaluacion = typeof evaluaciones.$inferSelect;
export type ReferenciaDeporte = typeof referenciasDeporte.$inferSelect;

// ============================================================
// ANTHROSCOPE PRO - Sistema de Suscripciones (SaaS)
// ============================================================

export const planes = mysqlTable("planes", {
  id: serial("id").primaryKey(),
  codigo: varchar("codigo", { length: 50 }).notNull().unique(), // "individual", "team", "institucional"
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  precioMensual: decimal("precioMensual", { precision: 10, scale: 2 }).notNull(),
  precioAnual: decimal("precioAnual", { precision: 10, scale: 2 }).notNull(),
  maxEvaluadores: int("maxEvaluadores").default(1).notNull(), // 1 = individual, 5 = team, 0 = ilimitado
  maxAtletas: int("maxAtletas").default(0).notNull(), // 0 = ilimitado
  incluyeReportesNivel4: mysqlEnum("incluyeReportesNivel4", ["si", "no"]).default("si").notNull(),
  incluyeAPI: mysqlEnum("incluyeAPI", ["si", "no"]).default("no").notNull(),
  incluyeWhiteLabel: mysqlEnum("incluyeWhiteLabel", ["si", "no"]).default("no").notNull(),
  activo: mysqlEnum("activo", ["si", "no"]).default("si").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const suscripciones = mysqlTable("suscripciones", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  planId: bigint("planId", { mode: "number", unsigned: true }).notNull(),
  
  // Estado de la suscripcion
  estado: mysqlEnum("estado", ["activa", "cancelada", "vencida", "trial"]).default("trial").notNull(),
  
  // Periodo
  fechaInicio: timestamp("fechaInicio").defaultNow().notNull(),
  fechaFin: timestamp("fechaFin").notNull(),
  periodo: mysqlEnum("periodo", ["mensual", "anual"]).default("mensual").notNull(),
  
  // Pago
  montoPagado: decimal("montoPagado", { precision: 10, scale: 2 }),
  moneda: varchar("moneda", { length: 3 }).default("USD"),
  metodoPago: varchar("metodoPago", { length: 50 }), // "stripe", "paypal", "transfer"
  paymentId: varchar("paymentId", { length: 255 }), // ID externo del proveedor de pagos
  
  // Tracking de uso
  evaluacionesRealizadas: int("evaluacionesRealizadas").default(0),
  atletasRegistrados: int("atletasRegistrados").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const pagos = mysqlTable("pagos", {
  id: serial("id").primaryKey(),
  suscripcionId: bigint("suscripcionId", { mode: "number", unsigned: true }).notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  
  monto: decimal("monto", { precision: 10, scale: 2 }).notNull(),
  moneda: varchar("moneda", { length: 3 }).default("USD").notNull(),
  estado: mysqlEnum("estado", ["pendiente", "completado", "fallido", "reembolsado"]).default("pendiente").notNull(),
  metodoPago: varchar("metodoPago", { length: 50 }).notNull(),
  paymentProviderId: varchar("paymentProviderId", { length: 255 }), // Stripe payment intent ID
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Organizaciones (para plan Institucional)
export const organizaciones = mysqlTable("organizaciones", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(), // URL amigable
  logoUrl: text("logoUrl"),
  colorPrimario: varchar("colorPrimario", { length: 7 }).default("#10b981"),
  colorAccent: varchar("colorAccent", { length: 7 }).default("#D4FF00"),
  colorSecundario: varchar("colorSecundario", { length: 7 }).default("#6366f1"),
  adminUserId: bigint("adminUserId", { mode: "number", unsigned: true }).notNull(),
  
  // Config de la org
  maxEvaluadores: int("maxEvaluadores").default(0).notNull(), // 0 = ilimitado
  maxEquipos: int("maxEquipos").default(0).notNull(),
  
  // Suscripcion de la org
  suscripcionActiva: mysqlEnum("suscripcionActiva", ["si", "no"]).default("no").notNull(),
  planCodigo: varchar("planCodigo", { length: 50 }),
  fechaVencimiento: timestamp("fechaVencimiento"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Miembros de organizacion
export const miembrosOrg = mysqlTable("miembros_org", {
  id: serial("id").primaryKey(),
  orgId: bigint("orgId", { mode: "number", unsigned: true }).notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  rol: mysqlEnum("rol", ["admin", "evaluador", "viewer"]).default("evaluador").notNull(),
  activo: mysqlEnum("activo", ["si", "no"]).default("si").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Plan = typeof planes.$inferSelect;
export type Suscripcion = typeof suscripciones.$inferSelect;
export type Pago = typeof pagos.$inferSelect;
export type Organizacion = typeof organizaciones.$inferSelect;
export type MiembroOrg = typeof miembrosOrg.$inferSelect;

// ============================================================
// WEARABLES - Datos de dispositivos de actividad
// ============================================================

export const wearablesData = mysqlTable("wearables_data", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  coachId: bigint("coachId", { mode: "number", unsigned: true }).notNull(),
  dispositivo: varchar("dispositivo", { length: 50 }).notNull(),
  dispositivoId: varchar("dispositivoId", { length: 100 }),
  fecha: timestamp("fecha").defaultNow().notNull(),
  pasos: int("pasos"),
  caloriasQuemadas: int("caloriasQuemadas"),
  distanciaMetros: int("distanciaMetros"),
  ritmoCardiacoPromedio: int("ritmoCardiacoPromedio"),
  ritmoCardiacoMax: int("ritmoCardiacoMax"),
  ritmoCardiacoMin: int("ritmoCardiacoMin"),
  minutosSedentario: int("minutosSedentario"),
  minutosLigero: int("minutosLigero"),
  minutosModerado: int("minutosModerado"),
  minutosIntenso: int("minutosIntenso"),
  horasSueno: decimal("horasSueno", { precision: 4, scale: 1 }),
  minutosSuenoProfundo: int("minutosSuenoProfundo"),
  minutosSuenoREM: int("minutosSuenoREM"),
  peso: decimal("peso", { precision: 5, scale: 2 }),
  actividadPrincipal: varchar("actividadPrincipal", { length: 50 }),
  rawData: text("rawData"),
  syncAt: timestamp("syncAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// CHECK-INS SEMANALES - Seguimiento de clientes
// ============================================================

export const checkins = mysqlTable("checkins", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  coachId: bigint("coachId", { mode: "number", unsigned: true }).notNull(),
  semanaNumero: int("semanaNumero").notNull(),
  fechaCheckin: timestamp("fechaCheckin").defaultNow().notNull(),
  pesoActual: decimal("pesoActual", { precision: 5, scale: 2 }),
  pesoCambio: decimal("pesoCambio", { precision: 5, scale: 2 }),
  fotoFrontal: text("fotoFrontal"),
  fotoLateral: text("fotoLateral"),
  fotoTrasera: text("fotoTrasera"),
  energia: int("energia"),
  suenoCalidad: int("suenoCalidad"),
  suenoHoras: decimal("suenoHoras", { precision: 3, scale: 1 }),
  estres: int("estres"),
  humor: int("humor"),
  hambre: int("hambre"),
  adherenciaDieta: int("adherenciaDieta"),
  adherenciaEntreno: int("adherenciaEntreno"),
  adherenciaSueno: int("adherenciaSueno"),
  sintomas: text("sintomas"),
  notasCliente: text("notasCliente"),
  notasCoach: text("notasCoach"),
  cambioFuerza: mysqlEnum("cambioFuerza", ["aumento", "mantuvo", "disminuyo"]),
  cambioResistencia: mysqlEnum("cambioResistencia", ["aumento", "mantuvo", "disminuyo"]),
  estado: mysqlEnum("estado", ["pendiente", "completado", "revisado"]).default("pendiente").notNull(),
  revisadoPor: bigint("revisadoPor", { mode: "number", unsigned: true }),
  fechaRevision: timestamp("fechaRevision"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WearablesData = typeof wearablesData.$inferSelect;
export type InsertWearablesData = typeof wearablesData.$inferInsert;
export type Checkin = typeof checkins.$inferSelect;
export type InsertCheckin = typeof checkins.$inferInsert;
