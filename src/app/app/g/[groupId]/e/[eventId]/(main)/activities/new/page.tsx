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
import AppHeader from "~/app/app/(main)/_components/header";
import { EventHeader } from "../../_components/header";


const CreateActivity =  ({
  params
}:{params: {groupId: string, eventId: string}}
  
) => {
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [newActivityLocation, setActivityLocation] = useState("");
  
  const router = useRouter();



  const createActivity = api.activity.createActivity.useMutation({
    onSuccess: () => {
      router.refresh();
      setNewActivityName("");
      setNewActivityDescription("");
      setActivityLocation("")
     
    },
  });




  return (
    <>
      <Head>
        <title>{`Créer un nouveau groupe`}</title>
      </Head>
      
      <div className="mt-16 flex h-screen flex-col">
        <main className="bg-surface flex-grow p-4 text-on-surface-variant">
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
        createActivity.mutate({
          name: newActivityName,
          description: newActivityDescription,
          location: newActivityLocation,
          groupId: +params.groupId,
          eventId: +params.eventId,
        });
      }}>
            
          <h1 className="-mt-2 text-center text-xl font-semibold">
            Propose an activity !
          </h1>
          <div className="mt-4">
            <label className="text-gray-700 block text-xl font-medium">
              Name of the activity:
            </label>
            <input
              type="text"
              value={newActivityName}
              placeholder="Name of the future activity."
              onChange={(e) => setNewActivityName(e.target.value)}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="text-gray-700 block text-xl font-medium">
              Description:
            </label>
            <textarea
              value={newActivityDescription}
              placeholder="Describe your idea of activity !"
              onChange={(e) => setNewActivityDescription(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block h-25 w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="text-gray-700 block text-xl font-medium">
              Location:
            </label>
            <textarea
              value={newActivityLocation}
              placeholder="Where should it took place ?"
              onChange={(e) => setActivityLocation(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block h-20 w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>

         
          <div className="mt-8 flex justify-center">
          <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createActivity.isPending}
      >
        {createActivity.isPending ? "Submitting..." : "Submit"}
      </button>
           
          </div>
          </form>
        </main>
        
      </div>
    </>
  );
};

export default CreateActivity;