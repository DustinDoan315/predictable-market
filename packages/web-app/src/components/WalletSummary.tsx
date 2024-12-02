"use client";
import { useWallet } from "@/hooks/useWallet";

export default function WalletSummary() {
  const { walletAddress, connectWallet } = useWallet();
  const balance = "2.45 ETH";

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Wallet Summary</h2>
      <p className="text-sm text-gray-500">
        Address: {walletAddress ? walletAddress : "Not Connected"}
      </p>
      <p className="text-xl font-bold mt-4">{balance}</p>
      {!walletAddress && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
