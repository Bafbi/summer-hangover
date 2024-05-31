import { z } from "zod";
import { randomInt } from "crypto";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";
  import { tricounts } from "~/server/db/schema";

  export const tricountRouter = createTRPCRouter({
    createTricount: protectedProcedure
    .input(z.object({ groupId: z.number(),label: z.string(),eventId: z.number(), price: z.number()}))
    .mutation(async ({ ctx, input }) => {
        console.log(input);
        
      await ctx.db.insert(tricounts).values({
        id: randomInt(1,1000000),
        eventId: input.eventId,
        groupId: input.groupId,
        userId: ctx.session.user.id,
        price: input.price,
        label: input.label, 
      });
    }),
    
    getTricount: protectedProcedure.input(z.object({groupId: z.number(), eventId: z.number()})).query(({ ctx ,input}) => {
      
      return ctx.db.query.tricounts.findMany({
        where: (tricounts, { eq, and}) => and(eq(tricounts.groupId,input.groupId ),eq(tricounts.eventId,input.eventId)),
      });
    }),
  });