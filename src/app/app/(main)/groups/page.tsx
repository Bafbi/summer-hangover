import Link from "next/link";
import { api } from "~/trpc/server";

export default async function GroupsPage() {
  const groups = await api.group.getGroups();

  return (
    <>
      <div className="overflow-y-scroll p-4">
        {/* Dans le cas ou l'utilisateur n'a pas encore de groupe, on affiche un fond */}
        {groups?.length == 0 && (
          <div className="z-10 flex flex-grow flex-col items-center justify-center text-on-surface-variant">
            <div className="logo justify-center pt-10">
              <span
                style={{ fontSize: 115 }}
                className="material-icons items-center justify-between"
              >
                groups
              </span>
            </div>
            <div className="bg-surface-variant mb-0 mt-0 h-20 rounded-md px-9">
              <p className="pt-2 text-center text-xl font-bold">Welcome to</p>
              <p className="pt-2 text-center text-xl font-bold">
                Summer Hangover !
              </p>
            </div>
            <div
              className="mx-7 mb-24 mt-10 flex-col items-center justify-between gap-4
              rounded-md bg-on-inverse-surface px-3 py-2 text-lg text-on-surface-variant"
            >
              <p className="text-wrap text-center text-base font-semibold">
                {
                  "Lorsque vous serez invité à rejoindre un groupe, vous pourrez le voir ici."
                }
                <br />
                <br />
              </p>
              <p className="text-wrap text-center text-sm font-semibold">
                {
                  "Vous pouvez également créer un groupe en cliquant sur le bouton ci-dessous."
                }
              </p>
            </div>
          </div>
        )}

        {/* Si l'utilisateur a des groupes  */}
        {groups?.length != 0 &&
          groups
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
                    By{" "}
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
      <Link
        href="/app/groups/new/"
        className="bg-primary fixed bottom-20 z-50 m-auto flex h-12 w-20 items-center justify-center rounded-e-3xl"
      >
        <span style={{ fontSize: 30 }} className="material-icons">
          group_add
        </span>
      </Link>
    </>
  );
}
