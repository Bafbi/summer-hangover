import { RedirectType, redirect } from "next/navigation";

export default function GroupDefaultPage({
  params,
}: {
  params: { groupId: string };
}) {
  redirect(`${params.groupId}/chat`, RedirectType.replace);
}
