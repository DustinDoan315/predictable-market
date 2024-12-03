import React from "react";

interface HalfCycleProgressBarProps {
  progress: number;
}

const HalfCycleProgressBar: React.FC<HalfCycleProgressBarProps> = ({
  progress,
}) => {
  const radius = 50;
  const strokeWidth = 10;
  const circunference = Math.PI * radius;
  const offset = ((100 - progress) / 100) * circunference;

  // Calculate size based on screen size or container width
  const svgWidth = "100%"; // full width of the container
  const svgHeight = "auto"; // adjust height proportionally

  return (
    <div className="relative flex justify-center items-center w-full max-w-[120px]">
      <svg
        style={{ width: svgWidth, height: svgHeight }}
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgba(36,174,96,1)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circunference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(180 60 60)"
        />
      </svg>
      <div className="absolute flex flex-col items-center text-white font-bold mt-14 sm:mt-10">
        {/* Progress Percentage */}
        <div className="text-xs sm:text-sm md:text-xl">{progress}%</div>

        {/* Chance Label */}
        <div className="text-gray-400 text-xs sm:text-xs">chance</div>
      </div>
    </div>
  );
};

export default HalfCycleProgressBar;
