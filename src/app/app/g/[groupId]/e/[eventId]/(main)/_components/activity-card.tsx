"use client"
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export type  Activity= {
  id: number ;
  name: string;
  description: string | null;
  groupId: number;
  createdBy: string & {
    
    name: string;
   
};
  eventId: number ;
  location: string;
}


export  function ActivityCard({
  activity,
  isFavorite,
  timeEndVote,
}: {
  activity: Activity;
  isFavorite: boolean;
  timeEndVote:boolean
}

) {

  const vote =  api.activity.getVotes.useQuery({groupId: activity.groupId, eventId: activity.eventId,activityId: activity.id});
  const isWinner =  api.activity.isFavorite.useQuery({groupId: activity.groupId, eventId: activity.eventId,activityId: activity.id});




  
//return true if this activity has most votes


  return (
    <>
      <div
        className={` flex aspect-card min-w-32 max-w-96 flex-col justify-between overflow-hidden  rounded-xl outline-tertiary  ${(timeEndVote && isWinner.data ) ? " bg-winner " : "bg-surface-variant"} ${isFavorite ? "outline" : ""}`}
      >
        <div className="flex flex-col p-2">
          <span className="text-lg font-semibold">{activity.name}</span>
          <span className="text-sm font-medium text-outline">
            Lieux: {activity.location}
          </span>
          <span className="text-sm font-medium text-outline">
            Number of votes: {vote.data?.count}
          </span>
        </div>
        <div className="bg-secondary-container flex h-10 items-center justify-around gap-1 p-2">
          <span className="text-xs font-semibold">Hold to view details</span>
          <span className="material-icons">article</span>
        </div>
      </div>
    </>
  );
}
