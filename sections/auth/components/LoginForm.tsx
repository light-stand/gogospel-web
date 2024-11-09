"use client";
import { LoginFields, loginSchema } from "@/auth/domain/Login";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (data: FormData) => Promise<void>;
}) => {
  const t = useTranslations();
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-4 w-full">
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
      </form>
      <Link href="/auth/signup">
        <Button variant="ghost" className="mt-4">
          {t("auth.messages.dontHaveAccount")}
        </Button>
      </Link>
      <Button className="mt-4 px-12" type="submit" formAction={onSubmit}>
        {t("action.next")}
      </Button>
    </Form>
  );
};
