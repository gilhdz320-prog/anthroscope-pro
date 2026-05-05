import type {
  PerfilRestringido,
  PerfilCompleto,
  ETMResultado,
  Somatotipo,
  CincoComponentes,
  ResultadosClasicos,
  ResultadosPhantom,
  MedicionDuplicada,
} from '@/types/isak';

// ============================================================
// CONSTANTES DEL PHANTASMA DE ROSS (Modelo de referencia)
// ============================================================
export const PHANTOM = {
  estatura: 170.18, // cm
  masa: 56.93, // kg
  // Pliegues (mm)
  pliegues: {
    triceps: 8.90,
    subescapular: 12.40,
    biceps: 5.80,
    crestaIliaca: 11.00,
    supraespinal: 8.10,
    abdominal: 12.80,
    musloAnterior: 11.80,
    piernaMedial: 8.20,
  },
  // Perímetros (cm)
  perimetros: {
    brazoRelajado: 25.90,
    brazoFlexionado: 27.60,
    antebrazo: 24.00,
    muneca: 16.40,
    torax: 87.00,
    cintura: 71.00,
    gluteo: 86.00,
    musloSuperior: 50.40,
    musloMedio: 49.00,
    pantorrilla: 32.00,
    tobillo: 21.40,
  },
  // Diámetros (cm)
  diametros: {
    biacromial: 38.40,
    biiliocrestal: 29.40,
    humero: 6.40,
    femur: 9.20,
    cabeza: 56.00,
  },
  // Longitudes (cm)
  longitudes: {
    acromialeRadiale: 31.50,
    radialeStylion: 24.20,
    midStylionDactylion: 18.50,
    iliospinale: 97.30,
    trochanterion: 98.30,
    trochanterionTibiale: 47.00,
    tibialeLaterale: 51.40,
    pie: 26.90,
  },
};

// ============================================================
// 1. ERROR TÉCNICO DE MEDICIÓN (ETM / TEM)
// ============================================================
export function calcularETM(mediciones: MedicionDuplicada[]): ETMResultado[] {
  return mediciones.map((m) => {
    const d1 = Math.abs(m.valor1 - m.valor2);
    const d2 = m.valor3 !== undefined ? Math.abs(m.valor1 - m.valor3) : 0;
    const d3 = m.valor3 !== undefined ? Math.abs(m.valor2 - m.valor3) : 0;

    const valores = m.valor3 !== undefined
      ? [m.valor1, m.valor2, m.valor3]
      : [m.valor1, m.valor2];

    const n = valores.length;
    const media = valores.reduce((a, b) => a + b, 0) / n;

    const sumaD2 = m.valor3 !== undefined
      ? d1 ** 2 + d2 ** 2 + d3 ** 2
      : d1 ** 2;

    const etmAbsoluto = Math.sqrt(sumaD2 / (2 * n));
    const etmPorcentaje = (etmAbsoluto / media) * 100;

    // Límite: 5% para pliegues, 1% para otras
    const esPliegue = true; // asumimos pliegue por defecto
    const cumple = esPliegue ? etmPorcentaje <= 5 : etmPorcentaje <= 1;

    return {
      nombre: '',
      media,
      etmAbsoluto,
      etmPorcentaje,
      cumple,
    };
  });
}

export function calcularETMIndividual(valores: number[], nombre: string, esPliegue: boolean = true): ETMResultado {
  const n = valores.length;
  const media = valores.reduce((a, b) => a + b, 0) / n;

  let sumaD2 = 0;
  if (n === 2) {
    sumaD2 = (valores[0] - valores[1]) ** 2;
  } else if (n === 3) {
    sumaD2 = (valores[0] - valores[1]) ** 2 +
             (valores[0] - valores[2]) ** 2 +
             (valores[1] - valores[2]) ** 2;
  }

  const etmAbsoluto = Math.sqrt(sumaD2 / (2 * n));
  const etmPorcentaje = (etmAbsoluto / media) * 100;
  const cumple = esPliegue ? etmPorcentaje <= 5 : etmPorcentaje <= 1;

  return {
    nombre,
    media,
    etmAbsoluto,
    etmPorcentaje,
    cumple,
  };
}

// ============================================================
// 2. SOMATOTIPO DE HEATH-CARTER
// ============================================================
export function calcularSomatotipo(
  perfil: PerfilRestringido,
  _sexo: 'masculino' | 'femenino'
): Somatotipo {
  const { estatura, masaCorporal } = perfil;

  // Σ3S: suma de tríceps + subescapular + supraespinal
  // Corregida por estatura
  const suma3PlieguesRaw = perfil.triceps + perfil.subescapular + perfil.supraespinal;
  const correccionEstatura = 170.18 / estatura;
  const suma3Pliegues = suma3PlieguesRaw * correccionEstatura;

  // Endomorfia
  const endomorfia = -0.7182
    + 0.1451 * suma3Pliegues
    - 0.00068 * (suma3Pliegues ** 2)
    + 0.0000014 * (suma3Pliegues ** 3);

  // Perímetros corregidos
  const cac = perfil.brazoFlexionado - (perfil.triceps / 10); // Brazo corregido
  const cpc = perfil.pantorrillaMaxima - (perfil.piernaMedial / 10); // Pantorrilla corregida

  // Mesomorfia
  const mesomorfia = (0.858 * perfil.humeroBiepicondilar)
    + (0.601 * perfil.femurBicondilar)
    + (0.188 * cac)
    + (0.161 * cpc)
    - (estatura * 0.131)
    + 4.50;

  // Ectomorfia
  const indicePonderal = estatura / Math.cbrt(masaCorporal);
  let ectomorfia: number;

  if (indicePonderal > 40.75) {
    ectomorfia = (0.732 * indicePonderal) - 28.58;
  } else if (indicePonderal >= 38.25 && indicePonderal <= 40.75) {
    ectomorfia = (0.463 * indicePonderal) - 17.63;
  } else {
    ectomorfia = 0.1;
  }

  // Categoría del somatotipo
  const categoria = categorizarSomatotipo(endomorfia, mesomorfia, ectomorfia);

  return {
    endomorfia: Math.round(endomorfia * 10) / 10,
    mesomorfia: Math.round(mesomorfia * 10) / 10,
    ectomorfia: Math.round(ectomorfia * 10) / 10,
    categoria,
  };
}

function categorizarSomatotipo(e: number, m: number, ect: number): string {
  const partes: string[] = [];

  if (e >= m - 0.5 && e >= ect - 0.5) partes.push('Endomorfo');
  if (m >= e - 0.5 && m >= ect - 0.5) partes.push('Mesomorfo');
  if (ect >= e - 0.5 && ect >= m - 0.5) partes.push('Ectomorfo');

  if (partes.length === 1) return partes[0];
  if (partes.length === 2) return `${partes[0]}-${partes[1]}`;
  return 'Balanceado';
}

// ============================================================
// 3. MODELO DE 5 COMPONENTES (ROSS & KERR, 1993)
// ============================================================
export function calcularCincoComponentes(
  perfil: PerfilCompleto,
  estatura: number,
  masaCorporal: number,
  _sexo: 'masculino' | 'femenino'
): CincoComponentes {
  const s = estatura;
  const mc = masaCorporal;
  const ratio = 170.18 / s;

  // === MASA MUSCULAR ===
  // Suma de perímetros musculares corregidos
  const brazoRelajadoCorr = perfil.brazoRelajado - (Math.PI * perfil.triceps / 10);
  const antebrazoCorr = perfil.antebrazoMaximo;
  const toraxCorr = perfil.toraxMesoesternal - (Math.PI * perfil.subescapular / 10);
  const musloMedioCorr = perfil.musloMedio - (Math.PI * perfil.musloAnterior / 10);
  const pantorrillaCorr = perfil.pantorrillaMaxima - (Math.PI * perfil.piernaMedial / 10);

  const smc = brazoRelajadoCorr + antebrazoCorr + toraxCorr + musloMedioCorr + pantorrillaCorr;

  const smcScaled = smc * ratio;
  const zScoreMuscular = (smcScaled - 207.21) / 13.74;
  const masaMuscular = ((zScoreMuscular * 4.4) + 24.5) / (ratio ** 3);

  // === MASA ÓSEA ===
  // Cuerpo
  const sumaDiametros = (perfil.biacromial || 0)
    + (perfil.biiliocrestal || 0)
    + (2 * perfil.humeroBiepicondilar)
    + (2 * perfil.femurBicondilar);

  const sumaDiametrosScaled = sumaDiametros * ratio;
  const zScoreCuerpo = (sumaDiametrosScaled - 98.88) / 5.33;
  const masaOseaCuerpo = ((zScoreCuerpo * 1.34) + 6.7) / (ratio ** 3);

  // Cabeza
  const perimetroCabezaScaled = (perfil.cabeza || 56) * ratio;
  const zScoreCabeza = (perimetroCabezaScaled - 56) / 1.44;
  const masaOseaCabeza = (zScoreCabeza * 0.18) + 1.2;

  const masaOsea = masaOseaCuerpo + masaOseaCabeza;

  // === MASA GRASA ===
  // Promedio de Z-scores de 6 pliegues
  const pliegues = [
    perfil.triceps,
    perfil.subescapular,
    perfil.supraespinal,
    perfil.abdominal,
    perfil.musloAnterior,
    perfil.piernaMedial,
  ];

  const phantomPliegues = [
    PHANTOM.pliegues.triceps,
    PHANTOM.pliegues.subescapular,
    PHANTOM.pliegues.supraespinal,
    PHANTOM.pliegues.abdominal,
    PHANTOM.pliegues.musloAnterior,
    PHANTOM.pliegues.piernaMedial,
  ];

  // Desviaciones estándar del phantasma para pliegues (estimadas de literatura)
  const sdPliegues = [2.5, 4.0, 2.8, 4.5, 5.0, 3.5];

  const zScoresPliegues = pliegues.map((p, i) => {
    const scaled = p * ratio;
    return (scaled - phantomPliegues[i]) / sdPliegues[i];
  });

  const zScorePromedioPliegues = zScoresPliegues.reduce((a, b) => a + b, 0) / zScoresPliegues.length;

  // Masa grasa usando factor del phantasma
  const factorGrasa = 0.153;
  const masaGrasa = mc * (factorGrasa / (ratio ** 3)) * Math.abs(zScorePromedioPliegues);

  // === MASA PIEL ===
  // Superficie corporal de DuBois
  const sc = 0.007184 * (mc ** 0.425) * (s ** 0.725); // m²
  const masaPiel = sc * 0.01133; // aprox 1.33 kg/m² ajustado

  // === MASA RESIDUAL ===
  const masaResidual = mc - (masaGrasa + masaMuscular + masaOsea + masaPiel);

  const total = mc;

  return {
    masaAdiposa: Math.max(0, masaGrasa),
    masaMuscular: Math.max(0, masaMuscular),
    masaOsea: Math.max(0, masaOsea),
    masaPiel: Math.max(0, masaPiel),
    masaResidual: Math.max(0, masaResidual),
    masaCorporalTotal: total,

    porcentajeAdiposo: (masaGrasa / total) * 100,
    porcentajeMuscular: (masaMuscular / total) * 100,
    porcentajeOseo: (masaOsea / total) * 100,
    porcentajePiel: (masaPiel / total) * 100,
    porcentajeResidual: (masaResidual / total) * 100,

    indiceMusculoOseo: masaMuscular / masaOsea,
    zScoreMuscular,
    zScoreOseo: zScoreCuerpo,
  };
}

// ============================================================
// 4. FÓRMULAS CLÁSICAS DE % GRASA
// ============================================================
export function calcularClasicos(
  perfil: PerfilRestringido,
  estatura: number,
  _masaCorporal: number,
  sexo: 'masculino' | 'femenino',
  edad?: number
): ResultadosClasicos {
  const suma6 = perfil.triceps + perfil.subescapular + perfil.supraespinal +
                perfil.abdominal + perfil.musloAnterior + perfil.piernaMedial;
  const suma4 = perfil.biceps + perfil.triceps + perfil.subescapular + perfil.crestaIliaca;

  // Carter (para atletas)
  const carterPorcentajeGrasa = 0.1051 * suma6 + 2.585;

  // Faulkner
  const suma4Faulkner = perfil.triceps + perfil.subescapular + perfil.supraespinal + perfil.abdominal;
  const faulknerPorcentajeGrasa = 5.783 + 0.153 * suma4Faulkner;

  // Yuhasz
  const yuhaszBase = 0.097 * suma6;
  const yuhaszPorcentajeGrasa = sexo === 'masculino' ? yuhaszBase + 3.64 : yuhaszBase + 5.07;

  // Durnin-Womersley (convierte a densidad)
  const logSuma4 = Math.log10(suma4);
  let densidad = 1.0;

  if (sexo === 'masculino') {
    if (edad && edad < 20) densidad = 1.1533 - 0.0643 * logSuma4;
    else if (!edad || (edad >= 20 && edad <= 29)) densidad = 1.1631 - 0.0632 * logSuma4;
    else if (edad >= 30 && edad <= 39) densidad = 1.1422 - 0.0544 * logSuma4;
    else if (edad >= 40 && edad <= 49) densidad = 1.1620 - 0.0700 * logSuma4;
    else densidad = 1.1715 - 0.0779 * logSuma4;
  } else {
    if (edad && edad < 20) densidad = 1.1369 - 0.0598 * logSuma4;
    else if (!edad || (edad >= 20 && edad <= 29)) densidad = 1.1599 - 0.0717 * logSuma4;
    else if (edad >= 30 && edad <= 39) densidad = 1.1423 - 0.0632 * logSuma4;
    else if (edad >= 40 && edad <= 49) densidad = 1.1333 - 0.0612 * logSuma4;
    else densidad = 1.1339 - 0.0645 * logSuma4;
  }

  // Siri
  const siriPorcentajeGrasa = ((4.95 / densidad) - 4.50) * 100;

  // Brozek
  const brozekPorcentajeGrasa = ((4.57 / densidad) - 4.142) * 100;

  // Lee et al. (2000) - Masa muscular
  // CAG, CTG, CCG en cm (perímetros corregidos)
  const cag = perfil.brazoFlexionado - (Math.PI * perfil.triceps / 10);
  const ctg = perfil.musloMedio - (Math.PI * perfil.musloAnterior / 10);
  const ccg = perfil.pantorrillaMaxima - (Math.PI * perfil.piernaMedial / 10);

  const s = estatura / 100; // en metros
  const sexoNum = sexo === 'masculino' ? 1 : 0;
  const edadNum = edad || 25;
  const raza = 0; // caucásico por defecto

  const leeMasaMuscular = s * (
    0.00744 * (cag ** 2) +
    0.00088 * (ctg ** 2) +
    0.00441 * (ccg ** 2)
  ) + (2.4 * sexoNum) - (0.048 * edadNum) + raza + 7.8;

  return {
    carterPorcentajeGrasa,
    faulknerPorcentajeGrasa,
    yuhaszPorcentajeGrasa,
    durninWomersleyDensidad: densidad,
    durninWomersleyPorcentajeGrasa: siriPorcentajeGrasa,
    siriPorcentajeGrasa,
    brozekPorcentajeGrasa,
    leeMasaMuscular,
  };
}

// ============================================================
// 5. ANÁLISIS PHANTOM / PROPORCIONALIDAD
// ============================================================
export function calcularPhantom(perfil: PerfilCompleto, estatura: number): ResultadosPhantom {
  const s = estatura;
  const ratio = 170.18 / s;

  const variables: { key: string; valor: number; phantom: number; sd: number; nombre: string }[] = [
    { key: 'brazoRelajado', valor: perfil.brazoRelajado, phantom: PHANTOM.perimetros.brazoRelajado, sd: 2.2, nombre: 'Brazo Relajado' },
    { key: 'brazoFlexionado', valor: perfil.brazoFlexionado, phantom: PHANTOM.perimetros.brazoFlexionado, sd: 2.4, nombre: 'Brazo Flexionado' },
    { key: 'antebrazo', valor: perfil.antebrazoMaximo, phantom: PHANTOM.perimetros.antebrazo, sd: 1.8, nombre: 'Antebrazo' },
    { key: 'torax', valor: perfil.toraxMesoesternal, phantom: PHANTOM.perimetros.torax, sd: 4.5, nombre: 'Tórax' },
    { key: 'cintura', valor: perfil.cinturaMinima, phantom: PHANTOM.perimetros.cintura, sd: 3.8, nombre: 'Cintura' },
    { key: 'gluteo', valor: perfil.gluteoMaximo, phantom: PHANTOM.perimetros.gluteo, sd: 4.2, nombre: 'Glúteo' },
    { key: 'musloMedio', valor: perfil.musloMedio, phantom: PHANTOM.perimetros.musloMedio, sd: 3.5, nombre: 'Muslo Medio' },
    { key: 'pantorrilla', valor: perfil.pantorrillaMaxima, phantom: PHANTOM.perimetros.pantorrilla, sd: 2.0, nombre: 'Pantorrilla' },
    { key: 'biacromial', valor: perfil.biacromial, phantom: PHANTOM.diametros.biacromial, sd: 1.8, nombre: 'Biacromial' },
    { key: 'biiliocrestal', valor: perfil.biiliocrestal || 0, phantom: PHANTOM.diametros.biiliocrestal, sd: 1.6, nombre: 'Biiliocrestal' },
    { key: 'humero', valor: perfil.humeroBiepicondilar, phantom: PHANTOM.diametros.humero, sd: 0.4, nombre: 'Húmero' },
    { key: 'femur', valor: perfil.femurBicondilar, phantom: PHANTOM.diametros.femur, sd: 0.5, nombre: 'Fémur' },
  ];

  const zScores: Record<string, number> = {};
  const proporcionalidad = variables.map((v) => {
    const scaled = v.valor * ratio;
    const z = (scaled - v.phantom) / v.sd;
    zScores[v.key] = z;

    let interpretacion = 'Proporcional';
    if (z > 2) interpretacion = 'Muy por encima del promedio';
    else if (z > 1) interpretacion = 'Por encima del promedio';
    else if (z < -2) interpretacion = 'Muy por debajo del promedio';
    else if (z < -1) interpretacion = 'Por debajo del promedio';

    return {
      variable: v.nombre,
      valor: v.valor,
      phantomValor: v.phantom,
      zScore: Math.round(z * 100) / 100,
      interpretacion,
    };
  });

  return { zScores, proporcionalidad };
}

// ============================================================
// 6. ÍNDICES DERIVADOS
// ============================================================
export function calcularIndices(
  perfil: PerfilRestringido,
  estatura: number,
  masaCorporal: number
) {
  const imc = masaCorporal / ((estatura / 100) ** 2);
  const indicePonderal = estatura / Math.cbrt(masaCorporal);

  const suma6Pliegues = perfil.triceps + perfil.subescapular + perfil.supraespinal +
                        perfil.abdominal + perfil.musloAnterior + perfil.piernaMedial;
  const suma8Pliegues = suma6Pliegues + perfil.biceps + perfil.crestaIliaca;

  const suma3PlieguesSomatotipo = perfil.triceps + perfil.subescapular + perfil.supraespinal;

  // Densidad estimada con Siri
  // Usamos Durnin-Womersley simplificado
  const suma4 = perfil.biceps + perfil.triceps + perfil.subescapular + perfil.crestaIliaca;
  const logSuma4 = Math.log10(suma4);
  const densidad = 1.1631 - 0.0632 * logSuma4; // hombre 20-29 por defecto
  const siriPorcentajeGrasa = ((4.95 / densidad) - 4.50) * 100;

  const masaGrasaSiri = (siriPorcentajeGrasa / 100) * masaCorporal;
  const masaLibreGrasa = masaCorporal - masaGrasaSiri;

  return {
    imc: Math.round(imc * 100) / 100,
    indicePonderal: Math.round(indicePonderal * 100) / 100,
    suma6Pliegues,
    suma8Pliegues,
    suma3PlieguesSomatotipo,
    masaGrasaSiri: Math.round(masaGrasaSiri * 100) / 100,
    masaLibreGrasa: Math.round(masaLibreGrasa * 100) / 100,
    siriPorcentajeGrasa: Math.round(siriPorcentajeGrasa * 100) / 100,
  };
}

// ============================================================
// 7. UTILIDADES
// ============================================================
export function interpretarIMC(imc: number): string {
  if (imc < 18.5) return 'Bajo peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  return 'Obesidad';
}

export function interpretarPorcentajeGrasa(pct: number, sexo: 'masculino' | 'femenino'): string {
  if (sexo === 'masculino') {
    if (pct < 6) return 'Grasa esencial mínima';
    if (pct < 14) return 'Atleta';
    if (pct < 18) return 'Fitness';
    if (pct < 25) return 'Promedio';
    return 'Obesidad';
  } else {
    if (pct < 14) return 'Grasa esencial mínima';
    if (pct < 21) return 'Atleta';
    if (pct < 25) return 'Fitness';
    if (pct < 32) return 'Promedio';
    return 'Obesidad';
  }
}
