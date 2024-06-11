"use client";

import React, { use, useState } from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { notificationType } from "~/server/db/schema";

const CreateGroup = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const router = useRouter();

  const { data: contactData, isLoading } = api.user.getContacts.useQuery();

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contactId)) {
        return prevSelectedContacts.filter((id) => id !== contactId);
      } else {
        return [...prevSelectedContacts, contactId];
      }
    });
  };

  const createGroup = api.group.createGroup.useMutation({
    onSuccess: () => {
      router.back();
      setNewGroupName("");
      setNewGroupDescription("");
      setSelectedContacts([]);
    },
  });

  // const sendNotificationToUsers = api.notification.sendNotificationToUsers.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGroupData = {
      name: newGroupName,
      description: newGroupDescription,
      members: selectedContacts,
    };

    console.log("Creating group with the following data:", newGroupData);

    createGroup.mutate(newGroupData);
    /* 
    sendNotificationToUsers.mutate({
      message: `Vous avez été invité à rejoindre le groupe ${newGroupName}.
      Cliquez ici pour le rejoindre. ${inviteLink}`,
      type: "INVITED_TO_GROUP",
      userIds: selectedContacts,
    });
    */
  };

  return (
    <>
      <Head>
        <title>{`Créer un nouveau groupe`}</title>
      </Head>
      <MainMenuHeader />
      <div className="flex h-screen flex-col">
        <main className="bg-surface mt-16 flex-grow p-4 text-on-surface-variant">
          <div className="mb-4 flex justify-center">
            <span
              style={{ fontSize: 80 }}
              className="material-icons text-4xl text-on-surface-variant"
            >
              supervised_user_circle
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <h1 className="-mt-2 text-center text-xl font-semibold">
              Créer un nouveau groupe :
            </h1>
            <div className="mt-4">
              <label className="text-gray-700 block text-xl font-medium">
                Nom du groupe :
              </label>
              <input
                type="text"
                value={newGroupName}
                placeholder="Un joli petit nom pour votre groupe..."
                onChange={(e) => setNewGroupName(e.target.value)}
                className="focus:border-indigo-500 mt-1 block w-full rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-700 block text-xl font-medium">
                Description :
              </label>
              <textarea
                value={newGroupDescription}
                placeholder="Description du groupe... Soyez créatif !"
                onChange={(e) => setNewGroupDescription(e.target.value)}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block h-32 w-full rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-700 block text-xl font-medium">
                Contacts à ajouter :
              </label>
              <div className="border-gray-300 bg-surface mt-1 h-44 overflow-y-auto rounded-md border p-2">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  contactData?.groups.flatMap((group) =>
                    group.members.map((member) => (
                      <div key={member.userId} className="flex items-center justify-between">
                        <div className="flex items-center pb-3">
                          <span style={{ fontSize: 38 }} className="material-icons">
                            account_box
                          </span>
                          <span className="ml-2 text-xl font-semibold">
                            {member.user.name}
                          </span>
                        </div>
                        
                        <input
                          type="checkbox"
                          title="checkbox"
                          checked={selectedContacts.includes(member.userId)}
                          onChange={() => handleCheckboxChange(member.userId)}
                          className="border-gray-300 mb-3 h-5 w-5 rounded"
                        />
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className=" bg-white/10 px-10 py-3 font-semibold transition border-2 rounded-3xl"
                disabled={createGroup.isPending}
              >
                {createGroup.isPending ? "Submitting..." : "Submit"}
              </button>
              <Link
                href="/app"
                className="hover:bg-indigo-700 text-on h-15 w-35 surface bg-error ml-7 rounded-3xl px-6 py-3"
              >
                Annuler
              </Link>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default CreateGroup;
