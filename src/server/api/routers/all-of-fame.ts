import { and, eq, sql, gt } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { expenses, users } from "~/server/db/schema";

export const allOfFameRouter = createTRPCRouter({
  
    // top spend of a group

    topSpend: protectedProcedure.input(z.object({ groupId: z.number()})).query(async ({ ctx, input }) => {
        const topSpend = await ctx.db.query.expenses.findFirst({
            where: (expenses, { eq, and }) => eq(expenses.groupId, input.groupId),
            with: {
                user: true,
            },
            orderBy: (expenses, { desc }) => [desc(expenses.amount)],
        });
        if (!topSpend) {
            const noTopSpend = structuredClone(topSpend);
            return {price: 0 , username: 'nobody found'};

        }

        return {price: topSpend.amount, username: topSpend.user.name};
    }),

    //  user with the most particpiation in events in a group
});
