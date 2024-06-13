import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { notifications } from "~/server/db/schema";
import { pusher } from "~/server/pusher";

/*
    Different types of notifications à passer en paramètre
    Permet de choisir quel texte afficher selon le contexte
*/

export const notificationType = [
  "INVITED_TO_GROUP",
  "NEW_EVENT_TO_GROUP",
  "NEW_ACTIVITY_TO_EVENT",
  "NEW_MESSAGES_TO_GROUP",
  "NEW_MESSAGES_TO_EVENT",
  "LAST_ONE_TO_VOTE",
  "VOTE_REMINDER",
  "EXPENSES_REMINDER",
] as const;

export async function sendNotificationToUsersFunction(input: {
  message: string;
  userIds: string[];
  type: (typeof notificationType)[number];
  urlLink: string;
}) {
  if (input.userIds.length === 0) return;
  const notifIds = await db
    .insert(notifications)
    .values(
      input.userIds.map((userId) => ({
        userId: userId,
        message: input.message,
        createdAt: new Date(),
        isRead: false,
        notifType: input.type,
        urlLink: input.urlLink,
      })),
    )
    .returning({ id: notifications.id });

  // Déclenche l'événement 'new-notification' sur le canal 'private-user-{userId}' pour chaque user concerné
  if (notifIds) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    input.userIds.forEach(async (userId, index) => {
      await pusher.trigger(`notifications-${userId}`, "new-notification", {
        notifId: notifIds[index]?.id,
      });
    });
  }
}

export const notificationRouter = createTRPCRouter({
  // Envoie une notification à l'utilisateur connecté
  // Permet de notifier l'utilisateur de certaines actions simples
  sendNotificationToYourself: protectedProcedure
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

  // Envoie une notification à plusieurs utilisateurs
  sendNotificationToUsers: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        userIds: z.string().array(),
        type: z.enum(notificationType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const notifIds = await ctx.db
        .insert(notifications)
        .values(
          input.userIds.map((userId) => ({
            userId: userId,
            message: input.message,
            createdAt: new Date(),
            isRead: false,
            notifType: input.type,
          })),
        )
        .returning({ id: notifications.id });

      // Déclenche l'événement 'new-notification' sur le canal
      //'private-user-{userId}' pour chaque user concerné
      if (notifIds) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        input.userIds.forEach(async (userId, index) => {
          await pusher.trigger(`notifications-${userId}`, "new-notification", {
            notifId: notifIds[index]?.id,
          });
        });
      }
    }),

  // Récupère une seule notification en fonction de son id
  getNotification: protectedProcedure
    .input(z.object({ notifId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.notifications.findFirst({
        where: (notifications, { eq }) => eq(notifications.id, input.notifId),
      });
    }),

  // Récupère toutes les notifications d'un utilisateur
  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, ctx.session.user.id));
  }),

  // Récupère toutes les notifications non lues d'un utilisateur
  // Utile pour afficher le nombre de notifications non lues sur la page d'accueil
  getUnreadNotifications: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, ctx.session.user.id),
          eq(notifications.isRead, false),
        ),
      );
  }),

  // Met toute les notifications d'un utilisateur en tant que lues
  // pour enlever le badge de notification sur la page d'accueil
  setAllNotifAsReaded: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(`Maj notifications pour userId: ${input.userId}`);
      await ctx.db
        .update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.userId, ctx.session.user.id));
      console.log("Maj réussie");
    }),
});
