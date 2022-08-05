import Rider from "~/components/Rider";

import { svgHeight, svgWidth } from "app/constants/vehicle";
import type { FormattedTrips } from "app/utils/trip";
import { generateRiders } from "app/utils/trip";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";

type Props = {
  trip: FormattedTrips[number];
  currentRiderId: string | null;
};

const getId = (trip: FormattedTrips[number], seatNumber: string) => {
  return `${trip.dateTime}-${seatNumber}`;
};

const ToyotaPrado = ({ trip, currentRiderId }: Props) => {
  const riders = generateRiders(trip);

  return (
    <svg className="m-auto" height={svgHeight} width={svgWidth}>
      <ToyotaPradoBase />

      {riders.map((rider, index) => {
        return (
          <Rider
            key={`${rider.id}-${index}`}
            {...rider}
            uniqueId={getId(trip, rider.id)}
            currentRiderId={currentRiderId}
          />
        );
      })}
    </svg>
  );
};

export default ToyotaPrado;
