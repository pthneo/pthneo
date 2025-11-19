"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true
}: ProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <>
    <div className={cn("relative inline-flex items-center justify-center dark:hidden", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={"rgba(0, 0, 0, 0.1)"}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={"#8200db"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{value}%</span>
        </div>
      )}
    </div>
      <div className={cn("relative  items-center justify-center hidden dark:inline-flex", className)}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))" }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={"rgba(255, 255, 255, 0.1)"}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={"#8200db"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold">{value}%</span>
          </div>
        )}
      </div>
  </>  
);
}

