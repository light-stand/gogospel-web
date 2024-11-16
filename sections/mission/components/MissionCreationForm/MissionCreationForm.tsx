"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Form } from "@/components/ui/form";
import { DetailsSection, CategorySection, DurationSection, LocationSection } from "./partials";
import { useMissionCreation } from "@/mission/application/useMissionCreation";
import explore from "@/assets/images/illustration/explore.png";

export const MissionCreationForm = ({}) => {
  const t = useTranslations("mission");
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
        </div>
      </form>
    </Form>
  );
};
