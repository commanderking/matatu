import Seat from "~/components/Seat";
import { seatHeight, seatWidth } from "app/constants/vehicle";

type Props = {
  x: number;
  y: number;
  seatsPerRow: number;
};

const RowOfSeats = ({ seatsPerRow, x, y }: Props) => {
  return (
    <g x={x} y={y}>
      {[...Array(seatsPerRow)].map((seat, index) => {
        return <Seat x={x + index * seatWidth} y={y} />;
      })}
    </g>
  );
};

export default RowOfSeats;
