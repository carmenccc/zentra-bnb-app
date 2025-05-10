/*
  Warnings:

  - You are about to drop the column `bathroom` on the `ListingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `bedroom` on the `ListingDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "bathroom" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "bedroom" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "ListingDetail" DROP COLUMN "bathroom",
DROP COLUMN "bedroom";
