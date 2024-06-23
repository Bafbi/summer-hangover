"use client";
import { format } from "date-fns";
import { is } from "drizzle-orm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  /*
  useEffect(() => {
    if (isCurrentUserParticipant) {
      setNewInvitation(isCurrentUserParticipant);
    }
  }, [isCurrentUserParticipant]);
  */

  return (
    <>
      <div className="sortie flex w-full items-center justify-between">
        <Link
          href={`e/${event.id}`}
          className="bg-surface-variant my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105"
          style={{ minHeight: "60px" }}
        >
          {event.name}
          <br />
          {format(event.date, "dd/MM/yyyy")}
        </Link>
        {
          <>
            <div
              className={` my-4 min-h-10 w-1/4 max-w-xs flex-initial cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105 ${!newInvitation ? "bg-negatif" : "bg-positif"}`}
            >
              <button
                onClick={() => {
                  setNewInvitation(!newInvitation);
                  invitation.mutate({
                    groupId: event.groupId,
                    eventId: event.id,
                    accepted: !newInvitation,
                  });
                }}
              >
                <span className="px-5">
                  {!newInvitation ? "Declined" : "Accepted"}
                </span>
              </button>
            </div>
          </>
        }
      </div>
    </>
  );
}
