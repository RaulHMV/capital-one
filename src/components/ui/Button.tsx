"use client";

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 transition-colors duration-200';
  
  const variantClasses = {
    primary: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 disabled:bg-blue-400',
    secondary: 'text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 disabled:bg-gray-400',
    outline: 'text-blue-700 border border-blue-700 hover:bg-blue-50 focus:ring-blue-300 disabled:text-blue-400 disabled:border-blue-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
    >
      {children}
    </button>
  );
};
