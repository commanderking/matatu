import { prisma } from "~/db.server";

export async function getRoutes() {
  return prisma.route.findMany({
    select: {
      id: true,
      start: true,
      end: true,
    },
  });
}

export type Routes = Awaited<Promise<ReturnType<typeof getRoutes>>>;
