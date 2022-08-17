import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { FormattedTrip } from "app/utils/trip";
import TripMap from "app/components/TripMap";
import ToyotaPrado from "app/components/ToyotaPrado";

type Props = {
  trip: FormattedTrip;
  selectedRiderId: string | null;
};

const tripVariants = {
  visible: {
    opacity: 1,
    transition: { duration: 2 },
  },
  hidden: { opacity: 0 },
};

const Trip = ({ trip, selectedRiderId }: Props) => {
  const [ref, inView] = useInView();

  const tripControls = useAnimation();

  useEffect(() => {
    if (inView) {
      tripControls.start("visible");
    }
  }, [tripControls, inView]);

  return (
    <motion.div
      key={trip.id}
      className="min-h-screen"
      ref={ref}
      animate={tripControls}
      initial="hidden"
      variants={tripVariants}
    >
      <h3 className="text-2xl">{trip.displayDate}</h3>
      <div className="inline-block">
        <TripMap route={trip.route} />
      </div>
      <div className="inline-block">
        <ToyotaPrado trip={trip} currentRiderId={selectedRiderId} />
      </div>
    </motion.div>
  );
};

export default Trip;
