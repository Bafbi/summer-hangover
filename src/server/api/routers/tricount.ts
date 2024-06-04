import { z } from "zod";
import { randomInt } from "crypto";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";
  import { expenses } from "~/server/db/schema";

  export const tricountRouter = createTRPCRouter({
    createTricount: protectedProcedure
    .input(z.object({ groupId: z.number(),label: z.string(),eventId: z.number(), amount: z.number()}))
    .mutation(async ({ ctx, input }) => {
        console.log(input);
        
      await ctx.db.insert(expenses).values({
        eventId: input.eventId,
        groupId: input.groupId,
        userId: ctx.session.user.id,
        amount: input.amount,
        label: input.label, 
      });
    }),
    
    // get all expenses (label & amount) for a specific event

    getExpenses: protectedProcedure.input(z.object({groupId: z.number(), eventId: z.number()})).query(({ ctx ,input}) => {
        
        return ctx.db.query.expenses.findMany({
          where: (expenses, { eq ,and}) => and(eq(expenses.groupId,input.groupId ),eq(expenses.eventId,input.eventId)),
          with: {
            user: true,
          }
        });
      } ),
  });