import type { Metadata } from "next/types";
import { GroupFooter } from "./_components/footer";
import { GroupHeader } from "./_components/header";
import { api } from "~/trpc/server";
import { notFound, redirect } from "next/navigation";
import Error from "next/error";
import { getServerAuthSession } from "~/server/auth";

export async function generateMetadata({
  params,
}: {
  params: { groupId: string };
}): Promise<Metadata> {
  const { groupId } = params;

  return {
    title: `Groupe ${groupId}`,
  };
}

export default async function ActiviteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  const group = await api.group.getGroupById({ id: +params.groupId });
  if (group === undefined) {
    notFound();
  }
  const session = await getServerAuthSession();
  if (session === null) redirect("/login");
  if (group.members.find((m) => m.userId === session.user.id) === undefined)
    redirect("/app");
  return (
    <div className="bg-surface flex min-h-screen flex-col">
      <GroupHeader group={group} />
      <main className="flex flex-grow flex-col">{children}</main>
      <GroupFooter basePath={`/app/g/${params.groupId}/`} />
    </div>
  );
}
