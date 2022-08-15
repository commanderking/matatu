import { useState } from "react";
import RiderSelect from "app/components/RiderSelect";
import ToyotaPrado from "app/components/ToyotaPrado";
import { getTrips } from "~/models/trip.server";
import { getRiders } from "app/models/rider.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import { formatTrips, getHeatMap } from "app/utils/trip";
import ToyotaPradoHeatMap from "app/components/ToyotaPradoHeatMap";
import TripMap from "app/components/TripMap";

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
      <TripMap
        route={{ id: 101, start: "Mpala Research Center", end: "Mt. Kenya" }}
      />
      {formattedData.map((trip) => {
        return (
          <div key={trip.id} className="min-h-screen">
            <h3 className="text-2xl">{trip.displayDate}</h3>
            <div className="inline-block">
              <TripMap route={trip.route} />
            </div>
            <div className="inline-block">
              <ToyotaPrado trip={trip} currentRiderId={selectedRiderId} />
            </div>
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
