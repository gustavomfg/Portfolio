import { easeInOutCubic, mapRange } from "@/lib/nocturne-journey";

export interface NocturneJourneyFrame {
  welcomeOpacity: number;
  welcomeTranslateY: number;
  eclipseApproach: number;
  eclipseOpacity: number;
  orbitOpacity: number;
  identityOpacity: number;
  identityTranslateY: number;
  identityClip: number;
  identityGlow: number;
  journeyBridgeOpacity: number;
}

export function getNocturneJourneyFrame(progress: number): NocturneJourneyFrame {
  const welcomeExit = easeInOutCubic(mapRange(progress, 0.12, 0.28, 0, 1));
  const approachProgress = mapRange(progress, 0.08, 0.88, 0, 1);
  const identityEnterProgress = mapRange(progress, 0.36, 0.56, 0, 1);
  const identityExitProgress = mapRange(progress, 0.7, 0.84, 0, 1);
  const identityEnter = easeInOutCubic(identityEnterProgress);
  const identityExit = easeInOutCubic(identityExitProgress);
  const eclipseFade = easeInOutCubic(mapRange(progress, 0.86, 0.97, 0, 1));
  const orbitExit = easeInOutCubic(mapRange(progress, 0.35, 0.6, 0, 1));
  const journeyBridge = easeInOutCubic(mapRange(progress, 0.82, 0.96, 0, 1));

  return {
    welcomeOpacity: 1 - welcomeExit,
    welcomeTranslateY: mapRange(welcomeExit, 0, 1, 0, -24),
    eclipseApproach: approachProgress * approachProgress,
    eclipseOpacity: 1 - eclipseFade,
    orbitOpacity: 1 - orbitExit,
    identityOpacity: identityEnter * (1 - identityExit),
    identityTranslateY:
      mapRange(identityEnter, 0, 1, 32, 0) +
      mapRange(identityExit, 0, 1, 0, -28),
    identityClip: mapRange(identityEnter, 0, 1, 100, 0),
    identityGlow:
      identityEnterProgress > 0 && identityEnterProgress < 1
        ? Math.sin(identityEnterProgress * Math.PI)
        : 0,
    journeyBridgeOpacity: journeyBridge,
  };
}
