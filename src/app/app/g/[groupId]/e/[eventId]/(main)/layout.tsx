import { EventHeader } from "./_components/header";
import type { Metadata } from "next/types";
import { EventFooter } from "./_components/footer";

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

export default function ActiviteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupId: string; eventId: string };
}) {
  return (
    <div className="bg-surface flex min-h-screen flex-col">
      <EventHeader />
      <main className="flex-grow">{children}</main>
      <EventFooter basePath={`/app/g/${params.groupId}/e/${params.eventId}`} />
    </div>
  );
}
