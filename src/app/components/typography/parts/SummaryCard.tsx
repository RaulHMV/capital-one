"use client";
import React from "react";
import { Card } from "flowbite-react";

interface SummaryCardProps {
  title?: string;
  amount: string;
  subtitle?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title = "Available Balance", amount, subtitle = "Current Balance" }) => {
  const [main, cents] = amount.split('.');
  return (
    <Card className="w-full h-full min-h-40 md:min-h-56 flex flex-col justify-between" role="region" aria-label="Account balance summary">
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wide">{title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold white leading-none">{main}.</h3>
          <span className="text-2xl white">{cents || "00"}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </Card>
  );
};

export default SummaryCard;
