import { useTranslations } from "next-intl";
import { SignupForm } from "@/auth/components/SignupForm";

export default function SignupPage() {
  const t = useTranslations();

  return (
    <main className="max-w-[28rem] mx-auto h-full mt-8 w-full p-4">
      <h1 className="font-bold text-3xl mb-6 w-full">{t("auth.titles.register")}</h1>
      <SignupForm />
    </main>
  );
}
