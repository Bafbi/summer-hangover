"use client";
import { Badge } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

export default function AppHeader() {
  const { data: session } = useSession();
  const userIdNbr = session?.user?.id;

  const [unreadNotifications, setUnreadNotifications] = useState<
    RouterOutputs["notification"]["getUnreadNotifications"]
  >([]);

  const { data: notificationsData, refetch: refetchNotifications } =
    api.notification.getNotifications.useQuery();

  const setAllNotifAsReaded = api.notification.setAllNotifAsReaded.useMutation({
    onSuccess: async () => {
      setUnreadNotifications([]);
      await refetchNotifications();
    },
  });

  useEffect(() => {
    if (notificationsData) {
      const unreadNotificationsData = notificationsData.filter(
        (notif) => notif.isRead === false,
      );
      setUnreadNotifications(unreadNotificationsData);
    }
  }, [notificationsData]);

  const handleNotificationClick = () => {
    if (userIdNbr !== undefined) {
      console.log(`Marking notif as read for userId: ${userIdNbr}`);
      setAllNotifAsReaded.mutate({ userId: userIdNbr });
    } else {
      console.error("ERROR User ID is not valid");
    }
  };

  return (
    <div className="bg-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-inverse-surface px-4">
      <div className="flex-1 justify-between text-on-surface">
        <p className="text-2xl font-semibold text-on-surface">
          Summer Hangover
        </p>
      </div>
      <div className="flex justify-around space-x-4 pr-1 text-on-surface-variant">
        <Link
          href={"/app/notification"}
          replace={true}
          className="relative flex items-center"
          onClick={handleNotificationClick}
        >
          <Badge
            badgeContent={unreadNotifications.length}
            overlap="circular"
            color="error"
            sx={{ fontSize: 36 }}
          >
            <span
              style={{ fontSize: 36 }}
              className="material-icons relative text-on-secondary-container"
            >
              notifications
            </span>
          </Badge>
        </Link>
        <Link
          href="/app/profile"
          passHref
          className="relative flex items-center justify-center "
        >
          <span style={{ fontSize: 36 }} className="material-icons">
            account_circle
          </span>
        </Link>
      </div>
    </div>
  );
}
