import { notFound } from 'next/navigation';
import { db } from '~/server/db';
import { groups } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import InvitePageClient from '../[inviteLink]/InvitePageClient';

interface InvitePageProps {
  params: { inviteLink: string };
}

export async function generateStaticParams() {
  return [];
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { inviteLink } = params;

  const group = await db.query.groups.findFirst({
    where: (groups, { eq }) => eq(groups.inviteLink, inviteLink),
  });

  if (!group) {
    notFound();
  }

  return <InvitePageClient inviteLink={inviteLink} groupName={group.name} groupId={group.id} />;
}
