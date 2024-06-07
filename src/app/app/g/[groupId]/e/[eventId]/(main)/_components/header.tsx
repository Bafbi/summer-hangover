import Link from "next/link";

export function EventHeader() {
  return (
    <>
      <header className="bg-surface sticky top-0 z-10 ">
        <div className="mx-2 flex h-16 items-center justify-between border-inverse-surface  px-4">
          <Link href={"/app"} className="flex items-center">
            <span className="material-icons">home</span>
          </Link>
          <h1 className="text-xl font-bold text-primary underline">
            Sortie du 19/05
          </h1>
          <span></span>
        </div>
      </header>
    </>
  );
}
