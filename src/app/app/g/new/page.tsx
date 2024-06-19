"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import { api } from "~/trpc/react";

export default function CreateGroup() {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  const createGroup = api.group.createGroup.useMutation({
    onSuccess: () => {
      startTransition(() => router.push("/app"));
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
    members: string;
  }>({
    name: "",
    description: "",
    members: "",
  });

  function validateInputs() {
    const errors = {
      name: "",
      description: "",
      members: "",
    };
    if (!newGroupName) {
      errors.name = "Name is required";
    }
    setInputsError(errors);
    return !errors.name && !errors.description && !errors.members;
  }

  const { data: contactData } = api.user.getContacts.useQuery();

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contactId)) {
        return prevSelectedContacts.filter((id) => id !== contactId);
      } else {
        return [...prevSelectedContacts, contactId];
      }
    });
  };

  return (
    <>
      <NewFormHeader title="Create a group" backLink="/app" />
      <div className="mb-4 flex justify-center">
        <span
          style={{ fontSize: 80 }}
          className="material-icons text-4xl text-on-surface-variant"
        >
          supervised_user_circle
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!validateInputs()) return;
          createGroup.mutate({
            name: newGroupName,
            description: newGroupName,
            members: selectedContacts,
          });
        }}
        className="flex w-full max-w-md flex-col items-stretch gap-4 p-6"
      >
        <div className="flex flex-col-reverse">
          <input
            type="text"
            value={newGroupName}
            placeholder="Name of the future activity."
            onChange={(e) => setNewGroupName(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.name}</span>
          <label className=" font-semibold text-secondary peer-focus:underline">
            Name of the event:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <textarea
            value={newGroupDescription}
            placeholder="Describe your idea of activity !"
            onChange={(e) => setNewGroupDescription(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          <span className="text-sm text-error">{inputsError.description}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Description*:
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-secondary">
            Contacts à ajouter*:
          </label>
          <div className="bg-surface-container h-44 overflow-y-scroll rounded-md border border-outline p-2">
            {contactData?.groups?.[0]?.members.map((member) => (
              <div
                key={member.userId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 38 }} className="material-icons">
                    account_box
                  </span>
                  <span className=" text-xl font-medium">
                    {member.user.name}
                  </span>
                </div>

                <input
                  type="checkbox"
                  title="checkbox"
                  checked={selectedContacts.includes(member.userId)}
                  onChange={() => handleCheckboxChange(member.userId)}
                  className="bg-surface-container-low h-5 w-5 items-center rounded border-primary outline-0 ring-0 focus:outline-0 focus:ring-0 focus:ring-offset-0"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-container rounded-full border border-primary px-10 py-3 font-semibold transition hover:bg-surface-variant"
            disabled={createGroup.isPending}
          >
            {createGroup.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
