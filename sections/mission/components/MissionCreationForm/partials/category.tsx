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
    <div className="flex-1">
      <span>{t(`creation.helper.categories`)}</span>
      <FormField
        control={form.control}
        name="categories"
        render={({ field }) => (
          <TagCloud
            label={t(`creation.titles.categories`)}
            innerClassName="max-h-[24rem] overflow-y-scroll md:overflow-hidden md:max-h-none"
            name="interests"
            max={10}
            options={missionTypeOptions}
            control={form.control}
          />
        )}
      />
    </div>
  );
};
