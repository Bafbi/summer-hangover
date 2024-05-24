import * as React from "react";
import Link from "next/link";

interface MainMenuFooterProps {
  pathname: string;
}

export default function MainMenuFooter({
  pathname,
}: Readonly<MainMenuFooterProps>) {
  return (
    <footer className="bg-surface-variant flex h-16 pt-0 text-on-surface-variant">
      <div className="flex h-full w-full items-center justify-between px-4">
        <Link href="/menu" passHref>
          <div
            className={`${
              pathname === "menu" ? "bg-[#E49A0A] text-inverse-primary" : ""
            } flex cursor-pointer items-center justify-center rounded-full p-2 pl-7`}
          >
            <span className="material-icons">home</span>
          </div>
        </Link>
        <span className="mx-2 h-10 w-0.5 rounded-md bg-outline-variant"></span>
        <Link href="/friends" passHref>
          <div
            className={`${
              pathname === "friends" ? "bg-[#E49A0A] text-inverse-primary" : ""
            } flex cursor-pointer items-center justify-center rounded-full p-2`}
          >
            <span className="material-icons">group</span>
          </div>
        </Link>
        <span className="mx-2 h-10 w-0.5 rounded-md bg-outline-variant"></span>
        <Link href="/profile" passHref>
          <div
            className={`${
              pathname === "profile" ? "bg-[#E49A0A] text-inverse-primary" : ""
            } flex cursor-pointer items-center justify-center rounded-full p-2 pr-7`}
          >
            <span className="material-icons">account_circle</span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
