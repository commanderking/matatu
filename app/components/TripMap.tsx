import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";
import { mpalaToFieldPath } from "app/constants/paths";
import home from "public/images/home.svg";
import mapPin from "public/images/map-pin.svg";
import { svgHeight, svgWidth } from "app/constants/vehicle";
import { Routes } from "app/models/route.server";
import { routesById } from "app/constants/routes";
type Props = {
  route: Routes[number];
};

const pathTransition = { duration: 1, ease: "linear" };
const vehicleTransition = { duration: 5, ease: "easeInOut", delay: 1 };

const mapWidth = 800;
const mapHeight = 450;

const targetZoom = 3;
const targetX = 380;
const targetY = 175;
const targetMapWidth = mapWidth / targetZoom;
const targetMapHeight = mapHeight / targetZoom;

const TripMap = ({ route }: Props) => {
  const viewBox = useMotionValue(`0 0 ${mapWidth} ${mapHeight}`);

  // useEffect(() => {
  //   setTimeout(() => {
  //     viewBox.set(`${targetX} ${targetY} ${targetMapWidth} ${targetMapHeight}`);
  //   }, 2000);
  // }, []);

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
        transition={{ duration: 1 }}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={pathTransition}
          d={path}
          fill="none"
          stroke="#000"
          stroke-width="1px"
        />
        <image href={home} x={startX} y={startY} width={20} height={20} />
        <text className="text-xs" x={startTextX} y={startTextY}>
          {route.start}
        </text>

        <image href={mapPin} x={endX} y={endY} width={20} height={20} />
        <text className="text-xs" x={endTextX} y={endTextY}>
          {route.end}
        </text>
        <motion.g
          // @ts-ignore - custom css styling needed here - https://github.com/framer/motion/issues/1450
          initial={{ "--offset": "0%" }}
          // @ts-ignore - custom css styling needed here - https://github.com/framer/motion/issues/1450
          animate={{ "--offset": "100%" }}
          style={{
            offsetDistance: "var(--offset)",
            // For some reason - can't pass this with the path string as a constant - mpalaToFieldPath
            offsetPath: `path("${path}")`,
          }}
          transition={vehicleTransition}
        >
          <g className={`-translate-y-3 rotate-90 scale-[0.15]`}>
            <ToyotaPradoBase hideSeats={true} />
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default TripMap;
