import { getTrips } from "app/models/bluebikes/trips.server";
import { getStations } from "app/models/bluebikes/stations.server";

import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StationMap from "app/features/bluebikes/components/StationsMap";
import styles from "mapbox-gl/dist/mapbox-gl.css";
import {
  getStationLocationsForTrips,
  getTripsByDate,
} from "app/features/bluebikes/utils/trips";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request, params }: LoaderArgs) {
  const trips = await getTrips({ bikeId: 7380 });
  const stations = await getStations();
  if (!trips) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    trips,
    stations,
    mapboxToken: process.env.MAPBOX_ACCESS_TOKEN,
  });
}

const StationsPage = () => {
  const { trips, stations, mapboxToken } = useLoaderData<typeof loader>();

  const stationLocations = getStationLocationsForTrips(trips, stations);
  console.log({ stationLocations });
  console.log({ trips });

  const tripsByDate = getTripsByDate(trips, stations);
  console.log({ tripsByDate });

  return (
    <div>
      <StationMap stations={stationLocations} mapboxToken={mapboxToken} />
      <h1>Stations By Day</h1>
      {Object.values(tripsByDate)
        .filter((tripsOnDay) => tripsOnDay.length >= 3)
        .map((tripsOnDay) => {
          const startStations = tripsOnDay.map((trip) => trip.startStation);

          return (
            <div className="w-[500px]">
              <h1>{tripsOnDay[0].startTime}</h1>
              <StationMap
                stations={startStations}
                mapboxToken={mapboxToken}
                height={400}
              />
            </div>
          );
        })}
    </div>
  );
};

export default StationsPage;
