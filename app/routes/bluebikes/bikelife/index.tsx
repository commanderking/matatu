import { getTrips } from "app/models/bluebikes/trips.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StationMap from "app/features/bluebikes/components/StationsMap";
import styles from "mapbox-gl/dist/mapbox-gl.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request, params }: LoaderArgs) {
  const trips = await getTrips({ bikeId: 7380 });
  if (!trips) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ trips, mapboxToken: process.env.MAPBOX_ACCESS_TOKEN });
}

const StationsPage = () => {
  const { trips, mapboxToken } = useLoaderData<typeof loader>();

  console.log({ trips });

  return <div></div>;
};

export default StationsPage;
