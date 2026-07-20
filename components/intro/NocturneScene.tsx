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
        camera={{ position: [0, 0, 7.2], fov: mobile ? 48 : 42, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: !mobile,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.22} color="#82749f" />
        <pointLight position={[2.8, 2.2, 3.2]} color="#a58aff" intensity={12} distance={8} />
        <pointLight position={[-2.4, -1.8, 2]} color="#44306f" intensity={7} distance={7} />
        <NocturneCore phase={phase} segments={mobile ? 24 : 36} />
        <NocturneParticles count={mobile ? 80 : 160} />
        <CameraApproach />
      </Canvas>
    </div>
  );
}

function CameraApproach() {
  useFrame(({ camera }, delta) => {
    camera.position.z = MathUtils.damp(camera.position.z, 5.05, 0.58, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
