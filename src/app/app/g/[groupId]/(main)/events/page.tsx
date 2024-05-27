import Link from "next/link";
import { Event, EventCard } from "../_components/event-card";

export default function EventsPage() {
  const events: Event[] = [
    {
      id: 1,
      title: "Soirée du 8/10",
      description: "Venez nombreux à la soirée du 8/10",
      date: new Date("2021-10-08"),
    },
    {
      id: 2,
      title: "Soirée du 8/10",
      description: "Venez nombreux à la soirée du 8/10",
      date: new Date("2021-10-08"),
    },
    {
      id: 3,
      title: "Soirée du 8/10",
      description: "Venez nombreux à la soirée du 8/10",
      date: new Date("2021-10-08"),
    },
    {
      id: 4,
      title: "Soirée du 8/10",
      description: "Venez nombreux à la soirée du 8/10",
      date: new Date("2021-10-08"),
    },
    {
      id: 5,
      title: "Soirée du 8/10",
      description: "Venez nombreux à la soirée du 8/10",
      date: new Date("2021-10-08"),
    },
  ];

  return (
    <>
      <main className="bg-surface ml-12 mr-12 grid grid-cols-1 gap-2 p-4">
        <div className="bg-primary-container m-2 mx-auto max-w-xs cursor-pointer rounded-lg p-4 text-center shadow-md transition">
          <Link href="events/new">
            <div className="text-lg font-bold">Proposer une activité</div>
          </Link>
        </div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>
    </>
  );
}
