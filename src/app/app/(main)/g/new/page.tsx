"use client";
import React, { useState } from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import Link from "next/link";

const CreateGroup = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const contacts = [
    { id: 1, firstName: "Paul", lastName: "Pousset" },
    { id: 2, firstName: "Julien", lastName: "De Almeida" },
    { id: 3, firstName: "Nathan", lastName: "Eudeline" },
    { id: 4, firstName: "Enzo", lastName: "Leroux" },
    { id: 5, firstName: "John", lastName: "Doe" },
    { id: 6, firstName: "Jane", lastName: "Smith" },
    { id: 7, firstName: "Alice", lastName: "Johnson" },
    { id: 8, firstName: "Bob", lastName: "Brown" },
    { id: 9, firstName: "Michael", lastName: "Jackson" },
    { id: 10, firstName: "Elvis", lastName: "Presley" },
    { id: 11, firstName: "Freddie", lastName: "Mercury" },
    { id: 12, firstName: "David", lastName: "Bowie" },
    { id: 13, firstName: "Prince", lastName: "Rogers Nelson" },
    { id: 14, firstName: "Whitney", lastName: "Houston" },
    { id: 15, firstName: "Amy", lastName: "Winehouse" },
    { id: 16, firstName: "Kurt", lastName: "Cobain" },
    { id: 17, firstName: "Janis", lastName: "Joplin" },
    { id: 18, firstName: "Jimi", lastName: "Hendrix" },
    { id: 19, firstName: "Bob", lastName: "Marley" },
    { id: 20, firstName: "Stevie", lastName: "Wonder" },
  ];

  const handleCheckboxChange = (contactId: number) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contactId)) {
        return prevSelectedContacts.filter((id) => id !== contactId);
      } else {
        return [...prevSelectedContacts, contactId];
      }
    });
  };

  const handleConfirmClick = () => {
    // Logic to handle group creation will go here
    console.log("New group name:", newGroupName);
    console.log("New group description:", newGroupDescription);
    console.log("Selected contacts:", selectedContacts);
    // Reset the form
    setNewGroupName("");
    setNewGroupDescription("");
    setSelectedContacts([]);
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
            <Link
              href="/app"
              className="hover:bg-indigo-700 text-on surface h-15 w-35 bg-primary-container rounded-md px-6 py-3"
            >
              Confirmer
            </Link>
            <Link
              href="/app"
              className="hover:bg-indigo-700 text-on h-15 w-35 surface bg-error ml-7 rounded-md px-6 py-3"
            >
              Annuler
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateGroup;
