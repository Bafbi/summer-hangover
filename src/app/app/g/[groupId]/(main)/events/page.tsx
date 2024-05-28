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
      <main className="gap bg-surface grid grid-cols-1">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        <div className="sortie flex w-full items-center justify-between">
          <Link
            href="/other-content-2"
            className="bg-primary-container my-4 w-1/6 max-w-xs flex-initial cursor-pointer items-center justify-center space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105"
            style={{
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="material-icons">add_circle</span>
          </Link>
          <Link
            href="/other-content-2"
            className="bg-primary-container my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-center space-x-2 space-x-reverse rounded-l-xl p-2 transition-transform hover:scale-105"
            style={{ minHeight: "60px" }}
            passHref
          >
            <div>Proposer une soirée</div>
          </Link>
        </div>
      </main>
    </>
  );
}
