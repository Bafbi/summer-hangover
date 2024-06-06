import Link from "next/link";
import { api } from "~/trpc/server";
import {Expense, ExpenseCard} from "../../_components/expense-card";
import { ConsoleLogWriter } from "drizzle-orm";

export default async function Balance({
  params
}: {
  params: { groupId: string; eventId: string; main: string };
}) {
  const expenses = await api.tricount.getExpenses({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  const transactions = await api.tricount.calculateBalance({
    groupId: +params.groupId,
    eventId: +params.eventId,
  });

  return (
    <>
      <main className="bg-surface grid grid-cols-1 gap">
        <div className="sortie flex flex-col w-full items-center justify-between">
          <h2 className="text-xl font-bold">Balances</h2>
          {transactions.balance.map((balance, index) => (
            <div
              key={index}
              className={`flex w-full justify-between items-center p-2 my-2 rounded-xl ${balance.balance >= 0 ? 'bg-surface-variant' : 'bg-primary-container'}`}>
              <div>{balance.userName}</div>
              <div className="flex items-center">
                {balance.balance}
                <span className="material-icons mx-1">euro_symbol</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sortie flex flex-col w-full items-center justify-between">
          <h2 className="text-xl font-bold">Transactions</h2>
          {transactions.transactions.map((transaction, index) => (
            <div key={index} className="flex w-full justify-between items-center p-2 bg-surface-variant my-2 rounded-xl">
              <div>
                From: {transaction.from}
              </div>
              <div>
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
