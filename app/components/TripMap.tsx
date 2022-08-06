import { motion } from "framer-motion";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";
import { mpalaToFieldPath } from "app/constants/paths";
import home from "public/images/home.svg";
import mapPin from "public/images/map-pin.svg";
import { svgHeight, svgWidth } from "app/constants/vehicle";

const pathTransition = { duration: 1, ease: "linear" };
const vehicleTransition = { duration: 5, ease: "easeInOut", delay: 1 };

const mapWidth = 800;
const mapHeight = 450;

const TripMap = () => {
  return (
    <div className="scale-75" style={{ position: "relative" }}>
      <motion.svg
        width={mapWidth}
        height={mapHeight}
        version="1.1"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={pathTransition}
          d={mpalaToFieldPath}
          fill="none"
          stroke="#000"
          stroke-width="1px"
        />
        <image href={home} x={729.9} y={358} width={20} height={20} />
        <text className="text-xs" x={729.9 - 60} y={358 + 40}>
          Mpala Research Center
        </text>

        <image href={mapPin} x={120} y={400} width={20} height={20} />
        <text className="text-xs" x={120 - 60} y={400 + 40}>
          Block Cotton Fields
        </text>
      </motion.svg>
      <motion.div
        className="mpalaToField absolute top-0 left-0"
        transition={vehicleTransition}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
      >
        <svg
          height={svgHeight}
          width={svgWidth}
          className={`rotate-90 scale-[0.15]`}
        >
          <ToyotaPradoBase hideSeats={true} />
        </svg>
      </motion.div>
    </div>
  );
};

export default TripMap;
