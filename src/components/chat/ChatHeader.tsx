'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export const ChatHeader: React.FC = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 p-3 bg-white border-b border-gray-200 lg:hidden">
      <Button 
        variant="outline" 
        onClick={() => router.push('/dashboard')}
        className="text-xs py-2"
      >
        <HiChevronLeft className="h-4 w-4 mr-1 inline" />
        Back
      </Button>
    </div>
  );
};
