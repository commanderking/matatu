import { prisma } from "~/db.server";

type GetStationParams = {
  bikeId?: number;
};

export async function getTrips(params: GetStationParams) {
  const { bikeId } = params;
  return prisma.bikeTrip.findMany({
    select: {
      id: true,
      bikeId: true,
      tripDuration: true,
      startStationName: true,
      startLatitude: true,
      startLongitude: true,
      endStationName: true,
      endLatitude: true,
      endLongitude: true,
      birthYear: true,
      gender: true,
    },
    where: {
      bikeId,
    },
  });
}

export type Stations = Awaited<Promise<ReturnType<typeof getTrips>>>;
