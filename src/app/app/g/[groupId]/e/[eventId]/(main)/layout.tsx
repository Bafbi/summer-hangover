import type { Metadata } from "next/types";
import { EventFooter } from "./_components/footer";
import { EventHeader } from "./_components/header";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

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
  params: { groupId: string; eventId: string };
}) {
  const event = await api.event.getEventById({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });
  if (event === undefined) {
    notFound();
  }

  return (
    <div className="bg-surface flex min-h-screen flex-col">
      <EventHeader backPath={`/app/g/${params.groupId}/chat`} event={event} />
      <main className="flex flex-grow flex-col">{children}</main>
      <EventFooter />
    </div>
  );
}
