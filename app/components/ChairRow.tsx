import { seatWidth, seatRowWidth } from "app/constants/vehicle";

type Props = {
  x: number;
  y: number;
};

const ChairRow = ({ x, y }: Props) => {
  const d = `M${x},${y} L${x},${y + seatWidth} ${x + seatRowWidth},${
    y + seatWidth
  } ${x + seatRowWidth},${y}`;

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

export default ChairRow;
