export default function AppHeader() {
  return (
    <div className="bg-surface-variant fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between px-4">
      <div className="flex-1 justify-between text-on-surface">
        <p className="text-2xl text-on-surface subpixel-antialiased">
          Summer Hangover
        </p>
      </div>
      <div className="flex justify-around space-x-7 pr-1 text-on-surface-variant">
        <div className="relative flex items-center justify-center ">
          <span className="material-icons animate-shake relative animate-ping text-error">
            notifications
          </span>
        </div>

        <span className="material-icons">account_circle</span>
      </div>
    </div>
  );
}
