"use client";

import React from 'react';
import { 
  HiHome, 
  HiCurrencyDollar, 
  HiSparkles,
  HiCreditCard,
  HiUserCircle 
} from 'react-icons/hi';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center text-xs p-1 w-full
      ${isActive ? 'text-blue-700' : 'text-gray-500 hover:text-blue-600'}
      
      lg:flex-row lg:justify-start lg:space-x-3 lg:p-3 lg:rounded-lg lg:text-sm
      ${isActive
        ? 'lg:bg-blue-100 lg:font-semibold'
        : 'lg:hover:bg-gray-100 lg:hover:text-gray-900'
      }
    `}
  >
    <Icon className="h-6 w-6 mb-1 lg:mb-0" />
    <span className="lg:block">{label}</span>
  </button>
);

export const BottomNavigationBar: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('Home');

  const navItems = [
    { icon: HiHome, label: 'Home' },
    { icon: HiCurrencyDollar, label: 'Pay/move' },
    { icon: HiSparkles, label: 'Chat' },
    { icon: HiCreditCard, label: 'Benefits' },
    { icon: HiUserCircle, label: 'Profile' },
  ];

  return (
    <nav className="
      fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50
      flex justify-around items-center h-16 max-w-lg mx-auto
      
      lg:relative lg:flex-col lg:justify-start lg:w-64 lg:h-auto lg:max-w-none
      lg:border-t-0 lg:border-r lg:shadow-none lg:p-4 lg:space-y-2 lg:min-h-screen
    ">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isActive={activeTab === item.label}
          onClick={() => {
            setActiveTab(item.label);
            console.log(`Navigate to ${item.label}`);
          }}
        />
      ))}
    </nav>
  );
};
