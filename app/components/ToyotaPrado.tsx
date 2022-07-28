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
import type { ColorCount } from "app/types/vehicle";

type Props = {
  trip?: FormattedTrips[number];
  heatMap?: {
    [key: string]: ColorCount;
  };
};

const ToyotaPrado = ({ trip, heatMap }: Props) => {
  const svgHeight = 350;
  const svgWidth = 200;

  const vehicleFrontHeight = 100;
  const vehicleBaseHeight = 220;
  const vehicleBaseYOffset = vehicleFrontHeight - 10;
  const vehicleXStartPos = (svgWidth - vehicleWidth) / 2;

  const seatXShift = 10;

  const getColorCount = (seatNumber: string) => {
    if (!heatMap) {
      return null;
    }

    return heatMap[seatNumber];
  };

  const getId = (seatNumber: string) => {
    if (!trip) {
      return seatNumber;
    }

    return `${trip.dateTime}-${seatNumber}`;
  };

  const getImage = (seatNumber: string) => {
    return trip ? trip.seatMap[seatNumber].rider.profileSrc : null;
  };

  const getHeatMapColors = (seatIds: string[]) => {
    return heatMap ? seatIds.map((seatId) => heatMap[seatId]) : null;
  };

  const randomRotation = Math.round((Math.random() * 2 - 1) * 10);

  return (
    <svg
      className="m-auto"
      height={svgHeight}
      width={svgWidth}
      transform={`rotate(${randomRotation})`}
    >
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
        id={getId("1-2")}
        image={getImage("1-2")}
        x={vehicleXStartPos + seatXShift}
        y={vehicleBaseYOffset + 20}
        colorCount={getColorCount("1-2")}
      />

      <SoloSeat
        id={getId("1-1")}
        x={vehicleXStartPos + vehicleWidth - seatWidth - 10}
        y={vehicleBaseYOffset + 20}
        image={getImage("1-1")}
        colorCount={getColorCount("1-1")}
      />
      {trip?.seatMap["1-3"]?.rider?.profileSrc && (
        <Rider
          id={`${trip.dateTime}-1-3`}
          x={vehicleXStartPos + vehicleWidth / 2 - seatWidth / 2}
          y={vehicleBaseYOffset + 35}
          image={trip.seatMap["1-3"].rider.profileSrc}
        />
      )}
      {heatMap && (
        <rect
          x={vehicleXStartPos + vehicleWidth / 2 - seatWidth / 2}
          y={vehicleBaseYOffset + 35}
          width={seatWidth}
          height={seatWidth}
          fill={heatMap["1-3"].color}
          stroke="black"
        />
      )}
      <RowOfSeats
        // @ts-ignore - dateTime comes through as Date rather than string here
        id={trip?.dateTime || "rowTwo"}
        x={vehicleXStartPos + seatXShift}
        y={vehicleBaseYOffset + 2 * seatHeight}
        occupiedSeats={trip && trip.seatsByRow.rowTwo}
        heatMapColors={getHeatMapColors(["2-3", "2-2", "2-1"])}
      />
      <RowOfSeats
        // @ts-ignore - dateTime comes through as Date rather than string here
        id={trip?.dateTime || "rowThree"}
        x={vehicleXStartPos + seatXShift}
        y={vehicleBaseYOffset + seatHeight * 3 + 20}
        ocupiedSeats={trip && trip.seatsByRow.rowThree}
        heatMapColors={getHeatMapColors(["3-3", "3-2", "3-1"])}
      />
    </svg>
  );
};

export default ToyotaPrado;
