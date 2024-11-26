"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginFields, loginSchema } from "@/auth/domain/Login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { login } from "@/app/auth/actions";

export const LoginForm = () => {
  const t = useTranslations();
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const submit = form.handleSubmit(async (data) => {
    await login(data);
    window.location.href = "/"; // Trigger a full page reload
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-full flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.email")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.password")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/auth/signup" className="self-center">
          {t("auth.messages.dontHaveAccount")}
        </Link>
        <Button className="mt-4 px-12 self-center" type="submit" formAction={submit}>
          {t("action.next")}
        </Button>
      </form>
    </Form>
  );
};
