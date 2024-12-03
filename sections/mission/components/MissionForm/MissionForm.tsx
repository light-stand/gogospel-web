"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import {
  DetailsSection,
  CategorySection,
  DurationSection,
  LocationSection,
  ImageSection,
} from "./partials";
import explore from "@/assets/images/illustration/explore.png";
import { Button } from "@/components/ui/button";
import { Summary } from "./partials/summary";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";

type MissionFormProps = {
  form: UseFormReturn<MissionCreationFields>;
  onSubmit: () => void;
};

export const MissionForm = ({ form, onSubmit }: MissionFormProps) => {
  const t = useTranslations("action");
  const [summaryOpen, setSummaryOpen] = useState(false);

  const { trigger } = form;

  const onNextButtonClick = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const formValid = await trigger();
    if (!formValid) return;
    summaryOpen ? onSubmit() : setSummaryOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form className="max-w-screen-md mx-auto">
          {!summaryOpen && (
            <Image
              className="mx-auto"
              src={explore}
              alt="Create a mission"
              width={400}
              height={400}
            />
          )}
          <div className="flex flex-col gap-4 gap-y-8">
            {!summaryOpen && (
              <>
                <DetailsSection form={form} />
                <DurationSection form={form} />
                <CategorySection form={form} />
                <LocationSection form={form} />
                <ImageSection form={form} />
              </>
            )}
            {summaryOpen && <Summary form={form} />}
            <div className="mt-8 w-full flex">
              {summaryOpen && (
                <Button
                  className=""
                  size="lg"
                  variant="ghost"
                  onClick={() => setSummaryOpen(false)}
                >
                  {t("back")}
                </Button>
              )}
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
