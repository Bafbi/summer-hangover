"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

const RemoveUser = ({
  groupId,
  userId,
}: {
  groupId: number;
  userId: number;
}) => {
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useMutation pour appeler la mutation removeUser
  const removeUserMutation = api.group.removeUserFromGroup.useMutation({
    onError: () => {
      setError("An error occurred while removing the user.");
    },
    onSuccess: () => {
      // Rediriger l'utilisateur après avoir retiré le membre
      window.location.href = "/";
    },
  });

  const handleRemoveUser = () => {
    setError(null);
    removeUserMutation.mutate({ groupId, userId: userId.toString() });
  };

  return (
    <div className="ml-5">
      <div className="remove-user">
        {error && <p className="error">{error}</p>}
        <button onClick={handleRemoveUser}>
          <span className="material-icons text-negatif">person_remove</span>
        </button>
      </div>
    </div>
  );
};

export default RemoveUser;
