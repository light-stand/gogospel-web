import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { createSSRClient } from "@/interface/apiSSR";
import { MissionList } from "@/mission/components/MissionList";
import {
  missionListTypes,
  MissionListTypes,
  listTypesIcons,
} from "@/mission/domain/MissionListType";
import { Button } from "@/components/ui/button";
import { Icon, MaterialIconType } from "@/components/ui";
import NoResults from "@/components/ui/feedback/NoResults";
import { camelCase, kebabCase } from "lodash";

export default async function MissionListPage({ params }: { params: Promise<{ mode: string }> }) {
  const { client, repo } = await createSSRClient();
  const t = await getTranslations();
  const user = (await client.auth.getUser()).data.user;

  const mode = camelCase((await params).mode) as MissionListTypes;

  const missions = await repo.mission.list(mode, user?.id as string);

  return (
    <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-8 gap-y-4 pb-12">
      <h1 className="text-2xl font-bold">{t("screen.missions")}</h1>
      <div className="flex mx-auto gap-x-2">
        {missionListTypes.map((type) => (
          <Link href={`/missions/${kebabCase(type)}`} key={type}>
            <Button variant={mode === type ? "default" : "ghost"}>
              <Icon name={listTypesIcons[type] as MaterialIconType} />
              {t(`mission.list.types.${type}`)}
            </Button>
          </Link>
        ))}
      </div>

      <MissionList
        // onRefresh={refetch}
        className="grid-cols-3"
        missions={missions || []}
        // isLoading={isFetching}
        NoResultsComponent={() => <NoResults type={mode} />}
      />
    </div>
  );
}
