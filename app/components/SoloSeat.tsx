import React from "react";
import Chair from "app/components/Chair";
import Rider from "~/components/Rider";
import { seatWidth } from "app/constants/vehicle";

type Props = {
  id: string;
  x: number;
  y: number;
  image?: string | null;
  colorCount?: {
    count: number;
    color: string;
  } | null;
};

const SoloChair = ({ id, x, y, image, colorCount }: Props) => {
  return (
    <React.Fragment>
      <Chair x={x} y={y} />
      {colorCount && (
        <React.Fragment>
          <rect
            x={x}
            y={y}
            width={seatWidth}
            height={seatWidth}
            fill={colorCount.color}
          />
          <text
            x={x + seatWidth / 2}
            y={y + seatWidth / 2}
            dominant-baseline="middle"
            text-anchor="middle"
          >
            {colorCount.count}
          </text>
        </React.Fragment>
      )}

      {image && !colorCount && <Rider id={id} x={x} y={y} image={image} />}
    </React.Fragment>
  );
};

export default SoloChair;
