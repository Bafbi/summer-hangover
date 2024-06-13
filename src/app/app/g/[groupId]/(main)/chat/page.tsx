import { Suspense } from "react";
import Chat from "~/app/app/(main)/_components/chat";

export default function GroupMain({ params }: { params: { groupId: string } }) {
  return (
    <>
      <Chat groupId={+params.groupId} />
    </>
  );
}
