import { and, count, eq, sql, desc, asc } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  events,
  eventsParticipants,
  expenses,
  users,
messages,
} from "~/server/db/schema";

export const allOfFameRouter = createTRPCRouter({
  topSpend: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      const topSpend = await ctx.db.query.expenses.findFirst({
        where: (expenses, { eq, and }) => eq(expenses.groupId, input.groupId),
        with: {
          user: true,
        },
        orderBy: (expenses, { desc }) => [desc(expenses.amount)],
      });
      if (!topSpend) {
        const noTopSpend = structuredClone(topSpend);
        return { price: 0, username: "nobody found" };
      }

      return { price: topSpend.amount, username: topSpend.user.name };
    }),

  //  user with the most particpiation in events in a group
  mostParticipant: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({ user: users, count: count(eventsParticipants.eventId)})
        .from(users)
        .innerJoin(eventsParticipants, eq(users.id, eventsParticipants.userId))
        .groupBy(users.id)
        .orderBy(desc(count(eventsParticipants.eventId)));
    }),

    // user with the most messages in a group
    mostMessages: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({ user: users, count: count(messages.id) })
        .from(users)
        .innerJoin(messages, eq(users.id, messages.userId))
        .groupBy(users.id)
        .orderBy(desc(count(messages.id)));
    }),

    // user with most expences in a group with all events

    mostExpences: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({ user: users, count: count(expenses.id) })
        .from(users)
        .innerJoin(expenses, eq(users.id, expenses.userId))
        .groupBy(users.id)
        .orderBy(desc(count(expenses.id)));
    }),

    // MostExpencesAmount

    mostExpencesAmount: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({ user: users, sum: sql`SUM(${expenses.amount})` })
        .from(users)
        .innerJoin(expenses, eq(users.id, expenses.userId))
        .groupBy(users.id)
        .orderBy(desc(sql`SUM(${expenses.amount})`));
    }),

    // utilisateur qui à proposé le plus d'actvitée

    mostActivities: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({ user: users, count: count(events.id) })
        .from(users)
        .innerJoin(events, eq(users.id, events.createdBy))
        .groupBy(users.id)
        .orderBy(desc(count(events.id)));
    }),

});
