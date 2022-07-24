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
        },
      },
    },
  });
}
