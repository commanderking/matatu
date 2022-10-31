import _ from "lodash";

import { Trips } from "app/models/bluebikes/trips.server";
import { Stations } from "app/models/bluebikes/stations.server";

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
