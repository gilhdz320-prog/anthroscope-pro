import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary } from './ErrorBoundary';

export interface Avatar3DProps {
  estatura: number;
  masaCorporal: number;
  siriPorcentajeGrasa: number;
  cincoComponentes?: {
    masaMuscular: number;
    masaOsea: number;
    masaAdiposa: number;
    masaPiel: number;
    masaResidual: number;
    masaCorporalTotal: number;
    porcentajeMuscular: number;
    porcentajeOseo: number;
    porcentajeAdiposo: number;
  };
  somatotipo?: {
    endomorfia: number;
    mesomorfia: number;
    ectomorfia: number;
  };
  labels?: {
    grasa: string;
    musculo: string;
    hueso: string;
    imo: string;
    somatotipo: string;
  };
}

function AnatomicalFigure({ data }: { data: Avatar3DProps }) {
  const groupRef = useRef<THREE.Group>(null);

  const { estatura = 170, siriPorcentajeGrasa = 15, cincoComponentes, somatotipo, labels } = data;
  const l = labels || { grasa: 'Grasa', musculo: 'Musculo', hueso: 'Hueso', imo: 'IMO', somatotipo: 'Somatotipo' };

  // Escaladores base
  const hScale = estatura / 170;

  // Fat factor: 0 = extremadamente magro, 1 = promedio, 1.5+ = adiposo
  // Ajustado para que sea visualmente claro
  const rawFat = siriPorcentajeGrasa;
  const fatFactor = rawFat <= 6 ? 0.1 : rawFat <= 12 ? 0.3 : rawFat <= 18 ? 0.55 : rawFat <= 25 ? 0.85 : rawFat <= 35 ? 1.15 : 1.5;

  // Muscle factor: 0.5 = poco musculo, 1.0 = promedio, 1.4+ = muy musculoso
  const rawMuscle = cincoComponentes?.porcentajeMuscular ?? 40;
  const muscleFactor = rawMuscle <= 30 ? 0.6 : rawMuscle <= 38 ? 0.85 : rawMuscle <= 45 ? 1.05 : rawMuscle <= 52 ? 1.25 : 1.45;

  // Somatotipo factors
  const endo = somatotipo ? Math.min(somatotipo.endomorfia / 7, 1.2) : 0.35;
  const meso = somatotipo ? Math.min(somatotipo.mesomorfia / 7, 1.2) : 0.55;
  const ecto = somatotipo ? Math.min(somatotipo.ectomorfia / 7, 1.2) : 0.45;

  // Ancho del torso según somatotipo (meso = ancho, ecto = estrecho, endo = redondeado)
  const shoulderWidth = 0.38 * hScale * (0.9 + meso * 0.5 + endo * 0.25);
  const torsoWidth = 0.28 * hScale * (0.85 + endo * 0.4);
  const waistWidth = 0.16 * hScale * (0.8 + endo * 0.35);

  // Materiales
  const muscleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4a6fa5'),
    roughness: 0.4,
    metalness: 0.15,
  }), []);

  const boneMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e8e0d5'),
    roughness: 0.3,
    metalness: 0.0,
    transparent: true,
    opacity: 0.7,
  }), []);

  // Grasa como capa semi-transparente dorada
  const fatMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.12, 0.5, 0.7 + fatFactor * 0.1),
    roughness: 0.7,
    metalness: 0.0,
    transparent: true,
    opacity: 0.35 + fatFactor * 0.25,
  }), [fatFactor]);

  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c4956a'),
    roughness: 0.5,
    metalness: 0.0,
    transparent: true,
    opacity: 0.25,
  }), []);

  const jointMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5a6e7c'),
    roughness: 0.5,
    metalness: 0.2,
  }), []);

  // Capsula = forma muscular (cilindro con tapas redondeadas)
  // Elipse = usando capsule con escalas asimetricas

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }
  });

  // Helper: crear un "músculo" (cápsula escalada para parecer real)
  const Muscle = ({ args, position, rotation = [0, 0, 0], scale = [1, 1, 1], mat = muscleMat }: any) => (
    <mesh position={position} rotation={rotation} scale={scale} material={mat} castShadow>
      <capsuleGeometry args={args} />
    </mesh>
  );

  // Helper: capa de grasa (envuelve el músculo con escala ligeramente mayor)
  const FatLayer = ({ args, position, rotation = [0, 0, 0], scaleExtra = 0 }: any) => {
    const s = 1 + fatFactor * (0.08 + scaleExtra);
    return (
      <mesh position={position} rotation={rotation} scale={[s, s * 0.95, s]} material={fatMat}>
        <capsuleGeometry args={[args[0] * 1.12, args[1] * 1.08, 10, 12]} />
      </mesh>
    );
  };

  // Head
  const headSize = 0.09 * hScale;

  return (
    <group ref={groupRef} position={[0, -0.95, 0]}>

      {/* ===== HEAD ===== */}
      <group position={[0, 1.58 * hScale, 0]}>
        {/* Cráneo */}
        <mesh material={boneMat}>
          <sphereGeometry args={[headSize, 20, 20]} />
        </mesh>
        {/* Mandíbula */}
        <mesh position={[0, -0.05 * hScale, 0.02 * hScale]} material={jointMat}>
          <boxGeometry args={[0.1 * hScale, 0.07 * hScale, 0.09 * hScale]} />
        </mesh>
        {/* Capa grasa facial (afecta la redondez de la cara) */}
        <mesh scale={[1 + fatFactor * 0.12, 1 + fatFactor * 0.08, 1 + fatFactor * 0.1]} material={fatMat}>
          <sphereGeometry args={[headSize * 1.05, 16, 16]} />
        </mesh>
      </group>

      {/* ===== NECK ===== */}
      <group position={[0, 1.48 * hScale, 0]}>
        <Muscle args={[0.045 * hScale * (0.9 + meso * 0.3), 0.08 * hScale, 12, 16]} scale={[1, 1, 1.2]} />
      </group>

      {/* ===== TORSO ===== */}
      {/* Tronco superior (caja torácica) - forma de trapecio invertido */}
      <group position={[0, 1.22 * hScale, 0]}>
        {/* Costillas/huesos del torso */}
        <mesh material={boneMat} position={[0, 0, 0]}>
          <boxGeometry args={[torsoWidth * 0.9, 0.22 * hScale, 0.18 * hScale]} />
        </mesh>

        {/* PECTORALES - ahora son planos anchos, NO esferas redondas */}
        <group>
          <Muscle
            args={[0.055 * hScale * muscleFactor, 0.02 * hScale, 10, 14]}
            position={[-0.07 * hScale, 0.04 * hScale, 0.1 * hScale * (0.8 + muscleFactor * 0.25)]}
            rotation={[0, 0.15, 0.1]}
            scale={[1.4, 1, 1]}
          />
          <Muscle
            args={[0.055 * hScale * muscleFactor, 0.02 * hScale, 10, 14]}
            position={[0.07 * hScale, 0.04 * hScale, 0.1 * hScale * (0.8 + muscleFactor * 0.25)]}
            rotation={[0, -0.15, -0.1]}
            scale={[1.4, 1, 1]}
          />
        </group>

        {/* DORSAL ANCHO (espalda) */}
        <Muscle
          args={[0.08 * hScale * muscleFactor, 0.03 * hScale, 10, 14]}
          position={[0, 0.02 * hScale, -0.1 * hScale]}
          scale={[2.2 * (0.7 + meso * 0.5), 1.2, 0.5]}
        />

        {/* TRONCO MEDIO (cintura) - se estrecha */}
        <group position={[0, -0.1 * hScale, 0]}>
          {/* Oblicuos */}
          <Muscle
            args={[0.04 * hScale * muscleFactor, 0.06 * hScale, 8, 12]}
            position={[-0.08 * hScale, 0, 0.05 * hScale]}
            rotation={[0, 0, 0.3]}
          />
          <Muscle
            args={[0.04 * hScale * muscleFactor, 0.06 * hScale, 8, 12]}
            position={[0.08 * hScale, 0, 0.05 * hScale]}
            rotation={[0, 0, -0.3]}
          />
          {/* Recto abdominal - "six pack" visible solo si baja grasa */}
          {fatFactor < 0.6 && (
            <group>
              {[0, 1, 2].map((row) => (
                <group key={row}>
                  <Muscle
                    args={[0.035 * hScale * muscleFactor, 0.015 * hScale, 8, 10]}
                    position={[-0.035 * hScale, -0.02 * hScale - row * 0.04 * hScale, 0.08 * hScale]}
                    scale={[1, 0.8, 0.6]}
                  />
                  <Muscle
                    args={[0.035 * hScale * muscleFactor, 0.015 * hScale, 8, 10]}
                    position={[0.035 * hScale, -0.02 * hScale - row * 0.04 * hScale, 0.08 * hScale]}
                    scale={[1, 0.8, 0.6]}
                  />
                </group>
              ))}
            </group>
          )}
        </group>

        {/* CADERA / PELVIS */}
        <group position={[0, -0.22 * hScale, -0.02 * hScale]}>
          <mesh material={boneMat}>
            <boxGeometry args={[waistWidth * 1.3, 0.1 * hScale, 0.14 * hScale]} />
          </mesh>
          {/* Glúteos */}
          <Muscle
            args={[0.08 * hScale * muscleFactor, 0.04 * hScale, 10, 14]}
            position={[0, -0.03 * hScale, -0.08 * hScale]}
            scale={[1.6 * (0.8 + endo * 0.3), 1.1, 0.8]}
          />
        </group>

        {/* CAPA DE GRASA DEL TORSO - envuelve todo el torso */}
        <mesh material={fatMat} position={[0, -0.05 * hScale, 0]}>
          <boxGeometry args={[torsoWidth * (1 + fatFactor * 0.2), 0.35 * hScale * (1 + fatFactor * 0.12), 0.22 * hScale * (1 + fatFactor * 0.15)]} />
        </mesh>

        {/* PIEL - capa muy sutil */}
        <mesh material={skinMat} position={[0, -0.05 * hScale, 0]} scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[torsoWidth * (1 + fatFactor * 0.2), 0.35 * hScale * (1 + fatFactor * 0.12), 0.22 * hScale * (1 + fatFactor * 0.15)]} />
        </mesh>
      </group>

      {/* ===== SHOULDERS / DELTOIDS ===== */}
      {[-1, 1].map((side) => (
        <group key={`delto-${side}`} position={[side * 0.22 * hScale * (0.8 + meso * 0.4), 1.32 * hScale, 0]}>
          {/* Deltoides frontales */}
          <Muscle
            args={[0.05 * hScale * muscleFactor, 0.03 * hScale, 10, 14]}
            rotation={[0, 0, side * 0.3]}
            scale={[1.1, 1, 1.3]}
          />
          {/* Deltoides laterales - los "hombros" */}
          <Muscle
            args={[0.045 * hScale * muscleFactor, 0.02 * hScale, 10, 14]}
            position={[side * 0.03 * hScale, 0, 0]}
            rotation={[0, 0, side * -0.2]}
            scale={[0.8, 1, 1.4]}
          />
          {/* Grasa del hombro */}
          <FatLayer args={[0.055 * hScale, 0.06 * hScale, 10, 12]} position={[0, 0, 0]} />
        </group>
      ))}

      {/* ===== ARMS ===== */}
      {[-1, 1].map((side) => (
        <group key={`arm-${side}`}>
          {/* Bíceps / Brazo superior */}
          <group position={[side * 0.28 * hScale * (0.85 + meso * 0.2), 1.08 * hScale, 0]}>
            <Muscle
              args={[0.04 * hScale * muscleFactor, 0.14 * hScale, 12, 16]}
              rotation={[0, 0, side * 0.06]}
            />
            {/* Pico del bíceps */}
            <Muscle
              args={[0.035 * hScale * muscleFactor, 0.02 * hScale, 10, 12]}
              position={[0, 0.04 * hScale, 0.02 * hScale]}
              scale={[1.2, 0.8, 1.1]}
            />
            {/* Capa grasa brazo */}
            <FatLayer args={[0.042 * hScale, 0.13 * hScale, 10, 12]} position={[0, 0, 0]} scaleExtra={0.05} />
            {/* Hueso (húmero) */}
            <mesh position={[0, 0, -0.01 * hScale]} material={boneMat}>
              <capsuleGeometry args={[0.015 * hScale, 0.15 * hScale, 8, 12]} />
            </mesh>
          </group>

          {/* Antebrazo */}
          <group position={[side * 0.29 * hScale * (0.85 + meso * 0.15), 0.88 * hScale, 0]}>
            <Muscle
              args={[0.03 * hScale * muscleFactor, 0.12 * hScale, 10, 14]}
              rotation={[0, 0, side * 0.12]}
            />
            {/* Grasa antebrazo */}
            <FatLayer args={[0.032 * hScale, 0.11 * hScale, 10, 12]} position={[0, 0, 0]} scaleExtra={0.03} />
          </group>

          {/* Codo */}
          <mesh position={[side * 0.28 * hScale, 0.98 * hScale, 0]} material={jointMat}>
            <sphereGeometry args={[0.03 * hScale, 10, 10]} />
          </mesh>

          {/* Mano */}
          <mesh position={[side * 0.29 * hScale, 0.78 * hScale, 0]} material={skinMat}>
            <boxGeometry args={[0.025 * hScale, 0.035 * hScale, 0.02 * hScale]} />
          </mesh>
        </group>
      ))}

      {/* ===== THIGHS / QUADRICEPS ===== */}
      {[-1, 1].map((side) => (
        <group key={`thigh-${side}`}>
          <group position={[side * 0.11 * hScale * (0.9 + endo * 0.15), 0.55 * hScale, 0.02 * hScale]}>
            {/* Fémur (hueso) */}
            <mesh position={[0, 0, -0.02 * hScale]} material={boneMat}>
              <capsuleGeometry args={[0.018 * hScale, 0.24 * hScale, 8, 12]} />
            </mesh>

            {/* Cuádriceps - forma de lágrima grande */}
            <Muscle
              args={[0.06 * hScale * muscleFactor, 0.22 * hScale, 12, 16]}
              position={[0, 0.01 * hScale, 0.03 * hScale]}
              scale={[1.1, 1, 1.2]}
            />
            {/* Vasto externo (sweep del cuad) */}
            <Muscle
              args={[0.04 * hScale * muscleFactor, 0.02 * hScale, 10, 12]}
              position={[side * 0.015 * hScale, 0.05 * hScale, 0.01 * hScale]}
              scale={[1.2, 0.8, 1]}
            />
            {/* Isquiotibiales (posterior) */}
            <Muscle
              args={[0.045 * hScale * muscleFactor, 0.18 * hScale, 10, 14]}
              position={[0, 0, -0.04 * hScale]}
              scale={[1, 1, 0.8]}
            />

            {/* CAPA GRASA MUSLO - engorda significativamente cuando hay grasa */}
            <mesh material={fatMat} scale={[1 + fatFactor * 0.18, 1 + fatFactor * 0.08, 1 + fatFactor * 0.22]}>
              <capsuleGeometry args={[0.065 * hScale, 0.2 * hScale, 12, 16]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* ===== KNEES ===== */}
      {[-1, 1].map((side) => (
        <mesh key={`knee-${side}`} position={[side * 0.1 * hScale, 0.36 * hScale, 0]} material={jointMat}>
          <sphereGeometry args={[0.035 * hScale, 12, 12]} />
        </mesh>
      ))}

      {/* ===== CALVES / PANTORRILLA ===== */}
      {[-1, 1].map((side) => (
        <group key={`calf-${side}`}>
          <group position={[side * 0.09 * hScale, 0.2 * hScale, 0.015 * hScale]}>
            {/* Gastrocnemio (pantorrilla) */}
            <Muscle
              args={[0.038 * hScale * muscleFactor, 0.16 * hScale, 10, 14]}
              scale={[1, 1, 1.1]}
            />
            {/* Pico de la pantorrilla */}
            <Muscle
              args={[0.032 * hScale * muscleFactor, 0.02 * hScale, 8, 12]}
              position={[0, 0.03 * hScale, 0.015 * hScale]}
              scale={[1.1, 0.8, 1.2]}
            />
            {/* Grasa pantorrilla */}
            <FatLayer args={[0.04 * hScale, 0.15 * hScale, 10, 12]} position={[0, 0, 0]} scaleExtra={0.08} />

            {/* Tibia */}
            <mesh position={[0, 0, -0.015 * hScale]} material={boneMat}>
              <capsuleGeometry args={[0.015 * hScale, 0.17 * hScale, 8, 12]} />
            </mesh>
          </group>

          {/* Tobillo */}
          <mesh position={[side * 0.08 * hScale, 0.09 * hScale, 0]} material={jointMat}>
            <sphereGeometry args={[0.022 * hScale, 10, 10]} />
          </mesh>

          {/* Pie */}
          <mesh position={[side * 0.08 * hScale, 0.04 * hScale, 0.025 * hScale]} material={skinMat}>
            <boxGeometry args={[0.035 * hScale, 0.015 * hScale, 0.08 * hScale]} />
          </mesh>
        </group>
      ))}

      {/* ===== LABELS FLOTANTES ===== */}
      {cincoComponentes && (
        <>
          <Text position={[0.75, 1.5 * hScale, 0]} fontSize={0.052} color="#f59e0b" anchorX="left">
            {`${l.grasa}: ${cincoComponentes.porcentajeAdiposo.toFixed(1)}%`}
          </Text>
          <Text position={[0.75, 1.42 * hScale, 0]} fontSize={0.052} color="#3b82f6" anchorX="left">
            {`${l.musculo}: ${cincoComponentes.porcentajeMuscular.toFixed(1)}%`}
          </Text>
          <Text position={[0.75, 1.34 * hScale, 0]} fontSize={0.052} color="#8b5cf6" anchorX="left">
            {`${l.hueso}: ${cincoComponentes.porcentajeOseo.toFixed(1)}%`}
          </Text>
          <Text position={[0.75, 1.26 * hScale, 0]} fontSize={0.052} color="#64748b" anchorX="left">
            {`${l.imo}: ${(cincoComponentes.masaMuscular / cincoComponentes.masaOsea).toFixed(2)}`}
          </Text>
          {somatotipo && (
            <Text position={[0.75, 1.18 * hScale, 0]} fontSize={0.048} color="#10b981" anchorX="left">
              {`${l.somatotipo}: E${somatotipo.endomorfia}-M${somatotipo.mesomorfia}-Ec${somatotipo.ectomorfia}`}
            </Text>
          )}
        </>
      )}

      {/* ===== PLANO DEL SUELO ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function Avatar3D(props: Avatar3DProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="h-[300px] flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm">3D Avatar unavailable</p>
          <p className="text-xs text-slate-300 mt-1">WebGL may be disabled on this device</p>
        </div>
      }
    >
      <div className="w-full h-[500px] rounded-xl overflow-hidden border bg-gradient-to-b from-slate-100 to-slate-200">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0.3, 2.6], fov: 42 }} shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 3]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
            <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#a5b4fc" />
            <pointLight position={[0, 2, 0]} intensity={0.3} color="#fcd34d" />
            <AnatomicalFigure data={props} />
            <OrbitControls
              enablePan={false}
              minDistance={1.8}
              maxDistance={4.5}
              minPolarAngle={Math.PI * 0.15}
              maxPolarAngle={Math.PI * 0.75}
              autoRotate
              autoRotateSpeed={0.8}
            />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
