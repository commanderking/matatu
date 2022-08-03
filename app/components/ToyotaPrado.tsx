import Rider from "~/components/Rider";

import { svgHeight, svgWidth } from "app/constants/vehicle";
import type { FormattedTrips } from "app/utils/trip";
import { generateRiders } from "app/utils/trip";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";

type Props = {
  trip: FormattedTrips[number];
};

const ToyotaPrado = ({ trip }: Props) => {
  const getId = (seatNumber: string) => {
    if (!trip) {
      return seatNumber;
    }
    return `${trip.dateTime}-${seatNumber}`;
  };

  const randomRotation = Math.round((Math.random() * 2 - 1) * 10);
  const riders = generateRiders(trip);

  return (
    <svg
      className="m-auto"
      height={svgHeight}
      width={svgWidth}
      transform={`rotate(${randomRotation})`}
    >
      <ToyotaPradoBase />

      {riders.map((rider, index) => {
        return (
          <Rider key={`${rider.id}-${index}`} {...rider} id={getId(rider.id)} />
        );
      })}
    </svg>
  );
};

export default ToyotaPrado;
