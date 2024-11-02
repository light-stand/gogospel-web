"use client";
import { useExploreMissions } from "@/shared/mission/application/useExploreMissions";
import { MissionMap } from "@/mission/components/MissionMap";

export default function Home() {
  const { missions } = useExploreMissions();
  if (!missions) return null;
  return <MissionMap missions={missions} />;
}
