import Seat from "~/components/Seat";
import { seatRowWidth } from "app/constants/vehicle";

type Props = {
  x: number;
  y: number;
  seatsPerRow: number;
};

const RowOfSeats = ({ seatsPerRow, x, y }: Props) => {
  const seatWidth = seatRowWidth / seatsPerRow;
  return (
    <g x={x} y={y}>
      {[...Array(seatsPerRow)].map((seat, index) => {
        return <Seat x={x + index * seatWidth} y={y} width={seatWidth} />;
      })}
    </g>
  );
};

export default RowOfSeats;
