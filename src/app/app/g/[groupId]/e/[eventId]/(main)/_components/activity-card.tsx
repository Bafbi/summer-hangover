"use client";
import {
  PlaceDataProvider,
  PlaceFieldText,
  PlacePhotoGallery,
} from "@googlemaps/extended-component-library/react";
import { type RouterOutputs } from "~/trpc/react";

export function ActivityCard({
  activity,
  isFavorite,
  isWinner,
}: {
  activity: RouterOutputs["activity"]["getActivities"]["activities"][0];
  isFavorite: boolean;
  isWinner: boolean;
}) {
  return (
    <>
      <div
        className={` flex aspect-card min-w-32 max-w-96 flex-col justify-between overflow-hidden  rounded-xl outline-tertiary  ${isWinner ? " bg-winner " : "bg-surface-variant"} ${isFavorite ? "outline" : ""}`}
      >
        <div className="flex flex-col p-2">
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <span className="text-lg font-bold">{activity.votes}</span>
              <span className="material-icons text-winner text-lg font-medium">
                star
              </span>
            </div>
            <span className="text-lg font-bold">{activity.name}</span>
          </div>

          <PlaceDataProvider place={activity.location}>
            <PlaceFieldText
              field="displayName"
              className="text-sm font-semibold text-outline underline"
            ></PlaceFieldText>
            <PlacePhotoGallery
              className="pointer-events-none h-16"
              maxTiles={1}
            ></PlacePhotoGallery>
          </PlaceDataProvider>
        </div>
        <div className="bg-secondary-container flex h-10 items-center justify-around gap-1 p-2">
          <span className="text-xs font-semibold">Hold to view details</span>
          <span className="material-icons">article</span>
        </div>
      </div>
    </>
  );
}
