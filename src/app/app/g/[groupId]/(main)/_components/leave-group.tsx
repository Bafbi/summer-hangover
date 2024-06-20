"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

const LeaveGroup = ({ groupId }: { groupId: number }) => {
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useMutation pour appeler la mutation leaveGroup
  const leaveGroupMutation = api.group.leaveGroup.useMutation({
    onError: (_) => {
      setError("An error occurred while leaving the group.");
    },
    onSuccess: () => {
      // Rediriger l'utilisateur après avoir quitté le groupe
      window.location.href = "/";
    },
  });

  const handleLeaveGroup = () => {
    setError(null);
    leaveGroupMutation.mutate({ groupId });
  };

  return (
    <div className="fixed bottom-0 mb-5 flex w-full justify-center">
      <div className="leave-group flex items-center justify-center rounded-3xl bg-negatif px-10 py-2 text-center text-xl font-semibold">
        {error && <p className="error">{error}</p>}
        <button onClick={handleLeaveGroup}>Leave group</button>
      </div>
    </div>
  );
};

export default LeaveGroup;
