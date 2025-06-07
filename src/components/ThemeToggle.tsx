import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, BookOpen, Bug, Settings, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, setMode, readerSettings, updateReaderSettings, debugSettings, updateDebugSettings } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, description: 'Bright and clean' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { id: 'reader', name: 'Reader', icon: BookOpen, description: 'Focused reading' },
    { id: 'debug', name: 'Debug', icon: Bug, description: 'Developer tools' },
  ] as const;

  const currentTheme = themes.find(theme => theme.id === mode);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Toggle Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-themed-primary border border-themed-primary hover:bg-themed-secondary transition-colors duration-200 shadow-sm"
        aria-label="Theme settings"
      >
        {currentTheme && <currentTheme.icon className="h-4 w-4 text-themed-secondary" />}
        <span className="text-sm font-medium text-themed-primary hidden sm:inline">
          {currentTheme?.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-themed-tertiary transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`} />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-themed-primary rounded-lg shadow-lg border border-themed-primary z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-themed-primary mb-3">Theme Settings</h3>
            
            {/* Theme Selection */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setMode(theme.id);
                      if (theme.id !== 'reader' && theme.id !== 'debug') {
                        setShowSettings(false);
                      }
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      mode === theme.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-themed-secondary hover:border-themed-primary'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mx-auto mb-1 ${
                      mode === theme.id ? 'text-primary-600 dark:text-primary-400' : 'text-themed-tertiary'
                    }`} />
                    <div className="text-xs font-medium text-themed-primary">{theme.name}</div>
                    <div className="text-xs text-themed-tertiary">{theme.description}</div>
                  </button>
                );
              })}
            </div>

            {/* Reader Mode Settings */}
            {mode === 'reader' && (
              <div className="border-t border-themed-secondary pt-4">
                <h4 className="text-sm font-medium text-themed-primary mb-3">Reader Settings</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-themed-secondary mb-1">Font Size</label>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={readerSettings.fontSize}
                      onChange={(e) => updateReaderSettings({ fontSize: parseInt(e.target.value) })}
                      className="w-full accent-primary-600"
                    />
                    <div className="text-xs text-themed-tertiary">{readerSettings.fontSize}px</div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-themed-secondary mb-1">Line Height</label>
                    <input
                      type="range"
                      min="1.4"
                      max="2.2"
                      step="0.1"
                      value={readerSettings.lineHeight}
                      onChange={(e) => updateReaderSettings({ lineHeight: parseFloat(e.target.value) })}
                      className="w-full accent-primary-600"
                    />
                    <div className="text-xs text-themed-tertiary">{readerSettings.lineHeight}</div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-themed-secondary mb-1">Font Family</label>
                    <select
                      value={readerSettings.fontFamily}
                      onChange={(e) => updateReaderSettings({ fontFamily: e.target.value as 'serif' | 'sans-serif' })}
                      className="w-full px-2 py-1 text-xs border border-themed-secondary rounded bg-themed-primary text-themed-primary"
                    >
                      <option value="serif">Serif (Georgia)</option>
                      <option value="sans-serif">Sans-serif (Inter)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Debug Mode Settings */}
            {mode === 'debug' && (
              <div className="border-t border-themed-secondary pt-4">
                <h4 className="text-sm font-medium text-themed-primary mb-3">Debug Settings</h4>
                
                <div className="space-y-2">
                  {Object.entries(debugSettings).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateDebugSettings({ [key]: e.target.checked })}
                        className="rounded border-themed-secondary text-primary-600 focus:ring-primary-500 bg-themed-primary"
                      />
                      <span className="text-xs text-themed-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts */}
            <div className="border-t border-themed-secondary pt-4 mt-4">
              <h4 className="text-sm font-medium text-themed-primary mb-2">Keyboard Shortcuts</h4>
              <div className="text-xs text-themed-tertiary space-y-1">
                <div>Ctrl/Cmd + 1-4: Switch themes</div>
                <div>Ctrl/Cmd + T: Toggle themes</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;