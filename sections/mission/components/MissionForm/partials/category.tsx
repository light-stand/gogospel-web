"use client";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

import { TagCloud } from "@/components/ui";
import { FormField } from "@/components/ui/form";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";
import { missionTypes } from "@/mission/domain/MissionType";

export const CategorySection = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const t = useTranslations("mission");

  const missionTypeOptions = useMemo(
    () =>
      Object.entries(missionTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`types.${key}`),
      })),
    [t]
  );

  return (
    <div className="flex-1 flex flex-col space-y-2">
      <h2 className="text-neutral-700 font-bold text-xl">{t("creation.titles.categories")}</h2>
      <span className="font-bold text-neutral-500">{t(`creation.helper.categories`)}</span>
      <FormField
        control={form.control}
        name="categories"
        render={({ field }) => (
          <TagCloud
            innerClassName="max-h-[24rem] overflow-y-scroll md:overflow-hidden md:max-h-none"
            name="categories"
            max={10}
            options={missionTypeOptions}
            control={form.control}
          />
        )}
      />
    </div>
  );
};
