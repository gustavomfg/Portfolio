"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useState } from "react";
import { MathUtils } from "three";
import { NocturneCore } from "@/components/intro/NocturneCore";
import { NocturneParticles } from "@/components/intro/NocturneParticles";
import type { IntroPhase } from "@/lib/intro-timeline";

interface NocturneSceneProps {
  phase: IntroPhase;
  active: boolean;
  onReady: () => void;
}

export default function NocturneScene({ phase, active, onReady }: NocturneSceneProps) {
  const [mobile] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  const [antialias] = useState(() => !mobile && window.devicePixelRatio <= 1.25);

  return (
    <div className="intro-canvas" aria-hidden="true">
      <Canvas
        dpr={mobile ? 1 : [1, 1.25]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6.45], fov: mobile ? 46 : 40, near: 0.1, far: 40 }}
        onCreated={onReady}
        gl={{
          alpha: true,
          antialias,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.1} color="#3d3545" />
        <directionalLight position={[-4, 1.8, -1.6]} color="#9271df" intensity={3.8} />
        <directionalLight position={[2.8, 1.4, 4]} color="#aea0bd" intensity={1.28} />
        <NocturneCore phase={phase} segments={mobile ? 24 : 36} />
        <NocturneParticles count={mobile ? 36 : 70} phase={phase} />
        <CameraApproach />
      </Canvas>
    </div>
  );
}

function CameraApproach() {
  useFrame(({ camera }, delta) => {
    camera.position.z = MathUtils.damp(camera.position.z, 6.05, 0.34, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
