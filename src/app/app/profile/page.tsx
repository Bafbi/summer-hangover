"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import { NewFormHeader } from "../(main)/_components/new-form-header";
import Link from "next/link";

export default function Profile() {
  const { data: profile, refetch: refetchProfile } =
    api.profile.getProfile.useQuery();

  const updateProfile = api.profile.updateProfile.useMutation();

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [name, setName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      if (profile.firstName) setFirstName(profile.firstName);
      if (profile.lastName) setLastName(profile.lastName);
      if (profile.description) setDescription(profile.description);
    }
  }, [profile]);

  return (
    <>
      <NewFormHeader title="Profile" backLink="/app" />
      <main className="bg-surface flex-grow flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-2">
        {profile && (
          <div className="profile-container mt-8 flex flex-col items-center">
            <div className="relative">
              <Image
                src={profileImageUrl ?? profile.image ?? "/profileLogo.png"}
                alt="User Icon"
                className="user-icon h-40 w-40 rounded-full"
                width={160}
                height={160}
              />
              <button className="change-photo-button absolute bottom-0 right-1 rounded-3xl bg-inverse-primary text-on-surface">
                <UploadButton
                  endpoint="updateProfilePicture"
                  onClientUploadComplete={(res) => {
                    if (res[0]?.url) setProfileImageUrl(res[0]?.url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </button>
            </div>
            <p className="UniqueUserName mt-3 text-3xl font-semibold">
              {profile.name}
            </p>
          </div>
        )}
        <div
          className="form-container bg-surface mb-4 mt-2 flex w-full max-w-md flex-col
          items-center justify-center rounded-md p-3"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              updateProfile.mutate({
                name: name,
                firstName: firstName,
                lastName: lastName,
                description: description,
              });
              await refetchProfile();
            }}
            className="w-full items-center"
          >
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Pseudo</p>
                <input
                  type="text"
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Pseudo (unique)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Prénom</p>
                <input
                  type="text"
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Ton vrai prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Nom</p>
                <input
                  type="text"
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Ton ptit nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Description</p>
                <textarea
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Présente toi auprès du reste du monde !"
                  value={description}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button
                type="submit"
                className="hover:bg-indigo-700 surface h-15 w-35 bg-primary-container rounded-md px-6 py-3 font-semibold text-on-surface"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
        <Link href={"/api/auth/signout"}>Signout</Link>
      </main>
    </>
  );
}
