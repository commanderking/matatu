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
      startTime: true,
      stopTime: true,
    },
    where: {
      bikeId,
    },
  });
}

export type Trips = Awaited<Promise<ReturnType<typeof getTrips>>>;
export type Trip = Trips[0];
