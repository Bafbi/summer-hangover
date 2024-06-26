"use client";

import { Badge } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";

export function NotifivationSection() {
  const pathname = usePathname();
  const isSelected = pathname.includes("notifications");

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
        <span
          className={`material-icons relative ${isSelected ? "text-primary" : ""}`}
        >
          notifications
        </span>
      </Badge>
    </Link>
  );
}
