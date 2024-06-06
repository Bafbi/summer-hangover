"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import { type RouterOutputs, api } from "~/trpc/react";
import DefaultProfile from "public/profileLogo.png";

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
  }, [messages]);

  return (
    <>
      <ul className="flex flex-1 flex-col gap-2 py-4">
        {messages.map((message) => (
          <li
            className={` ${message.userId === session?.user.id ? "self-end" : "self-start"} w-5/6`}
            key={message.id}
          >
            <div
              className={` flex ${message.userId === session?.user.id ? "flex-row-reverse" : ""} items-center `}
            >
              <div
                className={`bg-secondary-container flex gap-2 p-1 ${message.userId === session?.user.id ? "flex-row-reverse rounded-ss-md" : "rounded-tr-md"} items-center `}
              >
                <Image
                  src={message.user.image ?? DefaultProfile}
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className=" text-lg font-semibold">
                  {message.user.name}
                </span>
              </div>
              <span className="flex-1"></span>
            </div>
            <div>
              <p
                className={`bg-surface-variant overflow-hidden text-pretty break-words ${message.userId === session?.user.id ? "rounded-s-md" : "rounded-e-md"} p-2`}
              >
                {message.content}
              </p>
            </div>
          </li>
        ))}
        {tmpMessages && (
          <li className="text-outline" key={tmpMessages}>
            {tmpMessages}
          </li>
        )}
      </ul>
      <form
        className="sticky bottom-0 flex w-full gap-2 p-2"
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
