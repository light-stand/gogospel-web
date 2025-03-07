import clsx from "clsx";

import { createSSRClient } from "@/interface/apiSSR";
import { MissionList } from "@/mission/components/MissionList";

export default async function Explore() {
  const { repo } = await createSSRClient();
  const missions = await repo.mission.exploreMissions({
    interests: [],
    ministryType: [],
    distance: 0,
    lat: 0,
    long: 0,
  });

  return (
    <div className="md:shadow-2xl z-10 md:h-full flex flex-col md:flex-[0.7] w-full md:w-0">
      <div className="hidden md:flex flex-col p-4 gap-y-2">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-gray-600">
          Explore missions around the world. Click on a mission to learn more.
        </p>
        <span className="text-gray-400 text-sm font-bold">Found {missions.length} missions</span>
      </div>
      <MissionList
        className={clsx(
          "pb-2 md:pb-8 flex flex-row md:grid flex-nowrap",
          "overflow-x-scroll",
          "md:overflow-x-hidden",
          "max-w-[100vw] md:w-full md:mt-0"
        )}
        missions={missions}
      />
    </div>
  );
}
