import { motion } from "framer-motion";
import { FormattedTrip } from "~/features/kenya/utils/trip";
import ToyotaPrado from "~/features/kenya/components/ToyotaPrado";
import TripDescription from "~/features/kenya/components/TripDescription";

type Props = {
  trip: FormattedTrip;
  selectedRiderId: string | null;
};

const Trip = ({ trip, selectedRiderId }: Props) => {
  return (
    <motion.div key={trip.id}>
      {/* <div className="inline-block">
        <TripMap route={trip.route} />
      </div> */}
      <ToyotaPrado trip={trip} currentRiderId={selectedRiderId} />
      <TripDescription time={trip.time} route={trip.route} />
    </motion.div>
  );
};

export default Trip;
