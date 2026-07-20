"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

interface NocturneParticlesProps {
  count: number;
}

export function NocturneParticles({ count }: NocturneParticlesProps) {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => createParticlePositions(count), [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.z -= delta * 0.008;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
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
