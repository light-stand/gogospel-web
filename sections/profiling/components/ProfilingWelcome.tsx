import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

import welcome from "@/assets/images/illustration/welcome.png";

export default function ProfilingWelcome() {
  const t = useTranslations();

  return (
    <section className={clsx("flex flex-col items-center justify-center max-w-screen-sm gap-y-4")}>
      <Image src={welcome} alt="Welcome!" width={300} />
      <h1 className="text-2xl font-bold">{t("profiling.welcome.title")}</h1>
      <p className="text-neutral-500 font-bold">{t("profiling.welcome.text")}</p>
    </section>
  );
}
