/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useBet } from "@/hooks/useBet";
import SubmitButtonComponent from "./SubmitButtonComponent";

const BetForm: React.FC = () => {
  const [marketId, setMarketId] = useState<string>("");
  const [betAmount, setBetAmount] = useState<string>("");
  const [betType, setBetType] = useState<boolean>(true);
  const [userAddress, setUserAddress] = useState<string>("");

  const { isLoading, errorMessage, successMessage, placeBet } = useBet();

  const handleSubmit = async () => {
    try {
      console.log("closePopup called");
      await placeBet(marketId, betAmount, userAddress, betType);
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

    setBetAmount(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Place Bet on Market
        </h1>

        <form className="mt-4">
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
              className="block text-sm font-medium text-gray-700">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bet Type
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {/* Yes Checkbox */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="betTypeYes"
                  name="betType"
                  value="Yes"
                  checked={betType === true}
                  onChange={() => setBetType(true)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-green-500 font-semibold">Yes</span>
              </label>

              {/* No Checkbox */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="betTypeNo"
                  name="betType"
                  value="No"
                  checked={betType === false}
                  onChange={() => setBetType(false)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-red-500 font-semibold">No</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <SubmitButtonComponent
            isLoading={isLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default BetForm;
