"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DashboardHeader,
  BottomNavigationBar,
} from '@/components/dashboard';
import { Card, Button } from '@/components/ui';
import { 
  HiArrowRight, 
  HiSwitchHorizontal,
  HiCurrencyDollar,
  HiUserGroup,
  HiQrcode,
  HiChevronRight,
  HiOutlineInformationCircle
} from 'react-icons/hi';

function PayMoveContent() {
  const searchParams = useSearchParams();
  const actionParam = searchParams.get('action');
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  // Pre-select option based on URL parameter
  useEffect(() => {
    if (actionParam) {
      setSelectedOption(actionParam);
    }
  }, [actionParam]);

  const paymentOptions = [
    { 
      id: 'send', 
      icon: HiArrowRight, 
      label: 'Send Money', 
      description: 'Send to friends, family, or contacts',
    },
    { 
      id: 'transfer', 
      icon: HiSwitchHorizontal, 
      label: 'Transfer', 
      description: 'Move between your accounts',
    },
    { 
      id: 'deposit', 
      icon: HiCurrencyDollar, 
      label: 'Deposit', 
      description: 'Deposit money to your account',
    },
    { 
      id: 'pay-bill', 
      icon: HiCurrencyDollar, 
      label: 'Pay Bill', 
      description: 'Pay your bills on time',
    },
    { 
      id: 'zelle', 
      icon: HiUserGroup, 
      label: 'Zelle', 
      description: 'Fast payments with Zelle',
    },
  ];

  const quickActions = [
    { icon: HiQrcode, label: 'Scan QR' },
    { icon: HiUserGroup, label: 'Request' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment submitted:', { selectedOption, amount, recipient });
    // Add payment logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <DashboardHeader />

      {/* Main Layout */}
      <div className="lg:flex">
        {/* Sidebar Navigation */}
        <BottomNavigationBar />

        {/* Pay/Move Content */}
        <main className="flex-1 pb-20 lg:pb-6">
          <div className="lg:p-6">
            {/* Page Title Section */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white px-6 py-8 rounded-b-3xl shadow-xl lg:rounded-2xl mb-6">
              <h1 className="text-3xl font-bold mb-2">Pay & Move</h1>
              <p className="text-blue-200 text-sm">Send money, transfer funds, or pay bills</p>
            </div>

            <div className="lg:grid lg:grid-cols-3 lg:gap-6">
              {/* Left Column - Payment Options */}
              <div className="lg:col-span-2 space-y-6 px-4 lg:px-0">
                {/* Payment Options Grid */}
                <Card padding="md" className="shadow-md">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Action</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className={`
                          flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200
                          ${selectedOption === option.id
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                          }
                        `}
                      >
                        <div className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                          <option.icon className="h-6 w-6 text-gray-700" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                          <p className="text-xs text-gray-600">{option.description}</p>
                        </div>
                        <HiChevronRight className={`
                          h-5 w-5 mt-1 transition-colors
                          ${selectedOption === option.id ? 'text-blue-600' : 'text-gray-400'}
                        `} />
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Payment Form */}
                {selectedOption && (
                  <Card padding="md" className="shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Details</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Recipient Field */}
                      <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-gray-900 mb-2">
                          {selectedOption === 'transfer' ? 'To Account' : 'Recipient'}
                        </label>
                        <input
                          id="recipient"
                          type="text"
                          placeholder={
                            selectedOption === 'transfer' 
                              ? 'Select account' 
                              : 'Enter name, email, or phone'
                          }
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>

                      {/* Amount Field */}
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-900 mb-2">
                          Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium z-10">
                            $
                          </span>
                          <input
                            id="amount"
                            type="text"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8"
                          />
                        </div>
                      </div>

                      {/* Note Field */}
                      <div>
                        <label htmlFor="note" className="block text-sm font-medium text-gray-900 mb-2">
                          Note (optional)
                        </label>
                        <input
                          id="note"
                          type="text"
                          placeholder="What's this for?"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>

                      {/* Available Balance Info */}
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <HiOutlineInformationCircle className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-700">
                          Available Balance: <span className="font-semibold">$7,251.86</span>
                        </span>
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setSelectedOption(null);
                            setAmount('');
                            setRecipient('');
                          }}
                          fullWidth
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          fullWidth
                        >
                          Continue
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}
              </div>

              {/* Right Column - Quick Actions & Recent */}
              <div className="lg:col-span-1 px-4 lg:px-0 mt-6 lg:mt-0 space-y-6">
                {/* Quick Actions */}
                <Card padding="md" className="shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <action.icon className="h-5 w-5 text-gray-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{action.label}</span>
                        <HiChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Recent Recipients */}
                <Card padding="md" className="shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Recipients</h3>
                  
                  <div className="space-y-3">
                    {['John Doe', 'Jane Smith', 'Mom'].map((name, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{name}</span>
                        <HiChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Security Notice */}
                <Card padding="md" className="shadow-md bg-yellow-50 border border-yellow-200">
                  <div className="flex gap-3">
                    <HiOutlineInformationCircle className="h-5 w-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Stay Safe</h4>
                      <p className="text-xs text-gray-700">
                        Never share your account details or passwords. Capital One will never ask for this information.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PayMovePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PayMoveContent />
    </Suspense>
  );
}
