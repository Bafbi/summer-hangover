"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import AppHeader from "../_components/header";
import Image from "next/image";

export default function Profile() {
  const { data: profile } = api.profile.getProfile.useQuery();

  const updateProfile = api.profile.updateProfile.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.name,
      description: profile?.description,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    firstName: string;
    lastName: string;
  }) => {
    updateProfile.mutate({
      name: data.name,
      description: data.description,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-surface flex h-screen flex-col">
      <AppHeader />
      <main className="toutLeMain bg-surface mt-16 flex-grow flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-2">
        <div className="bg-surface-variant mb-4 mt-4 flex h-14 flex-col items-center rounded-md">
          <h1 className="pt-2 text-4xl font-semibold">Profile</h1>
        </div>
        <div className="profile-container mt-8 flex flex-col items-center">
          <div className="relative">
            <Image
              src={profile?.image ?? "/profileLogo.png"}
              alt="User Icon"
              className="user-icon h-40 w-40 rounded-full"
            />
            <button className="change-photo-button absolute bottom-0 right-0 rounded-full bg-inverse-primary px-2 pt-2 text-on-surface">
              <span style={{ fontSize: 28 }} className="material-icons">
                file_upload
              </span>
            </button>
          </div>
          <p className="UniqueUserName mt-3 text-3xl font-semibold">
            {profile?.name || "Cypounet"}
          </p>
        </div>
        <div
          className="form-container bg-surface mb-4 mt-2 flex w-full max-w-md flex-col
          items-center justify-center rounded-md p-3"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full items-center"
          >
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Pseudo</p>
                <input
                  type="text"
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Pseudo (unique)"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>Ce champ est requis</span>}
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Prénom</p>
                <input
                  type="text"
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Ton vrai prénom"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <span>Ce champ est requis</span>}
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Nom</p>
                <input
                  type="text"
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Ton ptit nom"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <span>Ce champ est requis</span>}
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between">
              <div>
                <p className="text-sm">Description</p>
                <textarea
                  className="w-full flex-grow rounded-md border p-2 pr-24"
                  placeholder="Présente toi auprès du reste du monde !"
                  {...register("description")}
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
              <Link
                href="/app"
                className="text-on h-15 w-35 surface bg-error ml-7 rounded-md px-6 py-3 font-semibold"
              >
                Retour
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
