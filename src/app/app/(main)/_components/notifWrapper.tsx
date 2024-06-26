"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { env } from "~/env";
import { api } from "~/trpc/react";

const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export default function NotifWrapper() {
  const { data: session } = useSession();
  const [notifId, setNotifId] = useState(0);

  const { data: newNotification } = api.notification.getNotification.useQuery({
    notifId: notifId,
  });

  useEffect(() => {
    if (!session || !session.user) return;

    const channel = pusher.subscribe(`notifications-${session.user.id}`);

    channel.bind(
      "new-notification",
      async (data: { notifId: number; message: string; urlLink: string }) => {
        setNotifId(data.notifId);
        // Notification push
        if (Notification.permission === "granted") {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification("New Notification", {
            body: data.message,
            icon: "/summer-hangover-icon.png",
            data: {
              url: data.urlLink,
            },
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission()
            .then(async (permission) => {
              if (permission === "granted") {
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification("New Notification", {
                  body: data.message,
                  icon: "/summer-hangover-icon.png",
                  data: {
                    url: data.urlLink,
                  },
                });
              }
            })
            .catch((err) => {
              console.error("Notification request error: ", err);
            });
        }
      },
    );

    return () => {
      pusher.unsubscribe(`notifications-${session.user.id}`);
    };
  }, [session]);

  useEffect(() => {
    if (newNotification) {
      setNotifId(0);
      toast.success(
        <ToastLink
          url={newNotification.urlLink ?? "error url type"}
          message={newNotification.message}
        />,
        {
          position: "top-center",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
        },
      );
    }
  }, [newNotification]);

  return null;
}

function ToastLink({ url, message }: { url: string; message: string }) {
  return (
    <Link href={url}>
      <span>{message}</span>
    </Link>
  );
}
