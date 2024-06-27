import { api } from "~/trpc/server";
import React from "react";
import Link from "next/link";

export default async function Balance({
  params,
}: {
  params: { groupId: string; eventId: string; main: string };
}) {
  // const expenses = await api.tricount.getExpenses({
  //   groupId: +params.groupId,
  //   eventId: +params.eventId,
  // });

  const transactions = await api.tricount.calculateBalance({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  return (
    <>
      <main className="gap bg-surface grid grid-cols-1">
        <div>
          <div className="sortie flex w-full items-center justify-between">
            <Link
              href="../budgets"
              className="bg-primary-container my-4 flex w-2/6 max-w-40 flex-grow cursor-pointer flex-col items-center justify-center rounded-r-xl p-2"
              style={{ minHeight: "60px" }}
              passHref
            >
              <span className="material-icons">account_balance_wallet</span>
              <div>Expenses</div>
            </Link>
            <Link
              href="../budgets/balance"
              className="bg-primary-container my-4 flex w-2/6 max-w-40 flex-grow cursor-pointer flex-col items-center justify-center rounded-l-xl p-2 "
              style={{ minHeight: "60px" }}
              passHref
            >
              <span className="material-icons">price_change</span>
              <div>Balance</div>
            </Link>
          </div>
          <h2 className="sortie bg-surface-variant mt-2 flex w-full flex-col items-center justify-between text-xl font-bold">
            Balances
          </h2>
          {transactions.balance.map((balance, index) => (
            <div
              key={index}
              className={`${
                balance.balance >= 0
                  ? "my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-between space-x-2 rounded-r-xl bg-positif p-2 "
                  : "my-4 ml-auto flex w-4/6 max-w-60 flex-initial cursor-pointer flex-row-reverse items-center justify-between space-x-2 rounded-l-xl bg-negatif p-2"
              }`}
            >
              <div>{balance.userName}</div>
              <div className="flex items-center">
                {balance.balance.toFixed(2)}
                <span className="material-icons mx-1">euro_symbol</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sortie flex w-full flex-col items-center justify-between">
          <h2 className="sortie bg-surface-variant mt-2 flex w-full flex-col items-center justify-between text-xl font-bold">
            Transactions
          </h2>
          {transactions.transactions.map((transaction, index) => (
            <div
              key={index}
              className="max-w bg-surface-container my-2 flex items-center justify-between rounded-xl p-2"
            >
              <div className="mx-8">From: {transaction.from}</div>
              <div className="mr-8">To: {transaction.to}</div>
              <div className="flex items-center">
                {transaction.amount.toFixed(2)}
                <span className="material-icons mx-1">euro_symbol</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
