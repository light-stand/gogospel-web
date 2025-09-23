import { createSSRClient } from "@/interface/apiSSR";
import { MissionList } from "@/mission/components/MissionList";
import { MissionSearch } from "@/mission/components/MissionSearch/MissionSearch";
import { useSearchParams } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { repo } = await createSSRClient();
  const { lat, long } = await searchParams;

  const missions = await repo.mission.exploreMissions({
    interests: [],
    ministryType: [],
    distance: 0,
    lat: lat ? parseFloat(lat as string) : 0,
    long: long ? parseFloat(long as string) : 0,
  });

  return (
    <div className="h-full flex flex-col w-full max-w-[500px] mx-auto gap-y-4 px-2 py-8">
      {/*<div className="flex-col p-4 gap-y-2">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-gray-600">
          Explore missions around the world. Click on a mission to learn more.
        </p>
        <span className="text-gray-400 text-sm font-bold">
          Found {missions.length} missions
        </span>
      </div>*/}
      <MissionSearch />
      <MissionList missions={missions} />
    </div>
  );
}
