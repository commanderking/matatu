import { seatWidth } from "app/constants/vehicle";

type Props = {
  x: number;
  y: number;
  seatWidth: number;
  seatHeight: number;
};

const Chair = ({ x, y, seatWidth, seatHeight }: Props) => {
  const d = `M${x},${y} L${x},${y + seatHeight} ${x + seatWidth},${
    y + seatHeight
  } ${x + seatWidth},${y}`;

  return (
    <path
      d={d}
      stroke="black"
      strokeWidth="10px"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="lightgray"
      strokeOpacity={0.5}
    />
  );
};

export default Chair;
