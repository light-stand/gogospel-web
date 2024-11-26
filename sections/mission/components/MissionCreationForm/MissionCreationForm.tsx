"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import {
  DetailsSection,
  CategorySection,
  DurationSection,
  LocationSection,
  ImageSection,
} from "./partials";
import { useMissionCreation } from "@/mission/application/useMissionCreation";
import explore from "@/assets/images/illustration/explore.png";
import { Button } from "@/components/ui/button";
import { Summary } from "./partials/summary";

export const MissionCreationForm = () => {
  const t = useTranslations("action");
  const router = useRouter();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { form, onSubmit } = useMissionCreation({
    onSuccess: () => {
      router.replace("/missions/my-missions");
      router.refresh();
    },
  });

  const onNextButtonClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
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
            <Button className="ml-auto mt-8" size="lg" onClick={onNextButtonClick}>
              {t("next")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
