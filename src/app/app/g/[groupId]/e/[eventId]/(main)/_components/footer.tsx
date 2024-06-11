"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export enum EventSection {
  CHAT = "chat",
  ACTIVITIES = "activities",
  BUDGETS = "budgets",
}

export function EventFooter() {
  const pathname = usePathname();

  return (
    <footer className="bg-surface sticky bottom-0 ">
      <div className="mx-2 flex h-16 flex-row items-center justify-around border-inverse-surface">
        <Link href={`${EventSection.BUDGETS}`} replace={true}>
          <span
            className={`material-icons ${pathname.includes(EventSection.BUDGETS) ? "text-primary" : ""}`}
          >
            account_balance_wallet
          </span>
        </Link>

        <Link href={`${EventSection.CHAT}`} replace={true}>
          <span
            className={`material-icons ${pathname.includes(EventSection.CHAT) && "text-primary"}`}
          >
            chat
          </span>
        </Link>

        <Link href={`${EventSection.ACTIVITIES}`} replace={true}>
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
