/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useBet } from "@/hooks/useBet";

const BetForm: React.FC = () => {
  const [marketId, setMarketId] = useState<string>("");
  const [betAmount, setBetAmount] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");

  const { isLoading, error, success, placeBetYes } = useBet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await placeBetYes(marketId, betAmount, userAddress);
    } catch (err) {
      console.error("Error placing bet:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || isNaN(Number(value))) {
      setBetAmount("");
      return;
    }

    try {
      setBetAmount(value);
    } catch (error) {
      console.error("Error parsing input to wei:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Place Bet on Market
        </h1>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* Market ID */}
          <div className="mb-4">
            <label
              htmlFor="marketId"
              className="block text-sm font-medium text-gray-700">
              Market ID
            </label>
            <input
              type="text"
              id="marketId"
              value={marketId}
              onChange={(e) => setMarketId(e.target.value)}
              className="mt-1 px-4 py-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Enter Market ID"
              required
            />
          </div>

          {/* Bet Amount */}
          <div className="mb-4">
            <label
              htmlFor="betAmount"
              className="block text-sm font-medium text-black">
              Bet Amount (ETH)
            </label>
            <input
              type="number"
              id="betAmount"
              value={betAmount || ""}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Enter Bet Amount"
              required
            />
          </div>

          {/* User Address */}
          <div className="mb-4">
            <label
              htmlFor="userAddress"
              className="block text-sm font-medium text-gray-700">
              Your Wallet Address
            </label>
            <input
              type="text"
              id="userAddress"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className="mt-1 px-4 py-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Enter Your Wallet Address"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400`}
            disabled={isLoading}>
            {isLoading ? "Placing Bet..." : "Place Bet"}
          </button>

          {/* Error and Success Messages */}
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default BetForm;
