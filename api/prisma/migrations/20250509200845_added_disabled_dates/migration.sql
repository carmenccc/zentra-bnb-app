-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "disabledDates" JSONB;

-- CreateTable
CREATE TABLE "Reservation" (
    "_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "listingId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
