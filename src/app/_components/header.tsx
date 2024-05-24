import Link from "next/link";

export const AppHeader = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-surface sticky top-0 z-10 mx-2 flex h-16 items-center justify-between border-b border-inverse-surface  px-4">
        <Link href={"/"} className="flex items-center">
          <span className="material-icons">home</span>
        </Link>
        <h1 className="text-xl font-bold text-primary underline">
          Sortie du 19/05
        </h1>
        <span></span>
      </header>
    </>
  );
};
