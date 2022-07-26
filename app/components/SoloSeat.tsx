import React from "react";
import Chair from "app/components/Chair";
import Seat from "~/components/Rider";

type Props = {
  id: string;
  x: number;
  y: number;
  image: string;
};

const SoloChair = ({ id, x, y, image }: Props) => {
  return (
    <React.Fragment>
      <Chair x={x} y={y} />

      {image && <Seat id={id} x={x} y={y} image={image} />}
    </React.Fragment>
  );
};

export default SoloChair;
