import { prisma } from "~/db.server";

type District = "Cambridge" | "Boston";

type GetStationParams = {
  district?: District;
};

export async function getStations(params: GetStationParams) {
  const { district } = params;
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
      district,
    },
  });
}

export type Stations = Awaited<Promise<ReturnType<typeof getStations>>>;
