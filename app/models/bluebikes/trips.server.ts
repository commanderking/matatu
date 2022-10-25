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
      endStationName: true,
      birthYear: true,
      gender: true,
    },
    where: {
      bikeId,
    },
  });
}

export type Stations = Awaited<Promise<ReturnType<typeof getTrips>>>;
