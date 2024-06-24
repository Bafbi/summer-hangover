import Link from "next/link";
import { api } from "~/trpc/server";

export async function AppHeader() {
  const isAdmin = await api.admin.isUserAnAdmin();
  return (
    <header className="bg-surface sticky top-0 z-10 ">
      <div className="mx-2 flex h-16 items-center justify-between border-inverse-surface  px-4">
        <span></span>
        {isAdmin && (
          <Link
            href="admin"
            className="relative flex items-center justify-center"
          >
            <span style={{ fontSize: 42 }} className="material-icons">
              bar_chart
            </span>
          </Link>
        )}
        <h1 className="text-xl font-bold text-primary underline">
          {"Summer-Hangover"}
        </h1>
        <Link
          href="profile"
          passHref
          className="relative flex items-center justify-center "
        >
          <span style={{ fontSize: 36 }} className="material-icons">
            account_circle
          </span>
        </Link>
      </div>
    </header>
  );
}
