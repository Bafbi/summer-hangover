import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import NotifWrapper from "./(main)/_components/notifWrapper";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerAuthSession();
  if (session === null) redirect("/api/auth/signin");

  return (
    <>
      <NotifWrapper />
      <div className="bg-surface flex min-h-screen flex-col">{children}</div>
    </>
  );
}
