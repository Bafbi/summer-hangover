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
          <h2>Information of the event</h2>
          <p>Description: {event?.description}</p>
          <p>Date: {event?.date?.toLocaleString()}</p>
          <p>Event Location: {event?.location}</p>
          <p>End Vote Date: {event?.endVoteDate?.toLocaleString()}</p>
          <p>Event Created By: {event?.createdBy.name}</p>
        </>
      )}
      
      {event?.createdBy.id === session.data.user.id && (
        <>
          <form
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
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            Date:
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <br />
            End Vote Date:
            <input
              type="datetime-local"
              value={EndVoteDate}
              onChange={(e) => setEndVoteDate(e.target.value)}
            />
            <button type="submit">Update</button>
            <p>Event Created By: {event?.createdBy.name}</p>
          </form>
        </>
      )}
      <div>
        <h2>Participants:</h2>
        <ul>
          {participant?.map((participants, index) => (
            <li key={index}>{participants.user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
