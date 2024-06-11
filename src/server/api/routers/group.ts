import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { groups, groupsMembers, notificationType } from "~/server/db/schema";
import { sendNotificationToUsersFunction } from "./notifications";
import { desc } from "drizzle-orm";
import { get } from "http";

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
      const inviteId = uuidv4(); // Generate only the UUID part

      const id = await ctx.db
        .insert(groups)
        .values({
          userAdmin: ctx.session.user.id,
          createdBy: ctx.session.user.id,
          description: input.description,
          name: input.name,
          inviteLink: inviteId, // Store only the UUID
        })
        .returning({ groupId: groups.id });


      if (id[0] == null) return;
      const { groupId } = id[0];

      await ctx.db.insert(groupsMembers).values({
        userId: ctx.session.user.id,
        groupId: groupId,
      });

      console.log("INVITE LINK : " + inviteId);
      const message = `Vous avez été invité à rejoindre le groupe ${input.name} ! Cliquez ici pour le rejoindre.`;
      const urlLink = "invite/" + inviteId;
      await sendNotificationToUsersFunction({ message, userIds: input.members, type: "INVITED_TO_GROUP", urlLink });
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

  getGroupById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups.findFirst({
        where: (groups, { eq }) => eq(groups.id, input.id),
        with: {
          createdBy: {
            columns: { name: true },
          },
          members: {
            columns: { userId: true },
            with: {
              user: {
                columns: { name: true },
              },
            },
          },
        },
      });
      return group;
    }),

    getGroupByInviteLink: protectedProcedure
      .input(z.object({ inviteLink: z.string() }))
      .query(async ({ ctx, input }) => {
        const group = await ctx.db.query.groups.findFirst({
          where: (groups, { eq }) => eq(groups.inviteLink, input.inviteLink),
          with: {
            createdBy: {
              columns: { name: true },
            },
            members: {
              columns: {},
              with: {
                user: {
                  columns: { name: true },
                },
              },
            },
          },
        });
        return group;
      }),

    // Pour inviter des utilisateurs à un groupe
    // Exemple d'utilisation : api.group.inviteUsersToGroup.mutate({ groupId: 1, userIds: ["1", "2", "3"] });
    // se déclenche lorsqu'ils acceptent l'invitation
    inviteUsersToGroup: protectedProcedure
      .input(
        z.object({
          groupId: z.number(),
          userIds: z.string().array(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const usersToInsert = input.userIds.map((user) => ({
          userId: user,
          groupId: input.groupId,
        }));
        await ctx.db.insert(groupsMembers).values(usersToInsert);
      }),
});
