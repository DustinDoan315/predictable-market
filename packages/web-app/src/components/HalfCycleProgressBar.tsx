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

  return (
    <div className="flex justify-center items-center">
      <svg
        className="transform rotate-0"
        width="50"
        height="25"
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
          stroke="blue"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circunference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(180 60 60)"
        />
      </svg>
      <div className="absolute text-black text-sm mt-4">{progress}% </div>
    </div>
  );
};

export default HalfCycleProgressBar;
