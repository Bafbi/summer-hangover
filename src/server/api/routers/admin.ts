import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { count, sql } from 'drizzle-orm';
import { users } from "~/server/db/schema";

export const adminRouter = createTRPCRouter({

  // Pour savoir si l'utilisateur peut accéder aux pages d'administrateur
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

  // Pour récupérer le nombre d'utilisateurs dans la base de données
  getUsersCount: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select({count: count()}).from(users);
  }),
  
  // Pour récupérer le nombre d'utilisateurs dit "actif" dans la base de données
  // C'est à dire ceux qui ont une session active vieille de moins de 7 jours :
  getActiveUsersCount: protectedProcedure.query(async ({ ctx }) => {
    // TODO : Fix that piece of shit
    return await ctx.db.select({count: count()}).from(users).where(sql`lastSeenAt > NOW() - INTERVAL '7 days'`);
  }),
});
