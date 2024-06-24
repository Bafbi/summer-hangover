import { redirect, RedirectType } from "next/navigation";

export default async function GroupsPage() {
  redirect(`app/groups`, RedirectType.replace);
}
