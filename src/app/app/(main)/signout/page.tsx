import { signOut } from "next-auth/react";

export default function SignOutPage() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-4 bg-white border border-gray-300 shadow-lg">
        <p className="text-lg mb-4">Voulez-vous vous déconnecter ?</p>
        <div className="flex justify-around">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Oui
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
