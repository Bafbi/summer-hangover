import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Head from "next/head";
import MainMenuHeader from "../_components/mainMenuHeader";
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

      <main className="bg-surface mt-12 flex-grow overflow-y-auto overflow-x-hidden px-4 py-4">
        {/* Titre de la section notif + bouton retour et marqué comme lu */}
        <div className="mb-8 mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button className="mr-3 rounded-md bg-inverse-primary px-4 py-1 text-sm font-semibold text-inverse-surface">
              Marquer <br />
              comme lu
            </button>
            <Link
              href="/menu"
              className="rounded-full bg-inverse-primary p-2 font-bold"
            >
              <span style={{ fontSize: 40 }} className="material-icons">
                close
              </span>
            </Link>
          </div>
        </div>
        <h1 className="text-4xl font-semibold">Notifications</h1>

        {/* Section des notifications */}
        <div className="mt-12">
          <h1 className="mb-4 text-2xl font-semibold">Notifications</h1>
          {notifications.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">{section.date} :</h2>
              <ul>
                {section.items.length > 0 ? (
                  section.items.map((item) => (
                    <li key={item.id} className="mb-2">
                      {item.text}{" "}
                      <a href={item.link} className="">
                        {item.groupName || item.eventName}
                      </a>
                      .
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">Aucune notification.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
