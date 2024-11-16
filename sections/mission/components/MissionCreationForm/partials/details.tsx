"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

export const DetailsSection = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const t = useTranslations("mission.creation");

  return (
    <div className="flex-1 flex-flex-col space-y-2">
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
