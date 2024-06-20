"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function EventSettingsPage({
  params,
}: {
  params: {
    groupId: string;
    eventId: string;
  };
}) {
  const { data: participant } = api.event.getParticipant.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const { data: event } = api.event.getInfo.useQuery({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });
  const updateEvent = api.event.updateEvent.useMutation();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [EndVoteDate, setEndVoteDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const session = useSession();

  useEffect(() => {
    if (event) {
      setName(event.name);
      if (event.date) setDate(event.date.toISOString().slice(0, -8));
      if (event.endVoteDate)
        setEndVoteDate(event.endVoteDate.toISOString().slice(0, -8));
      if (event.description) setDescription(event.description);
      if (event.location) setLocation(event.location);
    }
  }, [event]);

  if (!session.data) return null;

  return (
    <>
      {event?.createdBy.id !== session.data.user.id && (
        <>
          <h1 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between ">Event infos</h1>
          <br />
          <p className="font-semibold">Description: {event?.description}</p>
          <br />
          <p className="font-semibold">Date: {event?.date?.toLocaleString()}</p>
          <br />
          <p className="font-semibold">Event Location: {event?.location}</p>
          <br />
          <p className="font-semibold">End Vote Date: {event?.endVoteDate?.toLocaleString()}</p>
          <br />  
          <p className="font-semibold">Event Created By: {event?.createdBy.name}</p>
        </>
      )}

      {event?.createdBy.id === session.data.user.id && (
        <>
          <h1 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">Event Settings</h1>
          <div className="flex flex-col gap-5 justify-center items-center">
            <form
              className="w-full max-w-lg"
              onSubmit={async (e) => {
                e.preventDefault();
                await updateEvent.mutate({
                  name: name,
                  description: description,
                  date: date.concat(":00Z"),
                  location: location,
                  groupId: +params.groupId,
                  eventId: +params.eventId,
                  endVoteDate: EndVoteDate.concat(":00Z"),
                });
              }}
            >
              <div className="mb-4">
                <label className="font-semibold">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Date:</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">End Vote Date:</label>
                <input
                  type="datetime-local"
                  value={EndVoteDate}
                  onChange={(e) => setEndVoteDate(e.target.value)}
                  className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
                />
              </div>
              <p className="font-semibold">Event Created By: {event?.createdBy.name}</p>
              <div className="flex justify-center mt-4">
                <button type="submit" className="rounded-3xl bg-secondary-container px-10 py-2 text-xl font-semibold text-center">
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <div>
        <h2 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">Members</h2>
        <ul className="w-11/12 flex flex-col items-center">
          {participant?.map((participants, index) => (
            <li key={index}>{participants.user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}