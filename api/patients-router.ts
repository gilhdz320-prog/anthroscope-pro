import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { atletas } from "@db/schema";
import { eq, desc, like, and } from "drizzle-orm";

export const patientsRouter = createRouter({
  // Listar pacientes/atletas
  list: publicQuery
    .input(
      z.object({
        search: z.string().optional(),
        deporte: z.string().optional(),
        sexo: z.enum(["masculino", "femenino"]).optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];

      if (input?.search) {
        conditions.push(like(atletas.nombre, `%${input.search}%`));
      }
      if (input?.deporte) {
        conditions.push(like(atletas.deporte, `%${input.deporte}%`));
      }
      if (input?.sexo) {
        conditions.push(eq(atletas.sexo, input.sexo));
      }

      const rows =
        conditions.length > 0
          ? await db
              .select()
              .from(atletas)
              .where(and(...conditions))
              .orderBy(desc(atletas.createdAt))
          : await db
              .select()
              .from(atletas)
              .orderBy(desc(atletas.createdAt));

      return rows;
    }),

  // Obtener un paciente por ID
  get: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [row] = await db
        .select()
        .from(atletas)
        .where(eq(atletas.id, input.id))
        .limit(1);
      return row ?? null;
    }),

  // Crear nuevo paciente
  create: publicQuery
    .input(
      z.object({
        nombre: z.string().min(1),
        fechaNacimiento: z.string().optional(),
        sexo: z.enum(["masculino", "femenino"]),
        deporte: z.string().optional(),
        posicion: z.string().optional(),
        notas: z.string().optional(),
        equipoId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [result] = await db.insert(atletas).values({
        nombre: input.nombre,
        fechaNacimiento: input.fechaNacimiento || null,
        sexo: input.sexo,
        deporte: input.deporte || null,
        posicion: input.posicion || null,
        notas: input.notas || null,
        equipoId: input.equipoId || null,
      });
      return { id: Number((result as any).insertId), success: true };
    }),

  // Actualizar paciente
  update: publicQuery
    .input(
      z.object({
        id: z.number(),
        nombre: z.string().min(1).optional(),
        fechaNacimiento: z.string().optional(),
        sexo: z.enum(["masculino", "femenino"]).optional(),
        deporte: z.string().optional(),
        posicion: z.string().optional(),
        notas: z.string().optional(),
        equipoId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db
        .update(atletas)
        .set({
          ...(data.nombre !== undefined && { nombre: data.nombre }),
          ...(data.fechaNacimiento !== undefined && {
            fechaNacimiento: data.fechaNacimiento || null,
          }),
          ...(data.sexo !== undefined && { sexo: data.sexo }),
          ...(data.deporte !== undefined && { deporte: data.deporte || null }),
          ...(data.posicion !== undefined && { posicion: data.posicion || null }),
          ...(data.notas !== undefined && { notas: data.notas || null }),
          ...(data.equipoId !== undefined && { equipoId: data.equipoId || null }),
        })
        .where(eq(atletas.id, id));
      return { success: true };
    }),

  // Eliminar paciente
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(atletas).where(eq(atletas.id, input.id));
      return { success: true };
    }),
});
