import AppHeader from "~/app/_components/mainMenuHeader";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
}
