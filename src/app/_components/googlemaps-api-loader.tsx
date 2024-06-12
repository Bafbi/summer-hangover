"use client";

import { APILoader } from "@googlemaps/extended-component-library/react";
import { env } from "~/env";

export function GoogleMapsAPILoader() {
  return <APILoader apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />;
}
