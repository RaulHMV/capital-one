'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { HiArrowUp } from 'react-icons/hi';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Message Eno..." 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-200"
    >
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        <input
          id="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-3 px-5"
        />
        <button 
          type="submit" 
          className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400"
          disabled={!message.trim()}
        >
          <HiArrowUp className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
