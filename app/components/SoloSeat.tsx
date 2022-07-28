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
        <rect
          x={x}
          y={y}
          width={seatWidth}
          height={seatWidth}
          fill={colorCount.color}
        />
      )}

      {image && !colorCount && <Rider id={id} x={x} y={y} image={image} />}
    </React.Fragment>
  );
};

export default SoloChair;
