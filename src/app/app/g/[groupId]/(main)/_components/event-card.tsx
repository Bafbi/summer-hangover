import Link from "next/link";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
}

export function EventCard({ event }: { event: Event }) {
  return (
    <>
      <Link href={`e/${event.id}`}>{event.title}</Link>
    </>
  );
}
