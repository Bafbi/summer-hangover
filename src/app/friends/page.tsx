"use client";
import React from "react";
import MainMenuFooter from "~/app/_components/mainMenuFooter";
import Head from "next/head";

const Friends = () => {
  return (
    <>
      <Head>
        <title>{`Summer hangover`}</title>
      </Head>
      <div className="flex h-screen flex-col">
        <div className="header">
          <p>It just works friends</p>
        </div>

        <main
          className="bg-[#405340] flex-grow overflow-y-auto overflow-x-hidden px-0 py-0"
          style={{ height: "calc(100vh - 220px)" }}
        >
          test friends pages
        </main>
        <div className="footer">
          <MainMenuFooter />
        </div>
      </div>
    </>
  );
};

export default Friends;
