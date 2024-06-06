import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { notificationType, notifications } from "~/server/db/schema";
import { pusher } from "~/server/pusher";

export const notificationRouter = createTRPCRouter({
  sendNotification: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        type: z.enum(notificationType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = await ctx.db
        .insert(notifications)
        .values({
          userId: ctx.session.user.id,
          message: input.message,
          createdAt: new Date(),
          isRead: false,
          notifType: input.type,
        })
        .returning({ id: notifications.id });

      if (id[0] == null) return;
      const notifId = id[0].id;

      // Déclenche l'événement 'new-notification' sur le canal 'private-user-{userId}'
      await pusher.trigger(
        `notifications-${ctx.session.user.id}`,
        "new-notification",
        {
          notifId,
        },
      );
    }),

  getNotification: protectedProcedure
    .input(z.object({ notifId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.notifications.findFirst({
        where: (notifications, { eq }) => eq(notifications.id, input.notifId),
      });
    }),

  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, ctx.session.user.id));
  }),
});
