"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HiHome, 
  HiCurrencyDollar, 
  HiSparkles,
  HiCreditCard,
  HiUserCircle 
} from 'react-icons/hi';

interface NavItemProps {
  icon?: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  customIcon?: React.ReactNode | ((isActive: boolean) => React.ReactNode);
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick, customIcon }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center text-xs p-1 w-full
      transition-colors
      ${isActive 
        ? 'text-blue-700 font-semibold' 
        : 'text-gray-500 hover:text-blue-600'
      }
      
      lg:flex-row lg:justify-start lg:space-x-3 lg:p-3 lg:rounded-lg lg:text-sm
      ${isActive
        ? 'lg:bg-blue-100'
        : 'lg:hover:bg-gray-100 lg:hover:text-gray-900'
      }
    `}
  >
    {customIcon ? (
      <div className="mb-1 lg:mb-0">
        {typeof customIcon === 'function' ? customIcon(isActive || false) : customIcon}
      </div>
    ) : (
      Icon && <Icon className="h-6 w-6 mb-1 lg:mb-0" />
    )}
    <span className="lg:block">{label}</span>
  </button>
);

interface BottomNavigationBarProps {
  hasNegativeBalance?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  hasNegativeBalance = false,
  activeTab: externalActiveTab,
  onTabChange
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: HiHome, label: 'Home', path: '/dashboard' },
    { icon: HiCurrencyDollar, label: 'Pay/move', path: '/pay-move' },
    { icon: HiSparkles, label: 'Chat', path: '/chat' },
  ];

  // Agregar el item "SChance" solo si hay balance negativo
  if (hasNegativeBalance) {
    navItems.push({ 
      icon: undefined as any, 
      label: 'SChance',
      path: '/schance',
      customIcon: (isActive: boolean) => (
        <div className={`
          h-6 w-6 mb-1 lg:mb-0 flex items-center justify-center 
          text-white rounded-full font-bold text-sm transition-colors
          ${isActive ? 'bg-blue-700' : 'bg-gray-500'}
        `}>
          2
        </div>
      )
    } as any);
  }
const handleNavigation = (item: any) => {
  // Si tiene onTabChange y devuelve algo distinto de undefined
  if (onTabChange && onTabChange(item.label) !== undefined) {
    return;
  }

  // Si no, usa router.push normalmente
  router.push(item.path);
};

  // Determinar qué item está activo
  const getIsActive = (item: any) => {
    if (externalActiveTab) {
      // Modo controlado desde page.tsx
      return externalActiveTab === item.label;
    } else {
      // Modo navegación normal
      return pathname === item.path;
    }
  };

  return (
    <nav className="
      fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50
      flex justify-around items-center h-16 max-w-lg mx-auto
      
      lg:relative lg:flex-col lg:justify-start lg:w-64 lg:h-auto lg:max-w-none
      lg:border-t-0 lg:border-r lg:shadow-none lg:p-4 lg:space-y-2 lg:min-h-screen
    ">
      {navItems.map((item: any) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isActive={getIsActive(item)}
          onClick={() => handleNavigation(item)}
          customIcon={item.customIcon}
        />
      ))}
    </nav>
  );
};