"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, type RapierRigidBody, type RigidBodyProps } from "@react-three/rapier";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";

const BADGE_WIDTH = 2.65;
const BADGE_HEIGHT = 3.5;
const BADGE_DEPTH = 0.32;
const BAND_SAMPLES = 28;
const BAND_EXTENSION_SAMPLES = 12;
const BAND_EXTENSION_LENGTH = 2.1;
const BAND_EXTENSION_BLEND = 0.35;
const BAND_WIDTH = 0.21;
const BAND_THICKNESS = 0.045;
const STRAP_TWIST_Z = 0.42;
const STRAP_TWIST_X = 0.2;
const STRAP_MAX_TWIST = 0.18;
const BAND_POINT_COUNT = BAND_SAMPLES + BAND_EXTENSION_SAMPLES + 1;
const BAND_UP = new THREE.Vector3(0, 1, 0);
const BAND_CORNERS = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
] as const;

interface BandFrameScratch {
  tangent: THREE.Vector3;
  previousTangent: THREE.Vector3;
  viewDirection: THREE.Vector3;
  side: THREE.Vector3;
  thicknessAxis: THREE.Vector3;
  renderedSide: THREE.Vector3;
  renderedThickness: THREE.Vector3;
  vertex: THREE.Vector3;
  cornerNormal: THREE.Vector3;
  twistRotation: THREE.Quaternion;
  fallbackAxis: THREE.Vector3;
  transportAxis: THREE.Vector3;
  rotationAxis: THREE.Vector3;
}

function createBandFrameScratch(): BandFrameScratch {
  return {
    tangent: new THREE.Vector3(),
    previousTangent: new THREE.Vector3(),
    viewDirection: new THREE.Vector3(),
    side: new THREE.Vector3(),
    thicknessAxis: new THREE.Vector3(),
    renderedSide: new THREE.Vector3(),
    renderedThickness: new THREE.Vector3(),
    vertex: new THREE.Vector3(),
    cornerNormal: new THREE.Vector3(),
    twistRotation: new THREE.Quaternion(),
    fallbackAxis: new THREE.Vector3(),
    transportAxis: new THREE.Vector3(),
    rotationAxis: new THREE.Vector3(),
  };
}

function createBandPoints() {
  return Array.from({ length: BAND_POINT_COUNT }, () => new THREE.Vector3());
}

function sampleBandCurve(curve: THREE.CatmullRomCurve3, points: THREE.Vector3[], extensionDirection: THREE.Vector3) {
  for (let pointIndex = 0; pointIndex <= BAND_SAMPLES; pointIndex += 1) {
    curve.getPoint(pointIndex / BAND_SAMPLES, points[pointIndex]);
  }

  const physicalAnchor = points[BAND_SAMPLES];
  extensionDirection.subVectors(physicalAnchor, points[BAND_SAMPLES - 1]);
  if (extensionDirection.lengthSq() < 0.0001 || !isFiniteVector(extensionDirection)) {
    extensionDirection.copy(BAND_UP);
  } else {
    extensionDirection.normalize().lerp(BAND_UP, BAND_EXTENSION_BLEND).normalize();
  }

  for (let extensionIndex = 1; extensionIndex <= BAND_EXTENSION_SAMPLES; extensionIndex += 1) {
    points[BAND_SAMPLES + extensionIndex]
      .copy(physicalAnchor)
      .addScaledVector(extensionDirection, (BAND_EXTENSION_LENGTH * extensionIndex) / BAND_EXTENSION_SAMPLES);
  }

  return points;
}

function isFiniteVector(value: THREE.Vector3) {
  return Number.isFinite(value.x) && Number.isFinite(value.y) && Number.isFinite(value.z);
}

function chooseStableSide(
  side: THREE.Vector3,
  viewDirection: THREE.Vector3,
  fallbackAxis: THREE.Vector3,
  tangent: THREE.Vector3,
  point: THREE.Vector3,
  camera: THREE.Camera,
) {
  viewDirection.subVectors(camera.position, point);
  viewDirection.addScaledVector(tangent, -viewDirection.dot(tangent));
  if (viewDirection.lengthSq() < 0.0001 || !isFiniteVector(viewDirection)) {
    viewDirection.copy(camera.up);
    viewDirection.addScaledVector(tangent, -viewDirection.dot(tangent));
  }
  if (viewDirection.lengthSq() < 0.0001 || !isFiniteVector(viewDirection)) {
    fallbackAxis.set(Math.abs(tangent.y) < 0.9 ? 0 : 1, Math.abs(tangent.y) < 0.9 ? 1 : 0, 0);
    viewDirection.copy(fallbackAxis).addScaledVector(tangent, -fallbackAxis.dot(tangent));
  }
  viewDirection.normalize();
  side.crossVectors(tangent, viewDirection);
  if (side.lengthSq() < 0.0001 || !isFiniteVector(side)) {
    fallbackAxis.set(0, 0, 1);
    side.crossVectors(tangent, fallbackAxis);
  }
  side.normalize();
}

function createBandGeometry(sampleCount: number) {
  const geometry = new THREE.BufferGeometry();
  const vertexCount = sampleCount * 4;
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  // The geometry never needs more than 16-bit indices. Keeping this as a
  // Uint16Array also keeps the ribbon compatible with WebGL 1 contexts.
  const indices = new Uint16Array((sampleCount - 1) * 24 + 12);
  let index = 0;

  for (let segment = 0; segment < sampleCount - 1; segment += 1) {
    const current = segment * 4;
    const next = (segment + 1) * 4;
    for (let corner = 0; corner < 4; corner += 1) {
      const nextCorner = (corner + 1) % 4;
      indices[index++] = current + corner;
      indices[index++] = current + nextCorner;
      indices[index++] = next + nextCorner;
      indices[index++] = current + corner;
      indices[index++] = next + nextCorner;
      indices[index++] = next + corner;
    }
  }

  indices[index++] = 0;
  indices[index++] = 2;
  indices[index++] = 1;
  indices[index++] = 0;
  indices[index++] = 3;
  indices[index++] = 2;
  const last = (sampleCount - 1) * 4;
  indices[index++] = last;
  indices[index++] = last + 1;
  indices[index++] = last + 2;
  indices[index++] = last;
  indices[index++] = last + 2;
  indices[index] = last + 3;

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  return geometry;
}

function updateBandGeometry(
  geometry: THREE.BufferGeometry,
  points: THREE.Vector3[],
  camera: THREE.Camera,
  twist: number,
  frame: BandFrameScratch,
) {
  if (points.length < 2) return;
  for (const point of points) {
    if (!isFiniteVector(point)) return;
  }

  const position = geometry.getAttribute("position") as THREE.BufferAttribute;
  const normal = geometry.getAttribute("normal") as THREE.BufferAttribute;
  const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
  const {
    tangent,
    previousTangent,
    viewDirection,
    side,
    thicknessAxis,
    renderedSide,
    renderedThickness,
    vertex,
    cornerNormal,
    twistRotation,
    fallbackAxis,
    transportAxis,
    rotationAxis,
  } = frame;
  points.forEach((point, pointIndex) => {
    const previous = points[Math.max(0, pointIndex - 1)];
    const next = points[Math.min(points.length - 1, pointIndex + 1)];
    tangent.subVectors(next, previous);
    if (tangent.lengthSq() < 0.000001 || !isFiniteVector(tangent)) {
      tangent.set(0, 1, 0);
    } else {
      tangent.normalize();
    }
    if (pointIndex === 0) {
      chooseStableSide(side, viewDirection, fallbackAxis, tangent, point, camera);
    } else {
      transportAxis.crossVectors(previousTangent, tangent);
      if (transportAxis.lengthSq() > 0.000001 && isFiniteVector(transportAxis)) {
        rotationAxis.copy(transportAxis).normalize();
        twistRotation.setFromAxisAngle(
          rotationAxis,
          Math.acos(THREE.MathUtils.clamp(previousTangent.dot(tangent), -1, 1)),
        );
        side.applyQuaternion(twistRotation);
      }
      side.addScaledVector(tangent, -side.dot(tangent));
      if (side.lengthSq() < 0.0001 || !isFiniteVector(side)) {
        chooseStableSide(side, viewDirection, fallbackAxis, tangent, point, camera);
      } else {
        side.normalize();
      }
    }
    previousTangent.copy(tangent);

    thicknessAxis.crossVectors(side, tangent);
    if (thicknessAxis.lengthSq() < 0.0001 || !isFiniteVector(thicknessAxis)) {
      fallbackAxis.set(0, 0, 1);
      thicknessAxis.crossVectors(side, fallbackAxis);
      if (thicknessAxis.lengthSq() < 0.0001) thicknessAxis.set(0, 1, 0);
    }
    thicknessAxis.normalize();
    twistRotation.setFromAxisAngle(tangent, twist * (pointIndex / (points.length - 1)));
    renderedSide.copy(side).applyQuaternion(twistRotation);
    renderedThickness.copy(thicknessAxis).applyQuaternion(twistRotation);

    BAND_CORNERS.forEach(([sideSign, thicknessSign], cornerIndex) => {
      const vertexIndex = pointIndex * 4 + cornerIndex;
      vertex.copy(point).addScaledVector(renderedSide, sideSign * BAND_WIDTH).addScaledVector(renderedThickness, thicknessSign * BAND_THICKNESS);
      position.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
      cornerNormal.copy(renderedSide).multiplyScalar(sideSign).addScaledVector(renderedThickness, thicknessSign).normalize();
      normal.setXYZ(vertexIndex, cornerNormal.x, cornerNormal.y, cornerNormal.z);
      uv.setXY(vertexIndex, pointIndex / (points.length - 1), cornerIndex === 0 || cornerIndex === 3 ? 0 : 1);
    });
  });

  position.needsUpdate = true;
  normal.needsUpdate = true;
  uv.needsUpdate = true;
}

interface HeroLanyardProps {
  active?: boolean;
  onReady?: () => void;
  onContextLost?: () => void;
}

export function HeroLanyard({ active = true, onReady, onContextLost }: HeroLanyardProps) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches
  ));
  const [sceneMode, setSceneMode] = useState<"rapier" | "simple">("rapier");
  const contextCleanup = useRef<(() => void) | null>(null);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(new THREE.Color(0x000000), 0);
    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setSceneMode("simple");
      onContextLost?.();
    };
    const handleContextRestored = () => onReady?.();
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    contextCleanup.current?.();
    contextCleanup.current = () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
    onReady?.();
  }, [onContextLost, onReady]);

  useEffect(() => () => contextCleanup.current?.(), []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className="hero-lanyard"
      role="img"
      aria-label="Identidade visual de Gustavo Maquias, desenvolvedor Full Stack em início de carreira"
    >
      <span className="sr-only">
        Gustavo Maquias, desenvolvedor Full Stack em início de carreira. Identidade visual em formato de crachá técnico.
      </span>
      <div className="hero-lanyard-canvas" aria-hidden="true">
        <Canvas
          key={sceneMode}
          camera={{ position: [0.12, 2, 11.5], fov: 31 }}
          dpr={[1, isMobile ? 1 : 1.5]}
          frameloop={active ? "always" : "never"}
          gl={{ alpha: true, antialias: !isMobile }}
          onCreated={handleCreated}
        >
          <ambientLight intensity={0.48} />
          <hemisphereLight args={["#a89be4", "#05060b", 0.52]} />
          <directionalLight position={[-4, 5, 6]} intensity={3.8} color="#f7f4ff" />
          <directionalLight position={[4, 1, -2]} intensity={1.4} color="#7860d2" />
          <pointLight position={[0, -1, 4]} intensity={0.85} distance={8} color="#ffffff" />
          <Environment resolution={64} frames={1}>
            <Lightformer form="rect" intensity={1.3} color="#7659c4" position={[-3, 2, -2]} scale={[2, 4, 1]} />
            <Lightformer form="rect" intensity={3.1} color="#ffffff" position={[3, 1, 2]} scale={[1.5, 3, 1]} />
            <Lightformer form="ring" intensity={1.1} color="#5d8aff" position={[0, 0, -3]} scale={2.5} />
          </Environment>
          {reduceMotion ? (
            <StaticBadge />
          ) : sceneMode === "simple" ? (
            <SimpleLanyard />
          ) : (
            <Physics gravity={[0, -18, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <PhysicsLanyard />
            </Physics>
          )}
        </Canvas>
      </div>
    </div>
  );
}

function BadgeFace({ back = false }: { back?: boolean }) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context) return;

    const edge = 28;
    const width = canvas.width - edge * 2;
    const height = canvas.height - edge * 2;
    const corner = 42;

    context.save();
    context.beginPath();
    context.roundRect(edge, edge, width, height, corner);
    context.clip();

    const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, back ? "#171827" : "#161522");
    background.addColorStop(0.52, "#0e0f17");
    background.addColorStop(1, back ? "#090b12" : "#0a0b11");
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(198,179,255,.035)";
    for (let y = 180; y < canvas.height; y += 44) context.fillRect(0, y, canvas.width, 1);

    if (back) {
      context.strokeStyle = "rgba(145,103,255,.38)";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(720, 440, 220, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = "rgba(93,138,255,.32)";
      context.beginPath();
      context.arc(720, 440, 174, Math.PI * 0.15, Math.PI * 1.35);
      context.stroke();
      context.fillStyle = "#c6b3ff";
      context.font = "500 30px JetBrains Mono, monospace";
      context.fillText("SOFTWARE ENGINEERING", 78, 112);
      context.fillStyle = "#9167ff";
      context.fillRect(78, 156, 180, 5);
      context.fillStyle = "#f4f2f8";
      context.font = "600 82px JetBrains Mono, monospace";
      context.fillText("GUSTAVO", 78, 492);
      context.fillText("MAQUIAS", 78, 596);
      context.fillStyle = "#aaa6b5";
      context.font = "500 30px JetBrains Mono, monospace";
      context.fillText("LOCAL / HUMAN IN CONTROL", 78, 720);
      context.strokeStyle = "rgba(255,255,255,.14)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(78, 792);
      context.lineTo(946, 792);
      context.stroke();
      context.fillStyle = "#9d99a6";
      context.font = "400 25px JetBrains Mono, monospace";
      context.fillText("BUILD · DOCUMENT · EVOLVE", 78, 1210);
      context.fillText("CARBON NIGHT / 01", 78, 1260);
    } else {
      context.fillStyle = "#c6b3ff";
      context.font = "500 30px JetBrains Mono, monospace";
      context.fillText("CADERNO TÉCNICO / 01", 78, 112);
      context.fillStyle = "#9167ff";
      context.fillRect(78, 156, 140, 5);
      context.fillStyle = "rgba(93,138,255,.75)";
      context.fillRect(846, 86, 100, 2);
      context.fillStyle = "#f4f2f8";
      context.font = "600 88px JetBrains Mono, monospace";
      context.fillText("GUSTAVO", 78, 470);
      context.fillText("MAQUIAS", 78, 575);
      context.fillStyle = "#b3afbb";
      context.font = "500 34px JetBrains Mono, monospace";
      context.fillText("FULL STACK DEVELOPER", 78, 690);
      context.strokeStyle = "rgba(255,255,255,.14)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(78, 760);
      context.lineTo(946, 760);
      context.stroke();
      context.fillStyle = "#9d99a6";
      context.font = "400 25px JetBrains Mono, monospace";
      context.fillText("SOFTWARE ENGINEERING / PORTFOLIO", 78, 840);
      context.fillText("BUILD · DOCUMENT · EVOLVE", 78, 1210);
      context.strokeStyle = "rgba(145,103,255,.45)";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(846, 1088, 66, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = "#9167ff";
      context.beginPath();
      context.arc(824, 1088, 26, 0, Math.PI * 2);
      context.fill();
    }

    context.restore();
    context.strokeStyle = "rgba(198,179,255,.5)";
    context.lineWidth = 4;
    context.beginPath();
    context.roundRect(edge, edge, width, height, corner);
    context.stroke();

    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    // The badge canvas is intentionally not power-of-two in height. Disable
    // mipmaps so WebGL 1 does not reject the texture during upload.
    nextTexture.generateMipmaps = false;
    nextTexture.minFilter = THREE.LinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.wrapS = THREE.ClampToEdgeWrapping;
    nextTexture.wrapT = THREE.ClampToEdgeWrapping;
    // The texture is an external Canvas resource created after the client mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTexture(nextTexture);
    return () => nextTexture.dispose();
  }, [back]);

  if (!texture) return null;

  return (
    <mesh position={[0, 0, back ? -(BADGE_DEPTH / 2 + 0.004) : BADGE_DEPTH / 2 + 0.004]} rotation={back ? [0, Math.PI, 0] : [0, 0, 0]}>
      <planeGeometry args={[BADGE_WIDTH - 0.18, BADGE_HEIGHT - 0.18]} />
      <meshPhysicalMaterial map={texture} roughness={0.56} metalness={0.14} clearcoat={0.38} clearcoatRoughness={0.24} toneMapped={false} />
    </mesh>
  );
}

function AttachmentHardware() {
  const top = BADGE_HEIGHT / 2;

  return (
    <group>
      <RoundedBox args={[0.52, 0.16, 0.38]} radius={0.045} smoothness={6} position={[0, top + 0.04, 0]}>
        <meshPhysicalMaterial
          color="#171923"
          roughness={0.34}
          metalness={0.72}
          clearcoat={0.46}
          clearcoatRoughness={0.22}
          reflectivity={0.72}
        />
      </RoundedBox>
      <mesh position={[0, top + 0.04, BADGE_DEPTH / 2 + 0.014]}>
        <boxGeometry args={[0.26, 0.055, 0.02]} />
        <meshPhysicalMaterial color="#07080d" roughness={0.68} metalness={0.22} />
      </mesh>
      <mesh position={[0, top + 0.19, 0.025]}>
        <torusGeometry args={[0.115, 0.027, 16, 32]} />
        <meshPhysicalMaterial
          color="#77728b"
          roughness={0.24}
          metalness={0.88}
          clearcoat={0.62}
          clearcoatRoughness={0.16}
          reflectivity={0.88}
        />
      </mesh>
      <mesh position={[0, top + 0.19, 0.025]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.034, 0.034, 0.28, 16]} />
        <meshPhysicalMaterial color="#282735" roughness={0.3} metalness={0.82} clearcoat={0.42} />
      </mesh>
      <mesh position={[-0.16, top + 0.04, BADGE_DEPTH / 2 + 0.022]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
        <meshPhysicalMaterial color="#8f83b8" roughness={0.28} metalness={0.84} clearcoat={0.48} />
      </mesh>
      <mesh position={[0.16, top + 0.04, BADGE_DEPTH / 2 + 0.022]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
        <meshPhysicalMaterial color="#8f83b8" roughness={0.28} metalness={0.84} clearcoat={0.48} />
      </mesh>
    </group>
  );
}

function BadgeCard() {
  return (
    <group>
      <RoundedBox args={[BADGE_WIDTH, BADGE_HEIGHT, BADGE_DEPTH]} radius={0.15} smoothness={8}>
        <meshPhysicalMaterial color="#0b0c13" roughness={0.5} metalness={0.46} clearcoat={0.66} clearcoatRoughness={0.18} reflectivity={0.78} />
      </RoundedBox>
      <BadgeFace />
      <BadgeFace back />
      <AttachmentHardware />
    </group>
  );
}

function StaticBadge() {
  return (
    <group position={[0, 1.34, 0]}>
      <mesh position={[0, 2.18, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 2.2, 10]} />
        <meshPhysicalMaterial color="#171322" roughness={0.78} metalness={0.16} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.1, 18, 12]} />
        <meshPhysicalMaterial color="#c6b3ff" roughness={0.24} metalness={0.82} clearcoat={0.5} />
      </mesh>
      <BadgeCard />
    </group>
  );
}

interface SimpleRopeNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

function enforceDistance(
  first: THREE.Vector3,
  second: THREE.Vector3,
  target: number,
  fixedFirst: boolean,
  delta: THREE.Vector3,
) {
  delta.subVectors(second, first);
  const distance = delta.length();
  if (!Number.isFinite(distance) || distance < 0.0001) return;

  const correction = (distance - target) / distance;
  if (fixedFirst) {
    second.addScaledVector(delta, -correction);
    return;
  }

  delta.multiplyScalar(correction * 0.5);
  first.add(delta);
  second.sub(delta);
}

function SimpleLanyard() {
  const cardGroup = useRef<THREE.Group>(null);
  const draggedRef = useRef(false);
  const dragOffset = useRef(new THREE.Vector3());
  const fixed = useMemo(() => new THREE.Vector3(0, 6, 0), []);
  const nodes = useMemo<SimpleRopeNode[]>(
    () => [
      { position: new THREE.Vector3(0.03, 5.03, 0), velocity: new THREE.Vector3() },
      { position: new THREE.Vector3(-0.05, 4.07, 0), velocity: new THREE.Vector3() },
      { position: new THREE.Vector3(0.04, 3.11, 0), velocity: new THREE.Vector3() },
    ],
    [],
  );
  const cardRotation = useRef(new THREE.Euler()).current;
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
    [],
  );
  const bandGeometry = useMemo(() => createBandGeometry(BAND_POINT_COUNT), []);
  const bandPoints = useMemo(() => createBandPoints(), []);
  const bandFrame = useMemo(() => createBandFrameScratch(), []);
  const scratch = useMemo(() => ({
    cardTop: new THREE.Vector3(),
    cardPosition: new THREE.Vector3(0, 1.34, 0),
    pointer: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    ropeDirection: new THREE.Vector3(),
    constraintDelta: new THREE.Vector3(),
    extensionDirection: new THREE.Vector3(),
  }), []);
  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return () => bandGeometry.dispose();
  }, [bandGeometry]);

  useEffect(() => {
    if (!hovered && !dragged) return;
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [dragged, hovered]);

  useFrame((state, delta) => {
    const frameDelta = Math.min(delta, 1 / 30);
    const { cardTop, cardPosition, pointer, direction, ropeDirection } = scratch;

    if (!draggedRef.current) {
      nodes.forEach((node) => {
        node.velocity.y -= 18 * frameDelta;
        node.velocity.multiplyScalar(Math.pow(0.92, frameDelta * 60));
        node.position.addScaledVector(node.velocity, frameDelta);
      });
    } else {
      pointer.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      direction.copy(pointer).sub(state.camera.position).normalize();
      pointer.add(direction.multiplyScalar(state.camera.position.length()));
      cardPosition.lerp(pointer.sub(dragOffset.current), Math.min(1, frameDelta * 18));
    }

    for (let iteration = 0; iteration < 6; iteration += 1) {
      enforceDistance(fixed, nodes[0].position, 1, true, scratch.constraintDelta);
      enforceDistance(nodes[0].position, nodes[1].position, 1, false, scratch.constraintDelta);
      enforceDistance(nodes[1].position, nodes[2].position, 1, false, scratch.constraintDelta);
    }

    ropeDirection.subVectors(nodes[2].position, nodes[1].position).normalize();
    cardRotation.x += (THREE.MathUtils.clamp(-ropeDirection.z * 0.3, -0.24, 0.24) - cardRotation.x) * Math.min(1, frameDelta * 8);
    cardRotation.z += (THREE.MathUtils.clamp(ropeDirection.x * 0.34, -0.3, 0.3) - cardRotation.z) * Math.min(1, frameDelta * 8);
    cardRotation.y *= Math.max(0, 1 - frameDelta * 4);

    cardTop.set(0, BADGE_HEIGHT / 2, 0).applyEuler(cardRotation);
    if (!draggedRef.current) cardPosition.copy(nodes[2].position).sub(cardTop);
    nodes[2].position.copy(cardPosition).add(cardTop);

    if (cardGroup.current) {
      cardGroup.current.position.copy(cardPosition);
      cardGroup.current.rotation.copy(cardRotation);
    }

    curve.points[0].copy(nodes[2].position);
    curve.points[1].copy(nodes[1].position);
    curve.points[2].copy(nodes[0].position);
    curve.points[3].copy(fixed);
    sampleBandCurve(curve, bandPoints, scratch.extensionDirection);
    const strapTwist = THREE.MathUtils.clamp(
      cardRotation.z * STRAP_TWIST_Z + cardRotation.x * STRAP_TWIST_X,
      -STRAP_MAX_TWIST,
      STRAP_MAX_TWIST,
    );
    updateBandGeometry(bandGeometry, bandPoints, state.camera, strapTwist, bandFrame);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (event.pointerType === "touch") return;
    event.stopPropagation();
    (event.target as unknown as Element).setPointerCapture(event.pointerId);
    dragOffset.current.copy(event.point).sub(scratch.cardPosition);
    draggedRef.current = true;
    setDragged(true);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (event.pointerType === "touch") return;
    event.stopPropagation();
    try {
      (event.target as unknown as Element).releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture can already be released by the browser on cancellation.
    }
    draggedRef.current = false;
    setDragged(false);
  };

  return (
    <>
      <group ref={cardGroup}>
        <group
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerOver={(event) => {
            if (event.pointerType !== "touch") setHovered(true);
          }}
          onPointerOut={(event) => {
            if (event.pointerType !== "touch") setHovered(false);
          }}
        >
          <BadgeCard />
        </group>
      </group>
      <mesh geometry={bandGeometry} frustumCulled={false}>
        <meshBasicMaterial
          color="#6d55ac"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function PhysicsLanyard() {
  const fixed = useRef<RapierRigidBody>(null!);
  const jointOne = useRef<RapierRigidBody>(null!);
  const jointTwo = useRef<RapierRigidBody>(null!);
  const jointThree = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const dragOffset = useRef(new THREE.Vector3());
  const lerpedOne = useRef(new THREE.Vector3());
  const lerpedTwo = useRef(new THREE.Vector3());
  const initialized = useRef(false);
  const angularVelocity = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
    [],
  );
  const bandGeometry = useMemo(() => createBandGeometry(BAND_POINT_COUNT), []);
  const bandPoints = useMemo(() => createBandPoints(), []);
  const bandFrame = useMemo(() => createBandFrameScratch(), []);
  // The texture bundle owns mutable Three.js resources and must stay stable for the scene lifetime.
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const bandTextures = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) return null;

    context.fillStyle = "#0b0d13";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // A restrained woven pattern keeps the ribbon legible without turning it into a glowing line.
    context.fillStyle = "rgba(255,255,255,.055)";
    for (let y = 2; y < canvas.height; y += 8) context.fillRect(0, y, canvas.width, 1);
    context.fillStyle = "rgba(0,0,0,.24)";
    for (let x = 0; x < canvas.width; x += 7) context.fillRect(x, 0, 1, canvas.height);
    context.strokeStyle = "rgba(173,153,235,.14)";
    context.lineWidth = 1;
    for (let x = -128; x < canvas.width + 128; x += 18) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x + 42, canvas.height);
      context.stroke();
    }
    context.fillStyle = "rgba(128,105,193,.32)";
    context.fillRect(5, 0, 2, canvas.height);
    context.fillRect(canvas.width - 7, 0, 2, canvas.height);
    context.fillStyle = "rgba(102,82,157,.12)";
    context.fillRect(canvas.width * 0.5 - 1, 0, 2, canvas.height);

    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = canvas.width;
    bumpCanvas.height = canvas.height;
    const bumpContext = bumpCanvas.getContext("2d");
    if (!bumpContext) return null;
    bumpContext.fillStyle = "#808080";
    bumpContext.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);
    bumpContext.strokeStyle = "#a8a8a8";
    bumpContext.lineWidth = 1;
    for (let y = 2; y < bumpCanvas.height; y += 8) bumpContext.fillRect(0, y, bumpCanvas.width, 1);
    bumpContext.strokeStyle = "#5a5a5a";
    for (let x = 0; x < bumpCanvas.width; x += 7) bumpContext.fillRect(x, 0, 1, bumpCanvas.height);

    const roughnessCanvas = document.createElement("canvas");
    roughnessCanvas.width = canvas.width;
    roughnessCanvas.height = canvas.height;
    const roughnessContext = roughnessCanvas.getContext("2d");
    if (!roughnessContext) return null;
    roughnessContext.fillStyle = "#d8d8d8";
    roughnessContext.fillRect(0, 0, roughnessCanvas.width, roughnessCanvas.height);
    roughnessContext.fillStyle = "#b4b4b4";
    for (let x = 0; x < roughnessCanvas.width; x += 7) roughnessContext.fillRect(x, 0, 1, roughnessCanvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);

    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.repeat.set(4, 1);

    const roughnessTexture = new THREE.CanvasTexture(roughnessCanvas);
    roughnessTexture.wrapS = THREE.RepeatWrapping;
    roughnessTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.repeat.set(4, 1);

    return { texture, bumpTexture, roughnessTexture };
  }, []);
  const vector = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const extensionDirection = useMemo(() => new THREE.Vector3(), []);
  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!hovered && !dragged) return;
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [dragged, hovered]);

  useEffect(() => {
    return () => {
      bandGeometry.dispose();
      bandTextures?.texture.dispose();
      bandTextures?.bumpTexture.dispose();
      bandTextures?.roughnessTexture.dispose();
    };
  }, [bandGeometry, bandTextures]);

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 6,
    linearDamping: 4.5,
  };

  useRopeJoint(fixed, jointOne, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(jointOne, jointTwo, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(jointTwo, jointThree, [[0, 0, 0], [0, 0, 0], 1]);
  // Anchor the rope at the existing ring center instead of the badge top.
  useSphericalJoint(jointThree, card, [[0, 0, 0], [0, BADGE_HEIGHT / 2 + 0.19, 0.025]]);

  useFrame((state, delta) => {
    if (!fixed.current || !card.current || !jointOne.current || !jointTwo.current || !jointThree.current) return;

    if (dragged) {
      vector.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      direction.copy(vector).sub(state.camera.position).normalize();
      vector.add(direction.multiplyScalar(state.camera.position.length()));
      card.current.setNextKinematicTranslation({
        x: vector.x - dragOffset.current.x,
        y: vector.y - dragOffset.current.y,
        z: vector.z - dragOffset.current.z,
      });
    }

    if (!initialized.current) {
      lerpedOne.current.copy(jointOne.current.translation());
      lerpedTwo.current.copy(jointTwo.current.translation());
      initialized.current = true;
    }
    lerpedOne.current.lerp(jointOne.current.translation(), delta * 10);
    lerpedTwo.current.lerp(jointTwo.current.translation(), delta * 10);
    curve.points[0].copy(jointThree.current.translation());
    curve.points[1].copy(lerpedTwo.current);
    curve.points[2].copy(lerpedOne.current);
    curve.points[3].copy(fixed.current.translation());
    sampleBandCurve(curve, bandPoints, extensionDirection);
    const cardRotation = card.current.rotation();
    const strapTwist = THREE.MathUtils.clamp(
      cardRotation.z * STRAP_TWIST_Z + cardRotation.x * STRAP_TWIST_X,
      -STRAP_MAX_TWIST,
      STRAP_MAX_TWIST,
    );
    updateBandGeometry(bandGeometry, bandPoints, state.camera, strapTwist, bandFrame);

    // Let the card keep a little rotational energy while the strap damps it naturally.
    angularVelocity.copy(card.current.angvel());
    card.current.setAngvel({
      x: angularVelocity.x,
      y: angularVelocity.y * 0.96 - cardRotation.y * 0.12,
      z: angularVelocity.z,
    }, true);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (event.pointerType === "touch") return;
    event.stopPropagation();
    (event.target as unknown as Element).setPointerCapture(event.pointerId);
    dragOffset.current.copy(event.point).sub(card.current.translation());
    card.current.wakeUp();
    setDragged(true);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (event.pointerType === "touch") return;
    event.stopPropagation();
    try {
      (event.target as unknown as Element).releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture can already be released by the browser on cancellation.
    }
    setDragged(false);
  };

  return (
    <>
      <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[0, 6, 0]} />
      <RigidBody ref={jointOne} {...segmentProps} position={[0.03, 5.03, 0]}>
        <BallCollider args={[0.08]} />
      </RigidBody>
      <RigidBody ref={jointTwo} {...segmentProps} position={[-0.05, 4.07, 0]}>
        <BallCollider args={[0.08]} />
      </RigidBody>
      <RigidBody ref={jointThree} {...segmentProps} position={[0.04, 3.11, 0]}>
        <BallCollider args={[0.08]} />
      </RigidBody>
      <RigidBody ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"} position={[0, 1.34, 0]}>
        <CuboidCollider args={[BADGE_WIDTH / 2, BADGE_HEIGHT / 2, BADGE_DEPTH / 2]} />
        <group
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerOver={(event) => {
            if (event.pointerType !== "touch") setHovered(true);
          }}
          onPointerOut={(event) => {
            if (event.pointerType !== "touch") setHovered(false);
          }}
        >
          <BadgeCard />
        </group>
      </RigidBody>
      <mesh geometry={bandGeometry} frustumCulled={false}>
        <meshPhysicalMaterial
          map={bandTextures?.texture ?? undefined}
          bumpMap={bandTextures?.bumpTexture ?? undefined}
          bumpScale={0.018}
          roughnessMap={bandTextures?.roughnessTexture ?? undefined}
          color="#10121a"
          roughness={0.88}
          metalness={0.08}
          clearcoat={0.12}
          clearcoatRoughness={0.72}
          sheen={0.24}
          sheenColor="#3b2b69"
          sheenRoughness={0.82}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
