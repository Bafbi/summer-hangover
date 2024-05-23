"use client"
import { useState } from "react";

interface Event {
  id: number;
  name: string;
  location: string;
  description: string;
  createdBy: string;
}

export default function Home() {
  const events: Event[] = [
    { id: 1, name: 'Piscine', location: 'Chez Ju', description: 'Super soirée piscine!', createdBy: 'Paul' },
    { id: 2, name: 'Bar : PDD', location: 'Pdd', description: 'Boissons toute la nuit!', createdBy: 'Paul' },
    { id: 3, name: 'Zytho', location: 'Isen', description: 'Dégustation de bières.', createdBy: 'Paul' },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [favorite, setFavorite] = useState<number | null>(null);

  const toggleFavorite = (event: Event) => {
    setFavorite(prev => prev === event.id ? null : event.id);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div onClick={openForm} className="overflow-hidden m-2 cursor-pointer p-4 text-center rounded-xl bg-primary-container hover:scale-105 transition-transform">
        Proposer une activité
      </div>
      <main className="grid grid-cols-2 gap-4 p-4 bg-surface">
        {events.map(event => (
          <div key={event.id}
               className={`relative overflow-hidden flex h-60 w-full cursor-pointer items-center justify-center p-2 text-center rounded-xl font-thin border-th border-current transition-transform ${favorite === event.id ? 'bg-secondary-container border border-[#D4AF37]' : 'bg-secondary-container'} hover:scale-105`}
               onClick={() => toggleFavorite(event)}
               onTouchStart={(e) => { 
                 e.preventDefault();
                 setSelectedEvent(event);
                 setShowPopup(true);
               }}
               onTouchEnd={closePopup}>
            <div>{event.name}<br />Lieu : {event.location}</div>
          </div>
        ))}
      </main>
      {showPopup && selectedEvent && (
        <div className="fixed inset-0 backdrop-blur backdrop-filter flex items-center justify-center p-4">
          <div className="bg-surface p-4 rounded-lg max-w-lg w-full relative">
            <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            <p>Lieu : {selectedEvent.location}</p>
            <p>Description : {selectedEvent.description}</p>
            <p>Créé par : {selectedEvent.createdBy}</p>
            <button onClick={closePopup} className="absolute top-3 right-3 text-2xl">
              &times;
            </button>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur backdrop-filter flex items-center justify-center p-4">
          <div className="bg-surface p-4 rounded-lg max-w-md w-full relative">
            <form className="space-y-4">
              <h2 className="text-lg font-bold">Proposer une activité</h2>
              <input type="text" placeholder="Lieu(x)" className="input input-bordered w-full" />
              <textarea placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
              <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
            <button onClick={closeForm} className="absolute top-3 right-3 text-2xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
