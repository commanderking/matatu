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
      className="min-h-screen"
      ref={ref}
      animate={tripControls}
      initial="hidden"
      variants={tripVariants}
    >
      <h3 className="text-2xl">{trip.time}</h3>
      <div className="m-auto w-[604px]">
        <div className=" w-min border-2">
          <TripMap route={trip.route} />
        </div>
        <div className="m-auto mt-[-20px] w-min">
          <ToyotaPrado
            trip={trip}
            currentRiderId={selectedRiderId}
            hoodOpacity={50}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Trip;
