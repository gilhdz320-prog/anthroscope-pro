export interface Sujeto {
  id: string;
  nombre: string;
  fechaNacimiento: string;
  sexo: 'masculino' | 'femenino';
  fechaEvaluacion: string;
  deporte?: string;
  nivelActividad?: 'sedentario' | 'moderado' | 'activo' | 'atleta';
  notas?: string;
}

export interface PerfilRestringido {
  // Basicas
  masaCorporal: number; // kg
  estatura: number; // cm
  tallaSentada?: number; // cm
  envergadura?: number; // cm

  // Pliegues (mm)
  triceps: number;
  subescapular: number;
  biceps: number;
  crestaIliaca: number;
  supraespinal: number;
  abdominal: number;
  musloAnterior: number;
  piernaMedial: number;

  // Perímetros (cm)
  cabeza?: number;
  cuello?: number;
  brazoRelajado: number;
  brazoFlexionado: number;
  antebrazoMaximo: number;
  munecaDistal?: number;
  toraxMesoesternal: number;
  cinturaMinima: number;
  gluteoMaximo: number;
  musloSuperior?: number;
  musloMedio: number;
  pantorrillaMaxima: number;
  tobilloMinimo?: number;

  // Diámetros (cm)
  biacromial: number;
  biiliocrestal?: number;
  humeroBiepicondilar: number;
  femurBicondilar: number;
}

export interface PerfilCompleto extends PerfilRestringido {
  // Pliegues adicionales
  axilarMedial?: number;
  pectoral?: number;

  // Perímetros adicionales
  toraxTransverso?: number;
  abdomenAnteroposterior?: number;

  // Longitudes segmentarias (cm)
  acromialeRadiale?: number;
  radialeStylion?: number;
  midStylionDactylion?: number;
  alturaIliospinale?: number;
  alturaTrochanterion?: number;
  longitudTrochanterionTibialeLaterale?: number;
  alturaTibialeLaterale?: number;
  longitudTibialeMedialeSphyrion?: number;
  longitudPie?: number;

  // Diámetros adicionales (cm)
  profundidadAPAbdominal?: number;
  toraxAP?: number;
  biepicondilarHumerus?: number; // ya está
  biestiloideo?: number;
  bicondilarFemur?: number; // ya está
}

export interface MedicionDuplicada {
  valor1: number;
  valor2: number;
  valor3?: number;
}

export interface ETMResultado {
  nombre: string;
  media: number;
  etmAbsoluto: number;
  etmPorcentaje: number;
  cumple: boolean;
}

export interface Somatotipo {
  endomorfia: number;
  mesomorfia: number;
  ectomorfia: number;
  categoria: string;
}

export interface CincoComponentes {
  masaAdiposa: number; // kg
  masaMuscular: number; // kg
  masaOsea: number; // kg
  masaPiel: number; // kg
  masaResidual: number; // kg
  masaCorporalTotal: number; // kg

  porcentajeAdiposo: number;
  porcentajeMuscular: number;
  porcentajeOseo: number;
  porcentajePiel: number;
  porcentajeResidual: number;

  indiceMusculoOseo: number;
  zScoreMuscular: number;
  zScoreOseo: number;
}

export interface ResultadosClasicos {
  carterPorcentajeGrasa?: number;
  faulknerPorcentajeGrasa?: number;
  yuhaszPorcentajeGrasa?: number;
  durninWomersleyDensidad?: number;
  durninWomersleyPorcentajeGrasa?: number;
  siriPorcentajeGrasa?: number;
  brozekPorcentajeGrasa?: number;
  leeMasaMuscular?: number;
}

export interface ResultadosPhantom {
  zScores: Record<string, number>;
  proporcionalidad: {
    variable: string;
    valor: number;
    phantomValor: number;
    zScore: number;
    interpretacion: string;
  }[];
}

export interface ResultadoISAK {
  sujeto: Sujeto;
  perfil: PerfilRestringido | PerfilCompleto;
  nivel: 1 | 2 | 3 | 4;
  esPerfilCompleto: boolean;

  // ETM
  etm?: ETMResultado[];

  // Somatotipo
  somatotipo?: Somatotipo;

  // 5 Componentes
  cincoComponentes?: CincoComponentes;

  // Fórmulas clásicas
  clasicos?: ResultadosClasicos;

  // Phantom
  phantom?: ResultadosPhantom;

  // Índices derivados
  imc?: number;
  indicePonderal?: number;
  suma6Pliegues?: number;
  suma8Pliegues?: number;
  suma3PlieguesSomatotipo?: number;
  siriPorcentajeGrasa?: number;
  masaGrasaSiri?: number;
  masaLibreGrasa?: number;
}

export interface MedicionETM {
  nombre: string;
  mediciones: MedicionDuplicada[];
}
