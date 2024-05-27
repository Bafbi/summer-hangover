"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, ActivityCard } from "../_components/activity-card";
import Link from "next/link";

export default function Home() {
  const events: Activity[] = [
    {
      id: 1,
      name: "Piscine",
      location: "Chez Ju",
      description: "Super soirée piscine!",
      createdBy: "Paul",
    },
    {
      id: 2,
      name: "Bar : PDD",
      location: "Pdd",
      description: "Boissons toute la nuit!",
      createdBy: "Paul",
    },
    {
      id: 3,
      name: "Zytho",
      location: "Isen",
      description: "Dégustation de bières.",
      createdBy: "Paul",
    },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Activity | null>(null);
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
          {events.map((event) => (
            <div
              key={event.id}
              onTouchStart={() => {
                setSelectedEvent(event);
                timeout.current = setTimeout(() => {
                  setShowPopup(true);
                  timeout.current = null;
                }, 500);
              }}
              onTouchEnd={() => {
                if (timeout.current !== null) {
                  clearTimeout(timeout.current);
                  setFavorite(event.id);
                }
                if (showPopup) setShowPopup(false);
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <ActivityCard
                isFavorite={favorite === event.id}
                activity={event}
              />
            </div>
          ))}
        </div>
      </main>
      {showPopup && selectedEvent && (
        <div className="bg-secondary-container absolute bottom-0 z-10 mx-auto w-11/12 animate-slideinBotton overflow-y-hidden rounded-t-lg">
          <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
          <p>Lieu : {selectedEvent.location}</p>
          <p>Description : {selectedEvent.description}</p>
          <p>Créé par : {selectedEvent.createdBy}</p>
        </div>
      )}
    </>
  );
}
