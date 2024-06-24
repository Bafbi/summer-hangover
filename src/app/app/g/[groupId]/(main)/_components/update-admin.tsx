"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

const UpdateAdmin = ({
  groupId,
  userId,
}: {
  groupId: number;
  userId: number;
}) => {
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useMutation pour appeler la mutation removeUser
  const updateAdminMutation = api.group.UpdateUserAdmin.useMutation({
    onError: () => {
      setError("An error occurred while updating the admin.");
    },
    onSuccess: () => {
      // Rediriger l'utilisateur après avoir retiré le membre
      window.location.href = "/";
    },
  });

  const handleUpdateAdmin = () => {
    setError(null);
    updateAdminMutation.mutate({ groupId, userId: userId.toString() });
  };

  return (
    <div className="ml-5">
      <div className="update-admin">
        {error && <p className="error">{error}</p>}
        <button onClick={handleUpdateAdmin}>
          <span className="material-icons text-winner">military_tech</span>
        </button>
      </div>
    </div>
  );
};

export default UpdateAdmin;
