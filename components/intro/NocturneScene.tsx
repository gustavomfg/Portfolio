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
}

export default function NocturneScene({ phase, active }: NocturneSceneProps) {
  const [mobile] = useState(() => window.matchMedia("(max-width: 700px)").matches);

  return (
    <div className="intro-canvas" aria-hidden="true">
      <Canvas
        dpr={mobile ? 1 : [1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6.45], fov: mobile ? 46 : 40, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: !mobile,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.14} color="#514763" />
        <directionalLight position={[-3.2, 2.4, 4]} color="#b6a0ef" intensity={2.2} />
        <pointLight position={[2.3, -1.2, 2.6]} color="#65469d" intensity={4.2} distance={7} />
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
