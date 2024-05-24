import "~/styles/globals.css";

import { AppHeader } from "../_components/header";
import Link from "next/link";
export default function ActiviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface flex min-h-screen flex-col overflow-x-hidden">
      <AppHeader></AppHeader>
      <div className="bg-surface flex-grow"> {children}</div>
      <footer className="bg-surface sticky bottom-0 mx-2 flex h-16 flex-row items-center justify-around border-t border-inverse-surface">
        <Link href="/activite/choix">
          <span className="material-icons">celebration</span>
        </Link>

        <Link href="/activite/chat">
          <span className="material-icons ">chat</span>
        </Link>

        <Link href="/activite/finance">
          <span className="material-icons ">account_balance_wallet</span>
        </Link>
      </footer>
    </div>
  );
}
