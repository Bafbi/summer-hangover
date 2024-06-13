import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { expenses } from "~/server/db/schema";

export const tricountRouter = createTRPCRouter({
  createTricount: protectedProcedure
    .input(
      z.object({
        groupId: z.number(),
        label: z.string(),
        eventId: z.number(),
        amount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      await ctx.db.insert(expenses).values({
        eventId: input.eventId,
        groupId: input.groupId,
        userId: ctx.session.user.id,
        amount: input.amount,
        label: input.label,
      });
    }),

  getExpenses: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.expenses.findMany({
        where: (expenses, { eq, and }) =>
          and(
            eq(expenses.groupId, input.groupId),
            eq(expenses.eventId, input.eventId),
          ),
        with: {
          user: true,
        },
      });
    }),

  // delete an expense

  deleteExpense: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(expenses)
        .where(
          and(
            eq(expenses.id, input.id),
            eq(expenses.userId, ctx.session.user.id),
          ),
        );
    }),

  // calculate balance between all users

  calculateBalance: protectedProcedure
    .input(z.object({ groupId: z.number(), eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const expenses = await ctx.db.query.expenses.findMany({
        where: (expenses, { eq, and }) =>
          and(
            eq(expenses.groupId, input.groupId),
            eq(expenses.eventId, input.eventId),
          ),
        with: {
          user: true,
        },
      });

      const totals: Record<string, number> = {};

      expenses.forEach((expense) => {
        if (!totals[expense.userId]) {
          totals[expense.userId] = 0;
        }
        totals[expense.userId] += expense.amount;
      });

      const totalAmount = Object.values(totals).reduce(
        (acc, amount) => acc + amount,
        0,
      );
      const avgAmount = totalAmount / Object.keys(totals).length;

      const balances = Object.entries(totals).map(([userId, total]) => ({
        userId: userId,
        balance: total - avgAmount,
        userName:
          expenses.find((expense) => expense.userId === userId)?.user.name ??
          "Unknown",
      }));

      const BalanceSauv = structuredClone(balances);

      const payees = balances
        .filter((b) => b.balance > 0)
        .sort((a, b) => b.balance - a.balance);
      const payers = balances
        .filter((b) => b.balance < 0)
        .sort((a, b) => a.balance - b.balance);

      const transactions = [];

      while (payees[0] && payers[0]) {
        const payee = payees[0];
        const payer = payers[0];

        const amount = Math.min(payee.balance, -payer.balance);

        transactions.push({
          from: payer.userName,
          to: payee.userName,
          amount: amount,
        });

        console.log(BalanceSauv);

        payee.balance -= amount;
        payer.balance += amount;

        console.log(BalanceSauv);

        if (payee.balance === 0) {
          payees.shift();
        }

        if (payer.balance === 0) {
          payers.shift();
        }
      }
      return { transactions, balance: BalanceSauv };
    }),
});
