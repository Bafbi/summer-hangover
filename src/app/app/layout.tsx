import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import NotifWrapper from "./(main)/_components/notifWrapper";
import { headers, cookies } from "next/headers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Créez un faux contexte pour `getServerAuthSession`
  const req = {
    headers: headers(),
    cookies: cookies(),
  } as any;
  const res = {} as any; // Vous pouvez le laisser vide car il ne sera pas utilisé

  const session = await getServerAuthSession({ req, res });
  if (session === null) {
    redirect("/auth/signin");
  }

  return (
    <>
      <NotifWrapper />
      {children}
    </>
  );
}
