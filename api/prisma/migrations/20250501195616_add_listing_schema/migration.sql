-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('stay', 'rent');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('house', 'apartment', 'cabin', 'villa', 'other');

-- CreateTable
CREATE TABLE "Listing" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "type" "ListingType" NOT NULL,
    "property" "PropertyType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ListingDetail" (
    "_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "utilities" TEXT,
    "pet" TEXT,
    "size" INTEGER,
    "features" TEXT[],
    "listingId" TEXT NOT NULL,

    CONSTRAINT "ListingDetail_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "SavedListing" (
    "_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "listingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedListing_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ListingRoomTypes" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ListingRoomTypes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ListingAmenities" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ListingAmenities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListingDetail_listingId_key" ON "ListingDetail"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedListing_userId_listingId_key" ON "SavedListing"("userId", "listingId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_name_key" ON "RoomType"("name");

-- CreateIndex
CREATE INDEX "_ListingRoomTypes_B_index" ON "_ListingRoomTypes"("B");

-- CreateIndex
CREATE INDEX "_ListingAmenities_B_index" ON "_ListingAmenities"("B");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingDetail" ADD CONSTRAINT "ListingDetail_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingRoomTypes" ADD CONSTRAINT "_ListingRoomTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "ListingDetail"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingRoomTypes" ADD CONSTRAINT "_ListingRoomTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingAmenities" ADD CONSTRAINT "_ListingAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingAmenities" ADD CONSTRAINT "_ListingAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "ListingDetail"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
