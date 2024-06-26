"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwipeNavigation } from "~/app/_components/swipe-navigation";

const eventSections = ["budgets", "chat", "activities"] as const;

export function EventFooter() {
  const pathname = usePathname();
  const page = eventSections.find((section) => pathname.includes(section));
  const pageIndex = eventSections.indexOf(page ?? "chat");

  return (
    <>
      {/* <SwipeNavigation pages={eventSections} pageIndex={pageIndex} /> */}
      <footer className="bg-surface sticky bottom-0 ">
        <div className="mx-2 flex h-16 flex-row items-center justify-around border-inverse-surface">
          <Link href={`${eventSections[0]}`} replace={true}>
            <span
              className={`material-icons ${pageIndex === 0 ? "text-primary" : ""}`}
            >
              account_balance_wallet
            </span>
          </Link>

          <Link href={`${eventSections[1]}`} replace={true}>
            <span
              className={`material-icons ${pageIndex === 1 && "text-primary"}`}
            >
              chat
            </span>
          </Link>

          <Link href={`${eventSections[2]}`} replace={true}>
            <span
              className={`material-icons ${pageIndex === 2 ? "text-primary" : ""}`}
            >
              celebration
            </span>
          </Link>
        </div>
      </footer>
    </>
  );
}
