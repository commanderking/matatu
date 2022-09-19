import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import TripInfo from "~/features/kenya/components/TripInfo";
import TripMedia from "~/features/kenya/components/TripMedia";
import { TripsInDate } from "app/features/kenya/utils/trip";
type Props = {
  tripsInDay: TripsInDate;
  selectedRiderId: string | null;
};

const tripVariants = {
  visible: {
    opacity: 1,
    transition: { duration: 1.5 },
  },
  hidden: { opacity: 0 },
};

const DailyTrips = ({ tripsInDay, selectedRiderId }: Props) => {
  const [ref, inView] = useInView();

  const tripControls = useAnimation();

  useEffect(() => {
    if (inView) {
      tripControls.start("visible");
    }
  }, [tripControls, inView]);

  return (
    <div
      key={tripsInDay.date}
      className="m-auto max-w-[960px] p-4 even:bg-slate-100"
      ref={ref}
    >
      <h2 className="text-2xl">{tripsInDay.displayDayDate}</h2>
      <motion.div
        animate={tripControls}
        initial="hidden"
        variants={tripVariants}
      >
        <div className="flex flex-wrap gap-4 p-4">
          {tripsInDay.trips.map((trip) => {
            return (
              <div key={trip.id} className="sm: w-full md:w-[200px] ">
                <TripInfo trip={trip} selectedRiderId={selectedRiderId} />
              </div>
            );
          })}
        </div>
        <div className="m-auto max-w-[640px]">
          {tripsInDay.media.map((medium) => {
            return (
              <div className="mt-4" key={medium.src}>
                <TripMedia medium={medium} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default DailyTrips;
