import Rider from "~/components/Rider";

import { svgHeight, svgWidth } from "app/constants/vehicle";
import type { FormattedTrip } from "app/utils/trip";
import { generateRiders } from "app/utils/trip";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";

type Props = {
  trip: FormattedTrip;
  currentRiderId: string | null;
  hoodOpacity?: number;
};

const getId = (trip: FormattedTrip, seatNumber: string) => {
  return `${trip.dateTime}-${seatNumber}`;
};

const ToyotaPrado = ({ trip, currentRiderId, hoodOpacity = 1 }: Props) => {
  const riders = generateRiders(trip);

  return (
    <svg className="scale-150" height={svgHeight} width={svgWidth}>
      <ToyotaPradoBase hoodOpacity={hoodOpacity} />

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
