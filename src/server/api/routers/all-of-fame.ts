import { and, count, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  events,
  eventsParticipants,
  expenses,
  users,
} from "~/server/db/schema";

export const allOfFameRouter = createTRPCRouter({
  // top spend of a group
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

      return topSpend;
    }),

  mostParticipant: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({ user: users, count: count(eventsParticipants.eventId) })
        .from(users)
        .innerJoin(eventsParticipants, eq(users.id, eventsParticipants.userId))
        .groupBy(users.id);
    }),
});
