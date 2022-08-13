const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { riders, trips, seats, routes } = require("./seedConstants.js");

const prisma = new PrismaClient();

const seatsByTrip = _.groupBy(seats, "trip");

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const riderCreates = riders.map((rider) => {
    return prisma.rider.create({
      data: rider,
    });
  });

  const availableRiders = await Promise.all(riderCreates);
  const ridersByName = _.keyBy(availableRiders, "firstName");

  const createRoutes = async () => {
    for (const route of routes) {
      await prisma.route.create({
        data: {
          start: route.start,
          end: route.end,
          id: route.routeId,
        },
      });
    }
  };

  createRoutes();

  const createTripsAndSeats = async () => {
    for (const trip of trips) {
      const savedTrip = await prisma.trip.create({
        data: _.pick(trip, ["dateTime", "routeId"]),
      });

      for (const seat of seatsByTrip[trip.tripId]) {
        await prisma.seat.create({
          data: {
            ..._.pick(seat, ["riderName", "row", "seat"]),
            riderId: ridersByName[seat.riderName].id,
            tripId: savedTrip.id,
          },
        });
      }
    }
  };

  createTripsAndSeats();

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
