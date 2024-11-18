"use client";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

import { ImageUploader } from "@/components/ui";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";

export const ImageSection = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const t = useTranslations();
  return (
    <div className="flex-1 flex flex-col gap-y-2">
      <h2 className="text-neutral-700 font-bold text-xl">{t("profiling.titles.image")}</h2>
      <span className="font-bold text-neutral-500 mb-4">{t("mission.creation.helper.image")}</span>
      <ImageUploader className="mx-auto" control={form.control} name="image" />
    </div>
  );
};
