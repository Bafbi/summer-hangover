import { randomInt } from "crypto";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { activities, users, votesActivities } from "~/server/db/schema";

export const activityRouter = createTRPCRouter({
  createActivity: protectedProcedure
    .input(
      z.object({
        groupId: z.number().min(1),
        eventId: z.number().min(1),
        name: z.string().min(1),
        description: z.string().min(1).optional(),
        location: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(activities).values({
        id: randomInt(1, 1000000),
        eventId: input.eventId,
        groupId: input.groupId,
        createdBy: ctx.session.user.id,
        location: input.location,
        description: input.description,
        name: input.name,
      });
    }),

  getActivities: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const activitiesSelect = await ctx.db
        .select({
          id: activities.id,
          name: activities.name,
          description: activities.description,
          location: activities.location,
          createdBy: users,
          votes: count(votesActivities.userId),
          eventId: activities.eventId,
          groupId: activities.groupId,
        })
        .from(activities)
        .where(
          and(
            eq(activities.groupId, input.groupId),
            eq(activities.eventId, input.eventId),
          ),
        )
        .innerJoin(users, eq(activities.createdBy, users.id))
        .leftJoin(
          votesActivities,
          eq(activities.id, votesActivities.activityId),
        )
        .groupBy(activities.id);

      const vote = await ctx.db.query.votesActivities.findFirst({
        where: (votesActivities, { eq, and }) =>
          and(
            and(
              eq(votesActivities.groupId, input.groupId),
              eq(votesActivities.eventId, input.eventId),
            ),
            eq(votesActivities.userId, ctx.session.user.id),
          ),
      });
      return { activities: activitiesSelect, vote };
    }),

  addFavorite: protectedProcedure
    .input(
      z.object({
        groupId: z.number(),
        eventId: z.number(),
        activityId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(votesActivities)
        .values({
          groupId: input.groupId,
          eventId: input.eventId,
          activityId: input.activityId,
          userId: ctx.session.user.id,
        })
        .onConflictDoUpdate({
          target: [
            votesActivities.groupId,
            votesActivities.eventId,
            votesActivities.userId,
          ],
          set: { activityId: input.activityId },
        });
      const count = (
        await ctx.db.query.votesActivities.findMany({
          where: (votesActivity, { eq }) =>
            eq(votesActivity.activityId, input.activityId),
        })
      ).length;
      return { count };
    }),

  getVotes: protectedProcedure
    .input(
      z.object({
        groupId: z.number(),
        eventId: z.number(),
        activityId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const count = (
        await ctx.db.query.votesActivities.findMany({
          where: (votesActivity, { eq }) =>
            eq(votesActivity.activityId, input.activityId),
        })
      ).length;
      return { count };
    }),
});
