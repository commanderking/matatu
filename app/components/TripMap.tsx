import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import ToyotaPradoBase from "app/components/ToyotaPradoBase";
import home from "public/images/home.svg";
import mapPin from "public/images/map-pin.svg";
import { svgHeight, svgWidth } from "app/constants/vehicle";
import type { Routes } from "app/models/route.server";
import { routesById } from "app/constants/routes";
type Props = {
  route: Routes[number];
};

const mapWidth = 800;
const mapHeight = 450;

const vehicleVariants = {
  visible: {
    "--offset": "100%",
    opacity: 1,
    transition: { duration: 5, ease: "easeInOut", delay: 1 },
  },
  hidden: { "--offset": "0%", opacity: 1 },
};

const pathVariants = {
  visible: {
    pathLength: 1,
    transition: { duration: 0.5, ease: "linear", delay: 1 },
  },
  hidden: { pathLength: 0 },
};

const vehicalTrailVariants = {
  visible: {
    pathLength: 1,
    transition: { duration: 5, ease: "easeInOut", delay: 1 },
  },
  hidden: { pathLength: 0 },
};

const TripMap = ({ route }: Props) => {
  const viewBox = useMotionValue(`0 0 ${mapWidth} ${mapHeight}`);
  const pathControls = useAnimation();
  const vehicleControls = useAnimation();
  const vehicleTrailControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      pathControls.start("visible");
      vehicleControls.start("visible");
      vehicleTrailControls.start("visible");
    }
  }, [pathControls, inView]);

  const { id } = route;
  if (!routesById[id]) {
    return null;
  }

  const {
    path,
    startX,
    startY,
    startTextX,
    startTextY,
    endX,
    endY,
    endTextX,
    endTextY,
  } = routesById[route.id];

  return (
    <div className="scale-75" style={{ position: "relative" }}>
      <motion.svg
        width={mapWidth}
        height={mapHeight}
        version="1.1"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
      >
        <motion.path
          d={path}
          fill="none"
          stroke="#000"
          strokeWidth="2px"
          initial="hidden"
          variants={pathVariants}
          animate={pathControls}
        />
        <image href={home} x={startX} y={startY} width={20} height={20} />
        <text className="text-xs" x={startTextX} y={startTextY}>
          {route.start}
        </text>

        <image href={mapPin} x={endX} y={endY} width={20} height={20} />
        <text className="text-xs" x={endTextX} y={endTextY}>
          {route.end}
        </text>
        <motion.path
          d={path}
          fill="none"
          stroke="red"
          strokeWidth="4px"
          initial="hidden"
          variants={vehicalTrailVariants}
          animate={vehicleTrailControls}
        />
        <motion.g
          style={{
            offsetDistance: "var(--offset)",
            // For some reason - can't pass this with the path string as a constant - mpalaToFieldPath
            offsetPath: `path("${path}")`,
          }}
          // transition={vehicleTransition}
          initial="hidden"
          variants={vehicleVariants}
          animate={vehicleControls}
        >
          <g
            className={`-translate-y-3 translate-x-[25px] rotate-90 scale-[0.15]`}
          >
            <ToyotaPradoBase hideSeats={true} />
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default TripMap;
