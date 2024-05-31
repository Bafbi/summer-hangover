import Link from "next/link";

export default async function BudgetPage() {

  return (
    <>
      <main className="bg-surface grid grid-cols-1 gap">
      <div className="sortie flex justify-between items-center w-full">
      <Link href="/other-content-2" className="bg-primary-container flex-col max-w-40 my-4 flex-grow flex w-2/6 cursor-pointer items-center justify-center rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
      <span className="material-icons">account_balance_wallet</span>
      <div>
          Dépenses
      </div>
      </Link>
      <Link href="/other-content-2" className="bg-primary-container flex-col max-w-40 my-4 flex-grow flex w-2/6 cursor-pointer items-center justify-center rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
        <span className="material-icons">price_change</span>
          <div>
            Equilibre
          </div>
      </Link>
      </div>
      <div className="sortie flex justify-between items-center w-full">
        <Link href="/other-content-1" className="bg-surface-variant max-w-60 my-4 flex-col flex w-full cursor-pointer justify-start  rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
          <div className="font-semibold">
            Fanta
          </div>
          <div className="">
            Par : Julien
          </div>
        </Link>
        <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          10<span className="material-icons mx-1">euro_symbol</span>
        </div>
      </div>
      <div className="sortie flex w-full items-center justify-between">
          <Link
            href="/other-content-2"
            className="bg-primary-container my-4 w-1/6 max-w-xs flex-initial cursor-pointer items-center justify-center space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105"
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
            href="./budgets/create"
            className="bg-primary-container my-4 flex w-full max-w-60 flex-grow cursor-pointer items-center justify-center space-x-2 space-x-reverse rounded-l-xl p-2 transition-transform hover:scale-105"
            style={{ minHeight: "60px" }}
            passHref
          >
            <div>Ajouter une dépense</div>
          </Link>
        </div>
      </main>
    </>
  );
}