"use client";

import React from 'react';
import { Card } from '@/components/ui';
import { 
  HiArrowRight, 
  HiCurrencyDollar, 
  HiDocumentText, 
  HiOutlineUser,
  HiChevronRight
} from 'react-icons/hi';

interface Action {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

export const QuickActions: React.FC = () => {
  const actions: Action[] = [
    { icon: HiArrowRight, label: 'Transfer', onClick: () => console.log('Transfer') },
    { icon: HiCurrencyDollar, label: 'Deposit', onClick: () => console.log('Deposit') },
    { icon: HiDocumentText, label: 'View Statement', onClick: () => console.log('View Statement') },
    { icon: HiOutlineUser, label: 'Account Details', onClick: () => console.log('Account Details') },
  ];

  return (
    <Card className="mx-4 -mt-8 relative z-10 shadow-xl lg:mx-0 lg:mt-0" padding="md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">I Want to...</h3>
      
      {/* Action Grid */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <div className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <action.icon className="h-6 w-6 text-gray-700" />
            </div>
            <span className="text-xs text-gray-700 text-center font-medium leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-2 border-t border-gray-100">
        <button className="text-blue-700 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 hover:underline transition-colors">
          View All
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};
