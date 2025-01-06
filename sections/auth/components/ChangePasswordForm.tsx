"use client";
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
import { useApi } from "@/common/context/ApiContext";
import { useUserProfile } from "@/user/application/useUserProfile";
import { ResetPassowordFields, resetPasswordSchema } from "@/auth/domain/ResetPassword";
import { resetPassword } from "../interface/resetPasswordApi";

export const ChangePasswordForm = () => {
  const t = useTranslations();
  const { client } = useApi();
  const user = useUserProfile();
  const form = useForm<ResetPassowordFields>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const submit = form.handleSubmit(resetPassword(client));

  return (
    <Form {...form}>
      <form className="space-y-4 w-full flex flex-col">
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.confirmPassword")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 px-12 self-center" type="submit" formAction={() => submit()}>
          {t("action.next")}
        </Button>
      </form>
    </Form>
  );
};
