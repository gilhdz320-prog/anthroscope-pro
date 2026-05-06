import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

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

// ========== FALLBACK SVG (always works) ==========
function AvatarFallbackVisual({
  siriPorcentajeGrasa,
  cincoComponentes,
  somatotipo,
  labels,
}: Avatar3DProps) {
  const l = labels || { grasa: 'Grasa', musculo: 'Musculo', hueso: 'Hueso', imo: 'IMO', somatotipo: 'Somatotipo' };
  
  const fat = siriPorcentajeGrasa;
  const muscle = cincoComponentes?.porcentajeMuscular ?? 40;
  const bone = cincoComponentes?.porcentajeOseo ?? 8;
  
  const fatWidth = Math.min(100, Math.max(15, fat * 2.5));
  const muscleWidth = Math.min(100, Math.max(20, muscle * 1.8));
  const boneWidth = Math.min(100, Math.max(10, bone * 6));

  return (
    <div className="h-[400px] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-6">
      <div className="relative w-48 h-72 mx-auto">
        <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-lg">
          <ellipse cx="100" cy="80" rx={45 + fatWidth * 0.15} ry={30 + fatWidth * 0.1} fill="#fbbf24" opacity="0.25" />
          <ellipse cx="100" cy="150" rx={40 + fatWidth * 0.2} ry={50 + fatWidth * 0.15} fill="#fbbf24" opacity="0.2" />
          <ellipse cx="70" cy="200" rx={18 + fatWidth * 0.08} ry={35 + fatWidth * 0.1} fill="#fbbf24" opacity="0.2" />
          <ellipse cx="130" cy="200" rx={18 + fatWidth * 0.08} ry={35 + fatWidth * 0.1} fill="#fbbf24" opacity="0.2" />
          
          <ellipse cx="100" cy="75" rx={35 + muscleWidth * 0.12} ry={25 + muscleWidth * 0.08} fill="#60a5fa" opacity="0.6" />
          <rect x="60" y="100" width="80" height="80" rx="25" fill="#60a5fa" opacity="0.5" />
          <ellipse cx="68" cy="200" rx={14 + muscleWidth * 0.06} ry={30 + muscleWidth * 0.08} fill="#60a5fa" opacity="0.5" />
          <ellipse cx="132" cy="200" rx={14 + muscleWidth * 0.06} ry={30 + muscleWidth * 0.08} fill="#60a5fa" opacity="0.5" />
          
          <line x1="100" y1="40" x2="100" y2="120" stroke="#c4b5fd" strokeWidth={3 + boneWidth * 0.05} opacity="0.7" strokeLinecap="round" />
          <line x1="70" y1="80" x2="130" y2="80" stroke="#c4b5fd" strokeWidth={2 + boneWidth * 0.03} opacity="0.6" strokeLinecap="round" />
          <line x1="100" y1="120" x2="100" y2="240" stroke="#c4b5fd" strokeWidth={4 + boneWidth * 0.06} opacity="0.7" strokeLinecap="round" />
          <line x1="100" y1="140" x2="68" y2="200" stroke="#c4b5fd" strokeWidth={2 + boneWidth * 0.04} opacity="0.6" strokeLinecap="round" />
          <line x1="100" y1="140" x2="132" y2="200" stroke="#c4b5fd" strokeWidth={2 + boneWidth * 0.04} opacity="0.6" strokeLinecap="round" />
          
          <circle cx="100" cy="35" r="22" fill="#fde68a" opacity="0.3" />
          <circle cx="100" cy="35" r="18" fill="#fbbf24" opacity="0.15" />
          
          <text x="100" y="72" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold" opacity="0.8">{muscle.toFixed(0)}%</text>
          <text x="100" y="140" textAnchor="middle" fill="#92400e" fontSize="9" opacity="0.7">{fat.toFixed(1)}% grasa</text>
        </svg>
        
        <div className="absolute -right-24 top-4 space-y-2 text-xs">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-400" /><span className="text-slate-600">{l.grasa}: {fat.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-400" /><span className="text-slate-600">{l.musculo}: {muscle.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-400" /><span className="text-slate-600">{l.hueso}: {bone.toFixed(1)}%</span></div>
          {cincoComponentes && (
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-400" /><span className="text-slate-600">{l.imo}: {(cincoComponentes.masaMuscular / cincoComponentes.masaOsea).toFixed(2)}</span></div>
          )}
          {somatotipo && (
            <div className="flex items-center gap-1 mt-1"><div className="w-3 h-3 rounded-full bg-emerald-400" /><span className="text-slate-600 text-[10px]">{l.somatotipo}: E{somatotipo.endomorfia}-M{somatotipo.mesomorfia}-Ec{somatotipo.ectomorfia}</span></div>
          )}
        </div>
      </div>
      
      <p className="text-xs text-slate-400 mt-4">Visualizacion de composicion corporal</p>
      {fat < 8 && <p className="text-xs text-blue-500 mt-1 font-medium">Atleta de alto rendimiento - baja adiposidad</p>}
      {fat > 25 && <p className="text-xs text-amber-500 mt-1 font-medium">Adiposidad elevada - optimizable</p>}
    </div>
  );
}

// ========== THREE.JS REAL ==========
function AnatomicalFigure({ data }: { data: Avatar3DProps }) {
  const groupRef = useRef<THREE.Group>(null);
  const { estatura = 170, siriPorcentajeGrasa = 15, cincoComponentes, somatotipo, labels } = data;
  const l = labels || { grasa: 'Grasa', musculo: 'Musculo', hueso: 'Hueso', imo: 'IMO', somatotipo: 'Somatotipo' };
  const hScale = estatura / 170;
  
  const rawFat = siriPorcentajeGrasa;
  const fatFactor = rawFat <= 6 ? 0.1 : rawFat <= 12 ? 0.3 : rawFat <= 18 ? 0.55 : rawFat <= 25 ? 0.85 : rawFat <= 35 ? 1.15 : 1.5;
  const rawMuscle = cincoComponentes?.porcentajeMuscular ?? 40;
  const muscleFactor = rawMuscle <= 30 ? 0.6 : rawMuscle <= 38 ? 0.85 : rawMuscle <= 45 ? 1.05 : rawMuscle <= 52 ? 1.25 : 1.45;
  
  const meso = somatotipo ? Math.min(somatotipo.mesomorfia / 7, 1.2) : 0.55;
  const endo = somatotipo ? Math.min(somatotipo.endomorfia / 7, 1.2) : 0.35;
  
  const shoulderWidth = 0.38 * hScale * (0.9 + meso * 0.5 + endo * 0.25);
  const torsoWidth = 0.28 * hScale * (0.85 + endo * 0.4);
  const waistWidth = 0.16 * hScale * (0.8 + endo * 0.35);

  const muscleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4a6fa5', roughness: 0.4, metalness: 0.15 }), []);
  const boneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e8e0d5', roughness: 0.3, transparent: true, opacity: 0.7 }), []);
  const fatMat = useMemo(() => new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(0.12, 0.5, 0.7 + fatFactor * 0.1), roughness: 0.7, transparent: true, opacity: 0.35 + fatFactor * 0.25 }), [fatFactor]);
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c4956a', roughness: 0.5, transparent: true, opacity: 0.25 }), []);
  const jointMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5a6e7c', roughness: 0.5, metalness: 0.2 }), []);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  const Muscle = ({ args, position, rotation = [0,0,0] as [number,number,number], scale = [1,1,1] as [number,number,number], mat = muscleMat }: any) => (
    <mesh position={position} rotation={rotation} scale={scale} material={mat} castShadow><capsuleGeometry args={args} /></mesh>
  );

  const headSize = 0.09 * hScale;

  return (
    <group ref={groupRef} position={[0, -0.95, 0]}>
      {/* HEAD */}
      <group position={[0, 1.58 * hScale, 0]}>
        <mesh material={boneMat}><sphereGeometry args={[headSize, 20, 20]} /></mesh>
        <mesh position={[0, -0.05 * hScale, 0.02 * hScale]} material={jointMat}><boxGeometry args={[0.1 * hScale, 0.07 * hScale, 0.09 * hScale]} /></mesh>
        <mesh scale={[1 + fatFactor * 0.12, 1 + fatFactor * 0.08, 1 + fatFactor * 0.1]} material={fatMat}><sphereGeometry args={[headSize * 1.05, 16, 16]} /></mesh>
      </group>

      {/* NECK */}
      <group position={[0, 1.48 * hScale, 0]}>
        <Muscle args={[0.045 * hScale * (0.9 + meso * 0.3), 0.08 * hScale, 12, 16]} scale={[1, 1, 1.2]} />
      </group>

      {/* TORSO */}
      <group position={[0, 1.22 * hScale, 0]}>
        <mesh material={boneMat}><boxGeometry args={[torsoWidth * 0.9, 0.22 * hScale, 0.18 * hScale]} /></mesh>
        
        <group>
          <Muscle args={[0.055 * hScale * muscleFactor, 0.02 * hScale, 10, 14]} position={[-0.07 * hScale, 0.04 * hScale, 0.1 * hScale * (0.8 + muscleFactor * 0.25)]} rotation={[0, 0.15, 0.1]} scale={[1.4, 1, 1]} />
          <Muscle args={[0.055 * hScale * muscleFactor, 0.02 * hScale, 10, 14]} position={[0.07 * hScale, 0.04 * hScale, 0.1 * hScale * (0.8 + muscleFactor * 0.25)]} rotation={[0, -0.15, -0.1]} scale={[1.4, 1, 1]} />
        </group>
        
        <Muscle args={[0.08 * hScale * muscleFactor, 0.03 * hScale, 10, 14]} position={[0, 0.02 * hScale, -0.1 * hScale]} scale={[2.2 * (0.7 + meso * 0.5), 1.2, 0.5]} />
        
        <group position={[0, -0.1 * hScale, 0]}>
          <Muscle args={[0.04 * hScale * muscleFactor, 0.06 * hScale, 8, 12]} position={[-0.08 * hScale, 0, 0.05 * hScale]} rotation={[0, 0, 0.3]} />
          <Muscle args={[0.04 * hScale * muscleFactor, 0.06 * hScale, 8, 12]} position={[0.08 * hScale, 0, 0.05 * hScale]} rotation={[0, 0, -0.3]} />
          {fatFactor < 0.6 && (
            <group>
              {[0, 1, 2].map((row) => (
                <group key={row}>
                  <Muscle args={[0.035 * hScale * muscleFactor, 0.015 * hScale, 8, 10]} position={[-0.035 * hScale, -0.02 * hScale - row * 0.04 * hScale, 0.08 * hScale]} scale={[1, 0.8, 0.6]} />
                  <Muscle args={[0.035 * hScale * muscleFactor, 0.015 * hScale, 8, 10]} position={[0.035 * hScale, -0.02 * hScale - row * 0.04 * hScale, 0.08 * hScale]} scale={[1, 0.8, 0.6]} />
                </group>
              ))}
            </group>
          )}
        </group>
        
        <group position={[0, -0.22 * hScale, -0.02 * hScale]}>
          <mesh material={boneMat}><boxGeometry args={[waistWidth * 1.3, 0.1 * hScale, 0.14 * hScale]} /></mesh>
          <Muscle args={[0.08 * hScale * muscleFactor, 0.04 * hScale, 10, 14]} position={[0, -0.03 * hScale, -0.08 * hScale]} scale={[1.6 * (0.8 + endo * 0.3), 1.1, 0.8]} />
        </group>
        
        <mesh material={fatMat} position={[0, -0.05 * hScale, 0]}><boxGeometry args={[torsoWidth * (1 + fatFactor * 0.2), 0.35 * hScale * (1 + fatFactor * 0.12), 0.22 * hScale * (1 + fatFactor * 0.15)]} /></mesh>
        <mesh material={skinMat} position={[0, -0.05 * hScale, 0]} scale={[1.02, 1.02, 1.02]}><boxGeometry args={[torsoWidth * (1 + fatFactor * 0.2), 0.35 * hScale * (1 + fatFactor * 0.12), 0.22 * hScale * (1 + fatFactor * 0.15)]} /></mesh>
      </group>

      {/* SHOULDERS */}
      {[-1, 1].map((side) => (
        <group key={`d-${side}`} position={[side * 0.22 * hScale * (0.8 + meso * 0.4), 1.32 * hScale, 0]}>
          <Muscle args={[0.05 * hScale * muscleFactor, 0.03 * hScale, 10, 14]} rotation={[0, 0, side * 0.3]} scale={[1.1, 1, 1.3]} />
          <Muscle args={[0.045 * hScale * muscleFactor, 0.02 * hScale, 10, 14]} position={[side * 0.03 * hScale, 0, 0]} rotation={[0, 0, side * -0.2]} scale={[0.8, 1, 1.4]} />
        </group>
      ))}

      {/* ARMS */}
      {[-1, 1].map((side) => (
        <group key={`a-${side}`}>
          <group position={[side * 0.28 * hScale * (0.85 + meso * 0.2), 1.08 * hScale, 0]}>
            <Muscle args={[0.04 * hScale * muscleFactor, 0.14 * hScale, 12, 16]} rotation={[0, 0, side * 0.06]} />
            <Muscle args={[0.035 * hScale * muscleFactor, 0.02 * hScale, 10, 12]} position={[0, 0.04 * hScale, 0.02 * hScale]} scale={[1.2, 0.8, 1.1]} />
            <mesh position={[0, 0, -0.01 * hScale]} material={boneMat}><capsuleGeometry args={[0.015 * hScale, 0.15 * hScale, 8, 12]} /></mesh>
          </group>
          <group position={[side * 0.29 * hScale * (0.85 + meso * 0.15), 0.88 * hScale, 0]}>
            <Muscle args={[0.03 * hScale * muscleFactor, 0.12 * hScale, 10, 14]} rotation={[0, 0, side * 0.12]} />
          </group>
          <mesh position={[side * 0.28 * hScale, 0.98 * hScale, 0]} material={jointMat}><sphereGeometry args={[0.03 * hScale, 10, 10]} /></mesh>
          <mesh position={[side * 0.29 * hScale, 0.78 * hScale, 0]} material={skinMat}><boxGeometry args={[0.025 * hScale, 0.035 * hScale, 0.02 * hScale]} /></mesh>
        </group>
      ))}

      {/* THIGHS */}
      {[-1, 1].map((side) => (
        <group key={`t-${side}`}>
          <group position={[side * 0.11 * hScale * (0.9 + endo * 0.15), 0.55 * hScale, 0.02 * hScale]}>
            <mesh position={[0, 0, -0.02 * hScale]} material={boneMat}><capsuleGeometry args={[0.018 * hScale, 0.24 * hScale, 8, 12]} /></mesh>
            <Muscle args={[0.06 * hScale * muscleFactor, 0.22 * hScale, 12, 16]} position={[0, 0.01 * hScale, 0.03 * hScale]} scale={[1.1, 1, 1.2]} />
            <Muscle args={[0.04 * hScale * muscleFactor, 0.02 * hScale, 10, 12]} position={[side * 0.015 * hScale, 0.05 * hScale, 0.01 * hScale]} scale={[1.2, 0.8, 1]} />
            <Muscle args={[0.045 * hScale * muscleFactor, 0.18 * hScale, 10, 14]} position={[0, 0, -0.04 * hScale]} scale={[1, 1, 0.8]} />
            <mesh material={fatMat} scale={[1 + fatFactor * 0.18, 1 + fatFactor * 0.08, 1 + fatFactor * 0.22]}><capsuleGeometry args={[0.065 * hScale, 0.2 * hScale, 12, 16]} /></mesh>
          </group>
        </group>
      ))}

      {/* KNEES */}
      {[-1, 1].map((side) => (
        <mesh key={`k-${side}`} position={[side * 0.1 * hScale, 0.36 * hScale, 0]} material={jointMat}><sphereGeometry args={[0.035 * hScale, 12, 12]} /></mesh>
      ))}

      {/* CALVES */}
      {[-1, 1].map((side) => (
        <group key={`c-${side}`}>
          <group position={[side * 0.09 * hScale, 0.2 * hScale, 0.015 * hScale]}>
            <Muscle args={[0.038 * hScale * muscleFactor, 0.16 * hScale, 10, 14]} scale={[1, 1, 1.1]} />
            <Muscle args={[0.032 * hScale * muscleFactor, 0.02 * hScale, 8, 12]} position={[0, 0.03 * hScale, 0.015 * hScale]} scale={[1.1, 0.8, 1.2]} />
            <mesh position={[0, 0, -0.015 * hScale]} material={boneMat}><capsuleGeometry args={[0.015 * hScale, 0.17 * hScale, 8, 12]} /></mesh>
          </group>
          <mesh position={[side * 0.08 * hScale, 0.09 * hScale, 0]} material={jointMat}><sphereGeometry args={[0.022 * hScale, 10, 10]} /></mesh>
          <mesh position={[side * 0.08 * hScale, 0.04 * hScale, 0.025 * hScale]} material={skinMat}><boxGeometry args={[0.035 * hScale, 0.015 * hScale, 0.08 * hScale]} /></mesh>
        </group>
      ))}

      {/* LABELS */}
      {cincoComponentes && (
        <>
          <Text position={[0.75, 1.5 * hScale, 0]} fontSize={0.052} color="#f59e0b" anchorX="left">{`${l.grasa}: ${cincoComponentes.porcentajeAdiposo.toFixed(1)}%`}</Text>
          <Text position={[0.75, 1.42 * hScale, 0]} fontSize={0.052} color="#3b82f6" anchorX="left">{`${l.musculo}: ${cincoComponentes.porcentajeMuscular.toFixed(1)}%`}</Text>
          <Text position={[0.75, 1.34 * hScale, 0]} fontSize={0.052} color="#8b5cf6" anchorX="left">{`${l.hueso}: ${cincoComponentes.porcentajeOseo.toFixed(1)}%`}</Text>
          <Text position={[0.75, 1.26 * hScale, 0]} fontSize={0.052} color="#64748b" anchorX="left">{`${l.imo}: ${(cincoComponentes.masaMuscular / cincoComponentes.masaOsea).toFixed(2)}`}</Text>
          {somatotipo && (
            <Text position={[0.75, 1.18 * hScale, 0]} fontSize={0.048} color="#10b981" anchorX="left">{`${l.somatotipo}: E${somatotipo.endomorfia}-M${somatotipo.mesomorfia}-Ec${somatotipo.ectomorfia}`}</Text>
          )}
        </>
      )}

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow><planeGeometry args={[3, 3]} /><meshStandardMaterial color="#e2e8f0" transparent opacity={0.2} /></mesh>
    </group>
  );
}

// ========== WRAPPER ==========
export function Avatar3D(props: Avatar3DProps) {
  const [useFallback, setUseFallback] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setUseFallback(true);
      return;
    }
    // Timeout: if 3D doesn't render within 6 seconds, show fallback
    timerRef.current = setTimeout(() => setUseFallback(true), 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // If WebGL not available or timed out, show SVG fallback
  if (useFallback) {
    return <AvatarFallbackVisual {...props} />;
  }

  // Try Three.js with error boundary behavior
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border bg-gradient-to-b from-slate-100 to-slate-200">
      <Canvas camera={{ position: [0, 0.3, 2.6], fov: 42 }} shadows
        onCreated={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
        onError={() => setUseFallback(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#a5b4fc" />
        <pointLight position={[0, 2, 0]} intensity={0.3} color="#fcd34d" />
        <AnatomicalFigure data={props} />
        <OrbitControls enablePan={false} minDistance={1.8} maxDistance={4.5} minPolarAngle={Math.PI * 0.15} maxPolarAngle={Math.PI * 0.75} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
