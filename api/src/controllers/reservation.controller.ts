import { ApiResponse, Reservation } from "@zentra/shared";
import { Request, Response } from "express";
import prisma from "../utils/prisma-client";
import { AuthenticatedRequest } from "../middlewares/verify-token";
import { NotFoundError } from "../errors/not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const createReservation = async (
  req: Request,
  res: Response<ApiResponse<Reservation>>
) => {
  // Get data: userId, listingId
  const userId = (req as AuthenticatedRequest).userId;
  const { listingId, startDate, endDate, totalPrice } = req.body;

  if (
    !userId ||
    !listingId ||
    !startDate ||
    !endDate ||
    (!totalPrice && totalPrice !== 0)
  ) {
    res.status(400).json({ success: false, message: "Missing required field" });
    return;
  }

  // Check for overlapping reservations
  const overlapping = await prisma.reservation.findFirst({
    where: {
      listingId,
      startDate: { lte: new Date(endDate) },
      endDate: { gte: new Date(startDate) },
    },
  });

  if (overlapping) {
    res.status(409).json({
      success: false,
      message: "Listing already reserved for selected dates",
    });
    return;
  }

  // Create reservation
  const reservation = await prisma.reservation.create({
    data: {
      listingId,
      userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
    },
  });

  res
    .status(201)
    .send({ success: true, message: "creating", data: reservation });
};

export const deleteReservation = async (
  req: Request,
  res: Response<ApiResponse<Reservation>>
) => {
  // Get data: userId, listingId
  const currentUserId = (req as AuthenticatedRequest).userId;
  const reservationId = req.params.id;

  if (!currentUserId || !reservationId) {
    res
      .status(400)
      .json({ success: false, message: "Missing userId or reservationId" });
    return;
  }

  // Verify if reservation exists
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation) throw new NotFoundError();

  // Verify if reservation belongs to the current user
  if (currentUserId !== reservation.userId)
    throw new UnauthorizedError("Unauthorized to delete this reservation");

  // Delete reservation
  await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });

  res.status(200).json({ success: true, message: "Reservation deleted" });
};
