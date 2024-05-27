"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export enum GroupSection {
  CHAT = "",
  EVENTS = "events",
  HALLOFFAME = "hallOfFame",
}

export function GroupFooter({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  return (
    <footer className="bg-surface sticky bottom-0 mx-2 flex h-16 flex-row items-center justify-around border-t border-inverse-surface">
      <Link href={`${basePath}/hallOfFame`}>
        <span
          className={`material-icons ${pathname.endsWith(GroupSection.HALLOFFAME) ? "text-primary" : ""}`}
        >
          celebration
        </span>
      </Link>

      <Link href={`${basePath}/`}>
        <span
          className={`material-icons ${!pathname.endsWith(GroupSection.HALLOFFAME) && !pathname.endsWith(GroupSection.EVENTS) && "text-primary"}`}
        >
          chat
        </span>
      </Link>

      <Link href={`${basePath}/events`}>
        <span
          className={`material-icons ${pathname.endsWith(GroupSection.EVENTS) ? "text-primary" : ""}`}
        >
          account_balance_wallet
        </span>
      </Link>
    </footer>
  );
}
