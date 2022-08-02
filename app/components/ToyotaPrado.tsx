import Rider from "~/components/Rider";

import { svgHeight, svgWidth } from "app/constants/vehicle";
import type { FormattedTrips } from "app/utils/trip";
import { generateRiders } from "app/utils/trip";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";

type Props = {
  trip?: FormattedTrips[number];
};

const ToyotaPrado = ({ trip }: Props) => {
  const getId = (seatNumber: string) => {
    if (!trip) {
      return seatNumber;
    }

    return `${trip.dateTime}-${seatNumber}`;
  };

  const getImage = (seatNumber: string) => {
    return trip ? trip.seatMap[seatNumber].rider.profileSrc : null;
  };

  const randomRotation = Math.round((Math.random() * 2 - 1) * 10);

  const riders = generateRiders(trip);
  console.log({ riders });

  return (
    <svg
      className="m-auto"
      height={svgHeight}
      width={svgWidth}
      transform={`rotate(${randomRotation})`}
    >
      <ToyotaPradoBase />

      {riders.map((rider, index) => {
        // THIS is confusing rider.id is actually the seatId, not rider's. Clean up
        return <Rider {...rider} id={getId(rider.id)} />;
      })}
    </svg>
  );
};

export default ToyotaPrado;
