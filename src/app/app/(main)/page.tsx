"use client";
import React, { useState } from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import Link from "next/link";

const Menu = () => {
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
      name: "Anniv Nolan",
      creator: "Nolan Cacheux",
      href: "/other-content-3",
      imageUrl: "/images/group3.jpg",
    },
    {
      id: 4,
      name: "Fin de projet",
      creator: "Enzo Leroux",
      href: "/other-content-4",
      imageUrl: "/images/group4.jpg",
    },
    {
      id: 5,
      name: "Chicha kalud",
      creator: "Matthieu Baum",
      href: "/other-content-5",
      imageUrl: "/images/group5.jpg",
    },
    {
      id: 6,
      name: "The Room",
      creator: "David Denoyelle",
      href: "/other-content-5",
      imageUrl: "/images/group5.jpg",
    },
  ];

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

  return (
    <>
      <Head>
        <title>{`Summer Hangover`}</title>
      </Head>
      <MainMenuHeader />
      <div className="flex h-screen flex-col ">
        <div className="mb-18 bg-surface mt-16 flex-grow overflow-y-auto p-4">
          {groups.map((group, index) => (
            <Link
              key={index}
              href={group.href}
              className="bg-surface-variant mb-4 flex h-28 flex-col overflow-hidden rounded-md"
            >
              <div
                className="bg-secondary-container flex items-center justify-between border-b
                   border-outline-variant px-1 pb-1 pt-2"
              >
                <span className="text-xl font-semibold">{group.name}</span>
                <span className="text-right">
                  Par <span className="font-semibold">{group.creator}</span>
                </span>
              </div>
              <div>
                <div className="px-1 py-1">
                  <span
                    style={{ fontSize: 18 }}
                    className="material-icons pl-1 pr-2 pt-2"
                  >
                    people
                  </span>
                  <span className="text-left text-sm text-on-surface-variant">
                    {contacts
                      .filter((contact) => group.id % contact.id === 0)
                      .map(
                        (contact) => `${contact.firstName} ${contact.lastName}`,
                      )
                      .join(", ")}
                    {contacts.length > 3
                      ? `, et ${contacts.length - 3} autres personnes`
                      : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="app/create"
          passHref
          className="bg-primary-container fixed bottom-0 flex h-20
              w-full flex-row items-center justify-center"
        >
          <span className="text-xl font-semibold">
            Ajouter un nouveau groupe
          </span>
          <span style={{ fontSize: 38 }} className="material-icons">
            add
          </span>
        </Link>
      </div>
    </>
  );
};

export default Menu;
