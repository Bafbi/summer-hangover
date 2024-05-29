"use client";
import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Head from "next/head";
import MainMenuHeader from "~/app/_components/mainMenuHeader";
import Link from "next/link";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="bg-surface flex h-screen flex-col">
        <MainMenuHeader />
        <main className="toutLeMain bg-surface mt-16 flex-grow flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-2">
          <div className="bg-surface-variant mb-4 mt-6 flex h-14 flex-col items-center rounded-md">
            <h1 className="pt-2 text-4xl font-semibold">Profile</h1>
          </div>
          <div className="profile-container mt-10 flex flex-col items-center">
            <div className="relative">
              <img
                src="/profileLogo.png"
                alt="User Icon"
                className="user-icon h-40 w-40 rounded-full"
              />
              <button className="change-photo-button absolute bottom-0 right-0 rounded-full bg-inverse-primary px-2 pt-2 text-on-surface">
                <span style={{ fontSize: 28 }} className="material-icons">
                  settingsa
                </span>
              </button>
            </div>
            <p className="UniqueUserName mt-3 text-3xl font-semibold">
              Cypounet
            </p>
          </div>
          <div
            className="form-container mb-4 mt-4 flex w-full max-w-md flex-col items-center 
          rounded-md bg-on-inverse-surface p-4"
          >
            {[
              {
                label: "Username",
                type: "text",
                placeholder: "Pseudo (unique)",
              },
              {
                label: "First Name",
                type: "text",
                placeholder: "Prénom",
              },
              {
                label: "Last Name",
                type: "text",
                placeholder: "Nom de famille",
              },
              {
                label: "Email",
                type: "email",
                placeholder: "Email",
              },
              {
                label: "Password",
                type: "password",
                placeholder: "Mot de passe",
              },
              {
                label: "Bio",
                type: "textarea",
                placeholder: "Présente toi auprès du reste du monde !",
              },
            ].map((field) => (
              <div key={field.label} className="mb-4 flex w-full items-center">
                {field.type === "textarea" ? (
                  <textarea
                    className="border-gray-300 flex-grow rounded-md border p-2"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="border-gray-300 flex-grow rounded-md border p-2"
                    placeholder={field.placeholder}
                  />
                )}
                <button className="bg-red-500 ml-2 rounded-full p-2 text-white">
                  <span className="material-icons">close</span>
                </button>
              </div>
            ))}
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
