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
      <main className="bg-surface grid grid-cols-1 gap">
        <div>
          <div className="sortie flex justify-between items-center w-full">
          <Link href="../budgets" className="bg-primary-container flex-col max-w-40 my-4 flex-grow flex w-2/6 cursor-pointer items-center justify-center rounded-r-xl p-2" style={{ minHeight: '60px' }} passHref>
          <span className="material-icons">account_balance_wallet</span>
          <div>
              Expenses
          </div>
          </Link>
          <Link href="./budgets/balance" className="bg-primary-container flex-col max-w-40 my-4 flex-grow flex w-2/6 cursor-pointer items-center justify-center rounded-l-xl p-2 " style={{ minHeight: '60px' }} passHref>
            <span className="material-icons">price_change</span>
              <div>
                Balance
              </div>
          </Link>
          </div>
          <h2 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">Balances</h2>
          {transactions.balance.map((balance, index) => (
            <div
            key={index}
            className={`${
              balance.balance >= 0 
                ? 'bg-positif my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-between space-x-2 rounded-r-xl p-2 ' 
                : 'bg-negatif my-4 w-4/6 max-w-60 flex-initial cursor-pointer items-center justify-between space-x-2 rounded-l-xl p-2 flex flex-row-reverse ml-auto'
            }`}
            >
            <div>{balance.userName}</div>
              <div className="flex items-center">
                {balance.balance}
                <span className="material-icons mx-1">euro_symbol</span>
              </div>  
            </div>
          ))}
        </div>
        <div className="sortie flex flex-col w-full items-center justify-between">
          <h2 className="bg-surface-variant text-xl mt-2 font-bold sortie flex flex-col w-full items-center justify-between">Transactions</h2>
          {transactions.transactions.map((transaction, index) => (
            <div key={index} className="flex max-w justify-between items-center p-2 bg-surface-container my-2 rounded-xl">
              <div className="mx-8">
                From: {transaction.from}
              </div>
              <div className="mr-8">
                To: {transaction.to}
              </div>
              <div className="flex items-center">
                {transaction.amount}
                <span className="material-icons mx-1">euro_symbol</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
