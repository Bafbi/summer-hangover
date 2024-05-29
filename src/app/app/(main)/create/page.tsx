"use client";
import React, { useState } from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import router from "next/router";

const CreateGroup = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const router = useRouter();

  const contacts = [
    { id: "1", firstName: "Paul", lastName: "Pousset" },
    { id: "2", firstName: "Julien", lastName: "De Almeida" },
    { id: "3", firstName: "Nathan", lastName: "Eudeline" },
    { id: "4", firstName: "Enzo", lastName: "Leroux" },
    { id: "5", firstName: "John", lastName: "Doe" },
  ];

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
      router.refresh();
      setNewGroupName("");
      setNewGroupDescription("");
      setSelectedContacts([])
    },
  });

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
          <form onSubmit={(e) => {
        e.preventDefault();
        createGroup.mutate({
          name: newGroupName,
          members: selectedContacts,
        });
      }}>
            
          <h1 className="-mt-2 text-center text-xl font-semibold">
            Créer un nouveau groupe de sortie :
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
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md shadow-sm sm:text-sm"
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
            <div className="border-gray-300 mt-1 h-52 overflow-y-auto rounded-md border p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center pb-3">
                    <span style={{ fontSize: 38 }} className="material-icons">
                      account_box
                    </span>
                    <span className="ml-2 text-xl font-semibold">
                      {contact.firstName} {contact.lastName}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleCheckboxChange(contact.id)}
                    className="border-gray-300 mb-2 h-5 w-5 rounded"
                  />
                </div>
                
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
          <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createGroup.isPending}
      >
        {createGroup.isPending ? "Submitting..." : "Submit"}
      </button>
            <Link
              href="/app"
              className="hover:bg-indigo-700 text-on h-15 w-35 surface bg-error ml-7 rounded-md px-6 py-3"
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
