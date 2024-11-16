import { getTranslations } from "next-intl/server";
import { MissionCreationForm } from "@/mission/components/MissionCreationForm/MissionCreationForm";

export default async function MissionCreation() {
  const t = await getTranslations("mission.creation.titles");
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-12 gap-y-4 pb-[24rem] relative">
      <h1 className="text-2xl font-bold mb-4">{t("start")}</h1>
      <MissionCreationForm />
    </div>
  );
}
