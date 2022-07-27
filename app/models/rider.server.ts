import { prisma } from "~/db.server";

export async function getRiders() {
  return prisma.rider.findMany({
    select: {
      id: true,
      firstName: true,
      profileSrc: true,
    },
  });
}

export type Riders = Awaited<Promise<ReturnType<typeof getRiders>>>;
