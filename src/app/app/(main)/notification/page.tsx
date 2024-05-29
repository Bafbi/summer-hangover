import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Head from "next/head";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Link from "next/link";

const notifications = [
  {
    date: "Aujourd'hui",
    items: [
      {
        id: 1,
        text: "Paul vous a invité à rejoindre son groupe",
        groupName: "Nom du groupe",
        link: "#",
      },
      {
        id: 2,
        text: "Nathan a ajouté une nouvelle activité à l'évènement",
        eventName: "Nom de l'évènement",
        link: "#",
      },
    ],
  },
  {
    date: "Hier",
    items: [
      {
        id: 3,
        text: "Julien a ajouté un nouvel évènement au groupe",
        groupName: "Nom du groupe",
        link: "#",
      },
    ],
  },
  {
    date: "Mardi 07/06/2024",
    items: [],
  },
];

const Notifications = () => {
  return (
    <div className="bg-surface flex h-screen flex-col">
      <MainMenuHeader />

      <main className="bg-surface mt-12 flex-grow overflow-y-auto overflow-x-hidden px-2 py-4">
        {/* Titre de la section notif + bouton retour et marqué comme lu */}
        <div className="bg-surface-variant mb-4 mt-6 flex h-14 flex-col items-center rounded-md">
          <h1 className="pt-2 text-4xl font-semibold">Notifications</h1>
        </div>
        <div className="mb-8 ml-52 mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button className="mr-3 rounded-md bg-inverse-primary px-5 py-1 text-sm font-semibold text-inverse-surface">
              <span>
                Marquer
                <br />
                comme lu
              </span>
            </button>
            <Link
              href="/app"
              className="rounded-full bg-inverse-primary p-2 font-bold"
            >
              <span style={{ fontSize: 40 }} className="material-icons">
                close
              </span>
            </Link>
          </div>
        </div>

        {/* Section des notifications */}
      </main>
    </div>
  );
};

export default Notifications;
