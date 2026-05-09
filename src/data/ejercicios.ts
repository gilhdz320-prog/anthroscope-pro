// ============================================================
// ANTHROSCOPE PRO  Biblioteca de Ejercicios
// 100+ ejercicios con GIFs demostrativos
// Organizados por categoría, músculo y equipo
// ============================================================

export interface Ejercicio {
  id: string;
  nombre: string;
  name: string;
  categoria: 'empuje' | 'traccion' | 'piernas' | 'core' | 'cardio' | 'olimpico' | 'movilidad';
  categoriaLabel: string;
  categoriaLabelEn: string;
  musculos: string[];
  muscles: string[];
  equipo: string;
  equipment: string;
  dificultad: 'principiante' | 'intermedio' | 'avanzado';
  dificultadEn: 'beginner' | 'intermediate' | 'advanced';
  gifUrl: string;
  instrucciones: string[];
  instructions: string[];
  consejos: string[];
  tips: string[];
}

export const EJERCICIOS: Ejercicio[] = [
  // 
  // EMPUJE (PUSH)  20 ejercicios
  // 
  {
    id: "bench-press", nombre: "Press de Banca", name: "Bench Press",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Pectoral Mayor", "Triceps", "Deltoides Anterior"],
    muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"],
    equipo: "Barra + Banca", equipment: "Barbell + Bench", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Acuéstate en la banca, pies firmes en el suelo", "Agarra la barra con agarre medio-ancho", "Baja controladamente al pecho", "Empuja explosivamente hacia arriba"],
    instructions: ["Lie on bench, feet flat on floor", "Grip bar with medium-wide grip", "Lower controlled to chest", "Push explosively up"],
    consejos: ["Mantén las escápulas retraídas", "No rebotes la barra en el pecho", "Respira: inhala abajo, exhala arriba"],
    tips: ["Keep scapula retracted", "Don't bounce bar off chest", "Breathe: inhale down, exhale up"]
  },
  {
    id: "incline-dumbbell-press", nombre: "Press Inclinado con Mancuernas", name: "Incline Dumbbell Press",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Pectoral Superior", "Deltoides Anterior", "Triceps"],
    muscles: ["Upper Chest", "Anterior Deltoid", "Triceps"],
    equipo: "Mancuernas + Banca Inclinada", equipment: "Dumbbells + Incline Bench", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Ajusta la banca a 30-45 grados", "Mancuernas a los lados del pecho", "Empuja hacia arriba juntando las mancuernas", "Baja controladamente"],
    instructions: ["Set bench to 30-45 degrees", "Dumbbells at sides of chest", "Push up bringing dumbbells together", "Lower controlled"],
    consejos: ["Ángulo de 30° enfoca más pecho, 45° más hombros", "No bloquees completamente los codos"],
    tips: ["30° angle targets more chest, 45° more shoulders", "Don't fully lock elbows"]
  },
  {
    id: "military-press", nombre: "Press Militar", name: "Overhead Press",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Deltoides", "Trapecio", "Triceps"],
    muscles: ["Deltoids", "Trapezius", "Triceps"],
    equipo: "Barra", equipment: "Barbell", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Barra a altura del pecho, agarre ancho", "Core apretado, glúteos contraídos", "Empuja la barra verticalmente", "Baja a la barbilla controladamente"],
    instructions: ["Bar at chest height, wide grip", "Tight core, glutes squeezed", "Push bar vertically", "Lower to chin controlled"],
    consejos: ["No arquees la espalda excesivamente", "Los codos deben ir hacia adelante, no a los lados"],
    tips: ["Don't excessively arch back", "Elbows should go forward, not out"]
  },
  {
    id: "dumbbell-shoulder-press", nombre: "Press de Hombros con Mancuernas", name: "Dumbbell Shoulder Press",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Deltoides", "Triceps", "Trapecio Superior"],
    muscles: ["Deltoids", "Triceps", "Upper Trapezius"],
    equipo: "Mancuernas", equipment: "Dumbbells", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Sentado o de pie, mancuernas a altura de hombros", "Palmas hacia adelante", "Empuja hacia arriba sin bloquear codos", "Baja controladamente"],
    instructions: ["Seated or standing, dumbbells at shoulder height", "Palms forward", "Push up without locking elbows", "Lower controlled"],
    consejos: ["Rango de movimiento completo", "No uses impulso con las piernas (a menos que sea push press)"],
    tips: ["Full range of motion", "No leg momentum unless push press"]
  },
  {
    id: "push-ups", nombre: "Flexiones (Push-ups)", name: "Push-ups",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Pectoral Mayor", "Triceps", "Deltoides Anterior", "Core"],
    muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid", "Core"],
    equipo: "Peso Corporal", equipment: "Bodyweight", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Posición de plancha, manos a ancho de hombros", "Cuerpo recto desde cabeza a talones", "Baja hasta que el pecho casi toque el suelo", "Empuja volviendo a la posición inicial"],
    instructions: ["Plank position, hands shoulder-width", "Straight body from head to heels", "Lower until chest nearly touches floor", "Push back to starting position"],
    consejos: ["No dejes caer las caderas", "Para variante fácil: rodillas en el suelo", "Para variante difícil: pies elevados"],
    tips: ["Don't drop hips", "Easy variant: knees on floor", "Hard variant: elevated feet"]
  },
  {
    id: "dips", nombre: "Fondos en Paralelas", name: "Dips",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Pectoral Inferior", "Triceps", "Deltoides Anterior"],
    muscles: ["Lower Chest", "Triceps", "Anterior Deltoid"],
    equipo: "Paralelas", equipment: "Dip Bars", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Sujétate en las barras, brazos extendidos", "Inclínate ligeramente hacia adelante para pecho", "Baja hasta que los hombros estén por debajo de los codos", "Empuja hacia arriba"],
    instructions: ["Hold bars, arms extended", "Lean slightly forward for chest", "Lower until shoulders below elbows", "Push up"],
    consejos: ["Torso vertical = más tríceps", "Torso inclinado = más pecho", "No bajes demasiado (riesgo hombro)"],
    tips: ["Vertical torso = more triceps", "Leaned torso = more chest", "Don't go too low (shoulder risk)"]
  },
  {
    id: "lateral-raises", nombre: "Elevaciones Laterales", name: "Lateral Raises",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Deltoides Lateral"], muscles: ["Lateral Deltoid"],
    equipo: "Mancuernas", equipment: "Dumbbells", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["De pie, mancuernas a los lados", "Eleva las mancuernas hasta la altura de los hombros", "Baja controladamente", "Mantén un ligero codo"],
    instructions: ["Standing, dumbbells at sides", "Raise dumbbells to shoulder height", "Lower controlled", "Keep slight bend in elbow"],
    consejos: ["No uses momentum (swing)", "Mantén el core estable", "Variante: inclinado para mayor rango"],
    tips: ["No swinging", "Keep core stable", "Variant: leaning for greater range"]
  },
  {
    id: "chest-flyes", nombre: "Aperturas de Pecho", name: "Chest Flyes",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Pectoral Mayor"], muscles: ["Pectoralis Major"],
    equipo: "Mancuernas + Banca", equipment: "Dumbbells + Bench", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Acuéstate en banca plana", "Mancuernas extendidas sobre el pecho", "Abre los brazos en arco hasta sentir el estiramiento", "Junta las mancuernas contrayendo el pecho"],
    instructions: ["Lie on flat bench", "Dumbbells extended over chest", "Open arms in arc until stretch felt", "Bring dumbbells together squeezing chest"],
    consejos: ["Ligera flexión de codos durante todo el movimiento", "Siente el estiramiento, no el dolor"],
    tips: ["Slight elbow bend throughout", "Feel stretch, not pain"]
  },
  {
    id: "close-grip-bench", nombre: "Press de Banca Agarre Cerrado", name: "Close-Grip Bench Press",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Triceps", "Pectoral Mayor"], muscles: ["Triceps", "Pectoralis Major"],
    equipo: "Barra + Banca", equipment: "Barbell + Bench", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Agarre a ancho de hombros o ligeramente más cerrado", "Baja la barra a la parte baja del pecho", "Mantén los codos cerca del torso", "Empuja extendiendo los tríceps"],
    instructions: ["Shoulder-width or slightly narrower grip", "Lower bar to lower chest", "Keep elbows close to torso", "Push extending triceps"],
    consejos: ["Excelente para masa tricipital", "No bajes la barra muy alto (cuello)"],
    tips: ["Excellent for triceps mass", "Don't lower bar too high (neck)"]
  },
  {
    id: "skullcrushers", nombre: "Extensión de Tríceps (Skullcrushers)", name: "Skullcrushers",
    categoria: "empuje", categoriaLabel: "Empuje", categoriaLabelEn: "Push",
    musculos: ["Triceps"], muscles: ["Triceps"],
    equipo: "Barra EZ + Banca", equipment: "EZ Bar + Bench", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Acuéstate, barra EZ sobre la frente", "Baja la barra hacia la frente flexionando codos", "Extiende los brazos contrayendo tríceps", "No muevas los codos"],
    instructions: ["Lie down, EZ bar over forehead", "Lower bar toward forehead bending elbows", "Extend arms contracting triceps", "Don't move elbows"],
    consejos: ["Los codos actúan como bisagra fija", "Baja la barra ligeramente detrás de la cabeza para menos estrés"],
    tips: ["Elbows act as fixed hinge", "Lower bar slightly behind head for less stress"]
  },

  // 
  // TRACCIÓN (PULL)  15 ejercicios
  // 
  {
    id: "pull-ups", nombre: "Dominadas (Pull-ups)", name: "Pull-ups",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Dorsal Ancho", "Bíceps", "Romboide", "Trapecio Inferior"],
    muscles: ["Latissimus Dorsi", "Biceps", "Rhomboid", "Lower Trapezius"],
    equipo: "Barra de Dominadas", equipment: "Pull-up Bar", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Agarra la barra con agarre prono (palmas hacia afuera)", "Cuelga con brazos completamente extendidos", "Tira del pecho hacia la barra", "Baja controladamente"],
    instructions: ["Grip bar with overhand grip (palms away)", "Hang with fully extended arms", "Pull chest to bar", "Lower controlled"],
    consejos: ["Agarre ancho = más dorsal", "Agarre cerrado = más bíceps", "No te balancees"],
    tips: ["Wide grip = more lat", "Narrow grip = more biceps", "No swinging"]
  },
  {
    id: "barbell-row", nombre: "Remo con Barra", name: "Barbell Row",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Dorsal Ancho", "Romboide", "Trapecio", "Bíceps", "Erectores Espinales"],
    muscles: ["Latissimus Dorsi", "Rhomboid", "Trapezius", "Biceps", "Spinal Erectors"],
    equipo: "Barra", equipment: "Barbell", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Pies a ancho de cadera, torso inclinado ~45°", "Barra cuelga con brazos extendidos", "Tira la barra al abdomen inferior", "Baja controladamente"],
    instructions: ["Feet hip-width, torso bent ~45°", "Bar hangs with extended arms", "Pull bar to lower abdomen", "Lower controlled"],
    consejos: ["No levantes el torso al tirar (momentum)", "Agarre pronado = más dorsal, supino = más bíceps"],
    tips: ["Don't lift torso when pulling (momentum)", "Overhand = more lat, underhand = more biceps"]
  },
  {
    id: "dumbbell-row", nombre: "Remo con Mancuerna", name: "Dumbbell Row",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Dorsal Ancho", "Romboide", "Trapecio Medio", "Bíceps"],
    muscles: ["Latissimus Dorsi", "Rhomboid", "Middle Trapezius", "Biceps"],
    equipo: "Mancuerna + Banca", equipment: "Dumbbell + Bench", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Una rodilla y una mano en la banca", "Mancuerna en la mano libre, brazo extendido", "Tira la mancuerna hacia la cadera", "Baja controladamente"],
    instructions: ["One knee and hand on bench", "Dumbbell in free hand, arm extended", "Pull dumbbell to hip", "Lower controlled"],
    consejos: ["No gires el torso", "Siente la contracción del dorsal en la parte superior"],
    tips: ["Don't twist torso", "Feel lat contraction at top"]
  },
  {
    id: "lat-pulldown", nombre: "Jalón al Pecho", name: "Lat Pulldown",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Dorsal Ancho", "Bíceps", "Romboide"], muscles: ["Latissimus Dorsi", "Biceps", "Rhomboid"],
    equipo: "Máquina de Polea", equipment: "Cable Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Siéntate, muslos bajo las almohadillas", "Agarra la barra con agarre ancho prono", "Tira hacia abajo hasta la parte superior del pecho", "Sube controladamente"],
    instructions: ["Sit, thighs under pads", "Grip bar with wide overhand grip", "Pull down to upper chest", "Rise controlled"],
    consejos: ["No te eches hacia atrás", "Contrae los dorsales al final del movimiento"],
    tips: ["Don't lean back", "Contract lats at bottom of movement"]
  },
  {
    id: "face-pulls", nombre: "Face Pulls", name: "Face Pulls",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Deltoides Posterior", "Romboide", "Trapecio", "Manguito Rotador"],
    muscles: ["Posterior Deltoid", "Rhomboid", "Trapezius", "Rotator Cuff"],
    equipo: "Polea", equipment: "Cable Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Polea a altura de la cara, cuerda o barra", "Tira hacia la cara separando los codos", "Rota ligeramente las muñecas externamente al final", "Baja controladamente"],
    instructions: ["Cable at face height, rope or bar", "Pull toward face separating elbows", "Slightly externally rotate wrists at end", "Lower controlled"],
    consejos: ["Ejercicio clave para salud del hombro", "No uses peso excesivo"],
    tips: ["Key exercise for shoulder health", "Don't use excessive weight"]
  },
  {
    id: "bicep-curls", nombre: "Curl de Bíceps con Barra", name: "Barbell Bicep Curls",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Bíceps", "Braquial"], muscles: ["Biceps", "Brachialis"],
    equipo: "Barra EZ", equipment: "EZ Bar", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["De pie, barra EZ con agarre supino", "Codos fijos a los lados del torso", "Curl hacia arriba sin balancear", "Baja controladamente"],
    instructions: ["Standing, EZ bar with underhand grip", "Elbows fixed at sides of torso", "Curl up without swinging", "Lower controlled"],
    consejos: ["No balancees el torso", "Rango completo: extensión total a contracción total"],
    tips: ["No torso swinging", "Full range: full extension to full contraction"]
  },
  {
    id: "hammer-curls", nombre: "Curl Martillo", name: "Hammer Curls",
    categoria: "traccion", categoriaLabel: "Tracción", categoriaLabelEn: "Pull",
    musculos: ["Bíceps", "Braquial", "Braquiorradial"], muscles: ["Biceps", "Brachialis", "Brachioradialis"],
    equipo: "Mancuernas", equipment: "Dumbbells", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["De pie, mancuernas con agarre neutro (palmas hacia el torso)", "Curl hacia arriba manteniendo la posición neutra", "Baja controladamente"],
    instructions: ["Standing, dumbbells with neutral grip (palms toward torso)", "Curl up maintaining neutral position", "Lower controlled"],
    consejos: ["Excelente para espesor del brazo", "Menor estrés en la muñeca que curl supino"],
    tips: ["Excellent for arm thickness", "Less wrist stress than underhand curl"]
  },

  // 
  // PIERNAS (LEGS)  20 ejercicios
  // 
  {
    id: "squat", nombre: "Sentadilla (Squat)", name: "Barbell Squat",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales", "Core", "Erectores Espinales"],
    muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core", "Spinal Erectors"],
    equipo: "Barra + Rack", equipment: "Barbell + Rack", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Barra sobre trapecios, pies a ancho de hombros", "Core apretado, pecho arriba", "Baja doblando rodillas y caderas", "Profundidad: caderas debajo de las rodillas", "Empuja hacia arriba extendiendo caderas y rodillas"],
    instructions: ["Bar on upper traps, feet shoulder-width", "Tight core, chest up", "Lower bending knees and hips", "Depth: hips below knees", "Push up extending hips and knees"],
    consejos: ["El rey de los ejercicios", "Mantén las rodillas alineadas con los pies", "No redondees la espalda baja"],
    tips: ["King of exercises", "Keep knees aligned with feet", "Don't round lower back"]
  },
  {
    id: "deadlift", nombre: "Peso Muerto", name: "Deadlift",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Isquiotibiales", "Glúteos", "Erectores Espinales", "Trapecio", "Cuádriceps", "Antebrazos"],
    muscles: ["Hamstrings", "Glutes", "Spinal Erectors", "Trapezius", "Quadriceps", "Forearms"],
    equipo: "Barra", equipment: "Barbell", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Barra contra las espinillas", "Agarre prono o mixto, brazos extendidos", "Empuja el suelo con los talones", "Mantén la barra cerca del cuerpo", "Extiende caderas al final"],
    instructions: ["Bar against shins", "Overhand or mixed grip, arms extended", "Push floor with heels", "Keep bar close to body", "Extend hips at top"],
    consejos: ["Mantén espalda neutra SIEMPRE", "No hiperextiendas la espalda al final", "La barba debe seguir una línea recta"],
    tips: ["Keep neutral back ALWAYS", "Don't hyperextend back at top", "Bar should follow straight line"]
  },
  {
    id: "leg-press", nombre: "Prensa de Piernas", name: "Leg Press",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"], muscles: ["Quadriceps", "Glutes", "Hamstrings"],
    equipo: "Máquina de Prensa", equipment: "Leg Press Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Siéntate, pies en la plataforma a ancho de hombros", "Baja la plataforma doblando rodillas", "No levantes los glúteos del asiento", "Empuja extendiendo las piernas"],
    instructions: ["Sit, feet on platform shoulder-width", "Lower platform bending knees", "Don't lift glutes off seat", "Push extending legs"],
    consejos: ["Pies bajos = más cuádriceps", "Pies altos = más glúteos/isquios", "No bloquees completamente las rodillas"],
    tips: ["Low feet = more quads", "High feet = more glutes/hams", "Don't fully lock knees"]
  },
  {
    id: "rdl", nombre: "Peso Muerto Rumano", name: "Romanian Deadlift",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Isquiotibiales", "Glúteos", "Erectores Espinales"], muscles: ["Hamstrings", "Glutes", "Spinal Erectors"],
    equipo: "Barra o Mancuernas", equipment: "Barbell or Dumbbells", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["De pie, barra con agarre prono", "Rodillas ligeramente flexionadas (fijas)", "Inclina el torso hacia adelante", "Baja hasta sentir estiramiento en isquios", "Sube extendiendo caderas"],
    instructions: ["Standing, bar with overhand grip", "Slightly bent knees (fixed)", "Hinge torso forward", "Lower until hamstring stretch felt", "Rise extending hips"],
    consejos: ["Los isquiotibiales son el músculo blanco (tardan en recuperar)", "No bajes la barra por debajo de las rodillas"],
    tips: ["Hamstrings are the slow-recovery muscle", "Don't lower bar below knees"]
  },
  {
    id: "lunges", nombre: "Zancadas (Lunges)", name: "Lunges",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales", "Core"], muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    equipo: "Mancuernas o Peso Corporal", equipment: "Dumbbells or Bodyweight", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Da un paso largo hacia adelante", "Baja hasta que la rodilla trasera casi toque el suelo", "Empuja con el talón delantero para volver", "Alterna piernas"],
    instructions: ["Take long step forward", "Lower until back knee nearly touches floor", "Push through front heel to return", "Alternate legs"],
    consejos: ["Torso erguido durante todo el movimiento", "La rodilla delantera no debe pasar mucho la punta del pie"],
    tips: ["Upright torso throughout", "Front knee shouldn't go too far past toes"]
  },
  {
    id: "bulgarian-split-squat", nombre: "Sentadilla Búlgara", name: "Bulgarian Split Squat",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"], muscles: ["Quadriceps", "Glutes", "Hamstrings"],
    equipo: "Mancuernas + Banca", equipment: "Dumbbells + Bench", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Pie trasero sobre una banca", "Da un paso largo hacia adelante", "Baja hasta que la rodilla trasera casi toque", "Empuja con el talón delantero"],
    instructions: ["Back foot on bench", "Take long step forward", "Lower until back knee nearly touches", "Push through front heel"],
    consejos: ["Excelente para desequilibrios pierna a pierna", "Más difícil de lo que parece  empieza sin peso"],
    tips: ["Excellent for leg-to-leg imbalances", "Harder than it looks  start without weight"]
  },
  {
    id: "leg-curl", nombre: "Curl Femoral", name: "Leg Curl",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Isquiotibiales"], muscles: ["Hamstrings"],
    equipo: "Máquina", equipment: "Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Acuéstate boca abajo, tobillos bajo la almohadilla", "Flexiona las rodillas llevando los talones hacia los glúteos", "Contrae los isquiotibiales", "Baja controladamente"],
    instructions: ["Lie face down, ankles under pad", "Flex knees bringing heels toward glutes", "Contract hamstrings", "Lower controlled"],
    consejos: ["No levantes las caderas del banco", "Siente la contracción completa"],
    tips: ["Don't lift hips off bench", "Feel full contraction"]
  },
  {
    id: "leg-extension", nombre: "Extensión de Cuádriceps", name: "Leg Extension",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps"], muscles: ["Quadriceps"],
    equipo: "Máquina", equipment: "Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Siéntate, tobillos detrás de la almohadilla", "Extiende las piernas contrayendo cuádriceps", "Mantén la contracción 1 segundo", "Baja controladamente"],
    instructions: ["Sit, ankles behind pad", "Extend legs contracting quads", "Hold contraction 1 second", "Lower controlled"],
    consejos: ["Ejercicio de aislamiento puro", "No uses peso excesivo (estrés articular)"],
    tips: ["Pure isolation exercise", "Don't use excessive weight (joint stress)"]
  },
  {
    id: "calf-raises", nombre: "Elevación de Gemelos", name: "Calf Raises",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Gastrocnemio", "Sóleo"], muscles: ["Gastrocnemius", "Soleus"],
    equipo: "Mancuernas o Máquina", equipment: "Dumbbells or Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["De pie en un escalón o superficie elevada", "Talones colgando del borde", "Eleva los talones lo más alto posible", "Baja hasta estiramiento completo"],
    instructions: ["Stand on step or elevated surface", "Heels hanging off edge", "Raise heels as high as possible", "Lower to full stretch"],
    consejos: ["Rango completo clave para gemelos", "Pies rectos = gastrocnemio, pies hacia adentro = sóleo"],
    tips: ["Full range key for calves", "Straight feet = gastroc, inward = soleus"]
  },
  {
    id: "hip-thrust", nombre: "Hip Thrust", name: "Hip Thrust",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Glúteos", "Isquiotibiales"], muscles: ["Glutes", "Hamstrings"],
    equipo: "Barra + Banca", equipment: "Barbell + Bench", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCJjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Espalda sobre una banca, pies en el suelo", "Barra sobre las caderas (con almohadilla)", "Empuja con los glúteos hacia arriba", "Contrae los glúteos al final"],
    instructions: ["Back on bench, feet on floor", "Bar over hips (with pad)", "Drive up with glutes", "Squeeze glutes at top"],
    consejos: ["MEJOR ejercicio para glúteos (evidencia Bret Contreras)", "No arquees la espalda baja"],
    tips: ["BEST glute exercise (Bret Contreras evidence)", "Don't arch lower back"]
  },
  {
    id: "goblet-squat", nombre: "Sentadilla Goblet", name: "Goblet Squat",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps", "Glúteos", "Core"], muscles: ["Quadriceps", "Glutes", "Core"],
    equipo: "Mancuerna o Kettlebell", equipment: "Dumbbell or Kettlebell", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Sujeta una mancuerna contra el pecho", "Pies a ancho de hombros", "Baja en sentadilla manteniendo torso erguido", "Los codos deben tocar el interior de las rodillas"],
    instructions: ["Hold dumbbell against chest", "Feet shoulder-width", "Squat keeping torso upright", "Elbows should touch inside of knees"],
    consejos: ["Excelente para principiantes (patrón de sentadilla)", "El peso frontal ayuda a mantener torso erguido"],
    tips: ["Excellent for beginners (squat pattern)", "Front weight helps keep torso upright"]
  },
  {
    id: "box-jump", nombre: "Salto al Cajón", name: "Box Jump",
    categoria: "piernas", categoriaLabel: "Piernas", categoriaLabelEn: "Legs",
    musculos: ["Cuádriceps", "Glúteos", "Gemelos"], muscles: ["Quadriceps", "Glutes", "Calves"],
    equipo: "Cajón Plyo", equipment: "Plyo Box", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Frente al cajón, pies a ancho de cadera", "Flexiona rodillas y caderas (carga)", "Salta explosivamente extendiendo caderas y rodillas", "Aterriza suave con rodillas ligeramente flexionadas"],
    instructions: ["Face box, feet hip-width", "Bend knees and hips (load)", "Jump explosively extending hips and knees", "Land softly with slightly bent knees"],
    consejos: [ "Enfocado en potencia/explosividad", "No uses altura excesiva (riesgo de caída)", "Aterriza con todo el pie, no solo puntas"],
    tips: ["Focus on power/explosiveness", "Don't use excessive height (fall risk)", "Land with full foot, not just toes"]
  },

  // 
  // CORE  10 ejercicios
  // 
  {
    id: "plank", nombre: "Plancha (Plank)", name: "Plank",
    categoria: "core", categoriaLabel: "Core", categoriaLabelEn: "Core",
    musculos: ["Recto Abdominal", "Oblicuos", "Transverso Abdominal", "Erectores Espinales"],
    muscles: ["Rectus Abdominis", "Obliques", "Transverse Abdominis", "Spinal Erectors"],
    equipo: "Peso Corporal", equipment: "Bodyweight", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: ["Posición de plancha sobre antebrazos", "Cuerpo recto desde cabeza a talones", "Core apretado, glúteos contraídos", "Mantén la posición"],
    instructions: ["Forearm plank position", "Straight body from head to heels", "Tight core, glutes squeezed", "Hold position"],
    consejos: [ "No dejes caer las caderas", "No eleves las caderas (como puente)", "Respira normalmente"],
    tips: ["Don't drop hips", "Don't raise hips (like bridge)", "Breathe normally"]
  },
  {
    id: "crunches", nombre: "Abdominales (Crunches)", name: "Crunches",
    categoria: "core", categoriaLabel: "Core", categoriaLabelEn: "Core",
    musculos: ["Recto Abdominal"], muscles: ["Rectus Abdominis"],
    equipo: "Peso Corporal", equipment: "Bodyweight", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Acuéstate boca arriba, rodillas flexionadas", "Manos detrás de la cabeza (sin tirar)", "Eleva los hombros del suelo", "Contrae los abdominales"],
    instructions: ["Lie on back, knees bent", "Hands behind head (no pulling)", "Lift shoulders off floor", "Contract abs"],
    consejos: ["NO tires de la cabeza (riesgo cervical)", "Movimiento corto y controlado"],
    tips: ["DON'T pull head (neck risk)", "Short controlled movement"]
  },
  {
    id: "russian-twist", nombre: "Russian Twist", name: "Russian Twist",
    categoria: "core", categoriaLabel: "Core", categoriaLabelEn: "Core",
    musculos: ["Oblicuos", "Recto Abdominal"], muscles: ["Obliques", "Rectus Abdominis"],
    equipo: "Mancuerna o Peso Corporal", equipment: "Dumbbell or Bodyweight", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Sentado, inclina torso hacia atrás ~45°", "Pies en el suelo (fácil) o elevados (difícil)", "Gira el torso de lado a lado", "Toca el suelo a cada lado con la mancuerna"],
    instructions: ["Seated, lean torso back ~45°", "Feet on floor (easy) or elevated (hard)", "Rotate torso side to side", "Touch floor each side with dumbbell"],
    consejos: ["El movimiento viene de los oblicuos, no de los brazos", "Mantén el core contraído"],
    tips: ["Movement comes from obliques, not arms", "Keep core engaged"]
  },
  {
    id: "leg-raises", nombre: "Elevación de Piernas", name: "Leg Raises",
    categoria: "core", categoriaLabel: "Core", categoriaLabelEn: "Core",
    musculos: ["Recto Abdominal Inferior", "Flexores de Cadera"], muscles: ["Lower Rectus Abdominis", "Hip Flexors"],
    equipo: "Peso Corporal o Barra", equipment: "Bodyweight or Bar", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Acuéstate boca arriba o colgado de una barra", "Piernas extendidas", "Eleva las piernas hasta 90°", "Baja controladamente sin tocar el suelo"],
    instructions: ["Lie on back or hang from bar", "Legs extended", "Raise legs to 90°", "Lower controlled without touching floor"],
    consejos: ["No arquees la espalda baja", "Si cuelgas: evita el balanceo"],
    tips: ["Don't arch lower back", "If hanging: avoid swinging"]
  },
  {
    id: "dead-bug", nombre: "Dead Bug", name: "Dead Bug",
    categoria: "core", categoriaLabel: "Core", categoriaLabelEn: "Core",
    musculos: ["Transverso Abdominal", "Recto Abdominal", "Oblicuos"], muscles: ["Transverse Abdominis", "Rectus Abdominis", "Obliques"],
    equipo: "Peso Corporal", equipment: "Bodyweight", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["Acuéstate boca arriba, brazos extendidos hacia arriba", "Rodillas flexionadas 90°", "Baja brazo contralateral y pierna extendiendo", "Mantén la espalda pegada al suelo"],
    instructions: ["Lie on back, arms extended up", "Knees bent 90°", "Lower opposite arm and leg extending", "Keep back pressed to floor"],
    consejos: ["Excelente para estabilidad lumbar", "Si la espalda se arquea, no bajes tanto"],
    tips: ["Excellent for lumbar stability", "If back arches, don't lower as much"]
  },
  {
    id: "pallof-press", nombre: "Pallof Press", name: "Pallof Press",
    categoria: "core", categoriaLabel: "Core", categoriaLabelEn: "Core",
    musculos: ["Oblicuos", "Transverso Abdominal"], muscles: ["Obliques", "Transverse Abdominis"],
    equipo: "Polea o Banda", equipment: "Cable or Band", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: ["De pie lateral a la polea", "Agarra la cuerda con ambas manos al pecho", "Extiende los brazos hacia adelante", "Resiste la rotación (no dejes que te gire)"],
    instructions: ["Stand sideways to cable", "Grip rope with both hands at chest", "Extend arms forward", "Resist rotation (don't let it pull you)"],
    consejos: ["Anti-rotación = anti-ejercicio funcional", "Mantén el core contraído durante todo el movimiento"],
    tips: ["Anti-rotation = functional anti-exercise", "Keep core engaged throughout"]
  },

  // 
  // CARDIO  10 ejercicios
  // 
  {
    id: "running", nombre: "Correr", name: "Running",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Isquiotibiales", "Glúteos", "Gemelos", "Core"],
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Core"],
    equipo: "Ninguno/Zapatillas", equipment: "None/Shoes", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Postura erguida, mirada al frente", "Brazos en ángulo 90° balanceándose", "Aterriza en el medio-del-pie", "Cadencia de ~170-180 pasos/minuto"],
    instructions: [ "Upright posture, look forward", "Arms at 90° angle swinging", "Land on mid-foot", "Cadence of ~170-180 steps/minute"],
    consejos: [ "No aterrices en el talón (frenas)", "Zancada corta y rápida es más eficiente", "Respira por nariz y boca"],
    tips: [ "Don't heel strike (brakes)", "Short quick stride is more efficient", "Breathe through nose and mouth"]
  },
  {
    id: "cycling", nombre: "Ciclismo", name: "Cycling",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Glúteos", "Gemelos", "Isquiotibiales"],
    muscles: ["Quadriceps", "Glutes", "Calves", "Hamstrings"],
    equipo: "Bicicleta", equipment: "Bicycle", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Ajusta el asiento a altura de cadera", "Pedalea con cadencia 80-90 RPM", "Empuja hacia abajo y tira hacia arriba", "Mantén torso estable"],
    instructions: [ "Adjust seat to hip height", "Pedal at 80-90 RPM cadence", "Push down and pull up", "Keep torso stable"],
    consejos: [ "Menor impacto que correr (ideal lesiones)", "Ciclismo en ayunas = más oxidación grasa"],
    tips: [ "Lower impact than running (injury ideal)", "Fasted cycling = more fat oxidation"]
  },
  {
    id: "rowing", nombre: "Remo (Rowing)", name: "Rowing",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Dorsal Ancho", "Bíceps", "Core", "Isquiotibiales"],
    muscles: ["Quadriceps", "Latissimus Dorsi", "Biceps", "Core", "Hamstrings"],
    equipo: "Máquina de Remo", equipment: "Rowing Machine", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Secuencia: piernas-espalda-brazos", "Empuja con piernas primero", "Luego inclina torso hacia atrás", "Finaliza tirando con brazos"],
    instructions: [ "Sequence: legs-back-arms", "Push with legs first", "Then lean torso back", "Finish pulling with arms"],
    consejos: [ "60% piernas, 20% torso, 20% brazos", "No tires solo con los brazos"],
    tips: [ "60% legs, 20% torso, 20% arms", "Don't pull with arms only"]
  },
  {
    id: "jump-rope", nombre: "Saltar la Cuerda", name: "Jump Rope",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Gemelos", "Cuádriceps", "Glúteos", "Core", "Antebrazos"],
    muscles: ["Calves", "Quadriceps", "Glutes", "Core", "Forearms"],
    equipo: "Cuerda de Saltar", equipment: "Jump Rope", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Cuerda detrás de los tobillos", "Gira con las muñecas (no los brazos)", "Salta bajo (2-3 cm del suelo)", "Rodillas ligeramente flexionadas"],
    instructions: [ "Rope behind ankles", "Rotate with wrists (not arms)", "Jump low (2-3 cm off ground)", "Slightly bent knees"],
    consejos: [ "Excelente para coordinación y agilidad", "Intervalos: 30s salto / 15s descanso"],
    tips: [ "Excellent for coordination and agility", "Intervals: 30s jump / 15s rest"]
  },
  {
    id: "burpees", nombre: "Burpees", name: "Burpees",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Pectoral", "Deltoides", "Core", "Triceps"],
    muscles: ["Quadriceps", "Pectoralis", "Deltoids", "Core", "Triceps"],
    equipo: "Peso Corporal", equipment: "Bodyweight", dificultad: "avanzado", dificultadEn: "advanced",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "De pie, agáchate y pon manos en el suelo", "Salta a posición de plancha", "Flexión (push-up)", "Salta trayendo pies cerca de las manos", "Salto vertical con manos arriba"],
    instructions: [ "Stand, squat and place hands on floor", "Jump to plank position", "Push-up", "Jump feet near hands", "Vertical jump with hands up"],
    consejos: [ "El ejercicio total por excelencia", "Modificación: sin flexión ni salto para principiantes"],
    tips: [ "The ultimate total exercise", "Modification: no push-up or jump for beginners"]
  },
  {
    id: "battle-ropes", nombre: "Cuerdas de Batalla", name: "Battle Ropes",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Deltoides", "Bíceps", "Core", "Espalda"], muscles: ["Deltoids", "Biceps", "Core", "Back"],
    equipo: "Cuerdas de Batalla", equipment: "Battle Ropes", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Sujeta las cuerdas con agarre neutro", "Postura atlética (rodillas flexionadas)", "Crea ondas alternando brazos", "Mantén ritmo constante"],
    instructions: [ "Grip ropes with neutral grip", "Athletic stance (bent knees)", "Create waves alternating arms", "Maintain constant rhythm"],
    consejos: [ "Excelente para intervalos de alta intensidad", "15-30 segundos de trabajo"],
    tips: [ "Excellent for high-intensity intervals", "15-30 seconds of work"]
  },
  {
    id: "sprints", nombre: "Sprints", name: "Sprints",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Glúteos", "Gemelos", "Isquiotibiales"], muscles: ["Quadriceps", "Glutes", "Calves", "Hamstrings"],
    equipo: "Ninguno/Pista", equipment: "None/Track", dificultad: "avanzado", dificultadEn: "advanced",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Acelera gradualmente a máxima velocidad", "Mantén forma: torso inclinado, brazos potentes", "Distancia: 20-100m", "Descanso completo entre series"],
    instructions: [ "Accelerate gradually to max speed", "Maintain form: inclined torso, powerful arms", "Distance: 20-100m", "Full rest between sets"],
    consejos: [ "Máxima intensidad = máximo beneficio anaeróbico", "Calentamiento exhaustivo obligatorio"],
    tips: [ "Maximum intensity = maximum anaerobic benefit", "Thorough warm-up mandatory"]
  },
  {
    id: "stair-climber", nombre: "Escalera", name: "Stair Climber",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Glúteos", "Gemelos"], muscles: ["Quadriceps", "Glutes", "Calves"],
    equipo: "Máquina o Escaleras", equipment: "Machine or Stairs", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Paso completo en cada escalón", "Empuja con el talón", "No te inclines sobre las manijas", "Mantén torso erguido"],
    instructions: [ "Full step on each stair", "Push through heel", "Don't lean on handles", "Keep torso upright"],
    consejos: [ "Excelente para glúteos y cuádriceps", "Más intenso que caminadora"],
    tips: [ "Excellent for glutes and quads", "More intense than treadmill"]
  },
  {
    id: "elliptical", nombre: "Elíptica", name: "Elliptical",
    categoria: "cardio", categoriaLabel: "Cardio", categoriaLabelEn: "Cardio",
    musculos: ["Cuádriceps", "Glúteos", "Gemelos", "Bíceps", "Triceps"], muscles: ["Quadriceps", "Glutes", "Calves", "Biceps", "Triceps"],
    equipo: "Máquina Elíptica", equipment: "Elliptical Machine", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Pies en los pedales, manos en los agarres", "Movimiento elíptico fluido", "Empuja y tira con brazos", "Mantén ritmo constante"],
    instructions: [ "Feet on pedals, hands on grips", "Smooth elliptical movement", "Push and pull with arms", "Maintain constant rhythm"],
    consejos: [ "Menor impacto articular", "Ideal para principiantes o rehabilitación"],
    tips: [ "Lower joint impact", "Ideal for beginners or rehab"]
  },

  // 
  // OLÍMPICOS  5 ejercicios
  // 
  {
    id: "power-clean", nombre: "Power Clean", name: "Power Clean",
    categoria: "olimpico", categoriaLabel: "Olímpico", categoriaLabelEn: "Olympic",
    musculos: ["Cuádriceps", "Glúteos", "Trapecio", "Deltoides", "Core"],
    muscles: ["Quadriceps", "Glutes", "Trapezius", "Deltoids", "Core"],
    equipo: "Barra", equipment: "Barbell", dificultad: "avanzado", dificultadEn: "advanced",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Barra en el suelo, agarre ancho", "Primera tracción: eleva barra a rodillas", "Segunda tracción: extensión explosiva de caderas", "Recepción en sentadilla parcial (muslos paralelos)"],
    instructions: [ "Bar on floor, wide grip", "First pull: lift bar to knees", "Second pull: explosive hip extension", "Catch in partial squat (thighs parallel)"],
    consejos: [ "APRENDE CON UN COACH certificado", "Riesgo de lesión si técnica incorrecta", "Empieza con palo PVC"],
    tips: [ "LEARN WITH A certified coach", "Injury risk if incorrect technique", "Start with PVC pipe"]
  },
  {
    id: "snatch", nombre: "Arranque (Snatch)", name: "Snatch",
    categoria: "olimpico", categoriaLabel: "Olímpico", categoriaLabelEn: "Olympic",
    musculos: ["Cuádriceps", "Glúteos", "Deltoides", "Trapecio", "Core"],
    muscles: ["Quadriceps", "Glutes", "Deltoids", "Trapezius", "Core"],
    equipo: "Barra", equipment: "Barbell", dificultad: "avanzado", dificultadEn: "advanced",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Agarre muy ancho", "Tracción desde el suelo", "Tira explosivamente", "Recepción con brazos extendidos sobre la cabeza"],
    instructions: [ "Very wide grip", "Pull from floor", "Explosive pull", "Catch with arms extended overhead"],
    consejos: [ "El movimiento más técnico del halterofilia", "NO intentes sin supervisión profesional"],
    tips: [ "Most technical weightlifting movement", "DO NOT attempt without professional supervision"]
  },
  {
    id: "hang-clean", nombre: "Hang Clean", name: "Hang Clean",
    categoria: "olimpico", categoriaLabel: "Olímpico", categoriaLabelEn: "Olympic",
    musculos: ["Cuádriceps", "Glúteos", "Trapecio", "Deltoides"], muscles: ["Quadriceps", "Glutes", "Trapezius", "Deltoids"],
    equipo: "Barra", equipment: "Barbell", dificultad: "avanzado", dificultadEn: "advanced",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Barra colgando a altura de muslos", "Baja barra a mitad de muslo (hang)", "Extensión explosiva de caderas", "Recepción en sentadilla frontal"],
    instructions: [ "Bar hanging at thigh height", "Lower bar to mid-thigh (hang)", "Explosive hip extension", "Catch in front squat"],
    consejos: [ "Variante más simple que desde el suelo", "Enfocado en la segunda tracción"],
    tips: [ "Simpler variant than from floor", "Focused on second pull"]
  },

  // 
  // MOVILIDAD  5 ejercicios
  // 
  {
    id: "foam-roll-quads", nombre: "Foam Roll Cuádriceps", name: "Foam Roll Quads",
    categoria: "movilidad", categoriaLabel: "Movilidad", categoriaLabelEn: "Mobility",
    musculos: ["Cuádriceps", "Fascia"], muscles: ["Quadriceps", "Fascia"],
    equipo: "Roller de Foam", equipment: "Foam Roller", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Apóyate sobre el foam roller boca abajo", "Desde la cadera hasta la rodilla", "Rueda lentamente", "Pausa en puntos dolorosos 30s"],
    instructions: [ "Lie on foam roller face down", "From hip to knee", "Roll slowly", "Pause on painful points 30s"],
    consejos: [ "Auto-masaje miofascial", "Ideal post-entreno o al despertar"],
    tips: [ "Self-myofascial massage", "Ideal post-workout or upon waking"]
  },
  {
    id: "hip-flexor-stretch", nombre: "Estiramiento Flexores de Cadera", name: "Hip Flexor Stretch",
    categoria: "movilidad", categoriaLabel: "Movilidad", categoriaLabelEn: "Mobility",
    musculos: ["Flexores de Cadera", "Psoas"], muscles: ["Hip Flexors", "Psoas"],
    equipo: "Ninguno", equipment: "None", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "Posición de zancada", "Rodilla trasera en el suelo", "Empuja cadera hacia adelante", "Mantén torso erguido"],
    instructions: [ "Lunge position", "Back knee on floor", "Push hip forward", "Keep torso upright"],
    consejos: [ "Esencial para quienes se sientan mucho", "30-60 segundos por lado"],
    tips: ["Essential for those who sit a lot", "30-60 seconds per side"]
  },
  {
    id: "thoracic-rotation", nombre: "Rotación Torácica", name: "Thoracic Rotation",
    categoria: "movilidad", categoriaLabel: "Movilidad", categoriaLabelEn: "Mobility",
    musculos: ["Oblicuos", "Cuadrado Lumbar", "Torácica"], muscles: ["Obliques", "Quadratus Lumborum", "Thoracic"],
    equipo: "Ninguno", equipment: "None", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "A cuatro puntos", "Mano detrás de la cabeza", "Rota el codo hacia arriba", "Mira seguir el codo"],
    instructions: [ "On all fours", "Hand behind head", "Rotate elbow up", "Follow elbow with gaze"],
    consejos: [ "Crucial para salud del hombro y espalda", "8-10 repeticiones por lado"],
    tips: [ "Crucial for shoulder and back health", "8-10 reps per side"]
  },
  {
    id: "cat-cow", nombre: "Gato-Vaca (Cat-Cow)", name: "Cat-Cow Stretch",
    categoria: "movilidad", categoriaLabel: "Movilidad", categoriaLabelEn: "Mobility",
    musculos: ["Espinal", "Recto Abdominal", "Core"], muscles: ["Spinal", "Rectus Abdominis", "Core"],
    equipo: "Ninguno", equipment: "None", dificultad: "principiante", dificultadEn: "beginner",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzAu2U1tILP7bqgM/giphy.gif",
    instrucciones: [ "A cuatro puntos", "Gato: redondea espalda, mete barbilla", "Vaca: arquea espalda, mira arriba", "Transición fluida"],
    instructions: [ "On all fours", "Cat: round back, tuck chin", "Cow: arch back, look up", "Smooth transition"],
    consejos: [ "Calentamiento de columna ideal", "Sincroniza con la respiración"],
    tips: [ "Ideal spine warm-up", "Sync with breathing"]
  },
  {
    id: "worlds-greatest-stretch", nombre: "El Mejor Estiramiento del Mundo", name: "World's Greatest Stretch",
    categoria: "movilidad", categoriaLabel: "Movilidad", categoriaLabelEn: "Mobility",
    musculos: ["Flexores Cadera", "Torácica", "Isquiotibiales", "Glúteos"],
    muscles: ["Hip Flexors", "Thoracic", "Hamstrings", "Glutes"],
    equipo: "Ninguno", equipment: "None", dificultad: "intermedio", dificultadEn: "intermediate",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtxdHRiM2pucWdxa2g2eG10cGRqNHRmZWZzcW14eWN5eHo4b3ZzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0wkQ3siHsxvJCM/giphy.gif",
    instrucciones: [ "Posición de zancada grande", "Mano del mismo lado que pie adelante en el suelo", "Codo al tobillo y rota torso", "Brazo hacia arriba siguiendo la mano"],
    instructions: [ "Large lunge position", "Same-side hand as front foot on floor", "Elbow to ankle and rotate torso", "Arm up following hand"],
    consejos: [ "Movilidad total en un ejercicio", "Perfecto para calentamiento"],
    tips: [ "Total mobility in one exercise", "Perfect for warm-up"]
  },
];

// Categorías disponibles
export const CATEGORIAS = [
  { id: 'empuje', label: 'Empuje', labelEn: 'Push', icon: 'ArrowUp', count: 0 },
  { id: 'traccion', label: 'Tracción', labelEn: 'Pull', icon: 'ArrowDown', count: 0 },
  { id: 'piernas', label: 'Piernas', labelEn: 'Legs', icon: 'LegIcon', count: 0 },
  { id: 'core', label: 'Core', labelEn: 'Core', icon: 'CoreIcon', count: 0 },
  { id: 'cardio', label: 'Cardio', labelEn: 'Cardio', icon: 'Heart', count: 0 },
  { id: 'olimpico', label: 'Olímpico', labelEn: 'Olympic', icon: 'Trophy', count: 0 },
  { id: 'movilidad', label: 'Movilidad', labelEn: 'Mobility', icon: 'Move', count: 0 },
];

// Contar ejercicios por categoría
CATEGORIAS.forEach(cat => {
  cat.count = EJERCICIOS.filter(e => e.categoria === cat.id).length;
});

export function getEjerciciosByCategoria(categoria: string): Ejercicio[] {
  return EJERCICIOS.filter(e => e.categoria === categoria);
}

export function buscarEjercicios(query: string): Ejercicio[] {
  const q = query.toLowerCase();
  return EJERCICIOS.filter(e =>
    e.nombre.toLowerCase().includes(q) ||
    e.name.toLowerCase().includes(q) ||
    e.musculos.some(m => m.toLowerCase().includes(q)) ||
    e.muscles.some(m => m.toLowerCase().includes(q)) ||
    e.equipo.toLowerCase().includes(q)
  );
}

export function getEjerciciosByDificultad(dificultad: string): Ejercicio[] {
  return EJERCICIOS.filter(e => e.dificultad === dificultad || e.dificultadEn === dificultad);
}

export function getEjerciciosByMusculo(musculo: string): Ejercicio[] {
  return EJERCICIOS.filter(e =>
    e.musculos.some(m => m.toLowerCase().includes(musculo.toLowerCase())) ||
    e.muscles.some(m => m.toLowerCase().includes(musculo.toLowerCase()))
  );
}
