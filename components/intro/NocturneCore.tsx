"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import type { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import type { IntroPhase } from "@/lib/intro-timeline";

interface NocturneCoreProps {
  phase: IntroPhase;
  segments: number;
}

export function NocturneCore({ phase, segments }: NocturneCoreProps) {
  const groupRef = useRef<Group>(null);
  const ringsRef = useRef<Group>(null);
  const pulseRef = useRef<Mesh>(null);
  const pulseMaterialRef = useRef<MeshBasicMaterial>(null);
  const ringMaterialRefs = useRef<Array<MeshStandardMaterial | null>>([]);
  const revealOrbit = phase !== "core";
  const settling = phase === "settle";
  const collapsing = phase === "collapse" || phase === "text-exit" || phase === "veil" || phase === "reveal" || phase === "complete";

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetScale = collapsing ? 0.42 : phase === "core" ? 0.82 : 1;
      const nextScale = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * Math.min(delta * 2.8, 1);
      groupRef.current.scale.setScalar(nextScale);
    }

    if (ringsRef.current) {
      const motionScale = collapsing ? 0.08 : settling ? 0.32 : 1;
      ringsRef.current.rotation.y += delta * 0.09 * motionScale;
      ringsRef.current.rotation.z -= delta * 0.035 * motionScale;
    }

    const ringTargets = collapsing
      ? [0, 0, 0]
      : revealOrbit
        ? [0.44, 0.3, 0.2]
        : [0.08, 0.05, 0.03];

    ringMaterialRefs.current.forEach((material, index) => {
      if (!material) return;
      material.opacity = MathUtils.damp(material.opacity, ringTargets[index] ?? 0, collapsing ? 7 : 4, delta);
    });

    if (pulseRef.current && pulseMaterialRef.current) {
      if (phase === "initialized") {
        const progress = (state.clock.elapsedTime * 0.48) % 1;
        pulseRef.current.scale.setScalar(1 + progress * 2.4);
        pulseMaterialRef.current.opacity = (1 - progress) * 0.24;
      } else {
        pulseMaterialRef.current.opacity = 0;
      }
    }
  });

  return (
    <Float speed={collapsing ? 0.04 : settling ? 0.16 : 0.55} rotationIntensity={collapsing ? 0 : 0.08} floatIntensity={collapsing ? 0 : 0.12}>
      <group ref={groupRef} scale={0.7}>
        <mesh>
          <sphereGeometry args={[0.62, segments, segments]} />
          <meshStandardMaterial
            color="#7754d8"
            emissive="#5f35c9"
            emissiveIntensity={1.5}
            metalness={0.5}
            roughness={0.26}
          />
        </mesh>

        <mesh scale={1.08}>
          <sphereGeometry args={[0.62, Math.max(segments / 2, 16), Math.max(segments / 2, 16)]} />
          <meshBasicMaterial color="#cbbcff" transparent opacity={0.09} wireframe />
        </mesh>

        <group ref={ringsRef}>
          <OrbitRing materialRef={(material) => { ringMaterialRefs.current[0] = material; }} rotation={[Math.PI / 2.4, 0.2, 0]} opacity={0.08} segments={segments * 2} />
          <OrbitRing materialRef={(material) => { ringMaterialRefs.current[1] = material; }} rotation={[0.55, 0.1, Math.PI / 2.8]} radius={1.38} opacity={0.05} segments={segments * 2} />
          <OrbitRing materialRef={(material) => { ringMaterialRefs.current[2] = material; }} rotation={[1.2, 0.45, -0.65]} radius={1.7} opacity={0.03} segments={segments * 2} />
        </group>

        <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.86, 0.012, 8, segments * 2]} />
          <meshBasicMaterial
            ref={pulseMaterialRef}
            color="#bba4ff"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

interface OrbitRingProps {
  materialRef: (material: MeshStandardMaterial | null) => void;
  rotation: [number, number, number];
  radius?: number;
  opacity: number;
  segments: number;
}

function OrbitRing({ materialRef, rotation, radius = 1.12, opacity, segments }: OrbitRingProps) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 8, segments]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#a990f4"
        emissive="#4e347f"
        emissiveIntensity={0.35}
        metalness={0.72}
        roughness={0.3}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
