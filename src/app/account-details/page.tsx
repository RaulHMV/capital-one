"use client";

import React from 'react';
import {
  DashboardHeader,
  BottomNavigationBar,
} from '@/components/dashboard';
import { Card } from '@/components/ui';
import { 
  HiOutlineInformationCircle,
  HiCreditCard,
  HiUser,
  HiPhone,
  HiMail,
  HiLocationMarker
} from 'react-icons/hi';

export default function AccountDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <DashboardHeader />

      <div className="lg:flex">
        <BottomNavigationBar />

        <main className="flex-1 pb-20 lg:pb-6">
          <div className="lg:p-6">
            {/* Page Title */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white px-6 py-8 rounded-b-3xl shadow-xl lg:rounded-2xl mb-6">
              <h1 className="text-3xl font-bold mb-2">Account Details</h1>
              <p className="text-blue-200 text-sm">View your account information</p>
            </div>

            <div className="px-4 lg:px-0 max-w-4xl space-y-6">
              {/* Account Information */}
              <Card padding="md" className="shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiCreditCard className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Account Number</p>
                      <p className="font-semibold text-gray-900">****1234</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiOutlineInformationCircle className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Account Type</p>
                      <p className="font-semibold text-gray-900">360 Checking</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiOutlineInformationCircle className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Routing Number</p>
                      <p className="font-semibold text-gray-900">031176110</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card padding="md" className="shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiUser className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">John Doe</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiMail className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">john.doe@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiPhone className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <HiLocationMarker className="h-6 w-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Address</p>
                      <p className="font-semibold text-gray-900">123 Main St, City, ST 12345</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
