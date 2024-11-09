import { useTranslations } from "next-intl";
import { LoginForm } from "@/auth/components/LoginForm";
import { login } from "./actions";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <main className="max-w-screen-sm mx-auto h-full mt-8 flex flex-col items-center">
      <h1 className="font-bold text-3xl mb-6 w-full">
        {t("auth.titles.login")}
      </h1>
      <LoginForm onSubmit={login} />
    </main>
  );
}
