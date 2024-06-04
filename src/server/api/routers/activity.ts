import { randomInt } from "crypto";
import { act } from "react";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { activities } from "~/server/db/schema";

export const activityRouter = createTRPCRouter({
  createActivity: protectedProcedure
    .input(z.object({ groupId: z.number(),name: z.string(),description: z.string().optional(),location: z.string(),eventId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(activities).values({
        id: randomInt(1,1000000),
        eventId: input.eventId, 
        groupId: input.groupId,
        createdBy: ctx.session.user.id,
        location: input.location,
        description: input.description,
        name: input.name,
        
      });
    }),
    
    getActivities: protectedProcedure.input(z.object({groupId: z.number(), eventId: z.number()})).query(({ ctx ,input}) => {
      
      return ctx.db.query.activities.findMany({
        where: (activities, { eq ,and}) => and(eq(activities.groupId,input.groupId ),eq(activities.eventId,input.eventId)),
        with: {createdBy: true},
      });
    }),
});