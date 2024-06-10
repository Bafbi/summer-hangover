"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { type Activity, ActivityCard } from "../_components/activity-card";

export default function Home({
  params,
}: {
  params: {
    groupId: string;
    eventId: string;
  };

  
}) {
  const { data: activities } = api.activity.getActivities.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const {data : event} = api.event.getEventById.useQuery({
    groupId: +params.groupId, 
    eventId: +params.eventId
  });

  const { data: isParticipant } = api.event.isParticipant.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [favorite, setFavorite] = useState<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activities?.vote?.activityId) setFavorite(activities?.vote?.activityId);
  }, [activities?.vote]);

  const router = useRouter();
  const addFavorite = api.activity.addFavorite.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      setFavorite(null);
    },
  });

//return the activity with the most votes
  
  

  const [remainingTime, setRemainingTime] = useState("");
  const [timeDiff, setTimeDiff] = useState<number>();
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (event?.endVoteDate === undefined) {
          return;
        }
        const endDateTime = event.endVoteDate; // Replace with your endDateTime
        const currentTime = new Date();
        const timeDiff = endDateTime.getTime() - currentTime.getTime();
        setTimeDiff(timeDiff);
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
          if (days > 0) {
            setRemainingTime(`Vote time: ${days}d ${hours}h ${minutes}m to vote!`);
          } else if (hours > 0) {
            setRemainingTime(`Vote time: ${hours}h ${minutes}m to vote!`);
           } else if (timeDiff > 0) {
              setRemainingTime(`Vote time: ${minutes}m ${seconds}s to vote!`);
            }
          } else {
            setRemainingTime("Voting has ended");
          }
          clearInterval(interval);
        }
      , 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [event]);
  return (
    <>
      <main className="bg-surface">
        <div className="bg-secondary-container mx-4 h-9 flex items-center justify-center rounded">
          <span className="font-bold">{remainingTime}</span>
        </div>
        <Link
          href={"activities/new"}
          className={`bg-primary-container my-4 flex w-5/6 cursor-pointer items-center justify-between space-x-2 rounded-r-xl p-3 transition-transform hover:scale-105 ${isParticipant || (timeDiff ?? 0) < 0 ? "" : "pointer-events-none opacity-50"}`}
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
              className={` ${isParticipant || (timeDiff ?? 0) < 0 ? "" : "pointer-events-none opacity-50"}`}
            >
              <ActivityCard
                isFavorite={favorite === activity.id}
                activity={activity}
                timeEndVote={(timeDiff ?? 0) < 0} 
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
