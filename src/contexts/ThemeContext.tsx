import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'reader' | 'debug';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  readerSettings: ReaderSettings;
  updateReaderSettings: (settings: Partial<ReaderSettings>) => void;
  debugSettings: DebugSettings;
  updateDebugSettings: (settings: Partial<DebugSettings>) => void;
}

interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'serif' | 'sans-serif';
  maxWidth: number;
}

interface DebugSettings {
  showGrid: boolean;
  showDimensions: boolean;
  showZIndex: boolean;
  showPerformance: boolean;
  showBreakpoints: boolean;
  showConsole: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultReaderSettings: ReaderSettings = {
  fontSize: 18,
  lineHeight: 1.8,
  fontFamily: 'serif',
  maxWidth: 700,
};

const defaultDebugSettings: DebugSettings = {
  showGrid: true,
  showDimensions: true,
  showZIndex: false,
  showPerformance: true,
  showBreakpoints: true,
  showConsole: false,
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(defaultReaderSettings);
  const [debugSettings, setDebugSettings] = useState<DebugSettings>(defaultDebugSettings);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    const savedReaderSettings = localStorage.getItem('reader-settings');
    const savedDebugSettings = localStorage.getItem('debug-settings');

    if (savedMode && ['light', 'dark', 'reader', 'debug'].includes(savedMode)) {
      setMode(savedMode);
    }

    if (savedReaderSettings) {
      try {
        setReaderSettings({ ...defaultReaderSettings, ...JSON.parse(savedReaderSettings) });
      } catch (e) {
        console.warn('Failed to parse saved reader settings');
      }
    }

    if (savedDebugSettings) {
      try {
        setDebugSettings({ ...defaultDebugSettings, ...JSON.parse(savedDebugSettings) });
      } catch (e) {
        console.warn('Failed to parse saved debug settings');
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('reader-settings', JSON.stringify(readerSettings));
  }, [readerSettings]);

  useEffect(() => {
    localStorage.setItem('debug-settings', JSON.stringify(debugSettings));
  }, [debugSettings]);

  // Apply theme classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('theme-light', 'theme-dark', 'theme-reader', 'theme-debug');
    
    // Add current theme class
    root.classList.add(`theme-${mode}`);

    // Apply reader settings
    if (mode === 'reader') {
      root.style.setProperty('--reader-font-size', `${readerSettings.fontSize}px`);
      root.style.setProperty('--reader-line-height', readerSettings.lineHeight.toString());
      root.style.setProperty('--reader-max-width', `${readerSettings.maxWidth}px`);
      root.style.setProperty('--reader-font-family', 
        readerSettings.fontFamily === 'serif' ? 'Georgia, serif' : 'Inter, sans-serif'
      );
    }
  }, [mode, readerSettings]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setMode('light');
            break;
          case '2':
            e.preventDefault();
            setMode('dark');
            break;
          case '3':
            e.preventDefault();
            setMode('reader');
            break;
          case '4':
            e.preventDefault();
            setMode('debug');
            break;
          case 't':
            e.preventDefault();
            toggleMode();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode]);

  const toggleMode = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'reader', 'debug'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
  };

  const updateReaderSettings = (newSettings: Partial<ReaderSettings>) => {
    setReaderSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateDebugSettings = (newSettings: Partial<DebugSettings>) => {
    setDebugSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ThemeContext.Provider value={{
      mode,
      setMode,
      toggleMode,
      readerSettings,
      updateReaderSettings,
      debugSettings,
      updateDebugSettings,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};