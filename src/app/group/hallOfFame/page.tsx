import Link from "next/link";
import { useState } from "react";
import { getServerAuthSession } from "~/server/auth";
import { AppHeader } from "../../_components/header";

export default function Home() {

  return (
    <>
      <div className="max-w-xs mx-auto m-2 p-4 bg-primary-container text-center cursor-pointer shadow-lg rounded-lg transition">
        <div className="text-lg font-bold">Proposer une activité</div>
      </div>
      <main className="bg-surface grid grid-cols-1 gap-2 p-4 ml-12 mr-12">
        
      </main>
    </>
  );
}