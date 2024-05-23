import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@mui/material";

export default function MainMenuHeader() {
  return (
    <div className="bg-surface-variant flex h-16 items-center justify-between px-4 text-inverse-primary">
      <div className="flex-1 justify-between text-on-surface">
        <p className="text-2xl text-on-surface subpixel-antialiased">
          Summer Hangover
        </p>
      </div>
      <div className="flex justify-around space-x-7 pr-1 text-on-surface-variant">
        <div className="relative flex items-center justify-center">
          <Icon
            style={{ fontSize: 35 }}
            className="animate-shake relative text-error"
          >
            notifications
          </Icon>
        </div>

        <Icon style={{ fontSize: 34 }}>settings</Icon>
      </div>
    </div>
  );
}
