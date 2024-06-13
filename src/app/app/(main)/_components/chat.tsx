"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import { type RouterOutputs, api } from "~/trpc/react";
import DefaultProfile from "public/profileLogo.png";
import { Session } from "next-auth";

const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export default function Chat({
  groupId,
  eventId,
}: {
  groupId: number;
  eventId?: number;
}) {
  const [messages, setMessages] = useState<
    RouterOutputs["chat"]["getMessages"]
  >([]);
  const { data: session } = useSession({ required: true });

  const [chatInput, setChatInput] = useState("");
  const [messageId, setMessageId] = useState<number>(0);
  const [tmpMessages, setTmpMessages] = useState<string | null>(null);

  const sendMessageMutation = api.chat.sendMessage.useMutation({
    onMutate: ({ content }) => {
      setTmpMessages(content);
    },
    onSuccess: () => {
      setChatInput("");
    },
  });

  const { data: messagesData } = api.chat.getMessages.useQuery({
    groupId: groupId,
    eventId: eventId,
  });

  useEffect(() => {
    if (messagesData) {
      setMessages([...messagesData]);
    }
  }, [messagesData]);

  const { data: messageData } = api.chat.getMessage.useQuery({
    messageId: messageId,
  });

  useEffect(() => {
    if (messageData) {
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setTmpMessages(null);
    }
  }, [messageData]);

  useEffect(() => {
    const channel =
      eventId === undefined
        ? pusher.subscribe(`group-${groupId}`)
        : pusher.subscribe(`event-${groupId}-${eventId}`);
    channel.bind("new-message", ({ messageId }: { messageId: number }) => {
      setMessageId(messageId);
    });

    return () => {
      channel.unbind_all();
      eventId === undefined
        ? pusher.unsubscribe(`group-${groupId}`)
        : pusher.unsubscribe(`event-${groupId}-${eventId}`);
    };
  }, [groupId, eventId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, tmpMessages]);

  return (
    <>
      <ul className="flex flex-grow flex-col gap-2 py-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={{
              content: message.content,
              username: message.user.name,
              userImage: message.user.image,
            }}
            isSelf={message.userId === session?.user.id}
          />
        ))}
        {tmpMessages && (
          <Message
            key={tmpMessages}
            message={{
              content: tmpMessages,
              username: session?.user.name,
              userImage: session?.user.image,
            }}
            isSelf={true}
          />
        )}
      </ul>
      <form
        className="sticky bottom-16 flex w-full gap-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (chatInput.trim() === "") return;
          sendMessageMutation.mutate({
            groupId: groupId,
            eventId: eventId,
            content: chatInput,
          });
        }}
      >
        <input
          type="text"
          name="message"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          title="Chat Message"
          placeholder="Enter your message"
          disabled={tmpMessages !== null}
          className="bg-secondary-container flex-1 rounded-md p-2 focus:ring-tertiary"
          autoComplete="off"
        />
        <button className="bg-primary-container rounded-md p-2" type="submit">
          Send
        </button>
      </form>
      <div ref={messagesEndRef}></div>
    </>
  );
}

function Message({
  message,
  isSelf,
}: {
  message: { content: string; username: string; userImage: string | null };
  isSelf: boolean;
}) {
  return (
    <li className={` ${isSelf ? "self-end" : "self-start"} w-5/6`}>
      <div
        className={` flex ${isSelf ? "flex-row-reverse" : ""} items-center `}
      >
        <div
          className={`bg-secondary-container flex gap-2 p-1 ${isSelf ? "flex-row-reverse rounded-ss-md" : "rounded-tr-md"} items-center `}
        >
          <Image
            src={message.userImage ?? DefaultProfile}
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className=" text-lg font-semibold">{message.username}</span>
        </div>
        <span className="flex-1"></span>
      </div>
      <div>
        <p
          className={`bg-surface-variant overflow-hidden text-pretty break-words ${isSelf ? "rounded-s-md" : "rounded-e-md"} p-2`}
        >
          {message.content}
        </p>
      </div>
    </li>
  );
}
