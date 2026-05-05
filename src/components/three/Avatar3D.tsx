import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, MeshDistortMaterial } from '@react-three/drei';
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

function AnatomicalFigure({ data }: { data: Avatar3DProps }) {
  const groupRef = useRef<THREE.Group>(null);

  const { estatura = 170, siriPorcentajeGrasa = 15, cincoComponentes, somatotipo } = data;

  const hScale = estatura / 170;
  const fatFactor = Math.min(Math.max(siriPorcentajeGrasa / 35, 0.05), 1.3);
  const muscleFactor = cincoComponentes ? Math.min(Math.max(cincoComponentes.porcentajeMuscular / 45, 0.5), 1.5) : 1;
  const boneFactor = cincoComponentes ? Math.min(Math.max(cincoComponentes.porcentajeOseo / 8, 0.7), 1.3) : 1;

  // Somatotipo factors
  const endo = somatotipo ? somatotipo.endomorfia / 7 : 0.3;
  const meso = somatotipo ? somatotipo.mesomorfia / 7 : 0.5;
  const ecto = somatotipo ? somatotipo.ectomorfia / 7 : 0.4;

  // Material definitions
  const muscleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.58, 0.55, 0.45 + muscleFactor * 0.08),
    roughness: 0.45,
    metalness: 0.05,
  }), [muscleFactor]);

  const boneMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.08, 0.15, 0.88),
    roughness: 0.25,
    metalness: 0.0,
    transparent: true,
    opacity: 0.75,
  }), []);

  const fatMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.11, 0.65, 0.62 + fatFactor * 0.08),
    roughness: 0.65,
    metalness: 0.0,
    transparent: true,
    opacity: 0.28,
  }), [fatFactor]);

  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.07, 0.35, 0.72),
    roughness: 0.55,
    metalness: 0.0,
    transparent: true,
    opacity: 0.15,
  }), []);

  const jointMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.55, 0.3, 0.35),
    roughness: 0.6,
    metalness: 0.1,
  }), []);

  // Helper to create muscle geometry
  const createMuscleGroup = () => {
    const g = new THREE.Group();
    return g;
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.9, 0]}>
      {/* === HEAD === */}
      <group position={[0, 1.58 * hScale, 0]}>
        {/* Cranium */}
        <mesh material={boneMat}>
          <sphereGeometry args={[0.095 * hScale * boneFactor, 24, 24]} />
        </mesh>
        {/* Jaw */}
        <mesh position={[0, -0.06 * hScale, 0.02 * hScale]} material={boneMat}>
          <boxGeometry args={[0.11 * hScale, 0.07 * hScale, 0.1 * hScale]} />
        </mesh>
        {/* Fat layer on face */}
        <mesh scale={[1 + fatFactor * 0.12, 1 + fatFactor * 0.08, 1 + fatFactor * 0.1]} material={fatMat}>
          <sphereGeometry args={[0.098 * hScale, 20, 20]} />
        </mesh>
      </group>

      {/* === NECK === */}
      <mesh position={[0, 1.45 * hScale, 0]} material={muscleMat}>
        <cylinderGeometry args={[0.055 * hScale, 0.065 * hScale, 0.14 * hScale, 16]} />
      </mesh>

      {/* === TORSO === */}
      <group position={[0, 1.15 * hScale, 0]}>
        {/* Ribcage / Thorax */}
        <mesh material={boneMat}>
          <boxGeometry args={[0.32 * hScale, 0.28 * hScale, 0.22 * hScale]} />
        </mesh>
        
        {/* Pectorals (chest muscles) */}
        <group>
          <mesh position={[-0.09 * hScale, 0.06 * hScale, 0.11 * hScale * (1 + muscleFactor * 0.3)]} material={muscleMat}>
            <sphereGeometry args={[0.09 * hScale * muscleFactor, 16, 16]} />
          </mesh>
          <mesh position={[0.09 * hScale, 0.06 * hScale, 0.11 * hScale * (1 + muscleFactor * 0.3)]} material={muscleMat}>
            <sphereGeometry args={[0.09 * hScale * muscleFactor, 16, 16]} />
          </mesh>
        </group>

        {/* Abdominals (six-pack area) */}
        {[0, 1, 2].map((row) => (
          <group key={row}>
            <mesh position={[-0.04 * hScale, -0.06 * hScale - row * 0.045 * hScale, 0.1 * hScale * (1 + muscleFactor * 0.25)]} material={muscleMat}>
              <boxGeometry args={[0.07 * hScale * muscleFactor, 0.035 * hScale, 0.02 * hScale]} />
            </mesh>
            <mesh position={[0.04 * hScale, -0.06 * hScale - row * 0.045 * hScale, 0.1 * hScale * (1 + muscleFactor * 0.25)]} material={muscleMat}>
              <boxGeometry args={[0.07 * hScale * muscleFactor, 0.035 * hScale, 0.02 * hScale]} />
            </mesh>
          </group>
        ))}

        {/* Obliques */}
        <mesh position={[-0.16 * hScale, -0.05 * hScale, 0.05 * hScale]} rotation={[0, 0, 0.3]} material={muscleMat}>
          <boxGeometry args={[0.06 * hScale * muscleFactor, 0.14 * hScale, 0.08 * hScale]} />
        </mesh>
        <mesh position={[0.16 * hScale, -0.05 * hScale, 0.05 * hScale]} rotation={[0, 0, -0.3]} material={muscleMat}>
          <boxGeometry args={[0.06 * hScale * muscleFactor, 0.14 * hScale, 0.08 * hScale]} />
        </mesh>

        {/* Latissimus dorsi (back wings) */}
        <mesh position={[0, 0.02 * hScale, -0.1 * hScale]} material={muscleMat}>
          <boxGeometry args={[0.38 * hScale * (1 + meso * 0.4), 0.24 * hScale, 0.06 * hScale]} />
        </mesh>

        {/* Fat layer on torso */}
        <mesh scale={[1 + fatFactor * 0.15, 1 + fatFactor * 0.12, 1 + fatFactor * 0.2]} material={fatMat}>
          <boxGeometry args={[0.34 * hScale, 0.3 * hScale, 0.24 * hScale]} />
        </mesh>

        {/* Skin layer */}
        <mesh scale={[1.02, 1.02, 1.02]} material={skinMat}>
          <boxGeometry args={[0.35 * hScale, 0.32 * hScale, 0.25 * hScale]} />
        </mesh>
      </group>

      {/* === SHOULDERS / DELTOIDS === */}
      {[-1, 1].map((side) => (
        <group key={`shoulder-${side}`} position={[side * 0.22 * hScale, 1.28 * hScale, 0]}>
          <mesh material={muscleMat}>
            <sphereGeometry args={[0.075 * hScale * muscleFactor, 16, 16]} />
          </mesh>
          <mesh position={[side * 0.03 * hScale, 0, 0]} material={fatMat} scale={[1 + fatFactor * 0.1, 1 + fatFactor * 0.1, 1 + fatFactor * 0.1]}>
            <sphereGeometry args={[0.078 * hScale, 12, 12]} />
          </mesh>
        </group>
      ))}

      {/* === ARMS === */}
      {[-1, 1].map((side) => (
        <group key={`arm-${side}`}>
          {/* Upper arm / Bicep */}
          <group position={[side * 0.26 * hScale, 1.08 * hScale, 0]}>
            <mesh rotation={[0, 0, side * 0.08]} material={muscleMat}>
              <capsuleGeometry args={[0.048 * hScale * muscleFactor, 0.16 * hScale, 12, 16]} />
            </mesh>
            {/* Bicep peak */}
            <mesh position={[side * 0.01 * hScale, 0.02 * hScale, 0.04 * hScale]} material={muscleMat}>
              <sphereGeometry args={[0.04 * hScale * muscleFactor, 12, 12]} />
            </mesh>
            {/* Fat on arm */}
            <mesh rotation={[0, 0, side * 0.08]} scale={[1 + fatFactor * 0.08, 1, 1 + fatFactor * 0.1]} material={fatMat}>
              <capsuleGeometry args={[0.05 * hScale, 0.155 * hScale, 10, 14]} />
            </mesh>
          </group>

          {/* Forearm */}
          <group position={[side * 0.27 * hScale, 0.88 * hScale, 0]}>
            <mesh rotation={[0, 0, side * 0.15]} material={muscleMat}>
              <capsuleGeometry args={[0.035 * hScale * muscleFactor, 0.14 * hScale, 10, 14]} />
            </mesh>
            <mesh position={[0, -0.06 * hScale, 0.02 * hScale]} material={muscleMat}>
              <sphereGeometry args={[0.03 * hScale * muscleFactor, 10, 10]} />
            </mesh>
          </group>

          {/* Hand */}
          <mesh position={[side * 0.28 * hScale, 0.78 * hScale, 0]} material={skinMat}>
            <boxGeometry args={[0.03 * hScale, 0.04 * hScale, 0.025 * hScale]} />
          </mesh>
        </group>
      ))}

      {/* === HIPS / GLUTES === */}
      <group position={[0, 0.78 * hScale, -0.03 * hScale]}>
        <mesh material={muscleMat}>
          <sphereGeometry args={[0.12 * hScale * (1 + muscleFactor * 0.3) * (1 + endo * 0.3), 16, 16]} />
        </mesh>
        <mesh scale={[1 + fatFactor * 0.2, 1 + fatFactor * 0.15, 1 + fatFactor * 0.25]} material={fatMat}>
          <sphereGeometry args={[0.13 * hScale, 14, 14]} />
        </mesh>
      </group>

      {/* === THIGHS / QUADRICEPS === */}
      {[-1, 1].map((side) => (
        <group key={`thigh-${side}`}>
          {/* Femur bone */}
          <mesh position={[side * 0.1 * hScale, 0.5 * hScale, 0]} material={boneMat}>
            <capsuleGeometry args={[0.025 * hScale * boneFactor, 0.26 * hScale, 8, 14]} />
          </mesh>

          {/* Quadriceps - tear drop shape */}
          <group position={[side * 0.11 * hScale, 0.5 * hScale, 0.04 * hScale]}>
            <mesh material={muscleMat}>
              <capsuleGeometry args={[0.065 * hScale * muscleFactor, 0.24 * hScale, 12, 16]} />
            </mesh>
            {/* Outer quad sweep */}
            <mesh position={[side * 0.02 * hScale, 0.06 * hScale, 0]} material={muscleMat}>
              <sphereGeometry args={[0.055 * hScale * muscleFactor, 12, 12]} />
            </mesh>
            {/* Inner quad */}
            <mesh position={[-side * 0.01 * hScale, -0.02 * hScale, 0.01 * hScale]} material={muscleMat}>
              <sphereGeometry args={[0.05 * hScale * muscleFactor, 12, 12]} />
            </mesh>
          </group>

          {/* Hamstrings (back of thigh) */}
          <mesh position={[side * 0.1 * hScale, 0.5 * hScale, -0.04 * hScale]} material={muscleMat}>
            <capsuleGeometry args={[0.05 * hScale * muscleFactor, 0.22 * hScale, 10, 14]} />
          </mesh>

          {/* Fat on thigh */}
          <mesh position={[side * 0.11 * hScale, 0.5 * hScale, 0.02 * hScale]} scale={[1 + fatFactor * 0.15, 1, 1 + fatFactor * 0.2]} material={fatMat}>
            <capsuleGeometry args={[0.068 * hScale, 0.23 * hScale, 10, 14]} />
          </mesh>
        </group>
      ))}

      {/* === KNEES === */}
      {[-1, 1].map((side) => (
        <mesh key={`knee-${side}`} position={[side * 0.1 * hScale, 0.34 * hScale, 0]} material={jointMat}>
          <sphereGeometry args={[0.04 * hScale * boneFactor, 12, 12]} />
        </mesh>
      ))}

      {/* === CALVES / GASTROCNEMIUS === */}
      {[-1, 1].map((side) => (
        <group key={`calf-${side}`}>
          <group position={[side * 0.09 * hScale, 0.2 * hScale, 0.015 * hScale]}>
            <mesh material={muscleMat}>
              <capsuleGeometry args={[0.042 * hScale * muscleFactor, 0.18 * hScale, 10, 14]} />
            </mesh>
            {/* Calf peak (diamond shape) */}
            <mesh position={[0, 0.04 * hScale, 0.02 * hScale]} material={muscleMat}>
              <sphereGeometry args={[0.04 * hScale * muscleFactor, 10, 10]} />
            </mesh>
            <mesh scale={[1 + fatFactor * 0.1, 1, 1 + fatFactor * 0.12]} material={fatMat}>
              <capsuleGeometry args={[0.045 * hScale, 0.175 * hScale, 10, 12]} />
            </mesh>
          </group>

          {/* Tibia bone */}
          <mesh position={[side * 0.08 * hScale, 0.2 * hScale, -0.01 * hScale]} material={boneMat}>
            <capsuleGeometry args={[0.018 * hScale * boneFactor, 0.19 * hScale, 8, 12]} />
          </mesh>

          {/* Ankle */}
          <mesh position={[side * 0.08 * hScale, 0.08 * hScale, 0]} material={jointMat}>
            <sphereGeometry args={[0.025 * hScale * boneFactor, 10, 10]} />
          </mesh>

          {/* Foot */}
          <mesh position={[side * 0.08 * hScale, 0.03 * hScale, 0.03 * hScale]} material={skinMat}>
            <boxGeometry args={[0.04 * hScale, 0.02 * hScale, 0.09 * hScale]} />
          </mesh>
        </group>
      ))}

      {/* Labels floating */}
      {cincoComponentes && (
        <>
          <Text position={[0.7, 1.5 * hScale, 0]} fontSize={0.055} color="#f59e0b" anchorX="left" font="/Inter-Bold.woff">
            {`Grasa: ${cincoComponentes.porcentajeAdiposo.toFixed(1)}%`}
          </Text>
          <Text position={[0.7, 1.42 * hScale, 0]} fontSize={0.055} color="#3b82f6" anchorX="left">
            {`Músculo: ${cincoComponentes.porcentajeMuscular.toFixed(1)}%`}
          </Text>
          <Text position={[0.7, 1.34 * hScale, 0]} fontSize={0.055} color="#8b5cf6" anchorX="left">
            {`Hueso: ${cincoComponentes.porcentajeOseo.toFixed(1)}%`}
          </Text>
          <Text position={[0.7, 1.26 * hScale, 0]} fontSize={0.055} color="#64748b" anchorX="left">
            {`IMO: ${(cincoComponentes.masaMuscular / cincoComponentes.masaOsea).toFixed(2)}`}
          </Text>
          {somatotipo && (
            <Text position={[0.7, 1.18 * hScale, 0]} fontSize={0.05} color="#10b981" anchorX="left">
              {`Somatotipo: E${somatotipo.endomorfia}-M${somatotipo.mesomorfia}-Ec${somatotipo.ectomorfia}`}
            </Text>
          )}
        </>
      )}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export function Avatar3D(props: Avatar3DProps) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border bg-gradient-to-b from-slate-100 to-slate-200">
      <Canvas camera={{ position: [0, 0.3, 2.6], fov: 42 }} shadows>
        <ambientLight intensity={0.5} />
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
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
