"use client";

import React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantClasses = {
    primary: 'text-sm text-blue-700 hover:underline',
    secondary: 'text-sm text-gray-600 hover:text-gray-900 hover:underline',
  };

  return (
    <NextLink href={href} className={`${variantClasses[variant]} ${className}`}>
      {children}
    </NextLink>
  );
};
