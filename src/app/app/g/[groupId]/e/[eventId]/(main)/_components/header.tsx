"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type RouterOutputs } from "~/trpc/react";

export function EventHeader({
  backPath,
  event,
}: {
  backPath: string;
  event: RouterOutputs["event"]["getEventById"];
}) {
  if (event === undefined) return null;
 
    
  
  return (
    <>
      <header className="bg-surface sticky top-0 z-10 ">
        <div className="mx-2 flex h-16 items-center justify-between border-inverse-surface  px-4">
          <Link href={`${backPath}/events`} className="flex items-center">
            <span className="material-icons">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold text-primary underline">
            {event.name}
          </h1>
          <Link href={`settings`} className="flex items-center">
            <span className="material-icons cursor-pointer">settings</span>
          </Link>
          
        </div>
      </header>
    </>
  );
}
