import TripInfo from "~/features/kenya/components/TripInfo";
import TripMedia from "~/features/kenya/components/TripMedia";

type Props = {
  tripsInDay: any;
  selectedRiderId: string | null;
};

const DailyTrips = ({ tripsInDay, selectedRiderId }: Props) => {
  return (
    <div
      key={tripsInDay.date}
      className="m-auto max-w-[960px] p-4 even:bg-slate-100"
    >
      <h2 className="text-2xl">{tripsInDay.displayDayDate}</h2>
      <div>
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
      </div>
    </div>
  );
};

export default DailyTrips;
