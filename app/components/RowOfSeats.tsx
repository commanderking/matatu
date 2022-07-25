import Seat from "~/components/Seat";
import { seatRowWidth } from "app/constants/vehicle";
import type { Seat as SeatType } from "app/models/trip.server";

type Props = {
  x: number;
  y: number;
  seats: SeatType[];
};

const RowOfSeats = ({ seats, x, y }: Props) => {
  const maxSeats = seats.length === 4 ? 4 : 3;

  const seatWidth = seatRowWidth / maxSeats;
  return (
    <g x={x} y={y}>
      {seats.map((seat, index) => {
        return (
          <Seat
            key={`seat-${index}`}
            x={x + index * seatWidth}
            y={y}
            width={seatWidth}
            image={seat?.rider?.profileSrc}
          />
        );
      })}
    </g>
  );
};

export default RowOfSeats;
