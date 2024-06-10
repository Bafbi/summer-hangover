import { RedirectType, redirect } from "next/navigation";

export default function GroupDefaultPage({
  params,
}: {
  params: { groupId: string; eventId: string };
}) {
  redirect(`${params.eventId}/chat`, RedirectType.replace);
}
