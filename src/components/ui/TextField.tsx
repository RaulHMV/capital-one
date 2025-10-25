"use client";

import React from 'react';

interface TextFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  icon: Icon,
}) => {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            Icon ? 'pl-10' : 'pl-3'
          }`}
        />
      </div>
    </div>
  );
};
