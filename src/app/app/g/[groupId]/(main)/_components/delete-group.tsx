"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

const RemoveGroup = ({ groupId }: { groupId: number }) => {
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useMutation pour appeler la mutation removeGroup
  const removeGroupMutation = api.group.deleteGroup.useMutation({
    onError: () => {
      setError("An error occurred while removing the group.");
    },
    onSuccess: () => {
      // Rediriger l'utilisateur après avoir retiré le groupe
      window.location.href = "/";
    },
  });

  const handleRemoveGroup = () => {
    setError(null);
    removeGroupMutation.mutate({ groupId });
  };

  return (
    <div className="flex w-full justify-center">
      <div className="remove-group flex items-center justify-center rounded-3xl bg-negatif px-10 py-2 text-center text-xl font-semibold">
        {error && <p className="error">{error}</p>}
        <button onClick={handleRemoveGroup}>Delete group</button>
      </div>
    </div>
  );
};

export default RemoveGroup;
