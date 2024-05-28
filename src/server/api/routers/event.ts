import { group } from "console";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { events } from "~/server/db/schema";

export const eventRouter = createTRPCRouter({
  createActivity: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string().optional(),date: z.date(),location: z.string().optional(),groupId: z.number(), }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(events).values({
       id: randomInt(1,100000),
        createdBy: ctx.session.user.id,
        groupId: input.groupId,
        description: input.description,
        name: input.name,
        location: input.location,
        date: input.date,
      });
    }),
    getEvents: protectedProcedure.input(z.object({groupId: z.number()})).query(({ ctx ,input}) => {
      
      return ctx.db.query.events.findMany({
        where: (events, { eq }) => eq(events.groupId,input.groupId ),
      });
    }),
});