"use client";

import { networks } from "@/config/networks";

export default function NetworkSwitcher() {
  const switchNetwork = (network: string) => {
    console.log(`Switching to ${network}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-4">Network Switcher</h2>
      <div className="flex space-x-4">
        {Object.keys(networks).map((network) => (
          <button
            key={network}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => switchNetwork(network)}>
            {network}
          </button>
        ))}
      </div>
    </div>
  );
}
