/*
  Warnings:

  - Added the required column `riderId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Rider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT,
    "age" INTEGER,
    "occupation" TEXT,
    "profileSrc" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tripId" TEXT NOT NULL,
    "riderName" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "seat" INTEGER NOT NULL,
    "riderId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Seat_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seat_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("createdAt", "id", "riderName", "row", "seat", "tripId", "updatedAt") SELECT "createdAt", "id", "riderName", "row", "seat", "tripId", "updatedAt" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
