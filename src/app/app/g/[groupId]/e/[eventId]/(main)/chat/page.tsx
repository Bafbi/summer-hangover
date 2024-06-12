import Chat from "~/app/app/(main)/_components/chat";

export default function EventMain({
  params,
}: {
  params: { groupId: string; eventId: string };
}) {
  return (
    <>
      <Chat groupId={+params.groupId} eventId={+params.eventId} />
    </>
  );
}
