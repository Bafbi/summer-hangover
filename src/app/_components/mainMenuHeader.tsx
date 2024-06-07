"use client";
import Link from "next/link";
import { Badge } from "@mui/material";
import { api, type RouterOutputs } from "~/trpc/react";
import { useEffect, useState } from "react";

export default function AppHeader() {

  const [notifications, setNotifications] = useState<
    RouterOutputs["notification"]["getNotifications"]
  >([]);

  const { data: notificationsData } =
    api.notification.getNotifications.useQuery();

  const setAllNotifAsRead = api.notification.changeNotificationStatus.useMutation();

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);


  // Notif à afficher
  const unreadNotifications = notifications.filter((notif) => notif.isRead === false);


  return (
    <div className="bg-surface border-b border-inverse-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between px-4">
      <div className="flex-1 justify-between text-on-surface">
        <p className="text-2xl font-semibold text-on-surface">
          Summer Hangover
        </p>
      </div>
      <div className="flex justify-around space-x-4 pr-1 text-on-surface-variant">
        <Link
          href="app/notification"
          passHref
          className="relative flex items-center"
        >
          <Badge badgeContent={unreadNotifications.length} overlap="circular" color="error" sx={{ fontSize: 36 }}>
            {unreadNotifications.length <= 0 && (
              <span
                style={{ fontSize: 36 }}
                className="material-icons relative text-on-secondary-container">
                  notifications
              </span>
            )}
            {unreadNotifications.length > 0 && (
              <span
                style={{ fontSize: 36 }}
                className="material-icons relative text-on-secondary-container">
                  notifications
              </span>
            )}
          </Badge>
        </Link>
        <Link
          href="app/profile"
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
