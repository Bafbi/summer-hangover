import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { eq } from 'drizzle-orm';

export const profileRouter = createTRPCRouter({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.query.users.findFirst({
            where: eq(users.id, ctx.session.user.id),
        });
    }),

    updateProfile: protectedProcedure
        .input(z.object({
            name: z.string().min(1).optional(),
            image: z.string().url().optional(),
            description: z.string().optional(),
            firstName: z.string().optional(),
            lastName: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.update(users)
                .set({
                    name: input.name,
                    image: input.image,
                    description: input.description,
                    firstName: input.firstName,
                    lastName: input.lastName,
                })
                .where(eq(users.id, ctx.session.user.id))
                .returning({ updatedId: users.name });
        }),
});
