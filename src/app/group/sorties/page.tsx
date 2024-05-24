  import Link from "next/link";

  export default function Home() {
    return (
      <>
        <main className="bg-surface grid grid-cols-1 gap">


          <div className="sortie flex justify-between items-center w-full">
            <Link href="/other-content-1" className="bg-surface-variant max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
              <div>
                Barbecue chez la mère à polo
              </div>
            </Link>
            <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Date
            </div>
          </div>

          <div className="sortie flex justify-between items-center w-full">
            <Link href="/other-content-1" className="bg-surface-variant max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
              <div>
                Barbecue chez la mère à polo
              </div>
            </Link>
            <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Date
            </div>
          </div>

          <div className="sortie flex justify-between items-center w-full">
            <Link href="/other-content-1" className="bg-surface-variant max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
              <div>
                Barbecue chez la mère à polo
              </div>
            </Link>
            <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Date
            </div>
          </div>

          <div className="sortie flex justify-between items-center w-full">
            <Link href="/other-content-1" className="bg-surface-variant max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-start space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
              <div>
                Barbecue chez la mère à polo
              </div>
            </Link>
            <div className="bg-surface-variant my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Date
            </div>
          </div>

          <div className="sortie flex justify-between items-center w-full">
          <Link href="/other-content-2" className="bg-secondary-container my-4 flex-initial max-w-xs w-1/6 cursor-pointer items-center justify-center space-x-2 rounded-r-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-icons">add_circle</span>
          </Link>
          <Link href="/other-content-2" className="bg-secondary-container max-w-60 my-4 flex-grow flex w-full cursor-pointer items-center justify-center space-x-reverse space-x-2 rounded-l-xl p-2 transition-transform hover:scale-105" style={{ minHeight: '60px' }} passHref>
            <div>
              Proposer une soirée
            </div>
          </Link>
        </div>
        </main>
      </>
    );
  }
  
  
  
  