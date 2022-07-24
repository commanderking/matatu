import { seatHeight, seatWidth } from "app/constants/vehicle";

type Props = {
  id?: string;
  x: number;
  y: number;
  width?: number;
};

// Nice seat reference
// https://stackoverflow.com/questions/8976791/how-to-set-a-stroke-width1-on-only-certain-sides-of-svg-shapes

const Seat = ({ id, x, y, width = seatWidth }: Props) => {
  return (
    <rect
      id={id}
      className="fill-white stroke-black stroke-2"
      x={x}
      y={y}
      width={width}
      height={seatHeight}
    ></rect>
  );
};

export default Seat;
