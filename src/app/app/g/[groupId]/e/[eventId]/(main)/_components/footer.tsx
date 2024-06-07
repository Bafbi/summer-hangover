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
    <footer className="bg-surface sticky bottom-0 ">
      <div className="mx-2 flex h-16 flex-row items-center justify-around border-inverse-surface">
        <Link href={`${basePath}/${EventSection.BUDGETS}`}>
          <span
            className={`material-icons ${pathname.includes(EventSection.BUDGETS) ? "text-primary" : ""}`}
          >
            account_balance_wallet
          </span>
        </Link>

        <Link href={`${basePath}/`}>
          <span
            className={`material-icons ${!pathname.includes(EventSection.ACTIVITIES) && !pathname.includes(EventSection.BUDGETS) && "text-primary"}`}
          >
            chat
          </span>
        </Link>

        <Link href={`${basePath}/${EventSection.ACTIVITIES}`}>
          <span
            className={`material-icons ${pathname.includes(EventSection.ACTIVITIES) ? "text-primary" : ""}`}
          >
            celebration
          </span>
        </Link>
      </div>
    </footer>
  );
}
