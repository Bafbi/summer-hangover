import Link from "next/link";
import { useState, useEffect } from "react";

export function EventHeader() {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const endDateTime = new Date("2022-01-01T00:00:00"); // Replace with your endDateTime
      const currentTime = new Date();
      const timeDiff = endDateTime.getTime() - currentTime.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setRemainingTime(
          `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
      } else {
        setRemainingTime("Voting has ended");
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
          <span>{remainingTime}</span>
        </div>
      </header>
    </>
  );
}
