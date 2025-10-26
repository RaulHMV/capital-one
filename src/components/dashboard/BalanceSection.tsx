"use client";

import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';

interface BalanceSectionProps {
  availableBalance: number;
  currentBalance: number;
}

export const BalanceSection: React.FC<BalanceSectionProps> = ({ 
  availableBalance, 
  currentBalance 
}) => {
  const formatCurrency = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const [dollars, cents] = formatted.split('.');
    return { dollars, cents };
  };

  const available = formatCurrency(availableBalance);
  const current = formatCurrency(currentBalance);
  const isNegative = currentBalance < 0;

  return (
    <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white px-6 py-8 pb-12 text-center rounded-b-3xl shadow-xl">
      {/* Available Balance */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="text-4xl font-semibold tracking-tight">
            <span className="text-2xl align-top">$</span>
            {available.dollars}
            <span className="text-2xl align-top">.{available.cents}</span>
          </h3>
          <HiOutlineInformationCircle className="h-5 w-5 text-blue-200 cursor-pointer hover:text-white transition-colors" />
        </div>
        <p className="text-sm text-blue-200 uppercase tracking-wider font-medium">
          Available Balance
        </p>
      </div>

      {/* Current Balance Badge */}
      <div className="flex items-center justify-center gap-3">
        <h4 className="text-2xl font-semibold">
          <span className="text-lg align-top">{isNegative ? '-$' : '$'}</span>
          {current.dollars}
          <span className="text-lg align-top">.{current.cents}</span>
        </h4>
        <span className={`
          px-3 py-1 border rounded-full text-xs font-medium
          ${isNegative 
            ? 'bg-red-600 bg-opacity-50 border-red-400 text-red-100' 
            : 'bg-blue-600 bg-opacity-50 border-blue-400 text-blue-100'
          }
        `}>
          Current Balance
        </span>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        <span className="h-2 w-2 bg-white rounded-full"></span>
        <span className="h-2 w-2 bg-white bg-opacity-30 rounded-full"></span>
        <span className="h-2 w-2 bg-white bg-opacity-30 rounded-full"></span>
      </div>
    </div>
  );
};