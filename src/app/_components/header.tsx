import { useState } from "react";
import Link from "next/link";
import { AppDropMenu } from "~/app/_components/dropMenu";
import {GroupDropMenu} from "~/app/_components/dropMenu";
import {useSession } from "next-auth/react";
import { useRouter } from "next/router";




export const AppHeader = () => {

  return (
    <>
      {/* Header */}
      <header className="z-10 bg-surface sticky top-0 w-screen border-b-2">
        <div className="flex h-16 items-center justify-between  px-4 ">

            <button
              className=" focus:outline-none" >
              <span className="material-icons">home</span>
            </button>

          <h1 className="text-xl font-bold">Groupe Name</h1>
          <button
            className="">
           
          </button>
        </div>
        {/* Dropdown */}
      
      </header>
      {/* Menu */}
    </>
  );
};


