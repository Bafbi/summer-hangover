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
      <main className="bg-surface grid grid-cols-1 gap">
        <div>
          <h2 className="text-xl font-bold sortie flex flex-col w-full items-center justify-between">Balances</h2>
          {transactions.balance.map((balance, index) => (
            <div
            key={index}
            className={`${
              balance.balance >= 0 
                ? 'bg-positif my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-between space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105' 
                : 'bg-negatif my-4 w-4/6 max-w-60 flex-initial cursor-pointer items-center justify-between space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105 flex flex-row-reverse ml-auto'
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
