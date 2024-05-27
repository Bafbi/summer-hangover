import { GroupHeader } from "./_components/header";
import type { Metadata } from "next/types";
import { GroupFooter } from "./_components/footer";

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
  params: { groupId: string };
}) {
  return (
    <div className="bg-surface flex min-h-screen flex-col">
      <GroupHeader />

      <main className="flex-grow">{children}</main>
      <GroupFooter basePath={`/app/g/${params.groupId}/`} />
    </div>
  );
}
