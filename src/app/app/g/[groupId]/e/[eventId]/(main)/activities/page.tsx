"use client";
import { useEffect, useMemo, useRef, useState } from "react";

interface Event {
  id: number;
  name: string;
  location: string;
  description: string;
  createdBy: string;
}

export default function Home() {
  const events: Event[] = [
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [favorite, setFavorite] = useState<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const toggleFavorite = (event: Event) => {
    setFavorite((prev) => (prev === event.id ? null : event.id));
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  /// We want to show the popup when the user make a long press on the event card
  /// and put on favorite when the user clicks on the event card

  return (
    <>
      <main className="bg-surface">
        <div
          onClick={openForm}
          className="bg-primary-container my-4 flex w-5/6 cursor-pointer items-center justify-between space-x-2 rounded-r-xl p-3 transition-transform hover:scale-105"
        >
          <span className="text-md font-semibold">Add an activity</span>
          <span className="material-icons ">post_add</span>
        </div>
        {/* <div className=" float-right flex w-11/12 flex-row flex-wrap gap-2 rounded-s-lg border-y-2 border-l-2 border-dashed border-secondary p-2"> */}
        <div className=" float-right grid w-11/12 grid-cols-2 gap-2 rounded-s-lg border-inverse-surface p-2">
          {events.map((event) => (
            <div
              key={event.id}
              className={`aspect-card bg-surface-variant block flex min-w-32 max-w-96 flex-col justify-between overflow-hidden  rounded-xl  outline-tertiary ${favorite === event.id ? "outline" : ""}`}
              onTouchStart={() => {
                setSelectedEvent(event);
                timeout.current = setTimeout(() => {
                  setShowPopup(true);
                  timeout.current = null;
                }, 500);
                console.log(timeout);
              }}
              onTouchEnd={() => {
                console.log(timeout);
                if (timeout.current !== null) {
                  clearTimeout(timeout.current);
                  toggleFavorite(event);
                }
                if (showPopup) setShowPopup(false);
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="flex flex-col p-2">
                <span className="text-lg font-semibold">{event.name}</span>
                <span className="text-sm font-medium text-outline">
                  Lieux: {event.location}
                </span>
              </div>
              <div className="bg-secondary-container flex h-10 items-center justify-around gap-1 p-2">
                <span className="text-xs font-semibold">
                  Hold to view details
                </span>
                <span className="material-icons">article</span>
              </div>
            </div>
          ))}
        </div>
        {showPopup && selectedEvent && (
          <div className="animate-slideinBotton bg-secondary-container absolute bottom-0 z-10 mx-auto w-11/12 overflow-y-hidden rounded-t-lg">
            <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            <p>Lieu : {selectedEvent.location}</p>
            <p>Description : {selectedEvent.description}</p>
            <p>Créé par : {selectedEvent.createdBy}</p>
          </div>
        )}
      </main>
      {/* {showPopup && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur backdrop-filter">
          <div className="bg-surface relative w-full max-w-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            <p>Lieu : {selectedEvent.location}</p>
            <p>Description : {selectedEvent.description}</p>
            <p>Créé par : {selectedEvent.createdBy}</p>
          </div>
        </div>
      )} */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur backdrop-filter">
          <div className="bg-surface relative w-full max-w-md rounded-lg p-4">
            <form className="space-y-4">
              <h2 className="text-lg font-bold">Proposer une activité</h2>
              <input
                type="text"
                placeholder="Lieu(x)"
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
              ></textarea>
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
            <button
              onClick={closeForm}
              className="absolute right-3 top-3 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
