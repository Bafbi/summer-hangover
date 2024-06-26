import Link from "next/link";
import { api } from "~/trpc/server";
import React from "react";

export default async function BudgetPage({
  params,
}: {
  params: { groupId: string; eventId: string; main: string };
}) {
  const expenses = await api.tricount.getExpenses({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  return (
    <>
      <main className="gap bg-surface grid grid-cols-1">
        <div className="sortie flex w-full items-center justify-between">
          <div
            className="bg-primary-container my-4 flex w-2/6 max-w-40 flex-grow cursor-pointer flex-col items-center justify-center rounded-r-xl p-2"
            style={{ minHeight: "60px" }}
          >
            <span className="material-icons">account_balance_wallet</span>
            <div>Expenses</div>
          </div>
          <Link
            href="./budgets/balance"
            className="bg-primary-container my-4 flex w-2/6 max-w-40 flex-grow cursor-pointer flex-col items-center justify-center rounded-l-xl p-2 "
            style={{ minHeight: "60px" }}
            passHref
          >
            <span className="material-icons">price_change</span>
            <div>Balance</div>
          </Link>
        </div>
        {expenses.map((expense) => (
          <div
            className="sortie flex w-full items-center justify-between"
            key={expense.id}
          >
            <div className="bg-surface-variant my-4 flex w-full max-w-60 cursor-pointer flex-col justify-start rounded-r-xl p-2 ">
              <div className="font-semibold">{expense.label}</div>
              <div>By : {expense.user.name}</div>
            </div>
            <div
              className="bg-surface-variant my-4 w-1/6 max-w-xs flex-initial cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2"
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {expense.amount}
              <span className="material-icons mx-1">euro_symbol</span>
            </div>
          </div>
        ))}
        <div className="sortie flex w-full items-center justify-between">
          <Link
            href="budgets/create"
            className="bg-primary-container my-4 w-1/6 max-w-xs flex-initial cursor-pointer items-center justify-center space-x-2 rounded-r-xl p-2"
            style={{
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="material-icons">add_circle</span>
          </Link>
          <Link
            href="budgets/create"
            className="bg-primary-container my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-center space-x-2 space-x-reverse rounded-l-xl p-2"
            style={{ minHeight: "60px" }}
            passHref
          >
            <div>Add expense</div>
          </Link>
        </div>
      </main>
    </>
  );
}
