import { randomInt } from "crypto";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { sendNotificationToUsersFunction } from "./notifications";
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
        endVoteDate: z.string().datetime(),
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
        endVoteDate: new Date(input.endVoteDate),
      });

      const usersToInsert = {
        userId: ctx.session.user.id,
        groupId: input.groupId,
        eventId: id,
      };

      await ctx.db.insert(eventsParticipants).values(usersToInsert);
      const groupName = await ctx.db.query.groups.findFirst({
        columns: { name: true },
        where: (groups, { eq }) => eq(groups.id, input.groupId),
      });

      // retrieve all users from the group
      const users = await ctx.db.query.groupsMembers.findMany({
        columns: { userId: true },
        where: (groupsMembers, { eq }) => eq(groupsMembers.groupId, input.groupId),
      });

      const filteredUsers = users.filter((user) => user.userId !== ctx.session.user.id);

      const message = `A new event has been created in the group ${groupName?.name} ! Click here to view it.`;
      const urlLink = `/app/g/${input.groupId}/events`;

      await sendNotificationToUsersFunction({
        message: message,
        userIds: filteredUsers.map((user) => user.userId),
        type: "NEW_EVENT_TO_GROUP",
        urlLink,
      });
    }),


    //Update event
    updateEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        date: z.string().datetime(),
        location: z.string().optional(),
        groupId: z.number(),
        eventId: z.number(),
        endVoteDate: z.string().datetime(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(events)
        .set({
          name: input.name,
          description: input.description,
          date: new Date(input.date),
          location: input.location,
          endVoteDate: new Date(input.endVoteDate),
        })
        .where(
          and(
            eq(events.id, input.eventId),
            eq(events.groupId, input.groupId),
          ),
        );
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
      if (input.accepted) {
        await ctx.db.insert(eventsParticipants).values({
          userId: ctx.session.user.id,
          groupId: input.groupId,
          eventId: input.eventId,
        });
      } else {
        await ctx.db
          .delete(eventsParticipants)
          .where(
            and(
              eq(eventsParticipants.userId, ctx.session.user.id),
              eq(eventsParticipants.groupId, input.groupId),
              eq(eventsParticipants.eventId, input.eventId),
            ),
          );
      }
    }),

  getEvents: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.events.findMany({
        where: (events, { eq }) => eq(events.groupId, input.groupId),
        with: { participants: true },
      });
    }),

  getEventById: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.events.findFirst({
        where: (events, { eq, and }) =>
          and(eq(events.groupId, input.groupId), eq(events.id, input.eventId)),
        with: {
          group: {
            with: { members: true },
          },
        },
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

    getParticipant: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const participant = await ctx.db.query.eventsParticipants.findMany({
        where: (eventParticipants, { eq, and }) =>
          and(
            eq(eventParticipants.userId, ctx.session.user.id),
            eq(eventParticipants.groupId, input.groupId),
            eq(eventParticipants.eventId, input.eventId),
          ),
          with: {user: true},
      });
    return participant;
    }),

  getInfo: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: (events, { eq, and }) =>
          and(eq(events.groupId, input.groupId), eq(events.id, input.eventId)
          ),
          with: {createdBy: true},
      });
      return event;
    }),

  getEndVoteDate: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        columns: {
          endVoteDate: true,
        },
        where: (events, { eq, and }) =>
          and(eq(events.groupId, input.groupId), eq(events.id, input.eventId)),
      });
      console.log(event);
      return event?.endVoteDate;
    }),
});
