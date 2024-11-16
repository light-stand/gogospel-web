"use client";
import { useTranslations } from "next-intl";

import { Form } from "@/components/ui/form";
import { DetailsSection, CategorySection, DurationSection } from "./partials";
import { useMissionCreation } from "@/mission/application/useMissionCreation";

import explore from "@/assets/images/illustration/explore.png";
import Image from "next/image";

export const MissionCreationForm = ({}) => {
  const t = useTranslations("mission");
  const { form } = useMissionCreation({ onSuccess: () => {} });

  return (
    <Form {...form}>
      <form>
        <Image className="mx-auto" src={explore} alt="Create a mission" width={400} height={400} />
        <div className="flex flex-col gap-4 gap-y-8 lg:flex-row">
          <DetailsSection form={form} />
          <DurationSection form={form} />
        </div>
        <div className="flex gap-4 gap-y-8 lg:flex-row mt-8">
          <CategorySection form={form} />
        </div>
      </form>
    </Form>
  );
};
