"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, ActivityCard } from "../_components/activity-card";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function Home( {
  params
}:{params: {
  groupId: string,
  eventId: string,
}})
    {

  const {data:activities} = api.activity.getActivities.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [favorite, setFavorite] = useState<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      <main className="bg-surface">
        <Link
          href={"activities/new"}
          className="bg-primary-container my-4 flex w-5/6 cursor-pointer items-center justify-between space-x-2 rounded-r-xl p-3 transition-transform hover:scale-105"
        >
          <span className="text-md font-semibold">Add an activity</span>
          <span className="material-icons ">post_add</span>
        </Link>
        {/* <div className=" float-right flex w-11/12 flex-row flex-wrap gap-2 rounded-s-lg border-y-2 border-l-2 border-dashed border-secondary p-2"> */}
        <div className=" float-right grid w-11/12 grid-cols-2 gap-2 rounded-s-lg border-inverse-surface p-2">
          {activities && activities.map((activity) => (
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
                }
                if (showPopup) setShowPopup(false);
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <ActivityCard
                isFavorite={favorite === activity.id}
                activity={activity}
              />
            </div>
          ))}
        </div>
      </main>
      {showPopup && selectedActivity && (
        <div className="bg-secondary-container absolute bottom-0 z-10 mx-auto w-11/12 animate-slideinBotton overflow-y-hidden rounded-t-lg">
          <h2 className="text-xl font-bold">{selectedActivity.name}</h2>
          <p>Lieu : {selectedActivity.location}</p>
          <p>Description : {selectedActivity.description}</p>
          <p>Créé par : {selectedActivity.createdBy}</p>
        </div>
      )}
    </>
  );
}
