"use client";
import { useTranslations } from "next-intl";

import { ChangePasswordForm } from "@/auth/components/ChangePasswordForm";

export default function ResetPasswordCallback() {
  const t = useTranslations();

  return (
    <main className="max-w-[28rem] mx-auto h-full mt-8 w-full p-4 flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl w-full">{t("auth.titles.resetPassword")}</h1>
      <span>{t("auth.resetPassword.enterNewPassword")}</span>
      <ChangePasswordForm />
    </main>
  );
}
