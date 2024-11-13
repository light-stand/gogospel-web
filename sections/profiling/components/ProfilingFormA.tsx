"use client";
import clsx from "clsx";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagCloud } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { ministryTypes } from "@/user/domain/MinistryType";
import { ProfilingFields } from "@/profiling/domain/ProfilingForm";

export default function ProfilingFormA({ form }: { form: UseFormReturn<ProfilingFields> }) {
  const t = useTranslations();

  const ministryTypesOptions = useMemo(
    () =>
      Object.entries(ministryTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`ministry.types.${key}`),
      })),
    [t]
  );

  return (
    <section
      className={clsx(
        "flex flex-col items-center md:justify-center",
        "max-w-screen-lg mx-auto",
        "overflow-y-scroll md:overflow-hidden"
      )}
    >
      <h1 className="text-2xl font-bold w-full mb-4">{t("profiling.titles.name")}</h1>
      <Form {...form}>
        <form>
          <div className="flex flex-col gap-4 gap-y-8 lg:flex-row">
            <div className="flex-1 flex-flex-col space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`profiling.fields.name.label`)}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(`profiling.fields.bio.label`)}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="ministryType"
                render={({ field }) => (
                  <TagCloud
                    label={t(`profiling.fields.ministryType.label`)}
                    innerClassName="max-h-[24rem] overflow-y-scroll md:overflow-hidden md:max-h-none"
                    name="ministryType"
                    max={1}
                    options={ministryTypesOptions}
                    control={form.control}
                  />
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
