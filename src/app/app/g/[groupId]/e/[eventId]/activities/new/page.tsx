"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { NewFormHeader } from "~/app/app/(main)/_components/new-form-header";
import { api } from "~/trpc/react";
// import "~/styles/google-component.css";

import {
  PlaceOverview,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import { GoogleMapsAPILoader } from "~/app/_components/googlemaps-api-loader";

function CreateActivity({
  params,
}: {
  params: { groupId: string; eventId: string };
}) {
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [newActivityLocation, setActivityLocation] = useState("");
  const placePickerRef = useRef(null);
  const placeOverviewRef = useRef(null);
  const [inputsError, setInputsError] = useState<{
    name: string;
    description: string;
    location: string;
  }>({ name: "", description: "", location: "" });

  function validateInputs() {
    const errors = {
      name: "",
      description: "",
      location: "",
    };
    if (!newActivityName) {
      errors.name = "Name is required";
    }
    if (!newActivityLocation) {
      errors.location = "Location is required";
    }
    setInputsError(errors);
    return !errors.name && !errors.description && !errors.location;
  }

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isPending, startTransition] = useTransition();

  const createActivity = api.activity.createActivity.useMutation({
    onSuccess: () => {
      startTransition(() =>
        router.push(`/app/g/${params.groupId}/e/${params.eventId}/activities`),
      );
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!placeOverviewRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (placeOverviewRef.current as any).travelOrigin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }, []);

  return (
    <>
      <GoogleMapsAPILoader />
      <NewFormHeader title="Propose an activity" />
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
          if (!validateInputs()) return;
          createActivity.mutate({
            name: newActivityName,
            description: newActivityDescription.length
              ? newActivityDescription
              : undefined,
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
          <span className="text-sm text-error">{inputsError.name}</span>
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
          <span className="text-sm text-error">{inputsError.description}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Description*:
          </label>
        </div>
        <div className="flex flex-col-reverse">
          <PlaceOverview ref={placeOverviewRef} size="large" />

          <PlacePicker
            ref={placePickerRef}
            onPlaceChange={() => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
              (placeOverviewRef.current as any).place =
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                (placePickerRef.current as any).value;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
              setActivityLocation((placeOverviewRef.current as any).place.id);
            }}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          />
          {/* <textarea
            value={newActivityLocation}
            placeholder="Where should it took place ?"
            onChange={(e) => setActivityLocation(e.target.value)}
            className="peer bg-surface-container w-full rounded-md border-outline transition focus:border-tertiary focus:ring-tertiary"
          /> */}

          <span className="text-sm text-error">{inputsError.location}</span>
          <label className="font-semibold text-secondary peer-focus:underline">
            Location:
          </label>
        </div>
        {/* <div>
          <PlacePicker
            ref={placePickerRef}
            onPlaceChange={() => {
              placeOverviewRef.current.place = placePickerRef.current.value;
            }}
          />

          <PlaceOverview ref={placeOverviewRef} size="large" />
        </div> */}

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
