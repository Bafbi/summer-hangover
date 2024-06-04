"use client";

import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import { api, type RouterOutputs } from "~/trpc/react";

const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export default function GroupMain({ params }: { params: { groupId: string } }) {
  const [messages, setMessages] = useState<
    RouterOutputs["chat"]["getGroupMessages"]
  >([]);
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

  const { data: messagesData } = api.chat.getGroupMessages.useQuery({
    groupId: +params.groupId,
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
    const channel = pusher.subscribe(`group-${params.groupId}`);
    channel.bind("new-message", ({ messageId }: { messageId: number }) => {
      setMessageId(messageId);
    });

    // Clean up
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`group-${params.groupId}`);
    };
  }, [params.groupId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <main>
        <h1>Group Main</h1>
        <ul>
          {messages.map((message) => (
            <li
              className={`${message.id == -1 ? "text-outline" : ""}`}
              key={message.id}
            >
              {message.content}
            </li>
          ))}
          {tmpMessages && (
            <li className="text-outline" key={tmpMessages}>
              {tmpMessages}
            </li>
          )}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessageMutation.mutate({
              groupId: +params.groupId,
              content: chatInput,
            });
          }}
        >
          <input
            type="text"
            name="message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            title="Message"
            placeholder="Enter your message"
          />
          <button type="submit">Send</button>
        </form>
        <div ref={messagesEndRef}></div>
      </main>
    </>
  );
}
