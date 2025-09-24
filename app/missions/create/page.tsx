"use client";
import { useRouter } from "next/navigation";

import { MissionForm } from "@/mission/components/MissionForm/MissionForm";
import { useMissionCreation } from "@/mission/application/useMissionCreation";

export default function MissionCreation() {
  const router = useRouter();
  const { form, onSubmit } = useMissionCreation({
    onSuccess: () => {
      router.replace("/");
      router.refresh();
    },
  });
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-12 gap-y-4 md:pb-[10rem] pb-16 relative">
      {/*<h1 className="text-2xl font-bold mb-4">{t("start")}</h1>*/}
      <MissionForm form={form} onSubmit={onSubmit} variant="create" />
    </div>
  );
}
