import QRCode from "react-qr-code";
import { api } from "~/trpc/server";
import { notFound} from "next/navigation";
import { env } from "~/env";
import { useState } from "react";
import { CopyToClipboard } from "~/app/app/(main)/_components/copy-to-clipboard";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import LeaveGroup from "../(main)/_components/leave-group";

export default async function GroupSettingsPage({
  params,
}: {
  params: { groupId: string };
}) {

  const group = await api.group.getGroupById({ id: +params.groupId });
  if (group === undefined) notFound();

  const inviteLink = `${env.PUBLIC_HOSTNAME}/app/invite/${group.inviteLink}`;

  return (
    <>
      <NewFormHeader title={`Settings for ${group.name}`} backLink="chat" />
      <h1 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">Group settings</h1>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 text-center items-center">
          <h2 className="text-xl space-y-6">Invite link</h2>
          <QRCode value={inviteLink} size={128} />
          <span >Scan to join</span>
          <div className="w-11/12 flex items-center justify-center">
            <span className="truncate">{inviteLink}</span>
            <CopyToClipboard text={inviteLink}>
              <span className="material-icons">content_copy</span>
            </CopyToClipboard>
          </div>
        </div>
        <div>
          <h2 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">Members</h2>
          <ul className="w-11/12 flex flex-col items-center">
            {group.members.map((member) => (
              <li key={member.userId} className="flex justify-between items-center">
                <span>{member.user.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
        <LeaveGroup groupId={+params.groupId}/>
        </div>
      </div>
    </>
  );
}

// <QRCode value={inviteLink} size={128} />
// <span>Scan to join</span>
// <div className="w-11/12 ">
//   <span className="truncate">{inviteLink}</span>
//   <CopyToClipboard text={inviteLink}>
//     <span className="material-icons">content_copy</span>
//   </CopyToClipboard>
// </div>
