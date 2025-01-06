import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import { Submission, submissionSchema } from "@/connections/domain/Submission";
import { useSendSubmission } from "@/connections/application/useSendSubmission";
import { Mission } from "@/mission/domain/Mission";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

type SubmissionModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SubmissionModal = ({ onClose, open }: SubmissionModalProps) => {
  const t = useTranslations();
  const router = useRouter();
  const { modalData } = useModal();
  const mission = modalData as Mission;

  const form = useForm<Submission>({
    resolver: zodResolver(submissionSchema),
  });

  const { sendSubmission } = useSendSubmission({
    mission,
    onError: (err: string) => {
      alert(t(err));
    },
    onSuccess: async () => {
      // await revalidatePath("/connections");
      router.push("/connections");
      onClose();
    },
  });

  useEffect(() => {
    form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(a) => !a && onClose()}>
      <DialogContent>
        <DialogTitle>{t("connections.submission.title", { name: mission?.title })}</DialogTitle>
        <DialogDescription className="flex flex-col">
          <p className="font-bold text-neutral-500 mb-4">
            {t("connections.submission.text", {
              ministry: mission?.user_profile?.name,
            })}
          </p>
          <Form {...form}>
            <form className="space-y-4 w-full flex flex-col">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button className="mt-4 ml-auto" onClick={form.handleSubmit(sendSubmission)}>
            {t("action.send")}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
