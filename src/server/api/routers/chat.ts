import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { messages, posts } from "~/server/db/schema";
import { pusher } from "~/server/pusher";

export const chatRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        groupId: z.number(),
        eventId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .insert(messages)
        .values({
          content: input.content,
          userId: ctx.session.user.id,
          groupId: input.groupId,
          eventId: input.eventId,
        })
        .returning({ messageId: messages.id });
      if (res[0] == null) return;
      const { messageId } = res[0];
      await pusher.trigger(`group-${input.groupId}`, "new-message", {
        messageId,
      });
    }),

  getMessage: protectedProcedure
    .input(z.object({ messageId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.messages.findFirst({
        where: (messages, { eq }) => eq(messages.id, input.messageId),
        with: {
          user: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),

  getGroupMessages: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.messages.findMany({
        where: (messages, { eq, and, isNull }) =>
          and(eq(messages.groupId, input.groupId), isNull(messages.eventId)),
        with: {
          user: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: (messages, { desc }) => [desc(messages.createdAt)],
      });
    }),
});
