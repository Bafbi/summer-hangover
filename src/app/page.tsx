import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) redirect("/app");

  return (
    <main className=" flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Summer-Hangover</h1>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </main>
  );
}
