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
    <div className="shadow-2xl z-10 h-screen flex flex-col w-[36rem]">
      <div className="flex flex-col p-4 gap-y-2">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-gray-600">
          Explore missions around the world. Click on a mission to learn more.
        </p>
        <span className="text-gray-400 text-sm font-bold">Found {missions.length} missions</span>
      </div>
      <MissionList missions={missions} />
    </div>
  );
}
