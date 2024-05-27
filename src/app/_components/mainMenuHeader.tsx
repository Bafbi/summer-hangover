import * as React from "react";
import { useState } from "react";
import Link from "next/link";

export default function MainMenuHeader() {
  return (
    <div className="bg-surface-variant fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between px-4 text-inverse-primary">
      <div className="flex-1 justify-between text-on-surface">
        <p className="text-2xl text-on-surface subpixel-antialiased">
          Summer Hangover
        </p>
      </div>
      <div className="flex justify-around space-x-7 pr-1 text-on-surface-variant">
        <div className="relative flex items-center justify-center ">
          <Link href="/notifications">
            <span
              style={{ fontSize: 36 }}
              className="material-icons animate-shake relative ml-4 mt-2 animate-ping cursor-pointer text-[#FF3040]"
            >
              notifications
            </span>
          </Link>
        </div>

        <span style={{ fontSize: 36 }} className=" material-icons mt-2">
          account_circle
        </span>
      </div>
    </div>
  );
}