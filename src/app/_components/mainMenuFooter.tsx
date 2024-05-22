import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@mui/material";

export default function MainMenuFooter() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <footer className="bg-[#1E5552] pt-0 text-[#5147d8]">
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/menu" passHref>
          <div
            className={`${
              pathname === "/menu" ? "bg-[#E49A0A] text-[#1E5552]" : ""
            } cursor-pointer rounded-full px-4 py-2`}
          >
            <Icon className="h-12 w-12">home</Icon>
          </div>
        </Link>
        <span className="bg-[#E49A0A] mx-2 h-12 w-0.5"></span>
        <Link href="/friends" passHref>
          <div
            className={`${
              pathname === "/friends" ? "bg-[#E49A0A] text-[#1E5552]" : ""
            } cursor-pointer rounded-full px-4 py-2`}
          >
            <span className="material-icons">diversity_3</span>
          </div>
        </Link>
        <span className="bg-[#E49A0A] mx-2 h-12 w-0.5"></span>
        <Link href="/profile" passHref>
          <div
            className={`${
              pathname === "/profile" ? "bg-[#E49A0A] text-[#1E5552]" : ""
            } cursor-pointer rounded-full px-4 py-2`}
          >
            <Icon className="h-12 w-12">account_circle</Icon>
          </div>
        </Link>
      </div>
    </footer>
  );
}
