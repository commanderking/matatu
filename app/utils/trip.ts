import _ from "lodash";
import type { Trips, Seat } from "app/models/trip.server";

const getSeatsByRow = (trip: Trips[number]) => {
  const { seats } = trip;
  const rowTwo = seats.filter((seat) => seat.row === 2);
  const rowThree = seats.filter((seat) => seat.row === 3);

  const rowTwoSeatsDisplayed =
    rowTwo.length === 4 ? ["2-4", "2-3", "2-2", "2-1"] : ["2-3", "2-2", "2-1"];
  const rowThreeSeatsDisplayed =
    rowThree.length === 4
      ? ["3-4", "3-3", "3-2", "3-1"]
      : ["3-3", "3-2", "3-1"];

  const seatMap = getSeatMap(trip);
  return {
    rowTwo: rowTwoSeatsDisplayed.map((seatId) => {
      return seatMap[seatId] || null;
    }),
    rowThree: rowThreeSeatsDisplayed.map((seatId) => {
      return seatMap[seatId] || null;
    }),
  };
};

const getDisplayDate = (trip: Trips[number]) => {
  const date = new Date(trip.dateTime);

  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${month}, ${day} - ${hour}:${minutes}`;
};

const getSeatMap = (trip: Trips[number]) => {
  const { seats } = trip;

  const map = _.keyBy(seats, (seat: Seat) => {
    return `${seat.row}-${seat.seat}`;
  });

  return map;
};

const processTripsForVehicleVisualization = (trips: Trips) => {
  return trips.map((trip) => {
    return {
      ...trip,
      displayDate: getDisplayDate(trip),
      seatMap: getSeatMap(trip),
      seatsByRow: getSeatsByRow(trip),
    };
  });
};

const filterTripsByRider = (
  formattedTrips: ReturnType<typeof processTripsForVehicleVisualization>,
  riderId: string | null
) => {
  console.log({ riderId });
  if (!riderId) {
    return formattedTrips;
  }
  return formattedTrips.filter((trip) =>
    trip.seats.find((seat) => seat.riderId === riderId)
  );
};

export const formatTrips = (trips: Trips, riderId: string | null) => {
  const processedTrips = processTripsForVehicleVisualization(trips);

  const filteredTrips = filterTripsByRider(processedTrips, riderId);

  console.log({ filteredTrips });

  return filteredTrips;
};
