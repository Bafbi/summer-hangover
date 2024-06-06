import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (session === null) redirect("/api/auth/signin");

  return <>{children}</>;
}
