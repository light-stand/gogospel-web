"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import {
  DetailsSection,
  LocationSection,
  ImageSection,
  ContactSection,
} from "./partials";
import { Button } from "@/components/ui/button";
import { Summary } from "./partials/summary";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";

export type MissionFormProps = {
  form: UseFormReturn<MissionCreationFields>;
  onSubmit: () => void;
  variant?: "edit" | "create";
};

export const MissionForm = ({ form, onSubmit, variant }: MissionFormProps) => {
  const t = useTranslations("action");

  const { trigger } = form;

  const onNextButtonClick = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const formValid = await trigger();
    if (!formValid) return;
    onSubmit();
    // summaryOpen ? onSubmit() : setSummaryOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form className="max-w-screen-sm mx-auto pb-12 w-full">
          <div className="flex flex-col gap-4 gap-y-8">
            <DetailsSection form={form} />
            {/*<DurationSection form={form} />*/}
            {/*<CategorySection form={form} />*/}
            <ContactSection form={form} />
            <LocationSection form={form} />
            <ImageSection form={form} />
            <div className="mt-8 w-full flex">
              <Button className="ml-auto" size="lg" onClick={onNextButtonClick}>
                {t("next")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
