import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import {Chat, List, EmojiEvents } from '@mui/icons-material';


export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <html>
    <head>
    <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
    </head>
    <main className="flex flex-col min-h-screen">
      <p>test</p>
    </main>
    <footer className="bg-surface-variant pt-0">
      <div className="flex items-center  justify-between px-4 py-2">
        <button>
        <span className="material-icons">chat</span>
        </button>
        <span className="mx-2 h-12 w-0.5"></span>
        <button>
        <span className="material-icons">list</span>
        </button>
        <span className="mx-2 h-12 w-0.5"></span>
        <button>
        <span className="material-icons">emoji_events</span>
        </button>
      </div>
    </footer>
    </html>
  );
}
