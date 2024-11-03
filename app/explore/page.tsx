"use client";
import { useExploreMissions } from "@/shared/mission/application/useExploreMissions";
import { MissionMap } from "@/mission/components/MissionMap";
import { MissionList } from "@/mission/components/MissionList";
import clsx from "clsx";

export default function Explore() {
  const { missions } = useExploreMissions();
  if (!missions) return null;
  return (
    <>
      <MissionList
        missions={missions}
        className={clsx(
          "absolute left-0 z-10 w-full flex-row gap-x-2 bottom-4",
          "md:bottom-0 md:items-end md:flex-col md:gap-x-0 md:w-96"
        )}
      />
      <MissionMap missions={missions} />
    </>
  );
}
