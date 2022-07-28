import Rider from "~/components/Rider";
import { seatRowWidth, seatWidth } from "app/constants/vehicle";
import type { Seat as SeatType } from "app/models/trip.server";
import ChairRow from "app/components/ChairRow";
import { setRandomFallback } from "bcryptjs";

type Props = {
  id: string;
  x: number;
  y: number;
  seats?: SeatType[];
  heatMapColors:
    | {
        color: string;
        count: number;
      }[]
    | null;
};

const RowOfSeats = ({ id, seats, x, y, heatMapColors }: Props) => {
  const getMaxSeats = () => {
    if (seats) {
      // seats may only contain occupied riders - really should be renamed to riders
      return seats.length === 4 ? 4 : 3;
    }

    if (heatMapColors) {
      return heatMapColors.length;
    }

    return 3;
  };
  const maxSeats = getMaxSeats();
  const adjustedSeatWidth = seatRowWidth / maxSeats;
  return (
    <g x={x} y={y}>
      <ChairRow x={x} y={y} />
      {heatMapColors &&
        heatMapColors.map((heatMap, index) => {
          const xPosition =
            x +
            index * (adjustedSeatWidth - (seatWidth - adjustedSeatWidth) / 3);

          return (
            <rect
              key={`${index}`}
              x={xPosition}
              y={y}
              width={seatWidth}
              height={seatWidth}
              fill={heatMap.color}
            />
          );
        })}
      {seats &&
        seats.map((seat, index) => {
          const seatId = `${id}-${seat?.row}-${seat?.seat}`;

          const xPosition =
            x +
            index * (adjustedSeatWidth - (seatWidth - adjustedSeatWidth) / 3);
          return (
            <Rider
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
