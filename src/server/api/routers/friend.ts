import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { friends, posts } from "~/server/db/schema";

export const friendRouter = createTRPCRouter({
  sendFriendRequest: protectedProcedure
    .input(z.object({ friendId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(friends).values({
        userId: ctx.session.user.id,
        friendId: input.friendId,
      });
    }),

  getFriends: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.friends.findMany({
      where: (friends, { eq }) => eq(friends.userId, ctx.session.user.id),
    });
  }),
});
