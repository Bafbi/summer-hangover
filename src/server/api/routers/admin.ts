import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { count, sql } from 'drizzle-orm';
import { users, groups, events, messages, sessions, notifications } from "~/server/db/schema";

export const adminRouter = createTRPCRouter({

  // Pour savoir si l'utilisateur peut accéder à la page d'administrateur ou non
  isUserAnAdmin: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      columns: {
        isAdmin: true,
      },
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
    });
    if (user == undefined) return false;
    return user.isAdmin;
  }),

  // Récupère le nombre total d'utilisateurs dans la base de données
  getUsersCount: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select({ count: count() }).from(users);
    if (result && result.length > 0) {
      return { count: result[0]?.count ?? 0 };
    }
    return { count: 0 };
  }),
  
  // Récupère le nombre d'utilisateurs dit "actif" dans la base de données
  // C'est à dire ceux qui ont une session active qui date de moins de 7 jours :
  getActiveUsersCount: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({ count: count() })
      .from(sessions)
      // la date dans la db est en millisecondes, il faut donc comparer la date actuelle moins 7 jours en millisecondes
      .where(sql`expires > ${Date.now() - 7 * 24 * 60 * 60 }`);
    if (result && result.length > 0) {
      return { count: result[0]?.count ?? 0 };
    }
    return { count: 0 };
  }),

  // Récupère le nombre total de groupe
  getGroupsCount: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select({ count: count() }).from(groups);
    if (result && result.length > 0) {
      return { count: result[0]?.count ?? 0 };
    }
    return { count: 0 };
  }),

  // Récupère le nombre total d'événements
  getEventsCount: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select({ count: count() }).from(events);
    if (result && result.length > 0) {
      return { count: result[0]?.count ?? 0 };
    }
    return { count: 0 };
  }),

  // Récupère le nombre d'utilisateurs par mois
  getUsersByMonth: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        month: sql`strftime('%Y-%m', createdAt)`,
        count: count()
      })
      .from(users)
      .groupBy(sql`strftime('%Y-%m', createdAt)`)
      .orderBy(sql`strftime('%Y-%m', createdAt)`);

    return result.map(row => ({
      month: String(row.month),
      count: row.count,
    }));
  }),

  // Récupère le nombre d'utilisateurs actifs par mois
  getActiveUsersByMonth: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        month: sql`strftime('%Y-%m', createdAt)`,
        count: count()
      })
      .from(sessions)
      .where(sql`expires > ${Date.now() - 7 * 24 * 60 * 60 }`)
      .groupBy(sql`strftime('%Y-%m', createdAt)`)
      .orderBy(sql`strftime('%Y-%m', createdAt)`);

    return result.map(row => ({
      month: String(row.month),
      count: row.count,
    }));
  }),

  // Récupère le nombre de groupes par mois
  getGroupsByMonth: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        month: sql`strftime('%Y-%m', createdAt)`,
        count: count()
      })
      .from(groups)
      .groupBy(sql`strftime('%Y-%m', createdAt)`)
      .orderBy(sql`strftime('%Y-%m', createdAt)`);

    return result.map(row => ({
      month: String(row.month),
      count: row.count,
    }));
  }),

  // Récupère le nombre d'événements par mois
  getEventsByMonth: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        month: sql`strftime('%Y-%m', createdAt)`,
        count: count()
      })
      .from(events)
      .groupBy(sql`strftime('%Y-%m', createdAt)`)
      .orderBy(sql`strftime('%Y-%m', createdAt)`);

    return result.map(row => ({
      month: String(row.month),
      count: row.count,
    }));
  }),

  // Récupère le nombre de messages par mois
  getMessagesByMonth: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        month: sql`strftime('%Y-%m', createdAt)`,
        count: count()
      })
      .from(messages)
      .groupBy(sql`strftime('%Y-%m', createdAt)`)
      .orderBy(sql`strftime('%Y-%m', createdAt)`);
    
    return result.map(row => ({
      month: String(row.month),
      count: row.count,
    }));
  }),

  // Récupère le nombre de notifications par mois
  getNotificationsByMonth: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        month: sql`strftime('%Y-%m', createdAt)`,
        count: count()
      })
      .from(notifications)
      .groupBy(sql`strftime('%Y-%m', createdAt)`)
      .orderBy(sql`strftime('%Y-%m', createdAt)`);
    
    return result.map(row => ({
      month: String(row.month),
      count: row.count,
    }));
  }),
});
