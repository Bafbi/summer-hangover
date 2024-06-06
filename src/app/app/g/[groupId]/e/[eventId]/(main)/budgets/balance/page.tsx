import { api } from "~/trpc/server";

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
        <div className="sortie flex w-full flex-col items-center justify-between">
          <h2 className="text-xl font-bold">Transactions</h2>
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-surface-variant my-2 flex w-full items-center justify-between rounded-xl p-2"
            >
              <div>From: {transaction.from}</div>
              <div>To: {transaction.to}</div>
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
