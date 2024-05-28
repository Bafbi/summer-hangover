"use client";

import Pusher from "pusher-js";
import { env } from "~/env";

export default function GroupMain() {
  const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  });

  const channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data: any) {
    alert(JSON.stringify(data));
  });

  return (
    <>
      <main>
        <h1>Group Main</h1>
      </main>
    </>
  );
}
