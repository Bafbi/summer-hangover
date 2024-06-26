"use client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

export function EventCard({
  event,
}: {
  event: RouterOutputs["event"]["getEvents"][0];
}) {
  const session = useSession();
  const isCurrentUserParticipant =
    event.participants.find(
      (participant) => participant.userId === session.data?.user?.id,
    ) !== undefined;

  console.log(
    `isCurrentUserParticipant: ${isCurrentUserParticipant} for event ${event.id}`,
  );

  const [participate, setParticipate] = useState<boolean | null>(null);

  const invitation = api.event.acceptOrDeclineEvent.useMutation({
    onMutate: (variable) => {
      setParticipate(variable.accepted);
    },

    onError: () => {
      setParticipate(isCurrentUserParticipant);
    },
  });

  useEffect(() => {
    setParticipate(isCurrentUserParticipant);
  }, [isCurrentUserParticipant]);

  return (
    <>
      <div className="sortie flex w-full items-center justify-between gap-8">
        <Link
          href={`e/${event.id}`}
          className="bg-surface-variant flex flex-grow  flex-col  justify-start  rounded-e-xl p-2"
          style={{ minHeight: "60px" }}
        >
          <span>{event.name}</span>
          <span className="text-outline">
            {format(event.date, "dd/MM/yyyy")}
          </span>
        </Link>
        {
          <>
            <div
              className={`flex min-w-28 justify-center rounded-s-lg p-2  ${!participate ? "bg-negatif" : "bg-positif"} `}
            >
              <button
                className="text-center"
                onClick={() => {
                  setParticipate(!participate);
                  invitation.mutate({
                    groupId: event.groupId,
                    eventId: event.id,
                    accepted: !participate,
                  });
                }}
              >
                {participate === null
                  ? "..."
                  : participate
                    ? "Participate"
                    : "Not Participate"}
              </button>
            </div>
          </>
        }
      </div>
    </>
  );
}
