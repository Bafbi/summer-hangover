"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import { api } from "~/trpc/react";

function CreateActivity({
  params,
}: {
  params: { groupId: string; eventId: string };
}) {
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [newActivityLocation, setActivityLocation] = useState("");

  const router = useRouter();

  const createActivity = api.activity.createActivity.useMutation({
    onSuccess: () => {
      router.back();
      setNewActivityName("");
      setNewActivityDescription("");
      setActivityLocation("");
    },
  });

  return (
    <>
      <NewFormHeader title="Propose an activity" backLink="activities" />
      <div className="mb-4 flex justify-center">
        <span
          style={{ fontSize: 80 }}
          className="material-icons rounded-full border-2 border-surface-variant p-4 text-4xl text-secondary"
        >
          celebration
        </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createActivity.mutate({
            name: newActivityName,
            description: newActivityDescription,
            location: newActivityLocation,
            groupId: +params.groupId,
            eventId: +params.eventId,
          });
        }}
        className="flex w-full max-w-md flex-col items-stretch gap-4 p-6"
      >
        <div className="flex flex-col-reverse">
          <input
            type="text"
            value={newActivityName}
            placeholder="Name of the future activity."
            onChange={(e) => setNewActivityName(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <label className=" font-semibold text-secondary peer-focus:underline">
            Name of the activity:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <textarea
            value={newActivityDescription}
            placeholder="Describe your idea of activity !"
            onChange={(e) => setNewActivityDescription(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <label className="font-semibold text-secondary peer-focus:underline">
            Description:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <textarea
            value={newActivityLocation}
            placeholder="Where should it took place ?"
            onChange={(e) => setActivityLocation(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <label className="font-semibold text-secondary peer-focus:underline">
            Location:
          </label>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-container rounded-full border border-primary px-10 py-3 font-semibold transition hover:bg-surface-variant"
            disabled={createActivity.isPending}
          >
            {createActivity.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateActivity;
