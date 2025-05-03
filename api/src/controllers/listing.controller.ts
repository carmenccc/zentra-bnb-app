import { Request, Response } from "express";
import prisma from "../utils/prisma-client";
import jwt from "jsonwebtoken";
import {
  Amenity,
  ApiResponse,
  Listing,
  ListingDetail,
  ListingType,
  PropertyType,
  RoomType,
} from "@zentra/shared";
import { NotFoundError } from "../errors/not-found-error";
import { ServerError } from "../errors/server-error";
import { ForbiddenError } from "../errors/forbidden-error";

/// Typing request & query
interface AuthenticatedRequest extends Request {
  userId: number;
}

interface GetListingsQuery {
  city?: string;
  type?: ListingType;
  property?: PropertyType;
  //   bedroom?: string;
  minPrice?: string;
  maxPrice?: string;
}

/// Handlers
export const addListing = async (
  req: Request,
  res: Response<ApiResponse<Listing>>
) => {
  // Get the listing data from request
  const body = req.body;
  const { userId } = req as AuthenticatedRequest;

  // Create the new listing database, along with the listing detail

  const newListing = (await prisma.listing.create({
    data: {
      ...body.listing,
      userId: userId,
      listingDetail: {
        create: {
          ...body.listingDetail,
          amenities: {
            connect: body.listingDetail.amenities.map((a: Amenity) => ({
              id: a.id,
            })),
          },
          roomTypes: {
            connect: body.listingDetail.roomTypes.map((r: RoomType) => ({
              id: r.id,
            })),
          },
        },
      },
    },
    include: {
      listingDetail: true,
    },
  })) as Listing;

  if (!newListing) throw new ServerError("Failed to create listing");

  // Return the created listing data in response
  res.status(201).json({
    success: true,
    message: `${newListing.id} created!`,
    data: newListing,
  });
};

export const getListings = async (
  req: Request<{}, {}, {}, GetListingsQuery>,
  res: Response<ApiResponse<Listing[]>>
) => {
  // Get query data from request
  const query = req.query;

  // Fetch listings by query data

  const listings = (await prisma.listing.findMany({
    // conditions
    where: {
      city: query.city
        ? {
            equals: query.city,
            mode: "insensitive", // case insensitive
          }
        : undefined,
      type: query.type || undefined,
      property: query.property || undefined,
      // bedroom: parseInt(query.bedroom || "1"),
      price: {
        gte: parseInt(query.minPrice!) || undefined,
        lte: parseInt(query.maxPrice!) || undefined,
      },
    },
  })) as Listing[];

  // Set time limitation for fetch
  // setTimeout(() => {
  // }, 5000);

  // Return listings as response data
  res.status(200).json({ success: true, data: listings });
};

export const getListing = async (
  req: Request,
  res: Response<ApiResponse<Listing>>
) => {
  // Get id from request param
  const id = req.params.id;

  // Find listing by id

  const listing = (await prisma.listing.findUnique({
    where: { id },
    include: {
      listingDetail: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  })) as Listing;

  // TODO: find isSaved relationship, add isSaved data field
  ////////

  // Throw error for not found
  if (!listing) throw new NotFoundError();

  // Send listing data as response
  res.status(200).json({ success: true, data: listing });
};

export const deleteListing = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  // 1. Get id & userToken
  const id = req.params.id;
  const { userId: currenUserId } = req as AuthenticatedRequest;

  // 2. Find the listing by id

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) throw new NotFoundError();

  // 3. Check if current user is the owner user
  if (listing.userId !== currenUserId) {
    throw new ForbiddenError("User not authorized to delete this resource");
  }

  // 4. Delete
  await prisma.listing.delete({
    where: { id },
  });

  res.status(200).json({ success: true, message: "Listing deleted" });
};
