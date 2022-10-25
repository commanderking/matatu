import { prisma } from "~/db.server";

type District = "Cambridge" | "Boston";

type GetStationParams = {
  district?: District;
};

export async function getStations(params?: GetStationParams) {
  return prisma.bikeStation.findMany({
    select: {
      id: true,
      longitude: true,
      latitude: true,
      name: true,
      deploymentYear: true,
      district: true,
    },
    where: {
      district: params?.district,
    },
  });
}

export type Stations = Awaited<Promise<ReturnType<typeof getStations>>>;
