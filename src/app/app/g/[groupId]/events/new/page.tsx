"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import { api } from "~/trpc/react";

export default function CreateActivity({
  params,
}: {
  params: { groupId: string; eventId: string };
}) {
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventLocation, setEventLocation] = useState("");
  const [newEventDate, setEventDate] = useState("");
  const [newEndVoteDate, setEndVoteDate] = useState("");
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      startTransition(() => router.push(`/app/g/${params.groupId}/events`));
      startTransition(() => router.refresh());
    },
    onError: (error) => {
      if (!error.data?.zodError?.fieldErrors) return;
      Object.keys(error.data?.zodError?.fieldErrors).forEach((field) => {
        setInputsError((prev) => ({
          ...prev,
          // @ts-expect-error field is a key of the object
          [field]: error.data?.zodError?.fieldErrors[field][0],
        }));
      });
    },
  });

  const [inputsError, setInputsError] = useState<{
    name: string;
    description: string;
    location: string;
    date: string;
    endVoteDate: string;
  }>({
    name: "",
    description: "",
    location: "",
    date: "",
    endVoteDate: "",
  });

  function validateInputs() {
    const errors = {
      name: "",
      description: "",
      location: "",
      date: "",
      endVoteDate: "",
    };
    if (!newEventName) {
      errors.name = "Name is required";
    }
    if (!newEventDate) {
      errors.date = "Date is required";
    }
    if (!newEndVoteDate) {
      errors.endVoteDate = "End of vote is required";
    }
    setInputsError(errors);
    return (
      !errors.name &&
      !errors.description &&
      !errors.location &&
      !errors.date &&
      !errors.endVoteDate
    );
  }

  return (
    <>
      <NewFormHeader title="Organize an event" />
      <div className="mb-4 flex justify-center">
        <span
          style={{ fontSize: 80 }}
          className="material-icons rounded-full border-2 border-surface-variant p-4 text-4xl text-secondary"
        >
          event
        </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!validateInputs()) return;
          createEvent.mutate({
            name: newEventName,
            description: newEventDescription,
            location: newEventLocation,
            date: newEventDate.concat(":00Z"),
            endVoteDate: newEndVoteDate.concat(":00Z"),
            groupId: +params.groupId,
          });
        }}
        className="flex w-full max-w-md flex-col items-stretch gap-4 p-6"
      >
        <div className="flex flex-col-reverse">
          <input
            type="text"
            value={newEventName}
            placeholder="Name of the future activity."
            onChange={(e) => setNewEventName(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.name}</span>
          <label className=" font-semibold text-secondary peer-focus:underline">
            Name of the event:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <textarea
            value={newEventDescription}
            placeholder="Describe your idea of activity !"
            onChange={(e) => setNewEventDescription(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.description}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Description*:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <textarea
            value={newEventLocation}
            placeholder="Where should it took place ?"
            onChange={(e) => setEventLocation(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.location}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Location*:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, -8)}
            value={newEventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.date}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Choose a date and time for the event:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, -8)}
            max={newEventDate}
            value={newEndVoteDate}
            onChange={(e) => setEndVoteDate(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.endVoteDate}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Choose a limit date to vote:
          </label>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-container rounded-full border border-primary px-10 py-3 font-semibold transition hover:bg-surface-variant"
            disabled={createEvent.isPending}
          >
            {createEvent.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
