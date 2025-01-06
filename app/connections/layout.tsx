"use server";
import { getTranslations } from "next-intl/server";

import { ConnectionList } from "@/connections/components/ConnectionList";

export default async function ConnectionsLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("screen");

  return (
    <div className="w-full flex flex-row h-full">
      <div className="bg-white shadow h-full min-w-[20rem] z-20">
        <h1 className="text-2xl p-4 font-bold">{t("connections")}</h1>
        <ConnectionList />
      </div>
      {children}
    </div>
  );
}
