import Link from "next/link";

export function NewFormHeader({
  backLink,
  title,
}: {
  backLink: string;
  title: string;
}) {
  return (
    <header className="bg-surface sticky top-0 z-10 ">
      <div className="mx-2 flex h-16 items-center justify-between border-inverse-surface  px-4">
        <Link href={backLink} className="flex items-center">
          <span className="material-icons">arrow_back</span>
        </Link>
        <h1 className="text-xl font-bold text-primary underline">{title}</h1>
        <span></span>
      </div>
    </header>
  );
}
