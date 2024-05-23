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
        <header className="sticky top-0 z-10 w-full ">
        <AppHeader />
      </header>
        <main className="flex-grow">
        {children}
      </main>
        <footer className="bg-surface pt-0 sticky bottom-0 w-screen border-t">
          <div className="flex items-center justify-between px-4 py-2">
            <button>
              <Link href="/group/hallOfFame">
                <span className="material-icons text-primary">emoji_events</span>
              </Link>
            </button>
            <span className="mx-2 h-12 w-0.5"></span>
            <button>
              <Link href="/group/chat">
                <span className="material-icons text-primary">chat</span>
              </Link>
            </button>
            <span className="mx-2 h-12 w-0.5"></span>
            <button>
              <Link href="/group/sorties">
                <span className="material-icons text-primary">list</span>
              </Link>
            </button>
          </div>
        </footer>
      </div>
  );
}