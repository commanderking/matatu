const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const trips = [
  {
    dateTime: "2022-07-20T05:15:30.000Z",
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

  const trip = await prisma.trip.create({ data: trips[0] });

  const promises = seats[0].map((seat) => {
    return prisma.seat.create({
      data: {
        ...seat,
        tripId: trip.id,
      },
    });
  });

  await Promise.all(promises);

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
