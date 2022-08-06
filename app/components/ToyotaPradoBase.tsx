import VehicleWheel from "~/components/VehicleWheel";

import Chair from "app/components/Chair";

import {
  vehicleXStartPos,
  vehicleBaseHeight,
  vehicleBaseYOffset,
  vehicleFrontHeight,
  vehicleWidth,
  wheelWidth,
} from "app/constants/vehicle";
import { generateSeats } from "app/utils/trip";

type Props = {
  scale?: number;
  hideSeats?: boolean;
};

const ToyotaPradoBase = ({ scale = 1, hideSeats = false }: Props) => {
  const seatingFurniture = generateSeats();

  return (
    <g className={`scale-[${scale}]`}>
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
