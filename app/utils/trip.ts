import _ from "lodash";
import type { Trips, Seat } from "app/models/trip.server";
import { scaleQuantile } from "d3-scale";
import { redColorScale } from "app/constants/vehicle";

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
  return filteredTrips;
};

export type FormattedTrips = ReturnType<typeof formatTrips>;

const ToyotaPradoCounts = {
  "1-1": 0,
  "1-2": 0,
  "1-3": 0,
  "2-1": 0,
  "2-2": 0,
  "2-3": 0,
  // "2-4": 0,
  "3-1": 0,
  "3-2": 0,
  "3-3": 0,
};

const getFrequencyPerSeat = (
  seats: Seat[],
  seatMapCount: { [key: string]: number }
) => {
  const countsPerSeat = seats.reduce((seatCount, currentSeat) => {
    const currentSeatId = `${currentSeat.row}-${currentSeat.seat}`;
    return {
      ...seatCount,
      [currentSeatId]: seatCount[currentSeatId] + 1,
    };
  }, seatMapCount);

  return countsPerSeat;
};

const getColorsAndCountsPerSeat = (seatMapCount: { [key: string]: number }) => {
  const counts = Object.values(seatMapCount);

  const max = _.max(counts);

  const quantile = scaleQuantile<string>()
    .domain([1, max])
    .range(redColorScale);

  return _.mapValues(seatMapCount, (count) => {
    return {
      count,
      color: count === 0 ? "white" : quantile(count),
    };
  });
};

export const getSeats = (trips: Trips, riderId?: string) => {
  const fourSeatTrips = trips.filter((trip) =>
    trip.seats.find((seat) => seat.seat === 4)
  );

  const threeSeatTrips = trips.filter(
    (trip) => !trip.seats.find((seat) => seat.seat === 4)
  );

  console.log({ threeSeatTrips });

  const seats = threeSeatTrips
    .map((trip) => trip.seats)
    .flat()
    .filter((seat) => {
      if (!riderId) {
        return seat;
      }

      return seat.riderId === riderId;
    });

  const frequencies = getFrequencyPerSeat(seats, ToyotaPradoCounts);
  return getColorsAndCountsPerSeat(frequencies);
};
