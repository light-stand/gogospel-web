import Link from "next/link";

import { Icon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { MissionSheetTitle } from "@/mission/components/MissionSheet/partials/MissionSheetTitle";
import { MissionSheetCarousel } from "@/mission/components/MissionSheet/partials/MissionSheetCarousel";
import { MissionSheetInfo } from "@/mission/components/MissionSheet/partials/MissionSheetInfo";
import { MissionSheetActions } from "@/mission/components/MissionSheet/partials/MissionSheetActions";
import { createSSRClient } from "@/interface/apiSSR";

export default async function MissionPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { repo, client } = await createSSRClient();
  const user = (await client.auth.getUser()).data.user;

  const mission = await repo?.mission.getById(
    id,
    "*, user_profile!created_by(user_id, name, images), favorite(user_id)"
  );

  const { created_by } = mission;

  return (
    <div className="shadow-2xl z-10 h-full flex flex-col p-4 w-[32rem] relative">
      <Link href={"/explore"}>
        <Button variant="outline" className="rounded-full mb-2" size="icon">
          <Icon name="chevron-left" size={0.8} />
        </Button>
      </Link>
      <MissionSheetTitle mission={mission} />
      <MissionSheetCarousel mission={mission} />
      <MissionSheetInfo mission={mission} />
      <MissionSheetActions mission={mission} />
      {created_by === user?.id && (
        <Link href={`/mission/edit/${mission.id}`}>
          <Button className="absolute bottom-4 right-4 rounded-full py-4 h-14 w-14">
            <Icon name="pencil" size={1.2} />
          </Button>
        </Link>
      )}
    </div>
  );
}
