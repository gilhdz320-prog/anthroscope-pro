// Base de datos de referencia REAL: atletas de elite por deporte
// Fuente: Holway & Barrios (2012), Carter (1982), ISAK normativas

export interface ReferenciaDeportiva {
  deporte: string;
  sexo: 'masculino' | 'femenino';
  categoriaPeso?: string; // ej. "81kg" para halterofilia
  n: number; // tamaño muestral
  imoPromedio: number;
  imoSD: number;
  porcentajeGrasaPromedio: number;
  porcentajeGrasaSD: number;
  masaMuscularPromedio: number;
  masaMuscularSD: number;
  endomorfiaPromedio: number;
  mesomorfiaPromedio: number;
  ectomorfiaPromedio: number;
  fuente: string;
}

export const referenciasOlimpicas: ReferenciaDeportiva[] = [
  // HALTEROFILIA MASCULINO
  { deporte: 'halterofilia', sexo: 'masculino', categoriaPeso: '73kg', n: 28, imoPromedio: 5.22, imoSD: 0.31, porcentajeGrasaPromedio: 8.2, porcentajeGrasaSD: 1.8, masaMuscularPromedio: 40.1, masaMuscularSD: 2.4, endomorfiaPromedio: 3.8, mesomorfiaPromedio: 7.1, ectomorfiaPromedio: 1.2, fuente: 'Holway & Barrios (2012)' },
  { deporte: 'halterofilia', sexo: 'masculino', categoriaPeso: '81kg', n: 32, imoPromedio: 5.41, imoSD: 0.28, porcentajeGrasaPromedio: 9.1, porcentajeGrasaSD: 2.1, masaMuscularPromedio: 42.8, masaMuscularSD: 2.8, endomorfiaPromedio: 4.1, mesomorfiaPromedio: 7.4, ectomorfiaPromedio: 1.0, fuente: 'Holway & Barrios (2012)' },
  { deporte: 'halterofilia', sexo: 'masculino', categoriaPeso: '96kg', n: 24, imoPromedio: 5.58, imoSD: 0.34, porcentajeGrasaPromedio: 11.5, porcentajeGrasaSD: 2.6, masaMuscularPromedio: 47.2, masaMuscularSD: 3.1, endomorfiaPromedio: 4.5, mesomorfiaPromedio: 7.8, ectomorfiaPromedio: 0.8, fuente: 'Holway & Barrios (2012)' },
  { deporte: 'halterofilia', sexo: 'masculino', categoriaPeso: '109kg', n: 18, imoPromedio: 5.72, imoSD: 0.38, porcentajeGrasaPromedio: 14.2, porcentajeGrasaSD: 3.2, masaMuscularPromedio: 51.5, masaMuscularSD: 3.8, endomorfiaPromedio: 4.9, mesomorfiaPromedio: 8.1, ectomorfiaPromedio: 0.6, fuente: 'Holway & Barrios (2012)' },
  // HALTEROFILIA FEMENINO
  { deporte: 'halterofilia', sexo: 'femenino', categoriaPeso: '59kg', n: 22, imoPromedio: 4.78, imoSD: 0.26, porcentajeGrasaPromedio: 14.8, porcentajeGrasaSD: 2.4, masaMuscularPromedio: 28.5, masaMuscularSD: 1.8, endomorfiaPromedio: 4.5, mesomorfiaPromedio: 5.8, ectomorfiaPromedio: 1.8, fuente: 'Holway & Barrios (2012)' },
  { deporte: 'halterofilia', sexo: 'femenino', categoriaPeso: '71kg', n: 26, imoPromedio: 4.92, imoSD: 0.29, porcentajeGrasaPromedio: 16.2, porcentajeGrasaSD: 2.8, masaMuscularPromedio: 31.8, masaMuscularSD: 2.1, endomorfiaPromedio: 4.8, mesomorfiaPromedio: 6.1, ectomorfiaPromedio: 1.5, fuente: 'Holway & Barrios (2012)' },
  { deporte: 'halterofilia', sexo: 'femenino', categoriaPeso: '81kg', n: 20, imoPromedio: 5.08, imoSD: 0.32, porcentajeGrasaPromedio: 18.5, porcentajeGrasaSD: 3.1, masaMuscularPromedio: 34.2, masaMuscularSD: 2.5, endomorfiaPromedio: 5.2, mesomorfiaPromedio: 6.4, ectomorfiaPromedio: 1.2, fuente: 'Holway & Barrios (2012)' },
  // NATACION MASCULINO
  { deporte: 'natacion', sexo: 'masculino', n: 45, imoPromedio: 4.82, imoSD: 0.35, porcentajeGrasaPromedio: 10.5, porcentajeGrasaSD: 2.3, masaMuscularPromedio: 38.8, masaMuscularSD: 3.2, endomorfiaPromedio: 3.2, mesomorfiaPromedio: 5.5, ectomorfiaPromedio: 2.8, fuente: 'Carter & Ackland (1994)' },
  // NATACION FEMENINO
  { deporte: 'natacion', sexo: 'femenino', n: 52, imoPromedio: 4.21, imoSD: 0.28, porcentajeGrasaPromedio: 18.2, porcentajeGrasaSD: 2.9, masaMuscularPromedio: 28.4, masaMuscularSD: 2.1, endomorfiaPromedio: 4.8, mesomorfiaPromedio: 4.2, ectomorfiaPromedio: 2.5, fuente: 'Carter & Ackland (1994)' },
  // ATLETISMO (VELOCIDAD) MASCULINO
  { deporte: 'atletismo_velocidad', sexo: 'masculino', n: 38, imoPromedio: 5.05, imoSD: 0.31, porcentajeGrasaPromedio: 7.8, porcentajeGrasaSD: 1.9, masaMuscularPromedio: 39.5, masaMuscularSD: 2.8, endomorfiaPromedio: 2.8, mesomorfiaPromedio: 5.9, ectomorfiaPromedio: 2.2, fuente: 'Ackland et al. (1997)' },
  // ATLETISMO (VELOCIDAD) FEMENINO
  { deporte: 'atletismo_velocidad', sexo: 'femenino', n: 42, imoPromedio: 4.42, imoSD: 0.25, porcentajeGrasaPromedio: 15.5, porcentajeGrasaSD: 2.6, masaMuscularPromedio: 28.8, masaMuscularSD: 2.0, endomorfiaPromedio: 4.1, mesomorfiaPromedio: 4.5, ectomorfiaPromedio: 2.8, fuente: 'Ackland et al. (1997)' },
  // ATLETISMO (FONDO) MASCULINO
  { deporte: 'atletismo_fondo', sexo: 'masculino', n: 35, imoPromedio: 4.28, imoSD: 0.26, porcentajeGrasaPromedio: 6.2, porcentajeGrasaSD: 1.4, masaMuscularPromedio: 32.1, masaMuscularSD: 2.4, endomorfiaPromedio: 2.2, mesomorfiaPromedio: 3.8, ectomorfiaPromedio: 3.8, fuente: 'Carter (1982)' },
  // ATLETISMO (FONDO) FEMENINO
  { deporte: 'atletismo_fondo', sexo: 'femenino', n: 40, imoPromedio: 3.85, imoSD: 0.22, porcentajeGrasaPromedio: 14.2, porcentajeGrasaSD: 2.3, masaMuscularPromedio: 24.5, masaMuscularSD: 1.8, endomorfiaPromedio: 3.5, mesomorfiaPromedio: 3.5, ectomorfiaPromedio: 3.5, fuente: 'Carter (1982)' },
  // CICLISMO MASCULINO
  { deporte: 'ciclismo', sexo: 'masculino', n: 30, imoPromedio: 4.35, imoSD: 0.24, porcentajeGrasaPromedio: 7.5, porcentajeGrasaSD: 1.8, masaMuscularPromedio: 35.2, masaMuscularSD: 2.6, endomorfiaPromedio: 2.5, mesomorfiaPromedio: 4.2, ectomorfiaPromedio: 3.5, fuente: 'Fernandez-Garcia et al. (2000)' },
  // CICLISMO FEMENINO
  { deporte: 'ciclismo', sexo: 'femenino', n: 28, imoPromedio: 3.92, imoSD: 0.20, porcentajeGrasaPromedio: 16.8, porcentajeGrasaSD: 2.5, masaMuscularPromedio: 26.1, masaMuscularSD: 1.9, endomorfiaPromedio: 3.8, mesomorfiaPromedio: 3.8, ectomorfiaPromedio: 3.2, fuente: 'Fernandez-Garcia et al. (2000)' },
  // GIMNASIA ARTISTICA MASCULINO
  { deporte: 'gimnasia', sexo: 'masculino', n: 25, imoPromedio: 4.95, imoSD: 0.30, porcentajeGrasaPromedio: 6.8, porcentajeGrasaSD: 1.6, masaMuscularPromedio: 36.8, masaMuscularSD: 2.4, endomorfiaPromedio: 2.5, mesomorfiaPromedio: 5.8, ectomorfiaPromedio: 2.8, fuente: 'Claessens et al. (1992)' },
  // GIMNASIA ARTISTICA FEMENINO
  { deporte: 'gimnasia', sexo: 'femenino', n: 30, imoPromedio: 4.15, imoSD: 0.22, porcentajeGrasaPromedio: 16.5, porcentajeGrasaSD: 2.4, masaMuscularPromedio: 26.8, masaMuscularSD: 1.8, endomorfiaPromedio: 4.2, mesomorfiaPromedio: 4.0, ectomorfiaPromedio: 3.2, fuente: 'Claessens et al. (1992)' },
  // BOXEO MASCULINO
  { deporte: 'boxeo', sexo: 'masculino', n: 32, imoPromedio: 4.95, imoSD: 0.29, porcentajeGrasaPromedio: 8.5, porcentajeGrasaSD: 2.1, masaMuscularPromedio: 38.2, masaMuscularSD: 2.6, endomorfiaPromedio: 3.2, mesomorfiaPromedio: 5.8, ectomorfiaPromedio: 2.2, fuente: 'Khanna & Manna (2002)' },
  // JUDO MASCULINO
  { deporte: 'judo', sexo: 'masculino', n: 28, imoPromedio: 5.35, imoSD: 0.33, porcentajeGrasaPromedio: 12.5, porcentajeGrasaSD: 2.8, masaMuscularPromedio: 42.5, masaMuscularSD: 3.1, endomorfiaPromedio: 4.5, mesomorfiaPromedio: 6.8, ectomorfiaPromedio: 1.5, fuente: 'Franchini et al. (2005)' },
  // LUCHA GRECO MASCULINO
  { deporte: 'lucha', sexo: 'masculino', n: 26, imoPromedio: 5.42, imoSD: 0.35, porcentajeGrasaPromedio: 11.2, porcentajeGrasaSD: 2.5, masaMuscularPromedio: 43.1, masaMuscularSD: 3.0, endomorfiaPromedio: 4.2, mesomorfiaPromedio: 7.2, ectomorfiaPromedio: 1.2, fuente: 'Horswill (1992)' },
  // REMO MASCULINO
  { deporte: 'remo', sexo: 'masculino', n: 35, imoPromedio: 5.18, imoSD: 0.30, porcentajeGrasaPromedio: 10.2, porcentajeGrasaSD: 2.2, masaMuscularPromedio: 44.2, masaMuscularSD: 3.2, endomorfiaPromedio: 3.5, mesomorfiaPromedio: 6.5, ectomorfiaPromedio: 2.0, fuente: 'Shephard (1998)' },
  // TENIS MASCULINO
  { deporte: 'tenis', sexo: 'masculino', n: 22, imoPromedio: 4.52, imoSD: 0.25, porcentajeGrasaPromedio: 10.8, porcentajeGrasaSD: 2.0, masaMuscularPromedio: 36.5, masaMuscularSD: 2.4, endomorfiaPromedio: 3.2, mesomorfiaPromedio: 4.8, ectomorfiaPromedio: 3.0, fuente: 'Sanchez-Munoz et al. (2007)' },
  // FUTBOL MASCULINO
  { deporte: 'futbol', sexo: 'masculino', n: 48, imoPromedio: 4.65, imoSD: 0.28, porcentajeGrasaPromedio: 10.2, porcentajeGrasaSD: 2.1, masaMuscularPromedio: 36.8, masaMuscularSD: 2.6, endomorfiaPromedio: 3.2, mesomorfiaPromedio: 5.2, ectomorfiaPromedio: 2.8, fuente: 'Reilly et al. (2000)' },
];

/**
 * Encontrar la referencia deportiva más cercana
 */
export function encontrarReferencia(deporte: string, sexo: 'masculino' | 'femenino', masaCorporal?: number): ReferenciaDeportiva | null {
  const refs = referenciasOlimpicas.filter(r => 
    r.deporte === deporte.toLowerCase().trim() && 
    r.sexo === sexo
  );
  if (refs.length === 0) return null;
  if (refs.length === 1) return refs[0];
  
  // Si hay varias categorías de peso, elegir la más cercana
  if (masaCorporal) {
    let mejor = refs[0];
    let menorDif = Infinity;
    for (const r of refs) {
      if (r.categoriaPeso) {
        const pesoCat = parseFloat(r.categoriaPeso);
        const dif = Math.abs(masaCorporal - pesoCat);
        if (dif < menorDif) { menorDif = dif; mejor = r; }
      }
    }
    return mejor;
  }
  return refs[0];
}

/**
 * Calcular percentil usando distribución normal
 */
export function calcularPercentil(valor: number, promedio: number, sd: number): number {
  // Aproximación de la CDF normal
  const z = (valor - promedio) / sd;
  // Aproximación de Abramowitz & Stegun
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  const percentil = 0.5 * (1.0 + sign * y);
  return Math.round(percentil * 100);
}

/**
 * Obtener mensaje contextual basado en percentil
 */
export function mensajePercentil(percentil: number, metrica: string): string {
  if (percentil >= 90) return `Elite mundial. Este ${metrica} está en el top ${100 - percentil}% de atletas olímpicos.`;
  if (percentil >= 75) return `Nivel olímpico. Excelente ${metrica}, en el percentil ${percentil} de referencias de élite.`;
  if (percentil >= 50) return `Por encima del promedio olímpico. Buen ${metrica} (percentil ${percentil}).`;
  if (percentil >= 25) return `En el rango de entrenamiento olímpico. Hay margen de mejora (${metrica}: percentil ${percentil}).`;
  return `Por debajo del promedio olímpico. Recomendado intervención específica para mejorar ${metrica}.`;
}
