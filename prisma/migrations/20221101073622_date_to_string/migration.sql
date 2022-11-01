-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BikeTrip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tripDuration" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "stopTime" TEXT NOT NULL,
    "startStationId" TEXT NOT NULL,
    "startStationName" TEXT NOT NULL,
    "endStationId" TEXT NOT NULL,
    "endStationName" TEXT NOT NULL,
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
