"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react"; // Assurez-vous que ce chemin est correct

const LeaveGroup = ({ groupId }: { groupId: number }) => {
  const [error, setError] = useState<string | null>(null);
  
  // Utilisation de useMutation pour appeler la mutation leaveGroup
  const leaveGroupMutation = api.group.leaveGroup.useMutation({
    onError: (error) => {
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
    <div className="w-full flex justify-center fixed bottom-0 mb-10">
      <div className="leave-group rounded-3xl bg-negatif px-10 py-2 text-xl font-semibold flex items-center justify-center text-center">
        {error && <p className="error">{error}</p>}
        <button onClick={handleLeaveGroup}>Leave group</button>
      </div>
    </div>
  );
};

export default LeaveGroup;
