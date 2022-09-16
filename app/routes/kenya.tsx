import { useState } from "react";
import RiderSelect from "~/features/kenya/components/RiderSelect";
import { getTrips } from "~/models/trip.server";
import { getRiders } from "app/models/rider.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import { formatTrips, getHeatMap } from "~/features/kenya/utils/trip";
import ToyotaPradoHeatMap from "~/features/kenya/components/ToyotaPradoHeatMap";
import Trip from "~/features/kenya/components/Trip";
import Intro from "~/features/kenya/components/Intro";
import TripMedia from "~/features/kenya/components/TripMedia";

export async function loader({ request, params }: LoaderArgs) {
  const trips = await getTrips();
  if (!trips) {
    throw new Response("Not Found", { status: 404 });
  }

  const riders = await getRiders();

  return json({ trips, riders });
}

export default function Kenya() {
  const user = useOptionalUser();
  const { trips, riders } = useLoaderData<typeof loader>();

  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);
  // @ts-ignore - need to figure out why datetime converts from Date to string in useLoaderData
  const formattedData = formatTrips(trips, selectedRiderId);

  // @ts-ignore
  const seats = getHeatMap(trips, selectedRiderId);

  const currentRider = selectedRiderId
    ? riders.find((rider) => rider.id === selectedRiderId)
    : null;

  const name = currentRider?.firstName || "All Riders";

  return (
    <div className="text-center">
      <div className="p-8">
        <Intro />
      </div>
      <h3 className="mt-8 text-2xl">Riders</h3>
      <p>Filter trips for selected rider</p>
      <RiderSelect
        riders={riders}
        selectedRiderId={selectedRiderId}
        onClick={(riderId: string) => {
          if (riderId === selectedRiderId) {
            setSelectedRiderId(null);
          } else {
            setSelectedRiderId(riderId);
          }
        }}
      />
      <button
        disabled={selectedRiderId ? false : true}
        className="rounded-full bg-blue-500 py-1 px-4 font-bold text-white hover:bg-blue-700 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        onClick={() => setSelectedRiderId(null)}
      >
        Reset Selection
      </button>
      <div className="mt-8">
        <p className="text-2xl">{name} Seating Heat Map</p>
        <ToyotaPradoHeatMap heatMap={seats} />
      </div>
      {formattedData.map((tripsInDay) => {
        return (
          <div
            key={tripsInDay.date}
            className="m-auto max-w-[960px] p-4 even:bg-slate-100"
          >
            <h2 className="text-2xl">{tripsInDay.displayDayDate}</h2>
            <div className="flex flex-wrap gap-4 p-4">
              {tripsInDay.trips.map((trip) => {
                return (
                  <div key={trip.id} className="sm: w-full md:w-[200px] ">
                    <Trip trip={trip} selectedRiderId={selectedRiderId} />
                  </div>
                );
              })}
            </div>
            <div className="m-auto max-w-[640px]">
              {tripsInDay.media.map((medium) => {
                return (
                  <div className="mt-4" key={medium.src}>
                    <TripMedia medium={medium} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
