"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { api } from "~/trpc/react";

type Event = {
  date: Date;
  id: number;
  name: string;
  createdAt: Date;
  description: string | null;
  groupId: number;
  createdBy: string;
  location: string | null;
  participants: { userId: string; groupId: number; eventId: number }[];
};


export function EventCard({ event }: { event: Event }) {
  const session = useSession();
  const isCurrentUserParticipant =
    event.participants.find(
      (participant) => participant.userId === session.data?.user?.id,
    ) !== undefined;

  const [newInvitation, setNewInvitation] = useState(false);

  const invitation = api.event.acceptOrDeclineEvent.useMutation({
    onSuccess: () => {
      console.log("Invitation accepted");
      
    },
    onError: () => {
      setNewInvitation(false);
    },
  });

  useEffect(() => {
    setNewInvitation(isCurrentUserParticipant);
  }, [isCurrentUserParticipant]);


  return (
    <>
      <div className="sortie flex w-full items-center justify-between">
        <Link
          href={`e/${event.id}`}
          className="bg-surface-variant my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105"
          style={{ minHeight: "60px" }}
        >
          {event.name}
        </Link>
        {(
          <label className="flex items-center space-x-2">
            <input
              type="checkbox" 
              checked= {newInvitation}
              onChange={(e) =>{
                setNewInvitation(e.target.checked);
                invitation.mutate({
                  groupId: event.groupId,
                  eventId: event.id,
                  accepted: e.target.checked,
                })}
               
              }
            />
            <span>{"Dispo"}</span>
          </label>
        )}
       
        <div
          className="bg-surface-variant my-4 w-1/6 max-w-xs flex-initial cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105"
          style={{
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Date
        </div>
       
      </div>
    </>
  );
}
