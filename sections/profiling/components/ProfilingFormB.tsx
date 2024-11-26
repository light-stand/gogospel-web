"use client";
import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagCloud } from "@/components/ui";
import { missionTypes } from "@/mission/domain/MissionType";
import { ProfilingFields } from "@/profiling/domain/ProfilingForm";
import { ImageUploader } from "@/components/ui/forms";
import clsx from "clsx";

export default function ProfilingFormB({ form }: { form: UseFormReturn<ProfilingFields> }) {
  const t = useTranslations();

  const options = useMemo(
    () =>
      Object.entries(missionTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`mission.types.${key}`),
      })),
    [t]
  );

  return (
    <section
      className={clsx(
        "flex flex-col items-center md:justify-center",
        "overflow-y-scroll md:overflow-hidden"
      )}
    >
      <h1 className="text-2xl font-bold w-full mb-4">{t("profiling.titles.bio")}</h1>
      <Form {...form}>
        <form>
          <div className="flex flex-col gap-4 gap-y-8 lg:flex-row">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <TagCloud
                    label={t(`profiling.titles.interests`)}
                    innerClassName="max-h-[24rem] overflow-y-scroll md:overflow-hidden md:max-h-none"
                    name="interests"
                    max={10}
                    options={options}
                    control={form.control}
                  />
                )}
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-start space-y-4">
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader control={form.control} name="picture" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>{t("profiling.fields.image.helper")}</p>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
