"use client";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";

export const DetailsSection = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const t = useTranslations("mission.creation");

  return (
    <div className="flex-[2] flex flex-col space-y-2">
      <h2 className="text-neutral-700 font-bold text-xl">{t("titles.title")}</h2>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.title")}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t("placeholder.title")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.description")}</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder={t("placeholder.description")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
