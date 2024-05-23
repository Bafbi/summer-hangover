"use client";
import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Header from "~/app/_components/mainMenuHeader";
import Head from "next/head";
import MainMenuHeader from "~/app/_components/mainMenuHeader";

const Menu = () => {
  return (
    <>
      <Head>
        <title>{`Summer hangover`}</title>
      </Head>
      <div className="flex h-screen flex-col">
        <MainMenuHeader />

        <main
          className="bg-surface-container-lowest flex-grow overflow-y-auto overflow-x-hidden px-0 py-0"
          style={{ height: "calc(100vh - 220px)" }}
        >
          test menu pages
        </main>

        <div className="footer">
          <MainMenuFooter pathname="menu" />
        </div>
      </div>
    </>
  );
};

export default Menu;
