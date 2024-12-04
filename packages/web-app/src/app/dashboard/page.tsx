"use client";

// import WalletSummary from "@/components/WalletSummary";
// import Transactions from "@/components/Transactions";
// import NetworkSwitcher from "@/components/NetworkSwitcher";
// import BetCard from "@/components/BetCard";
// import { mockBets } from "@/utils/mock";
import BetForm from "@/components/BetForm";

export default function DashboardPage() {
  // const handleBetYes = (id: number) => {
  //   console.log(`Bet Yes on item ${id}`);
  // };

  // const handleBetNo = (id: number) => {
  //   console.log(`Bet No on item ${id}`);
  // };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <BetForm />

      {/* {mockBets.map((bet) => (
        <div key={bet.id} className="col-span-1">
          <BetCard
            image={bet.image}
            description={bet.description}
            onBetYes={() => handleBetYes(bet.id)}
            onBetNo={() => handleBetNo(bet.id)}
          />
        </div>
      ))} */}
    </div>
  );
}

{
  /* <div className="col-span-1">
        <WalletSummary />
      </div>
      <div className="col-span-2">
        <NetworkSwitcher />
        <Transactions />
      </div> */
}
