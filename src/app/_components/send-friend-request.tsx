"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function SendFriendRequest() {
  const router = useRouter();
  const [friendId, setFriendId] = useState("");

  const sendFriendRequest = api.group.createGroup.useMutation({
    onSuccess: () => {
      router.refresh();
      setFriendId("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendFriendRequest.mutate({
          name: "pis",
          members: []
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={sendFriendRequest.isPending}
      >
        {sendFriendRequest.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
