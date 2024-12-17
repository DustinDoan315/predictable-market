/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useBet } from "@/hooks/useBet";
import SubmitButtonComponent from "./SubmitButtonComponent";

const InputField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 px-4 py-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const BetForm: React.FC = () => {
  const [marketId, setMarketId] = useState<string>("");
  const [betAmount, setBetAmount] = useState<string>("");
  const [betType, setBetType] = useState<boolean>(true);

  const { isLoading, errorMessage, successMessage, placeBet } = useBet();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to use this feature."
      );
    }
  };

  const handleSubmit = async () => {
    try {
      await connectWallet();
      await placeBet(marketId, betAmount, betType);
    } catch (err) {
      console.error("Error placing bet:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || isNaN(Number(value))) {
      setBetAmount("");
    } else {
      setBetAmount(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Place Bet on Market
        </h1>

        <form className="mt-4">
          <InputField
            id="marketId"
            label="Market ID"
            value={marketId}
            onChange={(e) => setMarketId(e.target.value)}
            placeholder="Enter Market ID"
            required
          />
          <InputField
            id="betAmount"
            label="Bet Amount (ETH)"
            value={betAmount || ""}
            onChange={handleChange}
            placeholder="Enter Bet Amount"
            required
            type="number"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bet Type
            </label>
            <div className="mt-1 flex items-center space-x-4">
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
