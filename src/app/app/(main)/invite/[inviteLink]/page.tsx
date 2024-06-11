"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { api } from '~/trpc/react';
import { groups } from '~/server/db/schema';

export default function InvitePageClient({ params }: { params: { groupId: number, inviteLink: string } }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [groupInfo, setGroupInfo] = useState<{
    id: number; name: string; description: string | null; createdAt: Date;
    userAdmin: string; createdBy: { name: string }; members: { user: { name: string } }[];
  } | null>(null);

  const groupInfoQuery = api.group.getGroupByInviteLink.useQuery({ inviteLink: params.inviteLink });
  console.log(groupInfoQuery);

  useEffect(() => {
    if (groupInfoQuery.data) {
      setGroupInfo(groupInfoQuery.data);
    }
  }, [groupInfoQuery.data]);

  const inviteMutation = api.group.inviteUsersToGroup.useMutation({ onSuccess: () => router.push("/app") });

  const handleAccept =  () => {
    if (!groupInfo) return "error : invalid group id - cannot join group";
    inviteMutation.mutate({ groupId: groupInfo?.id || 0, userIds: [session?.user?.id || "0"] });
  }


  return (
    <>
      {/* Header */}
      <div className="bg-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between
          px-4 text-inverse-primary border-b border-inverse-surface">
          <div className="flex-1 justify-between text-inverse-surface">
            <p className="text-2xl font-bold text-inverse-surface">
              Rejoindre un groupe
            </p>
          </div>
          <div className="flex justify-around space-x-4 pr-1 text-on-surface-variant">
            <Link
              href="/app"
              replace={true}
              passHref
              className="relative flex items-center justify-center "
            >
              <span
                style={{ fontSize: 36 }}
                className="material-icons relative text-on-surface-variant"
              >
                home
              </span>
            </Link>
            <Link
              href="profile"
              passHref
              className="relative flex items-center justify-center "
            >
              <span style={{ fontSize: 36 }} className="material-icons">
                account_circle
              </span>
            </Link>
          </div>
      </div>

      {/* Main content */}
      <main className='bg-surface mt-8 flex-grow overflow-y-auto overflow-x-hidden py-4'>
        {/* Div de logo + titre */}
        <div className="flex flex-grow flex-col items-center justify-center text-on-surface-variant">
          <div className="logo justify-center pt-10">
            <span
              style={{ fontSize: 130 }}
              className="material-icons items-center justify-between"
            >
              handshake
            </span>
          </div>
          <div className="bg-surface-variant mb-4 mt-0 h-12 rounded-md px-5">
            <h1 className="pt-2 text-2xl font-bold">
              Rejoindre un groupe
            </h1>
          </div>
        </div>
        {/* Div de formulaire */}
        <div
          className="mx-7 mt-10 flex-col items-center justify-between gap-4
          rounded-md bg-on-inverse-surface px-3 py-2 text-lg text-on-surface-variant">
          <p className="text-wrap text-center text-lg font-semibold">
            {groupInfo && (
                <>
                  {`L'utilisateur `}
                  <span className="font-bold">{groupInfo.createdBy.name}</span>
                  {` vous a invité à rejoindre le groupe `}
                  <span className="font-bold underline">{groupInfo.name}</span>
                  {` !`}
                  <br /><br/>
                  <span className="font-bold text-xl">{`Que voulez-vous faire ?`}</span>
                </>
              )}
          </p>
          <p className="text-wrap text-center mt-1 text-xs px-6">
            {
              `Il sera toujours possible de changer d'avis plus tard en consultant vos notifications.`
            }
          </p>
        </div>

        {/* Bouton accepter et refuser */}
        <div className='flex-col my-10'>
          <button
            onClick={handleAccept}
            className={`bg-primary-container ml-auto my-4 mt-8 flex w-5/6 cursor-pointer items-center justify-between 
            space-x-0 rounded-l-xl p-4 transition-transform hover:scale-105`}
          >
            <span className="material-icons ">thumb_up</span>
            <span className="text-md font-semibold">Accepter l'invitation</span>
          </button>
          <Link
            href={"/app"}
            replace={true}
            className={`bg-primary-container my-4 mt-8 flex w-5/6 cursor-pointer items-center justify-between 
            space-x-0 rounded-r-xl p-4 transition-transform hover:scale-105`}
          >
            <span className="text-md font-semibold">Décliner l'invitation</span>
            <span className="material-icons ">thumb_down</span>
          </Link>
        </div>
      </main>
    </>
  );
}