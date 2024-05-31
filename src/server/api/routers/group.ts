import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { groups, groupsMembers, users } from "~/server/db/schema";
import { v4 as uuidv4 } from 'uuid';

export const groupRouter = createTRPCRouter({
  createGroup: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        members: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const inviteLink = `http://localhost:3000/invite/${uuidv4()}`;

      const id = await ctx.db
        .insert(groups)
        .values({
          userAdmin: ctx.session.user.id,
          createdBy: ctx.session.user.id,
          description: input.description,
          name: input.name,
          inviteLink: inviteLink,  // Ajouter inviteLink ici
        })
        .returning({ groupId: groups.id });

      if (id[0] == null) return;
      const { groupId } = id[0];

      const usersToInsert = input.members.map((user) => ({
        userId: user,
        groupId: groupId,
      }));
      usersToInsert.push({
        userId: ctx.session.user.id,
        groupId: groupId,
      });

      await ctx.db.insert(groupsMembers).values(usersToInsert);
    }),

  getGroups: protectedProcedure.query(async ({ ctx }) => {
    const groupsQuery = await ctx.db.query.users.findFirst({
      columns: {},
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
      with: {
        groups: {
          columns: {},
          with: {
            group: {
              with: {
                createdBy: {
                  columns: {
                    name: true,
                  },
                },
                members: {
                  columns: {},
                  with: {
                    user: {
                      columns: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (groupsQuery == undefined) return null;
    return groupsQuery.groups.map((group) => group.group);
  }),
});
