"use client";
import { useExploreMissions } from "@/shared/mission/application/useExploreMissions";
import { MissionList } from "@/mission/components/MissionList";

export default function Explore() {
  const { missions } = useExploreMissions();

  if (!missions) return null;
  return (
    <div className="shadow-2xl z-10 h-screen flex flex-col">
      <div className="flex flex-col p-4 pb-8 gap-y-2">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-gray-600">
          Explore missions around the world. Click on a mission to learn more.
        </p>
      </div>
      <MissionList missions={missions} />
    </div>
  );
}
