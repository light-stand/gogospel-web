import { useTranslations } from "next-intl";
import { LoginForm } from "@/auth/components/LoginForm";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <main className="max-w-screen-sm mx-auto h-full mt-8 w-full p-4">
      <h1 className="font-bold text-3xl mb-6 w-full">{t("auth.titles.login")}</h1>
      <LoginForm />
    </main>
  );
}
