import React from "react";
import VehicleWheel from "~/components/VehicleWheel";

import Chair from "app/components/Chair";

import {
  svgHeight,
  svgWidth,
  vehicleXStartPos,
  vehicleBaseHeight,
  vehicleBaseYOffset,
  vehicleFrontHeight,
  seatXShift,
  vehicleWidth,
  wheelWidth,
  seatWidth,
  seatHeight,
} from "app/constants/vehicle";
import type { FormattedTrips } from "app/utils/trip";
import type { ColorCount } from "app/types/vehicle";
import { generateSeats, generateRiders } from "app/utils/trip";

const ToyotaPradoBase = () => {
  const seatingFurniture = generateSeats();

  return (
    <React.Fragment>
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

      {seatingFurniture.map((furniture) => {
        return <Chair {...furniture} />;
      })}
    </React.Fragment>
  );
};

export default ToyotaPradoBase;
