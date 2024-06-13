"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NewFormHeader({
  title,
  backLink,
}: {
  title: string;
  backLink?: string;
}) {
  const pathname = usePathname();
  return (
    <header className="bg-surface sticky top-0 z-10 ">
      <div className="mx-2 flex h-16 items-center justify-between border-inverse-surface  px-4">
        <Link
          className="flex items-center"
          href={backLink ?? pathname.replace("/new", "")}
        >
          <span className="material-icons">arrow_back</span>
        </Link>
        <h1 className="text-xl font-bold text-primary underline">{title}</h1>
        <span></span>
      </div>
    </header>
  );
}
