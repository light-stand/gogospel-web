"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { LoginForm } from "@/auth/components/LoginForm";
import { Icon } from "@/components/ui";

const GoogleLoginButton = dynamic(() => import("@/auth/components/GoogleLoginButton"), {
  ssr: false,
});

export default function LoginPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const passwordReset = searchParams.has("password_reset");

  return (
    <main className="max-w-[28rem] mx-auto h-full mt-8 w-full p-4 flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl w-full">{t("auth.titles.login")}</h1>
      {passwordReset && (
        <div className="bg-green-200 border border-green-400 text-green-700 p-4 rounded-md">
          <Icon name="check" className="h-5 w-5 inline-block mr-2" />
          {t("auth.resetPassword.success")}
        </div>
      )}
      <LoginForm />
      <GoogleLoginButton />
    </main>
  );
}
