import { AppHeader } from "~/app/app/(main)/_components/header";
import { AppFooter } from "./_components/app-footer";
import { NotifivationSection } from "./_components/notif-section";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="flex flex-grow flex-col">{children}</main>
      <AppFooter
        sections={["notifications", "groups", "agenda"]}
        icons={["notifications", "group", "date_range"]}
        customSections={new Map([[0, <NotifivationSection key={0} />]])}
      />
    </>
  );
}
