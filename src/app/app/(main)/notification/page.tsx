"use client";
import { isToday, isYesterday } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import { env } from "~/env";
import { api, type RouterOutputs } from "~/trpc/react";

function formatNotifications(
  notifications: RouterOutputs["notification"]["getNotifications"],
) {
  // On trie les notifications par date
  const todaysNotifications = notifications.filter((notif) =>
    isToday(new Date(notif.createdAt)),
  );
  const yesterdaysNotifications = notifications.filter((notif) =>
    isYesterday(new Date(notif.createdAt)),
  );
  const olderNotifications = notifications.filter(
    (notif) =>
      !isToday(new Date(notif.createdAt)) &&
      !isYesterday(new Date(notif.createdAt)),
  );

  return {
    todaysNotifications,
    yesterdaysNotifications,
    olderNotifications,
  };
}

const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export default function Notifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<
    RouterOutputs["notification"]["getNotifications"]
  >([]);
  const [notificationId, setNotificationId] = useState<number>(0);

  const { data: notificationsData } =
    api.notification.getNotifications.useQuery();
  const { data: notification } = api.notification.getNotification.useQuery({
    notifId: notificationId,
  });
  const sendNotification = api.notification.sendNotification.useMutation();

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  useEffect(() => {
    if (notification) {
      setNotifications((prev) => [...prev, notification]);
    }
  }, [notification]);

  useEffect(() => {
    if (!session) return;
    const userId = session.user.id;

    const channel = pusher.subscribe(`notifications-${userId}`);

    channel.bind("new-notification", (data: { notifId: number }) => {
      setNotificationId(data.notifId);
    });

    return () => {
      pusher.unsubscribe(`notifications--${userId}`);
    };
  }, [session]);

  const handleSendNotification = () => {
    if (!session) return;
    const message = "Ceci est un test de notification";
    sendNotification.mutate({ message });
  };

  // have the formatNotifications always up to date
  const formattedNotifications = formatNotifications(notifications);

  return (
    <div className="bg-surface flex h-screen flex-col">
      <MainMenuHeader />

      {/* Contenu de la page notif */}
      <main className="bg-surface mt-12 flex-grow overflow-y-auto overflow-x-hidden px-2 py-4">
        {/* Titre de la section notif + bouton retour et marqué comme lu */}
        <div className="bg-surface-variant mb-4 mt-6 flex h-14 flex-col items-center rounded-md">
          <h1 className="pt-2 text-4xl font-semibold">Notifications</h1>
        </div>
        <button onClick={handleSendNotification}>
          Envoyer une notification
        </button>
        <p>session.user.id = {session?.user.id}</p>
        <div className="mb-8 ml-52 mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button className="mr-3 rounded-md bg-inverse-primary px-5 py-1 text-sm font-semibold text-inverse-surface">
              <span>
                Marquer
                <br />
                comme lu
              </span>
            </button>
            <Link
              href="/app"
              className="rounded-full bg-inverse-primary p-2 font-bold"
            >
              <span style={{ fontSize: 40 }} className="material-icons">
                close
              </span>
            </Link>
          </div>
        </div>
        {/* Section des notifications */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">{"Aujourd'hui"}</h2>
        </div>
        {formattedNotifications.todaysNotifications.map((notif) => (
          <div key={notif.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">{notif.message}</div>
          </div>
        ))}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Hier</h2>
        </div>
        {formattedNotifications.yesterdaysNotifications.map((notif) => (
          <div key={notif.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">{notif.message}</div>
          </div>
        ))}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Plus ancien</h2>
        </div>
        {formattedNotifications.olderNotifications.map((notif) => (
          <div key={notif.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">{notif.message}</div>
          </div>
        ))}
      </main>
    </div>
  );
}
