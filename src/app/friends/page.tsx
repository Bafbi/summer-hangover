import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Head from "next/head";
import MainMenuHeader from "../_components/mainMenuHeader";

const Friends = () => {
  return (
    <div className="flex h-screen flex-col">
      <MainMenuHeader />

      <main
        className="bg-surface-container-lowest flex-grow overflow-y-auto overflow-x-hidden px-0 py-0"
        style={{ height: "calc(100vh - 220px)" }}
      >
        test friends pages
      </main>

      <div className="footer">
        <MainMenuFooter pathname="friends" />
      </div>
    </div>
  );
};

export default Friends;
