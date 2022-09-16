import Rider from "~/features/kenya/components/Rider";

import { svgHeight, svgWidth } from "~/features/kenya/constants/vehicle";
import type { FormattedTrip } from "~/features/kenya/utils/trip";
import { generateRiders } from "~/features/kenya/utils/trip";
import ToyotaPradoBase from "~/features/kenya/components/ToyotaPradoBase";

type Props = {
  trip: FormattedTrip;
  currentRiderId: string | null;
};

const getId = (trip: FormattedTrip, seatNumber: string) => {
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
