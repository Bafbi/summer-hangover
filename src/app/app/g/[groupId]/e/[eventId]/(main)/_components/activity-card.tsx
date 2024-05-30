export type  Activity= {
  id: number | null;
  name: string;
  description: string | null;
  groupId: number | null;
  createdBy: string;
  eventId: number | null;
  location: string;
}


export function ActivityCard({
  activity,
  isFavorite,
}: {
  activity: Activity;
  isFavorite: boolean;
}

) {
  return (
    <>
      <div
        className={`bg-surface-variant flex aspect-card min-w-32 max-w-96 flex-col justify-between overflow-hidden  rounded-xl  outline-tertiary ${isFavorite ? "outline" : ""}`}
      >
        <div className="flex flex-col p-2">
          <span className="text-lg font-semibold">{activity.name}</span>
          <span className="text-sm font-medium text-outline">
            Lieux: {activity.location}
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
