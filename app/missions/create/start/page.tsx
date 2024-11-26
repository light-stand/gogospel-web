import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { createSSRClient } from "@/interface/apiSSR";

export default async function MissionCreation({ params }: { params: Promise<{ mode: string }> }) {
  const t = await getTranslations();
  const { client, repo } = await createSSRClient();
  const user = await client.auth.getUser();
  const [profile] = await repo.userProfile.get(["user_id", "eq", user?.data?.user?.id]);

  return (
    <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-8 gap-y-4 pb-24 relative h-screen justify-center items-center">
      <h1 className="text-2xl font-bold">{t("mission.creation.titles.start")}</h1>
      <Image
        src={require("@/assets/images/illustration/launching.png")}
        className="aspect-[1.6] mt-4"
        width={400}
        height={400}
        alt="Launching"
      />
      <span className="text-neutral-500 font-bold mt-2 text-center max-w-lg">
        {t("mission.creation.helper.start", { ministry: profile.name })}
      </span>
      <Link href="/missions/create">
        <Button>{t("action.next")}</Button>
      </Link>
    </div>
  );
}
