"use client";

// import WalletSummary from "@/components/WalletSummary";
// import Transactions from "@/components/Transactions";
// import NetworkSwitcher from "@/components/NetworkSwitcher";
import BetCard from "@/components/BetCard";

export default function DashboardPage() {
  const handleBetYes = () => {
    alert("You placed a Yes bet!");
  };

  const handleBetNo = () => {
    alert("You placed a No bet!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1">
        <BetCard
          image="/btc100k.webp"
          description="Will bitcoin hit 100k in 2024?"
          onBetYes={handleBetYes}
          onBetNo={handleBetNo}
        />
      </div>
      {/* <div className="col-span-1">
        <WalletSummary />
      </div>
      <div className="col-span-2">
        <NetworkSwitcher />
        <Transactions />
      </div> */}
    </div>
  );
}
