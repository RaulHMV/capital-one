"use client";

import React, { useEffect, useState } from 'react';
import {
  DashboardHeader,
  BalanceSection,
  QuickActions,
  TransactionsSection,
  BottomNavigationBar,
} from '@/components/dashboard';
import { SegundaOportunidadModal } from '@/components/dashboard/SegundaOportunidadModal';
import { SegundaOportunidadDashboard } from '@/components/dashboard/SegundaOportunidadDashboard';

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
  const [customerId, setCustomerId] = useState<string>('');

  // Estados para Segunda Oportunidad
  const [hasAcceptedSegundaOportunidad, setHasAcceptedSegundaOportunidad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Función para cargar datos del dashboard
  async function fetchDashboardData() {
    try {
      const customerIdToUse = process.env.NEXT_PUBLIC_DEMO_CUSTOMER_ID || 'cust_ana_perez_001';
      setCustomerId(customerIdToUse);
      
      // Fetch account balances
      const accountsRes = await fetch(`/api/dashboard/accounts?customerId=${customerIdToUse}`);
      if (accountsRes.ok) {
        const accountsData = await accountsRes.json();
        setAvailableBalance(accountsData.availableBalance);
        setCurrentBalance(accountsData.currentBalance);
      }

      // Fetch recent purchases
      const purchasesRes = await fetch(`/api/dashboard/recent-purchases?customerId=${customerIdToUse}`);
      if (purchasesRes.ok) {
        const purchasesData = await purchasesRes.json();
        setRecentTransactions(purchasesData.transactions);
      }

      // Fetch upcoming bills
      const billsRes = await fetch(`/api/dashboard/upcoming-bills?customerId=${customerIdToUse}`);
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

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Manejar cuando se selecciona "SChance" (Segunda Oportunidad)
  const handleSegundaOportunidadClick = () => {
    if (!hasAcceptedSegundaOportunidad) {
      setShowModal(true);
    } else {
      setActiveTab('SChance');
    }
  };

  // Manejar aceptación del modal
  const handleAccept = () => {
    setHasAcceptedSegundaOportunidad(true);
    setShowModal(false);
    setActiveTab('SChance');
  };

  // Manejar rechazo del modal
  const handleReject = () => {
    setShowModal(false);
    setActiveTab('Home'); // Regresa a Home
  };

  // Callback cuando se completa una encuesta - refresca los datos
  const handleBalanceUpdate = async () => {
    console.log('🔄 Actualizando balance después de completar encuesta...');
    setLoading(true);
    
    // Esperar un momento para que la base de datos se actualice
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Recargar todos los datos del dashboard
    await fetchDashboardData();
    
    console.log('✅ Dashboard actualizado');
  };

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
        <BottomNavigationBar 
  hasNegativeBalance={availableBalance < 0}
  activeTab={activeTab}
  onTabChange={(tab) => {
    if (tab === 'SChance') {
      handleSegundaOportunidadClick();
      return true; // 👈 Devuelve algo distinto de undefined
    } else {
      return undefined; // deja que navegue normalmente
    }
  }}
/>

        {/* Dashboard Content */}
        <main className="flex-1 pb-20 lg:pb-6">
          {activeTab === 'SChance' && hasAcceptedSegundaOportunidad ? (
            // Mostrar Dashboard de Segunda Oportunidad
            <SegundaOportunidadDashboard 
              userName="Juan Pérez" 
              currentBalance={currentBalance}
              customerId={customerId}
              onBalanceUpdate={handleBalanceUpdate}
            />
          ) : (
            // Mostrar Dashboard Normal
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
          )}
        </main>
      </div>

      {/* Modal de Segunda Oportunidad */}
      <SegundaOportunidadModal
        isOpen={showModal}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}