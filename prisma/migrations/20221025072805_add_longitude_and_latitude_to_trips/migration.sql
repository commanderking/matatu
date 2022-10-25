/*
  Warnings:

  - Added the required column `endLatitude` to the `BikeTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endLongitude` to the `BikeTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLatitude` to the `BikeTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLongitude` to the `BikeTrip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BikeTrip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tripDuration" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "stopTime" DATETIME NOT NULL,
    "startStationId" TEXT NOT NULL,
    "startStationName" TEXT NOT NULL,
    "startLatitude" REAL NOT NULL,
    "startLongitude" REAL NOT NULL,
    "endStationId" TEXT NOT NULL,
    "endStationName" TEXT NOT NULL,
    "endLatitude" REAL NOT NULL,
    "endLongitude" REAL NOT NULL,
    "bikeId" INTEGER NOT NULL,
    "userType" TEXT NOT NULL,
    "birthYear" INTEGER,
    "gender" TEXT
);
INSERT INTO "new_BikeTrip" ("bikeId", "birthYear", "endStationId", "endStationName", "gender", "id", "startStationId", "startStationName", "startTime", "stopTime", "tripDuration", "userType") SELECT "bikeId", "birthYear", "endStationId", "endStationName", "gender", "id", "startStationId", "startStationName", "startTime", "stopTime", "tripDuration", "userType" FROM "BikeTrip";
DROP TABLE "BikeTrip";
ALTER TABLE "new_BikeTrip" RENAME TO "BikeTrip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
