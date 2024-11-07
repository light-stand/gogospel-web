"use client";
import { useTranslations } from "next-intl";

import { useExploreMissions } from "@/shared/mission/application/useExploreMissions";
import { MissionMap } from "@/mission/components/MissionMap";
import { MissionList } from "@/mission/components/MissionList";

export default function Explore() {
  const { missions } = useExploreMissions();
  const t = useTranslations();

  if (!missions) return null;
  return (
    <div className="flex flex-row">
      <div className="bg-neutral-100 shadow-xl z-10 h-screen flex flex-col">
        <div className="flex flex-col p-4 pb-8 gap-y-2">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-gray-600">
            Explore missions around the world. Click on a mission to learn more.
          </p>
        </div>
        <MissionList missions={missions} />
      </div>
      <div className="flex-1">
        <MissionMap missions={missions} />
      </div>
    </div>
  );
}
