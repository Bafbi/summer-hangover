"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { api } from "~/trpc/react";

export function GroupHeader({ groupId }: { groupId: number }) {
  const [isInvitationOpen, setInvitationOpen] = useState(false);
  const [groupLink, setGroupLink] = useState("");
  const [groupName, setGroupName] = useState("");

  const { data: groupData, isLoading } = api.group.getGroupById.useQuery({
    id: groupId,
  });

  useEffect(() => {
    if (groupData) {
      setGroupLink(groupData.inviteLink);
      setGroupName(groupData.name);
      console.log("Group Data:", groupData); // Log group data for debugging
    }
  }, [groupData]);

  const handleInvitationClick = () => {
    setInvitationOpen(true);
  };

  const handleCloseClick = () => {
    setInvitationOpen(false);
  };

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:3000/app/invite/${groupLink}`,
    );
    alert("Lien copié dans le presse-papiers !");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <header className="bg-surface sticky top-0 z-10 mx-2 flex h-16 items-center justify-between border-b border-inverse-surface px-4">
        <Link href={"/app"} className="flex items-center">
          <span className="material-icons">home</span>
        </Link>
        <h1 className="text-xl font-bold text-primary underline">
          {groupName}
        </h1>
        <span
          className="material-icons cursor-pointer"
          onClick={handleInvitationClick}
        >
          mail_outline
        </span>
      </header>

      {isInvitationOpen && (
        <div className="bg-gray-600 fixed inset-0 z-20 flex items-center justify-center bg-opacity-45">
          <div className="bg-blue-500 relative w-3/4 max-w-md rounded p-4 shadow-lg">
            <button
              className="absolute right-2 top-2 text-2xl font-bold text-white"
              onClick={handleCloseClick}
            >
              &times;
            </button>
            <h2 className="mb-4 text-2xl font-bold text-white">
              Inviter vos amis
            </h2>
            <div className="flex flex-col items-center">
              <QRCode
                value={`http://localhost:3000/app/invite/${groupLink}`}
                size={128}
              />
              <p className="mt-4 text-white">Scannez ce QR code</p>
              <p className="mt-2 text-white">ou</p>
              <p className="mt-2 text-white">copiez ce lien</p>
              <div className="mt-2 flex w-full items-center justify-between rounded border bg-white p-2 text-center text-black">
                <span className="break-words">
                  {" "}
                  {`http://localhost:3000/app/invite/${groupLink}`}
                </span>
                <button className="ml-2" onClick={handleCopyClick}>
                  <span className="material-icons">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
