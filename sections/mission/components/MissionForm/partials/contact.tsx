"use client";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";

export const ContactSection = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const t = useTranslations("mission.creation");

  return (
    <div className="flex-[2] flex flex-col space-y-2">
      <h2 className="text-neutral-700 font-bold text-xl">{t("titles.contact")}</h2>
      <FormField
        control={form.control}
        name="contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.contactName")}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t("placeholder.contactName")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.contactEmail")}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t("placeholder.contactEmail")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.contactPhone")}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t("placeholder.contactPhone")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
