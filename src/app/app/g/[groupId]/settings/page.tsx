import { notFound } from "next/navigation";
import QRCode from "react-qr-code";
import { api } from "~/trpc/server";
import { env } from "~/env";
import { CopyToClipboard } from "~/app/app/(main)/_components/copy-to-clipboard";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import LeaveGroup from "../(main)/_components/leave-group";
import RemoveUser from "../(main)/_components/remove-user";
import { getServerAuthSession } from "~/server/auth";
import UpdateAdmin from "../(main)/_components/update-admin";
import RemoveGroup from "../(main)/_components/delete-group";

export default async function GroupSettingsPage({
  params,
}: {
  params: { groupId: string };
}) {
  const session = await getServerAuthSession();
  const group = await api.group.getGroupById({ id: +params.groupId });

  let isAdmin = false;
  if (session?.user.id == group?.userAdmin) {
    isAdmin = true;
  }
  console.log(session?.user);
  console.log(isAdmin);
  if (group === undefined) notFound();

  const inviteLink = `${env.PUBLIC_HOSTNAME}/app/invite/${group.inviteLink}`;
  const currentUser = group.members.find(member => member.userId === session?.user.id);
  const otherMembers = group.members.filter(member => member.userId !== session?.user.id);

  return (
    <>
      <NewFormHeader title={`Settings for ${group.name}`} backLink="chat" />
      <h1 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">
        Group settings
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="space-y-6 text-xl">Invite link</h2>
          <QRCode value={inviteLink} size={128} />
          <span>Scan to join</span>
          <div className="w-11/12 flex items-center justify-center">
            <span className="truncate">{inviteLink}</span>
            <CopyToClipboard text={inviteLink}>
              <span className="material-icons">content_copy</span>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex flex-col">
          {isAdmin && <RemoveGroup groupId={+params.groupId} />}
        </div>
        <div>
          <h2 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">
            Members
          </h2>
          <ul className="w-full flex flex-col items-center max-h-60 overflow-y-auto">
            {currentUser && (
              <li key={currentUser.userId} className="flex justify-between items-center text-xl p-4 w-full">
                <span>{currentUser.user.name}</span>
              </li>
            )}
            {otherMembers.map((member) => (
              <li key={member.userId} className="flex justify-between items-center text-xl p-4 border-t-2 w-full">
                <span>{member.user.name}</span>
                {isAdmin && (
                  <div className="flex space-x-4 ml-auto">
                    <RemoveUser groupId={+params.groupId} userId={+member.userId} />
                    <UpdateAdmin groupId={+params.groupId} userId={+member.userId} />
                  </div>
                )}
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
