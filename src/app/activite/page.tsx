import Link from "next/link";
import { useState } from "react";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { AppHeader } from "../_components/header";
export default async function Home() {

  const session = await getServerAuthSession();

  return (
   <>
   
      <div className="flex flex-col min-h-screen">
      <AppHeader>
    
    </AppHeader>
        <main className="bg-primary flex-grow grid grid-cols-2 gap-4 p-4">
          <Link href="/create-new" passHref>
            <div className="bg-surface-variant p-4 text-center cursor-pointer h-full w-full flex items-center justify-center">
              Créer
            </div>
          </Link>
          <Link href="/other-content-1" passHref>
            <div className="bg-surface-variant p-4 text-center cursor-pointer h-full w-full flex items-center justify-center">
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-2" passHref>
            <div className="bg-surface-variant p-4 text-center cursor-pointer h-full w-full flex items-center justify-center">
            Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-3" passHref>
            <div className="bg-surface-variant p-4 text-center cursor-pointer h-full w-full flex items-center justify-center">
                Soirée du 8/10
            </div>
          </Link>
        </main>
        <footer className="bg-surface-variant pt-0">
          <div className="flex items-center justify-between px-4 py-2">
            <button>
            <span className="material-icons">
celebration
</span>
            </button>
            <span className="mx-2 h-12 w-0.5"></span>
            <button>
            <span className="material-icons">chat</span>
            </button>
            <span className="mx-2 h-12 w-0.5"></span>
            <button>
            <span className="material-icons">
account_balance_wallet
</span>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
