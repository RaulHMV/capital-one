'use client';

import React from 'react';
import BlurText from '@/components/animations/BlurText';
import { HiSparkles, HiUser } from 'react-icons/hi';

interface ChatMessageProps {
  message: {
    text: string;
    isUser: boolean;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, isUser } = message;

  // Alineación
  const alignment = isUser ? 'justify-end' : 'justify-start';
  
  // Estilo de la burbuja
  const bubbleColor = isUser
    ? 'bg-blue-600 text-white'
    : 'bg-gray-200 text-gray-900';

  // Ícono
  const Icon = isUser ? HiUser : HiSparkles;
  
  // Avatar
  const AvatarComponent = (
    <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-700' : 'bg-gray-300'
      }`}>
        <Icon className={`h-5 w-5 ${isUser ? 'text-white' : 'text-gray-700'}`} />
      </div>
    </div>
  );
  
  return (
    <div className={`flex items-start w-full my-4 ${alignment}`}>
      {/* Bot: Avatar a la izquierda */}
      {!isUser && AvatarComponent}

      {/* Contenido del Mensaje */}
      <div 
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl ${bubbleColor}`}
      >
        {isUser ? (
          <p className="text-sm">{text}</p>
        ) : (
          <BlurText
            text={text}
            delay={50}
            animateBy="words"
            direction="top"
            className="text-sm"
          />
        )}
      </div>

      {/* Usuario: Avatar a la derecha */}
      {isUser && AvatarComponent}
    </div>
  );
};
