import _ from "lodash";

import { Trips } from "app/models/bluebikes/trips.server";
import { Stations } from "app/models/bluebikes/stations.server";
import { timeFormat } from "d3-time-format";

const getUniqueStationNames = (trips: Trips) => {
  const stationsSet = new Set<string>();
  trips.forEach((trip) => {
    stationsSet.add(trip.startStationName);
    stationsSet.add(trip.endStationName);
  });

  return [...stationsSet];
};

export const getStationLocationsForTrips = (
  trips: Trips,
  stations: Stations
) => {
  const stationNames = getUniqueStationNames(trips);

  const stationsByName = _.keyBy(stations, "name");

  const stationsWithLocations = [...stationNames].map((stationName) => {
    return stationsByName[stationName];
  });

  return stationsWithLocations.filter(Boolean);
};

const appendStationDataToTrip = (trips: Trips, stations: Stations) => {
  const stationsByName = _.keyBy(stations, "name");

  return trips.map((trip) => {
    return {
      ...trip,
      startStation: stationsByName[trip.startStationName],
      endStation: stationsByName[trip.endStationName],
    };
  });
};

const getDateKey = (dateString: string) => {
  const formatTime = timeFormat("%m/%d/%Y");

  return formatTime(new Date(dateString));
};

export const getTripsByDate = (trips: Trips, stations: Stations) => {
  const tripWithStationData = appendStationDataToTrip(trips, stations);

  return _.groupBy(tripWithStationData, (trip) => {
    return getDateKey(trip.startTime);
  });
};
