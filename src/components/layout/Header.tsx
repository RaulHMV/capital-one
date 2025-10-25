"use client";

import React from 'react';
import Image from 'next/image';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
              src="https://ecm.capitalone.com/CI_Common/assets/images/logos/capital-one-logo.svg"
              alt="Capital One"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <select className="text-sm border-0 bg-transparent focus:ring-0 text-gray-700">
              <option>English</option>
              <option>Español</option>
            </select>
          </nav>
        </div>
      </div>
    </header>
  );
};
