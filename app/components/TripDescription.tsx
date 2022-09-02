import { Clock, Circle, MapPin } from "react-feather";
import { FormattedTrip } from "app/utils/trip";
import { ModuleGraph } from "vite";

type Props = {
  time: string;
  route: FormattedTrip["route"];
};

const iconSize = 24;

const startIconX = 20;
const startIconY = 0;
const textSize = 14;

const connectionLineLength = 25;
const connectionBuffer = 5;

const textBuffer = 5;

const TripDescription = ({ time, route }: Props) => {
  return (
    <div className="m-auto w-[200px]">
      <div className="flex justify-center">
        <Clock width={iconSize} height={iconSize} />
        <span className="ml-2">{time}</span>
      </div>
      <svg className="mt-4 h-[100px] w-full max-w-max justify-center">
        <Circle x={startIconX} y={startIconY}></Circle>
        <line
          x1={startIconX + iconSize / 2}
          x2={startIconX + iconSize / 2}
          y1={startIconY + iconSize + connectionBuffer}
          y2={startIconY + iconSize + connectionLineLength + connectionBuffer}
          strokeWidth={2}
          stroke="black"
        />
        <MapPin
          x={startIconX}
          y={
            startIconY + iconSize + connectionLineLength + connectionBuffer * 2
          }
        />
        <text
          x={startIconX + iconSize + textBuffer}
          y={startIconY + textSize}
          className="text-sm"
        >
          {route.start}
        </text>
        <text
          className="text-sm"
          x={startIconX + iconSize + textBuffer}
          y={
            startIconY +
            iconSize +
            connectionLineLength +
            connectionBuffer * 2 +
            iconSize / 2
          }
        >
          {route.end}
        </text>
      </svg>
      <hr />
    </div>
  );
};

export default TripDescription;
