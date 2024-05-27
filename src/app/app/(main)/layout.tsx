import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import { getServerAuthSession } from "~/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainMenuHeader />
      <main>{children}</main>
    </>
  );
}
