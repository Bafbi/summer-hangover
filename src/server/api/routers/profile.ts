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
            id: z.string(),
            name: z.string().min(1).optional(),
            email: z.string().email(),
            image: z.string().url().optional(),
            description: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.update(users)
                .set({
                    name: input.name,
                    email: input.email,
                    image: input.image,
                    description: input.description,
                })
                .where(eq(users.id, ctx.session.user.id))
                .returning({ updatedId: users.id });
        }),
});
