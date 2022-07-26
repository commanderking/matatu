import Seat from "~/components/Rider";
import { seatRowWidth, seatWidth } from "app/constants/vehicle";
import type { Seat as SeatType } from "app/models/trip.server";
import ChairRow from "app/components/ChairRow";

type Props = {
  id: string;
  x: number;
  y: number;
  seats: SeatType[];
};

const RowOfSeats = ({ id, seats, x, y }: Props) => {
  const maxSeats = seats.length === 4 ? 4 : 3;

  const adjustedSeatWidth = seatRowWidth / maxSeats;

  return (
    <g x={x} y={y}>
      <ChairRow x={x} y={y} />
      {seats.map((seat, index) => {
        const seatId = `${id}-${seat?.row}-${seat?.seat}`;

        const xPosition =
          x + index * (adjustedSeatWidth - (seatWidth - adjustedSeatWidth) / 3);
        return (
          <Seat
            id={seatId}
            key={`seat-${index}`}
            x={xPosition}
            y={y}
            image={seat?.rider?.profileSrc}
          />
        );
      })}
    </g>
  );
};

export default RowOfSeats;
