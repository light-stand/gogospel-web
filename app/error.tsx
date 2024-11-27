"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import errorImage from "@/assets/images/illustration/error.png";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center pt-20 gap-4 m-auto">
      <Image src={errorImage} alt="Error" width={200} height={200} />
      <h1 className="text-center text-2xl text-neutral-600 font-bold">
        {t("alerts.somethingWentWrong.title")}
      </h1>
      <h2 className="text-center">{t("alerts.somethingWentWrong.text")}</h2>
      <Button onClick={() => reset()}>{t("alerts.somethingWentWrong.button")}</Button>
    </main>
  );
}
