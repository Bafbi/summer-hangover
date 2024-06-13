"use client";
import { formatDistanceToNow, isPast } from "date-fns";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";
import { ActivityCard } from "../_components/activity-card";

export default function Home({
  params,
}: {
  params: {
    groupId: string;
    eventId: string;
  };
}) {
  const { data: activities, refetch: refetchActivities } =
    api.activity.getActivities.useQuery({
      groupId: +params.groupId,
      eventId: +params.eventId,
    });

  const { data: event } = api.event.getEventById.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const { data: isParticipant } = api.event.isParticipant.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    RouterOutputs["activity"]["getActivities"]["activities"][0] | null
  >(null);
  const [favorite, setFavorite] = useState<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    if (activities?.vote?.activityId) setFavorite(activities?.vote?.activityId);
  }, [activities?.vote]);

  const addFavorite = api.activity.addFavorite.useMutation({
    onSuccess: async () => {
      await refetchActivities();
    },
    onError: () => {
      setFavorite(null);
    },
  });

  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (event?.endVoteDate === undefined) return;
    const interval = setInterval(() => {
      if (isPast(event.endVoteDate)) {
        setRemainingTime("Vote time is over!");
        if (canInteract) setCanInteract(false);
        return;
      }
      setRemainingTime(`${formatDistanceToNow(event.endVoteDate)} to vote!`);
      if (!canInteract && isParticipant) setCanInteract(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <>
      <main className="bg-surface">
        <div className="bg-secondary-container mx-4 flex h-9 items-center justify-center rounded">
          <span className="font-bold">{remainingTime}</span>
        </div>
        <Link
          href={"activities/new"}
          className={`bg-primary-container my-4 flex w-5/6 cursor-pointer items-center justify-between space-x-2 rounded-r-xl p-3 transition-transform hover:scale-105 ${canInteract ? "" : "pointer-events-none opacity-50"}`}
        >
          <span className="text-md font-semibold">Add an activity</span>
          <span className="material-icons ">post_add</span>
        </Link>
        {/* <div className=" float-right flex w-11/12 flex-row flex-wrap gap-2 rounded-s-lg border-y-2 border-l-2 border-dashed border-secondary p-2"> */}
        <div className=" float-right grid w-11/12 grid-cols-2 gap-2 rounded-s-lg border-inverse-surface p-2">
          {activities?.activities.map((activity) => (
            <div
              key={activity.id}
              onTouchStart={() => {
                setSelectedActivity(activity);
                timeout.current = setTimeout(() => {
                  setShowPopup(true);
                  timeout.current = null;
                }, 500);
              }}
              onTouchEnd={() => {
                if (timeout.current !== null) {
                  clearTimeout(timeout.current);

                  setFavorite(activity.id);
                  addFavorite.mutate({
                    groupId: activity.groupId,
                    eventId: activity.eventId,
                    activityId: activity.id,
                  });
                }
                if (showPopup) setShowPopup(false);
              }}
              onContextMenu={(e) => e.preventDefault()}
              className={` ${canInteract ? "" : "pointer-events-none opacity-50"}`}
            >
              <ActivityCard
                isFavorite={favorite === activity.id}
                activity={activity}
                isWinner={activities?.vote?.activityId === activity.id}
              />
            </div>
          ))}
        </div>
      </main>
      {showPopup && selectedActivity && (
        <div className="bg-secondary-container absolute bottom-0 z-10 mx-auto h-40 w-full animate-slideinBotton overflow-y-hidden rounded-t-lg">
          <div className="m-4">
            <h2 className="text-xl font-bold">{selectedActivity.name}</h2>
            <p>Lieu : {selectedActivity.location}</p>
            <p>Description : {selectedActivity.description}</p>
            <p>Créé par : {selectedActivity.createdBy.name}</p>
          </div>
        </div>
      )}
    </>
  );
}
