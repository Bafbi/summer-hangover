import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import Pusher from "pusher";
import { eq } from "drizzle-orm";
import { notifications, users } from "~/server/db/schema";
import { db } from "~/server/db/index";

// Informations d'identification de Pusher
const pusher = new Pusher({
    appId: "1809412", // process.env.PUSHER_APP_ID
    key: "1732a4efe6a8b6f7c753", // process.env.PUSHER_KEY
    secret: "dba36f16e80011ac0136", //process.env.PUSHER_SECRET
    cluster: "eu", // process.env.PUSHER_CLUSTER
    useTLS: true, // process.env.PUSHER_TLS
});

// Routeur TRPC pour les notifications
// Les notifications sont envoyées à un utilisateur spécifique
// et stockées dans la base de données
export const notificationRouter = createTRPCRouter({

    sendNotification: protectedProcedure
      .input(z.object({
        message: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        console.log("Session:", ctx.session);
        const user = await db.select().from(users).where(eq(users.id, ctx.session.user.id));
  
        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }
  
        const userId = ctx.session.user.id;
  
        // Enregistre la notif dans la base de données :
        await db.insert(notifications).values({
            userId: userId,
            message: input.message,
            createdAt: new Date(),
        });
  
        // Déclenche l'événement 'new-notification' sur le canal 'private-user-{userId}'
        await pusher.trigger(`private-user-${userId}`, 'new-notification', {
          message: input.message,
        });
  
        return { message: 'Notification envoyée avec succès' };
      }),
  
    getNotifications: protectedProcedure.query(async ({ ctx }) => {
      return db.select().from(notifications).where(eq(notifications.userId, ctx.session.user.id));
    }),
  });