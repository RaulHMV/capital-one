"use client";

import React from 'react';
import { Card } from '@/components/ui';
import { HiChevronRight } from 'react-icons/hi';

interface Transaction {
  date: string;
  description: string;
  amount: string;
  pending?: boolean;
}

interface TransactionsSectionProps {
  title: string;
  transactions: Transaction[];
}

export const TransactionsSection: React.FC<TransactionsSectionProps> = ({ 
  title, 
  transactions 
}) => {
  return (
    <Card className="mx-4 mt-4 shadow-lg lg:mx-0 lg:mt-0" padding="md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="text-blue-700 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 hover:underline transition-colors">
          View all
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Transactions List or Empty State */}
      {transactions.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500 text-sm">
            You don&apos;t have any {title.toLowerCase()}.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {transaction.date}
                  {transaction.pending && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </p>
              </div>
              {transaction.amount && (
                <p className="text-sm font-semibold text-gray-900 ml-4">
                  {transaction.amount}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
