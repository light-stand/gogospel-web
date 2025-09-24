"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { useTransition } from "react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileFormProps {
  email: string;
  name: string;
  updateProfile: (values: ProfileFormValues) => Promise<void>;
}

export const EditProfileForm = ({
  email,
  name,
  updateProfile,
}: EditProfileFormProps) => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: name || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      await updateProfile(data);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <FormItem>
          <FormLabel>{t("auth.fields.email")}</FormLabel>
          <FormControl>
            <Input readOnly disabled value={email} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profiling.titles.name")}</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? t("action.saving") : t("action.save")}
        </Button>
      </form>
    </Form>
  );
};
