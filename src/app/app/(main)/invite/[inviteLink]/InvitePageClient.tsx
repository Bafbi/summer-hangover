"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface InvitePageClientProps {
  inviteLink: string;
  groupName: string;
  groupId: number;
}

export default function InvitePageClient({ inviteLink, groupName, groupId }: InvitePageClientProps) {
  const { data: sessionData } = useSession({ required: true });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleAcceptInvite = async () => {
    try {
      console.log("Sending request to accept invite:", inviteLink);

      const response = await fetch(`/api/invite/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteLink }),
      });

      console.log("Response received:", response);

      if (response.ok) {
        router.push(`/g/${groupId}`);
      } else {
        const responseData = await response.json();
        setError(responseData.error || 'Failed to accept invite');
        console.error('Failed to accept invite:', responseData);
      }
    } catch (error) {
      console.error('Error accepting invite:', error);
      setError('Error accepting invite');
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
        {error && <p className="text-red-500">{error}</p>}
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
}
