"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export enum GroupSection {
  CHAT = "chat",
  EVENTS = "events",
  HALLOFFAME = "hallOfFame",
}

export function GroupFooter() {
  const pathname = usePathname();

  return (
    <footer className="bg-surface sticky bottom-0 mx-2 flex h-16 flex-row items-center justify-around border-inverse-surface">
      <Link href={`${GroupSection.HALLOFFAME}`} replace={true}>
        <span
          className={`material-icons ${pathname.endsWith(GroupSection.HALLOFFAME) && "text-primary"}`}
        >
          emoji_events
        </span>
      </Link>

      <Link href={`${GroupSection.CHAT}`} replace={true}>
        <span
          className={`material-icons ${pathname.endsWith(GroupSection.CHAT) && "text-primary"}`}
        >
          chat
        </span>
      </Link>

      <Link href={`${GroupSection.EVENTS}`} replace={true}>
        <span
          className={`material-icons ${pathname.endsWith(GroupSection.EVENTS) && "text-primary"}`}
        >
          event
        </span>
      </Link>
    </footer>
  );
}
