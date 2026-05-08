import { getDb } from "../api/queries/connection";
import { planes } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  const db = getDb();
  console.log("Seeding planes...");

  const existing = await db.select().from(planes).limit(1);
  if (existing.length > 0) {
    console.log("Planes already seeded.");
    return;
  }

  await db.insert(planes).values([
    {
      codigo: "individual",
      nombre: "ANTHROSCOPE PRO - Individual",
      descripcion: "1 evaluador. Evaluaciones ilimitadas. Reportes ISAK Nivel 4. Somatocarta + Avatar 3D.",
      precioMensual: "39.99",
      precioAnual: "399.99",
      maxEvaluadores: 1,
      maxAtletas: 0,
      incluyeReportesNivel4: "si",
      incluyeAPI: "no",
      incluyeWhiteLabel: "no",
      activo: "si",
    },
    {
      codigo: "team",
      nombre: "ANTHROSCOPE PRO - Team",
      descripcion: "Hasta 5 evaluadores. Ideal para clinica deportiva o equipo de preparacion fisica.",
      precioMensual: "99.99",
      precioAnual: "999.99",
      maxEvaluadores: 5,
      maxAtletas: 0,
      incluyeReportesNivel4: "si",
      incluyeAPI: "no",
      incluyeWhiteLabel: "no",
      activo: "si",
    },
    {
      codigo: "institucional",
      nombre: "ANTHROSCOPE PRO - Institucional",
      descripcion: "Evaluadores ilimitados. API access. White-label con tu marca. Soporte prioritario.",
      precioMensual: "299.99",
      precioAnual: "2999.99",
      maxEvaluadores: 0,
      maxAtletas: 0,
      incluyeReportesNivel4: "si",
      incluyeAPI: "si",
      incluyeWhiteLabel: "si",
      activo: "si",
    },
  ]);

  console.log("Seeded 3 plans successfully.");
}

seed().catch(console.error);
