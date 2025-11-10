'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { HiPlus, HiCog, HiChat } from 'react-icons/hi';

interface ChatItemProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left px-4 py-3 rounded-lg transition-colors
      ${isActive 
        ? 'bg-blue-100 text-blue-900 font-semibold' 
        : 'text-gray-700 hover:bg-gray-100'
      }
    `}
  >
    <div className="flex items-center gap-3">
      <HiChat className="h-5 w-5" />
      <span className="text-sm truncate">{title}</span>
    </div>
  </button>
);

export const ChatSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
      {/* Header con botones */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 text-xs py-2">
            <HiPlus className="h-4 w-4 mr-1" />
            New Chat
          </Button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <HiCog className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Lista de chats */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <ChatItem title="Financial Advice" isActive />
        <ChatItem title="Account Questions" />
        <ChatItem title="Transfer Help" />
        <ChatItem title="Credit Card Info" />
        <ChatItem title="Previous Chat" />
      </div>
    </aside>
  );
};
