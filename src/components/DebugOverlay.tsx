import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DebugOverlay: React.FC = () => {
  const { mode, debugSettings } = useTheme();
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
  });
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  useEffect(() => {
    if (mode !== 'debug') return;

    // Performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setPerformanceMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
          memory: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0,
          loadTime: Math.round(performance.now()),
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    measureFPS();

    // Console interceptor
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
    };

    const interceptConsole = (type: string) => (message: any) => {
      setConsoleMessages(prev => [...prev.slice(-9), `[${type.toUpperCase()}] ${message}`]);
      (originalConsole as any)[type](message);
    };

    console.log = interceptConsole('log');
    console.warn = interceptConsole('warn');
    console.error = interceptConsole('error');

    return () => {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
    };
  }, [mode]);

  if (mode !== 'debug') return null;

  return (
    <>
      {/* Grid Overlay */}
      {debugSettings.showGrid && (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
          <div className="w-full h-full opacity-20">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-red-500 h-full"></div>
              ))}
            </div>
            <div className="absolute inset-0 grid grid-rows-12 w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-b border-red-500 w-full"></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Breakpoint Indicator */}
      {debugSettings.showBreakpoints && (
        <div className="fixed top-4 left-4 z-[9999] bg-black text-white px-2 py-1 rounded text-xs font-mono">
          <span className="sm:hidden">XS</span>
          <span className="hidden sm:inline md:hidden">SM</span>
          <span className="hidden md:inline lg:hidden">MD</span>
          <span className="hidden lg:inline xl:hidden">LG</span>
          <span className="hidden xl:inline 2xl:hidden">XL</span>
          <span className="hidden 2xl:inline">2XL</span>
        </div>
      )}

      {/* Performance Metrics */}
      {debugSettings.showPerformance && (
        <div className="fixed top-4 right-4 z-[9999] bg-black text-white p-3 rounded text-xs font-mono space-y-1">
          <div>FPS: {performanceMetrics.fps}</div>
          <div>Memory: {performanceMetrics.memory}MB</div>
          <div>Load: {performanceMetrics.loadTime}ms</div>
        </div>
      )}

      {/* Console Panel */}
      {debugSettings.showConsole && (
        <div className="fixed bottom-4 left-4 right-4 z-[9999] bg-black text-green-400 p-4 rounded max-h-48 overflow-y-auto">
          <div className="text-xs font-mono space-y-1">
            {consoleMessages.length === 0 ? (
              <div className="text-gray-500">Console output will appear here...</div>
            ) : (
              consoleMessages.map((message, index) => (
                <div key={index} className="break-all">{message}</div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Element Inspector */}
      {debugSettings.showDimensions && (
        <style>{`
          .theme-debug *:hover {
            outline: 2px solid #ff0000 !important;
            position: relative;
          }
          
          .theme-debug *:hover::after {
            content: attr(class) " | " attr(data-dimensions);
            position: absolute;
            top: -20px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 2px 4px;
            font-size: 10px;
            font-family: monospace;
            white-space: nowrap;
            z-index: 10000;
            pointer-events: none;
          }
        `}</style>
      )}

      {/* Z-Index Visualization */}
      {debugSettings.showZIndex && (
        <style>{`
          .theme-debug * {
            box-shadow: inset 0 0 0 1px rgba(255, 0, 0, 0.3) !important;
          }
          
          .theme-debug *[style*="z-index"]::before {
            content: "z:" attr(style);
            position: absolute;
            top: 0;
            right: 0;
            background: #ff0000;
            color: #fff;
            padding: 1px 3px;
            font-size: 8px;
            font-family: monospace;
            z-index: 10000;
          }
        `}</style>
      )}
    </>
  );
};

export default DebugOverlay;