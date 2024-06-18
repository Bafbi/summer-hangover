"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import { api } from "~/trpc/react";

const CreateTricount = ({
  params,
}: {
  params: { groupId: string; eventId: string };
}) => {
  const [NewTricountLabel, setTricountLabel] = useState("");
  const [NewTricountPrice, setTricountPrice] = useState("");

  const router = useRouter();

  const createTricount = api.tricount.createTricount.useMutation({
    onSuccess: () => {
      router.back();
      setTricountLabel("");
      setTricountPrice("");
    },
  });

  return (
    <>
      <NewFormHeader title="Create Expense" />

      <div className="flex h-screen flex-col">
        <main className="bg-surface mt-16 flex-grow p-4 text-on-surface-variant">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTricount.mutate({
                label: NewTricountLabel,
                amount: +NewTricountPrice,
                groupId: +params.groupId,
                eventId: +params.eventId,
              });
            }}
          >
            <div className="mb-4 flex justify-center">
              <span
                style={{ fontSize: 80 }}
                className="material-icons text-4xl text-on-surface-variant"
              >
                paid
              </span>
            </div>
            <h1 className="-mt-2 text-center text-xl font-semibold">
              Create Expense
            </h1>
            <div className="mt-4">
              <label className="text-outlined block text-xl font-medium">
                Label :
              </label>
              <input
                type="text"
                value={NewTricountLabel}
                placeholder="Name of the expense... "
                onChange={(e) => setTricountLabel(e.target.value)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label className="text-outlined block text-xl font-medium">
                Price :
              </label>
              <textarea
                value={NewTricountPrice}
                placeholder="Amount of the expense..."
                onChange={(e) => setTricountPrice(e.target.value)}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500 mt-1 block w-full rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                disabled={createTricount.isPending}
              >
                {createTricount.isPending ? "Submitting..." : "Submit"}
              </button>
              <Link
                href="/app"
                className="hover:bg-indigo-700 text-on h-15 w-35 surface bg-error ml-7 rounded-md px-6 py-3"
              >
                Annuler
              </Link>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default CreateTricount;
