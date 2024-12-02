/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import HalfCycleProgressBar from "./HalfCycleProgressBar";

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

  useEffect(() => {
    setProgress(50);
  }, []);

  return (
    <div className="max-w-xs rounded-lg shadow-lg bg-white m-4 p-2">
      <div className="flex justify-between bg-white mb-4 p-2">
        {/* Card Image */}
        <img
          src={image}
          alt="Bet Image"
          className="w-16 h-16 rounded-lg object-cover"
        />

        {/* Card Content */}
        <div className="flex-grow px-2">
          <p className="text-gray-600 text-normal">{description}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-8 h-8 flex justify-center items-center">
          <HalfCycleProgressBar progress={progress} />
        </div>
      </div>

      {/* Card Actions with Yes/No Buttons */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-32"
          onClick={onBetYes}>
          Yes
        </button>
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 w-32"
          onClick={onBetNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default BetCard;
