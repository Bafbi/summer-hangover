import QRCode from "react-qr-code";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { env } from "~/env";
import { CopyToClipboard } from "~/app/app/(main)/_components/copy-to-clipboard";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";

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
              <li key={member.userId}>
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
