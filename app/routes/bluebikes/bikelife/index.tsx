import { getTrips } from "app/models/bluebikes/trips.server";
import { getStations } from "app/models/bluebikes/stations.server";

import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StationMap from "app/features/bluebikes/components/StationsMap";
import styles from "mapbox-gl/dist/mapbox-gl.css";
import { getStationLocationsForTrips } from "app/features/bluebikes/utils/trips";

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
  console.log({ stations });

  return (
    <div>
      <StationMap stations={stationLocations} mapboxToken={mapboxToken} />
    </div>
  );
};

export default StationsPage;
