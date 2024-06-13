"use client";
import { isToday, isYesterday } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { env } from "~/env";
import { type notificationType } from "~/server/api/routers/notifications";
import { api, type RouterOutputs } from "~/trpc/react";

function formatNotifications(
  notifications: RouterOutputs["notification"]["getNotifications"],
) {
  // On trie les notifications par date
  const todaysNotifications = notifications.filter(
    (notif) => notif.createdAt && isToday(new Date(notif.createdAt)),
  );
  const yesterdaysNotifications = notifications.filter(
    (notif) => notif.createdAt && isYesterday(new Date(notif.createdAt)),
  );
  const olderNotifications = notifications.filter(
    (notif) =>
      notif.createdAt &&
      !isToday(new Date(notif.createdAt)) &&
      !isYesterday(new Date(notif.createdAt)),
  );

  return {
    todaysNotifications,
    yesterdaysNotifications,
    olderNotifications,
  };
}

function chooseLogo(notifType: (typeof notificationType)[number]) {
  switch (notifType) {
    case "INVITED_TO_GROUP":
      return "group_add";
    case "NEW_EVENT_TO_GROUP":
      return "event";
    case "NEW_ACTIVITY_TO_EVENT":
      return "nature_people";
    case "NEW_MESSAGES_TO_GROUP":
      return "chat";
    case "NEW_MESSAGES_TO_EVENT":
      return "forum";
    case "LAST_ONE_TO_VOTE":
      return "how_to_vote";
    case "VOTE_REMINDER":
      return "how_to_vote";
    case "EXPENSES_REMINDER":
      return "attach_money";
    default:
      return "report";
  }
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
      pusher.unsubscribe(`notifications-${userId}`);
    };
  }, [session]);

  // have the formatNotifications always up to date
  const formattedNotifications = formatNotifications(notifications);

  const notify = () =>
    toast.error(
      `TESTING : Julien vous a ajouté à un groupe ! \n` +
        " Cliquez ici pour le rejoindre. (need to remove it after completes the notif system)",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton: false,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        icon: ({ theme, type }) => (
          <span className="material-icons text-[#e74c3c]">report</span>
        ),
      },
    );

  return (
    <div className="bg-surface flex h-screen flex-col">
      {/* Header de la page notif */}
      <div
        className="bg-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between
        border-b border-inverse-surface px-4 text-inverse-primary"
      >
        <div className="flex-1 justify-between text-inverse-surface">
          <p className="text-2xl font-bold text-inverse-surface">
            Notifications
          </p>
        </div>
        <div className="flex justify-around space-x-4 pr-1 text-on-surface-variant">
          <Link
            href="/app"
            replace={true}
            passHref
            className="relative flex items-center justify-center "
          >
            <span
              style={{ fontSize: 36 }}
              className="material-icons relative text-on-surface-variant"
            >
              home
            </span>
          </Link>
          <Link
            href="profile"
            passHref
            className="relative flex items-center justify-center "
          >
            <span style={{ fontSize: 36 }} className="material-icons">
              account_circle
            </span>
          </Link>
        </div>
      </div>

      {/* Contenu de la page notif */}
      <main className="bg-surface mt-12 flex-grow overflow-y-auto overflow-x-hidden  px-2 py-4">
        <div className="notifContent">
          {/* Si aucune notification */}
          {formattedNotifications.todaysNotifications.length === 0 &&
            formattedNotifications.yesterdaysNotifications.length === 0 &&
            formattedNotifications.olderNotifications.length === 0 && (
              <div className="flex flex-grow flex-col items-center justify-center text-on-surface-variant">
                <div className="logo justify-center pt-10">
                  <span
                    style={{ fontSize: 105 }}
                    className="material-icons items-center justify-between"
                  >
                    circle_notifications
                  </span>
                </div>
                <div className="bg-surface-variant mb-4 mt-0 h-12 rounded-md px-5">
                  <h1 className="pt-2 text-xl font-bold">
                    Aucune Notification
                  </h1>
                </div>
                <div
                  className="mx-7 mb-24 mt-10 flex items-center justify-between gap-4
                rounded-md bg-on-inverse-surface px-3 py-2 text-lg text-on-surface-variant"
                >
                  <p className="text-wrap text-center text-base font-semibold">
                    {
                      "Vous n'avez pas de notification pour le moment. Lorsque vous en recevrez, elles apparaîtront ici."
                    }
                  </p>
                </div>
              </div>
            )}

          {/* Section des notifications */}
          {/* Aujourd'hui */}
          {formattedNotifications.todaysNotifications.length > 0 && (
            <>
              <div className="bg-surface-variant mb-4 mt-6 flex h-10 flex-col items-center rounded-md">
                <h1 className="pt-1 text-2xl font-semibold">{"Aujourd'hui"}</h1>
              </div>
              {formattedNotifications.todaysNotifications
                .slice()
                .reverse()
                .map((notif) => {
                  return (
                    <Link
                      key={notif.id}
                      replace={true}
                      href={notif.urlLink ?? "/notification"}
                      className="mx-3 my-3 flex items-center justify-between gap-4 rounded-md bg-on-inverse-surface px-3 py-2 text-base"
                    >
                      <span
                        style={{ fontSize: 36 }}
                        className={`material-icons pl-1 ${notif.isRead ? "text-on-secondary-container" : "text-error"}`}
                      >
                        {chooseLogo(notif.notifType)}
                      </span>
                      <div className="flex items-center space-x-2">
                        {notif.message.charAt(0).toUpperCase() +
                          notif.message.slice(1)}
                      </div>
                    </Link>
                  );
                })}
            </>
          )}

          {/* Hier */}
          {formattedNotifications.yesterdaysNotifications.length > 0 && (
            <>
              <div className="bg-surface-variant mb-4 mt-8 flex h-10 flex-col items-center rounded-md text-on-surface-variant">
                <h1 className="pt-1 text-2xl font-semibold">Hier</h1>
              </div>
              <div>
                {formattedNotifications.yesterdaysNotifications
                  .slice()
                  .reverse()
                  .map((notif) => (
                    <Link
                      key={notif.id}
                      href={notif.urlLink ?? "/app/notification"}
                      replace={true}
                      className="bg-surface-container mx-3 my-3 flex items-center justify-between gap-4 rounded-md px-3 py-2 text-lg text-inverse-surface"
                    >
                      <span
                        style={{ fontSize: 36 }}
                        className={`material-icons pl-1 ${notif.isRead ? "text-on-secondary-container" : "text-error"}`}
                      >
                        {chooseLogo(notif.notifType)}
                      </span>
                      <div
                        key={notif.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2 rounded-md px-3 text-base">
                          {notif.message.charAt(0).toUpperCase() +
                            notif.message.slice(1)}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </>
          )}

          {/* Anterieur */}
          {formattedNotifications.olderNotifications.length > 0 && (
            <>
              <div className="bg-surface-variant mb-4 mt-6 flex h-10 flex-col items-center rounded-md">
                <h2 className="pt-1 text-2xl font-semibold">Antérieur</h2>
              </div>
              {formattedNotifications.olderNotifications
                .filter((notif) => notif.createdAt !== null) // Null check
                .sort((a, b) => (a.createdAt! < b.createdAt! ? 1 : -1)) // non-null assertion operator
                .map((notif, index) => {
                  if (index < 5) {
                    return (
                      <Link
                        key={notif.id}
                        href={notif.urlLink ?? "/app/notification"}
                        replace={true}
                        className="mx-3 my-3 flex items-center justify-between gap-4 rounded-md bg-on-inverse-surface px-3 py-2 text-base text-inverse-surface"
                      >
                        <span
                          style={{ fontSize: 36 }}
                          className={`material-icons pl-1 ${notif.isRead ? "text-on-secondary-container" : "text-error"}`}
                        >
                          {chooseLogo(notif.notifType)}
                        </span>
                        <div>
                          {notif.message}
                          <span className="inline text-sm italic text-on-surface-variant">
                            {" " +
                              notif.createdAt
                                ?.toLocaleDateString("fr-FR", {
                                  weekday: "long",
                                  year: "2-digit",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                                .replace(/^\w/, (c) => c.toUpperCase())}
                          </span>
                        </div>
                      </Link>
                    );
                  } else {
                    return null;
                  }
                })}
            </>
          )}
        </div>

        <button className="mt-12" onClick={notify}>
          Notify !
        </button>
        {/* Fin du test */}

        {/* Fin de la section des notifications */}

        <div className="mt-6 justify-self-end">
          <div className="fixed bottom-0 flex w-full items-center justify-center">
            <Link
              href="/app"
              className="my-4 items-center rounded-3xl bg-inverse-primary px-10 py-3
                text-xl font-semibold text-inverse-surface"
            >
              <span>Retour</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
