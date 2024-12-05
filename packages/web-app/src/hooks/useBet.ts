/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import tokenABI from "../abis/ERC20_ABI.json";
import marketABI from "../abis/Polymarket_ABI.json";

const TOKEN_ADDRESS = "0x425eea9d65f20ce7FB56D810F8fD2697c717879a";
const MARKET_ADDRESS = "0x939ea90d6A6DA8012B05e337aF6988030016fD22";

const provider = new ethers.JsonRpcProvider(
  "https://bsc-testnet.infura.io/v3/2b3b923ad44a4738ba5aa8e2bb5f7463"
);
const walletSigner = new ethers.Wallet(
  "0361aff9a985da7779d8e7f00cd460ecb483d38f0abd44ad40ecc0bfb26268b3",
  provider
);

interface UseBetHook {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  placeYesBet: (
    marketId: string,
    betAmount: string,
    userAddress: string
  ) => Promise<ethers.ContractTransaction | undefined>;
}

export const useBet = (): UseBetHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const tokenContract = walletSigner
    ? new ethers.Contract(TOKEN_ADDRESS, tokenABI, walletSigner)
    : null;

  useEffect(() => {
    const initializeProvider = async () => {
      if (!window.ethereum) {
        setErrorMessage(
          "Ethereum provider not detected. Please install a wallet like MetaMask."
        );
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("Error initializing Ethereum provider:", error);
        setErrorMessage("Failed to connect to the Ethereum wallet.");
      }
    };

    initializeProvider();
  }, []);

  const validateAndRequestApproval = useCallback(
    async (userAddress: string, amountInWei: bigint): Promise<boolean> => {
      if (!tokenContract) {
        setErrorMessage("Token contract is not initialized.");
        return false;
      }

      try {
        const allowance = await tokenContract.allowance(
          userAddress,
          MARKET_ADDRESS
        );
        console.log(
          `Current allowance for ${userAddress}: ${allowance.toString()}`
        );

        const balance = await tokenContract.balanceOf(userAddress);
        console.log(
          `Token balance for ${userAddress}: ${ethers.formatUnits(
            balance,
            "ether"
          )}`
        );

        if (allowance >= amountInWei) {
          return true;
        }

        console.log("Requesting token approval...");
        const approvalTransaction = await tokenContract.approve(
          MARKET_ADDRESS,
          amountInWei
        );
        await approvalTransaction.wait();

        const updatedAllowance = await tokenContract.allowance(
          userAddress,
          MARKET_ADDRESS
        );
        return updatedAllowance >= amountInWei;
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
    [tokenContract]
  );

  const placeYesBet: any = useCallback(
    async (marketId: string, betAmount: string, userAddress: string) => {
      if (!walletSigner) {
        setErrorMessage("Signer is not configured properly.");
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const betAmountInWei = ethers.parseUnits(betAmount, "ether");

        const approvalGranted = await validateAndRequestApproval(
          userAddress,
          betAmountInWei
        );
        if (!approvalGranted) {
          setErrorMessage(
            "Token approval failed or insufficient allowance. Cannot proceed with the bet."
          );
          return;
        }

        const marketContract = new ethers.Contract(
          MARKET_ADDRESS,
          marketABI,
          walletSigner
        );

        console.log("Placing bet...");
        const transaction = await marketContract.addYesBet(
          marketId,
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
    [walletSigner, validateAndRequestApproval]
  );

  return {
    isLoading,
    errorMessage,
    successMessage,
    placeYesBet,
  };
};
