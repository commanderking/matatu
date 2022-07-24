import { seatHeight, seatWidth } from "app/constants/vehicle";

type Props = {
  id?: string;
  x: number;
  y: number;
  width?: number;
  image: string;
};

// Nice seat reference
// https://stackoverflow.com/questions/8976791/how-to-set-a-stroke-width1-on-only-certain-sides-of-svg-shapes

const Seat = ({ id, x, y, width = seatWidth, image }: Props) => {
  return (
    <g>
      <rect
        id={id}
        className="fill-white stroke-black stroke-1"
        x={x}
        y={y}
        width={width}
        height={seatHeight}
      ></rect>
      {image && (
        <image
          className="rounded-full"
          x={x}
          y={y}
          href={image}
          width={width}
          height={seatHeight}
          preserveAspectRatio="none"
        />
      )}
    </g>
  );
};

export default Seat;
