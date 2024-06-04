export type  Expense= {
    id: number | null;
    label: string;
    amount: string | null;
    groupId: number | null;
    eventId: number | null;
    userId: string;
    createdAt: number | null;
  }
  
  
  export function ExpenseCard({
    expense,
    isFavorite,
  }: {
    expense: Expense;
    isFavorite: boolean;
  }
  
  ) {
    return (
      <>
        <div
          className={`bg-surface-variant flex aspect-card min-w-32 max-w-96 flex-col justify-between overflow-hidden  rounded-xl  outline-tertiary ${isFavorite ? "outline" : ""}`}
        >
          <div className="flex flex-col p-2">
            <span className="text-lg font-semibold">{expense.label}</span>
            <span className="text-sm font-medium text-outline">
              Lieux: {expense.amount}
            </span>
          </div>
          <div className="bg-secondary-container flex h-10 items-center justify-around gap-1 p-2">
            <span className="text-xs font-semibold">Hold to view details</span>
            <span className="material-icons">article</span>
          </div>
        </div>
      </>
    );
  }
  