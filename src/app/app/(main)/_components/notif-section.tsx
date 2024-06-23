"use client";

import { Badge } from "@mui/material";
import Link from "next/link";
import { api } from "~/trpc/react";

export function NotifivationSection() {
  const { data: notifications, refetch } =
    api.notification.getNotifications.useQuery();

  const unreadNotifications = notifications?.filter(
    (notification) => !notification.isRead,
  );

  const setAsRead = api.notification.setAllNotifAsReaded.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <Link
      href={"/app/notifications"}
      replace={false}
      className="relative flex items-center"
      onClick={() => {
        setAsRead.mutate();
      }}
    >
      <Badge
        badgeContent={unreadNotifications?.length}
        overlap="circular"
        color="error"
        sx={{ fontSize: 36 }}
      >
        <span className="material-icons relative">notifications</span>
      </Badge>
    </Link>
  );
}
