import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
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
}

function HumanFigure({ data }: { data: Avatar3DProps }) {
  const groupRef = useRef<THREE.Group>(null);

  const {
    estatura = 170,
    siriPorcentajeGrasa = 15,
    cincoComponentes,
    somatotipo,
  } = data;

  // Factores de escala basados en antropometría
  const heightScale = estatura / 170; // normalizado a 170cm
  const fatFactor = Math.min(Math.max(siriPorcentajeGrasa / 35, 0.1), 1.5);
  const muscleFactor = cincoComponentes
    ? Math.min(Math.max(cincoComponentes.porcentajeMuscular / 45, 0.6), 1.4)
    : 1;
  const boneFactor = cincoComponentes
    ? Math.min(Math.max(cincoComponentes.porcentajeOseo / 8, 0.8), 1.2)
    : 1;

  // Somatotipo afecta la forma
  const endoFactor = somatotipo ? somatotipo.endomorfia / 5 : 0.5; // redondez
  const mesoFactor = somatotipo ? somatotipo.mesomorfia / 5 : 0.5; // robustez
  const ectoFactor = somatotipo ? somatotipo.ectomorfia / 5 : 0.5; // delgadez

  // Escalas de segmentos
  const torsoWidth = 0.35 * heightScale * (1 + endoFactor * 0.3) * muscleFactor;
  const torsoDepth = 0.22 * heightScale * (1 + endoFactor * 0.2);
  const torsoHeight = 0.50 * heightScale;

  const shoulderWidth = 0.42 * heightScale * (1 + mesoFactor * 0.4) * boneFactor;
  const hipWidth = 0.32 * heightScale * (1 + endoFactor * 0.3);

  const armLength = 0.32 * heightScale * (1 + ectoFactor * 0.1);
  const armRadius = 0.055 * heightScale * (1 + mesoFactor * 0.5) * muscleFactor;

  const legLength = 0.45 * heightScale;
  const legRadius = 0.065 * heightScale * (1 + mesoFactor * 0.4) * muscleFactor;
  const thighRadius = 0.085 * heightScale * (1 + mesoFactor * 0.5 + endoFactor * 0.3) * muscleFactor;

  const headScale = 0.11 * heightScale * boneFactor;
  const neckRadius = 0.06 * heightScale * boneFactor;

  // Capa de grasa (escala externa)
  const fatLayer = 1 + fatFactor * 0.15;

  const materialMuscle = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.55, 0.6, 0.5 + muscleFactor * 0.1),
    roughness: 0.5,
    metalness: 0.1,
  }), [muscleFactor]);

  const materialBone = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.08, 0.3, 0.85),
    roughness: 0.3,
    metalness: 0.0,
    transparent: true,
    opacity: 0.9,
  }), []);

  const materialFat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.12, 0.7, 0.65 + fatFactor * 0.1),
    roughness: 0.7,
    metalness: 0.0,
    transparent: true,
    opacity: 0.35,
  }), [fatFactor]);

  const materialSkin = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.08, 0.4, 0.75),
    roughness: 0.6,
    metalness: 0.0,
    transparent: true,
    opacity: 0.25,
  }), []);

  const materialResidual = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.33, 0.5, 0.5),
    roughness: 0.4,
    metalness: 0.0,
    transparent: true,
    opacity: 0.2,
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {/* === ESQUELETO (Masa Ósea) === */}
      <group name="esqueleto">
        {/* Cráneo */}
        <mesh position={[0, 1.55 * heightScale, 0]} material={materialBone}>
          <sphereGeometry args={[headScale, 16, 16]} />
        </mesh>
        {/* Cuello */}
        <mesh position={[0, 1.38 * heightScale, 0]} material={materialBone}>
          <cylinderGeometry args={[neckRadius * 0.7, neckRadius, 0.12 * heightScale, 12]} />
        </mesh>
        {/* Columna/Torso óseo */}
        <mesh position={[0, 1.05 * heightScale, 0]} material={materialBone}>
          <boxGeometry args={[torsoWidth * 0.5, torsoHeight * 0.8, torsoDepth * 0.5]} />
        </mesh>
        {/* Húmeros */}
        {[-1, 1].map(side => (
          <mesh key={`humero-${side}`} position={[side * shoulderWidth * 0.55, 1.25 * heightScale, 0]} rotation={[0, 0, side * 0.15]} material={materialBone}>
            <capsuleGeometry args={[0.022 * heightScale * boneFactor, armLength * 0.45, 8, 16]} />
          </mesh>
        ))}
        {/* Fémures */}
        {[-1, 1].map(side => (
          <mesh key={`femur-${side}`} position={[side * hipWidth * 0.35, 0.55 * heightScale, 0]} material={materialBone}>
            <capsuleGeometry args={[0.028 * heightScale * boneFactor, legLength * 0.5, 8, 16]} />
          </mesh>
        ))}
        {/* Tibias */}
        {[-1, 1].map(side => (
          <mesh key={`tibia-${side}`} position={[side * hipWidth * 0.3, 0.15 * heightScale, 0]} material={materialBone}>
            <capsuleGeometry args={[0.022 * heightScale * boneFactor, legLength * 0.45, 8, 16]} />
          </mesh>
        ))}
      </group>

      {/* === MÚSCULO === */}
      <group name="musculo">
        {/* Hombros/Deltoides */}
        {[-1, 1].map(side => (
          <mesh key={`delt-${side}`} position={[side * shoulderWidth * 0.5, 1.32 * heightScale, 0]} material={materialMuscle}>
            <sphereGeometry args={[armRadius * 1.6 * muscleFactor, 12, 12]} />
          </mesh>
        ))}
        {/* Brazos */}
        {[-1, 1].map(side => (
          <mesh key={`brazo-${side}`} position={[side * (shoulderWidth * 0.5 + armLength * 0.35), 1.05 * heightScale, 0]} rotation={[0, 0, side * 0.1]} material={materialMuscle}>
            <capsuleGeometry args={[armRadius * muscleFactor, armLength * 0.9, 8, 16]} />
          </mesh>
        ))}
        {/* Pectoral */}
        <mesh position={[0, 1.22 * heightScale, torsoDepth * 0.35]} material={materialMuscle}>
          <boxGeometry args={[torsoWidth * 0.9, 0.12 * heightScale, 0.06 * heightScale]} />
        </mesh>
        {/* Abdomen */}
        <mesh position={[0, 0.95 * heightScale, torsoDepth * 0.4]} material={materialMuscle}>
          <boxGeometry args={[torsoWidth * 0.75, 0.18 * heightScale, 0.05 * heightScale]} />
        </mesh>
        {/* Espalda */}
        <mesh position={[0, 1.1 * heightScale, -torsoDepth * 0.4]} material={materialMuscle}>
          <boxGeometry args={[torsoWidth * 0.95, 0.28 * heightScale, 0.06 * heightScale]} />
        </mesh>
        {/* Muslos */}
        {[-1, 1].map(side => (
          <mesh key={`muslo-${side}`} position={[side * hipWidth * 0.35, 0.58 * heightScale, 0]} material={materialMuscle}>
            <capsuleGeometry args={[thighRadius * muscleFactor, legLength * 0.5, 8, 16]} />
          </mesh>
        ))}
        {/* Pantorrillas */}
        {[-1, 1].map(side => (
          <mesh key={`pantorrilla-${side}`} position={[side * hipWidth * 0.3, 0.18 * heightScale, 0.02]} material={materialMuscle}>
            <capsuleGeometry args={[legRadius * muscleFactor, legLength * 0.42, 8, 16]} />
          </mesh>
        ))}
        {/* Glúteos */}
        <mesh position={[0, 0.72 * heightScale, -hipWidth * 0.15]} material={materialMuscle}>
          <sphereGeometry args={[hipWidth * 0.35 * muscleFactor, 12, 12]} />
        </mesh>
      </group>

      {/* === TEJIDO ADIPOSO (capa externa translúcida) === */}
      <group name="adiposo" scale={fatLayer}>
        {/* Abdomen graso */}
        <mesh position={[0, 0.95 * heightScale, torsoDepth * 0.45 * fatLayer]} material={materialFat}>
          <sphereGeometry args={[torsoWidth * 0.4 * fatFactor, 12, 12]} />
        </mesh>
        {/* Cadera grasa */}
        <mesh position={[0, 0.72 * heightScale, -hipWidth * 0.1]} material={materialFat}>
          <sphereGeometry args={[hipWidth * 0.38 * fatFactor, 12, 12]} />
        </mesh>
        {/* Brazos grasa */}
        {[-1, 1].map(side => (
          <mesh key={`brazoFat-${side}`} position={[side * (shoulderWidth * 0.5 + armLength * 0.35), 1.05 * heightScale, 0]} material={materialFat}>
            <capsuleGeometry args={[armRadius * 1.15 * fatFactor, armLength * 0.85, 8, 16]} />
          </mesh>
        ))}
        {/* Muslos grasa */}
        {[-1, 1].map(side => (
          <mesh key={`musloFat-${side}`} position={[side * hipWidth * 0.35, 0.58 * heightScale, 0]} material={materialFat}>
            <capsuleGeometry args={[thighRadius * 1.1 * fatFactor, legLength * 0.48, 8, 16]} />
          </mesh>
        ))}
      </group>

      {/* === PIEL (capa más externa, muy transparente) === */}
      <group name="piel" scale={1.02}>
        <mesh position={[0, 1.1 * heightScale, 0]} material={materialSkin}>
          <boxGeometry args={[torsoWidth * 1.02, torsoHeight * 1.02, torsoDepth * 1.02]} />
        </mesh>
      </group>

      {/* === RESIDUAL (órganos internos, sutil) === */}
      <group name="residual">
        <mesh position={[0, 1.08 * heightScale, 0]} material={materialResidual}>
          <sphereGeometry args={[torsoWidth * 0.3, 8, 8]} />
        </mesh>
        <mesh position={[0, 0.88 * heightScale, 0]} material={materialResidual}>
          <sphereGeometry args={[torsoWidth * 0.25, 8, 8]} />
        </mesh>
      </group>

      {/* === ETIQUETAS === */}
      {cincoComponentes && (
        <>
          <Text position={[0.8, 1.5 * heightScale, 0]} fontSize={0.06} color="#f59e0b" anchorX="left">
            {`Grasa: ${cincoComponentes.porcentajeAdiposo.toFixed(1)}%`}
          </Text>
          <Text position={[0.8, 1.4 * heightScale, 0]} fontSize={0.06} color="#3b82f6" anchorX="left">
            {`Músculo: ${cincoComponentes.porcentajeMuscular.toFixed(1)}%`}
          </Text>
          <Text position={[0.8, 1.3 * heightScale, 0]} fontSize={0.06} color="#8b5cf6" anchorX="left">
            {`Hueso: ${cincoComponentes.porcentajeOseo.toFixed(1)}%`}
          </Text>
          <Text position={[0.8, 1.2 * heightScale, 0]} fontSize={0.06} color="#64748b" anchorX="left">
            {`IMO: ${(cincoComponentes.masaMuscular / cincoComponentes.masaOsea).toFixed(2)}`}
          </Text>
        </>
      )}

      {/* Plano base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function Avatar3D(props: Avatar3DProps) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border bg-gradient-to-b from-slate-100 to-slate-200">
      <Canvas camera={{ position: [0, 0.5, 2.8], fov: 45 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <HumanFigure data={props} />
        <OrbitControls
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
          autoRotate
          autoRotateSpeed={1}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
