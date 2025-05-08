/*
  Warnings:

  - You are about to drop the column `amount` on the `RoomType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListingDetail" ADD COLUMN     "bathroom" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "bedroom" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "RoomType" DROP COLUMN "amount";
