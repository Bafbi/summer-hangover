"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export enum EventSection {
  CHAT = "",
  ACTIVITIES = "activities",
  BUDGETS = "budgets",
}

export function EventFooter({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  return (
    <footer className="bg-surface sticky bottom-0 mx-2 flex h-16 flex-row items-center justify-around border-t border-inverse-surface">
      <Link href={`${basePath}/${EventSection.BUDGETS}`}>
        <span
          className={`material-icons ${pathname.endsWith(EventSection.BUDGETS) ? "text-primary" : ""}`}
        >
          account_balance_wallet
        </span>
      </Link>

      <Link href={`${basePath}/`}>
        <span
          className={`material-icons ${!pathname.endsWith(EventSection.ACTIVITIES) && !pathname.endsWith(EventSection.BUDGETS) && "text-primary"}`}
        >
          chat
        </span>
      </Link>

      <Link href={`${basePath}/${EventSection.ACTIVITIES}`}>
        <span
          className={`material-icons ${pathname.endsWith(EventSection.ACTIVITIES) ? "text-primary" : ""}`}
        >
          celebration
        </span>
      </Link>
    </footer>
  );
}
