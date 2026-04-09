import type { ReactNode } from 'react';

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`mx-auto max-w-6xl px-4 py-8 ${className}`}>
      {children}
    </div>
  );
}
