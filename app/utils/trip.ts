import _ from "lodash";
import { Trips, Seat } from "app/models/trip.server";

const vehicles = {
  "KAT480S-3": {
    id: "KAT480S-3",
    description: "Only 3 seats per row needed",
  },
  "KAT480S-4": {
    id: "KAT480S-4",
    description: "Only 4 seats per row needed",
  },
};

const getVehicleType = (seats: Seat[]) => {
  const hasFourSeats = seats.find((seat) => seat.seat === 4);

  if (hasFourSeats) {
    return vehicles["KAT480S-4"].id;
  }

  return vehicles["KAT480S-3"].id;
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

export const processTripsForVehicleVisualization = (trips: Trips) => {
  return trips.map((trip) => {
    const vehicleType = getVehicleType(trip.seats);
    return {
      ...trip,
      vehicleType,
      displayDate: getDisplayDate(trip),
      seatMap: getSeatMap(trip),
    };
  });
};
