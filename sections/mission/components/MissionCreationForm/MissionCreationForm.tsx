"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Form } from "@/components/ui/form";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";
import { DetailsSection, CategorySection, DurationSection } from "./partials";
import { useMissionCreation } from "@/mission/application/useMissionCreation";

export const MissionCreationForm = ({}) => {
  const t = useTranslations("mission");
  const { form } = useMissionCreation({ onSuccess: () => {} });

  return (
    <Form {...form}>
      <form>
        <div className="flex flex-col gap-4 gap-y-8 lg:flex-row">
          <DetailsSection form={form} />
          <DurationSection form={form} />
        </div>
        <div className="flex flex-col gap-4 gap-y-8 lg:flex-row border-t border-neutral-200 mt-8 pt-4">
          <CategorySection form={form} />
        </div>
      </form>
    </Form>
  );
};
