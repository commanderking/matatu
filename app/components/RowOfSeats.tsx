import Rider from "~/components/Rider";
import { seatRowWidth, seatWidth } from "app/constants/vehicle";
import type { Seat as SeatType } from "app/models/trip.server";
import ChairRow from "app/components/ChairRow";

type Props = {
  id: string;
  x: number;
  y: number;
  occupiedSeats?: SeatType[];
  heatMapColors:
    | {
        color: string;
        count: number;
      }[]
    | null;
};

const RowOfSeats = ({ id, occupiedSeats, x, y, heatMapColors }: Props) => {
  const getMaxSeats = () => {
    if (occupiedSeats) {
      return occupiedSeats.length === 4 ? 4 : 3;
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
      {occupiedSeats &&
        occupiedSeats.map((seat, index) => {
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
