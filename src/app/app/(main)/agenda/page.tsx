import { addDays, compareAsc } from "date-fns";
import Link from "next/link";
import { type RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/server";

export default async function AgendaPage() {
  const events = await api.event.getUserEvents();

  // console.log(events);

  const thisWeek = events.filter((event) => {
    const now = new Date();
    const endOfWeek = addDays(now, 7);
    return (
      compareAsc(event.event.date, now) >= 0 &&
      compareAsc(event.event.date, endOfWeek) < 0
    );
  });

  // console.log(thisWeek);

  return (
    <div className="flex flex-col gap-4">
      <WeekIndicator />
      <div className="flex flex-col gap-4 ">
        {thisWeek.map((eventQ) => (
          <EventCard key={eventQ.eventId} event={eventQ.event} />
        ))}
      </div>
    </div>
  );
}

/*
<div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-7 gap-4 p-4 bg-card">
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>S</div>
            <div>12</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>M</div>
            <div>13</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>T</div>
            <div>14</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>W</div>
            <div>15</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>T</div>
            <div>16</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>F</div>
            <div>17</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-medium text-muted-foreground">
            <div>S</div>
            <div>18</div>
          </div>
        </div>
        */
function WeekIndicator() {
  const now = new Date();
  return (
    <div className="bg-surface-container grid grid-cols-7 gap-4 p-4">
      {Array.from({ length: 7 }).map((_, i) => {
        const date = addDays(now, i);

        return (
          <div
            className={`flex flex-col items-center justify-center text-xs font-medium ${i === 0 ? "text-tertiary" : "text-outline"}`}
            key={i}
          >
            <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div>{date.getDate()}</div>
          </div>
        );
      })}
    </div>
  );
}

function EventCard({
  event,
}: {
  event: RouterOutputs["event"]["getUserEvents"][number]["event"];
}) {
  return (
    <Link
      href={`/app/g/${event.groupId}/e/${event.id}`}
      className="bg-surface-container w-11/12 rounded-e-lg p-4"
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-secondary">{event.name}</div>
        <div className="text-muted-foreground text-xs font-medium">
          {event.date.toLocaleDateString("en-US", {
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      </div>
      <div className=" text-sm">{event.description}</div>
      <div className="text-xs text-outline">From {event.group.name}</div>
    </Link>
  );
}
