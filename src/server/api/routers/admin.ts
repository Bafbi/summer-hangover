import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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


});
