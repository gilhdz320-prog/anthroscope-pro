// Tipos del protocolo ISAK completo - Nivel 1 a 4

export interface Sujeto {
  id: string;
  nombre: string;
  fechaNacimiento: string;
  fechaEvaluacion: string;
  sexo: 'masculino' | 'femenino';
  deporte?: string;
  nivelActividad?: 'sedentario' | 'moderado' | 'activo' | 'atleta';
  notas?: string;
  evaluador?: string;
  organizacion?: string;
}

// ===== PERFIL RESTRINGIDO ISAK NIVEL 1 (17 mediciones) =====
export interface PerfilRestringido {
  // 1. Masas y longitudes básicas
  masaCorporal: number;          // kg
  estatura: number;              // cm
  tallaSentada?: number;         // cm (sentado)

  // 2. Ocho pliegues cutáneos (mm) - ISAK estándar
  triceps: number;              // mm
  subescapular: number;         // mm
  biceps: number;               // mm
  crestaIliaca: number;         // mm
  supraespinal: number;          // mm
  abdominal: number;            // mm
  musloAnterior: number;         // mm
  piernaMedial: number;          // mm

  // 3. Cinco perímetros (cm)
  brazoRelajado: number;        // cm
  brazoFlexionado: number;       // cm
  cinturaMinima: number;         // cm
  gluteoMaximo: number;          // cm (cadera máxima)
  pantorrillaMaxima: number;     // cm
}

// ===== PERFIL COMPLETO ISAK NIVEL 2 (29 mediciones) =====
// Incluye todo lo del Perfil Restringido MÁS:
export interface PerfilCompleto extends PerfilRestringido {
  // 4. Tres diámetros óseos (cm)
  biacromial: number;           // cm
  humeroBiepicondilar: number;   // cm
  femurBicondilar: number;       // cm

  // 5. Tres perímetros adicionales (cm)
  toraxMesoesternal: number;    // cm
  musloMedio: number;           // cm
  antebrazoMaximo: number;      // cm

  // 6. Dos longitudes (cm)
  mano: number;                 // cm
  pie: number;                   // cm

  // 7. Dos circunferencias adicionales
  cabeza: number;                // cm
  cuello: number;               // cm
}

// ===== MEDICIONES ADICIONALES ISAK NIVEL 3-4 =====
// Para análisis avanzado y segmental
export interface MedicionesAvanzadas {
  // Pliegues adicionales
  pectoral?: number;             // mm
  axilar?: number;               // mm
  pantorrilla?: number;          // mm (diferente a pierna medial)

  // Diámetros adicionales
  biIliocrestal?: number;        // cm
  bitrocanterico?: number;       // cm

  // Longitudes de segmentos
  longitudBrazo?: number;        // cm
  longitudAntebrazo?: number;    // cm
  longitudMuslo?: number;         // cm
  longitudPierna?: number;        // cm
  longitudTronco?: number;       // cm

  // Otras
  envergadura?: number;          // cm (alcance de brazos)
}

// ===== ETM (Error Técnico de Medición) =====
export interface ETMData {
  medicion: string;
  medicion1: number;
  medicion2: number;
  tecnico1: number;
  tecnico2: number;
  diferencia: number;
  etmAbsoluto: number;
  etmRelativo: number;
  cumpleISAK: boolean;
}

// ===== SOMATOTIPO =====
export interface SomatotipoData {
  endomorfia: number;
  mesomorfia: number;
  ectomorfia: number;
  categoria: string;
}

// ===== 5 COMPONENTES (Ross & Kerr) =====
export interface CincoComponentes {
  masaAdiposa: number;
  porcentajeAdiposo: number;
  masaMuscular: number;
  porcentajeMuscular: number;
  masaOsea: number;
  porcentajeOseo: number;
  masaPiel: number;
  porcentajePiel: number;
  masaResidual: number;
  porcentajeResidual: number;
  densidadCorporal: number;
  indiceMusculoOseo: number;
}

// ===== FÓRMULAS CLÁSICAS =====
export interface FormulasClasicas {
  carterPorcentajeGrasa?: number;
  faulknerPorcentajeGrasa?: number;
  yuhaszPorcentajeGrasa?: number;
  durninWomersleyPorcentajeGrasa?: number;
  leeMasaMuscular?: number;
}

// ===== PHANTOM STRATAGEM =====
export interface PhantomData {
  zScore: number;
  proporcionalidad: Array<{
    variable: string;
    zScore: number;
    interpretacion: string;
  }>;
}

// ===== RESULTADO COMPLETO =====
export interface ResultadoISAK {
  sujeto: Sujeto;
  perfil: PerfilRestringido | PerfilCompleto;
  nivel: number;
  esPerfilCompleto: boolean;

  // Índices básicos
  imc: number;
  indicePonderal: number;
  suma6Pliegues: number;
  suma8Pliegues: number;

  // Composición corporal
  siriPorcentajeGrasa: number;
  masaGrasaSiri: number;
  masaLibreGrasa: number;

  // Resultados calculados
  somatotipo?: SomatotipoData;
  cincoComponentes?: CincoComponentes;
  clasicos?: FormulasClasicas;
  phantom?: PhantomData;

  // Avanzado (Nivel 3-4)
  avanzado?: MedicionesAvanzadas;
}

// ===== HISTORIAL =====
export interface EvaluacionGuardada {
  id: string;
  fecha: string;
  resultado: ResultadoISAK;
}
