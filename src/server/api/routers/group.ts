import { group } from "console";
import { randomInt } from "crypto";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { groups, groupsMembers, users } from "~/server/db/schema";

export const groupRouter = createTRPCRouter({
  createGroup: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
       const id = await ctx.db.insert(groups).values({
        userAdmin: ctx.session.user.id,
        createdBy: ctx.session.user.id,
        
        description: input.description,
        name: input.name,
      }).returning({groupId: groups.id })
      if (id[0] == null) return;
       await ctx.db.insert(groupsMembers).values({
        userId: ctx.session.user.id,

        groupId: id[0].groupId,
      })
    }),

  getGroups: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      columns: {},
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
      with: {
        groups: {
          with: {
            group: true,
          }
        },
      },
    });
  }),
});
