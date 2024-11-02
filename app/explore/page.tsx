"use client";
import { useExploreMissions } from "@/shared/mission/application/useExploreMissions";
import { MissionMap } from "@/mission/components/MissionMap";

export default function Explore() {
  const { missions } = useExploreMissions();
  if (!missions) return null;
  return <MissionMap missions={missions} />;
}
