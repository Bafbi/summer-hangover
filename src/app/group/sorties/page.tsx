  import Link from "next/link";
  import { useState } from "react";
  import { getServerAuthSession } from "~/server/auth";
  import { AppHeader } from "../../_components/header";

  export default function Home() {

    return (
      <>
        <div className="max-w-xs mx-auto m-2 p-4 bg-primary-container text-center cursor-pointer shadow-md rounded-lg transition">
          <Link href="/create-sortie" passHref>
            <div className="text-lg font-bold">Proposer une activité</div>
          </Link>
        </div>
        <main className="bg-surface grid grid-cols-1 gap-2 p-4 ml-12 mr-12">
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link><Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
          <Link href="/other-content-1" className=" max-w-xs mx-auto p-4 bg-secondary-container text-center cursor-pointer h-20 w-full flex items-center justify-center rounded-lg transition" passHref>
            <div>
              Soirée du 8/10
            </div>
          </Link>
        </main>
      </>
    );
  }