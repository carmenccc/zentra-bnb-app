import { Request, Response } from "express";
import prisma from "../utils/prisma-client";
import { ApiResponse, Listing } from "@zentra/shared";
import { AuthenticatedRequest } from "../middlewares/verify-token";
import { NotFoundError } from "../errors/not-found-error";

export const getUserListings = async (
  req: Request,
  res: Response<ApiResponse<Listing[]>>
) => {
  const { userId: currentUserId } = req as AuthenticatedRequest;

  const userListings = await prisma.listing.findMany({
    where: { userId: currentUserId },
  });

  if (!userListings) throw new NotFoundError();

  res.status(200).json({ success: true, data: userListings as Listing[] });
};

export const getSavedListings = async (
  req: Request,
  res: Response<ApiResponse<Listing[]>>
) => {
  const { userId: currentUserId } = req as AuthenticatedRequest;

  const savedRecords = await prisma.savedListing.findMany({
    where: { userId: currentUserId },
    include: {
      listing: true,
    },
  });

  if (!savedRecords) throw new NotFoundError();

  const savedListings = savedRecords.map((r) => r.listing);

  res.status(200).json({ success: true, data: savedListings as Listing[] });
};
