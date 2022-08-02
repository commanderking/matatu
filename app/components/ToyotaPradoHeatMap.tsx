import VehicleWheel from "~/components/VehicleWheel";
import Chair from "app/components/Chair";

import {
  svgHeight,
  svgWidth,
  vehicleXStartPos,
  vehicleBaseHeight,
  vehicleBaseYOffset,
  vehicleFrontHeight,
  vehicleWidth,
  wheelWidth,
  seatWidth,
} from "app/constants/vehicle";
import type { FormattedTrips } from "app/utils/trip";
import type { ColorCount } from "app/types/vehicle";
import { generateSeats, generateRiders } from "app/utils/trip";
import React from "react";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";

type Props = {
  heatMap: ColorCount[];
};

const ToyotaPrado = ({ heatMap }: Props) => {
  return (
    <svg className="m-auto" height={svgHeight} width={svgWidth}>
      <ToyotaPradoBase />

      {heatMap.map((seat) => {
        const { x, y, count } = seat;
        return (
          <React.Fragment>
            <rect
              x={seat.x}
              y={seat.y}
              width={seatWidth}
              height={seatWidth}
              fill={seat.color}
              stroke="black"
            />
            <text
              x={x + seatWidth / 2}
              y={y + seatWidth / 2}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {seat.count}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default ToyotaPrado;
