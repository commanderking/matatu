import VehicleWheel from "~/components/VehicleWheel";
import Rider from "~/components/Rider";
import RowOfSeats from "~/components/RowOfSeats";
import SoloSeat from "app/components/SoloSeat";
import {
  vehicleWidth,
  wheelWidth,
  seatWidth,
  seatHeight,
} from "app/constants/vehicle";
import type { FormattedTrips } from "app/utils/trip";

type Props = {
  trip: FormattedTrips[number];
};
const ToyotaPrado = ({ trip }: Props) => {
  const svgHeight = 350;
  const svgWidth = 200;

  const vehicleFrontHeight = 100;
  const vehicleBaseHeight = 220;
  const vehicleBaseYOffset = vehicleFrontHeight - 10;
  const vehicleXStartPos = (svgWidth - vehicleWidth) / 2;

  const seatXShift = 10;
  return (
    <svg className="m-auto" height={svgHeight} width={svgWidth}>
      <VehicleWheel x={vehicleXStartPos - wheelWidth / 2} y={35} />
      <VehicleWheel
        x={vehicleXStartPos + vehicleWidth - wheelWidth / 2}
        y={35}
      />
      <VehicleWheel
        x={vehicleXStartPos - wheelWidth / 2}
        y={vehicleBaseYOffset + vehicleBaseHeight - 80}
      />
      <VehicleWheel
        x={vehicleXStartPos + vehicleWidth - wheelWidth / 2}
        y={vehicleBaseYOffset + vehicleBaseHeight - 80}
      />
      <rect
        id="vehicle-front"
        x={vehicleXStartPos}
        width={vehicleWidth}
        y={5}
        height={vehicleFrontHeight}
        rx={40}
        ry={20}
        className="fill-white stroke-black stroke-2"
      ></rect>

      <rect
        id="vehicle-base"
        x={vehicleXStartPos}
        y={vehicleBaseYOffset}
        width={vehicleWidth}
        height={vehicleBaseHeight}
        className="fill-white stroke-black stroke-2"
      />

      <SoloSeat
        id={`${trip.dateTime}-1-2`}
        image={trip.seatMap["1-2"].rider.profileSrc}
        x={vehicleXStartPos + seatXShift}
        y={vehicleBaseYOffset + 20}
      />

      <SoloSeat
        id={`${trip.dateTime}-1-1`}
        x={vehicleXStartPos + vehicleWidth - seatWidth - 10}
        y={vehicleBaseYOffset + 20}
        image={trip.seatMap["1-1"].rider.profileSrc}
      />
      {trip.seatMap["1-3"]?.rider?.profileSrc && (
        <Rider
          id={`${trip.dateTime}-1-3`}
          x={vehicleXStartPos + vehicleWidth / 2 - seatWidth / 2}
          y={vehicleBaseYOffset + 35}
          image={trip.seatMap["1-3"].rider.profileSrc}
        />
      )}
      <RowOfSeats
        // @ts-ignore - dateTime comes through as Date rather than string here
        id={trip.dateTime}
        x={vehicleXStartPos + seatXShift}
        y={vehicleBaseYOffset + 2 * seatHeight}
        seats={trip.seatsByRow.rowTwo}
      />
      <RowOfSeats
        // @ts-ignore - dateTime comes through as Date rather than string here
        id={trip.dateTime}
        x={vehicleXStartPos + seatXShift}
        y={vehicleBaseYOffset + seatHeight * 3 + 20}
        seats={trip.seatsByRow.rowThree}
      />
    </svg>
  );
};

export default ToyotaPrado;
