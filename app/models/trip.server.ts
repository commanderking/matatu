import { prisma } from "~/db.server";

export async function getTrips() {
  return prisma.trip.findMany({
    select: {
      id: true,
      dateTime: true,
      seats: {
        select: {
          riderName: true,
          row: true,
          seat: true,
          rider: true,
          riderId: true,
        },
      },
    },
  });
}

export type Trips = Awaited<Promise<ReturnType<typeof getTrips>>>;

export type Seat = {
  riderName: string;
  row: number;
  seat: number;
  rider: {
    id: string;
    firstName: string;
    profileSrc: string;
  };
};
