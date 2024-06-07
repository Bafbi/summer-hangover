import Link from "next/link";

export default function AppHeader() {
  return (
    <div className="bg-surface border-b border-inverse-surface fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between px-4">
      <div className="flex-1 justify-between text-on-surface">
        <p className="text-2xl text-on-surface">
          Summer Hangover
        </p>
      </div>
      <div className="flex justify-around space-x-7 pr-1 text-on-surface-variant">
        <Link
          href="app/notification"
          passHref
          className="relative flex items-center justify-center "
        >
          <span
            style={{ fontSize: 36 }}
            className="material-icons animate-shake relative animate-ping text-error"
          >
            notifications
          </span>
        </Link>
        <Link
          href="app/profile"
          passHref
          className="relative flex items-center justify-center "
        >
          <span style={{ fontSize: 36 }} className="material-icons">
            account_circle
          </span>
        </Link>
      </div>
    </div>
  );
}
