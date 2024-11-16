"use client";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/ui/forms/DatePicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";

export const DurationSection = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const t = useTranslations("mission.creation");
  const { noDuration, noStartDate } = form.getValues();
  form.watch(["noDuration", "noStartDate", "startDate"]);

  return (
    <div className="flex-1 space-y-2">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.startDate")}</FormLabel>
            <FormControl>
              <DatePicker control={form.control} name="startDate" disabled={noStartDate} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="noStartDate"
        render={({ field }) => (
          <FormItem className="flex flex-row space-x-3 items-center">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none flex-1">
              <FormLabel>{t("fields.noStartDate")}</FormLabel>
            </div>
          </FormItem>
        )}
      />
      <div className="flex gap-x-2">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.duration")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  disabled={noDuration}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationMultiplier"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                  disabled={noDuration}
                >
                  <FormControl>
                    <SelectTrigger className="mt-7">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="mt-4">
                    <SelectItem value="1">{t("duration.days")}</SelectItem>
                    <SelectItem value="7">{t("duration.weeks")}</SelectItem>
                    <SelectItem value="30">{t("duration.months")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="noDuration"
        render={({ field }) => (
          <FormItem className="flex flex-row space-x-3 items-center">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none flex-1">
              <FormLabel>{t("fields.noDuration")}</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
