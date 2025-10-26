'use client';

import { useState } from 'react';
import { ChatSidebar, ChatHeader, ChatMessages, ChatInput } from '@/components/chat';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const initialMessages: Message[] = [
  { 
    id: '1', 
    text: "¡Hola! Soy Eno, tu asistente de Capital One. ¿Cómo puedo ayudarte hoy con tu cuenta?", 
    isUser: false 
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    // Añade el mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Llama al endpoint inteligente de chat
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text 
          // customerId y accountId se toman de .env.local
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        console.error('❌ Error del servidor:', response.status, errorData);
        throw new Error(`Error ${response.status}: ${errorData.error || 'Error al obtener respuesta'}`);
      }

      const data = await response.json();
      console.log('✅ Respuesta recibida:', data);

      // Respuesta del bot con el insight de Gemini
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.insight || "Lo siento, no pude procesar tu solicitud.",
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Mensaje de error
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        text: "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden lg:flex-row">
        {/* Sidebar (Solo Desktop) */}
        <ChatSidebar />

        {/* Ventana principal del chat */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Header (Solo Móvil) */}
          <ChatHeader />

          {/* Área de Mensajes (Scrollable) */}
          <ChatMessages messages={messages} />

          {/* Input (Fijo abajo) */}
          <ChatInput 
            onSendMessage={handleSendMessage}
            placeholder={isLoading ? "Eno está pensando..." : "Message Eno..."}
          />
        </main>
      </div>
    </div>
  );
}
