import { svgHeight, svgWidth, seatWidth } from "app/constants/vehicle";
import React from "react";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";
import { SeatingColorCounts } from "app/types/vehicle";
type Props = {
  heatMap: SeatingColorCounts[];
};

const ToyotaPrado = ({ heatMap }: Props) => {
  return (
    <svg className="m-auto" height={svgHeight} width={svgWidth}>
      <ToyotaPradoBase />

      {heatMap.map((seat) => {
        const { x, y, count, color } = seat;
        return (
          <React.Fragment>
            <rect
              x={x}
              y={y}
              width={seatWidth}
              height={seatWidth}
              fill={color}
              stroke="black"
            />
            <text
              x={x + seatWidth / 2}
              y={y + seatWidth / 2}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {count}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default ToyotaPrado;
