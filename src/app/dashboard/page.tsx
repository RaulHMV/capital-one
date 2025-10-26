"use client";

import React, { useEffect, useState } from 'react';
import {
  DashboardHeader,
  BalanceSection,
  QuickActions,
  TransactionsSection,
  BottomNavigationBar,
} from '@/components/dashboard';

interface Transaction {
  date: string;
  description: string;
  amount: string;
  pending: boolean;
}

export default function DashboardPage() {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [upcomingTransactions, setUpcomingTransactions] = useState<Transaction[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const customerId = process.env.NEXT_PUBLIC_DEMO_CUSTOMER_ID || 'cust_ana_perez_001';
        
        // Fetch account balances
        const accountsRes = await fetch(`/api/dashboard/accounts?customerId=${customerId}`);
        if (accountsRes.ok) {
          const accountsData = await accountsRes.json();
          setAvailableBalance(accountsData.availableBalance);
          setCurrentBalance(accountsData.currentBalance);
        }

        // Fetch recent purchases
        const purchasesRes = await fetch(`/api/dashboard/recent-purchases?customerId=${customerId}`);
        if (purchasesRes.ok) {
          const purchasesData = await purchasesRes.json();
          setRecentTransactions(purchasesData.transactions);
        }

        // Fetch upcoming bills
        const billsRes = await fetch(`/api/dashboard/upcoming-bills?customerId=${customerId}`);
        if (billsRes.ok) {
          const billsData = await billsRes.json();
          setUpcomingTransactions(billsData.transactions);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
                  availableBalance={availableBalance} 
                  currentBalance={currentBalance} 
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
