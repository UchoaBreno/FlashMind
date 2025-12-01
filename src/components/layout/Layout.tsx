import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container py-8">
        {children}
      </main>
    </div>
  );
}
