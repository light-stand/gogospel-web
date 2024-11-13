"use client";
import clsx from "clsx";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ProfilingWelcome from "@/profiling/components/ProfilingWelcome";
import ProfilingFormA from "@/profiling/components/ProfilingFormA";
import ProfilingFormB from "@/profiling/components/ProfilingFormB";
import { useProfiling } from "@/profiling/hooks/useProfiling";
import { Step, fieldsByStep } from "@/profiling/domain/Profiling";
import { signOut } from "@/app/auth/actions";

export default function Onboarding() {
  const t = useTranslations();
  const [step, setStep] = useState<Step>(Step.Welcome);
  const router = useRouter();
  const { form, onSubmit } = useProfiling(router);

  const goPrev = async () => {
    if (step === Step.Welcome) return await signOut();
    setStep((p) => p - 1);
  };

  const goNext = async () => {
    const isValid = await form.trigger(fieldsByStep[step]);
    if (!isValid) return;
    if (step === Step.FormB) return onSubmit();

    setStep((p) => p + 1);
  };

  return (
    <main
      className={clsx(
        "relative w-full max-w-screen-lg mx-auto h-screen",
        "flex flex-col flex-1 md:justify-center items-center p-4"
      )}
    >
      {step === Step.Welcome && <ProfilingWelcome />}
      {step === Step.FormA && <ProfilingFormA form={form} />}
      {step === Step.FormB && <ProfilingFormB form={form} />}
      <div className="flex w-full justify-between max-w-screen-sm mx-auto mt-auto md:mt-8">
        <Button onClick={goPrev} className="px-12" variant="link">
          {step > Step.Welcome ? t("action.back") : t("user.profile.options.logout")}
        </Button>
        <Button onClick={goNext} className="px-12 ml-auto" size="lg">
          {t("action.next")}
        </Button>
      </div>
    </main>
  );
}
