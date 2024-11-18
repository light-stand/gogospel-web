"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

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

export const MissionCreationForm = ({}) => {
  const t = useTranslations("action");
  const { form } = useMissionCreation({ onSuccess: () => {} });

  return (
    <Form {...form}>
      <form className="max-w-screen-md mx-auto">
        <Image className="mx-auto" src={explore} alt="Create a mission" width={400} height={400} />
        <div className="flex flex-col gap-4 gap-y-8">
          <DetailsSection form={form} />
          <DurationSection form={form} />
          <CategorySection form={form} />
          <LocationSection form={form} />
          <ImageSection form={form} />
          <Button className="ml-auto mt-8" size="lg">
            {t("next")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
