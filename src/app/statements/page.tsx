"use client";

import React from 'react';
import {
  DashboardHeader,
  BottomNavigationBar,
} from '@/components/dashboard';
import { Card } from '@/components/ui';
import { HiDocumentText, HiDownload, HiChevronRight } from 'react-icons/hi';

export default function StatementsPage() {
  const statements = [
    { month: 'October 2025', date: 'Oct 1 - Oct 31', size: '245 KB' },
    { month: 'September 2025', date: 'Sep 1 - Sep 30', size: '238 KB' },
    { month: 'August 2025', date: 'Aug 1 - Aug 31', size: '251 KB' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <DashboardHeader />

      <div className="lg:flex">
        <BottomNavigationBar />

        <main className="flex-1 pb-20 lg:pb-6">
          <div className="lg:p-6">
            {/* Page Title */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white px-6 py-8 rounded-b-3xl shadow-xl lg:rounded-2xl mb-6">
              <h1 className="text-3xl font-bold mb-2">Statements</h1>
              <p className="text-blue-200 text-sm">View and download your account statements</p>
            </div>

            <div className="px-4 lg:px-0 max-w-4xl">
              <Card padding="md" className="shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Statements</h2>
                
                <div className="space-y-3">
                  {statements.map((statement, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-4 w-full p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <HiDocumentText className="h-6 w-6 text-blue-700" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900">{statement.month}</h3>
                        <p className="text-sm text-gray-600">{statement.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">{statement.size}</span>
                        <HiDownload className="h-5 w-5 text-blue-600 mt-1 ml-auto" />
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
