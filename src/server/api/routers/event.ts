import { randomInt } from "crypto";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { events, eventsParticipants } from "~/server/db/schema";

export const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        date: z.string().datetime(),
        location: z.string().optional(),
        groupId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = randomInt(1, 100000);
      await ctx.db.insert(events).values({
        id: id,
        createdBy: ctx.session.user.id,
        groupId: input.groupId,
        description: input.description,
        name: input.name,
        location: input.location,
        date: new Date(input.date),
      });

      const usersToInsert = {
        userId: ctx.session.user.id,
        groupId: input.groupId,
        eventId: id,
      };

      await ctx.db.insert(eventsParticipants).values(usersToInsert);
    }),

  acceptOrDeclineEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
        accepted: z.boolean(),
        groupId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.accepted)
        await ctx.db.insert(eventsParticipants).values({
          userId: ctx.session.user.id,
          groupId: input.groupId,
          eventId: input.eventId,
        });
    }),

  getEvents: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.events.findMany({
        where: (events, { eq }) => eq(events.groupId, input.groupId),
        with: { participants: true },
      });
    }),

  isParticipant: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const participation = await ctx.db.query.eventsParticipants.findFirst({
        where: (eventParticipants, { eq, and }) =>
          and(
            eq(eventParticipants.userId, ctx.session.user.id),
            eq(eventParticipants.groupId, input.groupId),
            eq(eventParticipants.eventId, input.eventId),
          ),
      });
      console.log(participation);

      return participation !== undefined;
    }),
});
