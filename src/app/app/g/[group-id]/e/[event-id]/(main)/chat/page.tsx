import Link from "next/link";
import { useState } from "react";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { AppHeader } from "../../_components/header";
export default async function Home() {

  const session = await getServerAuthSession();

  return (
   <>
   
      
        <main className="bg-primary">

        </main>
        
    </>
  );
}
