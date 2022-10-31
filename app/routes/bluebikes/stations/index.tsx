import { getStations } from "app/models/bluebikes/stations.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StationMap from "app/features/bluebikes/components/StationsMap";
import styles from "mapbox-gl/dist/mapbox-gl.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request, params }: LoaderArgs) {
  const stations = await getStations();
  if (!stations) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ stations, mapboxToken: process.env.MAPBOX_ACCESS_TOKEN });
}

const StationsPage = () => {
  const { stations, mapboxToken } = useLoaderData<typeof loader>();

  return (
    <div>
      <StationMap mapboxToken={mapboxToken} stations={stations} />
    </div>
  );
};

export default StationsPage;
