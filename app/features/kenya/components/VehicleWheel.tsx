import { wheelWidth, wheelHeight } from "~/features/kenya/constants/vehicle";

type Props = {
  x: number;
  y: number;
};

const VehicleWheel = ({ x, y }: Props) => {
  return (
    <rect
      x={x}
      y={y}
      width={wheelWidth}
      height={wheelHeight}
      className="fill-black"
    ></rect>
  );
};

export default VehicleWheel;
