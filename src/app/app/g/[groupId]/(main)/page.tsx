import Chat from "~/app/_components/chat";

export default function GroupMain({ params }: { params: { groupId: string } }) {
  return (
    <>
      <Chat groupId={+params.groupId} />
    </>
  );
}
