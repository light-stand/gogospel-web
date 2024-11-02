import { missionRepository } from "@/mission/interface/missionRepository";
import { useExploreMissions } from "@/modules/mission/application/useExploreMissions";
import { MissionMap } from "@/mission/components/MissionMap";

export default async function Home() {
  // const { missions } = useExploreMissions();
  const missions = await missionRepository.exploreMissions({ lat: 0, long: 0 });
  if (!missions) return null;
  return <MissionMap missions={missions} />;
}
