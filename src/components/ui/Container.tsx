// components/ui/Container.tsx

import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
};
