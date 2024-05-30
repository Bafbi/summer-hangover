import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { db } from "~/server/db";
import { groups, inviteLinks, users, groupsMembers } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId = context.params?.groupId as string;
  const inviteLink = await db.query.inviteLinks.findFirst({
    where: (inviteLinks, { eq }) => eq(inviteLinks.link, groupId),
  });

  if (!inviteLink) {
    return {
      notFound: true,
    };
  }

  const group = await db.query.groups.findFirst({
    where: (groups, { eq }) => eq(groups.id, inviteLink.groupId),
  });

  if (!group) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      groupId,
      groupName: group.name,
    },
  };
};

const InvitePage: NextPage<{ groupId: string; groupName: string }> = ({ groupId, groupName }) => {
  const { data: sessionData } = useSession({ required: true });
  const router = useRouter();

  const handleAcceptInvite = async () => {
    try {
      // Assuming you have an API route to handle accepting invites
      await fetch(`/api/invite/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId }),
      });

      router.push(`/g/${groupId}`);
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#40534D]">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-[#E49A0A]">SUMMER TRIP</h1>
        <p className="text-2xl font-semibold text-[#E49A0A]">Invitation</p>
        <p className="text-2xl font-semibold text-[#E49A0A]">
          Vous avez été invité à rejoindre le groupe {groupName}
        </p>
        <div className="flex gap-4">
          <button
            className="rounded-lg bg-[#1E5552] px-4 py-2 text-lg font-semibold text-[#E49A0A] hover:bg-[#1CCDB3]"
            onClick={handleAcceptInvite}
          >
            Oui
          </button>
          <button
            className="rounded-lg bg-[#E49A0A] px-4 py-2 text-lg font-semibold text-[#1E5552] hover:bg-[#FFA500]"
            onClick={() => router.push("/")}
          >
            Non
          </button>
        </div>
      </div>
    </main>
  );
};

export default InvitePage;
