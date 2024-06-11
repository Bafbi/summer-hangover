import { randomInt } from "crypto";
import { count, is,eq, desc } from "drizzle-orm";
import { get } from "http";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { activities, votesActivities } from "~/server/db/schema";

export const activityRouter = createTRPCRouter({
  createActivity: protectedProcedure
    .input(
      z.object({
        groupId: z.number(),
        name: z.string(),
        description: z.string().optional(),
        location: z.string(),
        eventId: z.number(),
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
      const activities = await ctx.db.query.activities.findMany({
        where: (activities, { eq, and }) =>
          and(
            eq(activities.groupId, input.groupId),
            eq(activities.eventId, input.eventId),
          ),
        with: { createdBy: true },
      });
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
      return { activities, vote };
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


    isFavorite: protectedProcedure
      .input(
        z.object({
          groupId: z.number(),
          eventId: z.number(),
          activityId: z.number(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const fav = await ctx.db
          .select({ activity: activities, count: count(votesActivities.userId) })
          .from(activities)
          .innerJoin(votesActivities, eq(activities.id, votesActivities.activityId))
          .groupBy(activities.id)
          .orderBy(desc(count(votesActivities.userId)))
          .limit(1);
        console.log(fav[0]);
        return fav[0]?.activity.id=== input.activityId;
       
      }),

  })
