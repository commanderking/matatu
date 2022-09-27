-- CreateTable
CREATE TABLE "BikeStation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "district" TEXT NOT NULL,
    "public" TEXT NOT NULL,
    "totalDocks" INTEGER NOT NULL,
    "deploymentYear" INTEGER
);
