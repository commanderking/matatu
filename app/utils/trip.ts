import _ from "lodash";
import type { Trips, Seat } from "app/models/trip.server";
import { scaleQuantile } from "d3-scale";
import { redColorScale, seatRowWidth } from "app/constants/vehicle";
import {
  vehicleXStartPos,
  seatXShift,
  seatWidth,
  secondRow,
  thirdRow,
  ToyotaPradoSeatPositions,
} from "app/constants/vehicle";
import type { Seating, Rider } from "app/types/vehicle";

// Makes Typescript happy when filtering out null values
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDisplayDate = (trip: Trips[number]) => {
  const date = new Date(trip.dateTime);

  const day = date.getDate();

  const hour = date.toLocaleString("default", {
    hour: "numeric",
    timeZone: "Africa/Nairobi",
    hour12: false,
  });

  const minutes = date.getMinutes();

  const dayOfWeek = weekday[date.getDay()];
  return {
    time: `${hour}:${minutes}`,
    month: date.getMonth() + 1,
    day,
    dayOfWeek,
  };
};

const processTripsForVehicleVisualization = (trips: Trips) => {
  return trips.map((trip) => {
    return {
      ...trip,
      ...getDisplayDate(trip),
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

  const tripsByDate = _.groupBy(filteredTrips, (trip) => {
    return `${trip.dayOfWeek}, ${trip.month}/${trip.day}`;
  });

  // Should add more code to guarantee ordering, but for dates given, this should work
  const uniqueDates = _.uniq(Object.keys(tripsByDate));
  const tripsGroupedWithDate = uniqueDates.map((date) => {
    return {
      date,
      trips: tripsByDate[date],
    };
  });

  return tripsGroupedWithDate;
};

export type TripsInDate = ReturnType<typeof formatTrips>[number];

export type FormattedTrip = TripsInDate["trips"][number];

const getFrequencyPerSeat = (seats: Seat[]) => {
  const seatingCounts: { [key: string]: { id: string; count: number } } = {};

  const countsPerSeat = seats.reduce((seatCount, currentSeat) => {
    const currentSeatId = `${currentSeat.row}-${currentSeat.seat}`;
    return {
      ...seatCount,
      [currentSeatId]: {
        id: currentSeatId,
        count: seatCount[currentSeatId]?.count
          ? seatCount[currentSeatId]?.count + 1
          : 1,
      },
    };
  }, seatingCounts);

  return countsPerSeat;
};

const getColorsAndCountsPerSeat = (
  seatMapCount: {
    [key: string]: { id: string; count: number };
  },
  rowTwoMaxSeats: number,
  rowThreeMaxSeats: number
) => {
  const counts = Object.values(seatMapCount).map((map) => map.count);
  const max = _.max(counts);

  const quantile = scaleQuantile<string>()
    .domain([1, max])
    .range(redColorScale);

  const positionReference = ToyotaPradoSeatPositions;

  const rowTwoPositions = _.keyBy(generateRowRiders(2, rowTwoMaxSeats), "id");
  const rowThreePositions = _.keyBy(
    generateRowRiders(3, rowThreeMaxSeats),
    "id"
  );

  const allPositionReferences = {
    ...positionReference,
    ...rowTwoPositions,
    ...rowThreePositions,
  };

  const mappedColors = _.mapValues(seatMapCount, (seatMap) => {
    return {
      ...seatMap,
      color: seatMap.count === 0 ? "white" : quantile(seatMap.count),
      ...allPositionReferences[seatMap.id],
    };
  });

  return mappedColors;
};

export const getHeatMap = (
  trips: Trips,
  riderId?: string,
  maxSeatsPerRow: number = 3
) => {
  const fourSeatTrips = trips.filter((trip) =>
    trip.seats.find((seat) => seat.seat === 4)
  );

  const threeSeatTrips = trips.filter(
    (trip) => !trip.seats.find((seat) => seat.seat === 4)
  );

  const seats = threeSeatTrips
    .map((trip) => trip.seats)
    .flat()
    .filter((seat) => {
      return !riderId ? seat : seat.riderId === riderId;
    });

  const frequencies = getFrequencyPerSeat(seats);
  const heatMapPositions = getColorsAndCountsPerSeat(
    frequencies,
    maxSeatsPerRow,
    maxSeatsPerRow
  );

  return _.values(heatMapPositions);
};

export const generateSeats = (): Seating[] => {
  return [
    ToyotaPradoSeatPositions["1-1"],
    ToyotaPradoSeatPositions["1-2"],
    secondRow,
    thirdRow,
  ];
};

const generateRowRiders = (rowNumber: number, ridersInRow: number) => {
  const maxSeats = ridersInRow === 4 ? 4 : 3;
  const adjustedSeatWidth = seatRowWidth / maxSeats;

  const generateRiderPositions = (rowNumber: number, maxSeats: number) => {
    const baseX = vehicleXStartPos + seatXShift;
    const baseY = rowNumber === 2 ? secondRow.y : thirdRow.y;
    return _.times(maxSeats, (index) => {
      return {
        id: `${rowNumber}-${maxSeats - index}`,
        x:
          baseX +
          index * (adjustedSeatWidth - (seatWidth - adjustedSeatWidth) / 3),
        y: baseY,
        row: rowNumber,
        seat: maxSeats - index,
      };
    });
  };

  return generateRiderPositions(rowNumber, maxSeats);
};

const getRiderData = (seat: Seat) => {
  return {
    id: seat.riderId,
    name: seat.riderName,
    image: seat.rider.profileSrc,
  };
};

export const generateRiders = (trip: Trips[number]): Rider[] => {
  if (!trip) {
    return [];
  }
  const activeSeatsUsed = _.keyBy(trip.seats, (seat) => {
    return `${seat.row}-${seat.seat}`;
  });

  const getRiderInfo = (seatId: "1-1" | "1-2" | "1-3") => {
    if (!activeSeatsUsed[seatId]) {
      return null;
    }

    return {
      ...ToyotaPradoSeatPositions[seatId],
      ...getRiderData(activeSeatsUsed[seatId]),
    };
  };

  const ridersInRowTwo = trip.seats.filter((seat) => seat.row === 2);
  const ridersInRowThree = trip.seats.filter((seat) => seat.row === 3);

  const rowTwoRiders = generateRowRiders(2, ridersInRowTwo.length);
  const rowThreeRiders = generateRowRiders(3, ridersInRowThree.length);

  const allRowRiders = [...rowTwoRiders, ...rowThreeRiders];

  const rowRiders = allRowRiders.map((rowRider) => {
    const { id } = rowRider;

    if (!activeSeatsUsed[id]) {
      return null;
    }
    return {
      ...rowRider,
      ...getRiderData(activeSeatsUsed[id]),
    };
  });

  return [
    getRiderInfo("1-1"),
    getRiderInfo("1-2"),
    getRiderInfo("1-3"),
    ...rowRiders,
  ].filter(notEmpty);
};

export const createTripSeatingConfig = () => {};
