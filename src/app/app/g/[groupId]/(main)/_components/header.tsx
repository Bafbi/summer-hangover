"use client";

import Link from "next/link";
import { useState } from "react";
import QRCode from 'react-qr-code';

export function GroupHeader() {
  const [isInvitationOpen, setInvitationOpen] = useState(false);
  const groupLink = "http://localhost:3000/app/g/your-group-id";

  const handleInvitationClick = () => {
    setInvitationOpen(true);
  };

  const handleCloseClick = () => {
    setInvitationOpen(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(groupLink);
    alert("Lien copié dans le presse-papiers !");
  };

  return (
    <>
      <header className="bg-surface sticky top-0 z-10 mx-2 flex h-16 items-center justify-between border-b border-inverse-surface px-4">
        <Link href={"/app"} className="flex items-center">
          <span className="material-icons">home</span>
        </Link>
        <h1 className="text-xl font-bold text-primary underline">
          Sortie du 19/05
        </h1>
        <span className="cursor-pointer material-icons" onClick={handleInvitationClick}>
          mail_outline
        </span>
      </header>

      {isInvitationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-45 z-20">
          <div className="relative bg-blue-500 p-4 w-3/4 max-w-md rounded shadow-lg">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-white"
              onClick={handleCloseClick}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Inviter vos amis</h2>
            <div className="flex flex-col items-center">
              <QRCode value={groupLink} size={128} />
              <p className="mt-4 text-white">Scannez ce QR code</p>
              <p className="mt-2 text-white">ou</p>
              <p className="mt-2 text-white">copiez ce lien</p>
              <div className="mt-2 p-2 border rounded w-full text-center bg-white text-black flex items-center justify-between">
                <span className="break-words">{groupLink}</span>
                <button
                  className="ml-2 bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded"
                  onClick={handleCopyClick}
                >
                  Copier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
