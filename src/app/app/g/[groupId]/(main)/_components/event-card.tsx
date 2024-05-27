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
     
      <div className="sortie flex justify-between items-center w-full">
            <Link href={`e/${event.id}`} className="bg-surface-variant max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} >
              {event.title}
            </Link>
            <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Date
            </div>
          </div>
    </>
  );
}
