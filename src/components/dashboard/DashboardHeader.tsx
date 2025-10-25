"use client";

import React from 'react';
import Image from 'next/image';

export const DashboardHeader: React.FC = () => {
  const logoUrl = "https://ecm.capitalone.com/CI_Common/assets/images/logos/capital-one-logo.svg";

  return (
    <div className="
      flex justify-between items-center p-4 bg-[#001F54] text-white text-sm
      lg:bg-white lg:text-gray-900 lg:border-b lg:border-gray-200 lg:px-8
    ">
      
      {/* Logo centrado en móvil */}
      <div className="flex-grow flex justify-center lg:flex-grow-0 lg:justify-start">
        <Image
          src={logoUrl}
          alt="Capital One"
          width={140}
          height={40}
          className="brightness-0 invert lg:brightness-100 lg:invert-0"
        />
      </div>

      {/* Enlaces y selector de idioma solo en desktop */}
      <div className="hidden lg:flex items-center space-x-6">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Support
        </button>
        <select className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>English</option>
          <option>Español</option>
        </select>
      </div>
    </div>
  );
};
