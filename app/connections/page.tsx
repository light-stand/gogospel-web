"use server";
import { getTranslations } from "next-intl/server";

import { ConnectionList } from "@/connections/components/ConnectionList";

export default async function Connections() {
  const t = await getTranslations("screen");

  return (
    <div className="flex flex-col max-w-screen-md w-full mx-auto px-4 pt-8 gap-y-4 pb-12 relative h-full overflow-scroll no-scrollbar">
      <h1 className="text-2xl font-bold">{t("connections")}</h1>
      <ConnectionList />
    </div>
  );
}
