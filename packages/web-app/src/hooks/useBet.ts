/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import tokenABI from "../abis/ERC20_ABI.json";

const TOKEN_CONTRACT_ADDRESS = "0x425eea9d65f20ce7FB56D810F8fD2697c717879a";
const CONTRACT_ADDRESS = "0x939ea90d6A6DA8012B05e337aF6988030016fD22";

// Set up the provider to connect to BSC Testnet
const provider = new ethers.JsonRpcProvider(
  "https://bsc-testnet.infura.io/v3/2b3b923ad44a4738ba5aa8e2bb5f7463"
);
const signer = new ethers.Wallet(
  "0361aff9a985da7779d8e7f00cd460ecb483d38f0abd44ad40ecc0bfb26268b3",
  provider
);

interface UseBet {
  isLoading: boolean;
  error: string;
  success: string;
  placeBetYes: (
    marketId: string,
    betAmount: string,
    userAddress: string
  ) => Promise<ethers.ContractTransaction | undefined>;
}

export const useBet = (): UseBet => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize token contract with signer (ensure signer is available)
  const tokenContract = signer
    ? new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenABI, signer)
    : null;

  // Initialize Ethereum provider and signer
  useEffect(() => {
    const initProvider = async () => {
      if (!window.ethereum) {
        setError(
          "Ethereum provider not found. Install MetaMask or another wallet."
        );
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (err) {
        console.error("Failed to initialize provider or signer:", err);
        setError(
          "Failed to connect to Ethereum wallet. Please check your wallet."
        );
      }
    };

    initProvider();
  }, []);

  // Check and request token approval
  const checkAndRequestApproval = useCallback(
    async (userAddress: string, betAmount: string): Promise<boolean> => {
      if (!tokenContract) {
        setError("Token contract is not initialized.");
        return false;
      }

      try {
        const betAmountInWei = ethers.parseUnits(betAmount, "ether");

        // Get current allowance
        const allowance = await tokenContract.allowance(
          userAddress,
          CONTRACT_ADDRESS
        );
        console.log("Allowance:", allowance.toString());
        const balance = await tokenContract.balanceOf(userAddress);
        console.log(
          `Balance of ${userAddress}:`,
          ethers.formatUnits(balance, "ether")
        );

        // Check if allowance is sufficient
        if (allowance >= betAmountInWei) {
          return true;
        }

        // Request token approval
        setError("Requesting token approval...");
        const tx = await tokenContract.approve(
          CONTRACT_ADDRESS,
          betAmountInWei
        );
        await tx.wait();

        // Verify updated allowance
        const updatedAllowance = await tokenContract.allowance(
          userAddress,
          CONTRACT_ADDRESS
        );
        return updatedAllowance >= betAmountInWei;
      } catch (err: any) {
        console.error("Error during approval process:", err);
        setError("Unable to complete token approval. Please try again.");
        return false;
      }
    },
    [tokenContract]
  );

  // Place a bet
  const placeBetYes = useCallback(
    async (marketId: string, betAmount: string, userAddress: string) => {
      if (!signer) {
        setError("Signer is not connected.");
        return;
      }

      try {
        setIsLoading(true);
        setError(""); // Reset any previous errors
        setSuccess(""); // Reset previous success messages

        // Check if token approval is sufficient
        const hasApproval = await checkAndRequestApproval(
          userAddress,
          betAmount
        );
        if (!hasApproval) {
          setError("Token approval failed or insufficient allowance.");
          return;
        }

        // Example placeholder for placing a bet; actual contract call would go here
        // const marketContract = new ethers.Contract(MARKET_CONTRACT_ADDRESS, marketABI, signer);
        // const tx = await marketContract.placeBetYes(marketId, betAmount);
        // await tx.wait();

        setSuccess("Bet placed successfully!");
      } catch (err: any) {
        console.error("Error placing bet:", err);
        setError("Failed to place bet: " + (err.message || "Unknown error"));
      } finally {
        setIsLoading(false);
      }
    },
    [signer, checkAndRequestApproval]
  );

  return {
    isLoading,
    error,
    success,
    placeBetYes,
  };
};
