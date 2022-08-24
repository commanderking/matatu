import { useState } from "react";
import RiderSelect from "app/components/RiderSelect";
import { getTrips } from "~/models/trip.server";
import { getRiders } from "app/models/rider.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import { formatTrips, getHeatMap } from "app/utils/trip";
import ToyotaPradoHeatMap from "app/components/ToyotaPradoHeatMap";
import Trip from "app/components/Trip";

export async function loader({ request, params }: LoaderArgs) {
  const trips = await getTrips();
  if (!trips) {
    throw new Response("Not Found", { status: 404 });
  }

  const riders = await getRiders();

  return json({ trips, riders });
}

export default function Index() {
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
      {formattedData.map((tripsInDay) => {
        return (
          <div key={tripsInDay.date} className="p-4 odd:bg-slate-100">
            <h2 className="text-4xl">{tripsInDay.date}</h2>
            {tripsInDay.trips.map((trip) => {
              return (
                <div key={trip.id} className="pt-8">
                  <Trip trip={trip} selectedRiderId={selectedRiderId} />
                </div>
              );
            })}
          </div>
        );
      })}
      <h3 className="mt-8 text-3xl">Riders</h3>
      <p>Filter trips for selected rider</p>
      <RiderSelect
        riders={riders}
        selectedRiderId={selectedRiderId}
        onClick={(riderId: string) => setSelectedRiderId(riderId)}
      />
      <p className="text-2xl">{name} Heat Map</p>
      <ToyotaPradoHeatMap heatMap={seats} />
      <h3 className="mt-8 mb-8 text-3xl">Trips ({formattedData.length})</h3>
    </div>
  );
}
