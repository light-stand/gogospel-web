"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ProfilingFormA from "@/profiling/components/ProfilingFormA";
import ProfilingFormB from "@/profiling/components/ProfilingFormB";
import { useEditProfile } from "@/user/application/useEditProfile";

export default function EditProfile() {
  const t = useTranslations();
  const router = useRouter();
  const { form, onSubmit } = useEditProfile({ onSuccess: () => router.push("/my-profile") });

  return (
    <div
      className={clsx("relative w-full max-w-screen-lg mx-auto flex flex-col", "p-4 pb-16 gap-y-8")}
    >
      <h1 className="text-2xl font-bold">{t("profiling.titles.edit")}</h1>
      <ProfilingFormA form={form} />
      <ProfilingFormB form={form} />
      <Button onClick={onSubmit} className="px-12 ml-auto" size="lg">
        {t("action.save")}
      </Button>
    </div>
  );
}
