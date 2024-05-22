import Link from "next/link";

export default function Home() {
  const events = [
    { id: 1, name: 'Soirée du 8/10', href: '/other-content-1' },
    { id: 2, name: 'Soirée du 9/10', href: '/other-content-2' },
    { id: 3, name: 'Soirée du 10/10', href: '/other-content-3' },
    { id: 1, name: 'Soirée du 8/10', href: '/other-content-1' },
    { id: 2, name: 'Soirée du 9/10', href: '/other-content-2' },
    { id: 3, name: 'Soirée du 10/10', href: '/other-content-3' },
    { id: 1, name: 'Soirée du 8/10', href: '/other-content-1' },
    { id: 2, name: 'Soirée du 9/10', href: '/other-content-2' },
    { id: 3, name: 'Soirée du 10/10', href: '/other-content-3' },
  ];

  return (
    <>
      <div className="overflow-hidden m-2 left-1 right-1 top-1 cursor-pointer p-4 text-center shadow-md rounded-xl border-2 border-current  bg-primary-container transition-transform duration-200 ease-in-out hover:scale-105 hover:border-transparent">
        <Link href="/create-new" passHref>  
          <div className="">Proposer une activité</div>
        </Link>
        <div className="inset-0 bg-secondary rounded-xl transform -translate-x-full rotate-10 origin-top-left transition-transform duration-200 ease-out hover:translate-x-0"></div>
      </div>
      <main className="bg-surface grid grid-cols-2 gap-4 p-4">  
        {events.map((event, index) => (
          <Link
            key={index}
            href={event.href}
            passHref
            className="relative overflow-hidden bg-secondary-container flex h-60 w-full cursor-pointer items-center justify-center p-2 text-center rounded-xl font-thin border-2 border-current transition-transform duration-200 ease-in-out hover:scale-105 hover:border-transparent"
          >
            <div className="">{event.name}</div>
            <div className="absolute inset-0 bg-secondary rounded-xl transform -translate-x-full rotate-10 origin-top-left transition-transform duration-200 ease-out hover:translate-x-0"></div>
          </Link>
        ))}
      </main>
    </>
  );
}
