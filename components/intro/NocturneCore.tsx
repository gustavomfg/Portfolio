"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { ExtrudeGeometry, MathUtils, Shape } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import type { IntroPhase } from "@/lib/intro-timeline";

interface NocturneCoreProps {
  phase: IntroPhase;
  segments: number;
}

export function NocturneCore({ phase, segments }: NocturneCoreProps) {
  const groupRef = useRef<Group>(null);
  const ringRefs = useRef<Array<Mesh | null>>([]);
  const ringMaterialRefs = useRef<Array<MeshStandardMaterial | null>>([]);
  const revealOrbit = phase !== "core";
  const settling = phase === "settle";
  const collapsing = phase === "collapse" || phase === "text-exit" || phase === "veil" || phase === "reveal" || phase === "complete";
  const crescentGeometry = useMemo(() => createCrescentGeometry(segments), [segments]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetScale = collapsing ? 0.34 : phase === "core" ? 0.78 : 0.86;
      const nextScale = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * Math.min(delta * 2.8, 1);
      groupRef.current.scale.setScalar(nextScale);
    }

    const motionScale = collapsing ? 0.05 : settling ? 0.24 : 1;
    if (ringRefs.current[0]) ringRefs.current[0].rotation.z += delta * 0.018 * motionScale;
    if (ringRefs.current[1]) ringRefs.current[1].rotation.z -= delta * 0.009 * motionScale;

    const ringTargets = collapsing
      ? [0, 0]
      : revealOrbit
        ? [0.28, 0.14]
        : [0.05, 0.025];

    ringMaterialRefs.current.forEach((material, index) => {
      if (!material) return;
      material.opacity = MathUtils.damp(material.opacity, ringTargets[index] ?? 0, collapsing ? 7 : 4, delta);
    });

  });

  return (
    <Float speed={collapsing ? 0.03 : settling ? 0.1 : 0.35} rotationIntensity={collapsing ? 0 : 0.035} floatIntensity={collapsing ? 0 : 0.07}>
      <group ref={groupRef} scale={0.7} position={[0, 0.56, 0]}>
        <mesh geometry={crescentGeometry} rotation={[-0.08, -0.18, -0.2]} position={[0, 0, -0.06]}>
          <meshStandardMaterial
            attach="material-0"
            color="#2a2034"
            emissive="#130d1b"
            emissiveIntensity={0.06}
            metalness={0.24}
            roughness={0.72}
          />
          <meshStandardMaterial
            attach="material-1"
            color="#7a5aaa"
            emissive="#2d1948"
            emissiveIntensity={0.1}
            metalness={0.36}
            roughness={0.52}
          />
        </mesh>

        <group position={[0, 0, -0.22]}>
          <OrbitRing
            meshRef={(mesh) => { ringRefs.current[0] = mesh; }}
            materialRef={(material) => { ringMaterialRefs.current[0] = material; }}
            radius={1.08}
            thickness={0.014}
            scaleY={0.62}
            rotationZ={-0.16}
            opacity={0.05}
            segments={segments * 2}
          />
          <OrbitRing
            meshRef={(mesh) => { ringRefs.current[1] = mesh; }}
            materialRef={(material) => { ringMaterialRefs.current[1] = material; }}
            radius={1.42}
            thickness={0.008}
            scaleY={0.68}
            rotationZ={-0.1}
            opacity={0.025}
            segments={segments * 2}
          />
        </group>
      </group>
    </Float>
  );
}

function createCrescentGeometry(segments: number) {
  const shape = new Shape();
  const outerRadius = 0.72;
  const innerRadius = 0.61;
  const innerOffset = 0.2;

  shape.moveTo(0, outerRadius);
  shape.absarc(0, 0, outerRadius, Math.PI / 2, Math.PI * 1.5, false);
  shape.absarc(innerOffset, 0, innerRadius, Math.PI * 1.5, Math.PI / 2, true);
  shape.closePath();

  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: Math.max(segments, 24),
    steps: 1,
  });

  geometry.center();
  return geometry;
}

interface OrbitRingProps {
  meshRef: (mesh: Mesh | null) => void;
  materialRef: (material: MeshStandardMaterial | null) => void;
  radius: number;
  thickness: number;
  scaleY: number;
  rotationZ: number;
  opacity: number;
  segments: number;
}

function OrbitRing({ meshRef, materialRef, radius, thickness, scaleY, rotationZ, opacity, segments }: OrbitRingProps) {
  return (
    <mesh ref={meshRef} rotation={[0, 0, rotationZ]} scale={[1, scaleY, 1]}>
      <torusGeometry args={[radius, thickness, 8, segments]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#a990f4"
        emissive="#4e347f"
        emissiveIntensity={0.18}
        metalness={0.48}
        roughness={0.52}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
