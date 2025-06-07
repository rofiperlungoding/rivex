import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import DebugOverlay from './DebugOverlay';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { mode } = useTheme();

  return (
    <div className="min-h-screen bg-white">
      {/* Debug Overlay */}
      <DebugOverlay />

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;