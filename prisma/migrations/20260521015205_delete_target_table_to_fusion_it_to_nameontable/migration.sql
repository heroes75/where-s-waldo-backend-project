/*
  Warnings:

  - You are about to drop the `NameOnGame` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nameId,gameId]` on the table `Targets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "NameOnGame" DROP CONSTRAINT "NameOnGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "NameOnGame" DROP CONSTRAINT "NameOnGame_nameId_fkey";

-- DropForeignKey
ALTER TABLE "Targets" DROP CONSTRAINT "Targets_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Targets" DROP CONSTRAINT "Targets_nameId_fkey";

-- DropTable
DROP TABLE "NameOnGame";

-- CreateIndex
CREATE UNIQUE INDEX "Targets_nameId_gameId_key" ON "Targets"("nameId", "gameId");

-- AddForeignKey
ALTER TABLE "Targets" ADD CONSTRAINT "Targets_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Targets" ADD CONSTRAINT "Targets_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
