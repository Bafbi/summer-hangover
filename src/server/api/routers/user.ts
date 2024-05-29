import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { groups, groupsMembers, users } from "~/server/db/schema";

export const contactsRouter = createTRPCRouter({

    getContacts: protectedProcedure.query(async({ ctx }) => {
        const contactQuery =  await ctx.db.query.users.findFirst({

          columns: {},
          where: (users, { eq }) => eq(users.id, ctx.session.user.id),
          with: {
            groups: {
                columns: {},
              with: {
                group: 
                { columns: {},
                    with: {members: {columns:{userId: true}}}
                }
              },
            },
          },
        });
        if (contactQuery== undefined) return null;
        const seenUserIds = new Set<string>();
        const filteredGroups = contactQuery.groups.map(group => ({
          members: group.group.members.filter(member => {
            if (!seenUserIds.has(member.userId)) {
              seenUserIds.add(member.userId);
              return true;
            }
            return false;
          })
        }));
      
        return {
          groups: filteredGroups
        };
      }),

});
