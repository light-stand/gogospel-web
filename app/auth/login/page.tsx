import { useTranslations } from "next-intl";
import { LoginForm } from "@/auth/components/LoginForm";
import dynamic from "next/dynamic";

const GoogleLoginButton = dynamic(() => import("@/auth/components/GoogleLoginButton"), {
  ssr: false,
});

export default function LoginPage() {
  const t = useTranslations();

  return (
    <main className="max-w-[28rem] mx-auto h-full mt-8 w-full p-4 flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl w-full">{t("auth.titles.login")}</h1>
      <LoginForm />
      <GoogleLoginButton />
    </main>
  );
}
