"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import type { Points, PointsMaterial } from "three";
import type { IntroPhase } from "@/lib/intro-timeline";

interface NocturneParticlesProps {
  count: number;
  phase: IntroPhase;
}

export function NocturneParticles({ count, phase }: NocturneParticlesProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const positions = useMemo(() => createParticlePositions(count), [count]);
  const settling = phase === "settle";
  const exiting = phase === "collapse" || phase === "text-exit" || phase === "veil" || phase === "reveal" || phase === "complete";

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const motionScale = exiting ? 0 : settling ? 0.25 : 1;
    pointsRef.current.rotation.y += delta * 0.025 * motionScale;
    pointsRef.current.rotation.z -= delta * 0.008 * motionScale;
    if (materialRef.current) {
      const targetOpacity = exiting ? 0 : settling ? 0.16 : 0.58;
      materialRef.current.opacity = MathUtils.damp(materialRef.current.opacity, targetOpacity, 6, delta);
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#bca7ff"
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.58}
        depthWrite={false}
      />
    </points>
  );
}

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);
  let seed = 2_907;

  const random = () => {
    seed = (seed * 16_807) % 2_147_483_647;
    return (seed - 1) / 2_147_483_646;
  };

  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 1.7 + random() * 2.8;
    const verticalSpread = (random() - 0.5) * 2.4;
    const offset = index * 3;

    positions[offset] = Math.cos(angle) * radius;
    positions[offset + 1] = verticalSpread;
    positions[offset + 2] = Math.sin(angle) * radius * 0.62;
  }

  return positions;
}
