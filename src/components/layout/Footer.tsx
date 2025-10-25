"use client";

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Find a Location</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Credit Cards</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Checking & Savings</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Auto Loans</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">About Capital One</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-700">Privacy & Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © {currentYear} Capital One. All rights reserved. This is a demo project.
          </p>
        </div>
      </div>
    </footer>
  );
};
