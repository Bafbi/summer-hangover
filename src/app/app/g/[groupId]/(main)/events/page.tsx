import Link from "next/link";
import { api } from "~/trpc/server";
import { EventCard } from "../_components/event-card";

export default async function EventsPage({
  params,
}: {
  params: { groupId: string };
}) {
  const events = await api.event.getEvents({ groupId: +params.groupId });

  return (
    <>
      <main className="bg-surface flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* <div className="sortie flex w-full items-center justify-between">
          <Link
            href="events/new"
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
            href="events/new"
            className="bg-primary-container my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-center space-x-2 space-x-reverse rounded-l-xl p-2 transition-transform hover:scale-105"
            style={{ minHeight: "60px" }}
            passHref
          >
            <div>Proposer une soirée</div>
          </Link>
        </div> */}
        <Link
          href={"events/new"}
          className={`bg-primary-container flex w-5/6 cursor-pointer flex-row-reverse items-center justify-between space-x-2 self-end rounded-l-xl p-3 `}
        >
          <span className="text-md font-semibold">Add an event</span>
          <span className="material-icons ">post_add</span>
        </Link>
      </main>
    </>
  );
}
