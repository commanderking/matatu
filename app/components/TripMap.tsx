import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import ToyotaPradoBase from "app/components/ToyotaPradoBase";
import { mpalaToFieldPath } from "app/constants/paths";
import home from "public/images/home.svg";
import mapPin from "public/images/map-pin.svg";
import { svgHeight, svgWidth } from "app/constants/vehicle";

const pathTransition = { duration: 1, ease: "linear" };
const vehicleTransition = { duration: 5, ease: "easeInOut", delay: 1 };

const mapWidth = 800;
const mapHeight = 450;

const targetZoom = 3;
const targetX = 380;
const targetY = 175;
const targetMapWidth = mapWidth / targetZoom;
const targetMapHeight = mapHeight / targetZoom;

const TripMap = () => {
  const viewBox = useMotionValue(`0 0 ${mapWidth} ${mapHeight}`);

  // useEffect(() => {
  //   setTimeout(() => {
  //     viewBox.set(`${targetX} ${targetY} ${targetMapWidth} ${targetMapHeight}`);
  //   }, 2000);
  // }, []);

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
        <motion.g
          // @ts-ignore - custom css styling needed here - https://github.com/framer/motion/issues/1450
          initial={{ "--offset": "0%" }}
          // @ts-ignore - custom css styling needed here - https://github.com/framer/motion/issues/1450
          animate={{ "--offset": "100%" }}
          style={{
            offsetDistance: "var(--offset)",
            // For some reason - can't pass this with the path string as a constant - mpalaToFieldPath
            offsetPath: `path("m729.9 358.6c-5.643-3.516-4.74 3.583-7.509 4.506-6.322 2.107-33.79 9.387-40.55 6.008-15.18-9.824-21.49-6.969-28.54 0-11.71 11.05-7.837 15.69-21.03 19.52-2.65 0.8834-6.328 3.835-9.011 4.506-5.451 1.363-10.75 1.85-16.52 3.004-7.759 1.552-14.76 5.957-22.53 7.509-7.091 1.418-13.86 2.715-21.03 4.506-5.354 1.339-12.99 0.9891-18.02 3.004-1.676 0.6704-2.793 2.433-4.506 3.004-4.208 1.403-9.142 0.6268-13.52 1.502-18.16 3.631-40.14 5.189-58.57 1.502-5.444-1.089-12.75 1.758-18.02 0-7.045-2.348-15.48-3.78-21.03-9.011-0.8145-0.7679-0.7104-2.212-1.502-3.004-1.583-1.583-4.145-1.762-6.008-3.004-2.222-1.481-3.63-4.819-6.007-6.008-3.099-1.549-7.326-1.941-10.51-3.004-4.526-1.509-8.175-4.949-12.01-7.509-2.431-1.621-5.23-1.864-7.509-3.004-2.489-1.245-2.804-4.305-4.506-6.008-11.73-6.22-14.93-17.74-22.03-26.28-2.254-3.076-4.221-6.066-6.508-8.263-7.985-11.97-21.18-19.49-30.04-30.04-9.005-7.899-7.28-12.75-13.52-24.03-5-10.03-9.233-17.11-10.52-27.78-0.881-7.004-4.04-13.33-7.508-18.78-2.252-3.378-7.897-10.9-10.51-13.52-0.354-0.354 0.354 0.354 0 0-3.409-4.141-4.448-20.37-3.761-24.53 9.387-18.8 15.68-42.84 8.267-62.58-8.678-18.66-7.693-37.67-7.509-57.07-0.0656-6.957 1.576-15.12-4.506-22.53-1.249-1.249-5.674-2.671-7.509-4.506-1.752-1.752-2.753-4.255-4.506-6.008-15.02-10.45-27.13-15.17-37.55 1.502-37.54 25.62-62.39 64.05-94.62 88.61-20.85 15.37-34.63 38.8-43.55 60.08-0.8075 1.615-3.944 5.261-4.506 7.509-2.09 8.36-0.2061 26 1.502 34.54 0.7523 12.82-0.5352 30.03 4.506 42.05 5.943 11.99 6.529 28.48 10.51 40.55 2.896 6.011 2.433 4.696 9.011 18.02 1.771 3.541 5.356 5.781 7.509 9.011 3.011 4.517 8.417 22.25 10.51 28.54 1.452 4.356 0.8173 9.144 3.004 13.52 0.6333 1.267 2.371 1.737 3.004 3.004 1.32 2.641 0.579 5.085 3.004 7.509")`,
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
