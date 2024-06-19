import type { Metadata } from "next/types";
import { EventFooter } from "./_components/footer";
import { EventHeader } from "./_components/header";
import { api } from "~/trpc/server";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export async function generateMetadata({
  params,
}: {
  params: { groupId: string; eventId: string };
}): Promise<Metadata> {
  const group = await api.group.getGroupById({ id: +params.groupId });
  if (group === undefined) {
    return {
      title: "Group not found",
    };
  }
  const event = await api.event.getEventById({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });
  if (event === undefined) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: `Summer-Hangover | ${group.name} | ${event.name}`,
  };
}

export default async function ActiviteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string; eventId: string };
}) {
  const event = await api.event.getEventById({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });
  if (event === undefined) {
    notFound();
  }
  const session = await getServerAuthSession();
  if (session === null) redirect("/login");
  if (
    event.group.members.find((g) => g.userId === session.user.id) === undefined
  )
    redirect("/app");

  return (
    <div className="bg-surface flex min-h-screen flex-col">
      <EventHeader backPath={`/app/g/${params.groupId}`} event={event} />
      <main className="flex flex-grow flex-col">{children}</main>
      <EventFooter />
    </div>
  );
}
