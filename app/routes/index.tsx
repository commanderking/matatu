import VehicleWheel from "~/components/VehicleWheel";
import Seat from "~/components/Seat";
import RowOfSeats from "~/components/RowOfSeats";
import { getTrips } from "~/models/trip.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import {
  vehicleWidth,
  wheelWidth,
  seatWidth,
  seatHeight,
} from "app/constants/vehicle";

import { processTripsForVehicleVisualization } from "app/utils/trip";
import { traceDeprecation } from "process";

export async function loader({ request, params }: LoaderArgs) {
  const trips = await getTrips();
  if (!trips) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ trips });
}

export default function Index() {
  const user = useOptionalUser();
  const { trips } = useLoaderData<typeof loader>();

  const svgHeight = 350;
  const svgWidth = 200;

  const vehicleFrontHeight = 100;
  const vehicleBaseHeight = 220;
  const vehicleBaseYOffset = vehicleFrontHeight - 10;
  const centerVehicleX = (svgWidth - vehicleWidth) / 2;

  const seatRowSpacing = 10;

  // @ts-ignore - need to figure out why datetime converts from Date to string in useLoaderData
  const formattedData = processTripsForVehicleVisualization(trips);

  console.log({ formattedData });

  return (
    <div className="text-center">
      {formattedData.map((trip) => {
        return (
          <div key={trip.id}>
            <h3 className="text-2xl">{trip.displayDate}</h3>
            <svg className="m-auto" height={svgHeight} width={svgWidth}>
              <VehicleWheel x={centerVehicleX - wheelWidth / 2} y={35} />
              <VehicleWheel
                x={centerVehicleX + vehicleWidth - wheelWidth / 2}
                y={35}
              />
              <VehicleWheel
                x={centerVehicleX - wheelWidth / 2}
                y={vehicleBaseYOffset + vehicleBaseHeight - 80}
              />
              <VehicleWheel
                x={centerVehicleX + vehicleWidth - wheelWidth / 2}
                y={vehicleBaseYOffset + vehicleBaseHeight - 80}
              />
              <rect
                id="vehicle-front"
                x={centerVehicleX}
                width={vehicleWidth}
                y={5}
                height={vehicleFrontHeight}
                rx={40}
                ry={20}
                className="fill-white stroke-black stroke-2"
              ></rect>

              <rect
                id="vehicle-base"
                x={centerVehicleX}
                y={vehicleBaseYOffset}
                width={vehicleWidth}
                height={vehicleBaseHeight}
                className="fill-white stroke-black stroke-2"
              />
              <Seat
                id={`${trip.dateTime}-1-2`}
                x={centerVehicleX + 10}
                y={vehicleBaseYOffset + 20}
                image={trip.seatMap["1-2"].rider.profileSrc}
              />
              <Seat
                id={`${trip.dateTime}-1-1`}
                x={centerVehicleX + vehicleWidth - seatWidth - 10}
                y={vehicleBaseYOffset + 20}
                image={trip.seatMap["1-1"].rider.profileSrc}
              />
              <Seat
                id={`${trip.dateTime}-1-3`}
                x={centerVehicleX + 10 + 5 + seatWidth}
                y={vehicleBaseYOffset + 35}
                image={trip.seatMap["1-3"]?.rider?.profileSrc}
              />
              <RowOfSeats
                // @ts-ignore - dateTime comes through as Date rather than string here
                id={trip.dateTime}
                x={centerVehicleX + seatRowSpacing}
                y={vehicleBaseYOffset + 2 * seatHeight}
                seats={trip.seatsByRow.rowTwo}
              />
              <RowOfSeats
                // @ts-ignore - dateTime comes through as Date rather than string here
                id={trip.dateTime}
                x={centerVehicleX + 10}
                y={vehicleBaseYOffset + seatHeight * 3 + 10}
                seats={trip.seatsByRow.rowThree}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
