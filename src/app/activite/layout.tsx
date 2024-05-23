import "~/styles/globals.css";



import { AppHeader } from "../_components/header";
import Link from "next/link";
export default function ActiviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface flex flex-col min-h-screen">
        <AppHeader></AppHeader>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-surface pt-0 sticky bottom-0 w-full border-t">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center justify-center flex-grow">
              <Link href="/activite/choix">
                <span className="material-icons text-primary">
                  celebration
                </span>
              </Link>
              <span className="mx-2 h-12 w-0.5 bg-gray-300"></span>
            </div>
            
            <div className="flex items-center justify-center flex-grow">
              <Link href="/activite/chat">
                <span className="material-icons text-primary">chat</span>
              </Link>
            </div>
            
            <span className="mx-2 h-12 w-0.5 bg-gray-300"></span>

            <div className="flex items-center justify-center flex-grow">
              <Link href="/activite/finance">
                <span className="material-icons text-primary">
                  account_balance_wallet
                </span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
  );
}
