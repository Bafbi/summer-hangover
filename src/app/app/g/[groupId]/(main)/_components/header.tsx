import Link from "next/link";
import { type RouterOutputs } from "~/trpc/react";

export function GroupHeader({
  group,
}: {
  group: RouterOutputs["group"]["getGroupById"];
}) {
  if (group === undefined) return;

  return (
    <>
      <header className="bg-surface sticky top-0 z-10 mx-2 flex h-16 items-center justify-between border-b border-inverse-surface px-4">
        <Link href={"/app"} className="flex items-center">
          <span className="material-icons">home</span>
        </Link>
        <h1 className="text-xl font-bold text-primary underline">
          {group.name}
        </h1>
        <Link href={`settings`} className="flex items-center">
          <span className="material-icons cursor-pointer">settings</span>
        </Link>
      </header>
    </>
  );
}
