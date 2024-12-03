/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import HalfCycleProgressBar from "./HalfCycleProgressBar";
import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  PushPin,
  Star,
} from "@mui/icons-material";
import Link from "next/link";

interface BetCardProps {
  image: string;
  description: string;
  onBetYes: () => void;
  onBetNo: () => void;
}

const BetCard: React.FC<BetCardProps> = ({
  image,
  description,
  onBetYes,
  onBetNo,
}) => {
  const [progress, setProgress] = useState(0);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    setProgress(50);
  }, []);

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  return (
    <div
      className="max-w-screen-md rounded-lg shadow-lg m-4 p-3"
      style={{
        backgroundColor: "rgb(44,62,79)",
      }}>
      <div className="flex justify-between mb-10 p-2">
        {/* Card Image */}
        <img
          src={image}
          alt="Bet Image"
          className="w-14 h-14 rounded-lg object-cover"
        />

        {/* Card Content */}
        <Link href="/" className="flex-grow px-2">
          <p className="text-xl font-semibold text-white hover:underline">
            {description}
          </p>
        </Link>

        {/* Progress Bar */}
        <div className="w-10 h-10 flex justify-center items-center">
          <HalfCycleProgressBar progress={progress} />
        </div>
      </div>

      {/* Card Actions with Yes/No Buttons */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 text-green-400 rounded-lg bg-[#417b5a] hover:bg-[rgba(36,174,96,1)] w-[48%] hover:text-white flex items-center justify-center space-x-1"
          onClick={onBetYes}>
          Yes
          <KeyboardDoubleArrowUp sx={{ fontSize: 22, marginTop: "-2px" }} />
        </button>
        <button
          className="px-4 py-2 rounded-lg w-[48%] text-red-500 bg-[#7e444e] hover:bg-[rgba(230,72,1,1)] hover:text-white flex items-center justify-center space-x-1"
          onClick={onBetNo}>
          <span>No</span>
          <KeyboardDoubleArrowDown sx={{ fontSize: 22, marginTop: "-2px" }} />
        </button>
      </div>

      {/* Card Sub-Info */}
      <div className="flex justify-between mt-2">
        {/* Volume Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 text-center rounded-md p-1 bg-[rgba(45,82,107)]">
            <PushPin sx={{ fontSize: 18, color: "#2C9CDB" }} />
          </div>
          <div>
            <p className="text-sm font-normal text-gray-400">$15m Vol</p>
          </div>
        </div>

        {/* Star Section */}
        <div className="flex items-center space-x-2">
          <div onClick={toggleStar}>
            <Star
              sx={{ fontSize: 22, color: isStarred ? "#F1C94B" : "#FFFFFF" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetCard;
