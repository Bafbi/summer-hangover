
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {

  const session = await getServerAuthSession();

  return (
    <main>
 <footer className="bg-[#1E5552] pt-0 text-[#E49A0A]">
          <div className="flex items-center  justify-between px-4 py-2">
            <button>

            </button>
            <span className="mx-2 h-12 w-0.5 bg-[#E49A0A]"></span>
            <button>

            </button>
            <span className="mx-2 h-12 w-0.5 bg-[#E49A0A]"></span>
            <button>

            </button>
          </div>
        </footer>
    </main>
  );

}
