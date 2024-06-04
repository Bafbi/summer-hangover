"use client"
import Link from "next/link";
import { api, RouterOutputs } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";

type Event = {
  date: Date;
  id: number;
  name: string;
  createdAt: Date;
  description: string | null;
  groupId: number;
  createdBy: string;
  location: string | null;
  participants: { userId: string; groupId: number; eventId: number; }[];
}

export function EventCard({ event }: { event: Event }) {

  const invitation = api.event.acceptOrDeclineEvent.useMutation({
    onSuccess: () => {
      console.log("Invitation accepted");
      
    },
  });
  const session = useSession();

  const isCurrentUserParticipant = event.participants.find((participant) => participant.userId === session.data?.user?.id) !== undefined;


  return (
    <>
      <div className="sortie flex justify-between items-center w-full">
        <Link href={`e/${event.id}`} className="bg-surface-variant max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} >
          {event.name}
        </Link>
        <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Date
        </div>
        {!isCurrentUserParticipant && (
          <button className="px-4 py-2 rounded" onClick={() => invitation.mutate({groupId: event.groupId, eventId: event.id, accepted:true})}>
            Accéder à l'événement
          </button>
        )}
      </div>
    </>
  );
}
