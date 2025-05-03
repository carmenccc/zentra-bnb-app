-- DropForeignKey
ALTER TABLE "ListingDetail" DROP CONSTRAINT "ListingDetail_listingId_fkey";

-- AddForeignKey
ALTER TABLE "ListingDetail" ADD CONSTRAINT "ListingDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
