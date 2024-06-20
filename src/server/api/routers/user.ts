import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const contactQuery = await ctx.db.query.users.findFirst({
      columns: {},
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
      with: {
        groups: {
          columns: {},
          with: {
            group: {
              columns: {},
              with: {
                members: {
                  columns: {
                    userId: true,
                  },
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
    if (contactQuery == undefined) return undefined;
    const seenUserIds = new Set<string>();
    const filteredGroups = contactQuery.groups.map((group) => ({
      members: group.group.members.filter((member) => {
        if (
          !seenUserIds.has(member.userId) &&
          member.userId != ctx.session.user.id
        ) {
          seenUserIds.add(member.userId);
          return true;
        }
        return false;
      }),
    }));

    return {
      groups: filteredGroups,
    };
  }),

  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await getUserByEmail(input.email);
      if (user != null) {
        throw new Error("User already exists");
      }
      return ctx.db.insert(users).values({
        id: crypto.randomUUID(),
        email: input.email,
        password: await bcrypt.hash(input.password, 10),
        name: input.name,
      });
    }),
});

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
  return user;
}
