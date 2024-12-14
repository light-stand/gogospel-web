import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import dayjs from "@/utils/date";
import { useUserStore } from "@/user/store/useUserStore";
import { useChatConnection } from "@/chat/application/useChatConnection";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Icon } from "@/components/ui";
import { Loader2 } from "lucide-react";

export const Chat = ({ connectionId }: { connectionId: number }) => {
  const router = useRouter();
  const t = useTranslations("connections.chat");
  const { user } = useUserStore();

  const onError = () => {
    router.push("/connections");
  };

  const { messages, handleSend, isLoading } = useChatConnection(connectionId, onError);

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message") as string;
    if (!message) return;
    handleSend({
      text: message,
      user_id: user.id as string,
      connection_id: connectionId,
      created_at: new Date(),
    });
    form.reset();
  };

  if (isLoading) return <Loader2 className="animate-spin m-auto text-indigo-500 h-12 w-12" />;

  return (
    <>
      <ChatMessageList>
        {messages
          ?.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
          .map((message) => (
            <ChatBubble
              variant={user.id === message.user_id ? "sent" : "received"}
              key={message.id}
            >
              <ChatBubbleMessage variant="sent">
                {message.text}
                <ChatBubbleTimestamp timestamp={dayjs(message.created_at).format("HH:mm")} />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
      </ChatMessageList>
      <form
        className="bg-white shadow-lg z-10 border-t border-neutral-200 flex p-3"
        onSubmit={onSend}
      >
        <ChatInput
          placeholder={t("typeMessage")}
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-1 shadow-none border-none"
          name="message"
        />
        <div className="flex items-center">
          <Button size="sm" className="ml-auto gap-2">
            {t("send")}
            <Icon name="send" className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default Chat;
