"use client";

import React from 'react';
import {
  DashboardHeader,
  BalanceSection,
  QuickActions,
  TransactionsSection,
  BottomNavigationBar,
} from '@/components/dashboard';

export default function DashboardPage() {
  // Sample data
  const upcomingTransactions: any[] = [];
  
  const recentTransactions = [
    { 
      date: 'Nov 3', 
      description: 'Amazon Purchase', 
      amount: '-$45.99',
      pending: false
    },
    { 
      date: 'Nov 2', 
      description: 'Starbucks', 
      amount: '-$8.50',
      pending: false
    },
    { 
      date: 'Nov 1', 
      description: 'Direct Deposit - Salary', 
      amount: '+$3,250.00',
      pending: false
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <DashboardHeader />

      {/* Main Layout */}
      <div className="lg:flex">
        {/* Sidebar Navigation (Desktop only) */}
        <BottomNavigationBar />

        {/* Dashboard Content */}
        <main className="flex-1 pb-20 lg:pb-6">
          <div className="lg:p-6">
            <div className="lg:grid lg:grid-cols-3 lg:gap-6">
              {/* Left Column - Balance & Transactions */}
              <div className="lg:col-span-2 space-y-6">
                <BalanceSection 
                  availableBalance={7251.86} 
                  currentBalance={7251.86} 
                />
                <TransactionsSection 
                  title="Upcoming transactions" 
                  transactions={upcomingTransactions} 
                />
                <TransactionsSection 
                  title="Recent transactions" 
                  transactions={recentTransactions} 
                />
              </div>

              {/* Right Column - Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
