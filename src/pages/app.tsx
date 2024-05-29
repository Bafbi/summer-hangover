import { type NextPage } from "next";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";

const App: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <Head>
          <title>Not Authenticated</title>
        </Head>
        <p className="text-2xl">You are not authenticated</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>App Page</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#1E5552]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl text-white">Welcome to the App, {sessionData.user?.name}</h1>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signOut()}
          >
            Sign Out
          </button>
        </div>
      </main>
    </>
  );
};

export default App;
