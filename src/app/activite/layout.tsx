import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

import { AppHeader } from "../_components/header";
import Link from "next/link";

export default function ActiviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface flex min-h-screen flex-col">
        <AppHeader></AppHeader>
        {children}
        <footer className="bg-surface pt-0 sticky bottom-0 w-screen border-t-2 ">
          <div className="flex items-center justify-between px-4 py-2">
            <button>
              <Link href="/activite/choix">
                <span className="material-icons text-primary  ">
                  celebration
                </span>
              </Link>
            </button>
            <span className="mx-2 h-12 w-0.5"></span>
            <button>
              <Link href="/activite/chat">
                <span className="material-icons text-primary">chat</span>
              </Link>
            </button>
            <span className="mx-2 h-12 w-0.5"></span>
            <button>
              <Link href="/activite/finance">
                <span className="material-icons text-primary">
                  account_balance_wallet
                </span>
              </Link>
            </button>
          </div>
        </footer>
      </div>
  );
}
