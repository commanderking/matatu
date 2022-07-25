const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { riders } = require("./seedConstants.js");

const prisma = new PrismaClient();

const trips = [
  {
    dateTime: "2022-07-20T05:15:30.000Z",
  },
  {
    dateTime: "2022-07-20T08:15:30.000Z",
  },
];

const seats = [
  [
    {
      riderName: "Steven",
      row: 1,
      seat: 1,
    },
    {
      riderName: "Aduon",
      row: 1,
      seat: 2,
    },
    {
      riderName: "Jossy",
      row: 2,
      seat: 1,
    },
    {
      riderName: "Yang",
      row: 2,
      seat: 2,
    },
    {
      riderName: "Jack",
      row: 2,
      seat: 3,
    },
    {
      riderName: "Jeffrey",
      row: 3,
      seat: 3,
    },
    { riderName: "Chase", row: 3, seat: 1 },
  ],
  [
    {
      riderName: "Peter",
      row: 1,
      seat: 1,
    },
    {
      riderName: "Jossy",
      row: 1,
      seat: 3,
    },
    {
      riderName: "Steven",
      row: 1,
      seat: 2,
    },
    {
      riderName: "Wilson",
      row: 2,
      seat: 1,
    },
  ],
];

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
  const trip = await prisma.trip.create({ data: trips[0] });

  const tripOneCreates = seats[0].map((seat) => {
    return prisma.seat.create({
      data: {
        ...seat,
        riderId: ridersByName[seat.riderName].id,
        tripId: trip.id,
      },
    });
  });

  const tripTwo = await prisma.trip.create({ data: trips[1] });

  const tripTwoCreates = seats[1].map((seat) => {
    return prisma.seat.create({
      data: {
        ...seat,
        riderId: ridersByName[seat.riderName].id,
        tripId: tripTwo.id,
      },
    });
  });

  const seatsSaved = await Promise.all(tripOneCreates);
  const seatsSavedTwo = await Promise.all(tripTwoCreates);

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
