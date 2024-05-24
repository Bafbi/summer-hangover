"use client";
import React, { useState } from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import { Icon, Link } from "@mui/material";
import { AppHeader } from "../_components/header";

// Sample contacts data for the form

const Menu = () => {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
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

  const groups = [
    {
      id: 1,
      name: "Soirée chez poluchon",
      creator: "Polo",
      href: "/other-content-1",
      imageUrl: "/images/group1.jpg",
    },
    {
      id: 2,
      name: "PDD tout les jours",
      creator: "Cypounet",
      href: "/other-content-2",
      imageUrl: "/images/group2.jpg",
    },
    {
      id: 3,
      name: "Groupe 3",
      creator: "Alice Johnson",
      href: "/other-content-3",
      imageUrl: "/images/group3.jpg",
    },
    {
      id: 4,
      name: "Groupe 4",
      creator: "Bob Brown",
      href: "/other-content-4",
      imageUrl: "/images/group4.jpg",
    },
    {
      id: 5,
      name: "Groupe 5",
      creator: "Carol White",
      href: "/other-content-5",
      imageUrl: "/images/group5.jpg",
    },
    {
      id: 6,
      name: "Groupe 6",
      creator: "Jean Marqc",
      href: "/other-content-5",
      imageUrl: "/images/group5.jpg",
    },
  ];

  const handleAddGroupClick = () => {
    setIsCreatingGroup(true);
  };

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
    setIsCreatingGroup(false);
  };

  return (
    <>
      <Head>
        <title>{`Summer Hangover`}</title>
      </Head>
      <MainMenuHeader />
      <div className="flex h-screen flex-col ">
        {isCreatingGroup ? (
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
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500 h-4 w-4 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleConfirmClick}
                className="hover:bg-indigo-700 text-on surface h-15 w-35 bg-primary-container rounded-md px-6 py-3"
              >
                Confirmer
              </button>
              <button
                onClick={() => setIsCreatingGroup(false)}
                className="hover:bg-indigo-700 text-on h-15 w-35 surface bg-error ml-7 rounded-md px-6 py-3"
              >
                Annuler
              </button>
            </div>
          </main>
        ) : (
          <main className="bg-surface mt-16 grid flex-grow auto-rows-min grid-cols-2 gap-4 overflow-y-auto p-4">
            {groups.map((group, index) => (
              <Link
                key={index}
                href={group.href}
                className="bg-surface-variant flex h-40 flex-col overflow-hidden rounded-xl"
              >
                <div className="flex flex-col p-2">
                  <span className="font-semibold">{group.name}</span>
                  <span className="text-xs">Par {group.creator}</span>
                </div>
              </Link>
            ))}
            {/* Case pour ajouter un nouveau groupe */}
            <div
              onClick={handleAddGroupClick}
              className="border-th bg-primary-container relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-current p-2 text-left"
            >
              <Icon
                style={{ fontSize: 50 }}
                className="text-on-surface-variant"
              >
                add
              </Icon>

              <p className="text-center">Ajouter un nouveau groupe</p>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Menu;
