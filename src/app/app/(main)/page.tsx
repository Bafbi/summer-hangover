import Link from "next/link";
import { AppHeader } from "~/app/_components/mainMenuHeader";
import { api } from "~/trpc/server";

export default async function GroupsPage() {
  const groups = await api.group.getGroups();

  return (
    <>
      <AppHeader />
      <div className="flex h-screen flex-col">
        <div className="mb-18 bg-surface mt-16 flex-grow overflow-y-auto p-4">
          {groups
            ?.slice()
            .reverse()
            .map((group) => (
              <Link
                key={group.id}
                href={`/app/g/${group.id}`}
                className="bg-surface-variant mb-4 flex h-28 flex-col overflow-hidden rounded-md"
              >
                <div
                  className="bg-secondary-container flex items-center justify-between border-b
                  border-outline-variant px-1 pb-1 pt-2"
                >
                  <span className="text-xl font-semibold">{group.name}</span>
                  <span className="text-right">
                    Par{" "}
                    <span className="font-semibold">
                      {group.createdBy.name}
                    </span>
                  </span>
                </div>
                <div>
                  <div className="px-1 py-1">
                    <span
                      style={{ fontSize: 18 }}
                      className="material-icons pl-1 pr-2 pt-2"
                    >
                      people
                    </span>
                    <span className="text-left text-sm text-on-surface-variant">
                      {group.members
                        .map((member) => member.user.name)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center">
          <Link
            href="app/g/new/"
            passHref
            className="my-4 flex items-center justify-between space-x-6 rounded-3xl
              bg-inverse-primary px-10 py-2 text-xl font-semibold text-inverse-surface"
          >
            <span className="text-center text-xl font-semibold">
              Ajouter un <br></br> nouveau groupe
            </span>
            <span style={{ fontSize: 44 }} className="material-icons">
              add
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
