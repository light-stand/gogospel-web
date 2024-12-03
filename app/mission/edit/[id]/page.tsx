"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { MissionForm } from "@/mission/components/MissionForm/MissionForm";
import { useMissionEdit } from "@/mission/application/useMissionEdit";

export default function MissionEdit({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const router = useRouter();
  const t = useTranslations("mission.edit");
  const { form, onSubmit } = useMissionEdit({
    id,
    onSuccess: () => {
      router.replace("/missions/my-missions");
      router.refresh();
    },
  });
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-12 gap-y-4 md:pb-[10rem] pb-16 relative">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <MissionForm form={form} onSubmit={onSubmit} variant="edit" />
    </div>
  );
}
