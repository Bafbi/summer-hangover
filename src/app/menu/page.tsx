"use client";
import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import { Icon, Link } from "@mui/material";

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

  return (
    <>
      <Head>
        <title>{`Summer Hangover`}</title>
      </Head>
      <MainMenuHeader />
      <div className="mt-16 flex h-screen flex-col">
        <main className="bg-surface grid flex-grow auto-rows-min grid-cols-2 gap-4 overflow-y-auto p-4">
          {groups.map((group, index) => (
            <Link
              key={index}
              href={group.href}
              className="border-th bg-surface-variant relative flex h-40 w-full cursor-pointer flex-col
              overflow-hidden rounded-xl border-current p-2 text-left 
              no-underline transition-transform duration-200 ease-in-out hover:scale-105
              hover:border-transparent"
            >
              <div className="-mb-1 text-base font-semibold no-underline">
                {group.name}
              </div>
              <div className="text-gray-800 mb-2 text-xs no-underline">
                Par {group.creator}
              </div>
              <span className="h-0.5 w-screen bg-on-surface"></span>
              <div
                className="rotate-10 bg-secondary absolute inset-0 origin-top-left 
              -translate-x-full transform rounded-xl transition-transform duration-200
              ease-out hover:translate-x-0"
              ></div>
            </Link>
          ))}
          {/* Case pour ajouter un nouveau groupe */}
          <div
            className="border-th bg-primary-container relative flex h-40 w-full cursor-pointer flex-col
              items-center justify-center overflow-hidden rounded-xl border-current p-2 text-left 
              no-underline transition-transform duration-200 ease-in-out hover:scale-105
              hover:border-transparent"
          >
            <Icon style={{ fontSize: 50 }} className="text-on-surface-variant">
              add
            </Icon>
            <p className="text-center">Ajouter un nouveau groupe</p>
          </div>
        </main>

        <div className="footer"></div>
      </div>
    </>
  );
};

export default Menu;
