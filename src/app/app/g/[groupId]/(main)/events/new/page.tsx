"use client";
import React, { useState } from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { createTRPCRouter } from "~/server/api/trpc";


const CreateEvent =  ({
  params
}:{params: {groupId: string}}
  
) => {
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventLocation, setEventLocation] = useState("");
  const [newEventDate, setEventDate] = useState("")
  const router = useRouter();



  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      router.back();
      setNewEventName("");
      setNewEventDescription("");
      setEventLocation("")
      setEventDate("")
    },
  });




  return (
    <>
      <Head>
        <title>{`Créer un nouveau groupe`}</title>
      </Head>
      <MainMenuHeader />
      <div className="flex h-screen">
        <main className="bg-surface flex-grow p-4 text-on-surface-variant ">
          <div className="mb-4 flex justify-center">
            <span
              style={{ fontSize: 80 }}
              className="material-icons text-4xl text-on-surface-variant"
            >
              supervised_user_circle
            </span>
          </div>
          <form onSubmit={(e) => {
        e.preventDefault();
        createEvent.mutate({
          name: newEventName,
          description: newEventDescription,
          location: newEventLocation,
          date: new Date(newEventDate).toISOString(),
          groupId: +params.groupId,
        });
      }}>
            
          <h1 className="-mt-2 text-center text-xl font-semibold">
            Create your own group !
          </h1>
          <div className="mt-4">
            <label className="text-gray-700 block text-xl font-medium">
              Name of the group : 
            </label>
            <input
              type="text"
              value={newEventName}
              placeholder="A beautiful group name !"
              onChange={(e) => setNewEventName(e.target.value)}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="text-gray-700 block text-xl font-medium">
              Description :
            </label>
            <textarea
              value={newEventDescription}
              placeholder="Describe the group... be imaginative ! !"
              onChange={(e) => setNewEventDescription(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block h-32 w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="text-gray-700 block text-xl font-medium">
              Location :
            </label>
            <textarea
              value={newEventLocation}
              placeholder="Enter the location of your event !"
              onChange={(e) => setEventLocation(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block h-15 w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div className="mt-4">
          <label className="text-gray-700 block text-xl font-medium">Choose a date and time for the event:</label>

          <input
            type="datetime-local"
            placeholder="Description du groupe... Soyez créatif !"
            
            className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block h-15 w-full rounded-md shadow-sm sm:text-sm"
            value={newEventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min="2024-06-07T00:00"
            max="2060-06-14T00:00" />
         </div>
          <div className="mt-8 flex justify-center">
          <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createEvent.isPending}
      >
        {createEvent.isPending ? "Submitting..." : "Submit"}
      </button>
           
          </div>
          </form>
        </main>
        
      </div>
    </>
  );
};

export default CreateEvent;
