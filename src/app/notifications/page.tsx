import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Head from "next/head";
import MainMenuHeader from "../_components/mainMenuHeader";

const Notifications = () => {
  return (
    <div className="flex h-screen flex-col">
      <MainMenuHeader />

      <main
        className="bg-surface-container-lowest mt-12 flex-grow overflow-y-auto overflow-x-hidden px-0 py-0"
        style={{ height: "calc(100vh - 220px)" }}
      >
        Page des notifs
      </main>
    </div>
  );
};

export default Notifications;
