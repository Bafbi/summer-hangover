"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function InvitePageClient({
  params,
}: {
  params: { groupId: number; inviteLink: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();

  // Pour afficher des infos sur le groupe
  const [groupInfo, setGroupInfo] = useState<{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    inviteLink: string;
    userAdmin: string;
    createdBy: { name: string };
    members: { user: { name: string } }[];
  } | null>(null);

  const groupInfoQuery = api.group.getGroupByInviteLink.useQuery({
    inviteLink: params.inviteLink,
  });

  // Pour afficher différent contenue selon que l'on ai déjà rejoins le groupe ou non
  const [hasJoined, setHasJoined] = useState(false);
  const userAlreadyInGroup = groupInfo?.members.find(
    (member) => member.user.name === session?.user?.name,
  );

  useEffect(() => {
    if (userAlreadyInGroup) {
      setHasJoined(true);
    }
  }, [userAlreadyInGroup]);

  console.log("invite link : ", groupInfo?.inviteLink);
  const customInviteLink = "/app/g/" + groupInfo?.id + "/chat";

  useEffect(() => {
    if (groupInfoQuery.data) {
      setGroupInfo(groupInfoQuery.data);
    }
  }, [groupInfoQuery.data]);

  const inviteMutation = api.group.inviteUsersToGroup.useMutation({
    onSuccess: () => router.push("/app"),
  });

  const handleAccept = () => {
    if (!groupInfo) return "error : invalid group id - cannot join group";
    inviteMutation.mutate({
      groupId: groupInfo?.id ?? 0,
      userIds: [session?.user?.id ?? "0"],
    });
    router.push("/app");
  };

  return (
    <>
      {/* Header */}
      <div
        className="bg-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between
          border-b border-inverse-surface px-4 text-inverse-primary"
      >
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
      <main className="bg-surface mt-8 flex-grow overflow-y-auto overflow-x-hidden py-4">
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
            <h1 className="pt-2 text-2xl font-bold">Rejoindre un groupe</h1>
          </div>
        </div>

        {/* Div de formulaire */}
        {/* Si l'utilisateur n'a pas encore accepté l'invitation */}
        {!hasJoined && (
          <>
            <div
              className="mx-7 mt-10 flex-col items-center justify-between gap-4
              rounded-md bg-on-inverse-surface px-3 py-2 text-lg text-on-surface-variant"
            >
              <p className="text-wrap text-center text-lg font-semibold">
                {groupInfo && (
                  <>
                    {`L'utilisateur `}
                    <span className="font-bold">
                      {groupInfo.createdBy.name}
                    </span>
                    {` vous a invité à rejoindre le groupe `}
                    <span className="font-bold underline">
                      {groupInfo.name}
                    </span>
                    {` !`}
                    <br />
                    <br />
                    <span className="text-xl font-bold">{`Que voulez-vous faire ?`}</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-wrap px-6 text-center text-xs">
                {`Il sera toujours possible de changer d'avis plus tard en consultant vos notifications.`}
              </p>
            </div>

            {/* Bouton accepter et refuser */}
            <div className="my-10 flex-col">
              <button
                onClick={handleAccept}
                className={`bg-primary-container my-4 ml-auto mt-8 flex w-5/6 cursor-pointer items-center justify-between
                space-x-0 rounded-l-xl p-4 transition-transform hover:scale-105`}
              >
                <span className="material-icons ">thumb_up</span>
                <span className="text-md font-semibold">
                  {"Accept invitation"}
                </span>
              </button>
              <Link
                href={"/app"}
                replace={true}
                className={`bg-error-container my-4 mt-8 flex w-5/6 cursor-pointer items-center justify-between
                space-x-0 rounded-r-xl p-4 transition-transform hover:scale-105`}
              >
                <span className="text-md font-semibold">
                  {"Decline invitation"}
                </span>
                <span className="material-icons ">thumb_down</span>
              </Link>
            </div>
          </>
        )}
        {/* Si l'utilisateur a déjà accepté l'invitation et qu'il reveint qq même sur la notification */}
        {hasJoined && (
          <>
            <div
              className="mx-7 mt-10 flex-col items-center justify-between gap-4
              rounded-md bg-on-inverse-surface px-3 py-2 text-lg text-on-surface-variant"
            >
              <p className="text-wrap text-center text-lg font-semibold">
                {groupInfo && (
                  <>
                    <div>
                      {"Vous avez déjà rejoins le groupe : "}
                       <strong className="font-bold underline"> {groupInfo.name}</strong>
                      {` avec succès ! `}
                    </div>
                    <br />
                    <br />
                    <span className="text-xl font-bold">{`Que voulez-vous faire ?`}</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-wrap px-6 text-center text-xs">
                {`Vous pouvez quitter un groupe en allant dans ses paramètres.`}
              </p>
            </div>

            {/* Bouton accepter et refuser */}
            <div className="my-10 flex-col">
              <Link
                href={customInviteLink || "/app"}
                replace={true}
                className={`bg-primary-container my-4 ml-auto mt-8 flex w-5/6 cursor-pointer items-center justify-between
                space-x-0 rounded-l-xl p-4 transition-transform hover:scale-105`}
              >
                <span className="material-icons ">groups</span>
                <span className="text-md font-semibold">Acceder au groupe</span>
              </Link>
              <Link
                href={"/app"}
                replace={true}
                className={`bg-error-container my-4 mt-8 flex w-5/6 cursor-pointer items-center justify-between
                space-x-0 rounded-r-xl p-4 transition-transform hover:scale-105`}
              >
                <span className="text-md font-semibold">Retour au menu</span>
                <span className="material-icons ">arrow_back</span>
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}
