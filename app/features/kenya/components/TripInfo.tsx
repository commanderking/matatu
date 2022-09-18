import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { FormattedTrip } from "~/features/kenya/utils/trip";
import ToyotaPrado from "~/features/kenya/components/ToyotaPrado";
import TripDescription from "~/features/kenya/components/TripDescription";

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
      {/* <div className="inline-block">
        <TripMap route={trip.route} />
      </div> */}
      <ToyotaPrado trip={trip} currentRiderId={selectedRiderId} />
      <TripDescription time={trip.time} route={trip.route} />
    </motion.div>
  );
};

export default Trip;
