"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { Icon } from "@/components/ui";
import { useUserStore } from "@/user/store/useUserStore";
import { Connection, ConnectionStatus } from "@/connections/domain/Connection";
import { Button } from "@/components/ui/button";
import { useManageSubmission } from "@/connections/application/useManageSubmission";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export const ConnectionListItem = ({ connection }: { connection: Connection }) => {
  const pathname = usePathname();
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUserStore();
  const { id, mission, user1, user2, user1_id, user2_id, status, messages } = connection;

  const openAlert = async (
    message: string,
    text?: string,
    onConfirm?: () => void | Promise<void>
  ) => {
    // Temp: use better alert
    const confirmed = confirm(message + (text ? `\n${text}` : ""));
    if (onConfirm && confirmed) {
      await onConfirm();
      router.refresh();
    }
  };

  const { onSubmissionManage } = useManageSubmission({ connectionId: id, t, openAlert });

  const data = {
    image: user.id === user1_id ? user2?.images[0] : user1?.images[0],
    user: user.id === user1_id ? user2?.name : user1?.name,
    title: mission?.title,
    lastMessage: messages && messages[0] && messages[0].text,
  };

  // User 1 is the connection creator, user 2 is the connection receiver
  const isPending = user.id === user1_id && status === ConnectionStatus.Pending;
  const canManage = user.id === user2_id && status === ConnectionStatus.Pending;
  const canRestore = user.id === user2_id && status === ConnectionStatus.Rejected;

  return (
    <div
      className={clsx(
        "border-b border-neutral-300 py-3 px-2 flex items-center",
        pathname.includes(`/connections/${id}`) && "bg-neutral-100"
      )}
    >
      <Link href={`/profile/${user.id === user1_id ? user2_id : user1_id}`}>
        <div
          className={clsx(
            "h-12 w-12 mr-3 rounded-full overflow-hidden",
            status === ConnectionStatus.Rejected && "opacity-50"
          )}
        >
          <Image
            className="h-full"
            src={data.image || ""}
            width={48}
            height={48}
            alt={data.title || ""}
          />
        </div>
      </Link>

      <div
        className={clsx(
          "flex flex-col w-0 flex-1 pr-1 cursor-pointer",
          status === ConnectionStatus.Rejected && "opacity-50"
        )}
        onClick={() =>
          isPending || status === ConnectionStatus.Rejected
            ? alert(t("connections.submission.errors.notAccepted"))
            : router.push(`/connections/${id}`)
        }
      >
        <span className={"font-bold text-base"}>{data.user}</span>
        <span className="text-neutral-400 font-bold">{data.title}</span>
        <span className="line-clamp-1">{data.lastMessage}</span>
      </div>
      {isPending && (
        <Icon name="clock-outline" className="ml-auto text-3xl text-neutral-400" size={1} />
      )}
      {canManage && (
        <>
          <Button
            className="text-red-400 ml-auto px-3"
            variant="ghost"
            onClick={onSubmissionManage(ConnectionStatus.Rejected)}
          >
            <Icon name="close" size={1} />
          </Button>
          <Button
            className="text-green-400 px-3"
            variant="ghost"
            onClick={onSubmissionManage(ConnectionStatus.Accepted)}
          >
            <Icon name="check" size={1} />
          </Button>
        </>
      )}
      {canRestore && (
        <Button
          className="text-yellow-400 ml-auto px-3"
          variant="ghost"
          onClick={onSubmissionManage(ConnectionStatus.Pending)}
        >
          <Icon name="undo" size={1} />
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-2 px-3" variant="ghost">
            <Icon name="dots-vertical" size={1} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-20">
          <DropdownMenuItem>
            <Link href={`/feedback/add/${id}`}>
              {t("connections.submission.actions.addFeedback")}
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="text-red-500">{t("actions.delete")}</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
