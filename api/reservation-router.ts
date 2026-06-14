import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reservationRequests } from "@db/schema";
import { eq, and, between } from "drizzle-orm";

export const reservationRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        checkInDate: z.string().min(1),
        checkOutDate: z.string().min(1),
        guests: z.string().min(1),
        children: z.number().optional(),
        roomType: z.string().min(1),
        roomId: z.string().optional(),
        acPreference: z.enum(["ac", "non-ac"]).optional(),
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(reservationRequests).values({
        userId: input.userId ?? null,
        checkInDate: input.checkInDate,
        checkOutDate: input.checkOutDate,
        guests: input.guests,
        children: input.children ?? 0,
        roomType: input.roomType,
        roomId: input.roomId ?? null,
        acPreference: input.acPreference ?? "ac",
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),

  checkAvailability: publicQuery
    .input(
      z.object({
        checkInDate: z.string().min(1),
        checkOutDate: z.string().min(1),
        roomType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      
      // Check if there are any confirmed reservations for the given date range
      // For the same room type or overlapping dates
      const existingBookings = await db
        .select()
        .from(reservationRequests)
        .where(
          and(
            input.roomType && input.roomType !== "Any room" 
              ? eq(reservationRequests.roomType, input.roomType) 
              : undefined,
            // Simple availability check: look for confirmed bookings in date range
            // A room is unavailable if there's a confirmed booking for overlapping dates
          )
        );

      // Filter bookings that overlap with requested dates
      const overlappingBookings = existingBookings.filter(booking => {
        if (booking.status === "cancelled") return false;
        const bookingCheckIn = new Date(booking.checkInDate);
        const bookingCheckOut = new Date(booking.checkOutDate);
        const requestCheckIn = new Date(input.checkInDate);
        const requestCheckOut = new Date(input.checkOutDate);
        
        // Check if dates overlap
        return (
          (requestCheckIn >= bookingCheckIn && requestCheckIn < bookingCheckOut) ||
          (requestCheckOut > bookingCheckIn && requestCheckOut <= bookingCheckOut) ||
          (requestCheckIn <= bookingCheckIn && requestCheckOut >= bookingCheckOut)
        );
      });

      // For demo purposes, we'll say rooms are available if there are fewer than 3 overlapping bookings
      // In a real system, this would check against actual room inventory
      const isAvailable = overlappingBookings.length < 3;

      return { 
        available: isAvailable, 
        overlappingBookings: overlappingBookings.length 
      };
    }),

  list: publicQuery
    .query(async () => {
      const db = getDb();
      const bookings = await db.select().from(reservationRequests);
      return bookings;
    }),
});
