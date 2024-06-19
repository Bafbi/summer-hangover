import { notFound } from "next/navigation";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "~/app/app/(main)/_components/copy-to-clipboard";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import { env } from "~/env";
import { api } from "~/trpc/server";
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
      <h1 className="sortie bg-surface-variant mt-2 flex w-full flex-col items-center justify-between text-xl font-bold">
        Group settings
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="space-y-6 text-xl">Invite link</h2>
          <QRCode value={inviteLink} size={128} />
          <span>Scan to join</span>
          <div className="flex w-11/12 items-center justify-center">
            <span className="truncate">{inviteLink}</span>
            <CopyToClipboard text={inviteLink}>
              <span className="material-icons">content_copy</span>
            </CopyToClipboard>
          </div>
        </div>
        <div>
          <h2 className="sortie bg-surface-variant mt-2 flex w-full flex-col items-center justify-between text-xl font-bold">
            Members
          </h2>
          <ul className="flex w-11/12 flex-col items-center">
            {group.members.map((member) => (
              <li
                key={member.userId}
                className="flex items-center justify-between"
              >
                <span>{member.user.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <LeaveGroup groupId={+params.groupId} />
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
