/*
  Warnings:

  - The `disabledDates` column on the `Listing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "disabledDates",
ADD COLUMN     "disabledDates" TIMESTAMP(3)[];
