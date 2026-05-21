-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_gameId_fkey";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Anonymous';

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
