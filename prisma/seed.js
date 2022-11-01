const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { riders, trips, seats, routes } = require("./seedConstants.js");
const csv = require("csvtojson");
var path = require("path");

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
      const savedRoute = await prisma.route.create({
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

  const bikeTrips = await csv({
    colParser: {
      bikeid: "number",
      birthyear: "number",
      tripduration: "number",
    },
  }).fromFile(path.join(__dirname, "202203_bluebikes_tripdata.csv"));

  const keyMap = {
    tripduration: "tripDuration",
    starttime: "startTime",
    stoptime: "stopTime",
    "start station id": "startStationId",
    "start station name": "startStationName",
    "end station latitude": "endLatitude",
    "end station id": "endStationId",
    "end station name": "endStationName",
    bikeid: "bikeId",
    usertype: "userType",
    birthyear: "birthYear",
  };

  const bikeTripsCorrectedKeys = bikeTrips.map((trip) => {
    return _.mapKeys(trip, (value, key) => {
      return keyMap[key] || key;
    });
  });

  const createBikeTrips = async () => {
    for (const bikeTrip of bikeTripsCorrectedKeys) {
      const savedBikeTrips = await prisma.bikeTrip.create({
        data: _.pick(bikeTrip, [
          "tripDuration",
          "startTime",
          "stopTime",
          "startStationId",
          "startStationName",
          "endStationId",
          "endStationName",
          "bikeId",
          "userType",
          "birthYear",
        ]),
      });
    }
  };

  createBikeTrips();

  // In future, will need to remove first line from current_bluebikes_stations.csv data

  // const fs = require("fs");
  // const filePath = "./table.csv";

  // let csvContent = fs.readFileSync(filePath).toString().split("\n"); // read file and convert to array by line break
  // csvContent.shift(); // remove the the first element from array
  // csvContent = csvContent.join("\n"); // convert array back to string

  // fs.writeFileSync(filePath, csvContent);

  const bikeStations = await csv({
    colParser: {
      Latitude: "number",
      Longitude: "number",
      "Total docks": "number",
      "Deployment year": (item) => {
        return item === "#N/A" ? null : parseInt(item);
      },
    },
  }).fromFile(path.join(__dirname, "current_bluebikes_stations.csv"));

  const bikeStationKeyMap = {
    Number: "number",
    Name: "name",
    Latitude: "latitude",
    Longitude: "longitude",
    District: "district",
    Public: "public",
    "Total docks": "totalDocks",
    "Deployment year": "deploymentYear",
  };

  const stationsCorrectedKeys = bikeStations.map((trip) => {
    return _.mapKeys(trip, (value, key) => {
      return bikeStationKeyMap[key] || key;
    });
  });

  const createBikeStations = async () => {
    for (const bikeStation of stationsCorrectedKeys) {
      const savedBikeStations = await prisma.bikeStation.create({
        data: _.pick(bikeStation, [
          "number",
          "name",
          "latitude",
          "longitude",
          "district",
          "public",
          "totalDocks",
          "deploymentYear",
        ]),
      });
    }
  };

  createBikeStations();

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
