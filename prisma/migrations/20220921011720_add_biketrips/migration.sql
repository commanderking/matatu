-- CreateTable
CREATE TABLE "BikeTrip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tripDuration" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "stopTime" DATETIME NOT NULL,
    "startStationId" TEXT NOT NULL,
    "startStationName" TEXT NOT NULL,
    "endStationId" TEXT NOT NULL,
    "endStationName" TEXT NOT NULL,
    "bikeId" INTEGER NOT NULL,
    "userType" TEXT NOT NULL,
    "birthYear" INTEGER,
    "gender" TEXT
);
