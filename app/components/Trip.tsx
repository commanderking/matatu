import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
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
      ref={ref}
      animate={tripControls}
      initial="hidden"
      variants={tripVariants}
    >
      <h3 className="text-2xl">{trip.time}</h3>
      {/* <div className="inline-block">
        <TripMap route={trip.route} />
      </div> */}
      <ToyotaPrado trip={trip} currentRiderId={selectedRiderId} />
    </motion.div>
  );
};

export default Trip;
