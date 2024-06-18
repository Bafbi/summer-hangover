import QRCode from "react-qr-code";
import { CopyToClipboard } from "../_components/copy-to-clipboard";
import { api } from "~/trpc/server";
import { notFound, useRouter } from "next/navigation";
import { env } from "~/env";
import { useState } from "react";

export default async function GroupSettingsPage({
  params,
}: {
  params: { groupId: string };
}) {

  const group = await api.group.getGroupById({ id: +params.groupId });
  if (group === undefined) notFound();

  const inviteLink = `${env.PUBLIC_HOSTNAME}/app/invite/${group.inviteLink}`;

  const router = useRouter();


  return (
    <>
      <h1>Group settings</h1>
      <div className="flex flex-col space-x-4">
        <div className="flex flex-col space-y-4">
          <h2>Invite link</h2>
          <QRCode value={inviteLink} size={128} />
          <span>Scan to join</span>
          <div className="w-11/12 ">
            <span className="truncate">{inviteLink}</span>
            <CopyToClipboard text={inviteLink}>
              <span className="material-icons">content_copy</span>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2>Members</h2>
          <ul>
            {group.members.map((member) => (
              <li key={member.userId} className="flex justify-between items-center">
                <span>{member.user.name}</span>
              </li>
            ))}
          </ul>
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
