import VehicleWheel from "~/features/kenya/components/VehicleWheel";

import Chair from "~/features/kenya/components/Chair";

import {
  vehicleXStartPos,
  vehicleBaseHeight,
  vehicleBaseYOffset,
  vehicleFrontHeight,
  vehicleWidth,
  wheelWidth,
} from "~/features/kenya/constants/vehicle";
import { generateSeats } from "~/features/kenya/utils/trip";

type Props = {
  hideSeats?: boolean;
};

const ToyotaPradoBase = ({ hideSeats = false }: Props) => {
  const seatingFurniture = generateSeats();

  return (
    <g>
      <VehicleWheel x={vehicleXStartPos - wheelWidth / 2} y={35} />
      <VehicleWheel
        x={vehicleXStartPos + vehicleWidth - wheelWidth / 2}
        y={35}
      />
      <VehicleWheel
        x={vehicleXStartPos - wheelWidth / 2}
        y={vehicleBaseYOffset + vehicleBaseHeight - 80}
      />
      <VehicleWheel
        x={vehicleXStartPos + vehicleWidth - wheelWidth / 2}
        y={vehicleBaseYOffset + vehicleBaseHeight - 80}
      />

      <rect
        id="vehicle-front"
        x={vehicleXStartPos}
        width={vehicleWidth}
        y={5}
        height={vehicleFrontHeight}
        rx={40}
        ry={20}
        className="fill-white stroke-black stroke-2"
      ></rect>

      <rect
        id="vehicle-base"
        x={vehicleXStartPos}
        y={vehicleBaseYOffset}
        width={vehicleWidth}
        height={vehicleBaseHeight}
        className="fill-white stroke-black stroke-2"
      />

      {!hideSeats &&
        seatingFurniture.map((furniture, index) => {
          return <Chair key={`chair-${index}`} {...furniture} />;
        })}
    </g>
  );
};

export default ToyotaPradoBase;
