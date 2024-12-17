/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { ethers } from "ethers";
import tokenABI from "../abis/ERC20_ABI.json";
import marketABI from "../abis/BetMarket_ABI.json";

const TOKEN_ADDRESS = "0x425eea9d65f20ce7FB56D810F8fD2697c717879a";
const MARKET_ADDRESS = "0x1cabb976574b79e8E54e0c431fD8D882604CC480";

interface UseBetHook {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  placeBet: (
    marketId: string,
    betAmount: string,
    betType: boolean
  ) => Promise<ethers.ContractTransaction | undefined>;
}

export const useBet = (): UseBetHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const initializeProvider = useCallback(async () => {
    if (!window.ethereum) {
      setErrorMessage(
        "Ethereum provider not detected. Please install a wallet like MetaMask."
      );
      return null;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      return provider;
    } catch (error) {
      console.error("Error initializing Ethereum provider:", error);
      setErrorMessage("Failed to connect to the Ethereum wallet.");
      return null;
    }
  }, []);

  const validateAndRequestApproval = useCallback(
    async (
      provider: ethers.BrowserProvider,
      betAmount: string
    ): Promise<boolean> => {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        tokenABI,
        signer
      );
      const userAddress = await signer.getAddress();

      try {
        const betAmountInWei = ethers.parseUnits(betAmount, "ether");
        const allowance: bigint = await tokenContract.allowance(
          userAddress,
          MARKET_ADDRESS
        );
        const balance = await tokenContract.balanceOf(userAddress);

        console.log(
          `Current allowance for ${userAddress}: ${ethers.formatUnits(
            allowance
          )}`
        );
        console.log(
          `Token balance for ${userAddress}: ${ethers.formatUnits(
            balance,
            "ether"
          )}`
        );

        if (allowance >= betAmountInWei) {
          return true;
        }

        console.log("Requesting token approval...");
        const approvalTransaction = await tokenContract.approve(
          MARKET_ADDRESS,
          betAmountInWei
        );
        await approvalTransaction.wait();

        const updatedAllowance: bigint = await tokenContract.allowance(
          userAddress,
          MARKET_ADDRESS
        );
        return updatedAllowance >= betAmountInWei;
      } catch (error: any) {
        console.error("Approval process error:", error);
        setErrorMessage(
          `Failed to complete token approval. Reason: ${
            error.message || "Unknown error"
          }`
        );
        return false;
      }
    },
    []
  );

  const placeBet: any = useCallback(
    async (marketId: string, betAmount: string, betType: boolean) => {
      const provider = await initializeProvider();
      if (!provider) return;

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        marketABI,
        signer
      );

      try {
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const approvalGranted = await validateAndRequestApproval(
          provider,
          betAmount
        );
        if (!approvalGranted) {
          setErrorMessage(
            "Token approval failed or insufficient allowance. Cannot proceed with the bet."
          );
          return;
        }

        console.log("Placing bet...");
        const betAmountInWei = ethers.parseUnits(betAmount, "ether");
        console.log("---userAddress---", userAddress);

        const transaction = await marketContract.placeBet(
          marketId,
          betType,
          betAmountInWei,
          {
            from: userAddress,
          }
        );
        await transaction.wait();

        console.log("Bet placed successfully.");
        setSuccessMessage("Bet placed successfully!");
      } catch (error: any) {
        console.error("Error while placing bet:", error);
        setErrorMessage(
          `Failed to place bet. Reason: ${error.message || "Unknown error"}`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [initializeProvider, validateAndRequestApproval]
  );

  return {
    isLoading,
    errorMessage,
    successMessage,
    placeBet,
  };
};
