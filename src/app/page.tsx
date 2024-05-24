import { signIn } from "next-auth/react";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { SendFriendRequest } from "./_components/send-friend-request";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className=" flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to tRPC</h1>
      <span className="material-icons">search</span>
      <CrudShowcase />
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const friends = await api.friend.getFriends();

  console.log(friends);

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-2xl font-bold">Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.friendId} className="flex items-center space-x-2">
            <span className="material-icons">person</span>
            <span>{friend.friendId}</span>
          </li>
        ))}
      </ul>

      <SendFriendRequest />
    </div>
  );
}
